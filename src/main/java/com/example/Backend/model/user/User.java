package com.example.Backend.model.user;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Data;

@Document(collection = "logs")
@Data
public class User {
    
    @Id
    private String id;
    private String name;
    private String email;
    private String password;

}
