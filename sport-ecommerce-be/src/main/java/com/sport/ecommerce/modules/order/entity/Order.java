package com.sport.ecommerce.modules.order.entity;

import com.sport.ecommerce.modules.user.entity.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "orders")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @Column(length = 100)
    private String orderNumber;

    @Column(precision = 12, scale = 2)
    private BigDecimal totalPrice;

    @Column(length = 30)
    private String status;

    @Column(length = 30)
    private String paymentStatus;

    @Column(columnDefinition = "TEXT")
    private String shippingAddress;

    @CreationTimestamp
    private LocalDateTime createdAt;

}
