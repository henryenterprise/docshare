import React, { useState } from 'react';

export default function WorkspaceManager({ onClose }) {
  const [isActivated, setIsActivated] = useState(false);
  const [behaviorStyle, setBehaviorStyle] = useState('co-editor'); // 'co-editor', 'commenter', 'viewer'
  const [accessCode, setAccessCode] = useState('');
  const [collaborators, setCollaborators] = useState([]);

  // Function to authorize and initialize the shared environment
  const handleAuthorizeSharing = (e) => {
    e.preventDefault();
    const uniqueCode = 'DOC-ENV-' + Math.random().toString(36).substring(2, 8).toUpperCase();
    setAccessCode(uniqueCode);
    setIsActivated(true);
  };

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: '0', background: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 }}>
      <div style={{ background: '#fff', padding: '25px', borderRadius: '8px', width: '90%', maxWidth: '500px', fontFamily: 'sans-serif', boxShadow: '0 4px 12px rgba(0,0,0,0.15)' }}>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
          <h2 style={{ margin: 0, fontSize: '18px' }}>Share Workspace Environment</h2>
          <button onClick={onClose} style={{ background: 'none', border: 'none', fontSize: '18px', cursor: 'pointer' }}>✕</button>
        </div>

        {!isActivated ? (
          <div>
            <p style={{ fontSize: '14px', color: '#555', lineHeight: '1.5' }}>
              Authorize sharing to turn this document workspace into a live collaborative environment. As the administrator, you set the behavioral styles for incoming collaborators.
            </p>

            <form onSubmit={handleAuthorizeSharing} style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '15px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 'bold', marginBottom: '5px' }}>
                  Collaborator Behavioral Style / Permissions
                </label>
                <select 
                  value={behaviorStyle} 
                  onChange={(e) => setBehaviorStyle(e.target.value)}
                  style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
                >
                  <option value="co-editor">Co-Editor (Can edit content live)</option>
                  <option value="commenter">Commenter (Can leave feedback & suggestions)</option>
                  <option value="viewer">Viewer (Read-only access)</option>
                </select>
              </div>

              <button 
                type="submit" 
                style={{ padding: '10px', background: '#0070f3', color: '#fff', border: 'none', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer' }}>
                Authorize & Generate Workspace ID
              </button>
            </form>
          </div>
        ) : (
          <div>
            <div style={{ background: '#e6f4ea', border: '1px solid #34a853', padding: '12px', borderRadius: '4px', marginBottom: '15px' }}>
              <div style={{ fontSize: '13px', color: '#137333', fontWeight: 'bold' }}>✓ Workspace Shared Successfully</div>
              <div style={{ fontSize: '12px', color: '#555', marginTop: '4px' }}>Behavioral Mode: <strong>{behaviorStyle.toUpperCase()}</strong></div>
              <div style={{ marginTop: '8px', fontSize: '14px' }}>
                Unique Access ID: <span style={{ fontFamily: 'monospace', fontWeight: 'bold', color: '#000' }}>{accessCode}</span>
              </div>
            </div>

            <p style={{ fontSize: '13px', color: '#666' }}>
              Share this Unique ID via email, phone, or direct message. When a collaborator signs in and enters it, they will join your environment under your specified permissions.
            </p>

            <button 
              onClick={() => setIsActivated(false)} 
              style={{ width: '100%', padding: '10px', background: '#eee', color: '#333', border: 'none', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer', marginTop: '10px' }}>
              Modify Settings
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
