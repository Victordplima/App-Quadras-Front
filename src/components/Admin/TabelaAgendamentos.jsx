import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { buscarReservasSemana, alterarStatusReserva } from "../../api/reserva";
import { buscarUsuarioPorId } from "../../api/usuario";
import { format } from "date-fns";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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

    const formatarDataHora = (data, hora) => {
        return `${format(new Date(data), "dd/MM/yyyy")} ${format(
            new Date(`1970-01-01T${hora}Z`),
            "HH:mm"
        )}`;
    };

    useEffect(() => {
        const fetchAgendamentos = async () => {
            try {
                const reservas = await buscarReservasSemana(quadraId);
                const reservasComUsuarios = await Promise.all(
                    reservas.map(async (reserva) => {
                        const usuario = await buscarUsuarioPorId(
                            reserva.usuario_id
                        );
                        return {
                            ...reserva,
                            matricula: usuario.matricula,
                            nomeAluno: usuario.nome,
                            curso: usuario.curso,
                        };
                    })
                );
                setAgendamentosLocal(reservasComUsuarios);
                setAgendamentos(reservasComUsuarios); // Atualiza o estado do pai com os agendamentos
            } catch (error) {
                console.error("Erro ao buscar agendamentos:", error);
            }
        };

        if (quadraId) {
            fetchAgendamentos();
        }
    }, [quadraId, setAgendamentos]); // Adicione setAgendamentos aqui

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

            if (novoStatus === "Confirmada") {
                const agendamentoConfirmado = agendamentos.find(
                    (a) => a.id === reservaId
                );
                setAgendamentos((prevAgendamentos) =>
                    prevAgendamentos.map((agendamento) =>
                        agendamento.id === agendamentoConfirmado.id
                            ? agendamentoConfirmado
                            : agendamento
                    )
                );
            }

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
                                <Td>{agendamento.nomeAluno}</Td>
                                <Td>{agendamento.curso}</Td>
                                <Td>{`${formatarDataHora(
                                    agendamento.data,
                                    agendamento.hora_inicio
                                )} - ${formatarDataHora(
                                    agendamento.data,
                                    agendamento.hora_fim
                                )}`}</Td>
                                <Td>
                                    {formatarDataHora(
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
