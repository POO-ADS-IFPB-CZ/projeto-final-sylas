package com.example.Backend.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import com.example.Backend.model.user.User;

public interface UserRepository extends MongoRepository<User,String>{
    User findByName(String name);
    User findByEmail(String email);
}
