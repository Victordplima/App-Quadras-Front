import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { buscarEsportesPorQuadraId } from "../../../api/quadra";

const Overlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
`;

const ModalContainer = styled.div`
    background-color: white;
    border-radius: 8px;
    width: 90%;
    max-width: 500px;
    padding: 20px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    text-align: center;
    color: black;
`;

const ModalHeader = styled.h2`
    margin-bottom: 1em;
`;

const Select = styled.select`
    width: 100%;
    padding: 10px;
    margin-bottom: 1em;
    border-radius: 5px;
    border: 1px solid #ccc;
`;

const Button = styled.button`
    background-color: #4caf50;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    margin: 10px;
    &:hover {
        background-color: #45a049;
    }
    &:disabled {
        background-color: #ccc;
        cursor: not-allowed;
    }
`;

const ModalEsporte = ({ quadraId, onClose, onNext }) => {
    const [esportes, setEsportes] = useState([]);
    const [esporteSelecionado, setEsporteSelecionado] = useState("");

    useEffect(() => {
        const fetchEsportes = async () => {
            try {
                const data = await buscarEsportesPorQuadraId(quadraId);
                setEsportes(data);
            } catch (error) {
                console.error("Erro ao buscar esportes:", error.message);
            }
        };
        fetchEsportes();
    }, [quadraId]);

    const handleEsporteChange = (e) => setEsporteSelecionado(e.target.value);

    return (
        <Overlay>
            <ModalContainer>
                <ModalHeader>Selecionar Esporte</ModalHeader>
                <Select
                    value={esporteSelecionado}
                    onChange={handleEsporteChange}
                >
                    <option value="" disabled>
                        Escolha um esporte
                    </option>
                    {esportes.map((item) => (
                        <option key={item.esporte_id} value={item.esporte_id}>
                            {item.esporte_nome}
                        </option>
                    ))}
                </Select>
                <Button
                    onClick={() => onNext(esporteSelecionado)}
                    disabled={!esporteSelecionado}
                >
                    Próximo
                </Button>
                <Button
                    onClick={onClose}
                    style={{ backgroundColor: "#f44336" }}
                >
                    Cancelar
                </Button>
            </ModalContainer>
        </Overlay>
    );
};

export default ModalEsporte;
