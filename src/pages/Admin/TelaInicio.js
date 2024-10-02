import React from 'react';
import styled from 'styled-components';
import CarouselQuadras from '../../components/CarrosselQuadras/CarrosselQuadras';
import TabelaAgendamentos from '../../components/Admin/TabelaAgendamentos';
import Header from '../../components/Admin/Header';

const Container = styled.div`
  padding: 20px;
  background-color: #f0f0f0;
  min-height: 100vh;
`;

const Title = styled.h1`
  text-align: center;
  color: #333;
`;

const DateCarousel = styled.div`
  display: flex;
  justify-content: space-around;
  margin: 20px 0;
`;

const DateButton = styled.button`
  background-color: #001f3f;
  color: white;
  border: none;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  border-radius: 8px;

  &:hover {
    background-color: #0074D9;
  }
`;

const dates = ['09/09 Seg', '10/09 Ter', '11/09 Qua', '12/09 Qui', '13/09 Sex', '14/09 Sáb', '15/09 Dom'];

function TelaInicioAdmin() {
    return (
        <Container>
            <Header />
            <Title>Selecionar Quadra</Title>
            <CarouselQuadras />

            <Title>Selecionar Data</Title>
            <DateCarousel>
                {dates.map((date, index) => (
                    <DateButton key={index}>{date}</DateButton>
                ))}
            </DateCarousel>

            <TabelaAgendamentos />
        </Container>
    );
}

export default TelaInicioAdmin;
