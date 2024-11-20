import React from "react";
import styled from "styled-components";

const Overlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
`;

const ModalContainer = styled.div`
    background-color: white;
    border-radius: 8px;
    width: 90%;
    max-width: 400px;
    padding: 20px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    text-align: center;
    color: black;
`;

const ModalHeader = styled.h2`
    margin-bottom: 1em;
`;

const ModalText = styled.p`
    margin-bottom: 1.5em;
`;

const Button = styled.button`
    background-color: #4caf50;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    &:hover {
        background-color: #45a049;
    }
`;

const ModalConfirmacao = ({ onClose }) => (
    <Overlay>
        <ModalContainer>
            <ModalHeader>Seu horário foi enviado para aprovação!</ModalHeader>
            <ModalText>
                Você pode acompanhar o processo do seu agendamento na tela
                "Agendamentos".
            </ModalText>
            <Button onClick={onClose}>OK</Button>
        </ModalContainer>
    </Overlay>
);

export default ModalConfirmacao;
