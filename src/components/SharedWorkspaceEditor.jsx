import React, { useState } from 'react';

export default function SharedWorkspaceEditor({ userRole, workspaceId, behaviorStyle }) {
  const [docTitle, setDocTitle] = useState('Untitled Presentation');
  const [content, setContent] = useState('Start typing your document or presentation slides here...');
  const [comments, setComments] = useState([
    { id: 1, author: 'System Admin', text: 'Welcome to the shared environment! Collaboration is live.' }
  ]);
  const [newComment, setNewComment] = useState('');

  // Handle comment submission
  const handleAddComment = (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const commentObj = {
      id: Date.now(),
      author: userRole === 'admin' ? 'Workspace Admin' : 'Collaborator',
      text: newComment
    };

    setComments([...comments, commentObj]);
    setNewComment('');
  };

  const isReadOnly = behaviorStyle === 'viewer' && userRole !== 'admin';
  const isCommentOnly = behaviorStyle === 'commenter' && userRole !== 'admin';

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '3fr 1fr', gap: '20px', marginTop: '20px', fontFamily: 'sans-serif' }}>
      
      {/* Main Document / Presentation Editor Area */}
      <div style={{ background: '#fff', padding: '20px', borderRadius: '8px', border: '1px solid #ddd', display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #eee', paddingBottom: '10px' }}>
          <input 
            type="text" 
            value={docTitle} 
            onChange={(e) => setDocTitle(e.target.value)}
            disabled={isReadOnly || isCommentOnly}
            style={{ fontSize: '18px', fontWeight: 'bold', border: 'none', background: 'transparent', width: '70%' }}
          />
          <div style={{ fontSize: '12px', background: '#e2f0cb', color: '#2d6a4f', padding: '4px 8px', borderRadius: '12px' }}>
            Mode: {userRole === 'admin' ? 'Admin (Full Control)' : behaviorStyle.toUpperCase()}
          </div>
        </div>

        {/* Text Area / Presentation Slide Canvas */}
        <textarea 
          value={content}
          onChange={(e) => setContent(e.target.value)}
          disabled={isReadOnly || isCommentOnly}
          rows={12}
          style={{ width: '100%', padding: '15px', borderRadius: '4px', border: '1px solid #ccc', fontSize: '14px', lineHeight: '1.6', resize: 'vertical' }}
        />

        {isReadOnly && (
          <div style={{ fontSize: '12px', color: '#d93025', background: '#fce8e6', padding: '8px', borderRadius: '4px' }}>
            🔒 You have Viewer permissions. Editing is disabled.
          </div>
        )}
      </div>

      {/* Sidebar: Real-Time Activity & Comments */}
      <div style={{ background: '#fff', padding: '15px', borderRadius: '8px', border: '1px solid #ddd', display: 'flex', flexDirection: 'column', height: 'fit-content' }}>
        <h3 style={{ fontSize: '16px', margin: '0 0 10px 0' }}>Workspace Feed & Feedback</h3>
        
        <div style={{ maxHeight: '250px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '15px', borderBottom: '1px solid #eee', paddingBottom: '10px' }}>
          {comments.map((c) => (
            <div key={c.id} style={{ background: '#f9f9f9', padding: '8px', borderRadius: '4px', fontSize: '13px' }}>
              <strong>{c.author}:</strong> {c.text}
            </div>
          ))}
        </div>

        {/* Comment Form (Available to all except pure viewers if restricted, or open to commenters/editors) */}
        <form onSubmit={handleAddComment} style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <input 
            type="text" 
            placeholder={isReadOnly ? "Viewing only..." : "Add a comment or note..."}
            value={newComment}
            disabled={isReadOnly}
            onChange={(e) => setNewComment(e.target.value)}
            style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc', fontSize: '13px' }}
          />
          <button 
            type="submit" 
            disabled={isReadOnly}
            style={{ padding: '8px', background: isReadOnly ? '#ccc' : '#0070f3', color: '#fff', border: 'none', borderRadius: '4px', fontWeight: 'bold', cursor: isReadOnly ? 'not-allowed' : 'pointer' }}>
            Post Update
          </button>
        </form>
      </div>

    </div>
  );
}

