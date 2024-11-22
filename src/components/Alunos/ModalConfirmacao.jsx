import React from "react";
import styled from "styled-components";

const ModalConfirmacao = ({ reserva, onClose }) => {
    const handleConfirmarCancelamento = () => {
        // Lógica para cancelar a reserva (pode fazer uma requisição para a API)
        console.log(`Reserva cancelada: ${reserva.id}`);
        onClose();
    };

    return (
        <ModalOverlay>
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
`;

const ModalContent = styled.div`
    background-color: white;
    padding: 20px;
    border-radius: 8px;
    text-align: center;
`;

const Buttons = styled.div`
    display: flex;
    justify-content: space-around;
    margin-top: 20px;
`;

const ButtonCancelar = styled.button`
    background-color: #ccc;
    color: white;
    padding: 10px;
    border-radius: 5px;
    cursor: pointer;
`;

const ButtonConfirmar = styled.button`
    background-color: #ff4c4c;
    color: white;
    padding: 10px;
    border-radius: 5px;
    cursor: pointer;
`;

export default ModalConfirmacao;
