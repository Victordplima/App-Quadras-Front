import React, { useState } from 'react';
import styled from 'styled-components';
import Ocorrencia from '../../components/Admin/Ocorrencia';
import Header from '../../components/Admin/Header';
import Filtros from '../../components/Admin/ContainerFIltro';

const Container = styled.div`
  padding: 20px;
  font-family: Arial, sans-serif;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

const ListaOcorrencias = styled.div`
  margin-top: 20px;
`;

const TelaOcorrencias = () => {
    const [ocorrencias, setOcorrencias] = useState([
        { id: 1, titulo: 'Quadra de areia', data: '12/10/2024', descricao: 'Aluno não compareceu no horário marcado', horario: '13:00 - 14:00', imagem: 'https://via.placeholder.com/80' },
        { id: 2, titulo: 'Quadra de areia', data: '11/10/2024', descricao: 'Aluno não compareceu no horário marcado', horario: '14:00 - 15:00', imagem: 'https://via.placeholder.com/80' },
        { id: 3, titulo: 'Quadra de areia', data: '13/10/2024', descricao: 'Aluno não compareceu no horário marcado', horario: '15:00 - 16:00', imagem: 'https://via.placeholder.com/80' },
    ]);

    const [filtro, setFiltro] = useState('recent');

    const ocorrenciasOrdenadas = [...ocorrencias].sort((a, b) => {
        const dataA = new Date(a.data.split('/').reverse().join('-'));
        const dataB = new Date(b.data.split('/').reverse().join('-'));
        return filtro === 'recent' ? dataB - dataA : dataA - dataB;
    });

    const retirarOcorrencia = (id) => {
        setOcorrencias(ocorrencias.filter(ocorrencia => ocorrencia.id !== id));
    };

    return (
        <Container>
            <Header />
            <Filtros setFiltro={setFiltro} />
            <ListaOcorrencias>
                {ocorrenciasOrdenadas.map(ocorrencia => (
                    <Ocorrencia
                        key={ocorrencia.id}
                        titulo={ocorrencia.titulo}
                        data={ocorrencia.data}
                        descricao={ocorrencia.descricao}
                        horario={ocorrencia.horario}
                        imagem={ocorrencia.imagem}
                        onRetirar={() => retirarOcorrencia(ocorrencia.id)}
                    />
                ))}
            </ListaOcorrencias>
        </Container>
    );
};

export default TelaOcorrencias;
