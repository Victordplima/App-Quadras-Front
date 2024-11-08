import React from 'react';
import styled from 'styled-components';

const TimeContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  margin: 20px 0;
`;

const TimeSlot = styled.div`
  padding: 15px;
  background-color: ${(props) => (props.available ? '#00bfff' : '#222')};
  color: white;
  text-align: center;
  border-radius: 10px;
  cursor: ${(props) => (props.available ? 'pointer' : 'default')};
`;

const HorarioCard = ({ times }) => {
  return (
    <TimeContainer>
      {times.map((time, index) => (
        <TimeSlot
          key={index}
          available={time.available}
          onClick={() => time.available && alert(`Horário ${time.hour} selecionado`)}
        >
          <p>{time.hour}</p>
          <p>{time.available ? 'Disponível' : 'Indisponível'}</p>
        </TimeSlot>
      ))}
    </TimeContainer>
  );
};

export default HorarioCard;
