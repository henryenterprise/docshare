import React, { useState, useEffect, useRef } from 'react';

// Fallback components
const DefaultWorkspaceManager = () => (
  <div style={{ padding: '12px', background: '#f8fafc', borderRadius: '8px', marginBottom: '12px', border: '1px solid #e2e8f0' }}>
    <h4 style={{ margin: '0 0 4px 0', color: '#1e293b', fontSize: '13px' }}>Workspace Manager</h4>
    <p style={{ fontSize: '12px', color: '#64748b', margin: 0 }}>Manage your active workspaces, permissions, and settings here.</p>
  </div>
);

let WorkspaceManager = DefaultWorkspaceManager;
try {
  WorkspaceManager = require('./components/WorkspaceManager').default || DefaultWorkspaceManager;
} catch (e) { /* fallback active */ }

export default function App() {
  const [view, setView] = useState('signin'); // 'signin', 'register', 'dashboard', 'admin', 'admin-dashboard'
  const [accountCategory, setAccountCategory] = useState('Individual'); // 'Individual', 'Group', 'Corporate'
  const [signupChoiceModal, setSignupChoiceModal] = useState(false);
  
  // Credentials & Inputs
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [adminPassword, setAdminPassword] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  // Dropdown & Menu Toggles
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [hamburgerMenuOpen, setHamburgerMenuOpen] = useState(false);
  const [activeFileMenu, setActiveFileMenu] = useState(null); // index of file showing context menu
  const [shareModalFile, setShareModalFile] = useState(null);

  // Registration states
  const [regEmail, setRegEmail] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [regFirstName, setRegFirstName] = useState('');
  const [regLastName, setRegLastName] = useState('');
  const [regPosition, setRegPosition] = useState('');
  const [selectedOrg, setSelectedOrg] = useState('');
  const [specialId, setSpecialId] = useState('');
  const [reviewBanner, setReviewBanner] = useState(false);

  // Mock Files Data for Dashboard
  const [files, setFiles] = useState([
    { id: 1, title: 'Untitled document', updated: '2 hrs ago', type: 'doc' },
    { id: 2, title: 'NDDICL MINUTES', updated: 'Yesterday', type: 'pdf' },
    { id: 3, title: 'NDDICL CONS MAIN', updated: '3 days ago', type: 'doc' },
    { id: 4, title: 'CONSTITUTION OF TH...', updated: 'Aug 20, 2026', type: 'doc' },
    { id: 5, title: 'PROJECT GROUP 12...', updated: 'Aug 18, 2026', type: 'pdf' },
    { id: 6, title: 'DAILY MEDIA PRE...', updated: 'Aug 15, 2026', type: 'doc' },
  ]);

  // Click-outside handler refs
  const profileRef = useRef(null);
  const hamburgerRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfileDropdownOpen(false);
      }
      if (hamburgerRef.current && !hamburgerRef.current.contains(event.target)) {
        setHamburgerMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('admin') === 'true') {
      setView('admin');
    }
  }, []);

  const handleSignIn = (e) => {
    e.preventDefault();
    // Simulate authentication logic
    if (email && password) {
      if (email.includes('error')) {
        // Fail sign-in: retain credentials imputed
        alert('Sign-in failed. Please check your credentials.');
      } else {
        // Successful sign-in: clear credentials on the form
        setEmail('');
        setPassword('');
        setView('dashboard');
      }
    }
  };

  const handleRegistrationSubmit = (e) => {
    e.preventDefault();
    if (accountCategory !== 'Individual') {
      setReviewBanner(true);
    } else {
      setView('dashboard');
    }
  };

  const SocialFooterIcons = () => (
    <div style={{ display: 'flex', justifyContent: 'center', gap: '14px', marginTop: '16px', fontSize: '18px' }}>
      <span title="Facebook" style={{ cursor: 'pointer' }} onClick={() => window.open('https://facebook.com', '_blank')}>📘</span>
      <span title="WhatsApp" style={{ cursor: 'pointer' }} onClick={() => window.open('https://whatsapp.com', '_blank')}>💚</span>
      <span title="Telegram" style={{ cursor: 'pointer' }} onClick={() => window.open('https://telegram.org', '_blank')}>✈️</span>
      <span title="Google Drive" style={{ cursor: 'pointer' }} onClick={() => window.open('https://drive.google.com', '_blank')}>📁</span>
      <span title="TikTok" style={{ cursor: 'pointer' }} onClick={() => window.open('https://tiktok.com', '_blank')}>🎵</span>
    </div>
  );

  const SocialFooter = () => (
    <div style={{ marginTop: '20px', paddingTop: '12px', borderTop: '1px solid #e2e8f0', textAlign: 'center' }}>
      <p style={{ fontSize: '11px', color: '#94a3b8', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Connect with docShare</p>
      <SocialFooterIcons />
    </div>
  );

  // 1. SIGN-IN PORTAL
  if (view === 'signin') {
    return (
      <div style={{ minHeight: '100vh', background: '#f8fafc', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', fontFamily: 'sans-serif', padding: '16px' }}>
        <div style={{ background: 'white', padding: '28px', borderRadius: '24px', width: '100%', maxWidth: '400px', boxShadow: '0 10px 25px -5px rgb(0 0 0 / 0.05)', textAlign: 'center', position: 'relative' }}>
          
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginBottom: '12px' }}>
            <div style={{ background: '#4f46e5', color: 'white', width: '40px', height: '40px', display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: '12px', fontSize: '20px' }}>🛡️</div>
            <span style={{ fontSize: '18px', fontWeight: '800', color: '#0f172a' }}>docShare</span>
          </div>

          <h2 style={{ fontSize: '22px', fontWeight: 'bold', margin: '0 0 4px 0', color: '#0f172a' }}>Sign in to docShare</h2>
          <p style={{ fontSize: '13px', color: '#64748b', margin: '0 0 16px 0' }}>Access your secure workspace</p>

          <form onSubmit={handleSignIn} style={{ display: 'flex', flexDirection: 'column', gap: '14px', textAlign: 'left' }}>
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '500', marginBottom: '4px', color: '#334155' }}>Email Address</label>
              <input type="email" placeholder="name@organization.com" value={email} onChange={(e) => setEmail(e.target.value)} style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', boxSizing: 'border-box' }} required />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '500', marginBottom: '4px', color: '#334155' }}>Password</label>
              <input type="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', boxSizing: 'border-box' }} required />
            </div>

            <button type="submit" style={{ background: '#4f46e5', color: 'white', border: 'none', padding: '12px', borderRadius: '10px', fontWeight: '600', cursor: 'pointer', width: '100%' }}>
              Sign-in
            </button>
          </form>

          {/* "Forgot Password" button under Sign-in frame */}
          <div style={{ marginTop: '10px', textAlign: 'center' }}>
            <button onClick={() => alert('Password reset instructions sent to your email.')} style={{ background: 'none', border: 'none', color: '#4f46e5', fontSize: '13px', cursor: 'pointer', fontWeight: '500' }}>
              Forgot Password?
            </button>
          </div>

          <div style={{ marginTop: '16px', textAlign: 'center' }}>
            <span style={{ fontSize: '13px', color: '#64748b' }}>Don't have an account? </span>
            <span style={{ fontSize: '13px', color: '#4f46e5', fontWeight: '600', cursor: 'pointer', textDecoration: 'underline' }} onClick={() => setSignupChoiceModal(true)}>
              Sign up
            </span>
          </div>

          <SocialFooter />
        </div>

        {/* Signup Choice Popup Modal */}
        {signupChoiceModal && (
          <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 100, padding: '16px' }}>
            <div style={{ background: 'white', padding: '24px', borderRadius: '16px', width: '100%', maxWidth: '360px', textAlign: 'center' }}>
              <h3 style={{ margin: '0 0 8px 0', fontSize: '18px' }}>Choose Account Type</h3>
              <p style={{ fontSize: '13px', color: '#64748b', marginBottom: '20px' }}>Select the category that fits your onboarding requirements.</p>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <button onClick={() => { setAccountCategory('Individual'); setSignupChoiceModal(false); setView('register'); }} style={{ padding: '12px', background: '#eef2ff', color: '#4f46e5', border: '1px solid #c7d2fe', borderRadius: '8px', fontWeight: '600', cursor: 'pointer' }}>
                  Individual Account
                </button>
                <button onClick={() => { setAccountCategory('Group'); setSignupChoiceModal(false); setView('register'); }} style={{ padding: '12px', background: '#f0fdf4', color: '#16a34a', border: '1px solid #bbf7d0', borderRadius: '8px', fontWeight: '600', cursor: 'pointer' }}>
                  Group or Organization Account
                </button>
                <button onClick={() => setSignupChoiceModal(false)} style={{ padding: '8px', background: 'none', border: 'none', color: '#64748b', cursor: 'pointer', marginTop: '6px' }}>
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  // 2. REGISTRATION PAGE
  if (view === 'register') {
    return (
      <div style={{ minHeight: '100vh', background: '#fdfbf7', padding: '20px', fontFamily: 'sans-serif', maxWidth: '600px', margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <button onClick={() => setView('signin')} style={{ padding: '6px 12px', background: '#e2e8f0', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '13px' }}>
            ← Back
          </button>
          <span style={{ fontSize: '14px', fontWeight: 'bold' }}>docShare Registration ({accountCategory})</span>
        </div>

        <div style={{ background: 'white', padding: '24px', borderRadius: '16px', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.05)' }}>
          <h2 style={{ marginTop: 0, fontSize: '18px' }}>Complete Registration</h2>
          
          {/* Group / Organization Selection Dropdown & Special ID */}
          {accountCategory === 'Group' && (
            <div style={{ background: '#f8fafc', padding: '14px', borderRadius: '8px', marginBottom: '16px', border: '1px solid #e2e8f0' }}>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', marginBottom: '6px' }}>Select Group or Organization Name *</label>
              <select value={selectedOrg} onChange={(e) => setSelectedOrg(e.target.value)} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1', marginBottom: '12px', background: 'white' }}>
                <option value="">-- Choose Organization --</option>
                <option value="NDDICL Global">NDDICL Global</option>
                <option value="NextGen Skills Network">NextGen Skills Network</option>
                <option value="Apex Telecoms & Tech">Apex Telecoms & Tech</option>
              </select>

              {selectedOrg && (
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', marginBottom: '6px' }}>Special ID (Generated by Admin) *</label>
                  <input type="text" placeholder="Enter organization special ID" value={specialId} onChange={(e) => setSpecialId(e.target.value)} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1', boxSizing: 'border-box' }} required />
                </div>
              )}
            </div>
          )}

          <form onSubmit={handleRegistrationSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: '500', marginBottom: '4px' }}>First Name *</label>
                <input type="text" value={regFirstName} onChange={(e) => setRegFirstName(e.target.value)} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1', boxSizing: 'border-box' }} required />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: '500', marginBottom: '4px' }}>Last Name *</label>
                <input type="text" value={regLastName} onChange={(e) => setRegLastName(e.target.value)} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1', boxSizing: 'border-box' }} required />
              </div>
            </div>

            {/* Position field added for Group / Organization sign up */}
            {accountCategory === 'Group' && (
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: '500', marginBottom: '4px' }}>Position / Role *</label>
                <input type="text" placeholder="e.g. Senior Communications Lead / Staff" value={regPosition} onChange={(e) => setRegPosition(e.target.value)} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1', boxSizing: 'border-box' }} required />
              </div>
            )}

            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: '500', marginBottom: '4px' }}>Email Address *</label>
              <input type="email" value={regEmail} onChange={(e) => setRegEmail(e.target.value)} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1', boxSizing: 'border-box' }} required />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: '500', marginBottom: '4px' }}>Phone Number *</label>
              <input type="tel" value={regPhone} onChange={(e) => setRegPhone(e.target.value)} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1', boxSizing: 'border-box' }} required />
            </div>

            {reviewBanner && (
              <div style={{ background: '#fef3c7', border: '1px solid #f59e0b', padding: '12px', borderRadius: '8px', fontSize: '12px', color: '#92400e' }}>
                <strong>Account Under Review:</strong> Your submission is currently under review. Once reviewed and approved, your workspace title will automatically update to your organization's name!
              </div>
            )}

            {!reviewBanner ? (
              <button type="submit" style={{ background: '#4f46e5', color: 'white', border: 'none', padding: '12px', borderRadius: '8px', fontWeight: '600', cursor: 'pointer', marginTop: '10px' }}>
                Complete Registration →
              </button>
            ) : (
              <button type="button" onClick={() => setView('dashboard')} style={{ background: '#d97706', color: 'white', border: 'none', padding: '12px', borderRadius: '8px', fontWeight: '600', cursor: 'pointer', marginTop: '10px' }}>
                Proceed to Dashboard Sandbox →
              </button>
            )}
          </form>

          <SocialFooter />
        </div>
      </div>
    );
  }

  // 3. ADMIN PORTAL LOGIN
  if (view === 'admin') {
    return (
      <div style={{ minHeight: '100vh', background: '#f1f5f9', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '16px' }}>
        <div style={{ background: 'white', padding: '28px', borderRadius: '20px', width: '100%', maxWidth: '380px', textAlign: 'center' }}>
          <h3>Admin Portal</h3>
          <form onSubmit={(e) => { e.preventDefault(); if(adminPassword) setView('admin-dashboard'); }} style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '14px' }}>
            <input type="password" placeholder="Admin Master Password" value={adminPassword} onChange={(e) => setAdminPassword(e.target.value)} style={{ padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1' }} required />
            <button type="submit" style={{ background: '#312e81', color: 'white', border: 'none', padding: '12px', borderRadius: '8px', fontWeight: '600', cursor: 'pointer' }}>Access Admin Suite</button>
          </form>
          <button onClick={() => setView('signin')} style={{ background: 'none', border: 'none', color: '#64748b', cursor: 'pointer', marginTop: '14px', fontSize: '12px' }}>← Return</button>
        </div>
      </div>
    );
  }

  // 4. MAIN DASHBOARD
  return (
    <div style={{ minHeight: '100vh', background: '#f8fafc', fontFamily: 'sans-serif', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', position: 'relative' }}>
      
      <div>
        {/* TOP NAVIGATION BAR */}
        <div style={{ background: 'white', borderBottom: '1px solid #e2e8f0', padding: '10px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '8px' }}>
          
          {/* Left 3 lines hamburger menu with outside-click ref */}
          <div style={{ position: 'relative' }} ref={hamburgerRef}>
            <button onClick={() => setHamburgerMenuOpen(!hamburgerMenuOpen)} style={{ background: 'none', border: '1px solid #cbd5e1', borderRadius: '8px', padding: '8px 10px', cursor: 'pointer', display: 'flex', flexDirection: 'column', gap: '3px', justifyContent: 'center' }}>
              <div style={{ width: '16px', height: '2px', background: '#0f172a' }}></div>
              <div style={{ width: '16px', height: '2px', background: '#0f172a' }}></div>
              <div style={{ width: '16px', height: '2px', background: '#0f172a' }}></div>
            </button>

            {hamburgerMenuOpen && (
              <div style={{ position: 'absolute', top: '42px', left: 0, background: 'white', border: '1px solid #e2e8f0', borderRadius: '12px', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)', width: '220px', zIndex: 50, padding: '8px 0' }}>
                <div onClick={() => { setView('dashboard'); setHamburgerMenuOpen(false); }} style={{ padding: '10px 16px', fontSize: '13px', cursor: 'pointer', fontWeight: '600', color: '#4f46e5' }}>🏠 Homepage</div>
                <div onClick={() => { alert('Workspace Manager'); setHamburgerMenuOpen(false); }} style={{ padding: '10px 16px', fontSize: '13px', cursor: 'pointer', color: '#334155' }}>📁 Workspace Manager</div>
                <div onClick={() => { alert('Media & Camera Hub'); setHamburgerMenuOpen(false); }} style={{ padding: '10px 16px', fontSize: '13px', cursor: 'pointer', color: '#334155' }}>📷 Media & Camera Hub</div>
                <div onClick={() => { alert('Compliance Logs'); setHamburgerMenuOpen(false); }} style={{ padding: '10px 16px', fontSize: '13px', cursor: 'pointer', color: '#334155' }}>📊 Compliance Records</div>
              </div>
            )}
          </div>

          {/* Search bar positioned right beside the Profile icon area */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flex: 1, maxWidth: '420px' }}>
            <div style={{ position: 'relative', width: '100%' }}>
              <span style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', fontSize: '14px' }}>🔍</span>
              <input 
                type="text" 
                placeholder="Search Docs" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{ width: '100%', padding: '8px 12px 8px 36px', borderRadius: '20px', border: '1px solid #cbd5e1', background: '#f8fafc', fontSize: '13px', boxSizing: 'border-box' }} 
              />
            </div>
            <span style={{ fontSize: '18px', cursor: 'pointer' }} title="Doc Drawer">📁</span>
          </div>

          {/* Profile Icon with Dropdown symbol & outside-click ref */}
          <div style={{ position: 'relative' }} ref={profileRef}>
            <div onClick={() => setProfileDropdownOpen(!profileDropdownOpen)} style={{ display: 'flex', alignItems: 'center', gap: '4px', cursor: 'pointer', background: '#f1f5f9', padding: '4px 8px', borderRadius: '20px', border: '1px solid #cbd5e1' }}>
              <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: '#4f46e5', color: 'white', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '12px', fontWeight: 'bold' }}>C</div>
              <span style={{ fontSize: '12px', color: '#0f172a', fontWeight: 'bold' }}>▼</span>
            </div>

            {profileDropdownOpen && (
              <div style={{ position: 'absolute', top: '42px', right: 0, background: 'white', border: '1px solid #e2e8f0', borderRadius: '12px', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)', width: '180px', zIndex: 50, padding: '6px 0' }}>
                <div onClick={() => { alert('My Profile'); setProfileDropdownOpen(false); }} style={{ padding: '8px 14px', fontSize: '12px', cursor: 'pointer', color: '#334155' }}>My Profile</div>
                <div onClick={() => { alert('Collaboration'); setProfileDropdownOpen(false); }} style={{ padding: '8px 14px', fontSize: '12px', cursor: 'pointer', color: '#334155' }}>Collaboration</div>
                <div onClick={() => { alert('My Contacts'); setProfileDropdownOpen(false); }} style={{ padding: '8px 14px', fontSize: '12px', cursor: 'pointer', color: '#334155' }}>My Contacts</div>
                <div onClick={() => { alert('Shared Docs'); setProfileDropdownOpen(false); }} style={{ padding: '8px 14px', fontSize: '12px', cursor: 'pointer', color: '#334155' }}>Shared Docs</div>
                <div onClick={() => { alert('Settings'); setProfileDropdownOpen(false); }} style={{ padding: '8px 14px', fontSize: '12px', cursor: 'pointer', color: '#334155' }}>Settings</div>
                <div style={{ borderTop: '1px solid #f1f5f9', margin: '4px 0' }}></div>
                <div onClick={() => setView('signin')} style={{ padding: '8px 14px', fontSize: '12px', cursor: 'pointer', color: '#dc2626', fontWeight: '600' }}>Logout</div>
              </div>
            )}
          </div>

        </div>

        {/* WORKSPACE HEADER & EMBOSSED GOLD FRAME */}
        <div style={{ padding: '16px 16px 8px 16px', maxWidth: '900px', margin: '0 auto' }}>
          
          <div style={{ 
            background: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)', 
            border: '2px solid #d97706', 
            borderRadius: '12px', 
            padding: '12px 16px', 
            textAlign: 'center', 
            boxShadow: 'inset 0 2px 4px rgba(255,255,255,0.6), 0 4px 6px rgba(0,0,0,0.05)',
            marginBottom: '16px'
          }}>
            <h1 style={{ margin: 0, fontSize: '18px', fontWeight: '800', color: '#78350f', letterSpacing: '0.025em', textTransform: 'uppercase' }}>
              {selectedOrg ? `${selectedOrg} - Admin Workspace` : 'User Workspace'}
            </h1>
            {accountCategory === 'Group' && (
              <p style={{ margin: '4px 0 0 0', fontSize: '11px', color: '#92400e', fontWeight: '600' }}>
                Admin & Staff Protocol Management Active
              </p>
            )}
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <span style={{ fontSize: '13px', fontWeight: '600', color: '#334155' }}>Last opened by me ↓</span>
            <span style={{ fontSize: '16px', cursor: 'pointer' }}>📋</span>
          </div>

          {/* TWO IN A ROW FILE GRID */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            {files.filter(f => f.title.toLowerCase().includes(searchQuery.toLowerCase())).map((file, idx) => (
              <div 
                key={file.id} 
                onClick={() => alert(`Opening file: ${file.title}`)}
                onContextMenu={(e) => { e.preventDefault(); setActiveFileMenu(activeFileMenu === idx ? null : idx); }}
                style={{ 
                  background: 'white', 
                  borderRadius: '12px', 
                  padding: '12px', 
                  border: '1px solid #e2e8f0', 
                  boxShadow: '0 1px 3px rgba(0,0,0,0.02)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  minHeight: '130px',
                  position: 'relative',
                  cursor: 'pointer'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div style={{ width: '32px', height: '32px', background: '#f1f5f9', borderRadius: '8px', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '14px' }}>📄</div>
                  
                  <button 
                    onClick={(e) => { e.stopPropagation(); setActiveFileMenu(activeFileMenu === idx ? null : idx); }}
                    style={{ background: 'none', border: 'none', fontSize: '16px', cursor: 'pointer', color: '#64748b' }}
                  >
                    ⋮
                  </button>
                </div>

                <div>
                  <h4 style={{ margin: '8px 0 2px 0', fontSize: '13px', fontWeight: 'bold', color: '#0f172a' }}>{file.title}</h4>
                  <span style={{ fontSize: '10px', color: '#94a3b8' }}>{file.updated}</span>
                </div>

                {/* File context menu popup on tap or long-press */}
                {activeFileMenu === idx && (
                  <div style={{ position: 'absolute', right: '10px', top: '40px', background: 'white', border: '1px solid #cbd5e1', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', zIndex: 10, width: '160px', padding: '6px 0' }}>
                    <div onClick={(e) => { e.stopPropagation(); alert(`Deleting ${file.title}`); setActiveFileMenu(null); }} style={{ padding: '6px 12px', fontSize: '11px', color: '#dc2626', cursor: 'pointer' }}>Delete</div>
                    <div onClick={(e) => { e.stopPropagation(); alert(`Send As ${file.title}`); setActiveFileMenu(null); }} style={{ padding: '6px 12px', fontSize: '11px', color: '#334155', cursor: 'pointer' }}>Send As</div>
                    <div onClick={(e) => { e.stopPropagation(); setShareModalFile(file); setActiveFileMenu(null); }} style={{ padding: '6px 12px', fontSize: '11px', color: '#334155', cursor: 'pointer' }}>Share & Copy</div>
                    <div onClick={(e) => { e.stopPropagation(); alert(`Added ${file.title} to Collabo Page`); setActiveFileMenu(null); }} style={{ padding: '6px 12px', fontSize: '11px', color: '#334155', cursor: 'pointer' }}>Add to Collabo Page</div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* SHARE MODAL WITH SOCIAL PLATFORMS */}
      {shareModalFile && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 100, padding: '16px' }}>
          <div style={{ background: 'white', padding: '24px', borderRadius: '16px', width: '100%', maxWidth: '340px', textAlign: 'center' }}>
            <h3 style={{ margin: '0 0 8px 0', fontSize: '16px' }}>Share File</h3>
            <p style={{ fontSize: '12px', color: '#64748b', marginBottom: '16px' }}>Share images or document links directly to:</p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', fontSize: '24px', marginBottom: '20px' }}>
              <span title="Facebook" style={{ cursor: 'pointer' }} onClick={() => alert('Shared to Facebook')}>📘</span>
              <span title="WhatsApp" style={{ cursor: 'pointer' }} onClick={() => alert('Shared to WhatsApp')}>💚</span>
              <span title="Telegram" style={{ cursor: 'pointer' }} onClick={() => alert('Shared to Telegram')}>✈️</span>
              <span title="Google Drive" style={{ cursor: 'pointer' }} onClick={() => alert('Saved to Google Drive')}>📁</span>
              <span title="TikTok" style={{ cursor: 'pointer' }} onClick={() => alert('Shared to TikTok')}>🎵</span>
            </div>
            <button onClick={() => setShareModalFile(null)} style={{ background: '#4f46e5', color: 'white', border: 'none', padding: '8px 16px', borderRadius: '8px', fontSize: '12px', cursor: 'pointer', fontWeight: '600' }}>Close</button>
          </div>
        </div>
      )}

      {/* FOOTER */}
      <div style={{ padding: '16px', background: 'white', borderTop: '1px solid #e2e8f0', marginTop: '24px' }}>
        <div style={{ textAlign: 'center', fontSize: '11px', color: '#64748b', marginBottom: '8px' }}>docShare with its icon permanently sits on every page</div>
        <SocialFooterIcons />
      </div>

    </div>
  );
}
