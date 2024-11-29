import React from "react";
import styled from "styled-components";

// Imagens das quadras
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

const Card = styled.div`
    background: #fff;
    margin: 10px;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 15px;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    cursor: pointer;

    &:hover {
        transform: scale(1.05);
        box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
    }

    @media (max-width: 768px) {
        flex-direction: column;
        align-items: center;
        text-align: center;
    }
`;

const CardInfo = styled.div`
    display: flex;
    flex-direction: column;
    flex-grow: 1;
`;

const Title = styled.h3`
    font-size: 1.2rem;
    margin: 0;
    color: #003a7b;
    font-weight: 600;
`;

const Subtitle = styled.p`
    font-size: 1rem;
    margin: 5px 0;
    color: #555;
`;

const Image = styled.img`
    width: 120px;
    height: 120px;
    object-fit: cover;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

    @media (max-width: 768px) {
        width: 100px;
        height: 100px;
    }
`;

const AgendamentoCard = ({ reserva, onClick }) => {
    const quadraImage =
        quadraImages[reserva.quadra_nome] || "/path/to/default-image.jpg";

    return (
        <Card onClick={onClick}>
            <Image src={quadraImage} alt={reserva.quadra_nome} />
            <CardInfo>
                <Title>{reserva.quadra_nome}</Title>
                <Subtitle>
                    Data: {new Date(reserva.data).toLocaleDateString()}
                </Subtitle>
                <Subtitle>
                    Hora: {reserva.hora_inicio} - {reserva.hora_fim}
                </Subtitle>
                <Subtitle>Nome: {reserva.usuario_nome}</Subtitle>
                <Subtitle>Esporte: {reserva.esporte_nome}</Subtitle>
            </CardInfo>
        </Card>
    );
};

export default AgendamentoCard;
