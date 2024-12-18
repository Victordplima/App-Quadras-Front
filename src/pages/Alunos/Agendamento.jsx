import React, { useState } from "react";
import styled from "styled-components";
import CarrosselQuadra from "../../components/Alunos/CarrosselQuadras";
import DiaCard from "../../components/Alunos/DiaCard";
import HorarioCard from "../../components/Alunos/HorarioCard";
import ModalEsporte from "../../components/Alunos/ModalAgendamentos/ModalEsporte";
import ModalTermos from "../../components/Alunos/ModalAgendamentos/ModalTermos";
import ModalConfirmacao from "../../components/Alunos/ModalAgendamentos/ModalConfirmacao";
import Header from "../../components/Alunos/Header";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Container = styled.div`
    background: linear-gradient(135deg, #50247a, #022660, #00a5aa);
    color: white;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const Title = styled.h1`
    color: white;
    padding-top: 80px;
    font-size: 32px;
`;

const AgendarButton = styled.button`
    width: 200px;
    padding: 10px 20px;
    background-color: #00bfff;
    color: white;
    border: none;
    border-radius: 10px;
    cursor: pointer;
    font-size: 16px;
    margin-top: 20px;
    transition: background-color 0.3s ease;
    margin-bottom: 50px;

    &:hover {
        background-color: #009fe3;
    }
`;

const Agendamento = () => {
    const [selectedQuadra, setSelectedQuadra] = useState(null);
    const [selectedDay, setSelectedDay] = useState(null);
    const [selectedTime, setSelectedTime] = useState(null);
    const [selectedSportId, setSelectedSportId] = useState(null);
    const [showSportModal, setShowSportModal] = useState(false);
    const [showTermsModal, setShowTermsModal] = useState(false);
    const [showConfirmationModal, setShowConfirmationModal] = useState(false);

    const handleAgendar = () => {
        if (!selectedQuadra || !selectedDay || !selectedTime) {
            toast.error("Por favor, selecione uma quadra, dia e horário.");
            return;
        }
        setShowSportModal(true);
    };

    const handleSportSelection = (sportId) => {
        setSelectedSportId(sportId);
        setShowSportModal(false);
        setShowTermsModal(true);
    };

    const handleTermsAccepted = () => {
        setShowTermsModal(false);
        setShowConfirmationModal(true);
    };

    const handleConfirmationClose = () => {
        setShowConfirmationModal(false);
    };

    return (
        <Container>
            <Header />
            <Title>Selecione uma quadra</Title>
            <CarrosselQuadra onQuadraSelect={setSelectedQuadra} />

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

            {showSportModal && (
                <ModalEsporte
                    quadraId={selectedQuadra}
                    onNext={handleSportSelection}
                    onClose={() => setShowSportModal(false)}
                />
            )}

            {showTermsModal && (
                <ModalTermos
                    selectedQuadra={selectedQuadra}
                    selectedDay={selectedDay}
                    selectedTime={selectedTime}
                    selectedSportId={selectedSportId}
                    onAgendar={handleTermsAccepted}
                    onClose={() => setShowTermsModal(false)}
                />
            )}

            {showConfirmationModal && (
                <ModalConfirmacao onClose={handleConfirmationClose} />
            )}
        </Container>
    );
};

export default Agendamento;
