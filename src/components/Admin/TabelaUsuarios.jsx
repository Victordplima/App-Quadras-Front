import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { buscarUsuarios } from "../../api/usuario";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
    const [filtroUsuarios, setFiltroUsuarios] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [sortOrder, setSortOrder] = useState("asc");
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUsuarios = async () => {
            try {
                const response = await buscarUsuarios();
                setUsuarios(response.data);
                setFiltroUsuarios(response.data);
            } catch (error) {
                toast.error("Erro ao carregar usuários.");
            }
        };
        fetchUsuarios();
    }, []);

    const handleUserClick = (id) => {
        navigate(`/perfil/${id}`);
    };

    const handleEditClick = (id) => {
        navigate(`/editar-usuario/${id}`);
    };

    const handleSearch = (e) => {
        const term = e.target.value.toLowerCase();
        setSearchTerm(term);
        const filtered = usuarios.filter((usuario) =>
            usuario.nome.toLowerCase().includes(term)
        );
        setFiltroUsuarios(filtered);
    };

    const toggleSortOrder = () => {
        const newOrder = sortOrder === "asc" ? "desc" : "asc";
        setSortOrder(newOrder);

        const sorted = [...filtroUsuarios].sort((a, b) => {
            if (newOrder === "asc") {
                return a.nome.localeCompare(b.nome);
            } else {
                return b.nome.localeCompare(a.nome);
            }
        });

        setFiltroUsuarios(sorted);
    };

    return (
        <TabelaWrapper>
            <ToastContainer />
            <FiltroWrapper>
                <BarraPesquisa
                    type="text"
                    placeholder="Pesquisar por nome..."
                    value={searchTerm}
                    onChange={handleSearch}
                />
                <BotaoOrdenar onClick={toggleSortOrder}>
                    Ordenar por Nome (
                    {sortOrder === "asc" ? "Crescente" : "Decrescente"})
                </BotaoOrdenar>
            </FiltroWrapper>
            <Tabela>
                <TabelaHead>
                    <TabelaRow>
                        <TabelaHeaderCell>Nome</TabelaHeaderCell>
                        <TabelaHeaderCell>Curso</TabelaHeaderCell>
                        <TabelaHeaderCell>Matrícula</TabelaHeaderCell>
                        <TabelaHeaderCell>Ações</TabelaHeaderCell>
                    </TabelaRow>
                </TabelaHead>
                <tbody>
                    {filtroUsuarios.map((usuario) => (
                        <TabelaRow key={usuario.id}>
                            <TabelaCell>
                                <LinkNomeUsuario
                                    onClick={() => handleUserClick(usuario.id)}
                                >
                                    {usuario.nome}
                                </LinkNomeUsuario>
                            </TabelaCell>
                            <TabelaCell>{usuario.curso}</TabelaCell>
                            <TabelaCell>{usuario.matricula}</TabelaCell>
                            <TabelaCell>
                                <BotaoEditar
                                    onClick={() => handleEditClick(usuario.id)}
                                >
                                    Editar
                                </BotaoEditar>
                            </TabelaCell>
                        </TabelaRow>
                    ))}
                </tbody>
            </Tabela>
        </TabelaWrapper>
    );
};

export default TabelaUsuarios;
