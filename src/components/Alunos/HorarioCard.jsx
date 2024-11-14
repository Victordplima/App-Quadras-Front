import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { buscarAgendamentosDia } from "../../api/reserva";

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

    const horariosDisponiveis = [
        "13:00",
        "14:00",
        "15:00",
        "16:00",
        "17:00",
        "18:00",
        "19:00",
        "20:00",
        "21:00",
    ];

    useEffect(() => {
        const fetchHorarios = async () => {
            if (selectedQuadra && selectedDay) {
                const formattedDate = selectedDay.toISOString().split("T")[0]; // YYYY-MM-DD
                setLoading(true);
                setError(null);

                try {
                    const reservas = await buscarAgendamentosDia(
                        selectedQuadra,
                        formattedDate
                    );
                    console.log("Reservas recebidas:", reservas);

                    const horariosAtualizados = horariosDisponiveis.map(
                        (hora) => {
                            console.log("Verificando horário:", hora);

                            const ocupado = reservas.some((reserva) => {
                                if (
                                    reserva.hora_inicio &&
                                    reserva.hora_inicio.includes(":")
                                ) {
                                    const horaReserva =
                                        reserva.hora_inicio.slice(0, 5); // pega a parte da hora: MM:SS
                                    console.log(
                                        `Comparando: ${hora} com ${horaReserva}`
                                    );
                                    return horaReserva === hora; // compare as horas no formato HH:MM
                                }
                                return false;
                            });

                            console.log(`Horário ${hora} ocupado:`, ocupado);

                            return {
                                hora,
                                ocupado,
                            };
                        }
                    );

                    setHorarios(horariosAtualizados);
                } catch (err) {
                    console.error("Erro ao buscar horários:", err);
                    setError("Erro ao buscar horários.");
                } finally {
                    setLoading(false);
                }
            }
        };

        fetchHorarios();
        // nao tirar esse comentario de baixo, pq se nao vai dar warning
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedQuadra, selectedDay]);

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
