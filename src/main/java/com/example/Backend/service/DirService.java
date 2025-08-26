package com.example.Backend.service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.Backend.model.archives.Dir;
import com.example.Backend.model.archives.DirSig;
import com.example.Backend.model.archives.FileSig;
import com.example.Backend.repository.DirRepository;
import com.example.Backend.model.archives.Signature;

@Service
public class DirService {
    
    @Autowired
    private DirRepository dirRepository;

    /**
     * @return
     */
    public List<Dir> listAll(){
        return dirRepository.findAll();
    }

    /**
     * @param email
     * @return
     */
    public List<String> allPathsUser(String email){
        List<String> paths = dirRepository.findAllByUserReference(email)
        .stream()
        .map(Dir::getPath)
        .collect(Collectors.toList());
        return paths;
    }

    /**
     * @param dir
     * @return
     */
    public Dir saveDir(Dir dir){
        if(dir.getName() == null || dir.getName().isEmpty() && !dir.getPath().equals("r:")){
            throw new IllegalArgumentException("O nome do diretório não pode ser vazio");
        }
        if(dir.getUserReference() == null || dir.getUserReference().isEmpty()){
            throw new IllegalArgumentException("O email do usuário não pode ser vazio");
        }
        return dirRepository.save(dir);
    }

    // cria o diretório raiz para o usuário
    /**
     * @param email
     * @return
     */
    public Boolean createRoot(String email){
        if(!email.isEmpty()){
            Dir root = new Dir();
            root.setName("");
            root.setPath("r:");
            root.setUserReference(email);
            this.saveDir(root);
            return true;
        }
        throw new IllegalAccessError("O email não foi devidamente preenchido");
    }

    /**
     * @param email
     * @return
     * @throws IllegalAccessException
     */
    public Dir getRoot(String email) throws IllegalAccessException{
        Dir dir = dirRepository.findByUserReferenceAndPath(email, "r:");
        if(dir != null){
            return dir;
        }
        throw new IllegalAccessException("Diretório não encontrado");
    }


    /**
     * @param dirId
     * @return
     */
    public List<DirSig> listIdDirUser(String dirId){
        Dir dir = getDir(dirId);

        // passa todos os subdiretórios para a lista
        List<DirSig> content = dir.getSubDirs()
        .stream()
        .toList();
        return content;
    }

    /**
     * @param fileId
     * @return
     */
    public List<FileSig> listIdFileUser(String fileId){
        Dir dir = getDir(fileId);

        //passa todos os arquivos do diretório para a lista
        List<FileSig> content = dir.getFiles()
        .stream()
        .toList();
        return content;
    }

    // verificar se um diretório pertence a um 
    /**
     * @param nameDir
     * @param fatherDirId
     * @return
     * @throws IllegalArgumentException
     */
    public Boolean matchDirNameCode(String nameDir, String fatherDirId) throws IllegalArgumentException{
        List<String> names = listIdDirUser(fatherDirId).stream().map(DirSig::getName).collect(Collectors.toList());
        if(names.contains(nameDir))
            return true;
        
        throw new IllegalArgumentException("Dirtório inexistente");
    }

    // pwd
    /**
     * @param dirId
     * @return
     */
    public Dir getDir(String dirId){ // obtem o diretório atual que o usuário está
        Dir dir = dirRepository.findById(dirId)
            .orElseThrow(() -> new IllegalArgumentException("Diretório não encontrado"));
        return dir;
    }

    // ls
    /**
     * @param dirId
     * @return
     */
    public List<Signature> listContentDir(String dirId){
        List<DirSig> dirs = listIdDirUser(dirId); // coletar os ids dos diretórios
        List<FileSig> files = listIdFileUser(dirId); // coletar os ids dos arquivos

        List<Signature> content = new ArrayList<>();
        content.addAll(dirs);
        content.addAll(files);
        return content;
    }
    
    // cria um novo diretório: mkdir
    /**
     * @param dir
     * @param dirAtualId
     * @return
     * @throws IllegalArgumentException
     * @throws IllegalAccessException
     */
    public Dir createDir(Dir dir, String dirAtualId) throws IllegalArgumentException, IllegalAccessException {
        Dir fatherDir = getDir(dirAtualId);
        if(!dir.getUserReference().equals(fatherDir.getUserReference())){
            throw new IllegalAccessException("O diretório não pertence ao usuário atual");
        }
        if(dir.getName().isEmpty()){
            throw new IllegalArgumentException("O nome do diretório não pode ser vazio");
        }
        
        String forbiddenChars = "\\/:*?\"<>|";
        for(char c : forbiddenChars.toCharArray()){
            if(dir.getName().indexOf(c) >= 0){
                throw new IllegalArgumentException("O nome do diretório contém caracteres inválidos");
            }
        }
    
        dir.setPath(fatherDir.getPath() + "/" + dir.getName());

        // verifica se o diretório já existe
        if(dirRepository.findByUserReferenceAndPathAndName(dir.getUserReference(), dir.getPath(), dir.getName()) != null){
            throw new IllegalArgumentException("O diretório já existe");
        }

        Dir finalDir = this.saveDir(dir);
        DirSig dirSig = new DirSig();
        
        dirSig.setCode(finalDir.getId());
        dirSig.setName(finalDir.getName());
        dirSig.setType("dir");

        fatherDir.getSubDirs().add(dirSig);

        return this.saveDir(fatherDir);
    }

    //cd
    /**
     * @param fatherId
     * @param dirId
     * @return
     * @throws IllegalAccessException
     */
    public Dir changeDir(String fatherId, String dirId) throws IllegalAccessException {
        Dir dir = getDir(dirId);
        Dir dirAtual = getDir(fatherId);

        if(!dir.getUserReference().equals(dirAtual.getUserReference())){
            throw new IllegalAccessException("O diretório não pertence ao usuário atual");
        }

        // // verifica se o diretório é um subdiretório do diretório atual
        // if(!dir.getPath().startsWith(dirAtual.getPath())){
        //     throw new IllegalAccessException("O diretório não é um subdiretório do diretório atual");
        // }

        return dir;
    }

    //rm
    /**
     * @param fatherId
     * @param dirId
     * @return
     * @throws IllegalAccessException
     */
    public Dir rmDir(String fatherId, String dirId) throws IllegalAccessException{
        Dir dir = getDir(dirId);
        Dir dirAtual = getDir(fatherId);

        if(!dir.getUserReference().equals(dirAtual.getUserReference())){
            throw new IllegalAccessException("O diretório não pertence ao usuário atual");
        }

        // verifica se o diretório é um subdiretório do diretório atual
        if(!dir.getPath().startsWith(dirAtual.getPath())){
            throw new IllegalAccessException("O diretório não é um subdiretório do diretório atual");
        }

        List<Dir> allDirs = dirRepository.findAllByUserReference(dir.getUserReference());
        allDirs.stream().forEach(d->{
            if(d.getPath().startsWith(dir.getPath())){
                dirRepository.delete(d);
            }
        });

        dirRepository.delete(dir);
        dirAtual.getSubDirs().removeIf(item -> item.getCode().equals(dir.getId()));

        return this.saveDir(dirAtual);

    }
}