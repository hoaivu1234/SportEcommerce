package com.sport.ecommerce.modules.category.controller;

import com.sport.ecommerce.common.constant.AppConstant;
import com.sport.ecommerce.common.dto.response.ApiResponse;
import com.sport.ecommerce.common.dto.response.PageResponse;
import com.sport.ecommerce.modules.category.dto.request.CategoryRequest;
import com.sport.ecommerce.modules.category.dto.response.CategoryResponse;
import com.sport.ecommerce.modules.category.dto.response.CategoryTreeResponse;
import com.sport.ecommerce.modules.category.service.CategoryService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(AppConstant.ADMIN_PREFIX + "/categories")
@RequiredArgsConstructor
public class CategoryController {

    private final CategoryService categoryService;

    @GetMapping
    public ResponseEntity<ApiResponse<PageResponse<CategoryResponse>>> getCategories(Pageable pageable) {
        return ResponseEntity.ok(ApiResponse.success(categoryService.getCategories(pageable)));
    }

    @GetMapping("/flat")
    public ResponseEntity<ApiResponse<PageResponse<CategoryResponse>>> getCategoriesExcludeChildren(Pageable pageable) {
        return ResponseEntity.ok(ApiResponse.success(categoryService.getCategoriesExcludeChildren(pageable)));
    }

    @GetMapping("/all")
    public ResponseEntity<ApiResponse<List<CategoryResponse>>> getAllFlat() {
        return ResponseEntity.ok(ApiResponse.success(categoryService.getAllFlat()));
    }

    /** Root (level-1) categories — fixed, never create/modify. */
    @GetMapping("/level1")
    public ResponseEntity<ApiResponse<List<CategoryResponse>>> getLevel1() {
        return ResponseEntity.ok(ApiResponse.success(categoryService.getLevel1Categories()));
    }

    /** Domain (level-2) categories — fixed, valid parents for new leaf categories. */
    @GetMapping("/level2")
    public ResponseEntity<ApiResponse<List<CategoryResponse>>> getLevel2() {
        return ResponseEntity.ok(ApiResponse.success(categoryService.getLevel2Categories()));
    }

    /** Leaf (level-3) categories — the only level assignable to products. */
    @GetMapping("/level3")
    public ResponseEntity<ApiResponse<List<CategoryResponse>>> getLevel3() {
        return ResponseEntity.ok(ApiResponse.success(categoryService.getLevel3Categories()));
    }

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

    @PostMapping
    public ResponseEntity<ApiResponse<CategoryResponse>> createCategory(@Valid @RequestBody CategoryRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.created(categoryService.createCategory(request)));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<CategoryResponse>> updateCategory(
            @PathVariable Long id,
            @Valid @RequestBody CategoryRequest request) {
        return ResponseEntity.ok(ApiResponse.success(categoryService.updateCategory(id, request)));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteCategory(@PathVariable Long id) {
        categoryService.deleteCategory(id);
        return ResponseEntity.ok(ApiResponse.success(null));
    }
}
