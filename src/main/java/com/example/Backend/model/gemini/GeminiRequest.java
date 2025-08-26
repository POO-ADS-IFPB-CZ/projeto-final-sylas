package com.example.Backend.model.gemini;

import lombok.Data;

@Data
public class GeminiRequest {
    private String prompt;
    private String imageUri;
    private String imageType = "image/jpeg";
}