import React, { useState } from 'react';
import WorkspaceManager from './WorkspaceManager';
import JoinWorkspace from './JoinWorkspace';
import SharedWorkspaceEditor from './SharedWorkspaceEditor';

export default function App() {
  const [currentView, setCurrentView] = useState('dashboard'); // 'dashboard', 'active-workspace', 'join-workspace'
  const [showShareModal, setShowShareModal] = useState(false);
  const [userRole, setUserRole] = useState('admin'); // 'admin' or 'collaborator'
  const [activeWorkspaceId, setActiveWorkspaceId] = useState(null);
  const [behaviorStyle, setBehaviorStyle] = useState('co-editor');

  // Triggered when user successfully authorizes a shared environment
  const handleWorkspaceInitialized = (code, style) => {
    setActiveWorkspaceId(code);
    setBehaviorStyle(style);
    setUserRole('admin');
    setShowShareModal(false);
    setCurrentView('active-workspace');
  };

  // Triggered when collaborator successfully joins via ID
  const handleJoinSuccess = (code) => {
    setActiveWorkspaceId(code);
    setUserRole('collaborator');
    setBehaviorStyle('co-editor'); // Default or fetched style from backend later
    setCurrentView('active-workspace');
  };

  return (
    <div style={{ minHeight: '100vh', background: '#f4f6f8', padding: '20px', fontFamily: 'sans-serif' }}>
      
      {/* Top Header Navigation */}
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#fff', padding: '15px 20px', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
        <h1 
          onClick={() => setCurrentView('dashboard')} 
          style={{ margin: 0, fontSize: '20px', color: '#333', cursor: 'pointer' }}>
          docShare Workspace
        </h1>
        
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          {currentView === 'dashboard' && (
            <>
              <button 
                onClick={() => setShowShareModal(true)}
                style={{ padding: '8px 14px', background: '#34a853', color: '#fff', border: 'none', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer' }}>
                🔗 Share Workspace
              </button>
              <button 
                onClick={() => setCurrentView('join-workspace')}
                style={{ padding: '8px 14px', background: '#eee', color: '#333', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                Join with Unique ID
              </button>
            </>
          )}

          {currentView !== 'dashboard' && (
            <button 
              onClick={() => setCurrentView('dashboard')}
              style={{ padding: '8px 14px', background: '#d93025', color: '#fff', border: 'none', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer' }}>
              Exit Workspace
            </button>
          )}
        </div>
      </header>

      {/* Dynamic Content Views */}
      <main style={{ marginTop: '20px' }}>
        {currentView === 'dashboard' && (
          <div style={{ background: '#fff', padding: '40px', borderRadius: '8px', textAlign: 'center', border: '1px solid #ddd' }}>
            <h2>Welcome to Your Personal Document Hub</h2>
            <p style={{ color: '#666', maxWidth: '500px', margin: '10px auto 20px auto' }}>
              Manage your personal files securely. Whenever you are ready to collaborate, tap "Share Workspace" above to initialize an environment or join an existing one.
            </p>
          </div>
        )}

        {currentView === 'join-workspace' && (
          <div>
            <JoinWorkspace onJoinSuccess={handleJoinSuccess} />
          </div>
        )}

        {currentView === 'active-workspace' && (
          <SharedWorkspaceEditor 
            userRole={userRole} 
            workspaceId={activeWorkspaceId} 
            behaviorStyle={behaviorStyle} 
          />
        )}
      </main>

      {/* Share Authorization Modal */}
      {showShareModal && (
        <WorkspaceManager 
          onClose={() => setShowShareModal(false)} 
          onInitialize={handleWorkspaceInitialized}
        />
      )}

    </div>
  );
}
