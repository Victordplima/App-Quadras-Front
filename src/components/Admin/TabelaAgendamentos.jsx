import React, { useEffect, useState, useCallback, useRef } from "react";
import styled from "styled-components";
import { buscarReservasSemana, alterarStatusReserva } from "../../api/reserva";
import { format } from "date-fns";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import socket from "../../api/socket";
import MiniPerfilUsuario from "./MiniPerfilUsuario";

const TableContainer = styled.div`
    margin-top: 30px;
`;

const Table = styled.table`
    width: 100%;
    border-collapse: collapse;
`;

const Th = styled.th`
    padding: 10px;
    border-bottom: 1px solid #ddd;
    background-color: #181444;
    color: white;
    cursor: pointer;

    &.sorted-asc::after {
        content: " ↑";
    }

    &.sorted-desc::after {
        content: " ↓";
    }
`;

const Td = styled.td`
    padding: 10px;
    border-bottom: 1px solid #ddd;
    text-align: center;
`;

const Row = styled.tr`
    &:hover {
        background-color: #f1f1f1;
    }
`;

const Button = styled.button`
    margin: 0 5px;
    padding: 5px 10px;
    border: none;
    cursor: pointer;
    color: white;
    border-radius: 4px;
    background-color: ${({ action }) =>
        action === "aceitar" ? "#4CAF50" : "#FF5722"};
`;

const LinkButton = styled.button`
    background: none;
    border: none;
    color: #1e99c0;
    text-decoration: underline;
    cursor: pointer;
`;

const Loading = styled.div`
    text-align: center;
    font-size: 18px;
    color: #888;
`;

const TabelaAgendamentos = ({ quadraId, setAgendamentos }) => {
    const [agendamentos, setAgendamentosLocal] = useState([]);
    const [perfilAberto, setPerfilAberto] = useState(false);
    const [usuarioSelecionado, setUsuarioSelecionado] = useState(null);
    const [loading, setLoading] = useState(false);
    const [orderConfig, setOrderConfig] = useState({
        column: "matricula",
        direction: "asc",
    });
    const tbodyRef = useRef(null);
    // eslint-disable-next-line
    const [scrollPosition, setScrollPosition] = useState(0);

    const formatarDataHoraUso = (data, horaInicio, horaFim) => {
        const dia = format(new Date(data), "dd/MM");
        const horaInicial = format(
            new Date(`1970-01-01T${horaInicio}`),
            "HH:mm"
        );
        const horaFinal = format(new Date(`1970-01-01T${horaFim}`), "HH:mm");
        return `${dia} | ${horaInicial} - ${horaFinal}`;
    };

    const formatarDataHoraPedido = (data, hora) => {
        const diaMes = format(new Date(data), "dd/MM");
        const horaFormatada = format(new Date(`1970-01-01T${hora}`), "HH:mm");
        return `${diaMes} | ${horaFormatada}`;
    };

    const fetchAgendamentos = useCallback(async () => {
        setLoading(true);
        const currentScrollPosition = tbodyRef.current.scrollTop;
        setScrollPosition(currentScrollPosition);

        try {
            const reservas = await buscarReservasSemana(quadraId);
            setAgendamentosLocal(reservas);
            setAgendamentos(reservas);
        } catch (error) {
            console.error("Erro ao buscar agendamentos:", error);
        } finally {
            setLoading(false);
            tbodyRef.current.scrollTop = currentScrollPosition;
        }
    }, [quadraId, setAgendamentos]);

    useEffect(() => {
        if (quadraId) {
            fetchAgendamentos();
        }
    }, [quadraId, fetchAgendamentos]);

    useEffect(() => {
        if (socket) {
            socket.on("atualizarReservas", (data) => {
                console.log("Evento recebido:", data);
                fetchAgendamentos();
            });

            return () => {
                socket.off("atualizarReservas");
            };
        }
    }, [fetchAgendamentos]);

    const handleStatusUpdate = async (reservaId, novoStatus) => {
        const currentScrollPosition = tbodyRef.current.scrollTop;
        setScrollPosition(currentScrollPosition);

        try {
            await alterarStatusReserva(reservaId, novoStatus);
            setAgendamentosLocal((prevAgendamentos) =>
                prevAgendamentos.map((agendamento) =>
                    agendamento.id === reservaId
                        ? { ...agendamento, status: novoStatus }
                        : agendamento
                )
            );
            toast.success(`Reserva ${novoStatus} com sucesso!`);
        } catch (error) {
            console.error("Erro ao atualizar status:", error.message);
            toast.error("Erro ao atualizar status da reserva.");
        } finally {
            tbodyRef.current.scrollTop = currentScrollPosition;
        }
    };

    const abrirPerfilUsuario = (userId) => {
        setUsuarioSelecionado(userId);
        setPerfilAberto(true);
    };

    const fecharPerfil = () => {
        setPerfilAberto(false);
        setUsuarioSelecionado(null);
    };

    const sortAgendamentos = (column) => {
        const newDirection =
            orderConfig.column === column && orderConfig.direction === "asc"
                ? "desc"
                : "asc";
        const sortedAgendamentos = [...agendamentos].sort((a, b) => {
            const valA = a[column];
            const valB = b[column];

            if (valA < valB) return newDirection === "asc" ? -1 : 1;
            if (valA > valB) return newDirection === "asc" ? 1 : -1;
            return 0;
        });

        setOrderConfig({ column, direction: newDirection });
        setAgendamentosLocal(sortedAgendamentos);
    };

    return (
        <>
            <TableContainer>
                <Table>
                    <thead>
                        <tr>
                            <Th
                                className={
                                    orderConfig.column === "matricula"
                                        ? `sorted-${orderConfig.direction}`
                                        : ""
                                }
                                onClick={() => sortAgendamentos("matricula")}
                            >
                                Matrícula
                            </Th>
                            <Th
                                className={
                                    orderConfig.column === "usuario_nome"
                                        ? `sorted-${orderConfig.direction}`
                                        : ""
                                }
                                onClick={() => sortAgendamentos("usuario_nome")}
                            >
                                Nome do Aluno
                            </Th>
                            <Th
                                className={
                                    orderConfig.column === "curso"
                                        ? `sorted-${orderConfig.direction}`
                                        : ""
                                }
                                onClick={() => sortAgendamentos("curso")}
                            >
                                Curso
                            </Th>
                            <Th
                                className={
                                    orderConfig.column === "hora_inicio"
                                        ? `sorted-${orderConfig.direction}`
                                        : ""
                                }
                                onClick={() => sortAgendamentos("hora_inicio")}
                            >
                                Horário de uso
                            </Th>
                            <Th
                                className={
                                    orderConfig.column === "hora_criacao"
                                        ? `sorted-${orderConfig.direction}`
                                        : ""
                                }
                                onClick={() => sortAgendamentos("hora_criacao")}
                            >
                                Data/hora do pedido
                            </Th>
                            <Th>Status</Th>
                            <Th>Ações</Th>
                        </tr>
                    </thead>
                    <tbody ref={tbodyRef}>
                        {loading ? (
                            <tr>
                                <Td colSpan="7">
                                    <Loading>
                                        Carregando agendamentos...
                                    </Loading>
                                </Td>
                            </tr>
                        ) : agendamentos.length > 0 ? (
                            agendamentos.map((agendamento) => (
                                <Row key={agendamento.id}>
                                    <Td>{agendamento.matricula}</Td>
                                    <Td>
                                        <LinkButton
                                            onClick={() =>
                                                abrirPerfilUsuario(
                                                    agendamento.usuario_id
                                                )
                                            }
                                        >
                                            {agendamento.usuario_nome}
                                        </LinkButton>
                                    </Td>
                                    <Td>{agendamento.curso}</Td>
                                    <Td>
                                        {formatarDataHoraUso(
                                            agendamento.data,
                                            agendamento.hora_inicio,
                                            agendamento.hora_fim
                                        )}
                                    </Td>
                                    <Td>
                                        {formatarDataHoraPedido(
                                            agendamento.data_criacao,
                                            agendamento.hora_criacao
                                        )}
                                    </Td>
                                    <Td>{agendamento.status}</Td>
                                    <Td>
                                        {agendamento.status ===
                                            "Aguardando confirmação" && (
                                            <>
                                                <Button
                                                    action="aceitar"
                                                    onClick={() =>
                                                        handleStatusUpdate(
                                                            agendamento.id,
                                                            "Confirmada"
                                                        )
                                                    }
                                                >
                                                    Aceitar
                                                </Button>
                                                <Button
                                                    action="recusar"
                                                    onClick={() =>
                                                        handleStatusUpdate(
                                                            agendamento.id,
                                                            "Rejeitada"
                                                        )
                                                    }
                                                >
                                                    Recusar
                                                </Button>
                                            </>
                                        )}
                                    </Td>
                                </Row>
                            ))
                        ) : (
                            <Row>
                                <Td colSpan="7">
                                    Nenhum agendamento encontrado.
                                </Td>
                            </Row>
                        )}
                    </tbody>
                </Table>
            </TableContainer>

            {perfilAberto && (
                <MiniPerfilUsuario
                    userId={usuarioSelecionado}
                    onClose={fecharPerfil}
                />
            )}
        </>
    );
};

export default TabelaAgendamentos;
