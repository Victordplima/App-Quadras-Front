import React, { useState } from "react";
import styled from "styled-components";
import { useLocation, useNavigate } from "react-router-dom";
import { criarOcorrencia } from "../../api/ocorrencia";
import Header from "../../components/Supervisao/Header";

const Container = styled.div`
    background: linear-gradient(135deg, #50247a, #022660, #00a5aa);
    color: white;
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const Card = styled.div`
    background-color: #131341;
    padding: 30px;
    border-radius: 10px;
    width: 80%;
    max-width: 600px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    text-align: center;
`;

const Title = styled.h1`
    font-size: 1.3rem;
    color: white;
`;

const Subtitle = styled.h3`
    font-size: 1.2rem;
    color: #aaa;
    padding-top: 30px;
`;

const CheckWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
    margin-top: 10px;
    align-items: flex-start;
`;

const CheckLabel = styled.label`
    font-size: 1.2rem;
    display: flex;
    align-items: center;
`;

const CheckInput = styled.input`
    margin-right: 10px;
    width: 25px;
    height: 25px;
`;

const TextArea = styled.textarea`
    padding: 10px;
    margin-top: 10px;
    font-size: 1rem;
    border: 1px solid #ccc;
    border-radius: 8px;
    resize: vertical;
    min-height: 100px;
    width: 100%;
    margin-bottom: 20px;
`;

const Button = styled.button`
    padding: 15px 30px;
    background-color: #009fe3;
    color: white;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    font-size: 1.5rem;
    transition: background-color 0.3s;
    width: 100%;

    &:hover {
        background-color: #00286d;
    }
`;

const VerificacaoTela = () => {
    const { state } = useLocation();
    const reserva = state?.reserva; // Reserva passada pela navegação
    const [status, setStatus] = useState("");
    const [problema, setProblema] = useState("");
    const navigate = useNavigate();

    const handleStatusChange = (e) => {
        setStatus(e.target.value);
    };

    const handleProblemaChange = (e) => {
        setProblema(e.target.value);
    };

    const handleSubmit = async () => {
        if (!reserva?.id) {
            console.error("ID da reserva não encontrado.");
            return;
        }

        const ocorrenciaData = {
            reserva_id: reserva.id, // Usando o campo 'id' da reserva
            utilizacao: status,
            relato: problema || "Nenhum problema relatado.",
        };

        try {
            const result = await criarOcorrencia(ocorrenciaData);
            console.log("Ocorrência criada com sucesso:", result);
            navigate("/supervisao/agendamentos");
        } catch (error) {
            console.error("Erro ao criar a ocorrência:", error);
        }
    };

    if (!reserva) {
        return (
            <Container>
                <Header />
                <Card>
                    <Title>Reserva não encontrada.</Title>
                </Card>
            </Container>
        );
    }

    return (
        <Container>
            <Header />
            <Card>
                <Title>
                    A {reserva.quadra_nome} foi utilizada corretamente pelo(a){" "}
                    <span style={{ color: "#009fe3" }}>
                        {reserva.usuario_nome}
                    </span>{" "}
                    entre as{" "}
                    <span style={{ color: "#009fe3" }}>
                        {reserva.hora_inicio}
                    </span>{" "}
                    e{" "}
                    <span style={{ color: "#009fe3" }}>{reserva.hora_fim}</span>
                    ?
                </Title>

                <Subtitle>Escolha uma opção:</Subtitle>
                <CheckWrapper>
                    <CheckLabel>
                        <CheckInput
                            type="radio"
                            value="Sim, foi utilizada corretamente"
                            checked={
                                status === "Sim, foi utilizada corretamente"
                            }
                            onChange={handleStatusChange}
                        />
                        Sim, foi utilizada corretamente
                    </CheckLabel>
                    <CheckLabel>
                        <CheckInput
                            type="radio"
                            value="Foi utilizada, porém, incorretamente"
                            checked={
                                status ===
                                "Foi utilizada, porém, incorretamente"
                            }
                            onChange={handleStatusChange}
                        />
                        Foi utilizada, porém, incorretamente
                    </CheckLabel>
                    <CheckLabel>
                        <CheckInput
                            type="radio"
                            value="Não foi utilizada"
                            checked={status === "Não foi utilizada"}
                            onChange={handleStatusChange}
                        />
                        Não foi utilizada
                    </CheckLabel>
                </CheckWrapper>

                <Subtitle>Relate algum problema (opcional):</Subtitle>
                <TextArea
                    placeholder={`Descreva o problema com o(a) ${reserva.usuario_nome}`}
                    value={problema}
                    onChange={handleProblemaChange}
                />

                <Button onClick={handleSubmit}>Enviar Relatório</Button>
            </Card>
        </Container>
    );
};

export default VerificacaoTela;
