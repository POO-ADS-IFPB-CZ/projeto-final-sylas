package com.example.Backend.service;

// Lombok - injeta construtor para campos final e habilita o uso de logs com Slf4j
import lombok.extern.slf4j.Slf4j;

import org.springframework.beans.factory.annotation.Autowired;
// Imports do Spring
import org.springframework.stereotype.Service;

import com.example.Backend.model.gemini.Gemini;
import com.example.Backend.model.gemini.GeminiRequest;

@Slf4j // Permite uso do log.info(), log.error(), etc.
@Service // Declara que essa classe é um componente de serviço do Spring
public class GeminiService {

    @Autowired // Injeta a instância de Gemini automaticamente
    private Gemini gemini;

    /**
     * @param prompt
     * @return
     */
    public String responseContent(GeminiRequest prompt){
        System.out.println(gemini.response(prompt).text());
        return gemini.response(prompt).text();
    }
    
}
