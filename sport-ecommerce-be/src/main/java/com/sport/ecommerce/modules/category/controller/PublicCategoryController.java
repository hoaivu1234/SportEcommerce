package com.sport.ecommerce.modules.category.controller;

import com.sport.ecommerce.common.constant.AppConstant;
import com.sport.ecommerce.common.dto.response.ApiResponse;
import com.sport.ecommerce.modules.category.dto.response.CategoryResponse;
import com.sport.ecommerce.modules.category.dto.response.CategoryTreeResponse;
import com.sport.ecommerce.modules.category.service.CategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Read-only category endpoints accessible without authentication.
 * Used by the public storefront for navigation and product browsing.
 */
@RestController
@RequestMapping(AppConstant.PUBLIC_PREFIX + "/categories")
@RequiredArgsConstructor
public class PublicCategoryController {

    private final CategoryService categoryService;

    @GetMapping("/tree")
    public ResponseEntity<ApiResponse<List<CategoryTreeResponse>>> getCategoryTree() {
        return ResponseEntity.ok(ApiResponse.success(categoryService.getCategoryTree()));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<CategoryResponse>> getCategoryById(@PathVariable Long id) {
        return ResponseEntity.ok(ApiResponse.success(categoryService.getCategoryById(id)));
    }

    @GetMapping("/slug/{slug}")
    public ResponseEntity<ApiResponse<CategoryResponse>> getCategoryBySlug(@PathVariable String slug) {
        return ResponseEntity.ok(ApiResponse.success(categoryService.getCategoryBySlug(slug)));
    }

    /** Domain (level-2) categories — used for parent selection in category form */
    @GetMapping("/level2")
    public ResponseEntity<ApiResponse<List<CategoryResponse>>> getLevel2() {
        return ResponseEntity.ok(ApiResponse.success(categoryService.getLevel2Categories()));
    }

    /** Leaf (level-3) categories — the only level assignable to products */
    @GetMapping("/level3")
    public ResponseEntity<ApiResponse<List<CategoryResponse>>> getLevel3() {
        return ResponseEntity.ok(ApiResponse.success(categoryService.getLevel3Categories()));
    }
}
