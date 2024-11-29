import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { buscarReservasDiaSemOcorrencia } from "../../api/reserva";
import AgendamentoCard from "../../components/Supervisao/AgendamentoCard";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Supervisao/Header";

import quadraAreia3 from "../../assets/Quadra de areia 3.jpg";
import campoFutebol from "../../assets/Campo de futebol.jpg";
import quadraAreia2 from "../../assets/Quadra de areia 2.jpg";
import quadraCoberta from "../../assets/Quadra coberta.jpg";
import quadraDescoberta from "../../assets/Quadra descoberta.jpg";
import quadraAreia1 from "../../assets/Quadra de areia 1.jpg";
import pistaAtletismo from "../../assets/Pista de atletismo.jpeg";

const quadraImages = {
    "Quadra de Areia 3": quadraAreia3,
    "Campo de Futebol": campoFutebol,
    "Quadra de Areia 2": quadraAreia2,
    "Quadra Coberta": quadraCoberta,
    "Quadra Descoberta": quadraDescoberta,
    "Quadra de Areia 1": quadraAreia1,
    "Pista de Atletismo": pistaAtletismo,
};

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
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 15px;

    @media (max-width: 768px) {
        flex-direction: column;
        align-items: center;
    }
`;

const Loading = styled.div`
    font-size: 18px;
    text-align: center;
    padding: 20px;
`;

const Title = styled.h1`
    padding-top: 80px;
`;

const SubTitle = styled.h3`
    padding-top: 40px;
`;

const SupervisaoAgendamentos = () => {
    const [reservas, setReservas] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchReservas = async () => {
            try {
                const reservasData = await buscarReservasDiaSemOcorrencia();
                setReservas(reservasData);
            } catch (error) {
                console.error("Erro ao buscar as reservas:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchReservas();
    }, []);

    const getDateTime = (data, hora) => {
        return new Date(`${data.split("T")[0]}T${hora}`);
    };

    const esperandoConfirmacao = reservas.filter((reserva) => {
        const reservaDateTime = getDateTime(reserva.data, reserva.hora_inicio);
        return (
            reserva.status === "Aguardando confirmação" &&
            reservaDateTime < new Date()
        );
    });

    const proximosAgendamentos = reservas.filter((reserva) => {
        const reservaDateTime = getDateTime(reserva.data, reserva.hora_inicio);
        return (
            reserva.status === "Aguardando confirmação" &&
            reservaDateTime >= new Date()
        );
    });

    const handleCardClick = (reserva, categoria) => {
        if (categoria === "esperandoConfirmacao") {
            navigate("/supervisao/verificacao", { state: { reserva } });
        }
    };

    const getImageForQuadra = (quadraNome) => {
        return quadraImages[quadraNome] || "/images/default-quadra.jpg";
    };

    if (loading) {
        return <Loading>Carregando...</Loading>;
    }

    return (
        <Container>
            <Header />
            <Title>Agendamentos de Hoje</Title>
            <SubTitle>Esperando Confirmação</SubTitle>
            <CardSection>
                {esperandoConfirmacao.length > 0 ? (
                    esperandoConfirmacao.map((reserva) => (
                        <div
                            key={reserva.id}
                            onClick={() =>
                                handleCardClick(reserva, "esperandoConfirmacao")
                            }
                        >
                            <AgendamentoCard
                                reserva={reserva}
                                imagem={getImageForQuadra(reserva.quadra_nome)}
                            />
                        </div>
                    ))
                ) : (
                    <p>Nenhuma reserva esperando confirmação.</p>
                )}
            </CardSection>
            <SubTitle>Próximos Agendamentos</SubTitle>
            <CardSection>
                {proximosAgendamentos.length > 0 ? (
                    proximosAgendamentos.map((reserva) => (
                        <div key={reserva.id}>
                            <AgendamentoCard
                                reserva={reserva}
                                imagem={getImageForQuadra(reserva.quadra_nome)}
                            />
                        </div>
                    ))
                ) : (
                    <p>Sem próximos agendamentos.</p>
                )}
            </CardSection>
        </Container>
    );
};

export default SupervisaoAgendamentos;
