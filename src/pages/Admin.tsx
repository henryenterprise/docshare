import React, { useState } from 'react';

export default function AdminPortal() {
  const [activeTab, setActiveTab] = useState('overview');

  // State mockups for Super Admin controls
  const [pages, setPages] = useState(['Home', 'Dashboard', 'Directory', 'Analytics']);
  const [newPageName, setNewPageName] = useState('');
  const [adCampaigns, setAdCampaigns] = useState([
    { id: 1, title: 'Telecom Promo Banner', placement: 'Home Page', playTime: '15s', active: true }
  ]);
  const [systemLogs] = useState([
    { id: 1, time: '2026-08-25 20:42', event: 'New corporate registration submitted (Alpha Corp)', type: 'info' },
    { id: 2, time: '2026-08-25 20:30', event: 'OTA JavaScript bundle version 1.2.4 deployed', type: 'success' },
  ]);

  const handleAddPage = (e) => {
    e.preventDefault();
    if (newPageName.trim()) {
      setPages([...pages, newPageName.trim()]);
      setNewPageName('');
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: '#0f172a', color: '#f8fafc', fontFamily: 'sans-serif', display: 'flex' }}>
      
      {/* SIDEBAR NAVIGATION */}
      <div style={{ width: '260px', background: '#1e293b', borderRight: '1px solid #334155', padding: '20px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <h2 style={{ fontSize: '18px', color: '#38bdf8', marginBottom: '20px' }}>⚡ Super Admin Portal</h2>
        
        <button onClick={() => setActiveTab('overview')} style={navBtnStyle(activeTab === 'overview')}>📊 System Overview & Logs</button>
        <button onClick={() => setActiveTab('pages')} style={navBtnStyle(activeTab === 'pages')}>📄 Dynamic Pages & Layouts</button>
        <button onClick={() => setActiveTab('ads')} style={navBtnStyle(activeTab === 'ads')}>📢 Adverts & Play-Time Config</button>
        <button onClick={() => setActiveTab('media')} style={navBtnStyle(activeTab === 'media')}>🎥 Media & Asset Pipeline</button>
        <button onClick={() => setActiveTab('users')} style={navBtnStyle(activeTab === 'users')}>👥 User & Account Governance</button>
        <button onClick={() => setActiveTab('ota')} style={navBtnStyle(activeTab === 'ota')}>🚀 Zero-Code OTA Updates</button>
      </div>

      {/* MAIN CONTENT AREA */}
      <div style={{ flex: 1, padding: '40px', overflowY: 'auto' }}>
        
        {/* TAB 1: OVERVIEW */}
        {activeTab === 'overview' && (
          <div>
            <h1 style={{ fontSize: '22px', marginBottom: '10px' }}>Environment & Traffic Overview</h1>
            <p style={{ color: '#94a3b8', fontSize: '14px', marginBottom: '20px' }}>Real-time telemetry and operational logs across your app infrastructure.</p>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '30px' }}>
              <div style={cardStyle}><h3>Active Users</h3><p style={{ fontSize: '24px', fontWeight: 'bold', color: '#38bdf8' }}>1,248</p></div>
              <div style={cardStyle}><h3>API Latency</h3><p style={{ fontSize: '24px', fontWeight: 'bold', color: '#34d399' }}>42ms</p></div>
              <div style={cardStyle}><h3>System Health</h3><p style={{ fontSize: '24px', fontWeight: 'bold', color: '#a78bfa' }}>Optimal (99.9%)</p></div>
            </div>

            <h3 style={{ fontSize: '16px', marginBottom: '10px' }}>Live System Event Stream</h3>
            <div style={{ background: '#1e293b', border: '1px solid #334155', borderRadius: '8px', padding: '15px' }}>
              {systemLogs.map(log => (
                <div key={log.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #334155', fontSize: '13px' }}>
                  <span style={{ color: '#38bdf8' }}>{log.time}</span>
                  <span style={{ flex: 1, margin: '0 15px' }}>{log.event}</span>
                  <span style={{ color: log.type === 'success' ? '#34d399' : '#facc15' }}>● {log.type}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 2: PAGES & LAYOUTS */}
        {activeTab === 'pages' && (
          <div>
            <h1 style={{ fontSize: '22px', marginBottom: '10px' }}>Dynamic Page Engine</h1>
            <p style={{ color: '#94a3b8', fontSize: '14px', marginBottom: '20px' }}>Inject pages, customize navigational icons, and edit graphic views without code deployments.</p>

            <form onSubmit={handleAddPage} style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
              <input type="text" placeholder="New Page Name (e.g. Portfolio)" value={newPageName} onChange={e => setNewPageName(e.target.value)} style={inputStyle} />
              <button type="submit" style={actionBtnStyle}>+ Add Page Dynamically</button>
            </form>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {pages.map((page, idx) => (
                <div key={idx} style={{ background: '#1e293b', padding: '12px 16px', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', border: '1px solid #334155' }}>
                  <span>📄 {page}</span>
                  <span style={{ fontSize: '12px', color: '#34d399', background: '#064e3b', padding: '4px 8px', borderRadius: '4px' }}>Active Manifest</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: ADVERTS & PLAY-TIME */}
        {activeTab === 'ads' && (
          <div>
            <h1 style={{ fontSize: '22px', marginBottom: '10px' }}>Ad-Server & Play-Time Engine</h1>
            <p style={{ color: '#94a3b8', fontSize: '14px', marginBottom: '20px' }}>Deploy promotional campaigns across pages and set exact playback durations.</p>
            {adCampaigns.map(ad => (
              <div key={ad.id} style={{ background: '#1e293b', padding: '15px', borderRadius: '8px', border: '1px solid #334155', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <h4 style={{ margin: '0 0 4px 0' }}>{ad.title}</h4>
                  <p style={{ margin: 0, fontSize: '12px', color: '#94a3b8' }}>Placement: {ad.placement} | Play Time: {ad.playTime}</p>
                </div>
                <span style={{ color: '#34d399', fontWeight: 'bold' }}>Live</span>
              </div>
            ))}
          </div>
        )}

        {/* TAB 4: MEDIA MANAGEMENT */}
        {activeTab === 'media' && (
          <div>
            <h1 style={{ fontSize: '22px', marginBottom: '10px' }}>Multimedia Asset Pipeline</h1>
            <p style={{ color: '#94a3b8', fontSize: '14px', marginBottom: '20px' }}>Seamlessly upload and transcode videos, audio files, and high-res brand graphics.</p>
            <div style={{ border: '2px dashed #475569', borderRadius: '12px', padding: '40px', textAlign: 'center', background: '#1e293b', cursor: 'pointer' }}>
              <p style={{ margin: '0 0 10px 0', fontSize: '16px', fontWeight: '600' }}>Drag & Drop media files here, or browse storage</p>
              <span style={{ fontSize: '12px', color: '#94a3b8' }}>Supports MP4, HLS, MP3, PNG, SVG, WebP</span>
            </div>
          </div>
        )}

        {/* TAB 5: USER GOVERNANCE */}
        {activeTab === 'users' && (
          <div>
            <h1 style={{ fontSize: '22px', marginBottom: '10px' }}>Account & Security Governance</h1>
            <p style={{ color: '#94a3b8', fontSize: '14px', marginBottom: '20px' }}>Monitor user tiers, review corporate compliance data, or instantly disable rogue accounts.</p>
            <div style={{ background: '#1e293b', padding: '15px', borderRadius: '8px', border: '1px solid #334155', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <p style={{ margin: '0 0 4px 0', fontWeight: '600' }}>henry@enterprise.com (Owner - Alpha Corp)</p>
                <span style={{ fontSize: '12px', color: '#38bdf8' }}>Status: Verified & Active</span>
              </div>
              <button style={{ background: '#ef4444', color: 'white', border: 'none', padding: '6px 12px', borderRadius: '6px', cursor: 'pointer', fontSize: '12px' }}>Disable Account</button>
            </div>
          </div>
        )}

        {/* TAB 6: ZERO-CODE OTA UPDATES */}
        {activeTab === 'ota' && (
          <div>
            <h1 style={{ fontSize: '22px', marginBottom: '10px' }}>Over-The-Air (OTA) App Updates</h1>
            <p style={{ color: '#94a3b8', fontSize: '14px', marginBottom: '20px' }}>Push frontend logic patches and configuration bundles instantly without app store publishing.</p>
            <button style={{ background: '#38bdf8', color: '#0f172a', fontWeight: 'bold', border: 'none', padding: '10px 20px', borderRadius: '8px', cursor: 'pointer' }}>Compile & Push Delta Update</button>
          </div>
        )}

      </div>
    </div>
  );
}

// Styling helpers
const navBtnStyle = (active) => ({
  background: active ? '#334155' : 'transparent',
  color: active ? '#38bdf8' : '#cbd5e1',
  border: 'none',
  padding: '10px 14px',
  borderRadius: '8px',
  textAlign: 'left',
  cursor: 'pointer',
  fontSize: '13px',
  fontWeight: active ? '600' : 'normal'
});

const cardStyle = { background: '#1e293b', border: '1px solid #334155', padding: '20px', borderRadius: '8px' };
const inputStyle = { flex: 1, padding: '10px 14px', background: '#1e293b', border: '1px solid #334155', borderRadius: '8px', color: 'white', fontSize: '13px' };
const actionBtnStyle = { background: '#38bdf8', color: '#0f172a', fontWeight: 'bold', border: 'none', padding: '10px 16px', borderRadius: '8px', cursor: 'pointer' };
