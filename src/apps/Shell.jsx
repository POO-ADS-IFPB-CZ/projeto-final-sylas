import React from "react";
import TitleApp from "../components/TitleApp";
import SyfileSH from "./SyfileSH";

import { useDisplay } from "../services/DisplayProvider";
import { calcCommand, echoCommand, helpCommand, lsCommand, mkdirCommand, cdCommand, rmdirCommand, catCommand} from "../services/ShellFuncs";
import { useUser } from "../services/UserProvider";
import { updateUserDir } from "../services/UserUpdate";

function InputShell(){
    const {

        comands, setComands, ativoShell, 
        setAtivoShell, setOutputs, handleAppToggle, 
        commandPointer, setCommandPointer, setShellApp
    
    } = useDisplay(); // Hook para acessar o contexto de exibição

    const {user, setUser, dirPath, setDirPath, resetDir} = useUser() // Hook para acessar o contexto do usuário

    // salva o comando digitado e a saida do comando
    const saveResponse = (Command, Response) =>{
        setOutputs(prev => [...prev, {
            prompt: Command, 
            response: Response, 
            id: prev.length > 0 ? prev[prev.length - 1].id + 1 : 0
        }])
    }

    const switchComand = async (command) => {
        const commandTarget = command.trim().split(' '); // Extrai o comando principal, removendo espaços e pegando a primeira palavra
        switch(commandTarget[0]){

            case 'clear':
                setOutputs([]); // Limpa os comandos se o comando for 'clear'
            break

            case 'echo':
                const echoResponse = echoCommand(command); // Chama a função echoCommand
                saveResponse(command, echoResponse) // Adiciona o comando e resposta ao output
            break

            case 'calc':
                const calcResponse = calcCommand(command)
                saveResponse(command, calcResponse)
            break

            case 'exit':
                handleAppToggle("Shell")// fecha o terminal
                resetDir(user.dir.id) // Reseta o diretório do usuário para o inicial
                break

            case 'help':
                const helpResponse = helpCommand(command);
                saveResponse(command, helpResponse) // Adiciona a ajuda ao output
            break

            case 'ls':
                console.log(user)
                const lsResponse = lsCommand(user.dir.id) // Chama a função lsCommand passando o id do diretório do usuário;
                saveResponse(command, lsResponse) // Adiciona a resposta do comando ls ao output
            break

            case 'pwd':
                const pwdResponse = user.dir.path
                saveResponse(command, pwdResponse)
            break

            case 'mkdir':
                const mkdirResponse = await mkdirCommand({nameDir: command, dirId: user.dir.id, userEmail: user.email})
                saveResponse(command, mkdirResponse)
                const updateDirUser = await updateUserDir(user.dir.id) // Atualiza o diretório do usuário após criar um novo diretório
                user.dir = updateDirUser // Atualiza o diretório do usuário no estado
            break

            case 'cd':
                //verifica se o diretório existe para o usuario atual
                const dirIdCd = user.dir.subDirs.find(item => item.name === commandTarget[1])
                if(dirIdCd != undefined){
                    setDirPath(prev => [...prev, user.dir.id]) // Adiciona o caminho atual ao histórico de diretórios
                    console.log(dirPath);

                    const cdResponse = await cdCommand({fatherId: user.dir.id, dirId: dirIdCd.code}) // retorna o novo diretório
                    setUser(prev => ({...prev, dir: cdResponse})) // Atualiza o diretório do usuário no estado
                    saveResponse(command,cdResponse.path) 
                }

                else if(commandTarget[1] === ".." && dirPath.length > 0){
                    const lastDirId = dirPath[dirPath.length - 1] // Pega o último diretório do histórico
                    const cdBackResponse = await cdCommand({fatherId: user.dir.id, dirId: lastDirId}) // retorna o diretório pai
                    setUser(prev => ({...prev, dir: cdBackResponse}))
                    setDirPath(prev => prev.slice(0, -1)) // Remove o último diretório do histórico
                    saveResponse(command, cdBackResponse.path) 
                }

                else if(commandTarget[1] === "/" || commandTarget[1] === "~" || commandTarget.length === 1){
                    const cdRootResponse = resetDir(user.dir.id)
                    saveResponse(command, cdRootResponse) 
                }

            break

            case 'rmdir':
                const dirIdRm = user.dir.subDirs.find(item => item.name === commandTarget[1])
                if(dirIdRm != undefined){
                    const rmResponse = await rmdirCommand({fatherId: user.dir.id, dirId:dirIdRm.code})
                    setUser(prev => ({...prev, dir: rmResponse})) // Atualiza o diretório do usuário no estado
                    setDirPath(prev => prev.filter(id => id !== dirIdRm.code)) // Remove o diretório removido do histórico
                    saveResponse(command, rmResponse.path) // Adiciona a resposta do comando rmdir ao output
                }
            break

            case 'syfile':

                if(commandTarget.length > 1){
                    const archive = user.dir.files.find(item => item.name === commandTarget[1])
                    // criação de um novo arquivo
                    if(archive == undefined || archive == null){
                        setShellApp(<SyfileSH nameFile={commandTarget[1]} content={""} />) 
                        saveResponse(command, command) 
                    }
                    // editar um arquivo existente
                    else{
                        const fileContet = await catCommand({fileId: archive.code})
                        setShellApp(<SyfileSH nameFile={commandTarget[1]} content={fileContet} />)
                        saveResponse(command, command)
                    }
                }
                else{
                    saveResponse(command, "Erro: Nome do arquivo não fornecido.")
                } 
            break

            case 'cat':
                if(commandTarget.length > 1){
                    const archiveCat = user.dir.files.find(item => item.name === commandTarget[1])
                    if(archiveCat != undefined){
                        const fileContetCat = await catCommand({fileId: archiveCat.code})
                        saveResponse(command, fileContetCat)
                    }
                    else{
                        saveResponse(command, "Erro: Arquivo não encontrado.")
                    }
                }
                else{
                    saveResponse(command, "Erro: Nome do arquivo não fornecido.")
                }
            break
                
            case 'user':
                console.log(user)
            break

            default:
                saveResponse(command,"")
                break
        }
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault(); // Previne o comportamento padrão do Enter
            const inputValue = e.target.value.trim(); // Obtém o valor do input e remove espaços
            setAtivoShell(true); // Define o app Shell como ativo
            if (inputValue) {
                try{
                    setComands(prevComands => [...prevComands, inputValue]); // Adiciona o comando ao estado
                    setCommandPointer(commandPointer+1) // adiciona um no ponteiro de comandos, referente ao comando adicionado
                    switchComand(inputValue); 
                    e.target.value = ''; // Limpa o input após o envio
                    console.log('Comando enviado:', inputValue);

                }
                catch (error) {
                    console.error('Erro ao enviar comando:', error); // Loga erros se ocorrerem 
                }
            }
            else{
                console.log('Nenhum comando digitado'); // Loga se o input estiver vazio
                setOutputs(prev => [...prev, {prompt: "", response:""}]); // Adiciona mensagem de erro ao output
            }
            console.log('Comandos:', comands); // Loga os comandos para depuração
            console.log('Ativo Shell:', ativoShell); // Loga o estado ativo do Shell para depuração
        }
        else if(e.key === "ArrowUp"){
            if(commandPointer > 0){
                setCommandPointer(commandPointer-1)
                e.target.value = comands[commandPointer-1]
            }
        }
        else if(e.key === "ArrowDown"){
            if(commandPointer < comands.length){
                setCommandPointer(commandPointer+1)
                e.target.value = comands[commandPointer]
            }
        }
        else if(e.key === "Tab"){
            e.preventDefault(); // Previne o comportamento padrão do Tab
            const inputValue = e.target.value.trim(); // Obtém o valor do input e remove espaços
            if(inputValue) {
                const commandTarget = inputValue.split(' ')[0]; // Extrai o comando principal
                if(commandTarget === 'cd' || commandTarget === 'rmdir') {
                    const suggestions = user.dir.subDirs.map(dir => dir.name).filter(name => name.startsWith(inputValue.split(' ')[1] || ''));
                    if(suggestions.length > 0) {
                        e.target.value = `${commandTarget} ${suggestions[0]}`; // Sugere o primeiro diretório que começa com o input
                    }
                }
                else if(commandTarget === 'cat' || commandTarget === 'syfile') {
                    const suggestions = user.dir.files.map(file => file.name).filter(name => name.startsWith(inputValue.split(' ')[1] || ''));
                    if(suggestions.length > 0) {
                        e.target.value = `${commandTarget} ${suggestions[0]}`; // Sugere o primeiro arquivo que começa com o input
                    }
                }

            }
        }
        
    }

    return(
        <>
            <div className="Input-shell-div">
                <span>Sylas@Shell:</span>
                <input type="text" onKeyDown={handleKeyDown}/>
            </div>
        </>
    )
}


function Shell({min, max}) {

    const {outputs, ativoShell, shellApp} = useDisplay(); // Hook para acessar o contexto de exibição
    const {user, resetDir} = useUser() // Hook para acessar o contexto do usuário

    const focusInput = () =>{
        const input = document.querySelector('.Input-shell-div input');
        if(input) {
            input.focus(); // Foca no input quando a div é clicada
        }
    }

    return(
        <div className={`Shell-main-div ${min ? "minimized" : ""} ${max ? "maximized" : ""}`}>
            <TitleApp title="Shell" Id="Shell" optClose={()=>resetDir(user.dir.id)}/>

            {/* caso um app de terminal for passado ele sera renderizado, caso não, conteúdo normal */}
            {shellApp? (
                <div className="Shell-app-div">
                    {shellApp}
                </div>
            ):(
                <section className='Shell-content-div' onClick={focusInput}>
                {ativoShell && outputs.map((out) => (
                    <div key={out.id} className='Shell-command'>
                        <span>Sylas@Shell: </span>
                        <span>{out.prompt}</span>
                        <p>{out.response}</p>
                    </div>
                    
                ))}
                <InputShell />
            </section>
            )}
        </div>
    )
}

export default Shell;