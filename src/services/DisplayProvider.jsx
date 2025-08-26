// src/services/DisplayProvider.jsx

import { set } from 'nerdamer/nerdamer.core';
import { createContext, useContext, useState } from 'react';

const DisplayContext = createContext();

export const DisplayProvider = ({ children }) => {
    
    // == Seção de Estados Globais ==
    const [appsAtivos, setAppsAtivos] = useState({}); // controla apps visíveis
    const [appsMinimizados, setAppsMinimizados] = useState({}); 
    const [appMaximizado, setAppMaximizado] = useState({}) // controla o app maximizado, pode haver apenas um

    // alterna a visibilidade do app (abrir/fechar)
    const handleAppToggle = (appName) => {
        setAppsAtivos(prev => ({
            ...prev,
            [appName]: !prev[appName]
            
        }));
        if(appsMinimizados[appName]){ // impede que apps fechados sejam carregados como minimizados apos serem reabertos
            appsMinimizados[appName] = false
        }
        if(appMaximizado[appName]){ // mesma coisa so que pro grande
            appMaximizado[appName] = false
        }
        cleanContext(); 

    };
    
    //alterna o estado de minimizado do app
    const handleAppMinimize = (appName) => {
        setAppsMinimizados(prev => ({
            ...prev,
            [appName]: !prev[appName]
        }));
        console.log("apps:"+appsMinimizados[appName])
    };

    const handleAppMaximize = (appName) =>{
        setAppMaximizado(prev =>({
            ...prev,
            [appName]: !prev[appName]
        }))
    }

    // == Fim da Seção de Estados Globais ==

    // == Seção de estado de apps ==

    // IA
    const [dialogIA, setDialogIA] = useState([]); // Estado para armazenar o diálogo da IA
    const [ativoIA, setAtivoIA] = useState(false); // Estado para controlar a visibilidade do app IA

    //Shell
    const [comands, setComands] = useState([]); // Estado para armazenar o comando digitado no Shell
    const [outputs, setOutputs] = useState([]); // Estado para armazenar as saídas do Shell (na pratica armazena o comando usado e a resposta na forma de objeto)
    const [ativoShell, setAtivoShell] = useState(false); // Estado para controlar a visibilidade do app Shell
    const [commandPointer, setCommandPointer] = useState(0)
    const [shellApp, setShellApp] = useState(null); // Estado para armazenar a referência do app Shell


    // == Fim da Seção de estado de apps ==

    // Função para limpar contextos de prompt e resposta dos arrays de apps
    const cleanContext = () => {
        setDialogIA([]); // Limpa o diálogo da IA
        setAtivoIA(false); // Reseta o estado ativo da IA

        setComands([]); // Limpa os comandos do Shell
        setOutputs([]); // Limpa as saidas do shell
        setAtivoShell(false); // Reseta o estado ativo do Shell
        setCommandPointer(0)
        setShellApp(null); // Limpa a referência do app Shell
    }

    return (
        <DisplayContext.Provider value={{
            appsAtivos, 
            handleAppToggle, 
            appsMinimizados,       // <--- NOVO
            handleAppMinimize,      // <--- NOVO
            appMaximizado,
            handleAppMaximize,

            // Estado da IA
            dialogIA,
            setDialogIA,
            ativoIA,
            setAtivoIA,

            // Estado do Shell
            comands,
            setComands,
            outputs,
            setOutputs,
            ativoShell,
            setAtivoShell,
            commandPointer,
            setCommandPointer,
            shellApp,
            setShellApp


        }}>
            {children}
        </DisplayContext.Provider>
    );
};

export const useDisplay = () => useContext(DisplayContext);