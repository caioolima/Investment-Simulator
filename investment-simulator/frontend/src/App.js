import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { theme } from './theme';
import HomePage from './pages/Home/HomePage';
import SimulatorPage from './pages/Simulator/SimulatorPage';
import StockTable from './pages/Stock/StockTable.js';
import Navbar from './components/NavBar/Navbar';
import HistoryPage from './pages/History/HistoryPage';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/simulator" element={<SimulatorPage />} />
          <Route path="/reports" element={<StockTable />} />
          <Route path="/history" element={<HistoryPage />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
