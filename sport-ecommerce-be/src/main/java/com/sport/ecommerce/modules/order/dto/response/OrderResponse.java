package com.sport.ecommerce.modules.order.dto.response;

import com.sport.ecommerce.modules.order.entity.ShippingAddress;
import com.sport.ecommerce.modules.order.enums.OrderStatus;
import lombok.Builder;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

/** Full order detail — returned when viewing a single order. */
@Data
@Builder
public class OrderResponse {

    private Long id;
    private String orderNumber;
    private OrderStatus status;
    private String paymentStatus;

    private List<OrderItemResponse> items;

    private BigDecimal subtotal;
    private BigDecimal discountAmount;
    private BigDecimal shippingFee;
    private BigDecimal totalPrice;

    private ShippingAddress shippingAddress;
    private String notes;

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
