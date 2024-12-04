import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { buscarBloqueioPorUsuario } from "../../api/bloqueio";
import ModalBloqueio from "./ModalBloqueio";
import ModalEditarBloqueio from "./ModalEditarBloqueio";

const Container = styled.div`
    width: 100%;
    max-width: 800px;
    margin: 20px auto;
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding: 0 15px;
`;

const StatusBloqueio = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 20px;
    border-radius: 8px;
    background-color: ${({ ativo }) => (ativo ? "#f8d7da" : "#d4edda")};
    color: ${({ ativo }) => (ativo ? "#721c24" : "#155724")};
    font-size: 18px;
    font-weight: bold;
    text-align: center;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const BotaoContainer = styled.div`
    display: flex;
    justify-content: center;
    gap: 20px;
`;

const Botao = styled.button`
    padding: 10px 20px;
    border-radius: 8px;
    background-color: #007bff;
    color: white;
    font-size: 16px;
    border: none;
    cursor: pointer;
    transition: background-color 0.3s;

    &:hover {
        background-color: #0056b3;
    }
`;

const HistoricoContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-top: 20px;
`;

const BloqueioItem = styled.div`
    background-color: #f0f0f0;
    border: 1px solid #ddd;
    padding: 15px;
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    gap: 6px;
`;

const EditarBotao = styled.button`
    padding: 8px 16px;
    background-color: #1e99c0;
    color: white;
    font-size: 14px;
    border: none;
    border-radius: 4px;
    cursor: pointer;

    &:hover {
        background-color: #181444;
    }
`;

const Bloqueios = ({ userId }) => {
    const [bloqueioAtivo, setBloqueioAtivo] = useState(null);
    const [historicoBloqueios, setHistoricoBloqueios] = useState([]);
    const [mostrarModalEditar, setMostrarModalEditar] = useState(false);
    const [mostrarModalCriar, setMostrarModalCriar] = useState(false);
    const [novoBloqueio, setNovoBloqueio] = useState({
        motivo: "",
        descricao: "",
        periodo_inicio: "",
        periodo_fim: "",
    });

    useEffect(() => {
        const fetchBloqueios = async () => {
            try {
                const resposta = await buscarBloqueioPorUsuario(userId, 1);
                if (Array.isArray(resposta) && resposta.length > 0) {
                    const bloqueios = resposta;
                    setBloqueioAtivo(bloqueios[0]);
                    setHistoricoBloqueios(bloqueios);
                } else {
                    setBloqueioAtivo(null);
                    setHistoricoBloqueios([]);
                }
            } catch (error) {
                console.error("Erro ao carregar bloqueios", error);
            }
        };

        fetchBloqueios();
    }, [userId]);

    const formatarData = (data) => {
        const options = {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
        };
        const date = new Date(data);
        return date.toLocaleString("pt-BR", options).replace(",", "");
    };

    const calcularTempoRestante = (dataFim) => {
        const agora = new Date();
        const tempoRestante = new Date(dataFim) - agora;

        if (tempoRestante <= 0) return null;

        const dias = Math.floor(tempoRestante / (1000 * 60 * 60 * 24));
        const horas = Math.floor((tempoRestante / (1000 * 60 * 60)) % 24);
        const minutos = Math.floor((tempoRestante / (1000 * 60)) % 60);

        return `${dias}d ${horas}h ${minutos}m`;
    };

    const handleChange = (e) => {
        setNovoBloqueio({
            ...novoBloqueio,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmitCriar = (e) => {
        e.preventDefault();
        console.log("Criar Bloqueio com dados: ", novoBloqueio);
        setMostrarModalCriar(false);
    };

    const handleSubmitEditar = (e) => {
        e.preventDefault();
        console.log("Editar Bloqueio com dados: ", novoBloqueio);
        setMostrarModalEditar(false);
    };

    // Função chamada ao clicar no botão de editar
    const handleEditarBloqueio = (bloqueio) => {
        setNovoBloqueio(bloqueio); // Define o bloqueio a ser editado no estado
        setMostrarModalEditar(true); // Exibe o modal de edição
    };

    return (
        <Container>
            <StatusBloqueio ativo={!!bloqueioAtivo}>
                {bloqueioAtivo ? (
                    <>
                        Bloqueio ativo: <br />
                        <strong>
                            {calcularTempoRestante(bloqueioAtivo.periodo_fim)}
                        </strong>{" "}
                        restantes
                        <br />
                        Motivo: {bloqueioAtivo.motivo}
                    </>
                ) : (
                    <>Você não possui bloqueios ativos.</>
                )}
            </StatusBloqueio>

            <BotaoContainer>
                <Botao onClick={() => setMostrarModalCriar(true)}>
                    Criar Bloqueio
                </Botao>
            </BotaoContainer>

            <HistoricoContainer>
                <h3>Histórico de Bloqueios</h3>
                {historicoBloqueios.map((bloqueio) => (
                    <BloqueioItem key={bloqueio.id}>
                        <strong>Motivo:</strong> {bloqueio.motivo}
                        <strong>Descrição:</strong> {bloqueio.descricao}
                        <strong>Período:</strong>{" "}
                        {formatarData(bloqueio.periodo_inicio)} -{" "}
                        {formatarData(bloqueio.periodo_fim)}
                        <EditarBotao
                            onClick={() => handleEditarBloqueio(bloqueio)}
                        >
                            Editar
                        </EditarBotao>
                    </BloqueioItem>
                ))}
            </HistoricoContainer>

            {mostrarModalCriar && (
                <ModalBloqueio
                    title="Criar Bloqueio"
                    onClose={() => setMostrarModalCriar(false)}
                    onSubmit={handleSubmitCriar}
                    bloqueioData={novoBloqueio}
                    handleChange={handleChange}
                    usuarioId={userId}
                />
            )}

            {mostrarModalEditar && (
                <ModalEditarBloqueio
                    title="Editar Bloqueio"
                    onClose={() => setMostrarModalEditar(false)}
                    onSubmit={handleSubmitEditar}
                    bloqueioData={novoBloqueio}
                    handleChange={handleChange}
                />
            )}
        </Container>
    );
};

export default Bloqueios;
