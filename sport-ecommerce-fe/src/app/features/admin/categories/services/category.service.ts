import { inject, Injectable } from '@angular/core';
import { BaseHttpService } from '../../../../core/services/base-http.service';
import { Observable } from 'rxjs';
import { ApiResponse } from '../../../../models/api-response.model';
import { CATEGORY_API } from '../../../../core/constants/api-path.constant';

export interface PageResponse<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  size: number;
  page: number;
  last: boolean;
}

export interface Category {
  id: number;
  name: string;
  createdAt: Date;
  productCount: number;
  slug: string;
}

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private readonly http = inject(BaseHttpService);

  getFlatCategories(): Observable<ApiResponse<PageResponse<Category>>> {
    return this.http.get<PageResponse<Category>>(CATEGORY_API.FLAT);
  }
}
