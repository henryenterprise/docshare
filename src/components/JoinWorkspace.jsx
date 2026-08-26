import React, { useState } from 'react';
import { supabase } from '../utils/supabase';
export default function JoinWorkspace({ onJoinSuccess }) {
  const [workspaceCode, setWorkspaceCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleJoin = async (e) => {
    e.preventDefault();
    if (!workspaceCode.trim()) return;

    setLoading(true);
    setErrorMessage('');

    // Query Supabase to check if the workspace code exists
    const { data, error } = await supabase
      .from('workspaces')
      .select('*')
      .eq('workspace_code', workspaceCode.trim().toUpperCase())
      .single();

    setLoading(false);

    if (error || !data) {
      setErrorMessage('Invalid or expired Workspace ID. Please check and try again.');
    } else {
      // Successfully found workspace, pass the code back up
      onJoinSuccess(data.workspace_code, data.behavior_style);
    }
  };

  return (
    <div style={{ background: '#fff', padding: '30px', borderRadius: '8px', maxWidth: '400px', margin: '40px auto', border: '1px solid #ddd', fontFamily: 'sans-serif' }}>
      <h2 style={{ margin: '0 0 10px 0', fontSize: '20px' }}>Join Shared Workspace</h2>
      <p style={{ fontSize: '14px', color: '#666', marginBottom: '20px' }}>
        Enter the Unique Access ID provided by the workspace admin to connect.
      </p>

      <form onSubmit={handleJoin} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <input 
          type="text" 
          placeholder="e.g. DOC-ABC123" 
          value={workspaceCode}
          onChange={(e) => setWorkspaceCode(e.target.value)}
          style={{ padding: '10px', borderRadius: '4px', border: '1px solid #ccc', fontSize: '14px', textTransform: 'uppercase' }}
        />

        {errorMessage && (
          <div style={{ fontSize: '12px', color: '#d93025', background: '#fce8e6', padding: '8px', borderRadius: '4px' }}>
            {errorMessage}
          </div>
        )}

        <button 
          type="submit" 
          disabled={loading}
          style={{ padding: '10px', background: '#0070f3', color: '#fff', border: 'none', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer' }}>
          {loading ? 'Verifying ID...' : 'Join Workspace'}
        </button>
      </form>
    </div>
  );
}
