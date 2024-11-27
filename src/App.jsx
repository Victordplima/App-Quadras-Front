import React from "react";
import {
    BrowserRouter as Router,
    Route,
    Routes,
    Navigate,
} from "react-router-dom";
import GlobalStyle from "./GlobalStyle";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// admin
import TelaInicioAdmin from "./pages/Admin/TelaInicio";
import Login from "./pages/Login";
import PerfilUsuario from "./pages/Admin/PerfilUsuario";
import TelaOcorrencias from "./pages/Admin/TelaOcorrencias";
import GerenciarUsuario from "./pages/Admin/GerenciarUsuario";

// alunos e atléticas
import Agendar from "./pages/Alunos/Agendamento";
import FAQ from "./pages/Alunos/FAQ";
import HistoricoAgendamentos from "./pages/Alunos/HistoricoAgendamentos";

// supervisão
import SupervisaoAgendamentos from "./pages/Supervisao/SupervisaoAgendamentos";

import { useAuth } from "./context/AuthContext"; // Importando o contexto de autenticação

function App() {
    const { user } = useAuth(); // Usando o contexto de autenticação

    return (
        <Router>
            <ToastContainer />
            <GlobalStyle />
            <Routes>
                {/* Redirecionamento baseado no role do usuário */}
                <Route
                    path="/"
                    element={
                        user ? (
                            user.role === "admin" ? (
                                <Navigate to="/agendamentos" />
                            ) : user.role === "aluno" ||
                              user.role === "atletica" ? (
                                <Navigate to="/agendar" />
                            ) : user.role === "supervisao" ? (
                                <Navigate to="/supervisao/agendamentos" />
                            ) : (
                                <Navigate to="/login" />
                            )
                        ) : (
                            <Navigate to="/login" />
                        )
                    }
                />

                {/* Admin Routes */}
                <Route
                    path="/agendamentos"
                    element={
                        user?.role === "admin" ? (
                            <TelaInicioAdmin />
                        ) : (
                            <Navigate to="/" />
                        )
                    }
                />
                <Route path="/login" element={<Login />} />
                <Route
                    path="/ocorrencias"
                    element={
                        user?.role === "admin" ? (
                            <TelaOcorrencias />
                        ) : (
                            <Navigate to="/" />
                        )
                    }
                />
                <Route
                    path="/gerenciar"
                    element={
                        user?.role === "admin" ? (
                            <GerenciarUsuario />
                        ) : (
                            <Navigate to="/" />
                        )
                    }
                />
                <Route
                    path="/perfil/:userId"
                    element={
                        user?.role === "admin" ? (
                            <PerfilUsuario />
                        ) : (
                            <Navigate to="/" />
                        )
                    }
                />

                {/* Alunos e Atléticas Routes */}
                <Route
                    path="/agendar"
                    element={
                        user?.role === "aluno" || user?.role === "atletica" ? (
                            <Agendar />
                        ) : (
                            <Navigate to="/" />
                        )
                    }
                />
                <Route
                    path="/faq"
                    element={
                        user?.role === "aluno" || user?.role === "atletica" ? (
                            <FAQ />
                        ) : (
                            <Navigate to="/" />
                        )
                    }
                />
                <Route
                    path="/historico"
                    element={
                        user?.role === "aluno" || user?.role === "atletica" ? (
                            <HistoricoAgendamentos />
                        ) : (
                            <Navigate to="/" />
                        )
                    }
                />

                {/* Supervisão Routes */}
                <Route
                    path="/supervisao/agendamentos"
                    element={
                        user?.role === "supervisao" ? (
                            <SupervisaoAgendamentos />
                        ) : (
                            <Navigate to="/" />
                        )
                    }
                />
            </Routes>
        </Router>
    );
}

export default App;
