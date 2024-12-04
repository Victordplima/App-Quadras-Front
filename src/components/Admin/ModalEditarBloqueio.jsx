import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { editarBloqueio } from "../../api/bloqueio"; // Função de edição da API
import { toast } from "react-toastify"; // Importando a função toast para exibir notificações
import "react-toastify/dist/ReactToastify.css"; // Estilo do Toast

// Estilos do Modal
const ModalContainer = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
`;

const ModalContent = styled.div`
    background-color: white;
    padding: 20px;
    border-radius: 8px;
    width: 400px;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
`;

const ModalHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const ModalTitle = styled.h3`
    margin: 0;
`;

const CloseButton = styled.button`
    background-color: transparent;
    border: none;
    font-size: 20px;
    cursor: pointer;
`;

const Form = styled.form`
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-top: 20px;
`;

const Label = styled.label`
    font-weight: bold;
    font-size: 14px;
`;

const Input = styled.input`
    padding: 8px;
    border-radius: 4px;
    border: 1px solid #ddd;
    font-size: 14px;
`;

const TextArea = styled.textarea`
    padding: 8px;
    border-radius: 4px;
    border: 1px solid #ddd;
    font-size: 14px;
    height: 100px;
`;

const Button = styled.button`
    padding: 10px 20px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 16px;
    transition: background-color 0.3s;

    &:hover {
        background-color: #0056b3;
    }
`;

const ModalEditarBloqueio = ({ title, onClose, bloqueioData }) => {
    const [formData, setFormData] = useState({
        periodoInicio: bloqueioData.periodo_inicio || "",
        periodoFim: bloqueioData.periodo_fim || "",
        motivo: bloqueioData.motivo || "",
        descricao: bloqueioData.descricao || "",
    });

    useEffect(() => {
        setFormData({
            periodoInicio: bloqueioData.periodo_inicio || "",
            periodoFim: bloqueioData.periodo_fim || "",
            motivo: bloqueioData.motivo || "",
            descricao: bloqueioData.descricao || "",
        });
    }, [bloqueioData]);

    const handleChangeLocal = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await editarBloqueio(bloqueioData.id, formData);
            toast.success("Bloqueio editado com sucesso!");
            onClose(); // Fechar o modal após o sucesso
        } catch (error) {
            console.error("Erro ao editar o bloqueio", error);
            toast.error("Erro ao editar o bloqueio!");
        }
    };

    return (
        <ModalContainer>
            <ModalContent>
                <ModalHeader>
                    <ModalTitle>{title}</ModalTitle>
                    <CloseButton onClick={onClose}>&times;</CloseButton>
                </ModalHeader>
                <Form onSubmit={handleSubmit}>
                    <Label>Período Início</Label>
                    <Input
                        type="datetime-local"
                        name="periodoInicio"
                        value={formData.periodoInicio}
                        onChange={handleChangeLocal}
                    />
                    <Label>Período Fim</Label>
                    <Input
                        type="datetime-local"
                        name="periodoFim"
                        value={formData.periodoFim}
                        onChange={handleChangeLocal}
                    />
                    <Label>Motivo</Label>
                    <Input
                        type="text"
                        name="motivo"
                        value={formData.motivo}
                        onChange={handleChangeLocal}
                    />
                    <Label>Descrição</Label>
                    <TextArea
                        name="descricao"
                        value={formData.descricao}
                        onChange={handleChangeLocal}
                    />
                    <Button type="submit">Salvar Alterações</Button>
                </Form>
            </ModalContent>
        </ModalContainer>
    );
};

export default ModalEditarBloqueio;
