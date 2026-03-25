package com.sport.ecommerce.modules.order.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Value object capturing the shipping address at the moment an order is placed.
 * Stored as a JSON string in the orders.shipping_address column via
 * {@link ShippingAddressConverter}, so it is never affected by address book changes.
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ShippingAddress {

    private String fullName;
    private String phone;
    /** Street address, apartment, suite, etc. */
    private String addressLine;
    private String ward;
    private String district;
    private String province;
}
