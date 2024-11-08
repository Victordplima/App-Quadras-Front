import React from 'react';
import styled from 'styled-components';

const DaysContainer = styled.div`
  display: flex;
  overflow-x: auto;
  gap: 10px;
  padding: 10px 0;
  margin-bottom: 20px;

  &::-webkit-scrollbar {
    display: none;
  }
`;


const DayButton = styled.button`
  background-color: ${(props) => (props.selected ? '#00bfff' : '#00457f')};
  color: white;
  border: none;
  border-radius: 5px;
  padding: 10px;
  cursor: pointer;
  margin: 0 5px;
`;

const DiaCarrossel = ({ days, selectedDay, setSelectedDay }) => {
  return (
    <DaysContainer>
      {days.map((day, index) => (
        <DayButton
          key={index}
          selected={selectedDay === index}
          onClick={() => setSelectedDay(index)}
        >
          {day.toLocaleDateString('pt-BR', {
            weekday: 'short',
            day: 'numeric',
            month: 'numeric',
          })}
        </DayButton>
      ))}
    </DaysContainer>
  );
};

export default DiaCarrossel;
