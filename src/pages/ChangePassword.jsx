import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function ChangePassword() {
    const [email, setEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const navigate = useNavigate();

    const handleChangePassword = async (e) => {
        e.preventDefault();
        if (newPassword !== confirmNewPassword) {
            return alert("Passwords do not match");
        }
        if (newPassword.length < 8) {
            return alert("Password must be at least 8 characters long");
        }
        const user = {
            email: email,
            newPassword: newPassword
        };

        const request = await axios.post('http://127.0.1:8080/user/changePassword', user)
        .then(response => {
            return response.data;
        })
        .catch(error => {
            return error.response;
        })

        if (request === true) {
            alert("Password changed successfully");
            return navigate('/');
        }
        alert(request);
    }
    

    return (
        <main className="ChangePassword-main">
            <section>
                <header>
                    <h2>Change Password</h2>
                </header>
                <form onSubmit={handleChangePassword}>
                    
                    <input 
                    type="email" 
                    placeholder="Your Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    />

                    <input 
                        type="password" 
                        placeholder="New Password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                    />
                    <input 
                        type="password" 
                        placeholder="Confirm New Password"
                        value={confirmNewPassword}
                        onChange={(e) => setConfirmNewPassword(e.target.value)}
                    />
                    <button type="submit">Change Password</button>
                </form>
            </section>

        </main>
    )
}

export default ChangePassword;