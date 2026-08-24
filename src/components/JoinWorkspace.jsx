import React, { useState } from 'react';

export default function JoinWorkspace() {
  const [workspaceId, setWorkspaceId] = useState('');
  const [status, setStatus] = useState(null); // 'connecting', 'success', 'error'

  const handleJoin = (e) => {
    e.preventDefault();
    if (!workspaceId.trim()) return;

    setStatus('connecting');

    // Simulating connection check
    setTimeout(() => {
      if (workspaceId.toUpperCase().startsWith('DOC-')) {
        setStatus('success');
      } else {
        setStatus('error');
      }
    }, 1000);
  };

  return (
    <div style={{ padding: '20px', maxWidth: '450px', margin: '20px auto', fontFamily: 'sans-serif', background: '#fff', borderRadius: '8px', border: '1px solid #ddd', boxShadow: '0 2px 5px rgba(0,0,0,0.05)' }}>
      <h2>Join a Shared Environment</h2>
      <p style={{ color: '#666', fontSize: '14px' }}>
        Enter the Unique Workspace ID shared with you by the document owner to start collaborating.
      </p>

      <form onSubmit={handleJoin} style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '15px' }}>
        <div>
          <label style={{ display: 'block', marginBottom: '6px', fontSize: '13px', fontWeight: 'bold' }}>
            Workspace ID / Code
          </label>
          <input 
            type="text" 
            placeholder="e.g. DOC-A1B2C3" 
            value={workspaceId}
            onChange={(e) => setWorkspaceId(e.target.value)}
            style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc', textTransform: 'uppercase', fontFamily: 'monospace' }}
          />
        </div>

        <button 
          type="submit" 
          disabled={status === 'connecting'}
          style={{ padding: '10px', background: '#0070f3', color: '#fff', border: 'none', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer' }}>
          {status === 'connecting' ? 'Connecting...' : 'Connect to Environment'}
        </button>
      </form>

      {/* Success Message */}
      {status === 'success' && (
        <div style={{ marginTop: '15px', padding: '10px', background: '#e6f4ea', border: '1px solid #34a853', borderRadius: '4px', color: '#137333' }}>
          ✓ Connected successfully! Opening shared workspace...
        </div>
      )}

      {/* Error Message */}
      {status === 'error' && (
        <div style={{ marginTop: '15px', padding: '10px', background: '#fce8e6', border: '1px solid #ea4335', borderRadius: '4px', color: '#c5221f' }}>
          ✕ Invalid Workspace ID. Please check the code and try again.
        </div>
      )}
    </div>
  );
}

