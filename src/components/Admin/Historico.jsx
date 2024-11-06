import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faClock,
    faCalendarAlt,
    faFutbol,
} from "@fortawesome/free-solid-svg-icons";
import { buscarHistoricoDoUsuario } from "../../api/usuario";

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
    width: 200px;
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

// Função que define as cores conforme o status
const getStatusColor = (status) => {
    switch (status) {
        case "Confirmado":
            return "#90ee90"; // Verde claro
        case "Cancelado":
            return "#d3d3d3"; // Cinza claro
        case "Rejeitado":
            return "#ffcccb"; // Vermelho claro
        case "Aguardando":
            return "#ffe5b4"; // Amarelo claro
        case "Aula":
            return "#add8e6"; // Azul claro
        default:
            return "#fff";
    }
};

// Função que define a cor do tag de status
const getStatusTagColor = (status) => {
    switch (status) {
        case "Confirmado":
            return "#28a745"; // Verde
        case "Cancelado":
            return "#6c757d"; // Cinza escuro
        case "Rejeitado":
            return "#dc3545"; // Vermelho
        case "Aguardando":
            return "#ffc107"; // Amarelo
        case "Aula":
            return "#007bff"; // Azul
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
                console.log(historico);
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
            quadraFilter === "" || agendamento.quadra_id === quadraFilter;
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
                    <option value="3474b0af-dd89-445c-be7d-fe6e1f85a913">
                        Quadra coberta
                    </option>
                    <option value="4151eb9f-89d2-491d-815a-f9a0f106c9ed">
                        Quadra de areia 1
                    </option>
                    <option value="1db2cb93-79ef-4599-a580-256932a98bb8">
                        Quadra 3
                    </option>
                </FiltroSelect>

                <FiltroSelect
                    onChange={(e) => setStatusFilter(e.target.value)}
                    value={statusFilter}
                >
                    <option value="">Todos os Status</option>
                    <option value="Confirmado">Confirmado</option>
                    <option value="Cancelado">Cancelado</option>
                    <option value="Rejeitado">Rejeitado</option>
                    <option value="Aguardando">Aguardando</option>
                    <option value="Aula">Aula</option>
                </FiltroSelect>
            </FiltroContainer>

            {loading ? (
                <p>Carregando histórico...</p>
            ) : (
                <CardContainer>
                    {filteredAgendamentos.map((agendamento) => (
                        <Card key={agendamento.id} status={agendamento.status}>
                            <div>
                                <strong>{agendamento.quadra_id}</strong>
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
