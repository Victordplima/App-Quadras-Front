import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const PaginaParaRedirecionamentosContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f4f4f4;
`;

const NavigationLink = styled(Link)`
  padding: 10px 20px;
  margin: 10px 0;
  text-decoration: none;
  color: white;
  background-color: #181444;
  border-radius: 5px;
  font-size: 18px;

  &:hover {
    background-color: #1e99c0;
  }
`;

const PaginaParaRedirecionamentos = () => {
    return (
        <PaginaParaRedirecionamentosContainer>
            <h1>Redirecionamentos</h1>
            <NavigationLink to="/login">Login</NavigationLink>
            <NavigationLink to="/perfil">Perfil</NavigationLink>
            <NavigationLink to="/ocorrencias">Ocorrências</NavigationLink>
            <NavigationLink to="/gerenciar">Gerenciar Usuários</NavigationLink>
            <NavigationLink to="/agendamentos">Agendamentos</NavigationLink>
        </PaginaParaRedirecionamentosContainer>
    );
};

export default PaginaParaRedirecionamentos;
