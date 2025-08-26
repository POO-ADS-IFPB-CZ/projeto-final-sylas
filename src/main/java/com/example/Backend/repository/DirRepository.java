package com.example.Backend.repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import com.example.Backend.model.archives.Dir;

public interface DirRepository extends MongoRepository<Dir,String>{
    List<Dir> findAllByUserReference(String userReference);
    Dir findByUserReferenceAndPath(String userReference, String path);
    Dir findByName(String name);
    Dir findByUserReference(String userReference);
    Dir findByUserReferenceAndPathAndName(String userReference, String path, String name);
}
