import React, { useState } from 'react';
import { supabase } from '../lib/supabase';

export default function WorkspaceManager({ onClose, onInitialize }) {
  const [behaviorStyle, setBehaviorStyle] = useState('co-editor');
  const [loading, setLoading] = useState(false);

  const handleAuthorizeSharing = async (e) => {
    e.preventDefault();
    setLoading(true);

    const uniqueCode = 'DOC-' + Math.random().toString(36).substring(2, 8).toUpperCase();
    const mockAdminId = 'user_' + Math.random().toString(36).substring(2, 7);

    // Insert workspace into Supabase
    const { error: wsError } = await supabase
      .from('workspaces')
      .insert([{ workspace_code: uniqueCode, admin_id: mockAdminId, behavior_style: behaviorStyle }]);

    if (wsError) {
      alert('Error creating workspace: ' + wsError.message);
      setLoading(false);
      return;
    }

    // Initialize default document for this workspace
    await supabase
      .from('documents')
      .insert([{ workspace_code: uniqueCode, title: 'Untitled Presentation', content: 'Start typing your document or presentation slides here...' }]);

    setLoading(false);
    onInitialize(uniqueCode, behaviorStyle);
  };

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 }}>
      <div style={{ background: '#fff', padding: '25px', borderRadius: '8px', width: '90%', maxWidth: '500px', fontFamily: 'sans-serif', boxShadow: '0 4px 12px rgba(0,0,0,0.15)' }}>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
          <h2 style={{ margin: 0, fontSize: '18px' }}>Share Workspace Environment</h2>
          <button onClick={onClose} style={{ background: 'none', border: 'none', fontSize: '18px', cursor: 'pointer' }}>✕</button>
        </div>

        <p style={{ fontSize: '14px', color: '#555', lineHeight: '1.5' }}>
          Authorize sharing to turn this document workspace into a live collaborative environment. You will govern the behavioral styles for incoming collaborators.
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
            disabled={loading}
            style={{ padding: '10px', background: '#0070f3', color: '#fff', border: 'none', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer' }}>
            {loading ? 'Initializing...' : 'Authorize & Generate Live Workspace ID'}
          </button>
        </form>

      </div>
    </div>
  );
}
