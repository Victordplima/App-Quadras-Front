import axios from "axios";

const BASE_URL = process.env.REACT_APP_API_URL;

const api = axios.create({
    baseURL: BASE_URL,
});

export const login = async (email, senha) => {
    try {
        const response = await api.post("/auth/login", { email, senha });
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || "Erro ao fazer login");
    }
};

export const buscarUsuarioPorId = async (id) => {
    const token = localStorage.getItem("token");
    if (!token) {
        throw new Error("Token não encontrado");
    }

    try {
        const response = await api.get(`/usuarios/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error("Erro ao buscar usuário:", error);
        throw error;
    }
};
