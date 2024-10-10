import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const ModalOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
`;

const ModalContent = styled(motion.div)`
  background-color: #fff;
  padding: 25px;
  border-radius: 12px;
  width: 400px;
  box-shadow: 0px 10px 30px rgba(0, 0, 0, 0.2);
  text-align: center;
`;

const Title = styled.h2`
  font-size: 24px;
  margin-bottom: 20px;
  color: #f44336;
`;

const Message = styled.p`
  font-size: 16px;
  margin-bottom: 30px;
  color: #555;
`;

const Button = styled.button`
  padding: 12px 20px;
  background-color: #f44336;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 16px;
  margin-right: 10px;

  &:hover {
    background-color: #d32f2f;
  }
`;

const CancelButton = styled(Button)`
  background-color: #ccc;
  color: #333;

  &:hover {
    background-color: #aaa;
  }
`;

const DeleteConfirmModal = ({ userData, handleCloseModal }) => {
    return (
        <ModalOverlay onClick={handleCloseModal}>
            <ModalContent
                onClick={(e) => e.stopPropagation()}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
            >
                <Title>Confirmar Exclusão</Title>
                <Message>Você realmente deseja excluir o usuário {userData.nome}?</Message>
                <Button onClick={() => alert('Usuário excluído')}>Excluir</Button>
                <CancelButton onClick={handleCloseModal}>Cancelar</CancelButton>
            </ModalContent>
        </ModalOverlay>
    );
};

export default DeleteConfirmModal;
