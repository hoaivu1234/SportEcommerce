package com.sport.ecommerce.modules.order.service;

import com.sport.ecommerce.modules.order.dto.request.CheckoutRequest;
import com.sport.ecommerce.modules.order.dto.request.OrderStatusUpdateRequest;
import com.sport.ecommerce.modules.order.dto.response.OrderResponse;
import com.sport.ecommerce.modules.order.dto.response.OrderSummaryResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface OrderService {

    /**
     * Creates an order from the current user's cart.
     * Deducts stock (pessimistic lock), clears the cart, persists the order.
     */
    OrderResponse placeOrder(CheckoutRequest request);

    /** Returns the authenticated user's orders, newest first. */
    Page<OrderSummaryResponse> getMyOrders(Pageable pageable);

    /** Returns a single order; throws 403 if the caller doesn't own it (unless admin). */
    OrderResponse getOrderById(Long id);

    /** Returns a single order by orderNumber (used on confirmation page). */
    OrderResponse getOrderByNumber(String orderNumber);

    /** Customer can cancel a PENDING order. */
    OrderResponse cancelOrder(Long id);

    // ── Admin ─────────────────────────────────────────────────────────────────

    Page<OrderSummaryResponse> getAllOrders(String status, Pageable pageable);

    OrderResponse updateStatus(Long id, OrderStatusUpdateRequest request);
}
