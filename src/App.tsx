import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Index from './pages/Index';
import Register from './pages/Register';
import AdminPortal from './pages/Admin';

export default function App() {
  return (
    <Router>
      <nav style={{ background: '#0f172a', padding: '12px 20px', display: 'flex', gap: '20px', alignItems: 'center', fontFamily: 'sans-serif' }}>
        <span style={{ color: '#38bdf8', fontWeight: 'bold' }}>docShare App</span>
        <Link to="/" style={{ color: '#f8fafc', textDecoration: 'none', fontSize: '13px' }}>Home</Link>
        <Link to="/register" style={{ color: '#f8fafc', textDecoration: 'none', fontSize: '13px' }}>Register Portal</Link>
        <Link to="/admin" style={{ color: '#38bdf8', textDecoration: 'none', fontSize: '13px', fontWeight: 'bold' }}>⚡ Super Admin</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin" element={<AdminPortal />} />
      </Routes>
    </Router>
  );
}
