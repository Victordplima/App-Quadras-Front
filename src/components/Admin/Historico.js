import React, { useState } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faCalendarAlt, faFutbol } from '@fortawesome/free-solid-svg-icons';

// Container do histórico
const HistoricoBox = styled.div`
  margin-top: 30px;
  width: 100%;
  max-width: 1000px;
  margin-left: auto;
  margin-right: auto;
`;

// Título do histórico
const HistoricoTitle = styled.h3`
  color: #333;
  margin-bottom: 20px;
  text-align: center;
  font-size: 24px;
`;

// Estilo dos cards
const Card = styled.div`
  background-color: ${({ status }) => getStatusColor(status)};
  border-radius: 8px;
  padding: 20px;
  margin: 10px;
  width: 200px;
  color: #333;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

// Container dos cards
const CardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
`;

// Estilo para o status
const StatusTag = styled.span`
  background-color: ${({ status }) => getStatusTagColor(status)};
  padding: 5px 10px;
  border-radius: 5px;
  color: white;
  font-weight: bold;
  text-align: center;
  margin-top: 10px;
  align-self: flex-start;
`;

// Estilo dos filtros
const FiltroContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const FiltroSelect = styled.select`
  padding: 10px;
  font-size: 16px;
  margin: 0 10px;
`;

// Estilo para os detalhes do agendamento
const DetailRow = styled.div`
  display: flex;
  align-items: center;
  margin: 5px 0;
  font-size: 14px;

  svg {
    margin-right: 8px;
  }
`;

// Dados de exemplo
const agendamentosMock = [
    { id: 1, quadra: 'Quadra coberta', horario: '13:00 - 14:00', data: '12/10/2024', esporte: 'Futebol', status: 'Confirmado' },
    { id: 2, quadra: 'Quadra de areia 1', horario: '15:00 - 16:00', data: '12/10/2024', esporte: 'Beach tennis', status: 'Rejeitado' },
    { id: 3, quadra: 'Quadra coberta', horario: '13:00 - 14:00', data: '12/10/2024', esporte: 'Futebol', status: 'Aguardando' },
    { id: 4, quadra: 'Quadra coberta', horario: '13:00 - 14:00', data: '12/10/2024', esporte: 'Futebol', status: 'Cancelado' },
    { id: 5, quadra: 'Quadra coberta', horario: '13:00 - 14:00', data: '12/10/2024', esporte: 'Futebol', status: 'Aula' },
    { id: 6, quadra: 'Quadra coberta', horario: '13:00 - 14:00', data: '12/10/2024', esporte: 'Futebol', status: 'Aula' },
    { id: 7, quadra: 'Quadra coberta', horario: '13:00 - 14:00', data: '12/10/2024', esporte: 'Futebol', status: 'Aula' },
    { id: 8, quadra: 'Quadra coberta', horario: '13:00 - 14:00', data: '12/10/2024', esporte: 'Futebol', status: 'Aula' },
    { id: 9, quadra: 'Quadra coberta', horario: '13:00 - 14:00', data: '12/10/2024', esporte: 'Futebol', status: 'Aula' },
    { id: 10, quadra: 'Quadra coberta', horario: '13:00 - 14:00', data: '12/10/2024', esporte: 'Futebol', status: 'Aula' },
];

// Função que define as cores conforme o status
const getStatusColor = (status) => {
    switch (status) {
        case 'Confirmado':
            return '#90ee90'; // Verde claro
        case 'Cancelado':
            return '#d3d3d3'; // Cinza claro
        case 'Rejeitado':
            return '#ffcccb'; // Vermelho claro
        case 'Aguardando':
            return '#ffe5b4'; // Amarelo claro
        case 'Aula':
            return '#add8e6'; // Azul claro
        default:
            return '#fff';
    }
};

// Função que define a cor do tag de status
const getStatusTagColor = (status) => {
    switch (status) {
        case 'Confirmado':
            return '#28a745'; // Verde
        case 'Cancelado':
            return '#6c757d'; // Cinza escuro
        case 'Rejeitado':
            return '#dc3545'; // Vermelho
        case 'Aguardando':
            return '#ffc107'; // Amarelo
        case 'Aula':
            return '#007bff'; // Azul
        default:
            return '#fff';
    }
};

const Historico = () => {
    const [quadraFilter, setQuadraFilter] = useState('');
    const [statusFilter, setStatusFilter] = useState('');

    const filteredAgendamentos = agendamentosMock.filter((agendamento) => {
        const matchesQuadra = quadraFilter === '' || agendamento.quadra === quadraFilter;
        const matchesStatus = statusFilter === '' || agendamento.status === statusFilter;
        return matchesQuadra && matchesStatus;
    });

    return (
        <HistoricoBox>
            <HistoricoTitle>Histórico de Agendamentos</HistoricoTitle>

            <FiltroContainer>
                <FiltroSelect onChange={(e) => setQuadraFilter(e.target.value)} value={quadraFilter}>
                    <option value="">Todas as Quadras</option>
                    <option value="Quadra coberta">Quadra coberta</option>
                    <option value="Quadra de areia 1">Quadra de areia 1</option>
                </FiltroSelect>

                <FiltroSelect onChange={(e) => setStatusFilter(e.target.value)} value={statusFilter}>
                    <option value="">Todos os Status</option>
                    <option value="Confirmado">Confirmado</option>
                    <option value="Cancelado">Cancelado</option>
                    <option value="Rejeitado">Rejeitado</option>
                    <option value="Aguardando">Aguardando</option>
                    <option value="Aula">Aula</option>
                </FiltroSelect>
            </FiltroContainer>

            <CardContainer>
                {filteredAgendamentos.map((agendamento) => (
                    <Card key={agendamento.id} status={agendamento.status}>
                        <div>
                            <strong>{agendamento.quadra}</strong>
                        </div>
                        <DetailRow>
                            <FontAwesomeIcon icon={faClock} />
                            {agendamento.horario}
                        </DetailRow>
                        <DetailRow>
                            <FontAwesomeIcon icon={faCalendarAlt} />
                            {agendamento.data}
                        </DetailRow>
                        <DetailRow>
                            <FontAwesomeIcon icon={faFutbol} />
                            {agendamento.esporte}
                        </DetailRow>
                        <StatusTag status={agendamento.status}>{agendamento.status}</StatusTag>
                    </Card>
                ))}
            </CardContainer>
        </HistoricoBox>
    );
};

export default Historico;
