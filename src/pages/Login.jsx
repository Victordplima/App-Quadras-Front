import React from 'react';
import styled from 'styled-components';
import logo from '../assets/Logo 1.png';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background: rgb(84,41,125);
  background: linear-gradient(127deg, rgba(84,41,125,1) 0%, rgba(19,33,91,1) 47%, rgba(1,105,126,1) 100%);
  
  @media (max-width: 768px) {
    padding: 20px;
  }
`;

const Logo = styled.img`
  width: 350px;
  margin-bottom: 80px;

  @media (max-width: 768px) {
    width: 320px;
  }
`;

const LoginBox = styled.div`
  background-color: rgba(0, 0, 0, 0.6);
  padding: 60px 30px;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  text-align: center;
  width: 100%;
  max-width: 400px;
  min-height: 400px;

  @media (max-width: 768px) {
    padding: 40px 20px;
    min-height: 300px;
  }
`;

const Title = styled.h2`
  color: white;
  margin-bottom: 40px;
  font-size: 32px;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px;
  margin-bottom: 35px;
  border: none;
  border-radius: 8px;
  background-color: #f3f3f3;
`;

const Button = styled.button`
  width: 100%;
  padding: 12px;
  background-color: #009fe3;
  border: none;
  border-radius: 8px;
  color: white;
  font-weight: bold;
  cursor: pointer;
  margin-top: 35px;
  margin-bottom: 30px;
  font-size: 18px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #007bbd;
  }
`;


const ForgotPassword = styled.a`
  color: white;
  font-size: 0.9rem;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

const Login = () => {
  return (
    <Container>
      <Logo src={logo} alt="Logo Faminas" />
      <LoginBox>
        <Title>Agendamento de Quadras</Title>
        <Input type="text" placeholder="E-mail" />
        <Input type="password" placeholder="Senha" />
        <Button>Acessar</Button>
        <ForgotPassword href="#">Esqueci minha senha</ForgotPassword>
      </LoginBox>
    </Container>
  );
};

export default Login;
