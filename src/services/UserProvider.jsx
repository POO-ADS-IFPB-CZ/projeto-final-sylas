import { createContext, useContext, useState } from "react";
import { cdCommand } from "./ShellFuncs";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState({}); // Estado para armazenar os dados do usuário
    const [dirPath, setDirPath] = useState([]); // Estado para armazenar os diretorios que o usuario está navegando
    const [rootId, setRootId] = useState(''); // armazena o caminho raiz do usuário

    const resetDir = async (fatherId) => {
        const cdRootResponse = await cdCommand({fatherId: fatherId, dirId: rootId})
        setUser(prev => ({...prev, dir: cdRootResponse})) // Atualiza o diretório do usuário no estado
        setDirPath([]) // limpa o histórico de diretórios
        return cdRootResponse.path
    }

    return (
        <UserContext.Provider value={{ user, setUser, dirPath, setDirPath, rootId, setRootId, resetDir }}>
            {children}
        </UserContext.Provider>
    );
}

export const useUser = () => useContext(UserContext);