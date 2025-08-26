//Aqui é onde ficam as funções que serão usadas no Shell
import React, { useState } from 'react';
import nerdamer from "./nerdamer"; // Importa a biblioteca nerdamer para cálculos matemáticos
import axios from 'axios'; // Importa a biblioteca axios para requisições HTTP



function splitCommand(command, type) {
    if(!type)
        type = ' '

    return command.split(type)

}

// Função para exibir mensagem na tela 'echo'
export function echoCommand(command) {
    const args = splitCommand(command);
    return args.slice(1).join(' ');
}

// Função para calcular expressões matemáticas com base em comandos 'calc'
export function calcCommand(command){
    let value;

    const flags = [
        '-r', // resolver equação
        '-s', // simplificar
        '-d', // derivada
        '-e', // expandir
        '-i', // integrar
        '-sb', // substituir
        '-f', // fatorial
        '-h'  // ajuda
    ]

    const help = () =>{
        return(
            <ul>
                <li>Sem flag retorna o valor da expressão Ex.: [89*12+6] Obs.: não é necessário uso de '[]'</li>
                <li>-r: resolver uma equação Ex.: [12x^2 = 0] (necessário que a expressão contenha a variável 'x')</li>
                <li>-s: simplificar uma expressão Ex.: [x^2 + 8]</li>
                <li>-d: derivar uma expressão Ex.: [x^2 + 8] (necessário que a expressão contenha a variável 'x')</li>
                <li>-e: expandir uma expressão Ex.: [(x^2+1)^2/4]</li>
                <li>-i: integrar uma expressão Ex.: [x^2 + 8] (necessário que a expressão contenha a variável 'x')</li>
                <li>-sb: substituir variáveis em uma expressão Ex.: [x^2 + 8, x:2, 8:3]</li>
                <li>-f: calcular o fatorial de um número Ex.: [5]</li>
                <li>-h: ajuda (exibe esta mensagem)</li>
            </ul>
        )
    }

    const arg = splitCommand(command).slice(1)

    const formattedArg = (eq) =>{
        return eq.join('')
    }

    const tratament = (arg) => {
        if (arg.length === 0) {
            return "Erro: Nenhum argumento fornecido.";
        }
        else if (arg.length === 1 && flags.includes(arg[0])) {
            return "Erro: Nenhuma expressão fornecida para o comando.";
        }
        else if(!arg.includes('x')){
            return "Erro: A expressão deve conter a variável 'x' para cálculos.";
        }
        return arg;
    }

    switch (arg[0]) {
        //resolver equação
        case '-r':
            const equationToSolve = formattedArg(arg.slice(1));
            value = tratament(equationToSolve)

            if(value == equationToSolve)
                return nerdamer.solveEquations(equationToSolve, 'x').toString() // Resolve a equação em relação a x
            else
                return value
        
        //simplificar expressão
        case '-s':
            const equationToSimplify = formattedArg(arg.slice(1));
            value = tratament(equationToSimplify)

            if(value == equationToSimplify)
                return nerdamer(`simplify(${equationToSimplify})`).toString()
            else
                return value
            
        //derivar expressão
        case '-d':
            console.log(arg.slice(1));
            
            const equationToDerivate = formattedArg(arg.slice(1));
            console.log("Equação para derivar:", equationToDerivate); 
            value = tratament(equationToDerivate)

            if(value == equationToDerivate)
                return nerdamer(`diff(${equationToDerivate}, x)`).toString(); // Deriva a expressão em relação a x
            else
                return value

        //expandir expressão
        case '-e':
            const equationToExpand = formattedArg(arg.slice(1));
            value = tratament(equationToExpand)
            
            if(value == equationToExpand)
                return nerdamer(`expand(${equationToExpand})`).toString(); // Expande a expressão
            else
                return value
            
        //integrar expressão
        case '-i':
            const equationToIntegrate = formattedArg(arg.slice(1));
            value = tratament(equationToIntegrate)
            
            if(value == equationToIntegrate)
                return nerdamer(`integrate(${equationToIntegrate}, x)`).toString(); // Integra a expressão em relação a x
            else
                return value

        //fatorarial da expressão
        case '-f':
            const equationToFactor = formattedArg(arg.slice(1));
            return nerdamer(`factorial(${equationToFactor})`).evaluate().toString(); // Fatora a expressão

        //substituir variáveis na expressão
        case '-sb':
            console.log(arg.slice(1));
            
            const formated = formattedArg(arg.slice(1))
            const splited = splitCommand(formated, ',')
            console.log("Splited:", splited);
            
            let equationToSub = splited[0].trim(); // A equação a ser substituída
            const parser = splited.slice(1).map(sub => sub.trim()); // As substituições a serem aplicadas
            
            const substitutions = parser.map(sub => 
                sub.split(':').map(s => s.trim())
            )

            console.log("Equação para substituir:", substitutions);
            substitutions.forEach(element => {
                equationToSub = nerdamer(equationToSub).sub(element[0],element[1]).evaluate().toString();
            });

            return equationToSub; // Retorna a equação após as substituições

        //ajuda
        case '-h':
            return help(); // Retorna a mensagem de ajuda
        
        //se nenhum flag for especificado
        default:
            // Se nenhum flag for especificado, assume que é uma expressão simples
            return nerdamer(formattedArg(arg)).evaluate().toString(); // Avalia a expressão diretamente
    }
}

export function helpCommand() {
    return (
        <ul>
            <li>echo: Exibe uma mensagem na tela. Ex.: echo Hello World</li>
            <li>calc: Calcula expressões matemáticas. Ex.: calc 2+2</li>
            <li>help: Exibe esta mensagem de ajuda.</li>
            <li>clear: Limpa o terminal</li>
            <li>exit: Fecha o terminal</li>
            <li>ls: Lista todos os diretórios e arquivos no local atual</li>
            <li>pwd: Exibe o local atual</li>
            <li>mkdir: Cria um novo diretório</li>
            <li>cd: Navega para outro diretório</li>
            <li>rmdir: Apaga o diretório com todo seu conteúdo</li>
            <li>syfile: editor de texto. Ex.: syfile text.txt</li>
            <li>cat: visualisar conteúdo de um arquivo</li>
        </ul>
    );
}

// funções de terminal

export async function lsCommand(dirId) {
    const content = await axios.get(`http://127.0.0.1:8080/archives/ls/${dirId}`)

    if (content.status === 200) {
        return content.data.map(item => item.name).join('   ');
    } else {
        return "Erro ao listar diretório.";
    }
}

export async function mkdirCommand({nameDir, dirId, userEmail}){
    nameDir = splitCommand(nameDir)[1]

    const dir ={
        name: nameDir,
        userReference: userEmail,
        path:"", // tratado no backend
        subDirs: [],
        filesId: []
    }
    
    try{
        const response = await axios.post(`http://127.0.0.1:8080/archives/mkDir/${dirId}`, dir)
        if(response.status === 200 && response.data){
            return response.data.path
        }
        return "Error"
    }catch(error){
        return error.response.data.message
    }
}

export async function cdCommand({fatherId, dirId}) {
    try{
        const content = await axios.get(`http://127.0.0.1:8080/archives/cd/${fatherId}/${dirId}`)
        if(content.status === 200 && content.data){
            return content.data
        }
        return "erro"
    }catch(error){
        return alert(error.message)
    }
}

export async function rmdirCommand({fatherId, dirId}){
    try{
        const response = await axios.delete(`http://127.0.0.1:8080/archives/rmdir/${fatherId}/${dirId}`)
        if(response.status === 200 && response.data){
            return response.data
        }
    }
    catch(error){
        return alert(`MEU AMIGO, FOI MUIDO ${error.message}`)
    }
}


// TODO: elaborar toda a lógica de criação de arquivos no backend
export async function generateFileCommand({DirId,UserReference,Name,Type,Content}) {
    const file = {
        dirId: DirId,
        userReference: UserReference,
        name: Name,
        type: Type,
        content: Content
    }

    try{
        const response = await axios.post(`http://127.0.0.1:8080/archives/saveFile/${DirId}`, file);
        if(response.status === 200 && response.data){
            return response.data;
        }
        return "Erro ao criar arquivo.";
    }catch(error) {

        const al =  error.response ? error.response.data.message : "Erro ao criar arquivo.";
        return alert(al);
    }
}

export async function catCommand({fileId}) {
    const content = await axios.get(`http://127.0.0.1:8080/archives/getFile/${fileId}`)
    if (content.status === 200) {
        return content.data.content; // Retorna o conteúdo do arquivo
    } else {
        return "Erro ao ler o arquivo.";
    }

}