import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faClock,
    faCalendarAlt,
    faFutbol,
} from "@fortawesome/free-solid-svg-icons";
import { buscarHistoricoDoUsuario } from "../../api/usuario";

// Importação das imagens
import quadraAreia3 from "../../assets/Quadra de areia 3.jpg";
import campoFutebol from "../../assets/Campo de futebol.jpg";
import quadraAreia2 from "../../assets/Quadra de areia 2.jpg";
import quadraCoberta from "../../assets/Quadra coberta.jpg";
import quadraDescoberta from "../../assets/Quadra descoberta.jpg";
import quadraAreia1 from "../../assets/Quadra de areia 1.jpg";
import pistaAtletismo from "../../assets/Pista de atletismo.jpeg";

// Mapeamento das imagens das quadras
const quadraImages = {
    "Quadra de Areia 3": quadraAreia3,
    "Campo de Futebol": campoFutebol,
    "Quadra de Areia 2": quadraAreia2,
    "Quadra Coberta": quadraCoberta,
    "Quadra Descoberta": quadraDescoberta,
    "Quadra de Areia 1": quadraAreia1,
    "Pista de Atletismo": pistaAtletismo,
};

const HistoricoBox = styled.div`
    margin-top: 30px;
    width: 100%;
    max-width: 1000px;
    margin-left: auto;
    margin-right: auto;
`;

const HistoricoTitle = styled.h3`
    color: #333;
    margin-bottom: 20px;
    text-align: center;
    font-size: 24px;
`;

const Card = styled.div`
    background-color: ${({ status }) => getStatusColor(status)};
    border-radius: 8px;
    padding: 20px;
    margin: 10px;
    width: 250px;
    color: #333;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`;

const CardContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
`;

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

const DetailRow = styled.div`
    display: flex;
    align-items: center;
    margin: 5px 0;
    font-size: 14px;

    svg {
        margin-right: 8px;
    }
`;

const Title = styled.h3`
    
`;

const QuadraImage = styled.img`
    width: 100%;
    height: 150px;
    object-fit: cover;
    border-radius: 5px;
    padding-bottom: 10px;
`;

// Função que define as cores conforme o status
const getStatusColor = (status) => {
    switch (status) {
        case "Confirmada":
            return "#90ee90";
        case "Cancelada":
            return "#d3d3d3";
        case "Rejeitada":
            return "#ffcccb";
        case "Aguardando confirmação":
            return "#ffe5b4";
        case "Aula":
            return "#add8e6";
        default:
            return "#fff";
    }
};

// Função que define a cor do tag de status
const getStatusTagColor = (status) => {
    switch (status) {
        case "Confirmada":
            return "#28a745";
        case "Cancelada":
            return "#6c757d";
        case "Rejeitada":
            return "#dc3545";
        case "Aguardando confirmação":
            return "#ffc107";
        case "Aula":
            return "#007bff";
        default:
            return "#fff";
    }
};

const Historico = ({ userId }) => {
    const [quadraFilter, setQuadraFilter] = useState("");
    const [statusFilter, setStatusFilter] = useState("");
    const [agendamentos, setAgendamentos] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchHistorico = async () => {
            try {
                const historico = await buscarHistoricoDoUsuario(userId);
                setAgendamentos(historico.reservas || []);
            } catch (error) {
                console.error("Erro ao carregar histórico do usuário:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchHistorico();
    }, [userId]);

    const filteredAgendamentos = (
        Array.isArray(agendamentos) ? agendamentos : []
    ).filter((agendamento) => {
        const matchesQuadra =
            quadraFilter === "" || agendamento.quadra_nome === quadraFilter;
        const matchesStatus =
            statusFilter === "" || agendamento.status === statusFilter;
        return matchesQuadra && matchesStatus;
    });

    return (
        <HistoricoBox>
            <HistoricoTitle>Histórico de Agendamentos</HistoricoTitle>

            <FiltroContainer>
                <FiltroSelect
                    onChange={(e) => setQuadraFilter(e.target.value)}
                    value={quadraFilter}
                >
                    <option value="">Todas as Quadras</option>
                    {Object.keys(quadraImages).map((quadraNome) => (
                        <option key={quadraNome} value={quadraNome}>
                            {quadraNome}
                        </option>
                    ))}
                </FiltroSelect>

                <FiltroSelect
                    onChange={(e) => setStatusFilter(e.target.value)}
                    value={statusFilter}
                >
                    <option value="">Todos os Status</option>
                    <option value="Confirmada">Confirmada</option>
                    <option value="Cancelada">Cancelada</option>
                    <option value="Rejeitada">Rejeitada</option>
                    <option value="Aguardando confirmação">Aguardando confirmação</option>
                    <option value="Aula">Aula</option>
                </FiltroSelect>
            </FiltroContainer>

            {loading ? (
                <p>Carregando histórico...</p>
            ) : (
                <CardContainer>
                    {filteredAgendamentos.map((agendamento) => (
                        <Card key={agendamento.id} status={agendamento.status}>
                            <QuadraImage
                                src={
                                    quadraImages[agendamento.quadra_nome] ||
                                    "/path/to/default-image.jpg"
                                }
                                alt={agendamento.quadra_nome}
                            />
                            <div>
                                <Title>{agendamento.quadra_nome}</Title>
                            </div>
                            <DetailRow>
                                <FontAwesomeIcon icon={faClock} />
                                {agendamento.hora_inicio} -{" "}
                                {agendamento.hora_fim}
                            </DetailRow>
                            <DetailRow>
                                <FontAwesomeIcon icon={faCalendarAlt} />
                                {new Date(
                                    agendamento.data
                                ).toLocaleDateString()}
                            </DetailRow>
                            <DetailRow>
                                <FontAwesomeIcon icon={faFutbol} />
                                {agendamento.esporte}
                            </DetailRow>
                            <StatusTag status={agendamento.status}>
                                {agendamento.status}
                            </StatusTag>
                        </Card>
                    ))}
                </CardContainer>
            )}
        </HistoricoBox>
    );
};

export default Historico;
