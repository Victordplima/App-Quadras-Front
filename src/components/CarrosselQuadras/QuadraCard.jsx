import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

const CardContainer = styled(motion.div)`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 10px;
    cursor: pointer;
    background-color: ${({ isSelected }) =>
        isSelected
            ? "#1e99c0"
            : "#181444"}; /* Cor de fundo altera conforme o estado */
    border-radius: 10px;
    width: 100%;
    max-width: 300px;
    flex: 1;
    transition: background-color 0.3s ease; /* Transição suave na alteração da cor de fundo */

    &:hover {
        background-color: #2d3f6d; /* Cor de fundo no hover */
    }
`;

const QuadraImage = styled.img`
    width: 100%;
    height: 200px;
    border-radius: 10px;
    padding: 7px;
`;

const QuadraName = styled.p`
    margin-top: 10px;
    font-size: 1.2rem;
    color: white;
    padding-bottom: 12px;

    @media (max-width: 768px) {
        font-size: 1rem;
    }
`;

function QuadraCard({ image, name, onClick, isSelected }) {
    return (
        <CardContainer
            onClick={onClick}
            isSelected={isSelected}
            whileTap={{ scale: 0.95 }} // Animação de scale ao clicar
            whileHover={{ scale: 1.05 }} // Animação de scale no hover
            transition={{ type: "spring", stiffness: 300, damping: 20 }} // Transição suave
        >
            <QuadraImage src={image} alt={name} />
            <QuadraName>{name}</QuadraName>
        </CardContainer>
    );
}

export default QuadraCard;
