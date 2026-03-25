package com.sport.ecommerce.modules.category.service;

import com.sport.ecommerce.common.dto.response.PageResponse;
import com.sport.ecommerce.modules.category.dto.request.CategoryRequest;
import com.sport.ecommerce.modules.category.dto.response.CategoryResponse;
import com.sport.ecommerce.modules.category.dto.response.CategoryTreeResponse;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface CategoryService {

    PageResponse<CategoryResponse> getCategories(Pageable pageable);

    List<CategoryTreeResponse> getCategoryTree();

    List<CategoryResponse> getAllFlat();

    CategoryResponse getCategoryById(Long id);

    PageResponse<CategoryResponse> getCategoriesExcludeChildren(Pageable pageable);

    CategoryResponse getCategoryBySlug(String slug);

    CategoryResponse createCategory(CategoryRequest request);

    CategoryResponse updateCategory(Long id, CategoryRequest request);

    void deleteCategory(Long id);

    // ── Hierarchy-aware accessors ─────────────────────────────────────────────

    /** Returns all root (level-1) categories. These are fixed; never create/modify them. */
    List<CategoryResponse> getLevel1Categories();

    /** Returns all domain (level-2) categories. These are fixed; never create/modify them. */
    List<CategoryResponse> getLevel2Categories();

    /** Returns all leaf (level-3) categories. Only these may be assigned to products. */
    List<CategoryResponse> getLevel3Categories();

    /**
     * Validates that the given category is a leaf (level-3) category.
     * Throws {@link com.sport.ecommerce.exception.custom.BusinessException} if it is not.
     */
    void validateLeafCategory(Long categoryId);
}
