import { io } from "socket.io-client";

// Função para criar a conexão com o WebSocket
const criarConexao = () => {
    const token = localStorage.getItem("token");

    if (!token) {
        console.error(
            "Token não encontrado. Não é possível estabelecer a conexão."
        );
        return null;
    }

    const socket = io(process.env.REACT_APP_API_URL, {
        auth: {
            token,
        },
    });

    // Eventos de erro e reconexão
    socket.on("connect_error", (err) => {
        console.error("Erro ao conectar ao WebSocket:", err.message);
    });

    socket.on("reconnect_attempt", (attemptNumber) => {
        console.log(`Tentando reconectar... Tentativa número ${attemptNumber}`);
    });

    socket.on("reconnect_failed", () => {
        console.error("Falha ao tentar reconectar ao servidor");
    });

    return socket;
};

const socket = criarConexao();

export const emitirEvento = (evento, dados) => {
    if (socket) {
        socket.emit(evento, dados);
    } else {
        console.error("Socket não está conectado.");
    }
};

export const desconectarSocket = () => {
    if (socket) {
        socket.disconnect();
        console.log("Desconectado do WebSocket.");
    }
};

export default socket;
