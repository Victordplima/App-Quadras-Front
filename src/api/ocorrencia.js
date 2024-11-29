import axios from "axios";
import { emitirEvento } from "./socket";

const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export const criarOcorrencia = async (ocorrenciaData) => {
    try {
        const response = await api.post("/ocorrencias", ocorrenciaData, {
            headers: {
                "Content-Type": "application/json",
            },
        });

        emitirEvento("nova_ocorrencia", { data: response.data });

        return response.data;
    } catch (error) {
        console.error("Erro ao criar a ocorrência", error);
        throw error;
    }
};
