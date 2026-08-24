import React, { useState } from 'react';
import { Camera, Image as ImageIcon, FileText, CheckCircle, AlertCircle } from 'lucide-react';

interface MediaUploaderProps {
  onFileSelect: (category: string, file: File) => void;
}

export default function MediaUploader({ onFileSelect }: MediaUploaderProps) {
  const [permissionModal, setPermissionModal] = useState<'none' | 'gallery' | 'camera'>('none');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [previewName, setPreviewName] = useState<string | null>(null);

  const requestPermission = (type: 'gallery' | 'camera') => {
    setPermissionModal(type);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, source: 'gallery' | 'camera') => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Automatically categorize based on MIME type
    let category = 'Files';
    if (file.type.startsWith('image/')) {
      category = 'Photo';
    } else if (file.type.startsWith('video/')) {
      category = 'Video';
    } else if (file.type.startsWith('audio/')) {
      category = 'Audio';
    }

    setSelectedCategory(category);
    setPreviewName(file.name);
    setPermissionModal('none');
    onFileSelect(category, file);
  };

  return (
    <div className="space-y-4">
      <label className="block text-xs font-semibold text-slate-600 mb-1">Upload Media / Document *</label>
      
      <div className="grid grid-cols-2 gap-3">
        <button
          type="button"
          onClick={() => requestPermission('gallery')}
          className="flex items-center justify-center gap-2 py-3 px-4 border border-slate-300 rounded-xl text-sm font-medium text-slate-700 bg-white hover:bg-slate-50 transition shadow-sm"
        >
          <ImageIcon className="h-4 w-4 text-indigo-600" /> Open Gallery
        </button>

        <button
          type="button"
          onClick={() => requestPermission('camera')}
          className="flex items-center justify-center gap-2 py-3 px-4 border border-slate-300 rounded-xl text-sm font-medium text-slate-700 bg-white hover:bg-slate-50 transition shadow-sm"
        >
          <Camera className="h-4 w-4 text-indigo-600" /> Use Camera
        </button>
      </div>

      {/* Gallery Permission & Selection Modal */}
      {permissionModal === 'gallery' && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-xl space-y-4">
            <h3 className="text-base font-bold text-slate-900">Access Request to view gallery</h3>
            <p className="text-xs text-slate-500">This app requires permission to access your device gallery to select photos and files.</p>
            <div className="flex gap-2 pt-2">
              <button
                type="button"
                onClick={() => setPermissionModal('none')}
                className="flex-1 py-2 px-3 border border-slate-300 rounded-xl text-xs font-semibold text-slate-600"
              >
                Deny
              </button>
              <label className="flex-1 text-center py-2 px-3 bg-indigo-600 text-white rounded-xl text-xs font-semibold cursor-pointer shadow-sm hover:bg-indigo-700">
                Allow
                <input
                  type="file"
                  accept="image/*,video/*,audio/*,.pdf,.doc,.docx"
                  className="hidden"
                  onChange={(e) => handleFileChange(e, 'gallery')}
                />
              </label>
            </div>
          </div>
        </div>
      )}

      {/* Camera Permission & Capture Modal */}
      {permissionModal === 'camera' && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-xl space-y-4">
            <h3 className="text-base font-bold text-slate-900">Access Request to view Camera</h3>
            <p className="text-xs text-slate-500">This app requires permission to access your camera to capture media directly.</p>
            <div className="flex gap-2 pt-2">
              <button
                type="button"
                onClick={() => setPermissionModal('none')}
                className="flex-1 py-2 px-3 border border-slate-300 rounded-xl text-xs font-semibold text-slate-600"
              >
                Deny
              </button>
              <label className="flex-1 text-center py-2 px-3 bg-indigo-600 text-white rounded-xl text-xs font-semibold cursor-pointer shadow-sm hover:bg-indigo-700">
                Allow & Capture
                <input
                  type="file"
                  accept="image/*,video/*"
                  capture="environment"
                  className="hidden"
                  onChange={(e) => handleFileChange(e, 'camera')}
                />
              </label>
            </div>
          </div>
        </div>
      )}

      {/* Selected File Feedback & Categorization Badge */}
      {previewName && (
        <div className="flex items-center justify-between p-3 bg-indigo-50 border border-indigo-100 rounded-xl text-xs">
          <div className="flex items-center gap-2 overflow-hidden">
            <FileText className="h-4 w-4 text-indigo-600 flex-shrink-0" />
            <span className="text-slate-700 truncate font-medium">{previewName}</span>
          </div>
          <span className="bg-indigo-600 text-white px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider flex-shrink-0">
            {selectedCategory}
          </span>
        </div>
      )}
    </div>
  );
}
