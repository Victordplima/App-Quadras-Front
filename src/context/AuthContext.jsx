import React, { createContext, useContext, useState, useEffect } from "react";

// Criando o contexto
const AuthContext = createContext();

// Hook para acessar o contexto de autenticação
export const useAuth = () => {
    return useContext(AuthContext);
};

// Provedor do contexto
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        // Aqui você pode recuperar os dados do usuário a partir do localStorage ou de um serviço de autenticação
        const storedUser = JSON.parse(localStorage.getItem("user"));
        if (storedUser) {
            setUser(storedUser);
        }
    }, []);

    const login = (userData) => {
        setUser(userData);
        localStorage.setItem("user", JSON.stringify(userData));
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem("user");
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
