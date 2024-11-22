import React, { useState } from "react";
import styled from "styled-components";
import { criarReserva } from "../../../api/reserva";
import { toast } from "react-toastify";

// Constantes para os termos
const termosTexto = [
    "1. O acesso às funcionalidades do PLACEHOLDER somente poderá ser realizado pelos USUÁRIOS que estiverem adequadamente cadastrados na plataforma. O cadastro no PLACEHOLDER apenas poderá ser realizado através de um e-mail corporativo, ou seja, de um domínio de correio eletrônico de uma empresa devidamente identificada, a fim de se evitar o acesso por pessoas não autorizadas ou com intenções diversas aos propósitos do PLACEHOLDER.",
    "2. O não comparecimento pode resultar em bloqueio da conta.",
    "3. O usuário é responsável pelo uso adequado das instalações.",
    "4. Todos os termos são sujeitos a mudanças sem aviso prévio.",
];

// Estilos do Modal
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
    color: #000;
`;

const ModalText = styled.p`
    margin-bottom: 30px;
    font-size: 16px;
    color: #000;
`;

const TermsContainer = styled.div`
    max-height: 200px;
    overflow-y: scroll;
    padding: 10px;
    background-color: #f9f9f9;
    border-radius: 8px;
    margin-bottom: 20px;
    text-align: left;
    font-size: 14px;
    color: #000;
`;

const CheckBoxWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 20px;
`;

const CheckBoxLabel = styled.label`
    font-size: 14px;
    color: #000;
    margin-left: 10px;
`;

const Button = styled.button`
    padding: 12px 20px;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: background-color 0.3s ease;
    margin: 5px;

    &:hover {
        background-color: #007bbd;
    }

    &.cancelar {
        background-color: #d9534f;
        color: white;

        &:hover {
            background-color: #c9302c;
        }
    }

    &.confirmar {
        background-color: #009fe3;
        color: white;
        &:disabled {
            background-color: #b0d5f2;
            cursor: not-allowed;
        }
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
    const [aceitoTermos, setAceitoTermos] = useState(false);

    const handleAceitar = async () => {
        if (!aceitoTermos) {
            toast.error("Você precisa aceitar os termos para continuar.");
            return;
        }

        const usuarioId = localStorage.getItem("usuarioId");

        // Separando hora e minutos de selectedTime
        const [horaInicio, minutoInicio] = selectedTime.split(":").map(Number);

        // Criando a data de início em UTC
        const dataInicio = new Date(
            Date.UTC(
                selectedDay.getFullYear(),
                selectedDay.getMonth(),
                selectedDay.getDate(),
                horaInicio,
                minutoInicio
            )
        );

        let dataFim = new Date(dataInicio);
        dataFim.setHours(dataInicio.getHours() + 1); // Somando uma hora na data de fim

        console.log("Data início:", dataInicio.toISOString());
        console.log("Data fim:", dataFim.toISOString());

        // Formatar a hora de início e fim
        const horaInicioFormatada = dataInicio.toISOString().slice(11, 19); // Hora no formato HH:mm:ss
        const horaFimFormatada = dataFim.toISOString().slice(11, 19); // Hora no formato HH:mm:ss
        console.log("Hora de início formatada:", horaInicioFormatada);
        console.log("Hora de fim formatada:", horaFimFormatada);

        const reservaData = {
            usuarioId,
            quadraId: selectedQuadra,
            esporteId: selectedSportId,
            data: selectedDay.toISOString().split("T")[0], // Data no formato AAAA-MM-DD
            horaInicio: horaInicioFormatada,
            horaFim: horaFimFormatada,
        };

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
                <ModalTitle>Deseja agendar o horário?</ModalTitle>
                <ModalText>
                    Para continuar com a sua reserva, leia atentamente os termos
                    e condições abaixo e marque a caixa para aceitar os termos.
                </ModalText>

                <TermsContainer>
                    {termosTexto.map((termo, index) => (
                        <p key={index}>{termo}</p>
                    ))}
                </TermsContainer>

                <CheckBoxWrapper>
                    <input
                        type="checkbox"
                        id="aceitoTermos"
                        checked={aceitoTermos}
                        onChange={(e) => setAceitoTermos(e.target.checked)}
                    />
                    <CheckBoxLabel htmlFor="aceitoTermos">
                        Aceito os termos e condições
                    </CheckBoxLabel>
                </CheckBoxWrapper>

                <Button
                    className="confirmar"
                    onClick={handleAceitar}
                    disabled={!aceitoTermos}
                >
                    Aceitar e Confirmar
                </Button>
                <Button className="cancelar" onClick={onClose}>
                    Cancelar
                </Button>
            </ModalBox>
        </ModalWrapper>
    );
};

export default ModalTermos;
