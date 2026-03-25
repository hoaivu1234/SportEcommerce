package com.sport.ecommerce.modules.order.entity;

import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;

/**
 * JPA converter that persists {@link ShippingAddress} as a JSON string
 * in the TEXT column. A static ObjectMapper is used because JPA converters
 * are not Spring-managed beans and therefore cannot use @Autowired.
 */
@Converter
public class ShippingAddressConverter implements AttributeConverter<ShippingAddress, String> {

    private static final ObjectMapper MAPPER = new ObjectMapper();

    @Override
    public String convertToDatabaseColumn(ShippingAddress address) {
        if (address == null) return null;
        try {
            return MAPPER.writeValueAsString(address);
        } catch (Exception e) {
            throw new IllegalStateException("Failed to serialize ShippingAddress to JSON", e);
        }
    }

    @Override
    public ShippingAddress convertToEntityAttribute(String json) {
        if (json == null || json.isBlank()) return null;
        try {
            return MAPPER.readValue(json, ShippingAddress.class);
        } catch (Exception e) {
            throw new IllegalStateException("Failed to deserialize ShippingAddress from JSON: " + json, e);
        }
    }
}
