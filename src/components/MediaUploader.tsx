import React, { useState } from 'react';

export default function MediaUploader({ onUploadComplete }: { onUploadComplete: (file: File, category: string) => void }) {
  const [permissionStatus, setPermissionStatus] = useState<string>('idle');

  const requestMediaAccess = async (type: 'gallery' | 'camera') => {
    try {
      setPermissionStatus(`Requesting access to ${type}...`);
      if (type === 'camera') {
        await navigator.mediaDevices.getUserMedia({ video: true });
      }
      setPermissionStatus('Access granted');
    } catch (err) {
      setPermissionStatus('Permission denied or unavailable');
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      let category = 'Files';
      if (file.type.startsWith('image/')) category = 'Photo';
      else if (file.type.startsWith('video/')) category = 'Video';
      else if (file.type.startsWith('audio/')) category = 'Audio';

      onUploadComplete(file, category);
    }
  };

  return (
    <div style={{ border: '1px dashed #cbd5e1', padding: '16px', borderRadius: '12px', background: '#f8fafc' }}>
      <p style={{ fontSize: '14px', fontWeight: '500', margin: '0 0 12px 0' }}>Secure Media & Document Upload</p>
      <div style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
        <button type="button" onClick={() => requestMediaAccess('gallery')} style={{ padding: '8px 12px', fontSize: '12px', background: '#e2e8f0', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>
          Access Gallery
        </button>
        <button type="button" onClick={() => requestMediaAccess('camera')} style={{ padding: '8px 12px', fontSize: '12px', background: '#e2e8f0', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>
          Access Camera
        </button>
      </div>
      <input type="file" onChange={handleFileChange} style={{ fontSize: '13px' }} />
      {permissionStatus !== 'idle' && <p style={{ fontSize: '12px', color: '#64748b', marginTop: '6px' }}>Status: {permissionStatus}</p>}
    </div>
  );
}
