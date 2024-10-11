import React, { useState } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faCalendar, faEllipsisV } from '@fortawesome/free-solid-svg-icons';
import OcorrenciaModal from './OcorrenciaModal';

const CartaoOcorrencia = styled.div`
  background-color: #fff;
  padding: 15px;
  border: 1px solid #ddd;
  border-radius: 8px;
  margin-bottom: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: transform 0.2s;
  position: relative;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  }
`;

const InformacaoContainer = styled.div`
  display: flex;
  align-items: center;
  flex: 1;
`;

const ImagemQuadra = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 8px;
  margin-right: 15px;
`;

const DetalhesOcorrencia = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const Titulo = styled.h3`
  margin: 0 0 5px;
`;

const HorarioData = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 5px;

  p {
    margin: 0;
    color: #888;
  }
`;

const MotivoOcorrencia = styled.p`
  text-align: center;
  margin: 10px 0;
  flex: 1;
`;

const BotaoOcorrencia = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: #888;
  font-size: 20px;
  position: absolute;
  top: 10px;
  right: 10px;
`;

const DropdownMenu = styled.div`
  position: absolute;
  top: 40px;
  right: 10px;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 5px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  z-index: 1000;
`;

const MenuItem = styled.button`
  padding: 10px;
  border: none;
  background: none;
  cursor: pointer;
  width: 100%;
  text-align: left;
  color: #333;

  &:hover {
    background-color: #f5f5f5;
  }
`;

const Ocorrencia = ({ titulo, data, descricao, horario, imagem, onRetirar }) => {
    const [showDropdown, setShowDropdown] = useState(false);
    const [showModal, setShowModal] = useState(false);

    const handleRetirarClick = () => {
        setShowModal(true);
        setShowDropdown(false);
    };

    const handleConfirmRetirar = () => {
        onRetirar();
        setShowModal(false);
    };

    return (
        <>
            <CartaoOcorrencia>
                <InformacaoContainer>
                    <ImagemQuadra src={imagem} alt={titulo} />
                    <DetalhesOcorrencia>
                        <Titulo>{titulo}</Titulo>
                        <HorarioData>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <FontAwesomeIcon icon={faClock} />
                                <p style={{ marginLeft: '5px' }}>{horario}</p>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <FontAwesomeIcon icon={faCalendar} />
                                <p style={{ marginLeft: '5px' }}>{data}</p>
                            </div>
                        </HorarioData>
                    </DetalhesOcorrencia>
                </InformacaoContainer>
                <MotivoOcorrencia>{descricao}</MotivoOcorrencia>
                <BotaoOcorrencia onClick={() => setShowDropdown(!showDropdown)}>
                    <FontAwesomeIcon icon={faEllipsisV} />
                </BotaoOcorrencia>
                {showDropdown && (
                    <DropdownMenu>
                        <MenuItem onClick={handleRetirarClick}>Retirar Ocorrência</MenuItem>
                    </DropdownMenu>
                )}
            </CartaoOcorrencia>

            {showModal && (
                <OcorrenciaModal
                    message="Tem certeza que deseja retirar a ocorrência?"
                    onConfirm={handleConfirmRetirar}
                    onCancel={() => setShowModal(false)}
                />
            )}
        </>
    );
};

export default Ocorrencia;
