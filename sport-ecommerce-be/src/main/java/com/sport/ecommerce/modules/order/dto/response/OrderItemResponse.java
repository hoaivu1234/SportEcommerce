package com.sport.ecommerce.modules.order.dto.response;

import lombok.Builder;
import lombok.Data;

import java.math.BigDecimal;

@Data
@Builder
public class OrderItemResponse {

    private Long id;
    private Long productVariantId;
    private String productName;
    private String variantSku;
    private String variantSize;
    private String variantColor;
    private String productImageUrl;
    private BigDecimal price;
    private Integer quantity;
    private BigDecimal subtotal;
}
