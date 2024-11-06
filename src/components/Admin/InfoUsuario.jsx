import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faEllipsisV,
    faEdit,
    faTrashAlt,
} from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";
import EditModal from "./EditModal";
import DeleteConfirmModal from "./DeleteConfirmModal";
import { buscarUsuarioPorId } from "../../api/usuario";

const Container = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    padding: 20px;
`;

const PerfilCard = styled.div`
    flex: 1;
    padding: 20px;
    background-color: white;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    margin-right: 20px;
    position: relative;
`;

const TotalsCard = styled.div`
    flex: 2;
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
`;

const Card = styled.div`
    flex: 1 1 calc(50% - 20px);
    padding: 20px;
    background-color: ${({ bgColor }) => bgColor || "white"};
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    text-align: center;
    color: white;
`;

const CardTitle = styled.h3`
    font-size: 1.2rem;
    margin-bottom: 10px;
`;

const CardValue = styled.p`
    font-size: 2rem;
    font-weight: bold;
`;

const InfoList = styled.ul`
    list-style: none;
    padding: 0;
    margin: 0;
`;

const InfoItem = styled.li`
    margin-bottom: 10px;
    font-size: 1.1rem;
    color: #555;
    padding-top: 20px;

    span {
        font-weight: bold;
        color: #333;
    }
`;

const Nome = styled.h1`
    font-size: 24px;
    font-weight: bold;
    color: black;
    text-align: center;
`;

const OptionsIcon = styled(FontAwesomeIcon)`
    position: absolute;
    top: 10px;
    right: 10px;
    cursor: pointer;
`;

const OptionsMenu = styled(motion.div)`
    position: absolute;
    top: 40px;
    right: 10px;
    background-color: white;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    z-index: 10;
`;

const MenuItem = styled.div`
    padding: 10px 20px;
    cursor: pointer;
    &:hover {
        background-color: #f0f0f0;
    }
`;

const InfoUsuario = ({ userId }) => {
    const [showOptions, setShowOptions] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [userData, setUserData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const data = await buscarUsuarioPorId(userId);
                setUserData(data);
            } catch (error) {
                console.error("Erro ao buscar dados do usuário:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchUserData();
    }, [userId]);

    const toggleOptions = () => setShowOptions(!showOptions);
    const closeModals = () => {
        setShowEditModal(false);
        setShowDeleteModal(false);
    };

    if (isLoading) {
        return <p>Carregando...</p>;
    }

    return (
        <Container>
            <PerfilCard>
                <InfoList>
                    <InfoItem>
                        <Nome>{userData.nome}</Nome>
                    </InfoItem>
                    <InfoItem>
                        <span>Email:</span> {userData.email}
                    </InfoItem>
                    <InfoItem>
                        <span>Telefone:</span> {userData.telefone}
                    </InfoItem>
                    <InfoItem>
                        <span>Matrícula:</span> {userData.matricula}
                    </InfoItem>
                    <InfoItem>
                        <span>Curso:</span> {userData.curso}
                    </InfoItem>
                    <InfoItem>
                        <span>Matrícula:</span> {userData.matricula}
                    </InfoItem>
                </InfoList>

                <OptionsIcon icon={faEllipsisV} onClick={toggleOptions} />
                {showOptions && (
                    <OptionsMenu
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                    >
                        <MenuItem onClick={() => setShowEditModal(true)}>
                            <FontAwesomeIcon icon={faEdit} /> Editar
                        </MenuItem>
                        <MenuItem onClick={() => setShowDeleteModal(true)}>
                            <FontAwesomeIcon icon={faTrashAlt} /> Excluir
                        </MenuItem>
                    </OptionsMenu>
                )}
            </PerfilCard>

            <TotalsCard>
                <Card bgColor="#4CAF50">
                    <CardTitle>Total de Agendamentos</CardTitle>
                    <CardValue>{userData.totalAgendamentos}</CardValue>
                </Card>
                <Card bgColor="#FF9800">
                    <CardTitle>Total de Cancelamentos</CardTitle>
                    <CardValue>{userData.totalCancelamentos}</CardValue>
                </Card>
                <Card bgColor="#F44336">
                    <CardTitle>Total de Rejeitamentos</CardTitle>
                    <CardValue>{userData.totalRejeitamentos}</CardValue>
                </Card>
                <Card bgColor="#2196F3">
                    <CardTitle>Total de Ocorrências</CardTitle>
                    <CardValue>{userData.totalOcorrencias}</CardValue>
                </Card>
            </TotalsCard>

            {showEditModal && (
                <EditModal
                    formData={userData}
                    setFormData={setUserData}
                    handleCloseModal={closeModals}
                />
            )}

            {showDeleteModal && (
                <DeleteConfirmModal
                    userData={userData}
                    handleCloseModal={closeModals}
                />
            )}
        </Container>
    );
};

export default InfoUsuario;
