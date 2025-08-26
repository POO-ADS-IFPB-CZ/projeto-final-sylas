package com.example.Backend.model.user;

import com.example.Backend.model.archives.Dir;

import lombok.Data;

@Data
public class UserData {
    private String email;
    private Dir dir;
}
