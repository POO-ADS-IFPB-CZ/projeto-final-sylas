package com.example.Backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.Backend.model.archives.Dir;
import com.example.Backend.model.archives.File;
import com.example.Backend.model.archives.Signature;
import com.example.Backend.service.DirService;
import com.example.Backend.service.FileService;

@RestController
@RequestMapping("/archives")
public class ArchiveController {
    // o root é criado no userService, na hora de criação do usuário no sistema
    @Autowired
    private DirService dirService;

    @Autowired
    private FileService fileService;

    /**
     * @param dirId
     * @return
     * @throws IllegalAccessException
     */
    @GetMapping("/{dirId}")
    public Dir getDirectory(@PathVariable String dirId) throws IllegalAccessException {
        return dirService.getDir(dirId);
    }

    /**
     * @return
     */
    @GetMapping("/listAll")
    public List<Dir> listAllDirectories() {
        return dirService.listAll();
    }

    /**
     * @param dirId
     * @return
     */
    @GetMapping("/ls/{dirId}")
    public List<Signature> listUserDirectories(@PathVariable String dirId) {
        return dirService.listContentDir(dirId);
    }

    /**
     * @param fatherId
     * @param dirId
     * @return
     * @throws IllegalAccessException
     */
    @GetMapping("/cd/{fatherId}/{dirId}")
    public Dir changeDirectory(@PathVariable String fatherId, @PathVariable String dirId) throws IllegalAccessException{
        return dirService.changeDir(fatherId, dirId);
    }
    
    /**
     * @param dir
     * @param dirId
     * @return
     * @throws IllegalArgumentException
     * @throws IllegalAccessException
     */
    @PostMapping("/mkDir/{dirId}")
    public Dir createDirectory(@RequestBody Dir dir, @PathVariable String dirId) throws IllegalArgumentException, IllegalAccessException {
        return dirService.createDir(dir, dirId);
    }

    /**
     * @param file
     * @param dirId
     * @return
     * @throws IllegalAccessException
     */
    @PostMapping("/saveFile/{dirId}")
    public Dir saveFile(@RequestBody File file, @PathVariable String dirId) throws IllegalAccessException {
        return fileService.saveFile(file, dirId);
    }
    
    @GetMapping("/getFile/{fileId}")
    public File getFile(@PathVariable String fileId) throws IllegalAccessException {
        return fileService.getFile(fileId);
    }

    /**
     * @param fatherId
     * @param dirId
     * @return
     * @throws IllegalAccessException
     */
    @DeleteMapping("/rmdir/{fatherId}/{dirId}")
    public Dir deleteDir(@PathVariable String fatherId, @PathVariable String dirId) throws IllegalAccessException{
        return dirService.rmDir(fatherId, dirId);
    }
}
