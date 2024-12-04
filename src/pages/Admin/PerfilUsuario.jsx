import React, { useState } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import InfoUsuario from "../../components/Admin/InfoUsuario";
import Historico from "../../components/Admin/Historico";
import Bloqueios from "../../components/Admin/Bloqueios";
import Header from "../../components/Admin/Header";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    background-color: #f0f0f0;
    align-items: center;
    padding: 80px 40px 40px 40px;
    min-height: 100vh;

    @media (max-width: 768px) {
        padding: 80px 20px 20px 20px;
    }
`;

const TabContainer = styled.div`
    display: flex;
    gap: 16px;
    margin: 20px 0;
`;

const TabButton = styled.button`
    padding: 10px 20px;
    border: none;
    border-bottom: ${({ active }) => (active ? "3px solid #007bff" : "none")};
    background-color: ${({ active }) => (active ? "#e6f0ff" : "#fff")};
    color: ${({ active }) => (active ? "#007bff" : "#333")};
    font-weight: ${({ active }) => (active ? "bold" : "normal")};
    cursor: pointer;
    border-radius: 4px 4px 0 0;

    &:hover {
        background-color: #e6f0ff;
    }
`;

const PerfilUsuario = () => {
    const { userId } = useParams();
    const [abaSelecionada, setAbaSelecionada] = useState("historico");

    return (
        <Container>
            <Header />
            <InfoUsuario userId={userId} />
            <TabContainer>
                <TabButton
                    active={abaSelecionada === "historico"}
                    onClick={() => setAbaSelecionada("historico")}
                >
                    Histórico
                </TabButton>
                <TabButton
                    active={abaSelecionada === "bloqueios"}
                    onClick={() => setAbaSelecionada("bloqueios")}
                >
                    Bloqueios
                </TabButton>
            </TabContainer>
            {abaSelecionada === "historico" && <Historico userId={userId} />}
            {abaSelecionada === "bloqueios" && <Bloqueios userId={userId} />}
        </Container>
    );
};

export default PerfilUsuario;
