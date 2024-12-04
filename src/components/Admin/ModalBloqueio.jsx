import React, { useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { criarBloqueio } from "../../api/bloqueio"; // Importando a função de criação de bloqueio

// Estilos ajustados para garantir alinhamento e espaçamento adequado
const ModalOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
`;

const ModalContainer = styled(motion.div)`
    background-color: white;
    padding: 30px;
    border-radius: 12px;
    width: 100%;
    max-width: 500px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    gap: 20px;
    position: relative;
`;

const ModalTitle = styled.h2`
    font-size: 24px;
    font-weight: 600;
    text-align: center;
    margin-bottom: 20px;
`;

const Label = styled.label`
    font-size: 16px;
    margin-bottom: 8px;
`;

const TextArea = styled.textarea`
    padding: 12px 16px;
    border-radius: 8px;
    border: 1px solid #ddd;
    font-size: 16px;
    outline: none;
    resize: vertical;
    min-height: 100px;
    width: 100%;
`;

const Botao = styled.button`
    padding: 12px 20px;
    border-radius: 8px;
    background-color: #007bff;
    color: white;
    font-size: 16px;
    border: none;
    cursor: pointer;
    transition: background-color 0.3s;

    &:hover {
        background-color: #0056b3;
    }

    &:disabled {
        background-color: #ccc;
        cursor: not-allowed;
    }
`;

const CloseButton = styled.button`
    position: absolute;
    top: 10px;
    right: 10px;
    background: none;
    border: none;
    color: #333;
    font-size: 24px;
    cursor: pointer;

    &:hover {
        color: #007bff;
    }
`;

const ModalBloqueio = ({
    title,
    onClose,
    bloqueioData,
    handleChange,
    isLoading,
    usuarioId, // Recebe o usuarioId como prop
}) => {
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Função para calcular a data de fim (7 dias após o início)
    const calcularPeriodosBloqueio = () => {
        const now = new Date();
        const periodoInicio = now.toISOString(); // Data atual (inicio do bloqueio)

        // Criando nova data para o fim do bloqueio sem alterar o valor de `now`
        const periodoFim = new Date(now);
        periodoFim.setDate(now.getDate() + 7); // 7 dias após a data atual (fim do bloqueio)

        return { periodoInicio, periodoFim: periodoFim.toISOString() };
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        const { periodoInicio, periodoFim } = calcularPeriodosBloqueio(); // Calculando as datas

        const dataToSend = {
            usuarioId, // ID do usuário
            motivo: bloqueioData.motivo,
            descricao: bloqueioData.descricao,
            periodo_inicio: periodoInicio,
            periodo_fim: periodoFim,
        };

        try {
            await criarBloqueio(dataToSend); // Chama a função para criar o bloqueio
            toast.success("Bloqueio criado com sucesso!");
            onClose(); // Fecha o modal após sucesso
        } catch (error) {
            toast.error("Erro ao criar o bloqueio!");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <ModalOverlay>
            <ModalContainer
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
            >
                <CloseButton onClick={onClose}>×</CloseButton>
                <ModalTitle>{title}</ModalTitle>
                <form onSubmit={handleSubmit}>
                    <div>
                        <Label>Motivo:</Label>
                        <TextArea
                            name="motivo"
                            value={bloqueioData.motivo}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <Label>Descrição:</Label>
                        <TextArea
                            name="descricao"
                            value={bloqueioData.descricao}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <Botao type="submit" disabled={isSubmitting}>
                        {isSubmitting ? "Carregando..." : "Salvar"}
                    </Botao>
                </form>
            </ModalContainer>
        </ModalOverlay>
    );
};

export default ModalBloqueio;
