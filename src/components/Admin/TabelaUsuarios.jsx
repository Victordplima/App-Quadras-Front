import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { buscarUsuarios } from "../../api/usuario";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ModalEditarUsuario from "./ModalEditarUsuario";

const TabelaWrapper = styled.div`
    padding: 20px;
    max-width: 1000px;
    margin: auto;
`;

const FiltroWrapper = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 20px;
`;

const BarraPesquisa = styled.input`
    flex: 1;
    padding: 8px;
    border: none;
    border-bottom: 2px solid #181444;
    font-size: 16px;
    &:focus {
        outline: none;
        border-bottom-color: #000000;
    }
`;

const BotaoOrdenar = styled.button`
    padding: 8px 12px;
    font-size: 14px;
    color: #fff;
    background-color: #1e99c0;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    &:hover {
        background-color: #2317a5;
    }
`;

const Tabela = styled.table`
    width: 100%;
    border-collapse: collapse;
`;

const TabelaHead = styled.thead`
    background-color: #181444;
    color: white;
`;

const TabelaRow = styled.tr`
    &:nth-child(even) {
        background-color: #f2f2f2;
    }
`;

const TabelaCell = styled.td`
    padding: 10px;
    text-align: left;
    border: 1px solid #ddd;
`;

const TabelaHeaderCell = styled.th`
    padding: 10px;
    text-align: left;
    border: 1px solid #ddd;
`;

const LinkNomeUsuario = styled.span`
    color: #1e99c0;
    cursor: pointer;
    &:hover {
        text-decoration: underline;
    }
`;

const BotaoEditar = styled.button`
    padding: 5px 10px;
    font-size: 14px;
    color: #fff;
    background-color: #1e99c0;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    &:hover {
        background-color: #2317a5;
    }
`;

const TabelaUsuarios = () => {
    const [usuarios, setUsuarios] = useState([]);
    const [search, setSearch] = useState("");
    const [isModalOpen, setModalOpen] = useState(false);
    const [usuarioSelecionado, setUsuarioSelecionado] = useState(null);

    const navigate = useNavigate();

    const loadUsuarios = async () => {
        try {
            const response = await buscarUsuarios();
            setUsuarios(response.data);
        } catch (error) {
            toast.error("Erro ao buscar usuários.");
        }
    };

    useEffect(() => {
        loadUsuarios();
    }, []);

    const handleOpenModal = (usuario) => {
        setUsuarioSelecionado(usuario);
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
    };

    const handleUsuarioAtualizado = () => {
        loadUsuarios();
        handleCloseModal();
    };

    const filteredUsuarios = usuarios.filter((usuario) =>
        usuario.nome.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <TabelaWrapper>
            <FiltroWrapper>
                <BarraPesquisa
                    type="text"
                    placeholder="Pesquisar por nome..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <BotaoOrdenar
                    onClick={() =>
                        setUsuarios(
                            [...usuarios].sort((a, b) =>
                                a.nome.localeCompare(b.nome)
                            )
                        )
                    }
                >
                    Ordenar
                </BotaoOrdenar>
            </FiltroWrapper>
            <Tabela>
                <TabelaHead>
                    <TabelaRow>
                        <TabelaHeaderCell>Nome</TabelaHeaderCell>
                        <TabelaHeaderCell>Email</TabelaHeaderCell>
                        <TabelaHeaderCell>Telefone</TabelaHeaderCell>
                        <TabelaHeaderCell>Ações</TabelaHeaderCell>
                    </TabelaRow>
                </TabelaHead>
                <tbody>
                    {filteredUsuarios.map((usuario) => (
                        <TabelaRow key={usuario.id}>
                            <TabelaCell>
                                <LinkNomeUsuario
                                    onClick={() =>
                                        navigate(`/perfil/${usuario.id}`)
                                    }
                                >
                                    {usuario.nome}
                                </LinkNomeUsuario>
                            </TabelaCell>
                            <TabelaCell>{usuario.email}</TabelaCell>
                            <TabelaCell>{usuario.telefone}</TabelaCell>
                            <TabelaCell>
                                <BotaoEditar
                                    onClick={() => handleOpenModal(usuario)}
                                >
                                    Editar
                                </BotaoEditar>
                            </TabelaCell>
                        </TabelaRow>
                    ))}
                </tbody>
            </Tabela>
            <ToastContainer />
            <ModalEditarUsuario
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                usuario={usuarioSelecionado}
                onUsuarioAtualizado={handleUsuarioAtualizado}
            />
        </TabelaWrapper>
    );
};

export default TabelaUsuarios;
