import React, { useState } from 'react';

export default function WorkspaceManager() {
  const [inviteMethod, setInviteMethod] = useState('email'); // 'email', 'phone', or 'id'
  const [inputValue, setInputValue] = useState('');
  const [collaborators, setCollaborators] = useState([]);
  const [generatedId, setGeneratedId] = useState('');

  // Function to handle generating a unique ID or sending an invite
  const handleInvite = (e) => {
    e.preventDefault();
    if (!inputValue && inviteMethod !== 'id') return;

    // Generate a unique workspace code if requested or simulate sending
    const uniqueCode = 'DOC-' + Math.random().toString(36).substring(2, 8).toUpperCase();
    
    const newCollaborator = {
      id: Date.now(),
      type: inviteMethod,
      value: inviteMethod === 'id' ? uniqueCode : inputValue,
      code: uniqueCode,
      status: 'Active'
    };

    setCollaborators([...collaborators, newCollaborator]);
    if (inviteMethod === 'id') {
      setGeneratedId(uniqueCode);
    }
    setInputValue('');
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto', fontFamily: 'sans-serif', background: '#f9f9f9', borderRadius: '8px', border: '1px solid #ddd' }}>
      <h2>docShare Shared Environment</h2>
      <p>Invite colleagues, friends, or collaborators to your workspace so you can build and review presentations together.</p>

      {/* Method Selection Tabs */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '15px' }}>
        <button 
          onClick={() => setInviteMethod('email')} 
          style={{ padding: '8px 12px', background: inviteMethod === 'email' ? '#0070f3' : '#eee', color: inviteMethod === 'email' ? '#fff' : '#333', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
          By Email
        </button>
        <button 
          onClick={() => setInviteMethod('phone')} 
          style={{ padding: '8px 12px', background: inviteMethod === 'phone' ? '#0070f3' : '#eee', color: inviteMethod === 'phone' ? '#fff' : '#333', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
          By Phone Number
        </button>
        <button 
          onClick={() => setInviteMethod('id')} 
          style={{ padding: '8px 12px', background: inviteMethod === 'id' ? '#0070f3' : '#eee', color: inviteMethod === 'id' ? '#fff' : '#333', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
          Generate Unique ID
        </button>
      </div>

      {/* Invitation Form */}
      <form onSubmit={handleInvite} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {inviteMethod !== 'id' ? (
          <input 
            type={inviteMethod === 'email' ? 'email' : 'tel'} 
            placeholder={inviteMethod === 'email' ? 'Enter collaborator email...' : 'Enter phone number...'} 
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            style={{ padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
          />
        ) : (
          <p style={{ fontSize: '14px', color: '#555', margin: '0' }}>Click below to create a unique workspace ID that anyone can use to connect.</p>
        )}

        <button type="submit" style={{ padding: '10px', background: '#0070f3', color: '#fff', border: 'none', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer' }}>
          {inviteMethod === 'id' ? 'Generate Unique Code' : 'Send Invite'}
        </button>
      </form>

      {generatedId && (
        <div style={{ marginTop: '15px', padding: '10px', background: '#e6f4ea', border: '1px solid #34a853', borderRadius: '4px' }}>
          <strong>Generated Unique ID:</strong> <span style={{ fontFamily: 'monospace', fontSize: '16px' }}>{generatedId}</span>
          <p style={{ fontSize: '12px', margin: '5px 0 0 0' }}>Share this code with your collaborator so they can link to your workspace.</p>
        </div>
      )}

      {/* Active Collaborators List */}
      <h3 style={{ marginTop: '25px' }}>Active Workspace Members</h3>
      {collaborators.length === 0 ? (
        <p style={{ color: '#777', fontSize: '14px' }}>No collaborators added yet.</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: '0', margin: '0' }}>
          {collaborators.map((c) => (
            <li key={c.id} style={{ background: '#fff', padding: '10px', marginBottom: '8px', border: '1px solid #eee', borderRadius: '4px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <strong>{c.type.toUpperCase()}:</strong> {c.value}
                <div style={{ fontSize: '12px', color: '#666' }}>Workspace ID: {c.code}</div>
              </div>
              <span style={{ background: '#e2f0cb', color: '#2d6a4f', padding: '2px 8px', borderRadius: '12px', fontSize: '12px' }}>{c.status}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
