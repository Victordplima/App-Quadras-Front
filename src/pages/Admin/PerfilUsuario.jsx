import React from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import InfoUsuario from "../../components/Admin/InfoUsuario";
import Historico from "../../components/Admin/Historico";
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

const PerfilUsuario = () => {
    const { userId } = useParams();

    return (
        <Container>
            <Header />
            <InfoUsuario userId={userId} />
            <Historico userId={userId} />
        </Container>
    );
};

export default PerfilUsuario;
