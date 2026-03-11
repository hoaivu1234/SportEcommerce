package com.sport.ecommerce.modules.payment.entity;

import com.sport.ecommerce.modules.order.entity.Order;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "payments")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Payment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "order_id")
    private Order order;

    @Column(length = 50)
    private String paymentMethod;

    @Column(precision = 12, scale = 2)
    private BigDecimal amount;

    @Column(length = 30)
    private String status;

    @Column(length = 200)
    private String transactionId;

    @CreationTimestamp
    private LocalDateTime createdAt;

}
