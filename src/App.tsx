import React, { useState, useEffect, useRef } from 'react';

export default function App() {
  const [view, setView] = useState('signin'); // 'signin', 'register-individual', 'register-group', 'dashboard'
  const [signInPopup, setSignInPopup] = useState(false);
  const [accountCategory, setAccountCategory] = useState('Individual');
  
  // Credentials & Inputs
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  // Dropdown & Menu Toggles
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [hamburgerMenuOpen, setHamburgerMenuOpen] = useState(false);
  const [activeFileMenu, setActiveFileMenu] = useState(null);
  const [shareModalFile, setShareModalFile] = useState(null);

  // Registration form fields (Individual & Group/Org common fields)
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [middleName, setMiddleName] = useState('');
  const [dob, setDob] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [nationality, setNationality] = useState('');
  const [stateVal, setStateVal] = useState('');
  const [provinceCity, setProvinceCity] = useState('');
  const [countyLga, setCountyLga] = useState('');
  const [occupation, setOccupation] = useState('');

  // Group / Organization specific fields
  const [specialId, setSpecialId] = useState('');
  const [assignedPosition, setAssignedPosition] = useState('');
  const [orgName, setOrgName] = useState('');

  // Mock Files Data for Dashboard
  const [files] = useState([
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

  const handleSignInSubmit = (e) => {
    e.preventDefault();
    if (email && password) {
      setEmail('');
      setPassword('');
      setView('dashboard');
    }
  };

  const handleSpecialIdLookup = (idVal) => {
    setSpecialId(idVal);
    // Simulating auto-fetching position and organization name based on Special ID
    if (idVal.trim() === 'NDD-9942') {
      setAssignedPosition('Senior Communications Lead');
      setOrgName('NDDICL Global');
    } else if (idVal.trim() === 'NGS-7721') {
      setAssignedPosition('Technical Project Manager');
      setOrgName('NextGen Skills Network');
    } else {
      setAssignedPosition('');
      setOrgName('');
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

  // 1. SIGN-IN VIEW & POP-UP
  if (view === 'signin') {
    return (
      <div style={{ minHeight: '100vh', background: '#f8fafc', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', fontFamily: 'sans-serif', padding: '16px' }}>
        <div style={{ background: 'white', padding: '28px', borderRadius: '24px', width: '100%', maxWidth: '400px', boxShadow: '0 10px 25px -5px rgb(0 0 0 / 0.05)', textAlign: 'center' }}>
          
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginBottom: '12px' }}>
            <div style={{ background: '#4f46e5', color: 'white', width: '40px', height: '40px', display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: '12px', fontSize: '20px' }}>🛡️</div>
            <span style={{ fontSize: '18px', fontWeight: '800', color: '#0f172a' }}>docShare</span>
          </div>

          <h2 style={{ fontSize: '22px', fontWeight: 'bold', margin: '0 0 4px 0', color: '#0f172a' }}>Sign in to docShare</h2>
          <p style={{ fontSize: '13px', color: '#64748b', margin: '0 0 20px 0' }}>Access your secure workspace</p>

          <form onSubmit={handleSignInSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px', textAlign: 'left' }}>
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '500', marginBottom: '4px', color: '#334155' }}>Email Address</label>
              <input type="email" placeholder="name@organization.com" value={email} onChange={(e) => setEmail(e.target.value)} style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', boxSizing: 'border-box' }} required />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '500', marginBottom: '4px', color: '#334155' }}>Password</label>
              <input type="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', boxSizing: 'border-box' }} required />
            </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px', marginBottom: '12px' }}>
            {['Individual', 'Group', 'Organization'].map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => {
                  setAccountCategory(cat);
                  if (cat === 'Individual') setView('register-individual');
                  else if (cat === 'Group') setView('register-group');
                  else if (cat === 'Organization') setView('register-organization');
                }}
                style={{
                  padding: '10px 4px',
                  borderRadius: '10px',
                  border: '1px solid #cbd5e1',
                  background: 'white',
                  color: '#334155',
                  fontSize: '12px',
                  fontWeight: '600',
                  cursor: 'pointer'
                }}
              >
                {cat}
              </button>
            ))}
          </div>

            <button type="submit" style={{ background: '#4f46e5', color: 'white', border: 'none', padding: '12px', borderRadius: '10px', fontWeight: '600', cursor: 'pointer', width: '100%' }}>
              Sign-in
            </button>
          </form>

          <div style={{ marginTop: '10px', textAlign: 'center' }}>
            <button onClick={() => alert('Password reset instructions sent.')} style={{ background: 'none', border: 'none', color: '#4f46e5', fontSize: '13px', cursor: 'pointer', fontWeight: '500' }}>
              Forgot Password?
            </button>
          </div>

          <div style={{ marginTop: '16px', textAlign: 'center' }}>
            <span style={{ fontSize: '13px', color: '#64748b' }}>Don't have an account? </span>
            <span style={{ fontSize: '13px', color: '#4f46e5', fontWeight: '600', cursor: 'pointer', textDecoration: 'underline' }} onClick={() => setSignInPopup(true)}>
              Sign up
            </span>
          </div>

          <SocialFooter />
        </div>

        {/* SIGN UP SELECTION POP-UP */}
        {signInPopup && (
          <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 100, padding: '16px' }}>
            <div style={{ background: 'white', padding: '24px', borderRadius: '16px', width: '100%', maxWidth: '360px', textAlign: 'center' }}>
              <h3 style={{ margin: '0 0 8px 0', fontSize: '18px' }}>Select Account Option</h3>
              <p style={{ fontSize: '13px', color: '#64748b', marginBottom: '20px' }}>Choose your registration path below:</p>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <button onClick={() => { setSignInPopup(false); setAccountCategory('Individual'); setView('register-individual'); }} style={{ padding: '12px', background: '#eef2ff', color: '#4f46e5', border: '1px solid #c7d2fe', borderRadius: '8px', fontWeight: '600', cursor: 'pointer' }}>
                  Individual
                </button>
                <button onClick={() => { setSignInPopup(false); setAccountCategory('Group'); setView('register-group'); }} style={{ padding: '12px', background: '#f0fdf4', color: '#16a34a', border: '1px solid #bbf7d0', borderRadius: '8px', fontWeight: '600', cursor: 'pointer' }}>
                  Group
                </button>
                <button onClick={() => { setSignInPopup(false); setAccountCategory('Organization'); setView('register-group'); }} style={{ padding: '12px', background: '#fffbeb', color: '#d97706', border: '1px solid #fde68a', borderRadius: '8px', fontWeight: '600', cursor: 'pointer' }}>
                  Organization
                </button>
                <button onClick={() => setSignInPopup(false)} style={{ padding: '8px', background: 'none', border: 'none', color: '#64748b', cursor: 'pointer', marginTop: '6px' }}>
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  // 2. INDIVIDUAL ACCOUNT REGISTRATION FORM
  if (view === 'register-individual') {
    return (
      <div style={{ minHeight: '100vh', background: '#fdfbf7', padding: '20px', fontFamily: 'sans-serif', maxWidth: '600px', margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <button onClick={() => setView('signin')} style={{ padding: '6px 12px', background: '#e2e8f0', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '13px' }}>
            ← Back
          </button>
          <span style={{ fontSize: '14px', fontWeight: 'bold' }}>Individual Account Registration</span>
        </div>

        <div style={{ background: 'white', padding: '24px', borderRadius: '16px', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.05)' }}>
          <h2 style={{ marginTop: 0, fontSize: '18px', color: '#0f172a' }}>Complete Registration</h2>
          
          <form onSubmit={(e) => { e.preventDefault(); setView('dashboard'); }} style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '14px' }}>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: '500', marginBottom: '4px' }}>First Name *</label>
                <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1', boxSizing: 'border-box' }} required />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: '500', marginBottom: '4px' }}>Last Name *</label>
                <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1', boxSizing: 'border-box' }} required />
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: '500', marginBottom: '4px' }}>Middle Name (Optional)</label>
              <input type="text" value={middleName} onChange={(e) => setMiddleName(e.target.value)} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1', boxSizing: 'border-box' }} />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: '500', marginBottom: '4px' }}>Date of Birth *</label>
                <input type="date" value={dob} onChange={(e) => setDob(e.target.value)} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1', boxSizing: 'border-box' }} required />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: '500', marginBottom: '4px' }}>Phone Number *</label>
                <input type="tel" value={regPhone} onChange={(e) => setRegPhone(e.target.value)} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1', boxSizing: 'border-box' }} required />
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: '500', marginBottom: '4px' }}>Email *</label>
              <input type="email" value={regEmail} onChange={(e) => setRegEmail(e.target.value)} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1', boxSizing: 'border-box' }} required />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: '500', marginBottom: '4px' }}>Nationality *</label>
                <input type="text" value={nationality} onChange={(e) => setNationality(e.target.value)} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1', boxSizing: 'border-box' }} required />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: '500', marginBottom: '4px' }}>State *</label>
                <input type="text" value={stateVal} onChange={(e) => setStateVal(e.target.value)} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1', boxSizing: 'border-box' }} required />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: '500', marginBottom: '4px' }}>Province/City *</label>
                <input type="text" value={provinceCity} onChange={(e) => setProvinceCity(e.target.value)} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1', boxSizing: 'border-box' }} required />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: '500', marginBottom: '4px' }}>County/LGA *</label>
                <input type="text" value={countyLga} onChange={(e) => setCountyLga(e.target.value)} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1', boxSizing: 'border-box' }} required />
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: '500', marginBottom: '4px' }}>Occupation/Profession *</label>
              <input type="text" value={occupation} onChange={(e) => setOccupation(e.target.value)} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1', boxSizing: 'border-box' }} required />
            </div>

            <button type="submit" style={{ background: '#4f46e5', color: 'white', border: 'none', padding: '12px', borderRadius: '8px', fontWeight: '600', cursor: 'pointer', marginTop: '10px', width: '100%' }}>
              Submit → Access User Workspace
            </button>
          </form>

          <SocialFooter />
        </div>
      </div>
    );
  }

  // 3. GROUP OR ORGANIZATION STAFF/CLIENT REGISTRATION FORM
  if (view === 'register-group') {
    return (
      <div style={{ minHeight: '100vh', background: '#fdfbf7', padding: '20px', fontFamily: 'sans-serif', maxWidth: '600px', margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <button onClick={() => setView('signin')} style={{ padding: '6px 12px', background: '#e2e8f0', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '13px' }}>
            ← Back
          </button>
          <span style={{ fontSize: '14px', fontWeight: 'bold' }}>{accountCategory} Staff/Client Registration</span>
        </div>

        <div style={{ background: 'white', padding: '24px', borderRadius: '16px', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.05)' }}>
          <h2 style={{ marginTop: 0, fontSize: '18px', color: '#0f172a' }}>{accountCategory} Client/Staff Registration</h2>
          
          <div style={{ background: '#f8fafc', padding: '14px', borderRadius: '10px', marginBottom: '16px', border: '1px solid #cbd5e1' }}>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', marginBottom: '6px', color: '#1e293b' }}>Insert Special ID (Provided by Admin) *</label>
            <input 
              type="text" 
              placeholder="e.g. NDD-9942 or NGS-7721" 
              value={specialId} 
              onChange={(e) => handleSpecialIdLookup(e.target.value)} 
              style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1', boxSizing: 'border-box', background: 'white' }} 
              required 
            />
            {orgName && (
              <p style={{ fontSize: '12px', color: '#16a34a', margin: '6px 0 0 0', fontWeight: '600' }}>
                ✓ Linked to Organization: {orgName}
              </p>
            )}
          </div>

          {assignedPosition && (
            <div style={{ background: '#eff6ff', padding: '12px', borderRadius: '8px', marginBottom: '16px', border: '1px solid #bfdbfe' }}>
              <span style={{ fontSize: '12px', color: '#1e40af', fontWeight: 'bold' }}>Assigned Position (Auto-populated by Admin): </span>
              <span style={{ fontSize: '13px', color: '#1e3a8a', fontWeight: '600' }}>{assignedPosition}</span>
            </div>
          )}

          <form onSubmit={(e) => { e.preventDefault(); setView('dashboard'); }} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: '500', marginBottom: '4px' }}>First Name *</label>
                <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1', boxSizing: 'border-box' }} required />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: '500', marginBottom: '4px' }}>Last Name *</label>
                <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1', boxSizing: 'border-box' }} required />
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: '500', marginBottom: '4px' }}>Middle Name (Optional)</label>
  // 3. GROUP ACCOUNT REGISTRATION FORM
  if (view === 'register-group') {
    return (
      <div style={{ minHeight: '100vh', background: '#fdfbf7', padding: '20px', fontFamily: 'sans-serif', maxWidth: '600px', margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <button onClick={() => setView('signin')} style={{ padding: '6px 12px', background: '#e2e8f0', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '13px' }}>
            ← Back
          </button>
          <span style={{ fontSize: '14px', fontWeight: 'bold' }}>Group Account Registration</span>
        </div>

        <div style={{ background: 'white', padding: '24px', borderRadius: '16px', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.05)' }}>
          <h2 style={{ marginTop: 0, fontSize: '18px', color: '#0f172a' }}>Group Registration Form</h2>
          
          <form onSubmit={(e) => { e.preventDefault(); setView('dashboard'); }} style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '14px' }}>
            
            {/* FIRST INPUT FIELD: TITLE / POSITION */}
            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: '500', marginBottom: '4px' }}>Title/Position *</label>
              <input type="text" placeholder="Select Your Title/Position" style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1', boxSizing: 'border-box' }} required />
            </div>

            {/* STAFF STRENGTH OPTION (1-5) */}
            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: '500', marginBottom: '4px' }}>Staff Strength *</label>
              <select style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1', boxSizing: 'border-box', background: 'white' }} required>
                <option value="">Select Your Staff Strength</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>
            </div>

            {/* COMPREHENSIVE CREDENTIALS */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: '500', marginBottom: '4px' }}>First Name *</label>
                <input type="text" placeholder="Select Your First Name" style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1', boxSizing: 'border-box' }} required />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: '500', marginBottom: '4px' }}>Last Name *</label>
                <input type="text" placeholder="Select Your Last Name" style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1', boxSizing: 'border-box' }} required />
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: '500', marginBottom: '4px' }}>Middle Name (Optional)</label>
              <input type="text" placeholder="Select Your Middle Name" style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1', boxSizing: 'border-box' }} />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: '500', marginBottom: '4px' }}>Date of Birth *</label>
                <input type="date" style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1', boxSizing: 'border-box' }} required />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: '500', marginBottom: '4px' }}>Phone Number *</label>
                <input type="tel" placeholder="Select Your Phone Number" style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1', boxSizing: 'border-box' }} required />
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: '500', marginBottom: '4px' }}>Email *</label>
              <input type="email" placeholder="Select Your Email" style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1', boxSizing: 'border-box' }} required />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: '500', marginBottom: '4px' }}>Nationality *</label>
                <input type="text" placeholder="Select Your Nationality" style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1', boxSizing: 'border-box' }} required />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: '500', marginBottom: '4px' }}>State *</label>
                <input type="text" placeholder="Select Your State" style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1', boxSizing: 'border-box' }} required />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: '500', marginBottom: '4px' }}>Province/City *</label>
                <input type="text" placeholder="Select Your Province/City" style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1', boxSizing: 'border-box' }} required />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: '500', marginBottom: '4px' }}>County/LGA *</label>
                <input type="text" placeholder="Select Your County/LGA" style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1', boxSizing: 'border-box' }} required />
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: '500', marginBottom: '4px' }}>Occupation/Profession *</label>
              <input type="text" placeholder="Select Your Occupation/Profession" style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1', boxSizing: 'border-box' }} required />
            </div>

            <button type="submit" style={{ background: '#4f46e5', color: 'white', border: 'none', padding: '12px', borderRadius: '8px', fontWeight: '600', cursor: 'pointer', marginTop: '10px', width: '100%' }}>
              Submit Group Registration →
            </button>
          </form>
        </div>
      </div>
    );
  }

  // 4. ORGANIZATION ACCOUNT REGISTRATION FORM
  if (view === 'register-organization') {
    return (
      <div style={{ minHeight: '100vh', background: '#fdfbf7', padding: '20px', fontFamily: 'sans-serif', maxWidth: '600px', margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <button onClick={() => setView('signin')} style={{ padding: '6px 12px', background: '#e2e8f0', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '13px' }}>
            ← Back
          </button>
          <span style={{ fontSize: '14px', fontWeight: 'bold' }}>Organization Account Registration</span>
        </div>

        <div style={{ background: 'white', padding: '24px', borderRadius: '16px', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.05)' }}>
          <h2 style={{ marginTop: 0, fontSize: '18px', color: '#0f172a' }}>Organization Registration Form</h2>
          
          <form onSubmit={(e) => { e.preventDefault(); setView('dashboard'); }} style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '14px' }}>
            
            {/* FIRST INPUT FIELD: TITLE / POSITION */}
            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: '500', marginBottom: '4px' }}>Title/Position *</label>
              <input type="text" placeholder="Select Your Title/Position" style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1', boxSizing: 'border-box' }} required />
            </div>

            {/* STAFF STRENGTH RANGES & CUSTOM COLUMN */}
            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: '500', marginBottom: '4px' }}>Staff Strength Range / Custom *</label>
              <select style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1', boxSizing: 'border-box', background: 'white', marginBottom: '8px' }} required>
                <option value="">Select Your Staff Strength Range</option>
                <option value="1-10">1 - 10 Staff</option>
                <option value="11-20">11 - 20 Staff</option>
                <option value="21-40">21 - 40 Staff</option>
                <option value="custom">Custom Number of Staff</option>
              </select>
              <input type="number" placeholder="Select Your Custom Number of Staff (If applicable)" style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1', boxSizing: 'border-box' }} />
            </div>

            {/* COMPREHENSIVE CREDENTIALS */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: '500', marginBottom: '4px' }}>First Name *</label>
                <input type="text" placeholder="Select Your First Name" style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1', boxSizing: 'border-box' }} required />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: '500', marginBottom: '4px' }}>Last Name *</label>
                <input type="text" placeholder="Select Your Last Name" style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1', boxSizing: 'border-box' }} required />
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: '500', marginBottom: '4px' }}>Middle Name (Optional)</label>
              <input type="text" placeholder="Select Your Middle Name" style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1', boxSizing: 'border-box' }} />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: '500', marginBottom: '4px' }}>Date of Birth *</label>
                <input type="date" style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1', boxSizing: 'border-box' }} required />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: '500', marginBottom: '4px' }}>Phone Number *</label>
                <input type="tel" placeholder="Select Your Phone Number" style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1', boxSizing: 'border-box' }} required />
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: '500', marginBottom: '4px' }}>Email *</label>
              <input type="email" placeholder="Select Your Email" style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1', boxSizing: 'border-box' }} required />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: '500', marginBottom: '4px' }}>Nationality *</label>
                <input type="text" placeholder="Select Your Nationality" style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1', boxSizing: 'border-box' }} required />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: '500', marginBottom: '4px' }}>State *</label>
                <input type="text" placeholder="Select Your State" style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1', boxSizing: 'border-box' }} required />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: '500', marginBottom: '4px' }}>Province/City *</label>
                <input type="text" placeholder="Select Your Province/City" style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1', boxSizing: 'border-box' }} required />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: '500', marginBottom: '4px' }}>County/LGA *</label>
                <input type="text" placeholder="Select Your County/LGA" style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1', boxSizing: 'border-box' }} required />
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: '500', marginBottom: '4px' }}>Occupation/Profession *</label>
              <input type="text" placeholder="Select Your Occupation/Profession" style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1', boxSizing: 'border-box' }} required />
            </div>

            <button type="submit" style={{ background: '#4f46e5', color: 'white', border: 'none', padding: '12px', borderRadius: '8px', fontWeight: '600', cursor: 'pointer', marginTop: '10px', width: '100%' }}>
              Submit Organization Registration →
            </button>
          </form>
        </div>
      </div>
    );
  }


  // 4. MAIN DASHBOARD VIEW
  return (
    <div style={{ minHeight: '100vh', background: '#f8fafc', fontFamily: 'sans-serif', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
      
      <div>
        {/* TOP NAVIGATION BAR */}
        <div style={{ background: 'white', borderBottom: '1px solid #e2e8f0', padding: '10px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '8px' }}>
          
          {/* Left hamburger menu */}
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
                <div onClick={() => { alert('Media Hub'); setHamburgerMenuOpen(false); }} style={{ padding: '10px 16px', fontSize: '13px', cursor: 'pointer', color: '#334155' }}>📷 Media Hub</div>
              </div>
            )}
          </div>

          {/* Search bar */}
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

          {/* Profile Icon with Dropdown */}
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
              {orgName ? `${orgName} Workspace` : 'User Workspace'}
            </h1>
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
            <p style={{ fontSize: '12px', color: '#64748b', marginBottom: '16px' }}>Share directly to:</p>
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
