import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';

export default function SharedWorkspaceEditor({ userRole, workspaceId, behaviorStyle }) {
  const [docTitle, setDocTitle] = useState('Untitled Presentation');
  const [content, setContent] = useState('');
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  // 1. Fetch initial document content and comments from Supabase
  useEffect(() => {
    const fetchWorkspaceData = async () => {
      // Fetch Document
      const { data: docData } = await supabase
        .from('documents')
        .select('*')
        .eq('workspace_code', workspaceId)
        .single();

      if (docData) {
        setDocTitle(docData.title);
        setContent(docData.content || '');
      }

      // Fetch Comments
      const { data: commentData } = await supabase
        .from('comments')
        .select('*')
        .eq('workspace_code', workspaceId)
        .order('created_at', { ascending: true });

      if (commentData) {
        setComments(commentData);
      }
    };

    fetchWorkspaceData();

    // 2. Set up Realtime Subscriptions for live updates
    const docSubscription = supabase
      .channel('public:documents')
      .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'documents', filter: `workspace_code=eq.${workspaceId}` }, (payload) => {
        setDocTitle(payload.new.title);
        setContent(payload.new.content);
      })
      .subscribe();

    const commentSubscription = supabase
      .channel('public:comments')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'comments', filter: `workspace_code=eq.${workspaceId}` }, (payload) => {
        setComments((prev) => [...prev, payload.new]);
      })
      .subscribe();

    return () => {
      supabase.removeChannel(docSubscription);
      supabase.removeChannel(commentSubscription);
    };
  }, [workspaceId]);

  // Handle typing / updating document content in Supabase
  const handleContentChange = async (newContent) => {
    setContent(newContent);
    await supabase
      .from('documents')
      .update({ content: newContent, updated_at: new Date() })
      .eq('workspace_code', workspaceId);
  };

  const handleTitleChange = async (newTitle) => {
    setDocTitle(newTitle);
    await supabase
      .from('documents')
      .update({ title: newTitle, updated_at: new Date() })
      .eq('workspace_code', workspaceId);
  };

  // Handle comment submission
  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const authorName = userRole === 'admin' ? 'Workspace Admin' : 'Collaborator';

    await supabase
      .from('comments')
      .insert([{ workspace_code: workspaceId, author: authorName, text: newComment }]);

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
            onChange={(e) => handleTitleChange(e.target.value)}
            disabled={isReadOnly || isCommentOnly}
            style={{ fontSize: '18px', fontWeight: 'bold', border: 'none', background: 'transparent', width: '70%' }}
          />
          <div style={{ fontSize: '12px', background: '#e2f0cb', color: '#2d6a4f', padding: '4px 8px', borderRadius: '12px' }}>
            ID: {workspaceId} | Mode: {userRole === 'admin' ? 'Admin' : behaviorStyle.toUpperCase()}
          </div>
        </div>

        {/* Text Area / Presentation Slide Canvas */}
        <textarea 
          value={content}
          onChange={(e) => handleContentChange(e.target.value)}
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
          {comments.map((c, index) => (
            <div key={c.id || index} style={{ background: '#f9f9f9', padding: '8px', borderRadius: '4px', fontSize: '13px' }}>
              <strong>{c.author}:</strong> {c.text}
            </div>
          ))}
        </div>

        {/* Comment Form */}
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
