package com.sport.ecommerce.modules.cart.service.impl;

import com.sport.ecommerce.modules.cart.dto.request.AddToCartRequest;
import com.sport.ecommerce.modules.cart.dto.request.MergeCartItemRequest;
import com.sport.ecommerce.modules.cart.dto.request.MergeCartRequest;
import com.sport.ecommerce.modules.cart.dto.request.UpdateCartItemRequest;
import com.sport.ecommerce.modules.cart.dto.response.CartItemResponse;
import com.sport.ecommerce.modules.cart.dto.response.CartResponse;
import com.sport.ecommerce.modules.cart.entity.Cart;
import com.sport.ecommerce.modules.cart.entity.CartItem;
import com.sport.ecommerce.modules.cart.repository.CartItemRepository;
import com.sport.ecommerce.modules.cart.repository.CartRepository;
import com.sport.ecommerce.modules.cart.service.CartService;
import com.sport.ecommerce.exception.custom.BusinessException;
import com.sport.ecommerce.modules.product.entity.ProductImage;
import com.sport.ecommerce.modules.product.entity.variant.ProductVariant;
import com.sport.ecommerce.modules.product.repository.ProductImageRepository;
import com.sport.ecommerce.modules.product.repository.ProductVariantRepository;
import com.sport.ecommerce.modules.user.entity.User;
import com.sport.ecommerce.modules.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class CartServiceImpl implements CartService {

    private final CartRepository cartRepository;
    private final CartItemRepository cartItemRepository;
    private final ProductVariantRepository productVariantRepository;
    private final ProductImageRepository productImageRepository;
    private final UserRepository userRepository;

    // ── Public API ────────────────────────────────────────────────────────────

    @Override
    @Transactional
    public CartResponse getCart() {
        User user = getCurrentUser();
        Cart cart = getOrCreateCart(user);
        return buildResponse(cart);
    }

    @Override
    @Transactional
    public CartResponse addItem(AddToCartRequest request) {
        User user = getCurrentUser();
        Cart cart = getOrCreateCart(user);

        ProductVariant variant = resolveActiveVariant(request.getVariantId());
        int availableStock = stockOf(variant);

        Optional<CartItem> existing =
                cartItemRepository.findByCartIdAndProductVariantId(cart.getId(), variant.getId());

        if (existing.isPresent()) {
            CartItem item = existing.get();
            int newQty = item.getQuantity() + request.getQuantity();
            if (newQty > availableStock) {
                throw new BusinessException(
                        HttpStatus.BAD_REQUEST.value(),
                        "Insufficient stock. Available: " + availableStock
                                + ", already in cart: " + item.getQuantity()
                                + ", requested additional: " + request.getQuantity());
            }
            item.setQuantity(newQty);
            cartItemRepository.save(item);
            log.debug("Merged cart item {} → qty={}", item.getId(), newQty);
        } else {
            if (request.getQuantity() > availableStock) {
                throw new BusinessException(
                        HttpStatus.BAD_REQUEST.value(),
                        "Insufficient stock. Available: " + availableStock);
            }
            CartItem item = new CartItem();
            item.setCart(cart);
            item.setProductVariant(variant);
            item.setQuantity(request.getQuantity());
            item.setPriceSnapshot(variant.getPrice());
            cartItemRepository.save(item);
            log.debug("Added new cart item for variant {}", variant.getId());
        }

        return buildResponse(cart);
    }

    @Override
    @Transactional
    public CartResponse updateItem(Long itemId, UpdateCartItemRequest request) {
        User user = getCurrentUser();
        Cart cart = getOrCreateCart(user);
        CartItem item = findOwnedItem(itemId, cart);

        int availableStock = stockOf(item.getProductVariant());
        if (request.getQuantity() > availableStock) {
            throw new BusinessException(
                    HttpStatus.BAD_REQUEST.value(),
                    "Insufficient stock. Available: " + availableStock);
        }

        item.setQuantity(request.getQuantity());
        cartItemRepository.save(item);
        log.debug("Updated cart item {} → qty={}", itemId, request.getQuantity());
        return buildResponse(cart);
    }

    @Override
    @Transactional
    public void removeItem(Long itemId) {
        User user = getCurrentUser();
        Cart cart = getOrCreateCart(user);
        CartItem item = findOwnedItem(itemId, cart);
        cartItemRepository.delete(item);
        log.debug("Removed cart item {}", itemId);
    }

    @Override
    @Transactional
    public CartResponse mergeGuestCart(MergeCartRequest request) {
        User user = getCurrentUser();
        Cart cart = getOrCreateCart(user);

        for (MergeCartItemRequest guestItem : request.getItems()) {
            if (guestItem.getVariantId() == null || guestItem.getQuantity() == null
                    || guestItem.getQuantity() < 1) {
                continue; // skip invalid entries silently
            }

            ProductVariant variant;
            try {
                variant = resolveActiveVariant(guestItem.getVariantId());
            } catch (BusinessException e) {
                log.warn("Skipping guest cart item — variant {} not found or inactive",
                        guestItem.getVariantId());
                continue; // skip unavailable variants instead of aborting the whole merge
            }

            int available = stockOf(variant);
            Optional<CartItem> existing =
                    cartItemRepository.findByCartIdAndProductVariantId(
                            cart.getId(), variant.getId());

            if (existing.isPresent()) {
                CartItem item = existing.get();
                int merged = Math.min(item.getQuantity() + guestItem.getQuantity(), available);
                item.setQuantity(merged);
                cartItemRepository.save(item);
            } else {
                int qty = Math.min(guestItem.getQuantity(), available);
                if (qty < 1) continue;
                CartItem item = new CartItem();
                item.setCart(cart);
                item.setProductVariant(variant);
                item.setQuantity(qty);
                item.setPriceSnapshot(variant.getPrice());
                cartItemRepository.save(item);
            }
        }

        log.info("Merged {} guest items into cart {} for user {}",
                request.getItems().size(), cart.getId(), user.getId());
        return buildResponse(cart);
    }

    @Override
    @Transactional
    public CartResponse clearCart() {
        User user = getCurrentUser();
        Cart cart = getOrCreateCart(user);
        cartItemRepository.deleteAllByCartId(cart.getId());
        log.debug("Cleared cart {} for user {}", cart.getId(), user.getId());
        return buildResponse(cart);
    }

    // ── Helpers ───────────────────────────────────────────────────────────────

    private Cart getOrCreateCart(User user) {
        return cartRepository.findByUserId(user.getId()).orElseGet(() -> {
            Cart newCart = new Cart();
            newCart.setUser(user);
            Cart saved = cartRepository.save(newCart);
            log.info("Auto-created cart {} for user {}", saved.getId(), user.getId());
            return saved;
        });
    }

    private User getCurrentUser() {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new BusinessException(
                        HttpStatus.UNAUTHORIZED.value(), "Authenticated user not found"));
    }

    private ProductVariant resolveActiveVariant(Long variantId) {
        ProductVariant variant = productVariantRepository.findById(variantId)
                .orElseThrow(() -> new BusinessException(
                        HttpStatus.NOT_FOUND.value(), "Product variant not found: " + variantId));
        if (!Boolean.TRUE.equals(variant.getIsActive())) {
            throw new BusinessException(HttpStatus.BAD_REQUEST.value(),
                    "Product variant is no longer available");
        }
        return variant;
    }

    /** Loads the cart item and verifies it belongs to the given cart. */
    private CartItem findOwnedItem(Long itemId, Cart cart) {
        CartItem item = cartItemRepository.findById(itemId)
                .orElseThrow(() -> new BusinessException(
                        HttpStatus.NOT_FOUND.value(), "Cart item not found: " + itemId));
        if (!item.getCart().getId().equals(cart.getId())) {
            throw new BusinessException(HttpStatus.FORBIDDEN.value(),
                    "Item does not belong to your cart");
        }
        return item;
    }

    private int stockOf(ProductVariant variant) {
        return variant.getStock() != null ? variant.getStock() : 0;
    }

    // ── Response building ─────────────────────────────────────────────────────

    private CartResponse buildResponse(Cart cart) {
        List<CartItem> items = cartItemRepository.findByCartIdWithVariant(cart.getId());

        // Batch-fetch main images to avoid N+1
        List<Long> productIds = items.stream()
                .map(i -> i.getProductVariant().getProduct().getId())
                .distinct()
                .toList();

        Map<Long, String> mainImages = productIds.isEmpty() ? Map.of() :
                productImageRepository.findMainImagesByProductIds(productIds)
                        .stream()
                        .collect(Collectors.toMap(
                                img -> img.getProduct().getId(),
                                ProductImage::getImageUrl,
                                (first, second) -> first   // keep first if multiple mains
                        ));

        List<CartItemResponse> itemResponses = items.stream()
                .map(item -> toItemResponse(item, mainImages))
                .toList();

        BigDecimal totalPrice = itemResponses.stream()
                .map(CartItemResponse::getSubtotal)
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        return CartResponse.builder()
                .id(cart.getId())
                .items(itemResponses)
                .totalItems(itemResponses.size())
                .totalPrice(totalPrice)
                .build();
    }

    private CartItemResponse toItemResponse(CartItem item, Map<Long, String> mainImages) {
        ProductVariant variant = item.getProductVariant();
        var product = variant.getProduct();

        // Prefer the locked-in price snapshot; fall back to current variant price
        BigDecimal price = item.getPriceSnapshot() != null
                ? item.getPriceSnapshot()
                : variant.getPrice();
        BigDecimal subtotal = price.multiply(BigDecimal.valueOf(item.getQuantity()));

        return CartItemResponse.builder()
                .id(item.getId())
                .variantId(variant.getId())
                .sku(variant.getSku())
                .size(variant.getSize())
                .color(variant.getColor())
                .productId(product.getId())
                .productName(product.getName())
                .brand(product.getBrand())
                .imageUrl(mainImages.get(product.getId()))
                .quantity(item.getQuantity())
                .priceSnapshot(price)
                .subtotal(subtotal)
                .build();
    }
}
