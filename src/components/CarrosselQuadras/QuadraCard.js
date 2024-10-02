import React from 'react';
import styled from 'styled-components';

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 10px;
  cursor: pointer;
  background-color: #181444;
  border-radius: 10px;
  width: 100%; /* Adicionando largura total */
  max-width: 300px; /* Largura máxima para o card */
  flex: 1; /* Faz com que o card cresça em espaços disponíveis */
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

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

function QuadraCard({ image, name, onClick }) {
    return (
        <CardContainer onClick={onClick}>
            <QuadraImage src={image} alt={name} />
            <QuadraName>{name}</QuadraName>
        </CardContainer>
    );
}

export default QuadraCard;
