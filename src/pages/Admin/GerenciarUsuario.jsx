import React from "react";
import styled from "styled-components";
import Header from "../../components/Admin/Header";
import FormUsuario from "../../components/Admin/FormUsuario";
import TabelaUsuarios from "../../components/Admin/TabelaUsuarios";

const Container = styled.div`
    padding-top: 80px;
`;

const GerenciarUsuario = () => {
    return (
        <Container>
            <Header />
            <FormUsuario />
            <TabelaUsuarios />
        </Container>
    );
};

export default GerenciarUsuario;
