package com.example.Backend.model.archives;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Data;
@Document(collection = "Files")
@Data
public class File {
    
    @Id
    private String id;
    private String userReference;
    private String dirId;
    private String name;
    private String type;
    private String content;

}
