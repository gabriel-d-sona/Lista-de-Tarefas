import React from 'react';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import CriacaoTarefa from './pages/CriacaoItem';
import PaginaPrincipal from './pages/PaginaPrincipal';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PaginaPrincipal />} />
        <Route path="/criacao-de-tarefa" element={<CriacaoTarefa />} />
      </Routes>
    </Router>
  );
}

export default App;
