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
import org.springframework.transaction.annotation.Transactional;

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

    private static final Map<SportCategory, List<String>> BRANDS = Map.of(
            SportCategory.FOOTBALL, List.of("Nike", "Adidas", "Puma", "Mizuno"),
            SportCategory.FITNESS,  List.of("Nike", "Adidas", "Under Armour", "Reebok"),
            SportCategory.SWIMMING, List.of("Speedo", "Arena", "TYR")
    );

    private static final String[] SIZES      = {"XS", "S", "M", "L", "XL", "XXL"};
    private static final String[] SHOE_SIZES = {"6", "7", "8", "9", "10", "11", "12"};
    private static final String[] COLORS     = {
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
        List<String> errors = new ArrayList<>();
        int created = 0;

        for (int i = 0; i < count; i++) {
            try {
                ProductRequest request = buildRandomProduct();
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

    // ── Product builder ───────────────────────────────────────────────────────

    private ProductRequest buildRandomProduct() {
        MainCategory mainCategory  = randomFrom(MainCategory.values());
        SportCategory sportCategory = randomFrom(SportCategory.values());

        Category leafCategory = selectRandomLeafCategory(
                findLeafCategories(mainCategory, sportCategory)
        );

        String brand = random(BRANDS.get(sportCategory));
        // Name is derived directly from the leaf category so product ↔ category always match
        String name = brand + " " + leafCategory.getName() + " " + randomSuffix();

        BigDecimal basePrice     = randomPrice(29, 199);
        BigDecimal discountPrice = randomDiscountPrice(basePrice);

        ProductRequest req = new ProductRequest();
        req.setName(name);
        req.setDescription("Premium " + leafCategory.getName().toLowerCase() + " by " + brand
                + ". Designed for performance and comfort.");
        req.setBrand(brand);
        req.setPrice(basePrice);
        req.setDiscountPrice(discountPrice);
        req.setStatus("ACTIVE");
        req.setCategoryId(leafCategory.getId());
        req.setImages(buildImages());
        req.setVariants(buildVariants(mainCategory, basePrice));

        return req;
    }

    // ── Category resolution ───────────────────────────────────────────────────

    /**
     * Resolves all level-3 (leaf) categories whose parent name is
     * "{SportCategory} {MainCategory}" — e.g. "Football Shoes".
     *
     * <p>Hierarchy: Root (level 1) → Sport-Domain (level 2) → Leaf (level 3)
     *
     * @throws IllegalStateException if the level-2 category or its children are not found
     */
    @Transactional(readOnly = true)
    List<Category> findLeafCategories(MainCategory mainCategory, SportCategory sportCategory) {
        String level2Name = toTitleCase(sportCategory.name()) + " " + toTitleCase(mainCategory.name());

        Category level2 = categoryRepository.findByName(level2Name)
                .orElseThrow(() -> new IllegalStateException(
                        "Level-2 category not found: \"" + level2Name + "\". "
                        + "Ensure the database is seeded with the correct category hierarchy."));

        List<Category> leaves = categoryRepository.findByParentId(level2.getId());
        if (leaves.isEmpty()) {
            throw new IllegalStateException(
                    "No leaf categories found under \"" + level2Name + "\". "
                    + "Ensure level-3 categories exist in the database.");
        }

        String rootName = "(root)";
        try {
            if (level2.getParent() != null) {
                rootName = level2.getParent().getName();
            }
        } catch (Exception ignored) {
            // lazy proxy unavailable — log is best-effort
        }

        log.debug("Category path resolved: {} → {} → [{}]",
                rootName,
                level2Name,
                leaves.stream().map(Category::getName).reduce((a, b) -> a + ", " + b).orElse(""));

        return leaves;
    }

    /**
     * Picks a random leaf category from the provided list.
     *
     * @throws IllegalArgumentException if the list is null or empty
     */
    Category selectRandomLeafCategory(List<Category> leaves) {
        if (leaves == null || leaves.isEmpty()) {
            throw new IllegalArgumentException("Cannot select from an empty leaf category list.");
        }
        Category selected = leaves.get(random.nextInt(leaves.size()));
        log.info("Selected leaf category: \"{}\" (id={})", selected.getName(), selected.getId());
        return selected;
    }

    /** "FOOTBALL" → "Football", "ACCESSORIES" → "Accessories" */
    private String toTitleCase(String enumName) {
        return enumName.substring(0, 1).toUpperCase() + enumName.substring(1).toLowerCase();
    }

    // ── Supporting builders ───────────────────────────────────────────────────

    private BigDecimal randomDiscountPrice(BigDecimal basePrice) {
        int discountPercent = 5 + random.nextInt(26);
        BigDecimal discount = basePrice
                .multiply(BigDecimal.valueOf(discountPercent))
                .divide(BigDecimal.valueOf(100));
        return basePrice.subtract(discount).max(BigDecimal.ZERO);
    }

    private List<ProductImageRequest> buildImages() {
        String seed     = UUID.randomUUID().toString().substring(0, 8);
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
            return sourceUrl;
        }
    }

    private List<ProductVariantRequest> buildVariants(MainCategory mainCategory, BigDecimal basePrice) {
        // Use shoe sizes for SHOES, clothing/general sizes for everything else
        String[] sizePool = (mainCategory == MainCategory.SHOES) ? SHOE_SIZES : SIZES;

        List<ProductVariantRequest> variants = new ArrayList<>();
        String color = randomFrom(COLORS);

        int numSizes = 2 + random.nextInt(3);
        for (int i = 0; i < numSizes; i++) {
            String size = sizePool[random.nextInt(sizePool.length)];
            String sku  = "SKU-" + UUID.randomUUID().toString().substring(0, 8).toUpperCase();

            BigDecimal variantPrice = basePrice
                    .add(BigDecimal.valueOf(random.nextInt(21) - 10))
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

    // ── Utilities ─────────────────────────────────────────────────────────────

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

    // ── Result record ─────────────────────────────────────────────────────────

    public record SeedResult(int created, List<String> errors) {
        public int failed() { return errors.size(); }
    }
}
