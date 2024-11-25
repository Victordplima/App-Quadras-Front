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



export const criarReserva = async (reservaData) => {
    try {
        const response = await api.post("/reservas", reservaData);
        return response.data;
    } catch (error) {
        throw new Error(
            error.response?.data?.mensagem || "Erro ao criar reserva"
        );
    }
};




export const buscarReservasSemana = async (quadraId, page = 1) => {
    try {
        const response = await api.get("/reservas/semana", {
            params: {
                quadraId,
                page,
            },
        });
        return response.data;
    } catch (error) {
        throw new Error(
            error.response?.data?.message || "Erro ao buscar reservas da semana"
        );
    }
};



export const buscarReservasUsuario = async (
    usuarioId,
    page = 1,
    limit = 5,
    quadra = ""
) => {
    try {
        const response = await api.get(`/reservas/usuario/${usuarioId}`, {
            params: { page, limit, quadra },
        });
        return response.data;
    } catch (error) {
        throw new Error(
            error.response?.data?.message ||
                "Erro ao buscar reservas do usuário"
        );
    }
};



export const alterarStatusReserva = async (reservaId, status) => {
    try {
        const response = await api.put(`/reservas/status/${reservaId}`, {
            status: status,
        });
        return response.data;
    } catch (error) {
        console.error("Erro na requisição para alterar status:", error);
        if (error.response) {
            console.error("Status:", error.response.status);
            console.error("Dados da resposta:", error.response.data);
            console.error("Headers:", error.response.headers);
        }
        throw new Error(
            error.response?.data?.message ||
                "Erro ao alterar o status da reserva"
        );
    }
};



export const buscarAgendamentosDia = async (quadraId, data) => {
    try {
        const response = await api.get(`/reservas/${quadraId}/agendamentos`, {
            params: { data },
        });
        return response.data;
    } catch (error) {
        throw new Error(
            error.response?.data?.message ||
                "Erro ao buscar agendamentos do dia"
        );
    }
};
