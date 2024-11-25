import React, { useState } from "react";
import styled from "styled-components";
import logo from "../assets/Logo 1.png";
import { z } from "zod";
import { login as loginRequest } from "../api/usuario";
import { useAuth } from "../context/AuthContext"; // Importar o contexto de autenticação
import { useNavigate } from "react-router-dom"; // Para navegação após o login

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
    const { login } = useAuth(); // Usando o contexto de autenticação
    const navigate = useNavigate(); // Para redirecionar após o login

    // Schema de validação Zod (sem limite de 6 caracteres para a senha)
    const loginSchema = z.object({
        email: z.string().email({ message: "E-mail inválido" }),
        senha: z.string(), // Sem mínimo de caracteres
    });

    const handleLogin = async () => {
        setIsLoading(true);
        try {
            loginSchema.parse({ email, senha });

            const data = await loginRequest(email, senha);

            console.log("Resposta da API:", data);

            login(data.usuario, data.token);

            // Redireciona o usuário baseado no seu papel (role)
            if (data.usuario.role === "admin") {
                navigate("/agendamentos"); // Para admins
            } else {
                navigate("/agendar"); // Para alunos e atléticas
            }
        } catch (err) {
            if (err instanceof z.ZodError) {
                setError(err.errors[0].message);
            } else {
                console.log("Erro ao fazer login:", err);
                setError(err.message || "Erro desconhecido");
            }
        } finally {
            setIsLoading(false);
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
