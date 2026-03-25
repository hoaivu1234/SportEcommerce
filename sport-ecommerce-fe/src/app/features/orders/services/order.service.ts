import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';

import { BaseHttpService } from '../../../core/services/base-http.service';
import { ORDER_API, ADMIN_ORDER_API } from '../../../core/constants/api-path.constant';
import {
  CheckoutRequest,
  OrderResponse,
  OrderSummaryResponse,
  OrderStatusUpdateRequest,
} from '../../../models/order.model';
import { ApiResponse } from '../../../models/api-response.model';
import { PageApiResponse } from '../../../models/page-response.model';

@Injectable({ providedIn: 'root' })
export class OrderService {
  private readonly http = inject(BaseHttpService);

  // ── Customer ──────────────────────────────────────────────────────────────

  placeOrder(request: CheckoutRequest): Observable<ApiResponse<OrderResponse>> {
    return this.http.post<OrderResponse>(ORDER_API.BASE, request);
  }

  getMyOrders(page = 0, size = 10): Observable<PageApiResponse<OrderSummaryResponse>> {
    return this.http.getPaged<OrderSummaryResponse>(
      ORDER_API.BASE,
      { page, size },
    );
  }

  getOrderById(id: number): Observable<ApiResponse<OrderResponse>> {
    return this.http.get<OrderResponse>(ORDER_API.BY_ID(id));
  }

  getOrderByNumber(orderNumber: string): Observable<ApiResponse<OrderResponse>> {
    return this.http.get<OrderResponse>(ORDER_API.BY_NUMBER(orderNumber));
  }

  cancelOrder(id: number): Observable<ApiResponse<OrderResponse>> {
    return this.http.delete<OrderResponse>(ORDER_API.CANCEL(id));
  }

  // ── Admin ─────────────────────────────────────────────────────────────────

  getAllOrders(page = 0, size = 20, status?: string): Observable<PageApiResponse<OrderSummaryResponse>> {
    return this.http.getPaged<OrderSummaryResponse>(
      ADMIN_ORDER_API.BASE,
      { page, size },
      status ? { status } : undefined,
    );
  }

  updateOrderStatus(id: number, request: OrderStatusUpdateRequest): Observable<ApiResponse<OrderResponse>> {
    return this.http.patch<OrderResponse>(ADMIN_ORDER_API.STATUS(id), request);
  }
}
