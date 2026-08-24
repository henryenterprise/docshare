import React, { useState, useEffect } from 'react';

// Fallback components in case external files fail or throw errors
const DefaultWorkspaceManager = () => (
  <div style={{ padding: '16px', background: '#f8fafc', borderRadius: '8px', marginBottom: '16px', border: '1px solid #e2e8f0' }}>
    <h4 style={{ margin: '0 0 8px 0', color: '#1e293b' }}>Workspace Manager</h4>
    <p style={{ fontSize: '13px', color: '#64748b', margin: 0 }}>Manage your active workspaces, permissions, and settings here.</p>
  </div>
);

const DefaultJoinWorkspace = () => (
  <div style={{ padding: '16px', background: '#f8fafc', borderRadius: '8px', marginBottom: '16px', border: '1px solid #e2e8f0' }}>
    <h4 style={{ margin: '0 0 8px 0', color: '#1e293b' }}>Join Workspace</h4>
    <p style={{ fontSize: '13px', color: '#64748b', margin: 0 }}>Enter a unique workspace ID or invitation link to collaborate.</p>
  </div>
);

const DefaultSharedEditor = () => (
  <div style={{ padding: '16px', background: '#f8fafc', borderRadius: '8px', marginBottom: '16px', border: '1px solid #e2e8f0' }}>
    <h4 style={{ margin: '0 0 8px 0', color: '#1e293b' }}>Shared Workspace Editor</h4>
    <p style={{ fontSize: '13px', color: '#64748b', margin: 0 }}>Collaborate on documents and notes in real-time.</p>
  </div>
);

// Safely attempt imports with fallback error containment
let WorkspaceManager = DefaultWorkspaceManager;
let JoinWorkspace = DefaultJoinWorkspace;
let SharedWorkspaceEditor = DefaultSharedEditor;

try {
  WorkspaceManager = require('./components/WorkspaceManager').default || DefaultWorkspaceManager;
} catch (e) { /* fallback active */ }

try {
  JoinWorkspace = require('./components/JoinWorkspace').default || DefaultJoinWorkspace;
} catch (e) { /* fallback active */ }

try {
  SharedWorkspaceEditor = require('./components/SharedWorkspaceEditor').default || DefaultSharedEditor;
} catch (e) { /* fallback active */ }

export default function App() {
  const [view, setView] = useState('signin'); // 'signin', 'admin', 'register', 'dashboard'
  const [accountCategory, setAccountCategory] = useState('Individual');
  const [adminPassword, setAdminPassword] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Individual specific fields
  const [indEmail, setIndEmail] = useState('');
  const [indPhone, setIndPhone] = useState('');
  const [indFirstName, setIndFirstName] = useState('');
  const [indLastName, setIndLastName] = useState('');
  const [indMiddleName, setIndMiddleName] = useState('');
  const [indDob, setIndDob] = useState('');
  const [indNationality, setIndNationality] = useState('Nigeria');
  const [indState, setIndState] = useState('');
  const [indCity, setIndCity] = useState('');
  const [indLga, setIndLga] = useState('');
  const [indGender, setIndGender] = useState('Male');

  // Group & Organization shared expanded credentials
  const [orgName, setOrgName] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [otherNames, setOtherNames] = useState('');
  const [dob, setDob] = useState('');
  const [phone, setPhone] = useState('');
  const [orgEmail, setOrgEmail] = useState('');
  const [country, setCountry] = useState('Nigeria');
  const [stateProv, setStateProv] = useState('');
  const [lga, setLga] = useState('');
  const [address, setAddress] = useState('');
  const [corporateOffice, setCorporateOffice] = useState('');
  const [profession, setProfession] = useState('');
  const [staffScope, setStaffScope] = useState('1-5');
  const [customStaff, setCustomStaff] = useState('');
  const [idType, setIdType] = useState('National ID (NIN)');
  const [idFile, setIdFile] = useState(null);
  const [altImageFile, setAltImageFile] = useState(null);

  const [reviewBanner, setReviewBanner] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

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
      setStaffScope(cat === 'Group' ? '1-5' : '1-10');
      setView('register');
    }
  };

  const handleSignIn = (e) => {
    e.preventDefault();
    if (accountCategory === 'Individual') {
      setIndEmail(email); 
      setView('register');
    } else {
      setView('dashboard');
    }
  };

  const handleRegistrationSubmit = (e) => {
    e.preventDefault();
    if (accountCategory === 'Group' || accountCategory === 'Corporate') {
      setReviewBanner(true);
    } else {
      setView('dashboard');
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

  const SocialFooter = () => (
    <div style={{ marginTop: '24px', paddingTop: '16px', borderTop: '1px solid #e2e8f0', textAlign: 'center' }}>
      <p style={{ fontSize: '11px', color: '#94a3b8', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Connect with docShare</p>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', fontSize: '13px', color: '#4f46e5', fontWeight: '600' }}>
        <span style={{ cursor: 'pointer' }} onClick={() => window.open('#', '_blank')}>Twitter / X</span>
        <span style={{ cursor: 'pointer' }} onClick={() => window.open('#', '_blank')}>LinkedIn</span>
        <span style={{ cursor: 'pointer' }} onClick={() => window.open('#', '_blank')}>GitHub</span>
        <span style={{ cursor: 'pointer' }} onClick={() => window.open('#', '_blank')}>Support</span>
      </div>
    </div>
  );

  // 1. SIGN-IN & LOGIN PORTAL
  if (view === 'signin') {
    return (
      <div style={{ minHeight: '100vh', background: '#f8fafc', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', fontFamily: 'sans-serif', padding: '16px' }}>
        <div style={{ background: 'white', padding: '32px', borderRadius: '24px', width: '100%', maxWidth: '420px', boxShadow: '0 10px 25px -5px rgb(0 0 0 / 0.05)', textAlign: 'center' }}>
          
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginBottom: '16px' }}>
            <div style={{ background: '#4f46e5', color: 'white', width: '44px', height: '44px', display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: '12px', fontSize: '22px', boxShadow: '0 4px 10px rgba(79, 70, 229, 0.3)' }}>🛡️</div>
            <span style={{ fontSize: '18px', fontWeight: '800', color: '#0f172a', letterSpacing: '-0.025em' }}>docShare</span>
          </div>

          <h2 style={{ fontSize: '24px', fontWeight: 'bold', margin: '0 0 6px 0', color: '#0f172a' }}>Sign in to docShare</h2>
          <p style={{ fontSize: '13px', color: '#64748b', margin: '0 0 20px 0' }}>
            Access your secure workspace or <span style={{ color: '#4f46e5', cursor: 'pointer', textDecoration: 'underline' }} onClick={() => setView('register')}>register an organization/group</span>
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
                  fontSize: '12px',
                  fontWeight: '600',
                  cursor: 'pointer'
                }}
              >
                {cat}
              </button>
            ))}
          </div>

          <div style={{ background: '#fef3c7', border: '1px solid #f59e0b', padding: '10px 14px', borderRadius: '10px', textAlign: 'center', marginBottom: '20px' }}>
            <span style={{ fontSize: '12px', fontWeight: '700', textTransform: 'uppercase', color: '#b45309', letterSpacing: '0.05em' }}>
              Select Account Category: {accountCategory}
            </span>
          </div>

          <form onSubmit={handleSignIn} style={{ display: 'flex', flexDirection: 'column', gap: '16px', textAlign: 'left' }}>
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

          <SocialFooter />
        </div>
      </div>
    );
  }

  // 2. DETAILED REGISTRATION & ONBOARDING FORM
  if (view === 'register') {
    return (
      <div style={{ minHeight: '100vh', background: '#fdfbf7', padding: '20px', fontFamily: 'sans-serif', color: '#0f172a', maxWidth: '650px', margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <button onClick={() => setView('signin')} style={{ padding: '8px 16px', background: '#e2e8f0', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: '500' }}>
            ← Back to Sign In
          </button>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <div style={{ background: '#1e293b', color: 'white', width: '32px', height: '32px', display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: '8px', fontSize: '16px' }}>🛡️</div>
            <span style={{ fontSize: '15px', fontWeight: 'bold' }}>docShare Onboarding</span>
          </div>
        </div>

        <div style={{ background: 'white', padding: '24px', borderRadius: '16px', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.05)' }}>
          <h2 style={{ marginTop: 0, fontSize: '20px', color: '#0f172a' }}>{accountCategory} Complete Registration Form</h2>
          <p style={{ color: '#64748b', fontSize: '13px', marginBottom: '20px' }}>
            {accountCategory === 'Individual' 
              ? 'Complete your profile credentials below to proceed to your dashboard.' 
              : 'Complete all required organizational details, location parameters, professional credentials, and identification uploads.'}
          </p>

          <form onSubmit={handleRegistrationSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            
            {accountCategory === 'Individual' ? (
              <>
                <h4 style={{ margin: '0 0 -8px 0', color: '#334155', fontSize: '14px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Individual Credentials & Profile</h4>
                
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: '500', marginBottom: '4px' }}>Email Address *</label>
                  <input type="email" value={indEmail} onChange={(e) => setIndEmail(e.target.value)} placeholder="name@domain.com" style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1', boxSizing: 'border-box' }} required />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: '500', marginBottom: '4px' }}>Phone Number *</label>
                  <input type="tel" value={indPhone} onChange={(e) => setIndPhone(e.target.value)} placeholder="+234 800 000 0000" style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1', boxSizing: 'border-box' }} required />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: '500', marginBottom: '4px' }}>First Name *</label>
                    <input type="text" value={indFirstName} onChange={(e) => setIndFirstName(e.target.value)} placeholder="First name" style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1', boxSizing: 'border-box' }} required />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: '500', marginBottom: '4px' }}>Last Name *</label>
                    <input type="text" value={indLastName} onChange={(e) => setIndLastName(e.target.value)} placeholder="Last name" style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1', boxSizing: 'border-box' }} required />
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: '500', marginBottom: '4px' }}>Middle Name</label>
                  <input type="text" value={indMiddleName} onChange={(e) => setIndMiddleName(e.target.value)} placeholder="Optional middle name" style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1', boxSizing: 'border-box' }} />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: '500', marginBottom: '4px' }}>Date of Birth *</label>
                  <input type="date" value={indDob} onChange={(e) => setIndDob(e.target.value)} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1', boxSizing: 'border-box', background: 'white' }} required />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: '500', marginBottom: '4px' }}>Nationality *</label>
                    <select value={indNationality} onChange={(e) => setIndNationality(e.target.value)} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1', background: 'white' }}>
                      <option>Nigeria</option>
                      <option>Ghana</option>
                      <option>Kenya</option>
                      <option>United Kingdom</option>
                      <option>United States</option>
                    </select>
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: '500', marginBottom: '4px' }}>State *</label>
                    <input type="text" value={indState} onChange={(e) => setIndState(e.target.value)} placeholder="e.g. Lagos State" style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1', boxSizing: 'border-box' }} required />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: '500', marginBottom: '4px' }}>City / Province *</label>
                    <input type="text" value={indCity} onChange={(e) => setIndCity(e.target.value)} placeholder="e.g. Ikeja" style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1', boxSizing: 'border-box' }} required />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: '500', marginBottom: '4px' }}>LGA *</label>
                    <input type="text" value={indLga} onChange={(e) => setIndLga(e.target.value)} placeholder="e.g. Ikeja LGA" style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1', boxSizing: 'border-box' }} required />
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: '500', marginBottom: '4px' }}>Gender *</label>
                  <select value={indGender} onChange={(e) => setIndGender(e.target.value)} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1', background: 'white' }}>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </>
            ) : (
              <>
                <h4 style={{ margin: '0 0 -8px 0', color: '#334155', fontSize: '14px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>1. Organization / Group Information</h4>
                
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: '500', marginBottom: '4px' }}>Organization Name *</label>
                  <input type="text" value={orgName} onChange={(e) => setOrgName(e.target.value)} placeholder="e.g. Acme Tech Global" style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1', boxSizing: 'border-box' }} required />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: '500', marginBottom: '4px' }}>Organization Corporate Office *</label>
                  <input type="text" value={corporateOffice} onChange={(e) => setCorporateOffice(e.target.value)} placeholder="Full corporate headquarters address" style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1', boxSizing: 'border-box' }} required />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: '500', marginBottom: '4px' }}>Official Organization Email *</label>
                  <input type="email" value={orgEmail} onChange={(e) => setOrgEmail(e.target.value)} placeholder="org@company.com" style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1', boxSizing: 'border-box' }} required />
                </div>

                <hr style={{ border: 'none', borderTop: '1px solid #e2e8f0', margin: '8px 0' }} />
                <h4 style={{ margin: '0 0 -8px 0', color: '#334155', fontSize: '14px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>2. Representative / Owner Details</h4>
                
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: '500', marginBottom: '4px' }}>First Name *</label>
                    <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="First name" style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1', boxSizing: 'border-box' }} required />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: '500', marginBottom: '4px' }}>Last Name *</label>
                    <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder="Last name" style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1', boxSizing: 'border-box' }} required />
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: '500', marginBottom: '4px' }}>Middle Name</label>
                  <input type="text" value={otherNames} onChange={(e) => setOtherNames(e.target.value)} placeholder="Optional middle name" style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1', boxSizing: 'border-box' }} />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: '500', marginBottom: '4px' }}>Date of Birth *</label>
                    <input type="date" value={dob} onChange={(e) => setDob(e.target.value)} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1', boxSizing: 'border-box', background: 'white' }} required />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: '500', marginBottom: '4px' }}>Phone Number *</label>
                    <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+234..." style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1', boxSizing: 'border-box' }} required />
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: '500', marginBottom: '4px' }}>Occupation / Profession *</label>
                  <input type="text" value={profession} onChange={(e) => setProfession(e.target.value)} placeholder="e.g. Software Engineering / Telecommunications" style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1', boxSizing: 'border-box' }} required />
                </div>

                <hr style={{ border: 'none', borderTop: '1px solid #e2e8f0', margin: '8px 0' }} />
                <h4 style={{ margin: '0 0 -8px 0', color: '#334155', fontSize: '14px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>3. Location & Scope</h4>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: '500', marginBottom: '4px' }}>Nationality / Country *</label>
                    <select value={country} onChange={(e) => setCountry(e.target.value)} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1', background: 'white' }}>
                      <option>Nigeria</option>
                      <option>Ghana</option>
                      <option>Kenya</option>
                      <option>United Kingdom</option>
                      <option>United States</option>
                    </select>
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: '500', marginBottom: '4px' }}>State *</label>
                    <input type="text" value={stateProv} onChange={(e) => setStateProv(e.target.value)} placeholder="e.g. Lagos State" style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1', boxSizing: 'border-box' }} required />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: '500', marginBottom: '4px' }}>LGA (Local Govt Area) *</label>
                    <input type="text" value={lga} onChange={(e) => setLga(e.target.value)} placeholder="e.g. Ikeja / Owerri Municipal" style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1', boxSizing: 'border-box' }} required />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: '500', marginBottom: '4px' }}>Residential / Contact Address *</label>
                    <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Street address" style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1', boxSizing: 'border-box' }} required />
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: '500', marginBottom: '4px' }}>Staff Strength / Member Scope *</label>
                  {accountCategory === 'Group' ? (
                    <select value={staffScope} onChange={(e) => setStaffScope(e.target.value)} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1', background: 'white' }}>
                      <option value="1-5">1 - 5 members (Group Default)</option>
                    </select>
                  ) : (
                    <>
                      <select value={staffScope} onChange={(e) => setStaffScope(e.target.value)} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1', background: 'white', marginBottom: '8px' }}>
                        <option value="1-10">1 - 10</option>
                        <option value="11-20">11 - 20</option>
                        <option value="21-40">21 - 40</option>
                        <option value="custom">Custom Staff Strength</option>
                      </select>
                      {staffScope === 'custom' && (
                        <input type="number" placeholder="Enter custom staff number" value={customStaff} onChange={(e) => setCustomStaff(e.target.value)} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1', boxSizing: 'border-box' }} required />
                      )}
                    </>
                  )}
                </div>

                <hr style={{ border: 'none', borderTop: '1px solid #e2e8f0', margin: '8px 0' }} />
                <h4 style={{ margin: '0 0 -8px 0', color: '#334155', fontSize: '14px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>4. Identification & Document Uploads</h4>

                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: '500', marginBottom: '4px' }}>ID Type *</label>
                  <select value={idType} onChange={(e) => setIdType(e.target.value)} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1', background: 'white' }}>
                    <option value="National ID (NIN)">National ID (NIN)</option>
                    <option value="International Passport">International Passport</option>
                    <option value="Drivers License">Driver's License</option>
                    <option value="Voters Card">Voter's Card</option>
                  </select>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: '500', marginBottom: '4px' }}>Upload ID Document *</label>
                    <input type="file" onChange={(e) => setIdFile(e.target.files[0])} style={{ width: '100%', fontSize: '12px', padding: '8px', background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: '8px' }} required />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: '500', marginBottom: '4px' }}>Upload Image (Alternative Doc) *</label>
                    <input type="file" onChange={(e) => setAltImageFile(e.target.files[0])} style={{ width: '100%', fontSize: '12px', padding: '8px', background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: '8px' }} required />
                  </div>
                </div>
              </>
            )}

            {reviewBanner && (
              <div style={{ background: '#fef3c7', border: '1px solid #f59e0b', padding: '14px', borderRadius: '8px', color: '#92400e', fontSize: '13px', lineHeight: '1.5' }}>
                <strong>Under Review:</strong> Your {accountCategory} submission is currently under review. At the end of the review, if cleared, you will receive a congratulatory email. Upon your next login, full access will be granted to your dashboard!
                <div style={{ marginTop: '10px' }}>
                  <button type="button" onClick={() => setView('dashboard')} style={{ background: '#d97706', color: 'white', border: 'none', padding: '6px 12px', borderRadius: '6px', cursor: 'pointer', fontWeight: '600' }}>
                    Proceed to Dashboard Sandbox →
                  </button>
                </div>
              </div>
            )}

            {!reviewBanner && (
              <button type="submit" style={{ background: '#4f46e5', color: 'white', border: 'none', padding: '14px', borderRadius: '8px', fontWeight: '600', cursor: 'pointer', marginTop: '10px' }}>
                Complete Registration & Proceed →
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
      <div style={{ minHeight: '100vh', background: '#f1f5f9', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', fontFamily: 'sans-serif', padding: '16px' }}>
        <div style={{ background: 'white', padding: '32px', borderRadius: '20px', width: '100%', maxWidth: '400px', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)', textAlign: 'center' }}>
          <div style={{ background: '#312e81', color: 'white', width: '50px', height: '50px', display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: '12px', margin: '0 auto 16px auto', fontSize: '24px' }}>🛡️</div>
          <h2 style={{ fontSize: '24px', fontWeight: 'bold', margin: '0 0 8px 0', color: '#0f172a' }}>Admin Portal Login</h2>
          <form onSubmit={handleAdminLogin} style={{ display: 'flex', flexDirection: 'column', gap: '16px', textAlign: 'left', marginTop: '16px' }}>
            <input type="password" placeholder="Enter Admin Password" value={adminPassword} onChange={(e) => setAdminPassword(e.target.value)} style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #cbd5e1', boxSizing: 'border-box' }} required />
            <button type="submit" style={{ background: '#312e81', color: 'white', border: 'none', padding: '14px', borderRadius: '8px', fontWeight: '600', cursor: 'pointer', width: '100%' }}>Sign In to Command Center</button>
          </form>
          <button onClick={() => setView('signin')} style={{ background: 'none', border: 'none', color: '#64748b', cursor: 'pointer', marginTop: '16px', fontSize: '13px' }}>← Return to User Login</button>

          <SocialFooter />
        </div>
      </div>
    );
  }

  // 4. ADMIN COMMAND CENTER DASHBOARD
  if (view === 'admin-dashboard') {
    return (
      <div style={{ minHeight: '100vh', background: '#f8fafc', padding: '24px', fontFamily: 'sans-serif', color: '#0f172a', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
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
        <SocialFooter />
      </div>
    );
  }

  // 5. DASHBOARD
  return (
    <div style={{ minHeight: '100vh', background: '#f8fafc', fontFamily: 'sans-serif', position: 'relative', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
      
      <div>
        <div style={{ background: 'white', borderBottom: '1px solid #e2e8f0', padding: '16px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <button 
              onClick={() => setDrawerOpen(!drawerOpen)} 
              style={{ background: 'none', border: '1px solid #cbd5e1', borderRadius: '8px', padding: '8px 10px', cursor: 'pointer', display: 'flex', flexDirection: 'column', gap: '4px', justifyContent: 'center' }}
              title="Toggle Menu"
            >
              <div style={{ width: '18px', height: '2px', background: '#0f172a' }}></div>
              <div style={{ width: '18px', height: '2px', background: '#0f172a' }}></div>
              <div style={{ width: '18px', height: '2px', background: '#0f172a' }}></div>
            </button>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ background: '#4f46e5', color: 'white', width: '32px', height: '32px', display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: '8px', fontSize: '16px' }}>🛡️</div>
              <span style={{ fontSize: '16px', fontWeight: 'bold', color: '#0f172a' }}>docShare {accountCategory} Dashboard</span>
            </div>
          </div>

          <button onClick={() => setView('signin')} style={{ padding: '8px 16px', background: '#f1f5f9', border: '1px solid #cbd5e1', borderRadius: '6px', cursor: 'pointer', fontSize: '13px', fontWeight: '500' }}>
            Sign Out
          </button>
        </div>

        {drawerOpen && (
          <div style={{ background: '#1e293b', color: 'white', padding: '16px 24px', display: 'flex', gap: '16px', flexWrap: 'wrap', alignItems: 'center', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}>
            <span style={{ fontSize: '13px', fontWeight: '600', color: '#94a3b8', textTransform: 'uppercase' }}>Quick Tools:</span>
            <button onClick={() => alert('Opening Workspace Manager')} style={{ background: '#334155', color: 'white', border: 'none', padding: '6px 12px', borderRadius: '6px', cursor: 'pointer', fontSize: '13px' }}>Workspace Manager</button>
            <button onClick={() => alert('Opening Media Uploader')} style={{ background: '#334155', color: 'white', border: 'none', padding: '6px 12px', borderRadius: '6px', cursor: 'pointer', fontSize: '13px' }}>Media & Camera Hub</button>
            <button onClick={() => alert('Opening Compliance Records')} style={{ background: '#334155', color: 'white', border: 'none', padding: '6px 12px', borderRadius: '6px', cursor: 'pointer', fontSize: '13px' }}>Compliance Logs</button>
          </div>
        )}

        <div style={{ padding: '24px', maxWidth: '900px', margin: '0 auto' }}>
          <div style={{ background: 'white', padding: '24px', borderRadius: '16px', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.05)' }}>
            <h2 style={{ marginTop: 0 }}>Welcome to your {accountCategory} Workspace Hub</h2>
            <p style={{ color: '#64748b', fontSize: '14px' }}>All tools are securely tucked in your drop-down menu above. Select your collaboration options below:</p>
            <WorkspaceManager />
            <JoinWorkspace />
            <SharedWorkspaceEditor />
          </div>
        </div>
      </div>

      <div style={{ paddingBottom: '20px' }}>
        <SocialFooter />
      </div>

    </div>
  );
}
