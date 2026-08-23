import React, { useState } from 'react';
import { Play, Settings, Trash2, Video, ExternalLink } from 'lucide-react';

export default function VisualCanvasEditor() {
  // Sample state representing blocks dropped onto the canvas
  const [blocks, setBlocks] = useState([
    {
      id: 'block-1',
      type: 'video-ad',
      title: 'Promotional Product Showcase',
      videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
      ctaText: 'Learn More',
      ctaLink: 'https://example.com',
      autoplay: true,
      muted: true
    }
  ]);

  const [selectedBlockId, setSelectedBlockId] = useState<string | null>('block-1');

  const selectedBlock = blocks.find(b => b.id === selectedBlockId);

  return (
    <div className="flex h-screen bg-slate-100">
      
      {/* 1. Left Sidebar: Component Toolbox & Elements */}
      <div className="w-64 bg-white border-r border-slate-200 p-4 flex flex-col">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">No-Code Components</h3>
        <div className="space-y-2">
          <button className="w-full text-left px-3 py-2 bg-slate-50 hover:bg-indigo-50 hover:text-indigo-600 rounded-lg text-sm font-medium transition flex items-center space-x-2">
            <Video className="h-4 w-4 text-indigo-500" />
            <span>Video Advert Block</span>
          </button>
        </div>
      </div>

      {/* 2. Center: Live Visual Canvas */}
      <div className="flex-1 p-8 overflow-y-auto flex flex-col items-center">
        <div className="max-w-2xl w-full bg-white rounded-xl shadow-sm border border-slate-200 p-6 min-h-[500px]">
          <div className="text-xs font-semibold text-slate-400 mb-4 uppercase tracking-wider">Live Preview Canvas</div>

          {blocks.map((block) => {
            if (block.type === 'video-ad') {
              return (
                <div
                  key={block.id}
                  onClick={() => setSelectedBlockId(block.id)}
                  className={`relative rounded-xl overflow-hidden border-2 transition cursor-pointer group bg-black ${
                    selectedBlockId === block.id ? 'border-indigo-600 ring-4 ring-indigo-50' : 'border-transparent'
                  }`}
                >
                  {/* Video Player Mock */}
                  <div className="relative aspect-video bg-slate-900 flex items-center justify-center">
                    <video
                      src={block.videoUrl}
                      autoPlay={block.autoplay}
                      muted={block.muted}
                      loop
                      className="w-full h-full object-cover opacity-90"
                    />
                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center group-hover:bg-black/10 transition">
                      <div className="bg-white/90 p-3 rounded-full shadow-lg text-indigo-600">
                        <Play className="h-6 w-6 fill-current" />
                      </div>
                    </div>

                    {/* Overlay CTA Button */}
                    {block.ctaText && (
                      <div className="absolute bottom-4 right-4">
                        <span className="bg-indigo-600 text-white text-xs font-semibold px-4 py-2 rounded-lg shadow-md flex items-center space-x-1">
                          <span>{block.ctaText}</span>
                          <ExternalLink className="h-3 w-3" />
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              );
            }
            return null;
          })}
        </div>
      </div>

      {/* 3. Right Property Inspector (Appears when an element is selected) */}
      <div className="w-80 bg-white border-l border-slate-200 p-6 overflow-y-auto">
        <h3 className="text-sm font-bold text-slate-900 mb-4 flex items-center space-x-2">
          <Settings className="h-4 w-4 text-indigo-600" />
          <span>Video Ad Properties</span>
        </h3>

        {selectedBlock ? (
          <div className="space-y-4 text-sm">
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">Ad Title / Reference</label>
              <input
                type="text"
                value={selectedBlock.title}
                onChange={(e) => {
                  const updated = blocks.map(b => b.id === selectedBlockId ? { ...b, title: e.target.value } : b);
                  setBlocks(updated);
                }}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">Video Source URL (MP4 / CDN)</label>
              <input
                type="text"
                value={selectedBlock.videoUrl}
                onChange={(e) => {
                  const updated = blocks.map(b => b.id === selectedBlockId ? { ...b, videoUrl: e.target.value } : b);
                  setBlocks(updated);
                }}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">Button Call-to-Action (CTA)</label>
              <input
                type="text"
                value={selectedBlock.ctaText}
                onChange={(e) => {
                  const updated = blocks.map(b => b.id === selectedBlockId ? { ...b, ctaText: e.target.value } : b);
                  setBlocks(updated);
                }}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">Click-Through Link Destination</label>
              <input
                type="text"
                value={selectedBlock.ctaLink}
                onChange={(e) => {
                  const updated = blocks.map(b => b.id === selectedBlockId ? { ...b, ctaLink: e.target.value } : b);
                  setBlocks(updated);
                }}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
              />
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs font-medium text-slate-600">Autoplay on Load</span>
              <input
                type="checkbox"
                checked={selectedBlock.autoplay}
                onChange={(e) => {
                  const updated = blocks.map(b => b.id === selectedBlockId ? { ...b, autoplay: e.target.checked } : b);
                  setBlocks(updated);
                }}
                className="h-4 w-4 text-indigo-600 rounded border-slate-300 focus:ring-indigo-500"
              />
            </div>
          </div>
        ) : (
          <p className="text-xs text-slate-400">Select any element on the canvas to configure its settings.</p>
        )}
      </div>

    </div>
  );
}
