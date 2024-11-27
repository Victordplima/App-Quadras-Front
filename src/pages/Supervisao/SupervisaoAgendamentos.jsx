import React, { useEffect, useState } from "react";
import styled from "styled-components";
import AgendamentoCard from "../../components/Supervisao/AgendamentoCard";
import { buscarReservasDia } from "../../api/reserva"

const Container = styled.div`
    background: linear-gradient(135deg, #50247a, #022660, #00a5aa);
    color: white;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const CardSection = styled.div`
    margin-top: 20px;
`;

const Loading = styled.div`
    font-size: 18px;
    text-align: center;
    padding: 20px;
`;

const SupervisaoAgendamentos = () => {
    const [reservas, setReservas] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchReservas = async () => {
            try {
                const reservasData = await buscarReservasDia();
                setReservas(reservasData);
                setLoading(false);
            } catch (error) {
                console.error("Erro ao buscar as reservas:", error);
                setLoading(false);
            }
        };
        fetchReservas();
    }, []);

    const esperandoConfirmacao = reservas.filter(
        (reserva) =>
            reserva.status === "Aguardando confirmação" &&
            new Date(reserva.data) < new Date()
    );
    const proximosAgendamentos = reservas.filter(
        (reserva) =>
            reserva.status === "Aguardando confirmação" &&
            new Date(reserva.data) >= new Date()
    );

    if (loading) {
        return <Loading>Carregando...</Loading>;
    }

    return (
        <Container>
            <h2>Agendamentos de Hoje</h2>

            {/* Esperando Confirmação */}
            <CardSection>
                <h3>Esperando Confirmação</h3>
                {esperandoConfirmacao.map((reserva) => (
                    <AgendamentoCard
                        key={reserva.reserva_id}
                        reserva={reserva}
                    />
                ))}
            </CardSection>

            {/* Próximos Agendamentos */}
            <CardSection>
                <h3>Próximos Agendamentos</h3>
                {proximosAgendamentos.map((reserva) => (
                    <AgendamentoCard
                        key={reserva.reserva_id}
                        reserva={reserva}
                    />
                ))}
            </CardSection>
        </Container>
    );
};

export default SupervisaoAgendamentos;
