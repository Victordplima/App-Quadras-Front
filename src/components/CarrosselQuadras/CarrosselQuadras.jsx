import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { buscarQuadras } from "../../api/quadra";
import QuadraCard from "./QuadraCard";
import quadraCoberta from "../../assets/Quadra coberta.jpg";
import quadraDescoberta from "../../assets/Quadra descoberta.jpg";
import campoFutebol from "../../assets/Campo de futebol.jpg";
import quadraAreia1 from "../../assets/Quadra de areia 1.jpg";
import quadraAreia2 from "../../assets/Quadra de areia 2.jpg";
import quadraAreia3 from "../../assets/Quadra de areia 3.jpg";
import pistaAtletismo from "../../assets/Pista de atletismo.jpeg";

// Mapeamento de imagens com base no nome da quadra
const quadraImages = {
    "Quadra Coberta": quadraCoberta,
    "Quadra Descoberta": quadraDescoberta,
    "Campo de Futebol": campoFutebol,
    "Quadra de Areia 1": quadraAreia1,
    "Quadra de Areia 2": quadraAreia2,
    "Quadra de Areia 3": quadraAreia3,
    "Pista de Atletismo": pistaAtletismo,
};

const LoadingMessage = styled.div`
    text-align: center;
    font-size: 1.2rem;
    color: #555;
    margin-top: 20px;
`;

const ErrorMessage = styled.div`
    text-align: center;
    font-size: 1.2rem;
    color: red;
    margin-top: 20px;
`;

const CarouselContainer = styled.div`
    position: relative;
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    overflow: hidden;
    display: flex;
    justify-content: center; // Centraliza o carrossel
`;

const CardsWrapper = styled.div`
    display: flex;
    transition: transform 0.3s ease;
`;

const CardWrapper = styled.div`
    flex: 0 0 33.33%; /* Exibe 3 quadras por vez */
    padding: 10px;
    display: flex;
    justify-content: center; // Alinhado à esquerda dentro de cada card
`;

const ArrowButton = styled.button`
    position: absolute;
    top: 50%;
    ${({ direction }) => (direction === "left" ? "left: 0px;" : "right: 0px;")}
    background-color: rgba(0, 0, 0, 0.3);
    border: none;
    color: white;
    font-size: 2rem;
    padding: 10px;
    cursor: pointer;
    transform: translateY(-50%);
    z-index: 1;
`;

function CarrosselQuadra({ onQuadraSelect }) {
    const [quadras, setQuadras] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [cardsToShow, setCardsToShow] = useState(3); // Começando com 3 quadras visíveis
    const [selectedQuadra, setSelectedQuadra] = useState(null);

    useEffect(() => {
        const carregarQuadras = async () => {
            try {
                setLoading(true);
                const quadrasData = await buscarQuadras();
                setQuadras(quadrasData);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        carregarQuadras();
    }, []);

    const handleNext = () => {
        setCurrentIndex((prevIndex) => {
            const maxIndex = Math.max(0, quadras.length - cardsToShow);
            return prevIndex + 1 > maxIndex ? 0 : prevIndex + 1;
        });
    };

    const handlePrev = () => {
        setCurrentIndex((prevIndex) => {
            const maxIndex = Math.max(0, quadras.length - cardsToShow);
            return prevIndex - 1 < 0 ? maxIndex : prevIndex - 1;
        });
    };

    const handleCardSelect = (id) => {
        setSelectedQuadra(id === selectedQuadra ? null : id); // Alterna a seleção
        onQuadraSelect(id);
    };

    useEffect(() => {
        const updateCardsToShow = () => {
            if (window.innerWidth < 480) {
                setCardsToShow(1); // Exibe 1 quadra em telas pequenas
            } else if (window.innerWidth < 768) {
                setCardsToShow(2); // Exibe 2 quadras em telas médias
            } else {
                setCardsToShow(3); // Exibe 3 quadras por vez em telas grandes
            }
        };

        window.addEventListener("resize", updateCardsToShow);
        updateCardsToShow();

        return () => window.removeEventListener("resize", updateCardsToShow);
    }, []);

    if (loading) {
        return <LoadingMessage>Carregando quadras...</LoadingMessage>;
    }

    if (error) {
        return <ErrorMessage>Erro: {error}</ErrorMessage>;
    }

    return (
        <CarouselContainer>
            <ArrowButton direction="left" onClick={handlePrev}>
                &lt;
            </ArrowButton>
            <CardsWrapper
                style={{
                    transform: `translateX(-${
                        (currentIndex * 100) / cardsToShow
                    }%)`, // Ajuste no cálculo do deslocamento
                }}
            >
                {quadras.map((quadra) => (
                    <CardWrapper key={quadra.id}>
                        <QuadraCard
                            image={quadraImages[quadra.nome]}
                            name={quadra.nome}
                            isSelected={quadra.id === selectedQuadra}
                            onClick={() => handleCardSelect(quadra.id)}
                        />
                    </CardWrapper>
                ))}
            </CardsWrapper>
            <ArrowButton direction="right" onClick={handleNext}>
                &gt;
            </ArrowButton>
        </CarouselContainer>
    );
}

export default CarrosselQuadra;
