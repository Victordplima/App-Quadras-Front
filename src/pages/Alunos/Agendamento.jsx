import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import QuadraCards from "../../components/Alunos/QuadraCards";
import DiaCard from "../../components/Alunos/DiaCard";
import HorarioCard from "../../components/Alunos/HorarioCard";

const Container = styled.div`
    //padding: 20px;
    background: linear-gradient(135deg, #50247a, #022660, #00a5aa);
    color: white;
    min-height: 100vh; /* Para ocupar a tela inteira */
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
    const [quadras, setQuadras] = useState([]);
    const [selectedQuadra, setSelectedQuadra] = useState(null);
    const [days, setDays] = useState([]);
    const [selectedDay, setSelectedDay] = useState(null);
    const [times, setTimes] = useState([]);

    useEffect(() => {
        async function fetchQuadras() {
            try {
                const response = await axios.get("/api/quadras");
                setQuadras(response.data);
            } catch (error) {
                console.error("Erro ao buscar quadras:", error);
            }
        }
        fetchQuadras();
    }, []);

    useEffect(() => {
        const generateWeekDays = () => {
            const daysArray = [];
            const today = new Date();
            for (let i = 0; i < 10; i++) {
                today.setDate(today.getDate() + 1);
                const day = today.getDay();
                if (day !== 0 && day !== 6) {
                    daysArray.push(new Date(today));
                }
            }
            setDays(daysArray);
        };
        generateWeekDays();
    }, []);

    useEffect(() => {
        const timeSlots = [
            { hour: "13:00", available: true },
            { hour: "14:00", available: true },
            { hour: "15:00", available: false },
            { hour: "16:00", available: true },
            { hour: "17:00", available: false },
            { hour: "18:00", available: true },
            { hour: "19:00", available: true },
            { hour: "20:00", available: true },
            { hour: "21:00", available: false },
        ];
        setTimes(timeSlots);
    }, [selectedDay]);

    return (
        <Container>
            <h2>Selecione uma quadra</h2>
            <QuadraCards
                quadras={quadras}
                selectedQuadra={selectedQuadra}
                setSelectedQuadra={setSelectedQuadra}
            />

            <h3>Selecione o dia</h3>
            <DiaCard
                days={days}
                selectedDay={selectedDay}
                setSelectedDay={setSelectedDay}
            />

            <h3>Selecione o horário</h3>
            <HorarioCard times={times} />

            <AgendarButton>Agendar</AgendarButton>
        </Container>
    );
};

export default Agendamento;
