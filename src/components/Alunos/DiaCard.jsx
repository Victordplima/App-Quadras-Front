import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

const DaysContainer = styled(motion.div)`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 15px;
    padding: 15px 0;
    margin-bottom: 20px;

    &::-webkit-scrollbar {
        display: none;
    }
`;

const DayButton = styled(motion.button)`
    // Torne o botão animado
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: ${(props) => (props.selected ? "#00bfff" : "#00457f")};
    color: white;
    border: none;
    border-radius: 8px;
    padding: 15px;
    cursor: pointer;
    margin: 0 8px;
    width: 120px;
    text-align: center;

    .date {
        font-size: 1rem;
        font-weight: bold;
    }

    .day {
        font-size: 1.2rem;
        margin-top: 5px;
    }

    @media (max-width: 600px) {
        width: 100px;
        padding: 10px;
    }
`;

// Gerar os dias úteis (sem sábados e domingos)
const generateDays = () => {
    const days = [];
    const today = new Date();
    for (let i = 0; i < 10; i++) {
        const day = new Date();
        day.setDate(today.getDate() + i);
        if (day.getDay() !== 6 && day.getDay() !== 0) {
            days.push(day);
        }
    }
    return days;
};

const DiaCard = ({ selectedDay, setSelectedDay }) => {
    const days = generateDays();

    return (
        <DaysContainer
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
        >
            {days.map((day, index) => (
                <DayButton
                    key={index}
                    selected={selectedDay === index}
                    onClick={() => setSelectedDay(index)}
                    whileHover={{ scale: 1.1 }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.1, duration: 0.3 }}
                >
                    <span className="date">
                        {day.toLocaleDateString("pt-BR", {
                            day: "numeric",
                            month: "numeric",
                        })}
                    </span>
                    <span className="day">
                        {index === 0
                            ? "Hoje"
                            : day.toLocaleDateString("pt-BR", {
                                  weekday: "short",
                              })}
                    </span>
                </DayButton>
            ))}
        </DaysContainer>
    );
};

export default DiaCard;
