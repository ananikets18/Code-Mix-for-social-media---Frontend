import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import StatusPage from './pages/StatusPage';
import './App.css';

const IS_PRODUCTION = process.env.NODE_ENV === 'production';

if (IS_PRODUCTION && window.location.protocol === 'http:') {
  window.location.href = window.location.href.replace('http:', 'https:');
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/status" element={<StatusPage />} />
      </Routes>
    </Router>
  );
}

export default App;

