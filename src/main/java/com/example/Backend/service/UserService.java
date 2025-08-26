package com.example.Backend.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.Backend.model.archives.Dir;
import com.example.Backend.model.user.User;
import com.example.Backend.model.user.UserCredentials;
import com.example.Backend.model.user.UserData;
import com.example.Backend.repository.UserRepository;
import com.example.Backend.utils.PasswordUtils;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private DirService dirService;

    /**
     * @return
     */
    public List<User> listAll(){
        return userRepository.findAll();
    }

    /**
     * @param email
     * @return
     * @throws IllegalAccessException
     */
    public UserData findUserData(String email) throws IllegalAccessException{
        User user = userRepository.findByEmail(email);
        if(user != null){
            UserData userData = new UserData();
            userData.setEmail(user.getEmail());
            Dir dir = dirService.getRoot(userData.getEmail());
            userData.setDir(dir);
            return userData;
        }
        throw new IllegalAccessException("Usuário não encontrado");
    }

    /**
     * @param email
     * @return
     */
    public User findUserEmail(String email){
        return userRepository.findByEmail(email);
    }

    /**
     * @param id
     * @return
     */
    public User findUserId(String id){
        return userRepository.findById(id).orElse(null);
    }

    /**
     * @param user
     * @return
     */
    public Boolean saveUser(User user){ //Salva as alterações no banco de dados
        user.setPassword(PasswordUtils.hashPassword(user.getPassword())); // faz a criptografia da senha 
        userRepository.save(user); // salva o usuário no banco de dados
        return true;
    }

    //Create
    /**
     * @param user
     * @return
     * @throws IllegalArgumentException
     */
    public Boolean createUser(User user) throws IllegalArgumentException{
        //verifica se o usuario já existe e cria caso não exista
        if(this.findUserEmail(user.getEmail()) == null){
            saveUser(user);
            dirService.createRoot(user.getEmail());
            return true;
        }
        throw new IllegalArgumentException("Esse email já foi cadastrado");

    }

    //Update
    /**
     * @param userPasswordChange
     * @return
     * @throws IllegalAccessException
     */
    public Boolean changePassword(UserCredentials userPasswordChange) throws IllegalAccessException{
        //veridica se o usuário existe e muda a senha caso exista
        User user = findUserEmail(userPasswordChange.getEmail());

        if(this.findUserEmail(user.getEmail()) != null){
            user.setPassword(userPasswordChange.getNewPassword());
            saveUser(user);
            return true;
        }
        throw new IllegalAccessException("Usuário não cadastrado, verifique o endereço de email");
    }

    //Login
    /**
     * @param userRequest
     * @return
     * @throws IllegalAccessException
     */
    public UserData login(UserCredentials userRequest) throws IllegalAccessException{
        User userFinal = this.findUserEmail(userRequest.getEmail());

        //Caso o usuário exista e a senha esteja correta
        if(userFinal != null && PasswordUtils.checkPassword(userRequest.getNewPassword(), userFinal.getPassword())){
            UserData userData = new UserData();
            userData.setEmail(userFinal.getEmail());
            Dir dir = dirService.getRoot(userData.getEmail());
            userData.setDir(dir);
            return userData;
        }

        throw new IllegalAccessException("Senha incorreta");
    }


    
}
