import React from 'react';
import styled from 'styled-components';

const ContainerFiltro = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const BotaoFiltro = styled.button`
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  background-color: #044cfb;
  color: white;
  font-weight: bold;
  transition: background-color 0.2s, transform 0.2s;

  &:hover {
    background-color: #033cbb;
    transform: scale(1.05);
  }
`;

const Filtros = ({ setFiltro }) => (
    <ContainerFiltro>
        <BotaoFiltro onClick={() => setFiltro('recent')}>Mais Recentes</BotaoFiltro>
        <BotaoFiltro onClick={() => setFiltro('oldest')}>Mais Antigos</BotaoFiltro>
    </ContainerFiltro>
);

export default Filtros;
