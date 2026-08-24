import React, { useState } from 'react';
import WorkspaceManager from './WorkspaceManager';
import JoinWorkspace from './JoinWorkspace';

export default function App() {
  const [showShareModal, setShowShareModal] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard'); // 'dashboard' or 'join'

  return (
    <div style={{ minHeight: '100vh', background: '#f4f6f8', padding: '20px', fontFamily: 'sans-serif' }}>
      
      {/* Dashboard Top Header */}
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#fff', padding: '15px 20px', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
        <h1 style={{ margin: 0, fontSize: '20px', color: '#333' }}>docShare Workspace</h1>
        
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          {/* The Share Button embedded in every user's dashboard */}
          <button 
            onClick={() => setShowShareModal(true)}
            style={{ padding: '8px 14px', background: '#34a853', color: '#fff', border: 'none', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer' }}>
            🔗 Share Workspace
          </button>

          <button 
            onClick={() => setActiveTab(activeTab === 'dashboard' ? 'join' : 'dashboard')}
            style={{ padding: '8px 14px', background: '#eee', color: '#333', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
            {activeTab === 'dashboard' ? 'Join Someone Else\'s Workspace' : 'Back to My Dashboard'}
          </button>
        </div>
      </header>

      {/* Main View Area */}
      <main style={{ marginTop: '20px' }}>
        {activeTab === 'dashboard' ? (
          <div style={{ background: '#fff', padding: '30px', borderRadius: '8px', textAlign: 'center', border: '1px solid #ddd' }}>
            <h2>Welcome to Your Personal Document Hub</h2>
            <p style={{ color: '#666' }}>Create, edit, and manage your documents. Tap "Share Workspace" above at any time to invite others and become the administrator of a shared environment.</p>
          </div>
        ) : (
          <JoinWorkspace />
        )}
      </main>

      {/* Popup Window / Modal for Sharing Authorization */}
      {showShareModal && (
        <WorkspaceManager onClose={() => setShowShareModal(false)} />
      )}

    </div>
  );
}
