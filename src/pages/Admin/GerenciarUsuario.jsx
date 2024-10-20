import React from "react";
import styled from "styled-components";
import Header from "../../components/Admin/Header";
import FormUsuario from "../../components/Admin/FormUsuario";
const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: #f0f0f0;
  align-items: center;
  padding: 80px 40px 40px 40px;
  min-height: 100vh;

  @media (max-width: 768px) {
    padding: 80px 20px 20px 20px;
  }
`;
const GerenciarUsuario = () => {
  return (
    <Container>
      <Header />
      <FormUsuario />
    </Container>
  );
};

export default GerenciarUsuario;
