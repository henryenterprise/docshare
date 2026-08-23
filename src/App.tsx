import React, { useEffect, useState } from 'react';
import { supabase } from './utils/supabase';
import Index from './pages/Index';
import Admin from './pages/Admin';
import Login from './pages/Login';
import VisualBuilder from './pages/VisualBuilder';

export default function App() {
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);

      const isBuilderRoute = window.location.pathname.includes('/builder');
  const isAdminRoute = window.location.pathname.includes('/admin');

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        Loading...
      </div>
    );
  }

      // If user is trying to access the visual builder view via path
  if (isBuilderRoute) {
    return <VisualBuilder />;
  }


  // If user is trying to access admin view
  if (isAdminRoute) {
    if (!session) {
      return <Login />;
    }
    return <Admin />;
  }

  // Otherwise, show normal public homepage
  return <Index />;
}
