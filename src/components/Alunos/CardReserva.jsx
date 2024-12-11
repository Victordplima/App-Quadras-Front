import React, { useState } from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisV, faCircleMinus } from "@fortawesome/free-solid-svg-icons";
import ModalConfirmacao from "./ModalConfirmacao";

import quadraAreia3 from "../../assets/Quadra de areia 3.jpg";
import campoFutebol from "../../assets/Campo de futebol.jpg";
import quadraAreia2 from "../../assets/Quadra de areia 2.jpg";
import quadraCoberta from "../../assets/Quadra coberta.jpg";
import quadraDescoberta from "../../assets/Quadra descoberta.jpg";
import quadraAreia1 from "../../assets/Quadra de areia 1.jpg";
import pistaAtletismo from "../../assets/Pista de atletismo.jpeg";

// Mapeamento das imagens das quadras
const quadraImages = {
    "Quadra de Areia 3": quadraAreia3,
    "Campo de Futebol": campoFutebol,
    "Quadra de Areia 2": quadraAreia2,
    "Quadra Coberta": quadraCoberta,
    "Quadra Descoberta": quadraDescoberta,
    "Quadra de Areia 1": quadraAreia1,
    "Pista de Atletismo": pistaAtletismo,
};

// Função para obter as cores de fundo conforme o status
const getStatusColor = (status) => {
    switch (status) {
        case "Confirmada":
            return "#90ee90";
        case "Cancelada":
            return "#d3d3d3";
        case "Rejeitada":
            return "#ffcccb";
        case "Aguardando confirmação":
            return "#ffe5b4";
        case "Aula":
            return "#add8e6";
        default:
            return "#fff";
    }
};

// Função para obter as cores do texto do status
const getStatusTagColor = (status) => {
    switch (status) {
        case "Confirmada":
            return "#28a745";
        case "Cancelada":
            return "#6c757d";
        case "Rejeitada":
            return "#dc3545";
        case "Aguardando confirmação":
            return "#ffc107";
        case "Aula":
            return "#007bff";
        default:
            return "#000";
    }
};

const Card = styled(motion.div)`
    width: 320px;
    background-color: ${(props) => getStatusColor(props.status)};
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
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

    .icon {
        color: black;
        font-size: 1.2rem;
    }

    .dropdown {
        position: absolute;
        top: 20px;
        right: 0;
        background-color: #fff;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.4);
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
            color: #b60000;
            display: flex;
            align-items: center;
            transition: all 0.2s ease-in-out;

            &:hover {
                background-color: #f5f5f5;
                transform: scale(1.05);
            }

            svg {
                margin-right: 8px;
                color: #b60000;
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
    color: ${(props) => getStatusTagColor(props.status)};
`;

const Footer = styled.div`
    text-align: right;
    font-size: 0.8rem;
    color: #888;

    p {
        margin: 0;
    }
`;

const NomeQuadra = styled.h3`
    color: black;
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
        return `${diasSemana[date.getDay()]}, ${date.toLocaleDateString(
            "pt-BR"
        )}`;
    };

    // Verificações de segurança para evitar erros de undefined
    const nomeQuadra = reserva.quadra_nome || "Quadra desconhecida";
    const nomeUsuario = reserva.usuario_id || "Usuário desconhecido";

    return (
        <Card status={reserva.status}>
            <ImageSection>
                <QuadraImage
                    src={quadraImages[nomeQuadra] || ""} // Garantir imagem padrão
                    alt={nomeQuadra}
                />
            </ImageSection>

            <Content>
                <Header>
                    <NomeQuadra>{nomeQuadra}</NomeQuadra>
                    {(reserva.status === "Aguardando confirmação" ||
                        reserva.status === "Confirmada") && (
                        <Options>
                            <FontAwesomeIcon
                                icon={faEllipsisV}
                                className="icon"
                                onClick={toggleDropdown}
                            />
                            {isDropdownOpen && (
                                <div className="dropdown">
                                    <button onClick={handleCancelarReserva}>
                                        <FontAwesomeIcon icon={faCircleMinus} />
                                        Cancelar
                                    </button>
                                </div>
                            )}
                        </Options>
                    )}
                </Header>

                <Details>
                    <p>Data: {formatarData(reserva.data)}</p>
                    <p>
                        Horário: {reserva.hora_inicio} às {reserva.hora_fim}
                    </p>
                    <Status status={reserva.status}>{reserva.status}</Status>
                </Details>

                <Footer>
                    <p>Agendado por: {nomeUsuario}</p>
                </Footer>
            </Content>

            <AnimatePresence>
                {isModalOpen && (
                    <ModalConfirmacao
                        reserva={reserva}
                        setModalOpen={setModalOpen}
                        onClose={() => setModalOpen(false)}
                    />
                )}
            </AnimatePresence>
        </Card>
    );
};

export default CardReserva;
