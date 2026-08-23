import React, { useEffect, useState } from 'react';
import { supabase } from './utils/supabase';
import Index from './pages/Index';
import Admin from './pages/Admin';
import Login from './pages/Login';
import VisualBuilder from './pages/VisualBuilder';
import Register from './pages/Register';

export default function App() {
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Route parameter detectors
  const isBuilderRoute = window.location.search.includes('builder=true') || window.location.href.includes('builder');
  const isAdminRoute = window.location.search.includes('admin=true');
  const isRegisterRoute = window.location.search.includes('register=true');
  const isLoginRoute = window.location.search.includes('login=true');

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
      <div className="min-h-screen flex items-center justify-center bg-slate-50 text-slate-600 font-medium text-sm">
        Loading docShare...
      </div>
    );
  }

  // 1. Visual Builder View
  if (isBuilderRoute) {
    return <VisualBuilder />;
  }

  // 2. Admin Command Center View
  if (isAdminRoute) {
    if (!session) {
      return <Login />;
    }
    return <Admin />;
  }

  // 3. docShare Onboarding / Registration Route (?register=true)
  if (isRegisterRoute) {
    return <Register />;
  }

  // 4. Login & Account Category Selection Route (?login=true)
  if (isLoginRoute) {
    return <Login />;
  }

  // 5. Default Public Homepage Route (Step 1)
  return <Index />;
}
