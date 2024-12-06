import axios from "axios";
import { toast } from "react-toastify";

const BASE_URL = process.env.REACT_APP_API_URL;

const api = axios.create({
    baseURL: BASE_URL,
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



export const login = async (email, senha) => {
    try {
        const response = await api.post("/auth/login", { email, senha });
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || "Erro ao fazer login");
    }
};

export const cadastrarUsuario = async (dados) => {
    try {
        const response = await api.post("/auth/register", dados);
        return response.data;
    } catch (error) {
        if (error.response) {
            if (error.response.status === 409) {
                // usuário já cadastrado
                toast.error(
                    "Usuário já cadastrado. Por favor, tente um email ou matrícula diferentes."
                );
            } else if (error.response.status === 400) {
                // erro de requisição inválida
                toast.error(
                    "Dados inválidos. Verifique as informações e tente novamente."
                );
            } else {
                // outro erro no servidor
                toast.error(
                    error.response.data?.message || "Erro ao cadastrar usuário."
                );
            }
        } else {
            // erro sem resposta
            toast.error(
                "Erro na conexão com o servidor. Tente novamente mais tarde."
            );
        }
        throw new Error(
            error.response?.data?.message || "Erro ao cadastrar usuário"
        );
    }
};

export const buscarUsuarioPorId = async (id) => {
    if (!id) {
        throw new Error("ID inválido.");
    }
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

export const buscarUsuarios = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
        throw new Error("Token não encontrado");
    }

    try {
        const response = await api.get(`/usuarios`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return response;
    } catch (error) {
        throw new Error("Erro ao buscar usuários");
    }
};

export const removerUsuario = async (id) => {
    const token = localStorage.getItem("token");
    const response = await api.delete(`/usuarios/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response;
};

export const editarUsuario = async (id, dados) => {
    const token = localStorage.getItem("token");
    if (!token) {
        throw new Error("Token não encontrado");
    }

    try {
        const response = await api.put(`/usuarios/${id}`, dados, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        if (error.response) {
            if (error.response.status === 404) {
                toast.error("Usuário não encontrado.");
            } else if (error.response.status === 400) {
                toast.error(
                    "Dados inválidos. Verifique as informações e tente novamente."
                );
            } else {
                toast.error(
                    error.response.data?.message || "Erro ao editar usuário."
                );
            }
        } else {
            toast.error(
                "Erro na conexão com o servidor. Tente novamente mais tarde."
            );
        }
        throw new Error(
            error.response?.data?.message || "Erro ao editar usuário"
        );
    }
};



export const buscarHistoricoDoUsuario = async (userId, page = 1, limit = 20) => {
    const token = localStorage.getItem("token");
    if (!token) {
        throw new Error("Token não encontrado");
    }

    try {
        const response = await api.get(`/usuarios/${userId}/historico`, {
            params: {
                page,
                limit
            },
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error("Erro ao buscar histórico do usuário:", error);
        throw error;
    }
};



export const buscarInformacoesUsuarioCompleto = async (id) => {
    if (!id) {
        throw new Error("ID inválido.");
    }
    const token = localStorage.getItem("token");
    if (!token) {
        throw new Error("Token não encontrado");
    }

    try {
        const response = await api.get(`/usuarios/${id}/informacoes-completas`, {
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