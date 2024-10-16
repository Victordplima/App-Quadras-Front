import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import GlobalStyle from "./GlobalStyle";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import TelaInicioAdmin from "./pages/Admin/TelaInicio";
import Login from "./pages/Login";
import PerfilUsuario from "./pages/Admin/PerfilUsuario";
import TelaOcorrencias from "./pages/Admin/TelaOcorrencias";
import GerenciarUsuario from "./pages/Admin/GerenciarUsuario";

function App() {
  return (
    <Router>
      <GlobalStyle />
      <Routes>
        <Route path="/" element={<TelaInicioAdmin />} />
        <Route path="/login" element={<Login />} />
        <Route path="/perfil" element={<PerfilUsuario />} />
        <Route path="/ocorrencias" element={<TelaOcorrencias />} />
        <Route path="/gerenciar" element={<GerenciarUsuario />} />
      </Routes>
    </Router>
  );
}

export default App;
