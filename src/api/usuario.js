import axios from "axios";

const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
});

console.log("API URL:", process.env.REACT_APP_API_URL);

export const login = async (email, senha) => {
    try {
        const response = await api.post("/auth/login", { email, senha });
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || "Erro ao fazer login");
    }
};
