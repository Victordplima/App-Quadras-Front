import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import TelaInicioAdmin from './pages/Admin/TelaInicio';
import GlobalStyle from './GlobalStyle';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function App() {
  return (
    <Router>
      <GlobalStyle />
      <Routes>
        <Route path="/" element={<TelaInicioAdmin />} />
      </Routes>
    </Router>
  );
}

export default App;
