import React from "react";
import axios from "axios";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useUser } from "../services/UserProvider";

function LoginContent() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()
    const {setUser, setRootId} = useUser()

    const handlerFormLogin = async (e) => {
        
        e.preventDefault();
        
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return alert("Email inválido!");
        }
        if(password.trim().length < 8){
            return alert("Senha com menos de 8 caracteres")
        }

        const user = {
            email: email,
            newPassword: password
        };

        try {
            const response = await axios.post('http://127.0.0.1:8080/user/login', user);

            if (response.status === 200 && response.data) {
                console.log(response.data)
                setUser(response.data);
                setRootId(response.data.dir.id);
                return navigate('/home');
            } else {
                alert("Erro inesperado no login.");
            }
        } catch (error) {
            if (error.response) {
                // Erro do servidor (status HTTP 4xx ou 5xx)
                alert(`Erro: ${error.response.data.message || "Login falhou."}`);
            } else if (error.request) {
                // Sem resposta do servidor
                alert("Sem resposta do servidor. Verifique sua conexão.");
            } else {
                // Outro erro
                alert("Erro desconhecido: " + error.message);
            }
        }
};


    return(
        <main className="Login-main">
        <section>
            <header>
                <h2>Welcome to Sylas</h2>
                <Link to="/create" className="Link-login">Create account</Link>
            </header>
            <form onSubmit={handlerFormLogin}>
                <input 
                type="email" 
                placeholder="Email"
                value={email}
                onChange={(e)=>{setEmail(e.target.value)}}
                />

                <input 
                type="password" 
                placeholder="Password"
                value={password}
                onChange={(e)=>{setPassword(e.target.value)}}
                />

                <button type="submit">Login</button>
            </form>
            <Link to="/changePassword" className="Link-login">forgot password</Link>
        </section>

    </main>
    )
}

function Login() {
    

  return (
        <LoginContent />
  );
}

export default Login;