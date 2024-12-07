import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { buscarReservasUsuario } from "../../api/reserva";
import socket from "../../api/socket";
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
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const CardList = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 20px;
    width: 100%;
    max-width: 1200px;
    margin-top: 20px;
`;

const Title = styled.h2`
    padding-bottom: 10px;
    text-align: center;
`;

const HistoricoAgendamentos = () => {
    // eslint-disable-next-line
    const [reservas, setReservas] = useState([]);
    const [ativos, setAtivos] = useState([]);
    const [antigos, setAntigos] = useState([]);

    const usuario = JSON.parse(localStorage.getItem("user"));
    const usuarioId = usuario ? usuario.id : null;

    const fetchReservas = async () => {
        try {
            if (!usuarioId) {
                console.error("Usuário não autenticado.");
                return;
            }

            const data = await buscarReservasUsuario(usuarioId);
            console.log("Dados das reservas:", data);

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
            } else {
                console.error("A resposta não é um array", data);
            }
        } catch (error) {
            console.error("Erro ao buscar reservas:", error);
        }
    };

    useEffect(() => {
        fetchReservas();

        if (socket) {
            socket.on("atualizarReservas", (data) => {
                console.log("Evento recebido via WebSocket:", data);
                fetchReservas();
            });

            return () => {
                socket.off("atualizarReservas");
            };
        }
        // eslint-disable-next-line
    }, [usuarioId]);

    return (
        <Container>
            <Header />
            <Section>
                <Title>Agendamentos Ativos</Title>
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
                <Title>Agendamentos Antigos</Title>
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
