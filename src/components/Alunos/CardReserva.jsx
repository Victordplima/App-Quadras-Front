import React, { useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisV } from "@fortawesome/free-solid-svg-icons";
import ModalConfirmacao from "./ModalConfirmacao";

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

const Card = styled(motion.div)`
    width: 320px;
    background-color: #f9f9f9;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    overflow: hidden;
    display: flex;
    flex-direction: column;
`;

const ImageSection = styled.div`
    height: 180px;
`;

const QuadraImage = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
`;

const Content = styled.div`
    padding: 15px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    flex: 1;
`;

const Header = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;

    h3 {
        font-size: 1.2rem;
        font-weight: bold;
        margin: 0;
    }
`;

const Options = styled.div`
    position: relative;
    cursor: pointer;

    .dropdown {
        position: absolute;
        top: 20px;
        right: 0;
        background-color: #fff;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        border-radius: 5px;
        overflow: hidden;
        z-index: 10;

        button {
            padding: 10px 15px;
            border: none;
            background: none;
            width: 100%;
            text-align: left;
            cursor: pointer;
            font-size: 1rem;
            color: #555;

            &:hover {
                background-color: #f5f5f5;
            }
        }
    }
`;

const Details = styled.div`
    margin: 10px 0;

    p {
        margin: 5px 0;
        font-size: 1rem;
        color: #555;
    }
`;

const Status = styled.p`
    font-size: 0.9rem;
    font-weight: bold;
    margin-top: 10px;
    color: ${(props) =>
        props.status === "Aprovado"
            ? "green"
            : props.status === "Rejeitado"
            ? "red"
            : "#f39c12"};
`;

const Footer = styled.div`
    text-align: right;
    font-size: 0.8rem;
    color: #888;

    p {
        margin: 0;
    }
`;

const CardReserva = ({ reserva }) => {
    const [isModalOpen, setModalOpen] = useState(false);
    const [isDropdownOpen, setDropdownOpen] = useState(false);

    const handleCancelarReserva = () => {
        setDropdownOpen(false);
        setModalOpen(true);
    };

    const toggleDropdown = () => {
        setDropdownOpen((prev) => !prev);
    };

    const formatarData = (data) => {
        const date = new Date(data);
        const diasSemana = [
            "domingo",
            "segunda-feira",
            "terça-feira",
            "quarta-feira",
            "quinta-feira",
            "sexta-feira",
            "sábado",
        ];
        return `${date.getDate().toString().padStart(2, "0")}/${(
            date.getMonth() + 1
        )
            .toString()
            .padStart(2, "0")} (${diasSemana[date.getDay()]})`;
    };

    return (
        <Card
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
        >
            <ImageSection>
                <QuadraImage
                    src={
                        quadraImages[reserva.quadra_nome] ||
                        "/path/to/default-image.jpg"
                    }
                    alt={reserva.quadra_nome}
                />
            </ImageSection>
            <Content>
                <Header>
                    <h3>{reserva.quadra_nome}</h3>
                    <Options>
                        <FontAwesomeIcon
                            icon={faEllipsisV}
                            onClick={toggleDropdown}
                        />
                        {isDropdownOpen && (
                            <div className="dropdown">
                                <button onClick={handleCancelarReserva}>
                                    Cancelar
                                </button>
                            </div>
                        )}
                    </Options>
                </Header>
                <Details>
                    <p>Data: {formatarData(reserva.data)}</p>
                    <p>
                        Horário: {reserva.hora_inicio} às {reserva.hora_fim}
                    </p>
                    <Status status={reserva.status}>{reserva.status}</Status>
                </Details>
                <Footer>
                    <p>
                        Agendado em: {formatarData(reserva.data_criacao)} às{" "}
                        {reserva.hora_criacao}
                    </p>
                </Footer>
            </Content>
            {isModalOpen && (
                <ModalConfirmacao
                    reserva={reserva}
                    onClose={() => setModalOpen(false)}
                />
            )}
        </Card>
    );
};

export default CardReserva;
