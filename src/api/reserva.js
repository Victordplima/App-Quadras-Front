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

export const criarReserva = async (reservaData) => {
    try {
        const response = await api.post("/reservas", reservaData);

        // Emitir evento para todos os clientes conectados após criar a reserva
        emitirEvento("atualizarReservas", {
            mensagem: "Nova reserva criada",
            reserva: response.data,
        });

        return response.data;
    } catch (error) {
        throw new Error(
            error.response?.data?.mensagem || "Erro ao criar reserva"
        );
    }
};

export const buscarReservasSemana = async (quadraId) => {
    try {
        const response = await api.get("/reservas/semana", {
            params: {
                quadraId,
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
        console.error("Erro na requisição:", error);
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

        // Emitir evento para todos os clientes conectados após alterar o status
        emitirEvento("atualizarReservas", {
            mensagem: "Status da reserva atualizado",
            reservaId,
            status,
        });

        return response.data;
    } catch (error) {
        console.error("Erro na requisição para alterar status:", error);
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

export const buscarReservasDia = async () => {
    try {
        const response = await api.get("/reservas/dia");
        return response.data;
    } catch (error) {
        throw new Error(
            error.response?.data?.message || "Erro ao buscar reservas do dia"
        );
    }
};

export const buscarReservasDiaSemOcorrencia = async () => {
    try {
        const response = await api.get("/reservas/dia-sem-ocorrencia");
        return response.data;
    } catch (error) {
        throw new Error(
            error.response?.data?.message ||
                "Erro ao buscar reservas do dia sem ocorrencia"
        );
    }
};

export const cancelarReserva = async (reservaId) => {
    try {
        const response = await api.put(`/reservas/${reservaId}/cancelar`);

        // Emitir evento para todos os clientes conectados após cancelar a reserva
        emitirEvento("atualizarReservas", {
            mensagem: "Reserva cancelada com sucesso",
            reservaId,
        });

        return response.data;
    } catch (error) {
        console.error("Erro na requisição para cancelar reserva:", error);
        throw new Error(
            error.response?.data?.mensagem || "Erro ao cancelar a reserva"
        );
    }
};
