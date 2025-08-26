package com.example.Backend.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import lombok.Data;

@Component
@Data
public class GeminiConfig {
    @Value("${app.gemini.modelName}")
    private String modelName;
    
    @Value("${app.gemini.apiKey}")  
    private String apiKey;
    
}
