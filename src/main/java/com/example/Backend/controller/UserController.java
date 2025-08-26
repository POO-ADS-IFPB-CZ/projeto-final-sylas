package com.example.Backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.Backend.model.user.User;
import com.example.Backend.model.user.UserCredentials;
import com.example.Backend.model.user.UserData;
import com.example.Backend.service.UserService;

@RestController
@RequestMapping("/user")
public class UserController {
    
    @Autowired
    private UserService userService;

    @GetMapping
    public List<User> getUsers(){
        return userService.listAll();
    }
    
    @GetMapping("/{userEmail}")
    public UserData findUser(@PathVariable String userEmail) throws IllegalAccessException{
        return userService.findUserData(userEmail);
    }
    
    @PostMapping
    public Boolean createUser(@RequestBody User user){
        return userService.createUser(user);
    }

    @PostMapping("/changePassword")
    public Boolean changePassUser(@RequestBody UserCredentials userCredentials) throws IllegalAccessException{
        return userService.changePassword(userCredentials);
    }
    
    @PostMapping("/login")
    public UserData enterAccount(@RequestBody UserCredentials userCredentials) throws IllegalAccessException{
        return userService.login(userCredentials);
    }


}
