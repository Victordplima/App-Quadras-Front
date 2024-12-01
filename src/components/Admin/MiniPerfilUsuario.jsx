import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { buscarInformacoesUsuarioCompleto } from "../../api/usuario";
import { useNavigate } from "react-router-dom";

const Overlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
`;

const PerfilContainer = styled.div`
    background: #181444;
    padding: 20px;
    border-radius: 8px;
    width: 350px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
    position: relative;
    color: white;
`;

const CloseButton = styled.button`
    background: none;
    border: none;
    color: #888;
    font-size: 20px;
    position: absolute;
    top: 10px;
    right: 10px;
    cursor: pointer;

    &:hover {
        color: #fff;
    }
`;

const InfoItem = styled.div`
    margin-bottom: 10px;
    font-size: 16px;
    text-align: center;
    font-weight: bold;
`;

const ProfileImage = styled.div`
    width: 80px;
    height: 80px;
    border-radius: 50%;
    background-color: #ccc;
    margin-bottom: 20px;
    background-image: url("https://via.placeholder.com/80");
    background-size: cover;
    background-position: center;
    margin: 0 auto;
`;

const StatContainer = styled.div`
    background-color: #fff;
    padding: 20px;
    border-radius: 8px;
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    gap: 10px;
`;

const StatItem = styled.div`
    background-color: #fff;
    color: #181444;
    padding: 15px;
    text-align: center;
    border-radius: 8px;
    font-size: 16px;
    font-weight: bold;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    flex: 1;

    &:not(:last-child)::after {
        content: "|";
        position: absolute;
        top: 50%;
        right: -10px;
        transform: translateY(-50%);
        font-size: 20px;
        color: #181444;
    }

    @media (max-width: 600px) {
        flex: 1 1 100%;
    }

    span {
        font-weight: bold;
    }
`;

const ProfileButton = styled.button`
    background-color: #1e99c0;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 8px;
    font-size: 16px;
    cursor: pointer;
    width: 100%;
    margin-top: 20px;

    &:hover {
        background-color: #178a9b;
    }
`;

const MiniPerfilUsuario = ({ userId, onClose }) => {
    const [usuario, setUsuario] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUsuario = async () => {
            setLoading(true);
            setError(null);
            try {
                const data = await buscarInformacoesUsuarioCompleto(userId);
                setUsuario(data);
            } catch (err) {
                setError("Erro ao carregar informações do usuário.");
            } finally {
                setLoading(false);
            }
        };

        if (userId) fetchUsuario();
    }, [userId]);

    if (!userId) return null;

    const handleProfileRedirect = () => {
        navigate(`/perfil/${userId}`);
    };

    return (
        <Overlay onClick={onClose}>
            <PerfilContainer onClick={(e) => e.stopPropagation()}>
                <CloseButton onClick={onClose}>&times;</CloseButton>
                {loading ? (
                    <p>Carregando...</p>
                ) : error ? (
                    <p>{error}</p>
                ) : usuario ? (
                    <>
                        <ProfileImage />
                        <InfoItem>{usuario.nome}</InfoItem>
                        <InfoItem>{usuario.telefone}</InfoItem>
                        <InfoItem>{usuario.curso}</InfoItem>
                        <InfoItem>{usuario.matricula}</InfoItem>
                        <InfoItem>{usuario.email}</InfoItem>
                        <StatContainer>
                            <StatItem>
                                <span>{usuario.total_bloqueios}</span>
                                <br />
                                Bloqueios
                            </StatItem>
                            <StatItem>
                                <span>{usuario.total_faltas}</span>
                                <br />
                                Faltas
                            </StatItem>
                            <StatItem>
                                <span>{usuario.total_agendamentos}</span>
                                <br />
                                Agendamentos
                            </StatItem>
                        </StatContainer>
                        <ProfileButton onClick={handleProfileRedirect}>
                            Ver Perfil Completo
                        </ProfileButton>
                    </>
                ) : (
                    <p>Usuário não encontrado.</p>
                )}
            </PerfilContainer>
        </Overlay>
    );
};

export default MiniPerfilUsuario;
