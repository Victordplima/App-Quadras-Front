import React from "react";
import styled from "styled-components";
import FAQCard from "../../components/Alunos/FAQCard";
import Header from "../../components/Alunos/Header";
import { AnimatePresence } from "framer-motion";

const Container = styled.div`
    background: linear-gradient(135deg, #50247a, #022660, #00a5aa);
    color: white;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
`;

const FAQTitle = styled.h2`
    font-size: 28px;
    color: white;
    text-align: center;
    margin-bottom: 20px;
    padding-top: 50px;

    @media (max-width: 768px) {
        font-size: 24px;
    }
`;

const FAQList = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    max-width: 800px;
    margin-top: 20px;

    @media (max-width: 768px) {
        width: 100%;
        padding: 0 20px;
    }
`;

const faqs = [
    {
        question: "Como faço para agendar uma quadra?",
        answer: "Você pode agendar uma quadra acessando a página de agendamento, selecionando a quadra, o dia e o horário que deseja reservar.",
    },
    {
        question: "O que acontece se eu não comparecer ao agendamento?",
        answer: "O não comparecimento pode resultar em bloqueio temporário da sua conta, impedindo futuros agendamentos por um período determinado.",
    },
    {
        question: "Posso cancelar o agendamento?",
        answer: "Sim, você pode cancelar seu agendamento até 5 dias antes do horário reservado, caso cancele depois, você sofrerá um bloqueio de uma semana.",
    },
    {
        question: "Como eu faço para agendar um horário ou quadra que não está listado?",
        answer: "Nesse caso, você deverá enviar um email para email@exemplo.com.",
    },
    {
        question: "Como eu faço para recorrer a um bloqueio?",
        answer: "Você deverá enviar um email para email@exemplo.com explicando o problema ocorrido.",
    },
];

const FAQ = () => {
    return (
        <Container>
            <Header />
            <FAQTitle>FAQ - Perguntas Frequentes</FAQTitle>
            <FAQList>
                <AnimatePresence>
                    {faqs.map((faq, index) => (
                        <FAQCard
                            key={index}
                            question={faq.question}
                            answer={faq.answer}
                        />
                    ))}
                </AnimatePresence>
            </FAQList>
        </Container>
    );
};

export default FAQ;
