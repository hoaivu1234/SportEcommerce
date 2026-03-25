package com.sport.ecommerce.modules.order.controller;

import com.sport.ecommerce.common.constant.AppConstant;
import com.sport.ecommerce.common.dto.response.ApiResponse;
import com.sport.ecommerce.modules.order.dto.request.OrderStatusUpdateRequest;
import com.sport.ecommerce.modules.order.dto.response.OrderResponse;
import com.sport.ecommerce.modules.order.dto.response.OrderSummaryResponse;
import com.sport.ecommerce.modules.order.service.OrderService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(AppConstant.ADMIN_PREFIX + "/orders")
@RequiredArgsConstructor
public class AdminOrderController {

    private final OrderService orderService;

    /** GET /api/v1/admin/orders?status=PENDING&page=0&size=20 */
    @GetMapping
    public ResponseEntity<ApiResponse<Page<OrderSummaryResponse>>> getAllOrders(
            @RequestParam(required = false) String status,
            @RequestParam(defaultValue = "0")  int page,
            @RequestParam(defaultValue = "20") int size) {
        Page<OrderSummaryResponse> result = orderService.getAllOrders(
                status,
                PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "createdAt")));
        return ResponseEntity.ok(ApiResponse.success(result));
    }

    /** GET /api/v1/admin/orders/{id} */
    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<OrderResponse>> getOrderById(@PathVariable Long id) {
        return ResponseEntity.ok(ApiResponse.success(orderService.getOrderById(id)));
    }

    /** PATCH /api/v1/admin/orders/{id}/status */
    @PatchMapping("/{id}/status")
    public ResponseEntity<ApiResponse<OrderResponse>> updateStatus(
            @PathVariable Long id,
            @Valid @RequestBody OrderStatusUpdateRequest request) {
        return ResponseEntity.ok(ApiResponse.success(orderService.updateStatus(id, request)));
    }
}
