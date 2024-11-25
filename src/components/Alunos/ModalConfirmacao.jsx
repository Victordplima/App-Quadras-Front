import React from "react";
import styled from "styled-components";

const ModalConfirmacao = ({ reserva, onClose }) => {
    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    const handleConfirmarCancelamento = () => {
        console.log(`Reserva cancelada: ${reserva.id}`);
        onClose();
    };

    return (
        <ModalOverlay onClick={handleOverlayClick}>
            <ModalContent>
                <h3>Tem certeza que deseja cancelar?</h3>
                <p>Quadra: {reserva.quadra_nome}</p>
                <p>Data e Hora: {reserva.data_agendada}</p>
                <Buttons>
                    <ButtonCancelar onClick={onClose}>Cancelar</ButtonCancelar>
                    <ButtonConfirmar onClick={handleConfirmarCancelamento}>
                        Confirmar
                    </ButtonConfirmar>
                </Buttons>
            </ModalContent>
        </ModalOverlay>
    );
};

const ModalOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000; /* Garante que o modal fique acima de todos os elementos */
`;

const ModalContent = styled.div`
    background-color: white;
    color: black;
    padding: 30px;
    border-radius: 8px;
    text-align: center;
    max-width: 400px;
    width: 90%;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
`;

const Buttons = styled.div`
    display: flex;
    justify-content: space-around;
    margin-top: 20px;
`;

const ButtonCancelar = styled.button`
    background-color: #ccc;
    color: black;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-weight: bold;

    &:hover {
        background-color: #bbb;
    }
`;

const ButtonConfirmar = styled.button`
    background-color: #ff4c4c;
    color: black;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-weight: bold;

    &:hover {
        background-color: #e04343;
    }
`;

export default ModalConfirmacao;
