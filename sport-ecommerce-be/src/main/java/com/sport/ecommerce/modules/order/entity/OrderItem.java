package com.sport.ecommerce.modules.order.entity;

import com.sport.ecommerce.modules.product.entity.variant.ProductVariant;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Entity
@Table(name = "order_items")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class OrderItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "order_id")
    private Order order;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "product_variant_id")
    private ProductVariant productVariant;

    @Column(length = 255)
    private String productName;

    @Column(precision = 12, scale = 2)
    private BigDecimal price;

    private Integer quantity;

    @Column(precision = 12, scale = 2)
    private BigDecimal subtotal;

}
