import { useForm } from "react-hook-form";
import React from "react";
import styled from "styled-components";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

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
    border-color: #007bff;
  }
`;

const ErrorMessage = styled.div`
  color: red;
  font-weight: 500;
`;

const RadioGroup = styled.div`
  display: flex;
  justify-content: space-between;
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
  background-color: #007bff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background-color: #0056b3;
  }
`;

const schema = z.object({
  email: z.string().email(),
  senha: z.string(),
  //Adicionar os campos conforme for necessário
});
const FormUsuario = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(schema) });

  const onSubmit = async (data) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log(data);
    } catch (error) {
      //No lugar do root, é possivel colocar qualquer campo, e mudar a mensagem de erro.
      //Exemplo
      //setError("email",{message: "Esse email já existe."})
      setError("root", { message: "Ocorreu um erro inesperado" });
    }
  };
  return (
    <FormWrapper>
      <FormTitle>Cadastrar Usuário</FormTitle>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <InputWrapper>
          <Label>Nome Completo:</Label>
          <Input
            {...register("nomeCompleto")}
            type="text"
            placeholder="Nome Completo"
          />
        </InputWrapper>

        <InputWrapper>
          <Label>Senha:</Label>
          <Input {...register("senha")} type="password" placeholder="Senha" />
          {errors.senha && <ErrorMessage>{errors.senha.message}</ErrorMessage>}
        </InputWrapper>

        <InputWrapper>
          <Label>Email:</Label>
          <Input {...register("email")} type="text" placeholder="Email" />

          {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
        </InputWrapper>

        <InputWrapper>
          <Label>Repita a Senha:</Label>
          <Input
            {...register("senha")}
            type="password"
            placeholder="Repita a senha"
          />
        </InputWrapper>
        <InputWrapper>
          <Label>Telefone</Label>
          <Input {...register("telefone")} type="text" placeholder="Telefone" />
          {errors.telefone && (
            <ErrorMessage>{errors.telefone.message}</ErrorMessage>
          )}
        </InputWrapper>

        <InputWrapper>
          <RadioGroup>
            <RadioLabel>
              <RadioInput {...register("tipo")} type="radio" value="aluno" />
              Aluno
            </RadioLabel>
            <RadioLabel>
              <RadioInput {...register("tipo")} type="radio" value="atletica" />
              Atlética
            </RadioLabel>
          </RadioGroup>
        </InputWrapper>
        <SubmitButton disabled={isSubmitting} type="submit">
          {isSubmitting ? "Carregando..." : "Cadastrar"}
        </SubmitButton>
      </Form>
    </FormWrapper>
  );
};

export default FormUsuario;
