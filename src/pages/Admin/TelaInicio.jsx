import React from 'react';
import styled from 'styled-components';
import CarouselQuadras from '../../components/CarrosselQuadras/CarrosselQuadras';
import TabelaHorarios from '../../components/Admin/TabelaHorarios';
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

function TelaInicioAdmin() {
    return (
        <Container>
            <Header />
            <Title>Selecionar Quadra</Title>
            <CarouselQuadras />
            <TabelaHorarios/>
            <TabelaAgendamentos />
        </Container>
    );
}

export default TelaInicioAdmin;