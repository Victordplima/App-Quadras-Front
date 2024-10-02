import React, { useState } from 'react';
import styled from 'styled-components';

const Tabela = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 30px;
`;

const CabecalhoTabela = styled.th`
  padding: 10px;
  background-color: ${({ cor }) => cor || '#f3f3f3'};
  color: white;
  font-weight: bold;
  text-align: center;
  border: 1px solid #ddd;
`;

const CelulaTabela = styled.td`
  padding: 10px;
  text-align: center;
  border: 1px solid #ddd;
  cursor: pointer;
  background-color: ${({ selecionado }) => (selecionado ? '#ffedcc' : 'white')};

  &:hover {
    background-color: #f3f3f3;
  }
`;

const CelulaHora = styled.th`
  padding: 10px;
  background-color: #f3f3f3;
  font-weight: bold;
  text-align: center;
  border: 1px solid #ddd;
`;

const TabelaHorarios = () => {
    const diasDaSemana = ['Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira'];
    const horarios = ['13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00'];

    const [horariosSelecionados, setHorariosSelecionados] = useState({});

    const alternarHorario = (dia, horario) => {
        const chave = `${dia}-${horario}`;
        setHorariosSelecionados((anterior) => ({
            ...anterior,
            [chave]: !anterior[chave],
        }));
    };

    return (
        <Tabela>
            <thead>
                <tr>
                    <CelulaHora></CelulaHora>
                    {diasDaSemana.map((dia) => (
                        <CabecalhoTabela key={dia} cor={dia === 'Segunda-feira' ? '#5cb85c' : dia === 'Terça-feira' ? '#f0ad4e' : dia === 'Quarta-feira' ? '#d9534f' : dia === 'Quinta-feira' ? '#5bc0de' : '#d35400'}>
                            {dia}
                        </CabecalhoTabela>
                    ))}
                </tr>
            </thead>
            <tbody>
                {horarios.map((horario) => (
                    <tr key={horario}>
                        <CelulaHora>{horario}</CelulaHora>
                        {diasDaSemana.map((dia) => (
                            <CelulaTabela
                                key={`${dia}-${horario}`}
                                selecionado={horariosSelecionados[`${dia}-${horario}`]}
                                onClick={() => alternarHorario(dia, horario)}
                            >
                                {horariosSelecionados[`${dia}-${horario}`] ? '✓' : ''}
                            </CelulaTabela>
                        ))}
                    </tr>
                ))}
            </tbody>
        </Tabela>
    );
};

export default TabelaHorarios;
