package com.sport.ecommerce.modules.product.service;

import com.sport.ecommerce.common.enums.MainCategory;
import com.sport.ecommerce.common.enums.SportCategory;
import com.sport.ecommerce.infrastructure.cloudinary.CloudinaryService;
import com.sport.ecommerce.modules.category.entity.Category;
import com.sport.ecommerce.modules.category.repository.CategoryRepository;
import com.sport.ecommerce.modules.product.dto.request.ProductImageRequest;
import com.sport.ecommerce.modules.product.dto.request.ProductRequest;
import com.sport.ecommerce.modules.product.dto.request.ProductVariantRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.*;

@Slf4j
@Service
@RequiredArgsConstructor
public class SeedProductService {

    private final ProductService productService;
    private final CloudinaryService cloudinaryService;
    private final CategoryRepository categoryRepository;

    private static final String CLOUDINARY_FOLDER = "sport-shop/products";

    Map<SportCategory, List<String>> BRANDS = Map.of(

            SportCategory.FOOTBALL, List.of(
                    "Nike", "Adidas", "Puma", "Mizuno"
            ),

            SportCategory.FITNESS, List.of(
                    "Nike", "Adidas", "Under Armour", "Reebok"
            ),

            SportCategory.SWIMMING, List.of(
                    "Speedo", "Arena", "TYR"
            )
    );

    Map<String, List<Long>> CATEGORY_MAP = Map.of(
            "SHOES_FOOTBALL", List.of(1L, 2L),
            "CLOTHING_FOOTBALL", List.of(3L, 4L),
            "ACCESSORIES_FOOTBALL", List.of(5L),
            "SHOES_FITNESS", List.of(6L),
            "CLOTHING_FITNESS", List.of(7L),
            "ACCESSORIES_FITNESS", List.of(8L),
            "SHOES_SWIMMING", List.of(9L),
            "CLOTHING_SWIMMING", List.of(10L),
            "ACCESSORIES_SWIMMING", List.of(11L));

    Map<String, List<String>> PRODUCT_TYPES = Map.of(

            // SHOES
            "SHOES_FOOTBALL", List.of(
                    "Football Cleats", "Football Turf Shoes"
            ),
            "SHOES_FITNESS", List.of(
                    "Training Shoes", "Running Shoes", "Gym Shoes"
            ),
            "SHOES_SWIMMING", List.of(
                    "Water Shoes", "Pool Slides"
            ),

            // CLOTHING
            "CLOTHING_FOOTBALL", List.of(
                    "Football Jersey", "Football Shorts", "Football Socks"
            ),
            "CLOTHING_FITNESS", List.of(
                    "Gym T-shirt", "Training Shorts", "Compression Wear", "Tank Top"
            ),
            "CLOTHING_SWIMMING", List.of(
                    "Swimsuit", "Swimming Trunks", "Rash Guard"
            ),

            // ACCESSORIES
            "ACCESSORIES_FOOTBALL", List.of(
                    "Shin Guards", "Football Gloves"
            ),
            "ACCESSORIES_FITNESS", List.of(
                    "Gym Gloves", "Water Bottle", "Fitness Band"
            ),
            "ACCESSORIES_SWIMMING", List.of(
                    "Swimming Goggles", "Swim Cap", "Kickboard"
            )
    );

    private static final String[] SIZES = {"XS", "S", "M", "L", "XL", "XXL"};
    private static final String[] SHOE_SIZES = {"6", "7", "8", "9", "10", "11", "12"};
    private static final String[] COLORS = {
            "Black", "White", "Red", "Blue", "Navy", "Gray", "Green",
            "Orange", "Yellow", "Pink", "Purple", "Maroon"
    };

    // Picsum Photos gives reliable random images — each seed produces a unique image
    private static final String IMAGE_URL_TEMPLATE = "https://picsum.photos/seed/%s/800/600";

    private final Random random = new Random();

    /**
     * Seeds {@code count} random sport products into the database.
     *
     * @param count number of products to generate
     * @return list of error messages for any products that failed; empty if all succeeded
     */
    public SeedResult seed(int count) {
        List<Long> categoryIds = fetchCategoryIds();
        List<String> errors = new ArrayList<>();
        int created = 0;

        for (int i = 0; i < count; i++) {
            try {
                ProductRequest request = buildRandomProduct(categoryIds);
                productService.createProduct(request);
                created++;
                log.debug("Seeded product {}/{}: {}", i + 1, count, request.getName());
            } catch (Exception ex) {
                String msg = "Product #" + (i + 1) + ": " + ex.getMessage();
                log.warn("Seed failed — {}", msg);
                errors.add(msg);
            }
        }

        return new SeedResult(created, errors);
    }

    // ── Builders ─────────────────────────────────────────────────────────────

    private ProductRequest buildRandomProduct(List<Long> categoryIds) {
        MainCategory mainCategory = randomFrom(MainCategory.values());
        SportCategory sportCategory = randomFrom(SportCategory.values());

        String key = mainCategory.name() + "_" + sportCategory.name();
        String brand = random(BRANDS.get(sportCategory));
        String type = random(PRODUCT_TYPES.get(key));
        String name = brand + " " + type + " " + randomSuffix();

        BigDecimal basePrice = randomPrice(29, 199);
        BigDecimal discountPrice = randomDiscountPrice(basePrice);

        ProductRequest req = new ProductRequest();
        req.setName(name);
        req.setDescription("Premium " + type.toLowerCase() + " by " + brand + ". Designed for performance and comfort.");
        req.setBrand(brand);
        req.setPrice(basePrice);
        req.setDiscountPrice(discountPrice);
        req.setStatus("ACTIVE");

        List<Long> validCategoryIds = CATEGORY_MAP.get(key);

        if (validCategoryIds != null && !validCategoryIds.isEmpty()) {
            req.setCategoryId(
                    validCategoryIds.get(random.nextInt(validCategoryIds.size()))
            );
        }

        req.setImages(buildImages());
        req.setVariants(buildVariants(type, basePrice));

        return req;
    }

    private BigDecimal randomDiscountPrice(BigDecimal basePrice) {
        int discountPercent = 5 + random.nextInt(26);

        BigDecimal discount = basePrice
                .multiply(BigDecimal.valueOf(discountPercent))
                .divide(BigDecimal.valueOf(100));

        return basePrice.subtract(discount)
                .max(BigDecimal.ZERO);
    }

    private List<ProductImageRequest> buildImages() {
        String seed = UUID.randomUUID().toString().substring(0, 8);
        String imageUrl = uploadToCloudinary(String.format(IMAGE_URL_TEMPLATE, seed));

        ProductImageRequest img = new ProductImageRequest();
        img.setImageUrl(imageUrl);
        img.setIsMain(true);
        img.setSortOrder(0);
        return List.of(img);
    }

    private String uploadToCloudinary(String sourceUrl) {
        try {
            return cloudinaryService.uploadFromUrl(sourceUrl, CLOUDINARY_FOLDER);
        } catch (Exception ex) {
            log.warn("Cloudinary upload failed ({}), using source URL as fallback: {}", ex.getMessage(), sourceUrl);
            // Fall back to the original URL so product creation doesn't fail entirely
            return sourceUrl;
        }
    }

    private List<ProductVariantRequest> buildVariants(String type, BigDecimal basePrice) {
        boolean isShoe = type.toLowerCase().contains("shoe") || type.toLowerCase().contains("boot")
                || type.toLowerCase().contains("cleat");
        String[] sizePool = isShoe ? SHOE_SIZES : SIZES;

        List<ProductVariantRequest> variants = new ArrayList<>();
        String color = randomFrom(COLORS);

        // Pick 2–4 random sizes
        int numSizes = 2 + random.nextInt(3);
        for (int i = 0; i < numSizes; i++) {
            String size = sizePool[random.nextInt(sizePool.length)];
            String sku = "SKU-" + UUID.randomUUID().toString().substring(0, 8).toUpperCase();

            BigDecimal variantPrice = basePrice.add(BigDecimal.valueOf(random.nextInt(21) - 10))
                    .max(BigDecimal.ONE);

            ProductVariantRequest v = new ProductVariantRequest();
            v.setSku(sku);
            v.setSize(size);
            v.setColor(color);
            v.setPrice(variantPrice.setScale(2, RoundingMode.HALF_UP));
            v.setStock(random.nextInt(51));  // 0–50
            variants.add(v);
        }

        return variants;
    }

    // ── Utilities ────────────────────────────────────────────────────────────

    private List<Long> fetchCategoryIds() {
        try {
            return categoryRepository.findAll().stream()
                    .map(Category::getId)
                    .toList();
        } catch (Exception ex) {
            log.warn("Could not fetch categories, products will have no category: {}", ex.getMessage());
            return List.of();
        }
    }

    private String randomFrom(String[] arr) {
        return arr[random.nextInt(arr.length)];
    }

    private <T> T randomFrom(T[] arr) {
        return arr[random.nextInt(arr.length)];
    }

    private <T> T random(List<T> list) {
        return list.get(random.nextInt(list.size()));
    }

    private BigDecimal randomPrice(int min, int max) {
        int cents = (min * 100) + random.nextInt((max - min) * 100);
        return BigDecimal.valueOf(cents).divide(BigDecimal.valueOf(100), 2, RoundingMode.HALF_UP);
    }

    private String randomSuffix() {
        return String.valueOf(2000 + random.nextInt(25));
    }

    // ── Result record ────────────────────────────────────────────────────────

    public record SeedResult(int created, List<String> errors) {
        public int failed() { return errors.size(); }
    }
}
