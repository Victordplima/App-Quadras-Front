import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { buscarReservasUsuario } from "../../api/reserva";
import CardReserva from "../../components/Alunos/CardReserva";
import Header from "../../components/Alunos/Header";

const Container = styled.div`
    background: linear-gradient(135deg, #50247a, #022660, #00a5aa);
    color: white;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
`;

const Section = styled.section`
    padding-top: 80px;
    margin-bottom: 30px;
`;

const CardList = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
`;

const HistoricoAgendamentos = () => {
    const [reservas, setReservas] = useState([]);
    const [ativos, setAtivos] = useState([]);
    const [antigos, setAntigos] = useState([]);
    const usuarioId = localStorage.getItem("usuarioId");

    useEffect(() => {
        const fetchReservas = async () => {
            try {
                const data = await buscarReservasUsuario(usuarioId);

                if (Array.isArray(data)) {
                    setReservas(data);

                    const reservasAtivas = data.filter(
                        (reserva) => new Date(reserva.data) > new Date()
                    );
                    const reservasAntigas = data.filter(
                        (reserva) => new Date(reserva.data) <= new Date()
                    );

                    setAtivos(reservasAtivas);
                    setAntigos(reservasAntigas);
                }
            } catch (error) {
                console.error("Erro ao buscar reservas:", error);
            }
        };

        if (usuarioId) {
            fetchReservas();
        } else {
            console.error("Usuário não autenticado.");
        }
    }, [usuarioId]);

    return (
        <Container>
            <Header />
            <Section>
                <h2>Agendamentos Ativos</h2>
                <CardList>
                    {ativos.length ? (
                        ativos.map((reserva) => (
                            <CardReserva key={reserva.id} reserva={reserva} />
                        ))
                    ) : (
                        <p>Não há agendamentos ativos no momento.</p>
                    )}
                </CardList>
            </Section>

            <Section>
                <h2>Agendamentos Antigos</h2>
                <CardList>
                    {antigos.length ? (
                        antigos.map((reserva) => (
                            <CardReserva key={reserva.id} reserva={reserva} />
                        ))
                    ) : (
                        <p>Não há agendamentos antigos.</p>
                    )}
                </CardList>
            </Section>
        </Container>
    );
};

export default HistoricoAgendamentos;
