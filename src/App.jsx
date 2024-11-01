import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import GlobalStyle from "./GlobalStyle";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


import PaginaParaRedirecionamentos from "./pages/PaginaParaRedirecionamentos"; // serve so para ter os botoes para redirecionar nas telas, remover depois
import TelaInicioAdmin from "./pages/Admin/TelaInicio";
import Login from "./pages/Login";
import PerfilUsuario from "./pages/Admin/PerfilUsuario";
import TelaOcorrencias from "./pages/Admin/TelaOcorrencias";
import GerenciarUsuario from "./pages/Admin/GerenciarUsuario";

function App() {
    return (
        <Router>
            <ToastContainer />
            <GlobalStyle />
            <Routes>
                <Route path="/" element={<PaginaParaRedirecionamentos />} /> {/* Remover depois */}
                <Route path="/agendamentos" element={<TelaInicioAdmin />} />
                <Route path="/login" element={<Login />} />
                <Route path="/perfil" element={<PerfilUsuario />} />
                <Route path="/ocorrencias" element={<TelaOcorrencias />} />
                <Route path="/gerenciar" element={<GerenciarUsuario />} />
            </Routes>
        </Router>
    );
}

export default App;
