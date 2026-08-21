import React, { useState } from 'react';
import { Settings, Image, Type, Shield, Save, ArrowLeft, Check } from 'lucide-react';

export default function Admin() {
  // State for editable content
  const [siteTitle, setSiteTitle] = useState('docShare');
  const [heroHeading, setHeroHeading] = useState('Secure Document Sharing Made Simple');
  const [heroSubtext, setHeroSubtext] = useState('A secure web platform for seamless document sharing, real-time collaboration, and bulletproof privacy control.');
  const [logoUrl, setLogoUrl] = useState('');
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
    // In a full backend setup, this would save to a database or localStorage
    localStorage.setItem('docshare_config', JSON.stringify({ siteTitle, heroHeading, heroSubtext, logoUrl }));
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 pb-12">
      {/* Admin Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-indigo-600 p-2 rounded-lg text-white">
              <Settings className="h-5 w-5" />
            </div>
            <span className="font-bold text-lg">docShare Admin Portal</span>
          </div>
          <a href="/" className="flex items-center space-x-2 text-sm font-medium text-slate-600 hover:text-indigo-600 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-lg transition">
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Live Site</span>
          </a>
        </div>
      </header>

      {/* Admin Content Form */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8">
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100">
            <div>
              <h1 className="text-2xl font-bold tracking-tight">Website Customization</h1>
              <p className="text-slate-500 text-sm">Update your text, branding, logos, and graphics dynamically.</p>
            </div>
            {saved && (
              <div className="flex items-center space-x-1.5 bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full text-xs font-semibold animate-pulse">
                <Check className="h-3.5 w-3.5" />
                <span>Changes Saved!</span>
              </div>
            )}
          </div>

          <form onSubmit={handleSave} className="space-y-6">
            {/* Branding Section */}
            <div>
              <h2 className="text-lg font-semibold flex items-center space-x-2 mb-4 text-slate-800">
                <Image className="h-5 w-5 text-indigo-600" />
                <span>Logo & Graphics</span>
              </h2>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Brand/App Name</label>
                  <input
                    type="text"
                    value={siteTitle}
                    onChange={(e) => setSiteTitle(e.target.value)}
                    className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Logo Image URL</label>
                  <input
                    type="text"
                    placeholder="https://example.com/logo.png"
                    value={logoUrl}
                    onChange={(e) => setLogoUrl(e.target.value)}
                    className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>
            </div>

            {/* Hero Copywriting Section */}
            <div className="pt-4 border-t border-slate-100">
              <h2 className="text-lg font-semibold flex items-center space-x-2 mb-4 text-slate-800">
                <Type className="h-5 w-5 text-indigo-600" />
                <span>Hero Section Content</span>
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Main Headline</label>
                  <input
                    type="text"
                    value={heroHeading}
                    onChange={(e) => setHeroHeading(e.target.value)}
                    className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Subtext Description</label>
                  <textarea
                    rows={3}
                    value={heroSubtext}
                    onChange={(e) => setHeroSubtext(e.target.value)}
                    className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>
            </div>

            {/* Quick Graphic Tool Info */}
            <div className="pt-4 border-t border-slate-100 bg-indigo-50/50 p-4 rounded-xl border border-indigo-100">
              <h3 className="text-sm font-semibold text-indigo-900 mb-1">Background Removal & Asset Editing</h3>
              <p className="text-xs text-indigo-700">
                To process or remove backgrounds from your graphics before uploading them here, you can quickly prep them using tools like Cloudinary or browser-based canvas toolkits, then paste the resulting image URL above.
              </p>
            </div>

            {/* Save Button */}
            <div className="pt-4">
              <button
                type="submit"
                className="w-full sm:w-auto bg-indigo-600 text-white px-6 py-3 rounded-xl font-medium shadow-md hover:bg-indigo-700 transition flex items-center justify-center space-x-2"
              >
                <Save className="h-4 w-4" />
                <span>Save Admin Changes</span>
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}

