import React from "react";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function CreateUser(){
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState(''); 
    const navigate = useNavigate();

    const handleCreateUser = async (e) => {
        e.preventDefault();

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return alert("Email inválido!");
        }
        
        if(password !== confirmPassword){
            return alert("Passwords do not match");
        }
        if(password.length < 8){
            return alert("Password must be at least 8 characters long");
        }
        const user = {
            name: name,
            email: email,
            password: password
        };
        const request = await axios.post('http://127.0.0.1:8080/user', user)
        .then(response => {
            return response.data;
        })
        .catch(error => {
            return error;
        });

        if(request === true){
            alert("User created successfully");
            return navigate('/');
        }
        alert(request);

    }


    return(
        <main className="CreateUser-main">
            <div>
                <aside>
                    {/* imagens irão passar aqui */}
                </aside>
                <section>
                    <header>
                        <h2>Welcome to Sylas</h2>
                    </header>
                    <form onSubmit={handleCreateUser}>
                        <input 
                        type="text" 
                        placeholder="Your name"
                        value={name}
                        onChange={(e)=>{setName(e.target.value)}}
                        />

                        <input 
                        type="email" 
                        placeholder="Your email adress"
                        value={email}
                        onChange={(e)=>{setEmail(e.target.value)}}
                        />

                        <input 
                        type="password" 
                        placeholder="Your password (min: 8 chars)"
                        value={password}
                        onChange={(e)=>{setPassword(e.target.value)}}
                        />

                        <input 
                        type="password" 
                        placeholder="Confirm your password"
                        value={confirmPassword}
                        onChange={(e)=>{setConfirmPassword(e.target.value)}}
                        />

                        <input type="submit" value="Create" />
                    </form>
                </section>
            </div>

        </main>
    )


}

export default CreateUser;