import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

import { BaseHttpService } from '../../../core/services/base-http.service';
import { CART_API } from '../../../core/constants/api-path.constant';
import { CartResponse } from '../../../models/cart.model';
import { ApiResponse } from '../../../models/api-response.model';

export interface MergeCartItem {
  variantId: number;
  quantity:  number;
}

@Injectable({ providedIn: 'root' })
export class CartService {
  private readonly http = inject(BaseHttpService);

  getCart(): Observable<ApiResponse<CartResponse>> {
    return this.http.get<CartResponse>(CART_API.BASE);
  }

  addItem(variantId: number, quantity: number): Observable<ApiResponse<CartResponse>> {
    return this.http.post<CartResponse>(CART_API.ADD, { variantId, quantity });
  }

  updateItem(itemId: number, quantity: number): Observable<ApiResponse<CartResponse>> {
    return this.http.put<CartResponse>(CART_API.UPDATE(itemId), { quantity });
  }

  removeItem(itemId: number): Observable<ApiResponse<CartResponse>> {
    return this.http.delete<CartResponse>(CART_API.REMOVE(itemId));
  }

  /** Merges guest (localStorage) items into the server cart after login. */
  mergeGuestCart(items: MergeCartItem[]): Observable<ApiResponse<CartResponse>> {
    return this.http.post<CartResponse>(CART_API.MERGE, { items });
  }

  clearCart(): Observable<ApiResponse<CartResponse>> {
    return this.http.delete<CartResponse>(CART_API.BASE);
  }
}
