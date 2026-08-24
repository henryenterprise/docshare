import React, { useState, useEffect } from 'react';
import WorkspaceManager from './components/WorkspaceManager';
import JoinWorkspace from './components/JoinWorkspace';
import SharedWorkspaceEditor from './components/SharedWorkspaceEditor';

export default function App() {
  const [view, setView] = useState('signin'); // 'signin', 'admin', 'register', 'dashboard'
  const [accountCategory, setAccountCategory] = useState('Individual');
  const [adminPassword, setAdminPassword] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Individual specific fields
  const [indPhone, setIndPhone] = useState('');
  const [indEmail, setIndEmail] = useState('');

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

  const [reviewModal, setReviewModal] = useState(false);
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
      // Individual requires complete registration step first before dashboard
      setIndEmail(email); // carry over sign-in email
      setView('register');
    } else {
      // Group / Corporate goes straight to dashboard if cleared
      setView('dashboard');
    }
  };

  const handleRegistrationSubmit = (e) => {
    e.preventDefault();
    if (accountCategory === 'Group' || accountCategory === 'Corporate') {
      setReviewModal(true);
    } else {
      alert('Individual Registration & Credentials saved successfully!');
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

  // 1. SIGN-IN & LOGIN PORTAL
  if (view === 'signin') {
    return (
      <div style={{ minHeight: '100vh', background: '#f8fafc', display: 'flex', justifyContent: 'center', alignItems: 'center', fontFamily: 'sans-serif', padding: '16px' }}>
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
              ? 'Please provide your required email and phone number to complete your profile.' 
              : 'Complete all required organizational details, location parameters, professional credentials, and identification uploads.'}
          </p>

          <form onSubmit={handleRegistrationSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            
            {/* INDIVIDUAL FORM VIEW */}
            {accountCategory === 'Individual' ? (
              <>
                <h4 style={{ margin: '0 0 -8px 0', color: '#334155', fontSize: '14px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Individual Verification Credentials</h4>
                
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: '500', marginBottom: '4px' }}>Email Address *</label>
                  <input type="email" value={indEmail} onChange={(e) => setIndEmail(e.target.value)} placeholder="name@domain.com" style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1', boxSizing: 'border-box' }} required />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: '500', marginBottom: '4px' }}>Phone Number *</label>
                  <input type="tel" value={indPhone} onChange={(e) => setIndPhone(e.target.value)} placeholder="+234 800 000 0000" style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1', boxSizing: 'border-box' }} required />
                </div>
              </>
            ) : (
              /* GROUP & CORPORATE FULL COMPLIANCE FORM VIEW */
              <>
                <h4 style={{ margin: '0 0 -8px 0', color: '#334155', fontSize: '14px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>1. Organization / Group Information</h4>
                
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: '500', marginBottom: '4px' }}>Organization / Group Name *</label>
                  <input type="text" value={orgName} onChange={(e) => setOrgName(e.target.value)} placeholder="e.g. Acme Tech Global" style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1', boxSizing: 'border-box' }} required />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: '500', marginBottom: '4px' }}>Organization Corporate Office Address *</label>
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
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: '500', marginBottom: '4px' }}>Other Names</label>
                  <input type="text" value={otherNames} onChange={(e) => setOtherNames(e.target.value)} placeholder="Optional middle names" style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1', boxSizing: 'border-box' }} />
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
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: '500', marginBottom: '4px' }}>Country *</label>
                    <select value={country} onChange={(e) => setCountry(e.target.value)} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1', background: 'white' }}>
                      <option>Nigeria</option>
                      <option>Ghana</option>
                      <option>Kenya</option>
                      <option>United Kingdom</option>
                      <option>United States</option>
                    </select>
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: '500', marginBottom: '4px' }}>State / Province *</label>
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

            <button type="submit" style={{ background: '#4f46e5', color: 'white', border: 'none', padding: '14px', borderRadius: '8px', fontWeight: '600', cursor: 'pointer', marginTop: '10px' }}>
              {accountCategory === 'Individual' ? 'Save & Complete Profile →' : 'Submit Registration Details →'}
            </button>
          </form>
        </div>

        {/* Review Popup Modal for Groups / Organizations */}
        {reviewModal && (
          <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '16px', zIndex: 1000 }}>
            <div style={{ background: 'white', padding: '30px', borderRadius: '16px', maxWidth: '400px', width: '100%', textAlign: 'center', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)' }}>
              <div style={{ fontSize: '40px', marginBottom: '10px' }}>⏳</div>
              <h3 style={{ margin: '0 0 10px 0', color: '#0f172a' }}>Under Review</h3>
              <p style={{ color: '#64748b', fontSize: '14px', lineHeight: '1.5', margin: '0 0 20px 0' }}>
                Your {accountCategory} submission is currently under review. At the end of the review, if cleared, you will receive a congratulatory email. Upon your next login, access will be granted to your dashboard!
              </p>
              <button onClick={() => { setReviewModal(false); setView('signin'); }} style={{ background: '#4f46e5', color: 'white', border: 'none', padding: '12px 24px', borderRadius: '8px', fontWeight: '600', cursor: 'pointer', width: '100%' }}>
                Got it, Return to Sign In
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }

  // 3. ADMIN PORTAL LOGIN (?admin=true)
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

  // 5. DASHBOARD (With 3 lines strategic drop-down menu for clean view)
  return (
    <div style={{ minHeight: '100vh', background: '#f8fafc', fontFamily: 'sans-serif', position: 'relative' }}>
      
      {/* Top Header with Strategic 3 Lines Menu Button */}
      <div style={{ background: 'white', borderBottom: '1px solid #e2e8f0', padding: '16px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {/* 3 Strategic Lines for Drop-down/Sidebar Clean View */}
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

      {/* Strategic Drop-down / Collapsible Drawer for Tools */}
      {drawerOpen && (
        <div style={{ background: '#1e293b', color: 'white', padding: '16px 24px', display: 'flex', gap: '16px', flexWrap: 'wrap', alignItems: 'center', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}>
          <span style={{ fontSize: '13px', fontWeight: '600', color: '#94a3b8', textTransform: 'uppercase' }}>Quick Tools:</span>
          <button onClick={() => alert('Opening Workspace Manager')} style={{ background: '#334155', color: 'white', border: 'none', padding: '6px 12px', borderRadius: '6px', cursor: 'pointer', fontSize: '13px' }}>Workspace Manager</button>
          <button onClick={() => alert('Opening Media Uploader')} style={{ background: '#334155', color: 'white', border: 'none', padding: '6px 12px', borderRadius: '6px', cursor: 'pointer', fontSize: '13px' }}>Media & Camera Hub</button>
          <button onClick={() => alert('Opening Compliance Records')} style={{ background: '#334155', color: 'white', border: 'none', padding: '6px 12px', borderRadius: '6px', cursor: 'pointer', fontSize: '13px' }}>Compliance Logs</button>
        </div>
      )}

      {/* Main Content Hub Area */}
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
  );
}
