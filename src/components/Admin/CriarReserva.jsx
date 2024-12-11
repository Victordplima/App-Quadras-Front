import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import styled from "styled-components";
import { criarReservaAdmin } from "../../api/reserva";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { buscarQuadras } from "../../api/quadra";

const ButtonWrapper = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 50px;
`;

const Button = styled.button`
    padding: 10px 20px;
    background-color: #1e99c0;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;
    transition: background-color 0.3s;
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;

    &:hover {
        background-color: #177491;
    }
`;

const ModalTitle = styled.h2`
    text-align: center;
    padding-bottom: 22px;
`;

const ModalContent = styled.div`
    padding: 20px;
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
    max-width: 400px;
    width: 100%;
    margin: 0 auto;
`;

const FormContainer = styled.form`
    display: flex;
    flex-direction: column;
`;

const Input = styled.input`
    padding: 10px;
    margin-bottom: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
`;

const Select = styled.select`
    padding: 10px;
    margin-bottom: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
`;

const Option = styled.option``;

const BotaoSalvar = styled.button`
    padding: 10px 15px;
    font-size: 16px;
    color: #fff;
    background-color: #1e99c0;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    width: 100%;
    transition: background-color 0.3s;

    &:hover {
        background-color: #177491;
    }
`;

const HoraFimLabel = styled.div`
    padding: 10px;
    margin-bottom: 10px;
    background-color: #f0f0f0;
    border: 1px solid #ccc;
    border-radius: 4px;
    color: #333;
    font-weight: bold;
`;

Modal.setAppElement("#root");

function CriarReserva() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [reservaData, setReservaData] = useState({
        usuarioId: "",
        quadraId: "",
        esporteId: "",
        data: "",
        horaInicio: "",
        horaFim: "",
    });
    const [quadras, setQuadras] = useState([]);
    // eslint-disable-next-line
    const [loading, setLoading] = useState(false);

    const horarios = [
        "13:00",
        "14:00",
        "15:00",
        "16:00",
        "17:00",
        "18:00",
        "19:00",
        "20:00",
        "21:00",
    ];

    useEffect(() => {
        const fetchQuadras = async () => {
            try {
                setLoading(true);
                const quadras = await buscarQuadras();
                setQuadras(quadras);
                setLoading(false);
            } catch (error) {
                toast.error("Erro ao carregar as quadras.");
                setLoading(false);
            }
        };

        if (isModalOpen) {
            fetchQuadras();
        }
    }, [isModalOpen]);

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"));
        if (user) {
            setReservaData((prevData) => ({
                ...prevData,
                usuarioId: user.id,
            }));
        }
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setReservaData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleHoraInicioChange = (e) => {
        const { value } = e.target;
        setReservaData((prevData) => {
            const horaFim = horarios.find((hora) => hora > value);
            return {
                ...prevData,
                horaInicio: value,
                horaFim: horaFim || "",
            };
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        if (
            !reservaData.usuarioId ||
            !reservaData.quadraId ||
            !reservaData.esporteId ||
            !reservaData.data ||
            !reservaData.horaInicio
        ) {
            toast.error("Por favor, preencha todos os campos.");
            return;
        }
    
        const reservaComHoraFim = {
            ...reservaData,
        };
    
        try {
            const novaReserva = await criarReservaAdmin(reservaComHoraFim);
            console.log("Reserva criada no back:", novaReserva);
            setIsModalOpen(false);
            toast.success("Reserva criada com sucesso!");
        } catch (error) {
            console.error("Erro ao criar reserva:", error.message);
            toast.error("Erro ao criar reserva.");
        }
    };

    return (
        <>
            <ButtonWrapper>
                <Button onClick={() => setIsModalOpen(true)}>
                    Criar Reserva
                </Button>
            </ButtonWrapper>

            <Modal
                isOpen={isModalOpen}
                onRequestClose={() => setIsModalOpen(false)}
                contentLabel="Criar Reserva"
                ariaHideApp={false}
                style={{
                    overlay: {
                        backgroundColor: "rgba(0, 0, 0, 0.5)",
                    },
                    content: {
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        padding: "0",
                        border: "none",
                        borderRadius: "8px",
                        width: "400px",
                        height: "auto",
                        maxHeight: "90vh",
                        overflowY: "auto",
                        inset: "50% auto auto 50%",
                        transform: "translate(-50%, -50%)",
                    },
                }}
            >
                <ModalContent>
                    <ModalTitle>Criar Reserva</ModalTitle>
                    <FormContainer onSubmit={handleSubmit}>
                        <Select
                            name="quadraId"
                            value={reservaData.quadraId}
                            onChange={handleInputChange}
                        >
                            <Option value="">Selecione uma quadra</Option>
                            {quadras.map((quadra) => (
                                <Option key={quadra.id} value={quadra.id}>
                                    {quadra.nome}
                                </Option>
                            ))}
                        </Select>

                        <Select
                            name="esporteId"
                            value={reservaData.esporteId}
                            onChange={handleInputChange}
                        >
                            <Option value="">Selecione um esporte</Option>
                            {quadras
                                .find(
                                    (quadra) =>
                                        quadra.id === reservaData.quadraId
                                )
                                ?.esportes.map((esporte) => (
                                    <Option key={esporte.id} value={esporte.id}>
                                        {esporte.nome}
                                    </Option>
                                ))}
                        </Select>

                        <Input
                            type="date"
                            name="data"
                            value={reservaData.data}
                            onChange={handleInputChange}
                        />
                        <Select
                            name="horaInicio"
                            value={reservaData.horaInicio}
                            onChange={handleHoraInicioChange}
                        >
                            <Option value="">Selecione a hora de início</Option>
                            {horarios.map((hora) => (
                                <Option key={hora} value={hora}>
                                    {hora}
                                </Option>
                            ))}
                        </Select>

                        {reservaData.horaFim && (
                            <HoraFimLabel>
                                Hora de fim: {reservaData.horaFim}
                            </HoraFimLabel>
                        )}

                        <BotaoSalvar type="submit">Criar Reserva</BotaoSalvar>
                    </FormContainer>
                </ModalContent>
            </Modal>
        </>
    );
}

export default CriarReserva;
