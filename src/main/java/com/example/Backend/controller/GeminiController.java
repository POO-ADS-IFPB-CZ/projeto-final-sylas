package com.example.Backend.controller;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.Backend.model.gemini.GeminiRequest;
import com.example.Backend.service.GeminiService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class GeminiController {
    private final GeminiService geminiService;

    @PostMapping("/gerar")
    public String gerarTexto(@RequestBody GeminiRequest request) {
        return geminiService.responseContent(request);
    }
}