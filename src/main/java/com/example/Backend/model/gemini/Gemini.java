package com.example.Backend.model.gemini;

// Importe o PostConstruct
import jakarta.annotation.PostConstruct;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.example.Backend.config.GeminiConfig;
import com.google.genai.Chat;
import com.google.genai.Client;
import com.google.genai.types.Content;
import com.google.genai.types.GenerateContentResponse;
import com.google.genai.types.Part;

@Component
public class Gemini {
    
    @Autowired
    private GeminiConfig config;

    private Client client;
    private Chat chatSession;

    /**
     * Este método será executado pelo Spring depois que o bean 'Gemini' for criado
     * e a dependência 'config' for injetada.
     */
    @PostConstruct
    public void init() {
        this.client = Client.builder().apiKey(config.getApiKey()).build();
        this.chatSession = client.chats.create(config.getModelName());
    }

    public GenerateContentResponse response(GeminiRequest prompt){
        try {
            
            if (prompt.getImageUri() != null && !prompt.getImageUri().isBlank()) {
                Content content = Content.fromParts(
                    Part.fromText(prompt.getPrompt()),
                    Part.fromUri(prompt.getImageUri(), prompt.getImageType())
                );
                // Use a variável de classe 'chatSession' que foi inicializada no método init()
                return this.chatSession.sendMessage(content);
            }

            return this.chatSession.sendMessage(prompt.getPrompt());

        } catch (Exception e) {
            // Tratamento mais seguro
            throw new RuntimeException("Erro ao gerar conteúdo com Gemini", e);
        }
    }
}