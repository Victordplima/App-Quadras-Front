import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom"; // Usaremos para navegação entre as telas

const Container = styled.div`
    padding: 20px;
    display: flex;
    flex-direction: column;
    gap: 20px;
`;

const Title = styled.h1`
    font-size: 1.5rem;
    color: #003a7b;
`;

const Subtitle = styled.h3`
    font-size: 1.2rem;
    color: #555;
`;

const CheckWrapper = styled.div`
    display: flex;
    gap: 20px;
    margin-top: 10px;
`;

const TextArea = styled.textarea`
    padding: 10px;
    margin-top: 10px;
    font-size: 1rem;
    border: 1px solid #ccc;
    border-radius: 8px;
    resize: vertical;
    min-height: 100px;
`;

const Button = styled.button`
    padding: 10px 20px;
    background-color: #003a7b;
    color: white;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    font-size: 1rem;
    transition: background-color 0.3s;

    &:hover {
        background-color: #00286d;
    }
`;

const VerificacaoTela = ({ reserva }) => {
    const [status, setStatus] = useState("");
    const [problema, setProblema] = useState("");
    const navigate = useNavigate();

    const handleStatusChange = (e) => {
        setStatus(e.target.value);
    };

    const handleProblemaChange = (e) => {
        setProblema(e.target.value);
    };

    const handleSubmit = () => {
        // Aqui você pode fazer algo com os dados, como enviar para a API ou salvar em um estado global
        console.log("Status: ", status);
        console.log("Problema: ", problema);

        // Após salvar/usar as informações, podemos redirecionar o usuário
        navigate("/home"); // Redireciona para a tela principal (ou outra tela desejada)
    };

    return (
        <Container>
            <Title>
                A {reserva.quadra_nome}, foi utilizada corretamente pelo(a){" "}
                {reserva.usuario_nome} entre as {reserva.hora_inicio} e{" "}
                {reserva.hora_fim}?
            </Title>

            <Subtitle>Escolha uma opção:</Subtitle>
            <CheckWrapper>
                <label>
                    <input
                        type="radio"
                        value="Sim, foi utilizada corretamente."
                        checked={status === "Sim, foi utilizada corretamente."}
                        onChange={handleStatusChange}
                    />
                    Sim, foi utilizada corretamente.
                </label>
                <label>
                    <input
                        type="radio"
                        value="Foi utilizada, porém, incorretamente."
                        checked={
                            status === "Foi utilizada, porém, incorretamente."
                        }
                        onChange={handleStatusChange}
                    />
                    Foi utilizada, porém, incorretamente.
                </label>
                <label>
                    <input
                        type="radio"
                        value="Não foi utilizada"
                        checked={status === "Não foi utilizada"}
                        onChange={handleStatusChange}
                    />
                    Não foi utilizada
                </label>
            </CheckWrapper>

            <Subtitle>Relate algum problema (opcional):</Subtitle>
            <TextArea
                placeholder={`Descreva o problema com o(a) ${reserva.usuario_nome}`}
                value={problema}
                onChange={handleProblemaChange}
            />

            <Button onClick={handleSubmit}>Enviar Relatório</Button>
        </Container>
    );
};

export default VerificacaoTela;
