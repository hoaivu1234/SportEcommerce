package com.sport.ecommerce.modules.user.service;

import com.sport.ecommerce.common.dto.response.PageResponse;
import com.sport.ecommerce.modules.user.dto.request.CreateUserRequest;
import com.sport.ecommerce.modules.user.dto.request.UpdateUserRequest;
import com.sport.ecommerce.modules.user.dto.response.UserResponse;
import org.springframework.data.domain.Pageable;

public interface UserService {

    PageResponse<UserResponse> getUsers(Pageable pageable);

    UserResponse getUserById(Long id);

    UserResponse createUser(CreateUserRequest request);

    UserResponse updateUser(Long id, UpdateUserRequest request);

    void deleteUser(Long id);
}
