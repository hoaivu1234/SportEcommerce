import { inject, Injectable } from '@angular/core';
import { BaseHttpService } from '../../../../core/services/base-http.service';
import { Observable } from 'rxjs';
import { ApiResponse } from '../../../../models/api-response.model';
import { PageApiResponse } from '../../../../models/page-response.model';
import { PaginationParams } from '../../../../models/pagination.model';
import { ADMIN_CATEGORY_API, PUBLIC_CATEGORY_API } from '../../../../core/constants/api-path.constant';

interface CategoryRequest {
  name: string;
  parentId?: number | null;
}

export interface CategoryResponse {
  id: number;
  name: string;
  createdAt: Date;
  parentId: number | null;
  parentName: string | null;
  slug: string;
}

export interface CategoryFlatResponse {
  id: number;
  name: string;
  createdAt: Date;
  productCount: number;
  slug: string;
  parentId: number | null;
  parentName: string | null;
}

/** Recursive tree node returned by /categories/tree — fully built by backend */
export interface CategoryTreeNode {
  id: number;
  name: string;
  slug: string;
  /** Products directly assigned to this category */
  productCount: number;
  /** productCount + all descendants — computed server-side */
  totalProductCount: number;
  children: CategoryTreeNode[];
}

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private readonly http = inject(BaseHttpService);

  // ── Public reads (no auth required) ──────────────────────────────────────

  /** Returns the full category tree — used by homepage and navigation */
  getTreeCategories(): Observable<ApiResponse<CategoryTreeNode[]>> {
    return this.http.get<CategoryTreeNode[]>(PUBLIC_CATEGORY_API.TREE);
  }

  /** Returns only level-2 (domain) categories — valid parents when creating a leaf category */
  getLevel2Categories(): Observable<ApiResponse<CategoryResponse[]>> {
    return this.http.get<CategoryResponse[]>(PUBLIC_CATEGORY_API.LEVEL2);
  }

  /** Returns only level-3 (leaf) categories — the only valid choice when assigning a product */
  getLevel3Categories(): Observable<ApiResponse<CategoryResponse[]>> {
    return this.http.get<CategoryResponse[]>(PUBLIC_CATEGORY_API.LEVEL3);
  }

  // ── Admin reads (ROLE_ADMIN required) ────────────────────────────────────

  getFlatCategories(pagination: PaginationParams): Observable<PageApiResponse<CategoryFlatResponse>> {
    return this.http.getPaged<CategoryFlatResponse>(ADMIN_CATEGORY_API.FLAT, pagination);
  }

  /** Returns all categories as a flat list (no pagination) — used for admin dropdowns */
  getAllCategories(): Observable<ApiResponse<CategoryFlatResponse[]>> {
    return this.http.get<CategoryFlatResponse[]>(ADMIN_CATEGORY_API.ALL);
  }

  // ── Admin writes ──────────────────────────────────────────────────────────

  createCategory(data: CategoryRequest): Observable<ApiResponse<CategoryResponse>> {
    return this.http.post<CategoryResponse>(ADMIN_CATEGORY_API.BASE, data);
  }

  updateCategory(id: number, data: CategoryRequest): Observable<ApiResponse<CategoryResponse>> {
    return this.http.put<CategoryResponse>(ADMIN_CATEGORY_API.BY_ID(id), data);
  }
}
