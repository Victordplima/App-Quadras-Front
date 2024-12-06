import axios from "axios";

const BASE_URL = process.env.REACT_APP_API_URL;

const api = axios.create({
    baseURL: BASE_URL,
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});



// Interceptor para capturar erros e redirecionar para o login se o token expirar
api.interceptors.response.use(
    (response) => response, // Para respostas bem-sucedidas, apenas retorna a resposta
    (error) => {
        // Se a resposta do servidor indicar que o token expirou (401 ou outro código específico)
        if (error.response?.status === 401) {
            // Remove o token do armazenamento local
            localStorage.removeItem("token");
            
            // Redireciona para a página de login
            window.location.href = "/login";
        }

        // Propaga o erro para ser tratado nos métodos que chamam a API
        return Promise.reject(error);
    }
);



export const buscarQuadras = async () => {
    try {
        const response = await api.get(`/quadras`);
        return response.data;
    } catch (error) {
        throw new Error(
            error.response?.data?.message || "Erro ao buscar as quadras"
        );
    }
};



export const buscarEsportesPorQuadraId = async (quadraId) => {
    try {
        const response = await api.get(`/quadras/${quadraId}/esportes`);
        return response.data;
    } catch (error) {
        throw new Error(
            error.response?.data?.message ||
                "Erro ao buscar os esportes da quadra"
        );
    }
};
