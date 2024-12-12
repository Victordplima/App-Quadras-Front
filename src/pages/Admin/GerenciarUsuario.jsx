import React from "react";
import Header from "../../components/Admin/Header";
import FormUsuario from "../../components/Admin/FormUsuario";
import TabelaUsuarios from "../../components/Admin/TabelaUsuarios";


const GerenciarUsuario = () => {
    return (
        <>
            <Header />
            <FormUsuario />
            <TabelaUsuarios />
        </>
    );
};

export default GerenciarUsuario;
