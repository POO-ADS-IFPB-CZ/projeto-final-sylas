package com.example.Backend.model.gemini;

import lombok.Data;

@Data
public class GeminiResponse {
    private String response;
    private String error;
}