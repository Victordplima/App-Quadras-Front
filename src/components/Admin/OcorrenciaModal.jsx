import React from 'react';
import styled from 'styled-components';

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
`;

const ModalContent = styled.div`
  background: #fff;
  padding: 30px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  text-align: center;
  width: 300px;

  h4 {
    margin-bottom: 20px;
    color: #333;
  }

  button {
    margin: 5px;
    padding: 10px 15px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.2s;
    font-weight: bold;
  }

  button:first-child {
    background-color: #f44336;
    color: white;
    
    &:hover {
      background-color: #d32f2f;
    }
  }

  button:last-child {
    background-color: #e0e0e0; 
    
    &:hover {
      background-color: #d5d5d5;
    }
  }
`;

const OcorrenciaModal = ({ onConfirm, onCancel, message }) => (
  <ModalOverlay>
    <ModalContent>
      <h4>{message}</h4>
      <button onClick={onConfirm}>Sim</button>
      <button onClick={onCancel}>Não</button>
    </ModalContent>
  </ModalOverlay>
);

export default OcorrenciaModal;
