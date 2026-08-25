import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import AdminPortal from './pages/Admin';
import Index from './pages/Index';
// KEEP YOUR SUPABASE CONFIG HERE IF IT WAS HERE:
// import { createClient } from '@supabase/supabase-js';
// export const supabase = createClient(...);

export default function App() {
  return (
    <Router>
      {/* Global Navigation Bar */}
      <nav style={{ background: '#0f172a', padding: '12px 20px', display: 'flex', gap: '20px', alignItems: 'center', fontFamily: 'sans-serif' }}>
        <span style={{ color: '#38bdf8', fontWeight: 'bold' }}>docShare App</span>
        <Link to="/" style={{ color: '#f8fafc', textDecoration: 'none', fontSize: '13px' }}>Home</Link>
        <Link to="/login" style={{ color: '#f8fafc', textDecoration: 'none', fontSize: '13px' }}>Sign In</Link>
        <Link to="/register" style={{ color: '#f8fafc', textDecoration: 'none', fontSize: '13px' }}>Register</Link>
        <Link to="/admin" style={{ color: '#38bdf8', textDecoration: 'none', fontSize: '13px', fontWeight: 'bold' }}>⚡ Super Admin</Link>
      </nav>

      {/* Your Existing Routes & Components */}
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin" element={<AdminPortal />} />
      </Routes>
    </Router>
  );
}
