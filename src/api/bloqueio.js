import axios from "axios";

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



export const buscarBloqueioPorUsuario = async (usuarioId, pagina = 1) => {
    try {
        const response = await api.get(`/bloqueios/${usuarioId}?page=${pagina}`);
        return response.data;
    } catch (error) {
        console.error("Erro ao buscar bloqueio do usuário", error);
        throw error;
    }
};



export const criarBloqueio = async (bloqueioData) => {
    try {
        const response = await api.post("/bloqueios", bloqueioData, {
            headers: {
                "Content-Type": "application/json",
            },
        });
        return response.data;
    } catch (error) {
        console.error("Erro ao criar o bloqueio", error);
        throw error;
    }
};



export const editarBloqueio = async (bloqueioId, bloqueioData) => {
    try {
        const response = await api.put(
            `/bloqueios/${bloqueioId}`,
            bloqueioData,
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
        return response.data;
    } catch (error) {
        console.error("Erro ao editar o bloqueio", error);
        throw error;
    }
};