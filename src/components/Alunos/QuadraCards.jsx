import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { buscarQuadras } from "../../api/quadra";
import { motion } from "framer-motion";

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

const CardsContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 20px;
    padding: 20px;
`;

const Card = styled(motion.div)`
    flex: 1 1 200px;
    max-width: 200px;
    min-width: 150px;
    height: 200px;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    background-color: #003a7b;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    padding: 10px;
    cursor: pointer;
    opacity: ${({ selected }) => (selected ? 1 : 0.4)};
    transform: ${({ selected }) => (selected ? "scale(1.05)" : "scale(1)")};
    transition: all 0.3s ease;

    img {
        width: 100%;
        height: 150px;
        object-fit: cover;
        border-radius: 10px;
        margin-bottom: 10px;
    }

    p {
        color: #fff;
        font-size: 1rem;
        font-weight: bold;
    }

    /* Media Query para telas menores (celulares) */
    @media (max-width: 600px) {
        flex: 1 1 140px;
        max-width: 160px;
        height: 180px;
    }

    /* Media Query para telas maiores (PC) */
    @media (min-width: 1024px) {
        flex: 1 1 250px;
        max-width: 200px;
        height: 200px;
    }
`;

const QuadraCards = () => {
    const [quadras, setQuadras] = useState([]);
    const [selectedQuadra, setSelectedQuadra] = useState(null);

    useEffect(() => {
        const fetchQuadras = async () => {
            try {
                const data = await buscarQuadras();
                const formattedQuadras = data.map((quadra) => ({
                    id: quadra.id,
                    name: quadra.nome,
                    image: quadraImages[quadra.nome] || null,
                }));
                setQuadras(formattedQuadras);
            } catch (error) {
                console.error("Erro ao buscar quadras:", error.message);
            }
        };
        fetchQuadras();
    }, []);

    const handleQuadraClick = (quadraId) => {
        setSelectedQuadra(selectedQuadra === quadraId ? null : quadraId);
        console.log(`Quadra selecionada: ${quadraId}`);
    };

    return (
        <CardsContainer>
            {quadras.map((quadra) => (
                <Card
                    key={quadra.id}
                    selected={selectedQuadra === quadra.id}
                    onClick={() => handleQuadraClick(quadra.id)}
                >
                    <img src={quadra.image} alt={quadra.name} />
                    <p>{quadra.name}</p>
                </Card>
            ))}
        </CardsContainer>
    );
};

export default QuadraCards;
