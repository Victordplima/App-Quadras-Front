import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const TableContainer = styled.div`
  margin-top: 30px;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const Th = styled.th`
  padding: 10px;
  border-bottom: 1px solid #ddd;
  background-color: #181444;
  color: white;
`;

const Td = styled.td`
  padding: 10px;
  border-bottom: 1px solid #ddd;
  text-align: center;
`;

const Row = styled.tr`
  &:hover {
    background-color: #f1f1f1;
  }
`;

function TabelaAgendamentos() {
    const [agendamentos, setAgendamentos] = useState([]);

    useEffect(() => {
        const mockData = [
            {
                matricula: '1-22-11111',
                nomeAluno: 'Manoel Gomes',
                espaco: 'Quadra Fechada',
                horarioUso: '13:00 - 14:00',
                dataHoraPedido: '27/08 22:35',
                status: 'Confirmado',
            },
            {
                matricula: '1-22-11112',
                nomeAluno: 'João da Silva',
                espaco: 'Campo de Futebol',
                horarioUso: '14:00 - 15:00',
                dataHoraPedido: '27/08 23:00',
                status: 'Aguardando Confirmação',
            },
            {
                matricula: '1-22-11113',
                nomeAluno: 'Maria Souza',
                espaco: 'Quadra Aberta',
                horarioUso: '15:00 - 16:00',
                dataHoraPedido: '28/08 09:15',
                status: 'Cancelado',
            },
        ];
        setTimeout(() => {
            setAgendamentos(mockData);
        }, 1000); // Simula um atraso de 1 segundo
    }, []);

    return (
        <TableContainer>
            <Table>
                <thead>
                    <tr>
                        <Th>Matrícula</Th>
                        <Th>Nome do Aluno</Th>
                        <Th>Espaço</Th>
                        <Th>Horário de uso</Th>
                        <Th>Data/hora do pedido</Th>
                        <Th>Status</Th>
                    </tr>
                </thead>
                <tbody>
                    {agendamentos.length > 0 ? (
                        agendamentos.map((agendamento, index) => (
                            <Row key={index}>
                                <Td>{agendamento.matricula}</Td>
                                <Td>{agendamento.nomeAluno}</Td>
                                <Td>{agendamento.espaco}</Td>
                                <Td>{agendamento.horarioUso}</Td>
                                <Td>{agendamento.dataHoraPedido}</Td>
                                <Td>{agendamento.status}</Td>
                            </Row>
                        ))
                    ) : (
                        <Row>
                            <Td colSpan="6">Carregando agendamentos...</Td>
                        </Row>
                    )}
                </tbody>
            </Table>
        </TableContainer>
    );
}

export default TabelaAgendamentos;
