import React, { useEffect, useState, useCallback } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { buscarAgendamentosDia } from "../../api/reserva";
import socket from "../../api/socket";

const HoursContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 15px;
    padding: 20px;
`;

const HourButton = styled(motion.button)`
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: ${(props) =>
        props.selected ? "#08bcfc" : props.disabled ? "#000000" : "#00457f"};
    color: white;
    border: none;
    padding: 10px 15px;
    border-radius: 8px;
    cursor: pointer;
    font-size: 1rem;
    ${(props) =>
        props.disabled &&
        `
        cursor: not-allowed;
    `}
    transition: background-color 0.3s ease;
`;

const StatusText = styled.span`
    font-size: 0.8rem;
    color: white;
    margin-top: 5px;
`;

const HorarioCard = ({ selectedQuadra, selectedDay, setSelectedTime }) => {
    const [horarios, setHorarios] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [selectedHora, setSelectedHora] = useState(null);

    const fetchHorarios = useCallback(async () => {
        const horariosDisponiveis = [
            "13:00",
            "14:00",
            "15:00",
            "16:00",
            "17:00",
            "18:00",
            "19:00",
            "20:00",
        ];

        if (selectedQuadra && selectedDay) {
            const formattedDate = selectedDay.toISOString().split("T")[0]; // YYYY-MM-DD
            setLoading(true);
            setError(null);

            try {
                const reservas = await buscarAgendamentosDia(
                    selectedQuadra,
                    formattedDate
                );

                const horariosAtualizados = horariosDisponiveis.map((hora) => {
                    const ocupado = reservas.some((reserva) => {
                        if (
                            reserva.hora_inicio &&
                            reserva.hora_inicio.includes(":")
                        ) {
                            const horaReserva = reserva.hora_inicio.slice(0, 5); // pega a parte da hora: MM:SS
                            // Verificar se o status da reserva não é "Cancelada" ou "Rejeitada"
                            const statusValido =
                                reserva.status !== "Cancelada" &&
                                reserva.status !== "Rejeitada";
                            return horaReserva === hora && statusValido; // compare as horas no formato HH:MM
                        }
                        return false;
                    });

                    return {
                        hora,
                        ocupado,
                    };
                });

                setHorarios(horariosAtualizados);
            } catch (err) {
                console.error("Erro ao buscar horários:", err);
                setError("Erro ao buscar horários.");
            } finally {
                setLoading(false);
            }
        }
    }, [selectedQuadra, selectedDay]);

    useEffect(() => {
        fetchHorarios();
    }, [selectedQuadra, selectedDay, fetchHorarios]);

    useEffect(() => {
        if (socket) {
            socket.on("atualizarReservas", (data) => {
                console.log("Evento recebido via WebSocket", data);
                fetchHorarios();
            });

            return () => {
                socket.off("atualizarReservas");
            };
        }
    }, [fetchHorarios]);

    if (loading) {
        return <p>Carregando horários...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <HoursContainer>
            {horarios.length === 0 ? (
                <p>Não há horários disponíveis para essa quadra e dia.</p>
            ) : (
                horarios.map(({ hora, ocupado }, index) => (
                    <HourButton
                        key={index}
                        as={motion.button}
                        initial={{ scale: 1 }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        selected={selectedHora === hora && !ocupado}
                        disabled={ocupado}
                        onClick={() => {
                            if (!ocupado) {
                                setSelectedTime(hora);
                                setSelectedHora(hora);
                            }
                        }}
                    >
                        {hora}
                        <StatusText>
                            {ocupado ? "Indisponível" : "Disponível"}
                        </StatusText>
                    </HourButton>
                ))
            )}
        </HoursContainer>
    );
};

export default HorarioCard;
