import React, { useState } from 'react';

export default function Register() {
    const [category, setCategory] = useState('individual'); // default to 'individual', 'group', 'organization'
  const [subtype, setSubtype] = useState(null); // 'new', 'staff', 'client'
  
  // Qualification Other text toggle for Staff/Client
  const [qualification, setQualification] = useState('');
  const [otherQualification, setOtherQualification] = useState('');

  // 1. INDIVIDUAL FORM STATE
  const [indForm, setIndForm] = useState({
    firstName: '', lastName: '', otherNames: '', gender: '', dob: '',
    email: '', phone: '', nationality: '', state: '', lga: '',
    religion: '', occupation: '', password: '', confirmPassword: ''
  });

  // 2. CLIENT / STAFF FORM STATE
  const [subForm, setSubForm] = useState({
    specialId: '', firstName: '', lastName: '', otherNames: '', gender: '', dob: '',
    email: '', phone: '', nationality: '', country: '', state: '', lga: '',
    religion: '', occupation: '', positionHeld: '', roleDesignation: '',
    contactAddress: '', skillsAcquired: '', password: '', confirmPassword: ''
  });
  const [selectedGroupName, setSelectedGroupName] = useState('');

  // 3. OWNER / CORPORATE FORM STATE
  const [ownerForm, setOwnerForm] = useState({
    fullName: '', preferredName: '', dob: '', gender: '', nationality: '', countryOfRes: '',
    residentialAddress: '', phone: '', email: '', idType: '', idNumber: '', dateIssue: '', expiryDate: '',
    companyPosition: 'Founder', staffStrength: '', prevExperience: '', currentOccupation: '',
    profQualifications: '', profMemberships: '', yearsExperience: '', registeredName: '',
    tradingName: '', regNumber: '', entityType: 'Private Limited Company', incorporationDate: '',
    countryInc: '', stateInc: '', registeredOffice: '', principalAddress: '', branchLocations: '',
    website: '', corpEmail: '', corpPhone: '', socials: '', description: '', mission: '',
    vision: '', coreValues: '', primaryIndustry: '', secondaryIndustry: '', mainActivities: '',
    productsServices: '', targetMarket: '', password: '', confirmPassword: ''
  });

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    alert('Registration submitted successfully! Check status triggers.');
  };

    return (
    <div style={{ minHeight: '100vh', background: '#fdfbf7', padding: '30px 20px', fontFamily: 'sans-serif' }}>
      <h1 style={{ color: 'red', textAlign: 'center', fontSize: '20px' }}>TEST RENDER: IF YOU SEE THIS, APP IS WORKING</h1>
      <div style={{ maxWidth: '700px', margin: '0 auto', background: 'white', padding: '30px', borderRadius: '16px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
        
        {/* STEP 1: SELECT CATEGORY */}
        {!category && (
          <div>
            <h2 style={{ fontSize: '20px', color: '#0f172a', marginBottom: '16px' }}>Select Registration Category</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <button onClick={() => setCategory('individual')} style={btnStyle}>👤 Individual Registration</button>
              <button onClick={() => { setCategory('group'); }} style={btnStyle}>📁 Group Portal Setup</button>
              <button onClick={() => { setCategory('organization'); }} style={btnStyle}>🏢 Corporate Organization Setup</button>
            </div>
          </div>
        )}

        {/* STEP 2: GROUP / ORG SUB-CHOICE */}
        {(category === 'group' || category === 'organization') && !subtype && (
          <div>
            <button onClick={() => setCategory(null)} style={{ background: 'none', border: 'none', color: '#4f46e5', cursor: 'pointer', marginBottom: '16px', fontWeight: 'bold' }}>← Back</button>
            <h2 style={{ fontSize: '18px', color: '#0f172a', marginBottom: '16px' }}>{category.toUpperCase()} Path Selection</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <button onClick={() => setSubtype('new')} style={btnStyle}>✨ New {category} (Owner Registration)</button>
              <button onClick={() => setSubtype('staff')} style={btnStyle}>🧑‍💼 Staff Sub-Account Activation</button>
              <button onClick={() => setSubtype('client')} style={btnStyle}>🤝 Client Sub-Account Activation</button>
            </div>
          </div>
        )}

        {/* ========================================== */}
        {/* FORM 1: INDIVIDUAL FORM */}
        {/* ========================================== */}
        {category === 'individual' && (
          <form onSubmit={handleRegisterSubmit} style={formGridStyle}>
            <div style={headerRowStyle}>
              <button type="button" onClick={() => setCategory(null)} style={backBtnStyle}>← Back</button>
              <h3 style={{ margin: 0, fontSize: '16px', color: '#0f172a' }}>Individual Registration Portal</h3>
            </div>
            
            <input type="text" placeholder="First Name *" required style={inputStyle} value={indForm.firstName} onChange={e => setIndForm({...indForm, firstName: e.target.value})} />
            <input type="text" placeholder="Last Name *" required style={inputStyle} value={indForm.lastName} onChange={e => setIndForm({...indForm, lastName: e.target.value})} />
            <input type="text" placeholder="Other Names" style={inputStyle} value={indForm.otherNames} onChange={e => setIndForm({...indForm, otherNames: e.target.value})} />
            <select style={inputStyle} value={indForm.gender} onChange={e => setIndForm({...indForm, gender: e.target.value})}>
              <option value="">Select Gender</option><option value="Male">Male</option><option value="Female">Female</option><option value="Other">Other</option>
            </select>
            <div>
              <label style={labelStyle}>Date of Birth</label>
              <input type="date" required style={inputStyle} value={indForm.dob} onChange={e => setIndForm({...indForm, dob: e.target.value})} />
            </div>
            <input type="email" placeholder="Email Address *" required style={inputStyle} value={indForm.email} onChange={e => setIndForm({...indForm, email: e.target.value})} />
            <input type="tel" placeholder="Phone Number *" required style={inputStyle} value={indForm.phone} onChange={e => setIndForm({...indForm, phone: e.target.value})} />
            <input type="text" placeholder="Nationality" style={inputStyle} value={indForm.nationality} onChange={e => setIndForm({...indForm, nationality: e.target.value})} />
            <input type="text" placeholder="State/Province" style={inputStyle} value={indForm.state} onChange={e => setIndForm({...indForm, state: e.target.value})} />
            <input type="text" placeholder="LGA/County" style={inputStyle} value={indForm.lga} onChange={e => setIndForm({...indForm, lga: e.target.value})} />
            <input type="text" placeholder="Religion" style={inputStyle} value={indForm.religion} onChange={e => setIndForm({...indForm, religion: e.target.value})} />
            <input type="text" placeholder="Occupation" style={inputStyle} value={indForm.occupation} onChange={e => setIndForm({...indForm, occupation: e.target.value})} />
            <input type="password" placeholder="Password *" required style={inputStyle} value={indForm.password} onChange={e => setIndForm({...indForm, password: e.target.value})} />
            <input type="password" placeholder="Confirm Password *" required style={inputStyle} value={indForm.confirmPassword} onChange={e => setIndForm({...indForm, confirmPassword: e.target.value})} />

            <button type="submit" style={submitBtnStyle}>Submit Individual Registration</button>
          </form>
        )}

        {/* ========================================== */}
        {/* FORM 2: CLIENT/STAFF FORM */}
        {/* ========================================== */}
        {subtype && subtype !== 'new' && (
          <form onSubmit={handleRegisterSubmit} style={formGridStyle}>
            <div style={headerRowStyle}>
              <button type="button" onClick={() => setSubtype(null)} style={backBtnStyle}>← Back</button>
              <h3 style={{ margin: 0, fontSize: '15px', color: '#0f172a' }}>Complete Account Activation ({subtype.toUpperCase()})</h3>
            </div>

            <div>
              <label style={labelStyle}>Select Group or Organization Name *</label>
              <select style={inputStyle} value={selectedGroupName} onChange={e => setSelectedGroupName(e.target.value)} required>
                <option value="">-- Choose Name of Group/Org --</option>
                <option value="NDDICL Group">NDDICL Group</option>
                <option value="Alpha Corp">Alpha Corp</option>
              </select>
            </div>

            <input type="text" placeholder="Organization Name (Auto-populated)" readOnly style={{...inputStyle, background: '#f1f5f9'}} value={selectedGroupName} />
            <input type="text" placeholder="Special ID Provided By Owner *" required style={inputStyle} value={subForm.specialId} onChange={e => setSubForm({...subForm, specialId: e.target.value})} />
            <input type="text" placeholder="First Name *" required style={inputStyle} value={subForm.firstName} onChange={e => setSubForm({...subForm, firstName: e.target.value})} />
            <input type="text" placeholder="Last Name *" required style={inputStyle} value={subForm.lastName} onChange={e => setSubForm({...subForm, lastName: e.target.value})} />
            <input type="text" placeholder="Other Names (Optional)" style={inputStyle} value={subForm.otherNames} onChange={e => setSubForm({...subForm, otherNames: e.target.value})} />
            
            <select style={inputStyle} value={subForm.gender} onChange={e => setSubForm({...subForm, gender: e.target.value})}>
              <option value="">Select Gender</option><option value="Male">Male</option><option value="Female">Female</option>
            </select>

            <div>
              <label style={labelStyle}>Date of Birth</label>
              <input type="date" required style={inputStyle} value={subForm.dob} onChange={e => setSubForm({...subForm, dob: e.target.value})} />
            </div>

            <input type="email" placeholder="Email Address *" required style={inputStyle} value={subForm.email} onChange={e => setSubForm({...subForm, email: e.target.value})} />
            <input type="tel" placeholder="Phone Number *" required style={inputStyle} value={subForm.phone} onChange={e => setSubForm({...subForm, phone: e.target.value})} />
            <input type="text" placeholder="Nationality" style={inputStyle} value={subForm.nationality} onChange={e => setSubForm({...subForm, nationality: e.target.value})} />
            <input type="text" placeholder="Country Of Residence" style={inputStyle} value={subForm.country} onChange={e => setSubForm({...subForm, country: e.target.value})} />
            <input type="text" placeholder="State/Province" style={inputStyle} value={subForm.state} onChange={e => setSubForm({...subForm, state: e.target.value})} />
            <input type="text" placeholder="LGA/County" style={inputStyle} value={subForm.lga} onChange={e => setSubForm({...subForm, lga: e.target.value})} />
            <input type="text" placeholder="Religion" style={inputStyle} value={subForm.religion} onChange={e => setSubForm({...subForm, religion: e.target.value})} />

            <div>
              <label style={labelStyle}>Qualifications</label>
              <select style={inputStyle} value={qualification} onChange={e => setQualification(e.target.value)}>
                <option value="">Select Qualification</option>
                <option value="BSc">BSc / BA</option>
                <option value="MSc">MSc / MA</option>
                <option value="PhD">PhD</option>
                <option value="Others">Others</option>
              </select>
              {qualification === 'Others' && (
                <input type="text" placeholder="Specify other qualification" style={{...inputStyle, marginTop: '8px'}} value={otherQualification} onChange={e => setOtherQualification(e.target.value)} />
              )}
            </div>

            <input type="text" placeholder="Occupation/Profession" style={inputStyle} value={subForm.occupation} onChange={e => setSubForm({...subForm, occupation: e.target.value})} />
            <input type="text" placeholder="Position(s) Held" style={inputStyle} value={subForm.positionHeld} onChange={e => setSubForm({...subForm, positionHeld: e.target.value})} />
            <input type="text" placeholder="Current Role Designation" style={inputStyle} value={subForm.roleDesignation} onChange={e => setSubForm({...subForm, roleDesignation: e.target.value})} />
            <textarea placeholder="Contact Address" style={{...inputStyle, minHeight: '60px'}} value={subForm.contactAddress} onChange={e => setSubForm({...subForm, contactAddress: e.target.value})} />
            <textarea placeholder="Skill(s) Acquired" style={{...inputStyle, minHeight: '60px'}} value={subForm.skillsAcquired} onChange={e => setSubForm({...subForm, skillsAcquired: e.target.value})} />
            
            <input type="password" placeholder="Password *" required style={inputStyle} value={subForm.password} onChange={e => setSubForm({...subForm, password: e.target.value})} />
            <input type="password" placeholder="Confirm Password *" required style={inputStyle} value={subForm.confirmPassword} onChange={e => setSubForm({...subForm, confirmPassword: e.target.value})} />

            <button type="submit" style={submitBtnStyle}>Submit for Owner Approval</button>
          </form>
        )}

        {/* ========================================== */}
        {/* FORM 3: OWNER / CORPORATE QUESTIONNAIRE */}
        {/* ========================================== */}
        {subtype === 'new' && (
          <form onSubmit={handleRegisterSubmit} style={formGridStyle}>
            <div style={headerRowStyle}>
              <button type="button" onClick={() => setSubtype(null)} style={backBtnStyle}>← Back</button>
              <h3 style={{ margin: 0, fontSize: '15px', color: '#0f172a' }}>{category.toUpperCase()} Owner & Corporate Portal</h3>
            </div>

            <h4 style={{ margin: '10px 0 0 0', color: '#4f46e5', fontSize: '14px' }}>Founder / Owner Personal Details</h4>
            <input type="text" placeholder="Full Legal Name *" required style={inputStyle} value={ownerForm.fullName} onChange={e => setOwnerForm({...ownerForm, fullName: e.target.value})} />
            <input type="text" placeholder="Preferred Name" style={inputStyle} value={ownerForm.preferredName} onChange={e => setOwnerForm({...ownerForm, preferredName: e.target.value})} />
            <div>
              <label style={labelStyle}>Date of Birth</label>
              <input type="date" required style={inputStyle} value={ownerForm.dob} onChange={e => setOwnerForm({...ownerForm, dob: e.target.value})} />
            </div>
            <select style={inputStyle} value={ownerForm.gender} onChange={e => setOwnerForm({...ownerForm, gender: e.target.value})}>
              <option value="">Select Gender</option><option value="Male">Male</option><option value="Female">Female</option>
            </select>
            <input type="text" placeholder="Nationality" style={inputStyle} value={ownerForm.nationality} onChange={e => setOwnerForm({...ownerForm, nationality: e.target.value})} />
            <input type="text" placeholder="Country of Residence" style={inputStyle} value={ownerForm.countryOfRes} onChange={e => setOwnerForm({...ownerForm, countryOfRes: e.target.value})} />
            <textarea placeholder="Residential Address" style={inputStyle} value={ownerForm.residentialAddress} onChange={e => setOwnerForm({...ownerForm, residentialAddress: e.target.value})} />
            <input type="tel" placeholder="Phone Number" style={inputStyle} value={ownerForm.phone} onChange={e => setOwnerForm({...ownerForm, phone: e.target.value})} />
            <input type="email" placeholder="Email Address" style={inputStyle} value={ownerForm.email} onChange={e => setOwnerForm({...ownerForm, email: e.target.value})} />
            
            <input type="text" placeholder="Identification Type (e.g., Passport, NIN)" style={inputStyle} value={ownerForm.idType} onChange={e => setOwnerForm({...ownerForm, idType: e.target.value})} />
            <input type="text" placeholder="Identification Number" style={inputStyle} value={ownerForm.idNumber} onChange={e => setOwnerForm({...ownerForm, idNumber: e.target.value})} />
            <div>
              <label style={labelStyle}>Date of Issue</label>
              <input type="date" style={inputStyle} value={ownerForm.dateIssue} onChange={e => setOwnerForm({...ownerForm, dateIssue: e.target.value})} />
            </div>
            <div>
              <label style={labelStyle}>Expiry Date</label>
              <input type="date" style={inputStyle} value={ownerForm.expiryDate} onChange={e => setOwnerForm({...ownerForm, expiryDate: e.target.value})} />
            </div>

            <label style={labelStyle}>Position in the Company</label>
            <select style={inputStyle} value={ownerForm.companyPosition} onChange={e => setOwnerForm({...ownerForm, companyPosition: e.target.value})}>
              <option value="Founder">Founder</option>
              <option value="Owner">Owner</option>
              <option value="Director">Director</option>
              <option value="Managing Director/CEO">Managing Director/CEO</option>
              <option value="Chairman">Chairman</option>
              <option value="Partner">Partner</option>
              <option value="Other">Other</option>
            </select>

            <input type="text" placeholder="Staff Strength / Member Scope" style={inputStyle} value={ownerForm.staffStrength} onChange={e => setOwnerForm({...ownerForm, staffStrength: e.target.value})} />
            <input type="text" placeholder="Previous Business Experience" style={inputStyle} value={ownerForm.prevExperience} onChange={e => setOwnerForm({...ownerForm, prevExperience: e.target.value})} />
            <input type="text" placeholder="Current Occupation" style={inputStyle} value={ownerForm.currentOccupation} onChange={e => setOwnerForm({...ownerForm, currentOccupation: e.target.value})} />
            <input type="text" placeholder="Professional Qualifications" style={inputStyle} value={ownerForm.profQualifications} onChange={e => setOwnerForm({...ownerForm, profQualifications: e.target.value})} />
            <input type="text" placeholder="Professional Memberships" style={inputStyle} value={ownerForm.profMemberships} onChange={e => setOwnerForm({...ownerForm, profMemberships: e.target.value})} />
            <input type="number" placeholder="Years of Business Experience" style={inputStyle} value={ownerForm.yearsExperience} onChange={e => setOwnerForm({...ownerForm, yearsExperience: e.target.value})} />

            <h4 style={{ margin: '15px 0 0 0', color: '#4f46e5', fontSize: '14px' }}>Corporate & Entity Details</h4>
            <input type="text" placeholder="Registered Company Name *" required style={inputStyle} value={ownerForm.registeredName} onChange={e => setOwnerForm({...ownerForm, registeredName: e.target.value})} />
            <input type="text" placeholder="Trading / Business Name" style={inputStyle} value={ownerForm.tradingName} onChange={e => setOwnerForm({...ownerForm, tradingName: e.target.value})} />
            <input type="text" placeholder="Company Registration Number *" required style={inputStyle} value={ownerForm.regNumber} onChange={e => setOwnerForm({...ownerForm, regNumber: e.target.value})} />
            
            <label style={labelStyle}>Type of Entity</label>
            <select style={inputStyle} value={ownerForm.entityType} onChange={e => setOwnerForm({...ownerForm, entityType: e.target.value})}>
              <option value="Private Limited Company">Private Limited Company</option>
              <option value="Public Limited Company">Public Limited Company</option>
              <option value="Partnership">Partnership</option>
              <option value="LLP">LLP</option>
              <option value="Cooperative">Cooperative</option>
              <option value="Nonprofit">Nonprofit</option>
              <option value="Sole Proprietorship">Sole Proprietorship</option>
              <option value="Other">Other</option>
            </select>

            <div>
              <label style={labelStyle}>Date of Incorporation / Registration</label>
              <input type="date" style={inputStyle} value={ownerForm.incorporationDate} onChange={e => setOwnerForm({...ownerForm, incorporationDate: e.target.value})} />
            </div>
            <input type="text" placeholder="Country of Incorporation" style={inputStyle} value={ownerForm.countryInc} onChange={e => setOwnerForm({...ownerForm, countryInc: e.target.value})} />
            <input type="text" placeholder="State/Province" style={inputStyle} value={ownerForm.stateInc} onChange={e => setOwnerForm({...ownerForm, stateInc: e.target.value})} />
            <textarea placeholder="Registered Office Address" style={inputStyle} value={ownerForm.registeredOffice} onChange={e => setOwnerForm({...ownerForm, registeredOffice: e.target.value})} />
            <textarea placeholder="Principal Business Address" style={inputStyle} value={ownerForm.principalAddress} onChange={e => setOwnerForm({...ownerForm, principalAddress: e.target.value})} />
            <input type="text" placeholder="Branch Locations" style={inputStyle} value={ownerForm.branchLocations} onChange={e => setOwnerForm({...ownerForm, branchLocations: e.target.value})} />
            <input type="url" placeholder="Company Website" style={inputStyle} value={ownerForm.website} onChange={e => setOwnerForm({...ownerForm, website: e.target.value})} />
            <input type="email" placeholder="Corporate Email" style={inputStyle} value={ownerForm.corpEmail} onChange={e => setOwnerForm({...ownerForm, corpEmail: e.target.value})} />
            <input type="tel" placeholder="Corporate Phone Number" style={inputStyle} value={ownerForm.corpPhone} onChange={e => setOwnerForm({...ownerForm, corpPhone: e.target.value})} />
            <input type="text" placeholder="Social Media Accounts" style={inputStyle} value={ownerForm.socials} onChange={e => setOwnerForm({...ownerForm, socials: e.target.value})} />

            <h4 style={{ margin: '15px 0 0 0', color: '#4f46e5', fontSize: '14px' }}>Business Operations & Vision</h4>
            <textarea placeholder="Company Description" style={inputStyle} value={ownerForm.description} onChange={e => setOwnerForm({...ownerForm, description: e.target.value})} />
            <textarea placeholder="Company's Mission" style={inputStyle} value={ownerForm.mission} onChange={e => setOwnerForm({...ownerForm, mission: e.target.value})} />
            <textarea placeholder="Company's Vision" style={inputStyle} value={ownerForm.vision} onChange={e => setOwnerForm({...ownerForm, vision: e.target.value})} />
            <textarea placeholder="Company's Core Values" style={inputStyle} value={ownerForm.coreValues} onChange={e => setOwnerForm({...ownerForm, coreValues: e.target.value})} />
            
            <input type="text" placeholder="Primary Industry" style={inputStyle} value={ownerForm.primaryIndustry} onChange={e => setOwnerForm({...ownerForm, primaryIndustry: e.target.value})} />
            <input type="text" placeholder="Secondary Industry / Industries" style={inputStyle} value={ownerForm.secondaryIndustry} onChange={e => setOwnerForm({...ownerForm, secondaryIndustry: e.target.value})} />
            <textarea placeholder="Main Business Activities" style={inputStyle} value={ownerForm.mainActivities} onChange={e => setOwnerForm({...ownerForm, mainActivities: e.target.value})} />
            <textarea placeholder="Main Products / Services" style={inputStyle} value={ownerForm.productsServices} onChange={e => setOwnerForm({...ownerForm, productsServices: e.target.value})} />
            <input type="text" placeholder="Target Market" style={inputStyle} value={ownerForm.targetMarket} onChange={e => setOwnerForm({...ownerForm, targetMarket: e.target.value})} />

            <input type="password" placeholder="Password *" required style={inputStyle} value={ownerForm.password} onChange={e => setOwnerForm({...ownerForm, password: e.target.value})} />
            <input type="password" placeholder="Confirm Password *" required style={inputStyle} value={ownerForm.confirmPassword} onChange={e => setOwnerForm({...ownerForm, confirmPassword: e.target.value})} />

            <button type="submit" style={submitBtnStyle}>Submit Corporate Registration Under Review</button>
          </form>
        )}

      </div>
    </div>
  );
}

// Reusable inline style constants
const btnStyle = { padding: '12px', borderRadius: '8px', border: '1px solid #cbd5e1', background: '#f8fafc', fontWeight: '600', cursor: 'pointer', textAlign: 'left', color: '#334155' };
const formGridStyle = { display: 'flex', flexDirection: 'column', gap: '12px' };
const headerRowStyle = { display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' };
const backBtnStyle = { padding: '6px 12px', background: '#e2e8f0', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '13px' };
const inputStyle = { width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', boxSizing: 'border-box', fontSize: '13px' };
const labelStyle = { display: 'block', fontSize: '12px', fontWeight: '600', color: '#334155', marginBottom: '4px' };
const submitBtnStyle = { background: '#4f46e5', color: 'white', border: 'none', padding: '12px', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', marginTop: '10px', width: '100%' };
