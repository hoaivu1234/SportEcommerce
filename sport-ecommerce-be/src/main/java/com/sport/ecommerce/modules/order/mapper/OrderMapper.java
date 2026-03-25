package com.sport.ecommerce.modules.order.mapper;

import com.sport.ecommerce.modules.order.dto.request.ShippingAddressRequest;
import com.sport.ecommerce.modules.order.dto.response.OrderItemResponse;
import com.sport.ecommerce.modules.order.dto.response.OrderResponse;
import com.sport.ecommerce.modules.order.dto.response.OrderSummaryResponse;
import com.sport.ecommerce.modules.order.entity.Order;
import com.sport.ecommerce.modules.order.entity.OrderItem;
import com.sport.ecommerce.modules.order.entity.ShippingAddress;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface OrderMapper {

    // ── ShippingAddress ───────────────────────────────────────────────────────

    ShippingAddress toEntity(ShippingAddressRequest request);

    // ── OrderItem ─────────────────────────────────────────────────────────────

    @Mapping(target = "productVariantId", source = "productVariant.id")
    OrderItemResponse toItemResponse(OrderItem item);

    // ── Order ─────────────────────────────────────────────────────────────────

    @Mapping(target = "items", source = "items")
    OrderResponse toResponse(Order order);

    @Mapping(target = "itemCount", expression = "java(order.getItems().size())")
    OrderSummaryResponse toSummary(Order order);
}
