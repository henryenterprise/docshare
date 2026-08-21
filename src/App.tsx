import React from 'react';
import Index from './pages/Index';
import Admin from './pages/Admin';

export default function App() {
  const queryParams = new URLSearchParams(window.location.search);
  const isAdmin = queryParams.get('admin') === 'true';

  return isAdmin ? <Admin /> : <Index />;
}
