import React from "react";
import axios from "axios";

// TODO: Refatorar esse código para o userProvider.jsx

export function userNullVerify(user){
    if (user === null || user === undefined) {
        return false
    }
    return true
}

export async function updateUser(userEmail) {
    const content = await axios.get(`http://127.0.0.1:8080/user/${userEmail}`)
    if (content.status === 200 && content.data) {
        console.log("Usuário atualizado:", content.data);
        return content.data
    } else {
        return "Erro ao buscar usuário.";
    }

}

export async function updateUserDir(dirId){
    const content = await axios.get(`http://127.0.0.1:8080/archives/${dirId}`)
    if (content.status === 200 && content.data) {
        return content.data
    } else {
        return "Erro ao buscar diretório.";
    }
}
