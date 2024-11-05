import React from "react";
import styled from "styled-components";
import Modal from "react-modal";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { editarUsuario, removerUsuario } from "../../api/usuario";

const ModalContent = styled.div`
    padding: 20px;
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
    max-width: 400px;
    width: 100%;
    margin: 0 auto;
`;

const Title = styled.h2`
    margin-bottom: 20px;
    font-size: 20px;
    color: #333;
    text-align: center;
`;

const Label = styled.label`
    margin-top: 10px;
    font-weight: bold;
    color: #555;
    display: block;
`;

const Input = styled.input`
    width: 100%;
    padding: 10px;
    margin-top: 5px;
    margin-bottom: 15px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 14px;
    &:focus {
        border-color: #28a745;
        outline: none;
    }
`;

const Select = styled.select`
    width: 100%;
    padding: 10px;
    margin-top: 5px;
    margin-bottom: 15px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 14px;
    &:focus {
        border-color: #28a745;
        outline: none;
    }
`;

const BotaoSalvar = styled.button`
    padding: 10px 15px;
    font-size: 16px;
    color: #fff;
    background-color: #28a745;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    width: 100%;
    transition: background-color 0.3s;
    &:hover {
        background-color: #218838;
    }
`;

const BotaoRemover = styled.button`
    padding: 10px 15px;
    margin-top: 10px;
    font-size: 16px;
    color: #fff;
    background-color: #dc3545;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    width: 100%;
    transition: background-color 0.3s;
    &:hover {
        background-color: #c82333;
    }
`;

Modal.setAppElement("#root");

const ModalEditarUsuario = ({
    isOpen,
    onClose,
    usuario,
    onUsuarioAtualizado,
}) => {
    const [usuarioEditando, setUsuarioEditando] = React.useState(usuario);

    React.useEffect(() => {
        setUsuarioEditando(usuario);
    }, [usuario]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUsuarioEditando((prev) => ({ ...prev, [name]: value }));
    };

    const handleSave = async () => {
        try {
            await editarUsuario(usuarioEditando.id, usuarioEditando);
            toast.success("Usuário atualizado com sucesso!");
            onUsuarioAtualizado();
            onClose();
        } catch (error) {
            toast.error("Erro ao atualizar usuário.");
        }
    };

    const handleRemove = async () => {
        if (window.confirm("Tem certeza que deseja remover este usuário?")) {
            try {
                await removerUsuario(usuarioEditando.id);
                toast.success("Usuário removido com sucesso!");
                onUsuarioAtualizado();
                onClose();
            } catch (error) {
                toast.error("Erro ao remover usuário.");
            }
        }
    };

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onClose}
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
                <Title>Editar Usuário</Title>
                <Label>Nome</Label>
                <Input
                    type="text"
                    name="nome"
                    value={usuarioEditando?.nome || ""}
                    onChange={handleInputChange}
                />
                <Label>Email</Label>
                <Input
                    type="email"
                    name="email"
                    value={usuarioEditando?.email || ""}
                    onChange={handleInputChange}
                />
                <Label>Telefone</Label>
                <Input
                    type="text"
                    name="telefone"
                    value={usuarioEditando?.telefone || ""}
                    onChange={handleInputChange}
                />
                <Label>Matrícula</Label>
                <Input
                    type="text"
                    name="matricula"
                    value={usuarioEditando?.matricula || ""}
                    onChange={handleInputChange}
                />
                <Label>Curso</Label>
                <Input
                    type="text"
                    name="curso"
                    value={usuarioEditando?.curso || ""}
                    onChange={handleInputChange}
                />
                <Label>Role</Label>
                <Select
                    name="role"
                    value={usuarioEditando?.role || ""}
                    onChange={handleInputChange}
                >
                    <option value="aluno">Aluno</option>
                    <option value="atletica">Atlética</option>
                    <option value="admin">Admin</option>
                    <option value="supervisao">Supervisão</option>
                </Select>

                <BotaoSalvar onClick={handleSave}>Salvar</BotaoSalvar>
                <BotaoRemover onClick={handleRemove}>
                    Remover Usuário
                </BotaoRemover>
            </ModalContent>
        </Modal>
    );
};

export default ModalEditarUsuario;
