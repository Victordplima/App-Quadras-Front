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
  width: 450px;
  box-shadow: 0px 10px 30px rgba(0, 0, 0, 0.2);
  text-align: left;
`;

const Title = styled.h2`
  font-size: 24px;
  margin-bottom: 20px;
  color: #333;
`;

const Label = styled.label`
  font-size: 16px;
  display: block;
  margin-bottom: 10px;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border-radius: 8px;
  border: 1px solid #ddd;
  margin-bottom: 20px;
`;

const Button = styled.button`
  padding: 12px 20px;
  background-color: #044cfb;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 16px;
  margin-right: 10px;

  &:hover {
    background-color: #033cbb;
  }
`;

const CancelButton = styled(Button)`
  background-color: #ccc;
  color: #333;

  &:hover {
    background-color: #aaa;
  }
`;

const EditModal = ({ formData, setFormData, handleCloseModal }) => {
    return (
        <ModalOverlay onClick={handleCloseModal}>
            <ModalContent
                onClick={(e) => e.stopPropagation()}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
            >
                <Title>Editar Usuário</Title>
                <Label>Nome:</Label>
                <Input
                    type="text"
                    value={formData.nome}
                    onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                />
                <Label>Email:</Label>
                <Input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
                <Label>Telefone:</Label>
                <Input
                    type="text"
                    value={formData.telefone}
                    onChange={(e) => setFormData({ ...formData, telefone: e.target.value })}
                />
                <Label>Matrícula:</Label>
                <Input
                    type="text"
                    value={formData.matricula}
                    onChange={(e) => setFormData({ ...formData, matricula: e.target.value })}
                />
                <Label>Curso:</Label>
                <Input
                    type="text"
                    value={formData.curso}
                    onChange={(e) => setFormData({ ...formData, curso: e.target.value })}
                />
                <div>
                    <Button onClick={handleCloseModal}>Salvar</Button>
                    <CancelButton onClick={handleCloseModal}>Cancelar</CancelButton>
                </div>
            </ModalContent>
        </ModalOverlay>
    );
};

export default EditModal;
