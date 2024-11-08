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

export const buscarQuadras = async () => {
    try {
        const response = await api.get(`/quadras`);
        return response.data;
    } catch (error) {
        throw new Error(
            error.response?.data?.message ||
                "Erro ao buscar as quadras"
        );
    }
};