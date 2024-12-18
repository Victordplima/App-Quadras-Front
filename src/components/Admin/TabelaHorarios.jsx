import React, { useEffect, useState, useCallback, useMemo } from "react";
import styled from "styled-components";
import { buscarReservasSemana } from "../../api/reserva";
import { buscarUsuarioPorId } from "../../api/usuario";
import socket from "../../api/socket";

const Tabela = styled.table`
    width: 100%;
    border-collapse: collapse;
    margin-top: 30px;
`;

const CabecalhoTabela = styled.th`
    padding: 10px;
    background-color: ${({ $cor }) => $cor || "#f3f3f3"};
    color: white;
    font-weight: bold;
    text-align: center;
    border: 1px solid #ddd;
`;

const CelulaTabela = styled.td`
    padding: 10px;
    text-align: center;
    border: 1px solid #ddd;
    background-color: ${({ $status }) => {
        if ($status === "Aula") return "#f0ad4e";
        if ($status === "Confirmada") return "#28a745";
        return "white";
    }};
    cursor: default;

    &:hover {
        background-color: ${({ $status }) => {
            if ($status === "Aula") return "#f39c12";
            if ($status === "Confirmada") return "#218838";
            return "#f3f3f3";
        }};
    }
`;

const CelulaHora = styled.th`
    padding: 10px;
    background-color: #f3f3f3;
    font-weight: bold;
    text-align: center;
    border: 1px solid #ddd;
`;

const TabelaHorarios = ({ quadraId }) => {
    const diasDaSemana = useMemo(
        () => [
            "Segunda-feira",
            "Terça-feira",
            "Quarta-feira",
            "Quinta-feira",
            "Sexta-feira",
        ],
        []
    );

    const horarios = useMemo(
        () => [
            "13:00",
            "14:00",
            "15:00",
            "16:00",
            "17:00",
            "18:00",
            "19:00",
            "20:00",
            "21:00",
        ],
        []
    );

    const [horariosReservados, setHorariosReservados] = useState({});

    const formatarDiaDaSemana = useCallback(
        (data) => {
            const diaDaSemana = new Date(data).getDay();
            return diasDaSemana[diaDaSemana === 0 ? 6 : diaDaSemana - 1];
        },
        [diasDaSemana]
    );

    const atualizarReservas = useCallback(async () => {
        if (!quadraId) return;

        try {
            const reservas = await buscarReservasSemana(quadraId);
            const reservasFiltradas = reservas.filter(
                (reserva) =>
                    reserva.status === "Confirmada" || reserva.status === "Aula"
            );

            const usuariosPromises = reservasFiltradas.map(async (reserva) => {
                const usuario = await buscarUsuarioPorId(reserva.usuario_id);
                return { ...reserva, nomeUsuario: usuario.nome };
            });

            const reservasComUsuarios = await Promise.all(usuariosPromises);

            const novosHorariosReservados = reservasComUsuarios.reduce(
                (acc, reserva) => {
                    const dia = formatarDiaDaSemana(reserva.data);
                    const chave = `${dia}-${reserva.hora_inicio.slice(0, 5)}`;
                    acc[chave] = {
                        nomeUsuario: reserva.nomeUsuario,
                        status: reserva.status,
                    };
                    return acc;
                },
                {}
            );

            setHorariosReservados(novosHorariosReservados);
        } catch (error) {
            console.error("Erro ao buscar reservas:", error);
        }
    }, [quadraId, formatarDiaDaSemana]);

    useEffect(() => {
        atualizarReservas();
    }, [quadraId, atualizarReservas]);

    useEffect(() => {
        if (socket) {
            // Ouvir evento de atualização
            socket.on("atualizarReservas", () => {
                console.log("Evento de atualização recebido via WebSocket");
                atualizarReservas(); // Revalida os dados
            });

            // Limpeza ao desmontar o componente
            return () => {
                socket.off("atualizarReservas");
            };
        }
    }, [atualizarReservas]);

    const gerarDatasDaSemana = () => {
        const hoje = new Date();
        const datas = [];
        for (let i = 0; i < 5; i++) {
            const data = new Date(hoje);
            data.setDate(hoje.getDate() + (i - hoje.getDay() + 1));
            datas.push(data.toLocaleDateString("pt-BR"));
        }
        return datas;
    };

    const datasDaSemana = gerarDatasDaSemana();

    const coresDias = {
        "Segunda-feira": "#5cb85c",
        "Terça-feira": "#f0ad4e",
        "Quarta-feira": "#d9534f",
        "Quinta-feira": "#5bc0de",
        "Sexta-feira": "#d35400",
    };

    return (
        <Tabela>
            <thead>
                <tr>
                    <CelulaHora></CelulaHora>
                    {diasDaSemana.map((dia) => (
                        <CabecalhoTabela key={dia} $cor={coresDias[dia]}>
                            {dia}
                        </CabecalhoTabela>
                    ))}
                </tr>
                <tr>
                    <CelulaHora></CelulaHora>
                    {datasDaSemana.map((data, index) => (
                        <CabecalhoTabela
                            key={index}
                            $cor={coresDias[diasDaSemana[index]]}
                        >
                            {data}
                        </CabecalhoTabela>
                    ))}
                </tr>
            </thead>
            <tbody>
                {horarios.map((horario) => (
                    <tr key={horario}>
                        <CelulaHora>{horario}</CelulaHora>
                        {diasDaSemana.map((dia) => {
                            const chave = `${dia}-${horario}`;
                            const reserva = horariosReservados[chave];
                            // eslint-disable-next-line
                            const ocupada = reserva
                                ? !!reserva.nomeUsuario
                                : false;
                            const status = reserva ? reserva.status : null;

                            return (
                                <CelulaTabela key={chave} $status={status}>
                                    {reserva ? reserva.nomeUsuario : ""}
                                </CelulaTabela>
                            );
                        })}
                    </tr>
                ))}
            </tbody>
        </Tabela>
    );
};

export default TabelaHorarios;
