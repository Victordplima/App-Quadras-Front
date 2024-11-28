import React, { useEffect, useState, useCallback } from "react";
import styled from "styled-components";
import { buscarReservasSemana, alterarStatusReserva } from "../../api/reserva";
import { format } from "date-fns";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import socket from "../../api/socket";

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

const TabelaAgendamentos = ({ quadraId, setAgendamentos }) => {
    const [agendamentos, setAgendamentosLocal] = useState([]);

    // Função para formatar a data e hora (exibindo dia, horário de início e fim)
    const formatarDataHoraUso = (data, horaInicio, horaFim) => {
        const dia = format(new Date(data), "dd/MM");
        const horaInicial = format(
            new Date(`1970-01-01T${horaInicio}Z`),
            "HH:mm"
        );
        const horaFinal = format(new Date(`1970-01-01T${horaFim}Z`), "HH:mm");
        return `${dia} | ${horaInicial} - ${horaFinal}`;
    };

    const formatarDataHoraPedido = (data, hora) => {
        const diaMes = format(new Date(data), "dd/MM");
        const horaFormatada = format(new Date(`1970-01-01T${hora}Z`), "HH:mm");
        return `${diaMes} | ${horaFormatada}`;
    };

    // Mover fetchAgendamentos para useCallback para garantir estabilidade
    const fetchAgendamentos = useCallback(async () => {
        try {
            const reservas = await buscarReservasSemana(quadraId);
            setAgendamentosLocal(reservas);
            setAgendamentos(reservas);
        } catch (error) {
            console.error("Erro ao buscar agendamentos:", error);
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
                fetchAgendamentos(); // recarrega as reservas quando ouve
            });

            return () => {
                socket.off("atualizarReservas");
            };
        }
    }, [fetchAgendamentos]);

    const handleStatusUpdate = async (reservaId, novoStatus) => {
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
        }
    };

    return (
        <TableContainer>
            <Table>
                <thead>
                    <tr>
                        <Th>Matrícula</Th>
                        <Th>Nome do Aluno</Th>
                        <Th>Curso</Th>
                        <Th>Horário de uso</Th>
                        <Th>Data/hora do pedido</Th>
                        <Th>Status</Th>
                        <Th>Ações</Th>
                    </tr>
                </thead>
                <tbody>
                    {agendamentos.length > 0 ? (
                        agendamentos.map((agendamento) => (
                            <Row key={agendamento.id}>
                                <Td>{agendamento.matricula}</Td>
                                <Td>{agendamento.usuario_nome}</Td>
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
                            <Td colSpan="7">Nenhum agendamento encontrado.</Td>
                        </Row>
                    )}
                </tbody>
            </Table>
        </TableContainer>
    );
};

export default TabelaAgendamentos;
