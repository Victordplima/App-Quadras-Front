import React from "react";
import styled from "styled-components";
import { criarReserva } from "../../../api/reserva";
import { toast } from "react-toastify";

const ModalWrapper = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    background: rgba(0, 0, 0, 0.5);
    z-index: 1000;
    padding: 20px;
`;

const ModalBox = styled.div`
    background: white;
    padding: 30px;
    border-radius: 8px;
    width: 400px;
    text-align: center;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const ModalTitle = styled.h2`
    margin-bottom: 20px;
    font-size: 24px;
    font-weight: bold;
`;

const ModalText = styled.p`
    margin-bottom: 30px;
    font-size: 16px;
    color: #333;
`;

const Button = styled.button`
    background-color: #009fe3;
    color: white;
    padding: 12px 20px;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: background-color 0.3s ease;
    margin: 5px;

    &:hover {
        background-color: #007bbd;
    }
`;

const ModalTermos = ({
    selectedQuadra,
    selectedDay,
    selectedTime,
    selectedSportId,
    onClose,
    onAgendar,
}) => {
    const handleAceitar = async () => {
        const usuarioId = localStorage.getItem("usuarioId");

        console.log("selectedDay:", selectedDay);
        console.log("selectedTime:", selectedTime);

        const [horaInicio, minutoInicio] = selectedTime.split(":").map(Number);

        const dataInicio = new Date(selectedDay);

        dataInicio.setHours(horaInicio, minutoInicio, 0, 0);
        console.log("dataInicio:", dataInicio);

        // adiciona +1hr para a data fim
        let dataFim = new Date(dataInicio);
        dataFim.setHours(dataInicio.getHours() + 1);
        console.log("dataFim:", dataFim);

        // nem tenta entender esse trem da data, saiba que ele funciona...
        const horaInicioFormatada = `${dataInicio
            .getHours()
            .toString()
            .padStart(2, "0")}:${dataInicio
            .getMinutes()
            .toString()
            .padStart(2, "0")}`;
        const horaFimFormatada = `${dataFim
            .getHours()
            .toString()
            .padStart(2, "0")}:${dataFim
            .getMinutes()
            .toString()
            .padStart(2, "0")}`;

        console.log("Hora de Início:", horaInicioFormatada);
        console.log("Hora de Fim:", horaFimFormatada);

        const reservaData = {
            usuarioId,
            quadraId: selectedQuadra,
            esporteId: selectedSportId,
            data: selectedDay.toISOString().split("T")[0],
            horaInicio: horaInicioFormatada,
            horaFim: horaFimFormatada,
        };

        console.log("reservaData:", reservaData);

        try {
            await criarReserva(reservaData);
            toast.success("Reserva criada com sucesso!");
            onAgendar();
        } catch (error) {
            console.error("Erro na requisição:", error);
            toast.error(error.message || "Erro ao criar reserva.");
        }
    };

    return (
        <ModalWrapper>
            <ModalBox>
                <ModalTitle>Termos e Condições</ModalTitle>
                <ModalText>
                    Para continuar com a sua reserva, você precisa aceitar os
                    termos e condições. Leia atentamente antes de confirmar sua
                    reserva.
                </ModalText>
                <Button onClick={handleAceitar}>Aceitar e Confirmar</Button>
                <Button onClick={onClose}>Cancelar</Button>
            </ModalBox>
        </ModalWrapper>
    );
};

export default ModalTermos;
