import React, { useEffect, useState } from 'react';
import { supabase } from './utils/supabase';
import Index from './pages/Index';
import Admin from './pages/Admin';
import Login from './pages/Login';

export default function App() {
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const queryParams = new URLSearchParams(window.location.search);
  const isAdminRoute = queryParams.get('admin') === 'true';

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
      <div className="min-h-screen flex items-center justify-center bg-slate-50 text-slate-600">
        Loading...
      </div>
    );
  }

  // If user is trying to access admin view
  if (isAdminRoute) {
    // If not authenticated, show the Supabase Login screen
    if (!session) {
      return <Login />;
    }
    // If authenticated, show the Admin Dashboard
    return <Admin />;
  }

  // Otherwise, show normal public homepage
  return <Index />;
}
