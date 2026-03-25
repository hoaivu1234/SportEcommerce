package com.sport.ecommerce.modules.cart.dto.request;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.util.List;

@Data
public class MergeCartRequest {

    /** Items from the guest (localStorage) cart to merge into the server cart. */
    @NotNull
    @Valid
    private List<MergeCartItemRequest> items;
}
