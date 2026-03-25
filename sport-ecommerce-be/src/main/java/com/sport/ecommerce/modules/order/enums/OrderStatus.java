package com.sport.ecommerce.modules.order.enums;

/**
 * Lifecycle states of an Order.
 *
 * Allowed transitions:
 *   PENDING  → CONFIRMED  (admin confirms payment)
 *   CONFIRMED → SHIPPED   (admin marks as shipped)
 *   SHIPPED  → COMPLETED  (admin marks as delivered)
 *   PENDING  → CANCELLED  (customer or admin)
 *   CONFIRMED → CANCELLED (admin only)
 */
public enum OrderStatus {
    PENDING,
    CONFIRMED,
    SHIPPED,
    COMPLETED,
    CANCELLED
}
