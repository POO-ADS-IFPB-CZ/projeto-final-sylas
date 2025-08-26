package com.example.Backend.model.archives;

import java.util.HashSet;
import java.util.Set;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Data;

@Document(collection = "Dirs")
@Data
public class Dir {
    
    @Id
    private String id;
    private String name;
    private String userReference;
    private String path;
    private Set<DirSig> subDirs = new HashSet<>(); // guarda a assinatura dos diretórios
    private Set<FileSig> files = new HashSet<>(); //guarda a dos arquivos

}
