import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import GlobalStyle from './GlobalStyle';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import TelaInicioAdmin from './pages/Admin/TelaInicio';
import Login from './pages/Login';

function App() {
  return (
    <Router>
      <GlobalStyle />
      <Routes>
        <Route path="/" element={<TelaInicioAdmin />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
