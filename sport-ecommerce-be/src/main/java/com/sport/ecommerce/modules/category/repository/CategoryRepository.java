package com.sport.ecommerce.modules.category.repository;

import com.sport.ecommerce.modules.category.dto.response.CategoryResponse;
import com.sport.ecommerce.modules.category.entity.Category;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Long> {

    Optional<Category> findBySlug(String slug);

    boolean existsBySlug(String slug);

    @Query("SELECT c FROM Category c WHERE c.parent IS NULL ORDER BY c.name ASC")
    List<Category> findAllRootCategories();

    @Query("SELECT c FROM Category c LEFT JOIN FETCH c.children WHERE c.parent IS NULL ORDER BY c.name ASC")
    List<Category> findAllRootCategoriesWithChildren();

    @Query("""
    SELECT new com.sport.ecommerce.modules.category.dto.response.CategoryResponse(
        c.id,
        c.name,
        c.slug,
        p.id,
        p.name,
        COUNT(pr.id),
        c.createdAt
    )
    FROM Category c
    LEFT JOIN c.parent p
    LEFT JOIN Product pr ON pr.category.id = c.id
    GROUP BY c.id, c.name, c.slug, p.id, p.name, c.createdAt
    """)
    Page<CategoryResponse> findAllCategoriesExcludeChildren(Pageable pageable);

    @Query("""
    SELECT new com.sport.ecommerce.modules.category.dto.response.CategoryResponse(
        c.id,
        c.name,
        c.slug,
        p.id,
        p.name,
        COUNT(pr.id),
        c.createdAt
    )
    FROM Category c
    LEFT JOIN c.parent p
    LEFT JOIN Product pr ON pr.category.id = c.id
    GROUP BY c.id, c.name, c.slug, p.id, p.name, c.createdAt
    ORDER BY c.name ASC
    """)
    List<CategoryResponse> findAllFlat();

    List<Category> findByParentId(Long parentId);

    boolean existsByName(String name);

    boolean existsBySlugAndIdNot(String slug, Long id);

    Optional<Category> findByName(String name);

    /** Level-1: root categories (no parent) */
    @Query("SELECT c FROM Category c WHERE c.parent IS NULL ORDER BY c.name ASC")
    List<Category> findAllLevel1();

    /** Level-2: domain categories (parent exists, grandparent does not) */
    @Query("SELECT c FROM Category c JOIN c.parent p WHERE p.parent IS NULL ORDER BY c.name ASC")
    List<Category> findAllLevel2();

    /** Level-3: leaf categories (parent and grandparent both exist) */
    @Query("SELECT c FROM Category c JOIN c.parent p JOIN p.parent gp ORDER BY c.name ASC")
    List<Category> findAllLevel3();
}
