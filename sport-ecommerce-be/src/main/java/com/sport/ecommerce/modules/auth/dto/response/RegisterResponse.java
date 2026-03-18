package com.sport.ecommerce.modules.auth.dto.response;

import com.sport.ecommerce.modules.user.dto.response.UserResponse;
import lombok.Data;

@Data
public class RegisterResponse {
    private UserResponse user;
    private String accessToken;
    private String refreshToken;
}
