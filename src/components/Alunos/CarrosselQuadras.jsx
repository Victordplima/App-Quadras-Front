import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { buscarQuadras } from "../../api/quadra";
import { motion } from "framer-motion";
import quadraCoberta from "../../assets/Quadra coberta.jpg";
import quadraDescoberta from "../../assets/Quadra descoberta.jpg";
import campoFutebol from "../../assets/Campo de futebol.jpg";
import quadraAreia1 from "../../assets/Quadra de areia 1.jpg";
import quadraAreia2 from "../../assets/Quadra de areia 2.jpg";
import quadraAreia3 from "../../assets/Quadra de areia 3.jpg";
import pistaAtletismo from "../../assets/Pista de atletismo.jpeg";

// Mapeamento de imagens
const quadraImages = {
    "Quadra Coberta": quadraCoberta,
    "Quadra Descoberta": quadraDescoberta,
    "Campo de Futebol": campoFutebol,
    "Quadra de Areia 1": quadraAreia1,
    "Quadra de Areia 2": quadraAreia2,
    "Quadra de Areia 3": quadraAreia3,
    "Pista de Atletismo": pistaAtletismo,
};

// Estilização do carrossel
const CarouselContainer = styled.div`
    position: relative;
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    overflow: hidden;
`;

const CardsWrapper = styled.div`
    display: flex;
    transition: transform 0.5s ease;
`;

const Card = styled(motion.div)`
    flex: 0 0 33.33%;
    max-width: 300px;
    height: 200px;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    background-color: #003a7b;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    padding: 10px;
    margin: 10px;
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
`;

const ArrowButton = styled.button`
    position: absolute;
    top: 50%;
    ${({ direction }) =>
        direction === "left" ? "left: 10px;" : "right: 10px;"}
    background-color: rgba(0, 0, 0, 0.5);
    border: none;
    color: white;
    font-size: 2rem;
    padding: 10px;
    cursor: pointer;
    transform: translateY(-50%);
    z-index: 1;
`;

// Componente principal
function CarrosselQuadra({ onQuadraSelect }) {
    const [quadras, setQuadras] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [selectedQuadra, setSelectedQuadra] = useState(null);

    useEffect(() => {
        const carregarQuadras = async () => {
            try {
                const quadrasData = await buscarQuadras();
                const formattedQuadras = quadrasData.map((quadra) => ({
                    id: quadra.id,
                    name: quadra.nome,
                    image: quadraImages[quadra.nome] || null,
                }));
                setQuadras(formattedQuadras);
            } catch (error) {
                console.error("Erro ao carregar quadras:", error.message);
            }
        };
        carregarQuadras();
    }, []);

    const moveCarousel = (direction) => {
        const numberOfItemsToMove = 3;
        setCurrentIndex((prevIndex) => {
            if (direction === "next") {
                return (prevIndex + numberOfItemsToMove) % quadras.length;
            } else {
                return prevIndex === 0
                    ? quadras.length - numberOfItemsToMove
                    : prevIndex - numberOfItemsToMove;
            }
        });
    };

    const handleCardSelect = (id) => {
        setSelectedQuadra(selectedQuadra === id ? null : id);
        onQuadraSelect(id);
    };

    return (
        <CarouselContainer>
            <ArrowButton direction="left" onClick={() => moveCarousel("prev")}>
                &lt;
            </ArrowButton>
            <CardsWrapper
                style={{
                    transform: `translateX(-${
                        currentIndex * (100 / quadras.length)
                    }%)`,
                }}
            >
                {quadras.map((quadra) => (
                    <Card
                        key={quadra.id}
                        selected={quadra.id === selectedQuadra}
                        onClick={() => handleCardSelect(quadra.id)}
                    >
                        <img
                            src={quadra.image || "/path/to/default-image.jpg"}
                            alt={quadra.name}
                        />
                        <p>{quadra.name}</p>
                    </Card>
                ))}
            </CardsWrapper>
            <ArrowButton direction="right" onClick={() => moveCarousel("next")}>
                &gt;
            </ArrowButton>
        </CarouselContainer>
    );
}

export default CarrosselQuadra;
