import React, { useState } from "react";
import styled from "styled-components";
import QuadraCards from "../../components/Alunos/QuadraCards";
import DiaCard from "../../components/Alunos/DiaCard";
import HorarioCard from "../../components/Alunos/HorarioCard";

const Container = styled.div`
    background: linear-gradient(135deg, #50247a, #022660, #00a5aa);
    color: white;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const AgendarButton = styled.button`
    width: 100%;
    padding: 15px;
    background-color: #00bfff;
    color: white;
    border: none;
    border-radius: 10px;
    cursor: pointer;
    font-size: 18px;
    margin-top: 20px;
`;

const Agendamento = () => {
    const [selectedQuadra, setSelectedQuadra] = useState(null);
    const [selectedDay, setSelectedDay] = useState(null);
    const [selectedTime, setSelectedTime] = useState(null);

    const handleAgendar = async () => {
        console.log("Quadra selecionada:", selectedQuadra);
        console.log("Dia selecionado:", selectedDay);
        console.log("Horário selecionado:", selectedTime);

        if (!selectedQuadra || !selectedDay || !selectedTime) {
            alert("Por favor, selecione uma quadra, dia e horário.");
            return;
        }
    };

    return (
        <Container>
            <h2>Selecione uma quadra</h2>
            <QuadraCards
                setSelectedQuadra={setSelectedQuadra}
                selectedQuadra={selectedQuadra}
            />

            <h3>Selecione o dia</h3>
            <DiaCard
                selectedDay={selectedDay}
                setSelectedDay={setSelectedDay}
            />

            <h3>Selecione o horário</h3>
            <HorarioCard
                selectedQuadra={selectedQuadra}
                selectedDay={selectedDay}
                setSelectedTime={setSelectedTime}
            />

            <AgendarButton onClick={handleAgendar}>Agendar</AgendarButton>
        </Container>
    );
};

export default Agendamento;
