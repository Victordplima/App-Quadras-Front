import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

const DaysContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 15px;
    padding: 15px 0;
    margin-bottom: 20px;
`;

const DayButton = styled(motion.button)`
    background-color: ${(props) => (props.selected ? "#08bcfc" : "#00457f")};
    color: white;
    border: none;
    padding: 15px;
    border-radius: 8px;
    cursor: pointer;
    width: 120px;
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    transition: background-color 0.3s ease;
`;

const DayText = styled.div`
    font-size: 18px;
    font-weight: bold;
`;

const DayOfWeek = styled.div`
    font-size: 16px;
    margin-top: 5px;
    font-weight: 600;
`;

const DiaCard = ({ selectedDay, setSelectedDay }) => {
    const generateDays = () => {
        const days = [];
        const today = new Date();

        for (let i = 0; i < 10; i++) {
            const localDay = new Date(today);
            localDay.setDate(today.getDate() + i);

            // Ajustar para horário local no Brasil (GMT-3)
            const normalizedDay = new Date(
                localDay.toLocaleString("en-US", {
                    timeZone: "America/Sao_Paulo",
                })
            );

            if (normalizedDay.getDay() !== 6 && normalizedDay.getDay() !== 0) {
                // excluir sábado (6) e domingo (0)
                days.push(normalizedDay);
            }
        }
        return days;
    };

    const days = generateDays();

    const isSelected = (day) => {
        return (
            selectedDay &&
            selectedDay.getDate() === day.getDate() &&
            selectedDay.getMonth() === day.getMonth() &&
            selectedDay.getFullYear() === day.getFullYear()
        );
    };

    return (
        <DaysContainer>
            {days.map((day, index) => (
                <DayButton
                    key={index}
                    selected={isSelected(day)}
                    onClick={() => {
                        setSelectedDay(day);
                    }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                >
                    <DayText>
                        {day.toLocaleDateString("pt-BR", {
                            day: "2-digit",
                            month: "2-digit",
                        })}
                    </DayText>
                    <DayOfWeek>
                        {day.toLocaleDateString("pt-BR", {
                            weekday: "long",
                        })}
                    </DayOfWeek>
                </DayButton>
            ))}
        </DaysContainer>
    );
};

export default DiaCard;
