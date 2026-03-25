package com.sport.ecommerce.modules.order.dto.response;

import com.sport.ecommerce.modules.order.enums.OrderStatus;
import lombok.Builder;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDateTime;

/** Lightweight order row used in list views. */
@Data
@Builder
public class OrderSummaryResponse {

    private Long id;
    private String orderNumber;
    private OrderStatus status;
    private String paymentStatus;
    private int itemCount;
    private BigDecimal totalPrice;
    private LocalDateTime createdAt;
}
