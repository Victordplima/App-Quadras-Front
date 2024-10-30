import React, { useState } from "react";
import styled from "styled-components";
import logo from "../assets/Logo 1.png";
import { z } from "zod";
import { login as loginRequest } from "../api/usuario";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    background: rgb(84, 41, 125);
    background: linear-gradient(
        127deg,
        rgba(84, 41, 125, 1) 0%,
        rgba(19, 33, 91, 1) 47%,
        rgba(1, 105, 126, 1) 100%
    );

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

    &:disabled {
        background-color: #007bbd;
        cursor: not-allowed;
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
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    // Schema de validação Zod (sem limite de 6 caracteres para a senha)
    const loginSchema = z.object({
        email: z.string().email({ message: "E-mail inválido" }),
        senha: z.string(), // Sem mínimo de caracteres
    });

    const handleLogin = async () => {
        setIsLoading(true); // Ativa o loading
        try {
            // Valida os dados do formulário
            loginSchema.parse({ email, senha });

            // Loga os valores do formulário
            console.log("Dados do formulário:", { email, senha });

            // Chama a função de login do utils/http.js
            const data = await loginRequest(email, senha);

            // Loga a resposta da API
            console.log("Resposta da API:", data);

            // Armazena o token no localStorage
            localStorage.setItem("token", data.token);
            alert("Login realizado com sucesso!");
        } catch (err) {
            if (err instanceof z.ZodError) {
                // Captura erros de validação do Zod
                setError(err.errors[0].message);
            } else {
                // Loga o erro se não for de validação
                console.log("Erro ao fazer login:", err);
                setError(err.message || "Erro desconhecido");
            }
        } finally {
            setIsLoading(false); // Desativa o loading após a tentativa
        }
    };

    return (
        <Container>
            <Logo src={logo} alt="Logo Faminas" />
            <LoginBox>
                <Title>Agendamento de Quadras</Title>
                <Input
                    type="text"
                    placeholder="E-mail"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={isLoading}
                />
                <Input
                    type="password"
                    placeholder="Senha"
                    value={senha}
                    onChange={(e) => setSenha(e.target.value)}
                    disabled={isLoading}
                />
                {error && <p style={{ color: "red" }}>{error}</p>}
                <Button onClick={handleLogin} disabled={isLoading}>
                    {isLoading ? "Carregando..." : "Acessar"}
                </Button>
                <ForgotPassword href="#">Esqueci minha senha</ForgotPassword>
            </LoginBox>
        </Container>
    );
};

export default Login;
