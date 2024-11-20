import React, { useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

const CardContainer = styled(motion.div)`
    width: 100%;
    max-width: 500px;
    background-color: #fff;
    border-radius: 8px;
    margin-bottom: 15px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    overflow: hidden;
    cursor: pointer;

    @media (max-width: 768px) {
        width: 100%;
    }
`;

const Question = styled.div`
    background-color: #00bfff;
    color: white;
    padding: 15px;
    font-size: 18px;
    font-weight: bold;

    @media (max-width: 768px) {
        font-size: 16px;
        padding: 12px;
    }
`;

const Answer = styled.div`
    padding: 15px;
    background-color: #f4f4f4;
    font-size: 16px;
    color: #333;

    @media (max-width: 768px) {
        padding: 12px;
        font-size: 14px;
    }
`;

const FAQCard = ({ question, answer }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleCard = () => {
        setIsOpen(!isOpen);
    };

    return (
        <CardContainer
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={toggleCard}
        >
            <Question>{question}</Question>
            {isOpen && <Answer>{answer}</Answer>}
        </CardContainer>
    );
};

export default FAQCard;
