import { useForm } from "react-hook-form";
import React from "react";
import styled from "styled-components";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { cadastrarUsuario } from "../../api/usuario";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const FormWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

const FormTitle = styled.h1`
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 20px;
`;

const Form = styled.form`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 30px;
    width: 100%;
    max-width: 600px;
`;

const InputWrapper = styled.div`
    display: flex;
    flex-direction: column;
`;

const Label = styled.label`
    font-size: 16px;
    margin-bottom: 8px;
`;

const Input = styled.input`
    padding: 10px;
    font-size: 14px;
    border: 1px solid #ccc;
    border-radius: 4px;
    outline: none;
    &:focus {
        border-color: #1e99c0;
    }
`;

const ErrorMessage = styled.div`
    color: red;
    font-weight: 500;
`;

const RadioGroup = styled.div`
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    grid-column: span 2;
`;

const RadioLabel = styled.label`
    display: flex;
    align-items: center;
    font-size: 16px;
`;

const RadioInput = styled.input`
    margin-right: 10px;
`;

const SubmitButton = styled.button`
    grid-column: span 2;
    padding: 10px 20px;
    font-size: 16px;
    color: #fff;
    background-color: #1e99c0;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    &:hover {
        background-color: #0056b3;
    }
`;

const schema = z.object({
    nome: z.string().min(1, "Nome é obrigatório"),
    email: z.string().email("Email inválido"),
    senha: z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
    telefone: z.string().min(8, "Telefone inválido"),
    matricula: z.string().min(5, "Matrícula inválida"),
    curso: z.string().min(3, "Curso é obrigatório"),
    role: z.enum(["aluno", "atletica", "admin"]),
});

const FormUsuario = () => {
    const {
        register,
        handleSubmit,
        setError,
        formState: { errors, isSubmitting },
    } = useForm({
        resolver: zodResolver(schema),
    });

    const onSubmit = async (data) => {
        try {
            const response = await cadastrarUsuario(data);
            toast.success("Usuário cadastrado com sucesso!");
            console.log("Usuário cadastrado:", response);
        } catch (error) {
            setError("root", { message: error.message });
        }
    };

    return (
        <FormWrapper>
            <FormTitle>Cadastrar Usuário</FormTitle>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <InputWrapper>
                    <Label>Nome:</Label>
                    <Input
                        {...register("nome")}
                        type="text"
                        placeholder="Nome Completo"
                    />
                    {errors.nome && (
                        <ErrorMessage>{errors.nome.message}</ErrorMessage>
                    )}
                </InputWrapper>

                <InputWrapper>
                    <Label>Email:</Label>
                    <Input
                        {...register("email")}
                        type="email"
                        placeholder="Email"
                    />
                    {errors.email && (
                        <ErrorMessage>{errors.email.message}</ErrorMessage>
                    )}
                </InputWrapper>

                <InputWrapper>
                    <Label>Senha:</Label>
                    <Input
                        {...register("senha")}
                        type="password"
                        placeholder="Senha"
                    />
                    {errors.senha && (
                        <ErrorMessage>{errors.senha.message}</ErrorMessage>
                    )}
                </InputWrapper>

                <InputWrapper>
                    <Label>Telefone:</Label>
                    <Input
                        {...register("telefone")}
                        type="text"
                        placeholder="Telefone"
                    />
                    {errors.telefone && (
                        <ErrorMessage>{errors.telefone.message}</ErrorMessage>
                    )}
                </InputWrapper>

                <InputWrapper>
                    <Label>Matrícula:</Label>
                    <Input
                        {...register("matricula")}
                        type="text"
                        placeholder="Matrícula"
                    />
                    {errors.matricula && (
                        <ErrorMessage>{errors.matricula.message}</ErrorMessage>
                    )}
                </InputWrapper>

                <InputWrapper>
                    <Label>Curso:</Label>
                    <Input
                        {...register("curso")}
                        type="text"
                        placeholder="Curso"
                    />
                    {errors.curso && (
                        <ErrorMessage>{errors.curso.message}</ErrorMessage>
                    )}
                </InputWrapper>

                <RadioGroup>
                    <RadioLabel>
                        <RadioInput
                            {...register("role")}
                            type="radio"
                            value="aluno"
                        />
                        Aluno
                    </RadioLabel>
                    <RadioLabel>
                        <RadioInput
                            {...register("role")}
                            type="radio"
                            value="atletica"
                        />
                        Atlética
                    </RadioLabel>
                    {errors.role && (
                        <ErrorMessage>{errors.role.message}</ErrorMessage>
                    )}
                </RadioGroup>

                <SubmitButton disabled={isSubmitting} type="submit">
                    {isSubmitting ? "Carregando..." : "Cadastrar"}
                </SubmitButton>
            </Form>
        </FormWrapper>
    );
};

export default FormUsuario;
