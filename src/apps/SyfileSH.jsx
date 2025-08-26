import React from "react";
import { useState } from "react";
import { generateFileCommand } from "../services/ShellFuncs";
import { useUser } from "../services/UserProvider";
import { useDisplay } from "../services/DisplayProvider";

function SyfileSH({nameFile, content}) {
    const {setShellApp} = useDisplay();
    const { user, setUser } = useUser();
    const [contentText, setContentText] = useState(content || "");

    const handleKeyDown = async (e) =>{
        if (e.ctrlKey && e.key.toLowerCase() === "s"){
            e.preventDefault()
            try{
                const response = await generateFileCommand({Name: nameFile, UserReference: user.email, Content: contentText, DirId: user.dir.id, Type: "text/plain"})
                setUser(prev => ({...prev, dir: response}))
                console.log("Arquivo salvo com sucesso:", response);
            }catch(error){
                console.error("Erro ao salvar o arquivo:", error);
            }
        }
        else if(e.ctrlKey && e.key.toLowerCase() === "x"){
            e.preventDefault();
            setShellApp(null); // Fecha o app de shell
        }
    } 

    return (
        <>
        {nameFile? (
            <div className="Syfile-sh">
                <textarea 
                name="syfile-textarea" 
                id="syfile-textarea" 
                onKeyDown={handleKeyDown} 
                onChange={(e)=> setContentText(e.target.value)}
                value={contentText}>

                </textarea>

                <ul id="syfile-commands">
                    <li>Ctrl+s: save</li>
                    <li>Ctrl+x: exit</li>
                </ul>
            </div>
        ):(
            alert("Erro: Nome do arquivo não fornecido.")
        )}
    </>
    );
}   

export default SyfileSH;
