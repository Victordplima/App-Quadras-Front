import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 20px;
`;

const PerfilCard = styled.div`
  flex: 1;
  padding: 20px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-right: 20px;
  height: 100%;
`;

const TotalsCard = styled.div`
  flex: 2;
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
`;

const Card = styled.div`
  flex: 1 1 calc(50% - 20px); // ajusta para tenha 2 cards por linha
  padding: 20px;
  background-color: ${({ bgColor }) => bgColor || 'white'};
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  text-align: center;
  color: white;
`;

const CardTitle = styled.h3`
  font-size: 1.2rem;
  margin-bottom: 10px;
`;

const CardValue = styled.p`
  font-size: 2rem;
  font-weight: bold;
`;

const InfoList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const InfoItem = styled.li`
  margin-bottom: 10px;
  font-size: 1.1rem;
  color: #555;
  padding-top: 20px;

  span {
    font-weight: bold;
    color: #333;
  }
`;

const Nome = styled.h1`
  font-size: 24px;
  font-weight: bold;
  color: black;
  text-align: center;
`

const userData = {
    nome: 'João da Silva',
    email: 'joao.silva@example.com',
    telefone: '(31) 98765-4321',
    matricula: '2021100001',
    totalAgendamentos: 15,
    totalCancelamentos: 3,
    totalRejeitamentos: 2,
    totalOcorrencias: 1,
};

const InfoUsuario = () => {
    return (
        <Container>
            <PerfilCard>
                <InfoList>
                    <InfoItem>
                        <Nome>{userData.nome}</Nome>
                    </InfoItem>
                    <InfoItem>
                        <span>Email:</span> {userData.email}
                    </InfoItem>
                    <InfoItem>
                        <span>Telefone:</span> {userData.telefone}
                    </InfoItem>
                    <InfoItem>
                        <span>Matrícula:</span> {userData.matricula}
                    </InfoItem>
                </InfoList>
            </PerfilCard>

            <TotalsCard>
                <Card bgColor="#4CAF50">
                    <CardTitle>Total de Agendamentos</CardTitle>
                    <CardValue>{userData.totalAgendamentos}</CardValue>
                </Card>
                <Card bgColor="#FF9800">
                    <CardTitle>Total de Cancelamentos</CardTitle>
                    <CardValue>{userData.totalCancelamentos}</CardValue>
                </Card>
                <Card bgColor="#F44336">
                    <CardTitle>Total de Rejeitamentos</CardTitle>
                    <CardValue>{userData.totalRejeitamentos}</CardValue>
                </Card>
                <Card bgColor="#2196F3">
                    <CardTitle>Total de Ocorrências</CardTitle>
                    <CardValue>{userData.totalOcorrencias}</CardValue>
                </Card>
            </TotalsCard>
        </Container>
    );
};

export default InfoUsuario;
