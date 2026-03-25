package com.sport.ecommerce.modules.order.dto.request;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class CheckoutRequest {

    @NotNull(message = "Shipping address is required")
    @Valid
    private ShippingAddressRequest shippingAddress;

    /** Optional customer note attached to the order. */
    private String notes;

    /**
     * Payment method identifier (e.g. "COD", "BANK_TRANSFER").
     * Future: replaced by a payment gateway callback.
     */
    private String paymentMethod;
}
