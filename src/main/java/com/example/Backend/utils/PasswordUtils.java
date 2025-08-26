package com.example.Backend.utils;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

public class PasswordUtils {
    
    private static final PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public static String hashPassword(String password){
        return passwordEncoder.encode(password);
    }

    public static boolean checkPassword(String password, String hashedPassword){
        return passwordEncoder.matches(password,hashedPassword);
    }
}
