import React, { useState, useEffect } from 'react';
import WorkspaceManager from './components/WorkspaceManager';
import JoinWorkspace from './components/JoinWorkspace';
import SharedWorkspaceEditor from './components/SharedWorkspaceEditor';

export default function App() {
  const [view, setView] = useState('signin'); // 'signin', 'landing', 'admin', 'register', 'app'
  const [accountCategory, setAccountCategory] = useState('Individual');
  const [adminPassword, setAdminPassword] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('admin') === 'true') {
      setView('admin');
    } else if (params.get('register') === 'true') {
      setView('register');
    }
  }, []);

  const handleCategoryChange = (cat) => {
    setAccountCategory(cat);
    if (cat === 'Group' || cat === 'Corporate') {
      setView('register');
    }
  };

  const handleAdminLogin = (e) => {
    e.preventDefault();
    if (adminPassword.trim() !== '') {
      setView('admin-dashboard');
    } else {
      alert('Invalid admin credentials');
    }
  };

  // 1. SIGN-IN & LOGIN PORTAL
  if (view === 'signin') {
    return (
      <div style={{ minHeight: '100vh', background: '#f8fafc', display: 'flex', justifyContent: 'center', alignItems: 'center', fontFamily: 'sans-serif', padding: '16px' }}>
        <div style={{ background: 'white', padding: '32px', borderRadius: '24px', width: '100%', maxWidth: '420px', boxShadow: '0 10px 25px -5px rgb(0 0 0 / 0.05)', textAlign: 'center' }}>
          
          {/* Strategic App Icon Position */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginBottom: '16px' }}>
            <div style={{ background: '#4f46e5', color: 'white', width: '44px', height: '44px', display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: '12px', fontSize: '22px', boxShadow: '0 4px 10px rgba(79, 70, 229, 0.3)' }}>🛡️</div>
            <span style={{ fontSize: '18px', fontWeight: '800', color: '#0f172a', letterSpacing: '-0.025em' }}>docShare</span>
          </div>

          <h2 style={{ fontSize: '24px', fontWeight: 'bold', margin: '0 0 6px 0', color: '#0f172a' }}>Sign in to docShare</h2>
          <p style={{ fontSize: '13px', color: '#64748b', margin: '0 0 20px 0' }}>
            Access your secure workspace or <span style={{ color: '#4f46e5', cursor: 'pointer', textDecoration: 'underline' }} onClick={() => setView('register')}>register a new organization/group</span>
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px', marginBottom: '12px' }}>
            {['Individual', 'Group', 'Corporate'].map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => handleCategoryChange(cat)}
                style={{
                  padding: '10px 8px',
                  borderRadius: '12px',
                  border: accountCategory === cat ? '2px solid #4f46e5' : '1px solid #cbd5e1',
                  background: accountCategory === cat ? '#eef2ff' : 'white',
                  color: accountCategory === cat ? '#4f46e5' : '#334155',
                  fontSize: '13px',
                  fontWeight: '600',
                  cursor: 'pointer'
                }}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Select Account Category in between cards, inside Gold background frame */}
          <div style={{ background: '#fef3c7', border: '1px solid #f59e0b', padding: '10px 14px', borderRadius: '10px', textAlign: 'center', marginBottom: '20px' }}>
            <span style={{ fontSize: '12px', fontWeight: '700', textTransform: 'uppercase', color: '#b45309', letterSpacing: '0.05em' }}>
              Select Account Category: {accountCategory}
            </span>
          </div>

          <form onSubmit={(e) => { e.preventDefault(); setView('app'); }} style={{ display: 'flex', flexDirection: 'column', gap: '16px', textAlign: 'left' }}>
            <div>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', marginBottom: '6px', color: '#334155' }}>Email Address</label>
              <input type="email" placeholder="name@organization.com" value={email} onChange={(e) => setEmail(e.target.value)} style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #cbd5e1', boxSizing: 'border-box' }} required />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', marginBottom: '6px', color: '#334155' }}>Password</label>
              <input type="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #cbd5e1', boxSizing: 'border-box' }} required />
            </div>
            <button type="submit" style={{ background: '#4f46e5', color: 'white', border: 'none', padding: '14px', borderRadius: '10px', fontWeight: '600', cursor: 'pointer', width: '100%' }}>
              Sign-in
            </button>
          </form>

          <div style={{ marginTop: '20px', textAlign: 'center' }}>
            <span style={{ fontSize: '14px', color: '#64748b' }}>Don't have an account? </span>
            <span style={{ fontSize: '14px', color: '#4f46e5', fontWeight: '600', cursor: 'pointer', textDecoration: 'underline' }} onClick={() => setView('register')}>
              Sign up
            </span>
          </div>
        </div>
      </div>
    );
  }

  // 2. BUSINESS REGISTRATION & COMPLIANCE FORM
  if (view === 'register') {
    return (
      <div style={{ minHeight: '100vh', background: '#f8fafc', padding: '20px', fontFamily: 'sans-serif', color: '#0f172a', maxWidth: '600px', margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <button onClick={() => setView('signin')} style={{ padding: '8px 16px', background: '#e2e8f0', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: '500' }}>
            ← Back to Sign In
          </button>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <div style={{ background: '#4f46e5', color: 'white', width: '32px', height: '32px', display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: '8px', fontSize: '16px' }}>🛡️</div>
            <span style={{ fontSize: '15px', fontWeight: 'bold' }}>docShare</span>
          </div>
        </div>
        <div style={{ background: 'white', padding: '24px', borderRadius: '16px', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.05)' }}>
          <h2 style={{ marginTop: 0 }}>Business Registration & Compliance</h2>
          <form onSubmit={(e) => { e.preventDefault(); alert('Registration submitted!'); setView('app'); }} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', marginBottom: '6px' }}>Country *</label>
              <select style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #cbd5e1', background: 'white' }}>
                <option>Nigeria</option>
              </select>
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', marginBottom: '6px' }}>State / Province *</label>
              <input type="text" placeholder="e.g. Lagos State" style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #cbd5e1', boxSizing: 'border-box' }} required />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', marginBottom: '6px' }}>Estimated Staff / Member Scope *</label>
              <select style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #cbd5e1', background: 'white' }}>
                <option>1 - 10 members</option>
                <option>11 - 50 members</option>
                <option>51 - 200 members</option>
                <option>200+ members</option>
              </select>
            </div>
            <button type="submit" style={{ background: '#4f46e5', color: 'white', border: 'none', padding: '14px', borderRadius: '8px', fontWeight: '600', cursor: 'pointer', marginTop: '10px' }}>
              Complete Registration & Proceed
            </button>
          </form>
        </div>
      </div>
    );
  }

  // 3. ADMIN HARDCODED ROUTE (?admin=true portal)
  if (view === 'admin') {
    return (
      <div style={{ minHeight: '100vh', background: '#f1f5f9', display: 'flex', justifyContent: 'center', alignItems: 'center', fontFamily: 'sans-serif', padding: '16px' }}>
        <div style={{ background: 'white', padding: '32px', borderRadius: '20px', width: '100%', maxWidth: '400px', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)', textAlign: 'center' }}>
          <div style={{ background: '#312e81', color: 'white', width: '50px', height: '50px', display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: '12px', margin: '0 auto 16px auto', fontSize: '24px' }}>🛡️</div>
          <h2 style={{ fontSize: '24px', fontWeight: 'bold', margin: '0 0 8px 0', color: '#0f172a' }}>Admin Portal Login</h2>
          <form onSubmit={handleAdminLogin} style={{ display: 'flex', flexDirection: 'column', gap: '16px', textAlign: 'left', marginTop: '16px' }}>
            <input type="password" placeholder="Enter Admin Password" value={adminPassword} onChange={(e) => setAdminPassword(e.target.value)} style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #cbd5e1', boxSizing: 'border-box' }} required />
            <button type="submit" style={{ background: '#312e81', color: 'white', border: 'none', padding: '14px', borderRadius: '8px', fontWeight: '600', cursor: 'pointer', width: '100%' }}>Sign In to Command Center</button>
          </form>
          <button onClick={() => setView('signin')} style={{ background: 'none', border: 'none', color: '#64748b', cursor: 'pointer', marginTop: '16px', fontSize: '13px' }}>← Return to User Login</button>
        </div>
      </div>
    );
  }

  // 4. ADMIN COMMAND CENTER DASHBOARD
  if (view === 'admin-dashboard') {
    return (
      <div style={{ minHeight: '100vh', background: '#f8fafc', padding: '24px', fontFamily: 'sans-serif', color: '#0f172a' }}>
        <div style={{ background: '#0f172a', color: 'white', padding: '24px', borderRadius: '16px', marginBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
              <span style={{ background: '#334155', padding: '6px 8px', borderRadius: '8px' }}>🛡️</span>
              <h1 style={{ fontSize: '22px', margin: 0 }}>Command Center</h1>
            </div>
            <p style={{ color: '#94a3b8', margin: 0, fontSize: '13px' }}>🟢 Full System Oversight Active</p>
          </div>
          <button onClick={() => setView('signin')} style={{ background: '#334155', color: 'white', border: 'none', padding: '8px 16px', borderRadius: '6px', cursor: 'pointer', fontWeight: '500' }}>Sign Out</button>
        </div>
      </div>
    );
  }

  // 5. WORKSPACE HUB (Main App Hub)
  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif', background: '#f8fafc', minHeight: '100vh', maxWidth: '900px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ background: '#4f46e5', color: 'white', width: '36px', height: '36px', display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: '10px', fontSize: '18px' }}>🛡️</div>
          <span style={{ fontSize: '18px', fontWeight: 'bold', color: '#0f172a' }}>docShare</span>
        </div>
        <button onClick={() => setView('signin')} style={{ padding: '8px 16px', background: '#e2e8f0', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: '500' }}>
          Sign Out
        </button>
      </div>
      <div style={{ background: 'white', padding: '24px', borderRadius: '16px', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.05)' }}>
        <h2 style={{ marginTop: 0 }}>docShare Workspace Hub</h2>
        <WorkspaceManager />
        <JoinWorkspace />
        <SharedWorkspaceEditor />
      </div>
    </div>
  );
}
