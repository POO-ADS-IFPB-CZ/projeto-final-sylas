package com.example.Backend.repository;

import java.util.List;
import org.springframework.data.mongodb.repository.MongoRepository;
import com.example.Backend.model.archives.File;

public interface FileRepository extends MongoRepository<File, String> {
    File findByName(String name);
    File findByDirIdAndName(String dirId, String name);
    List<File> findByDirId(String dirId);
    List<File> findByUserReference(String userReference);
    List<File> findByType(String type);
    
}
