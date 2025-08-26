package com.example.Backend.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.Backend.model.archives.Dir;
import com.example.Backend.model.archives.File;
import com.example.Backend.model.archives.FileSig;
import com.example.Backend.repository.FileRepository;

@Service
public class FileService {
    
    @Autowired
    private FileRepository fileRepository;

    @Autowired
    private DirService dirService;

    public List<File> listAllFiles() {
        return fileRepository.findAll();
    }

    public File findFileByName(String name) {
        return fileRepository.findByName(name);
    }

    public Dir saveFile(File file, String dirId) {

        
        
        Dir dir = dirService.getDir(dirId);
        if(dir == null){
            throw new IllegalArgumentException("Directory not found with id: " + dirId);
        }
        
        //Atualiza o do arquivo se já existir
        File existingFile = fileRepository.findByDirIdAndName(dirId, file.getName());
        if (existingFile != null) {
            existingFile.setContent(file.getContent());
            fileRepository.save(existingFile);
            return dir;
        }

        // criando assinatura do arquivo
        
        // salvando o arquivo
        File finalFile = fileRepository.save(file);
        
        FileSig fileSig = new FileSig();
        fileSig.setCode(finalFile.getId()); 
        fileSig.setName(finalFile.getName());
        fileSig.setType(finalFile.getType());
        
        
        dir.getFiles().add(fileSig);

        return dirService.saveDir(dir);
        
    }

    public File getFile(String fileId) {
        return fileRepository.findById(fileId)
                .orElseThrow(() -> new IllegalArgumentException("File not found with id: " + fileId));
    }


}
