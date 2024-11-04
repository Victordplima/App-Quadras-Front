import axios from "axios";
import { toast } from "react-toastify";

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
