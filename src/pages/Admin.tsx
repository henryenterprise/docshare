import React, { useState } from 'react';
import { Settings, Image, Shield, Save, ArrowLeft, Check, Layout, Activity, User, LogOut, Eye, Layers } from 'lucide-react';

export default function Admin() {
  const [activeTab, setActiveTab] = useState<'summary' | 'content' | 'builder' | 'preview'>('summary');
  const [siteTitle, setSiteTitle] = useState('docShare');
  const [heroHeading, setHeroHeading] = useState('Secure Document Sharing Platform');
  const [heroSubtext, setHeroSubtext] = useState('A secure web platform for effortless file collaboration.');
  const [logoUrl, setLogoUrl] = useState('');
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
    localStorage.setItem('docshare_config', JSON.stringify({ siteTitle, heroHeading, heroSubtext, logoUrl }));
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-800 pb-12">
      {/* Admin Header with Profile & Logout */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-indigo-600 p-2.5 rounded-xl text-white">
              <Shield className="h-6 w-6" />
            </div>
            <div>
              <h1 className="font-bold text-lg text-slate-900">docShare Owner Command Center</h1>
              <p className="text-xs text-slate-500">Logged in as Owner • Full System Oversight</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <a href="/" className="flex items-center space-x-2 text-sm text-slate-600 hover:text-indigo-600 px-3 py-2 rounded-lg border border-slate-200">
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Site</span>
            </a>
            <button 
              onClick={() => window.location.href = '/?logout=true'}
              className="flex items-center space-x-2 bg-red-50 text-red-600 hover:bg-red-100 px-3 py-2 rounded-lg font-medium text-sm transition"
            >
              <LogOut className="h-4 w-4" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </header>

      {/* Gold Navigation Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => setActiveTab('summary')}
            className={`flex items-center space-x-2 px-5 py-3 rounded-xl font-semibold text-sm transition shadow-sm ${activeTab === 'summary' ? 'bg-amber-500 text-white shadow-amber-200' : 'bg-white text-slate-700 hover:bg-slate-50'}`}
          >
            <Activity className="h-4 w-4" />
            <span>Activity Summary</span>
          </button>
          <button
            onClick={() => setActiveTab('content')}
            className={`flex items-center space-x-2 px-5 py-3 rounded-xl font-semibold text-sm transition shadow-sm ${activeTab === 'content' ? 'bg-amber-500 text-white shadow-amber-200' : 'bg-white text-slate-700 hover:bg-slate-50'}`}
          >
            <Layers className="h-4 w-4" />
            <span>Branding & Content</span>
          </button>
          <button
            onClick={() => setActiveTab('builder')}
            className={`flex items-center space-x-2 px-5 py-3 rounded-xl font-semibold text-sm transition shadow-sm ${activeTab === 'builder' ? 'bg-amber-500 text-white shadow-amber-200' : 'bg-white text-slate-700 hover:bg-slate-50'}`}
          >
            <Layout className="h-4 w-4" />
            <span>Visual Canvas Builder</span>
          </button>
          <button
            onClick={() => setActiveTab('preview')}
            className={`flex items-center space-x-2 px-5 py-3 rounded-xl font-semibold text-sm transition shadow-sm ${activeTab === 'preview' ? 'bg-amber-500 text-white shadow-amber-200' : 'bg-white text-slate-700 hover:bg-slate-50'}`}
          >
            <Eye className="h-4 w-4" />
            <span>Live Display & Push</span>
          </button>
        </div>
      </div>

      {/* Main Tab Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        {activeTab === 'summary' && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
              <h2 className="text-lg font-bold text-slate-900 mb-2">docShare Active Uniqueness Summary</h2>
              <p className="text-sm text-slate-500 mb-6">Real-time overview of isolated activities across your platform modules.</p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-slate-50 p-5 rounded-xl border border-slate-200">
                  <div className="text-sm font-semibold text-slate-500">Document Transmissions</div>
                  <div className="text-2xl font-bold text-slate-900 mt-2">1,248 Active</div>
                  <p className="text-xs text-emerald-600 mt-1 font-medium">+14% higher than yesterday</p>
                </div>
                <div className="bg-slate-50 p-5 rounded-xl border border-slate-200">
                  <div className="text-sm font-semibold text-slate-500">Visual Ad/Canvas Impressions</div>
                  <div className="text-2xl font-bold text-slate-900 mt-2">8,930 Views</div>
                  <p className="text-xs text-emerald-600 mt-1 font-medium">Stable engagement conversion</p>
                </div>
                <div className="bg-slate-50 p-5 rounded-xl border border-slate-200">
                  <div className="text-sm font-semibold text-slate-500">System Deployments</div>
                  <div className="text-2xl font-bold text-slate-900 mt-2">Cloudflare Live</div>
                  <p className="text-xs text-indigo-600 mt-1 font-medium">Repository synchronized</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'content' && (
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
            <h2 className="text-lg font-bold text-slate-900 mb-4">Edit Global Site Content</h2>
            {saved && (
              <div className="mb-4 flex items-center space-x-2 bg-emerald-50 text-emerald-700 px-4 py-3 rounded-xl border border-emerald-200">
                <Check className="h-5 w-5" />
                <span className="font-medium">Changes Saved Successfully!</span>
              </div>
            )}
            <form onSubmit={handleSave} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Site Title</label>
                <input 
                  type="text" 
                  value={siteTitle} 
                  onChange={(e) => setSiteTitle(e.target.value)} 
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Hero Section Heading</label>
                <input 
                  type="text" 
                  value={heroHeading} 
                  onChange={(e) => setHeroHeading(e.target.value)} 
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>
              <button 
                type="submit" 
                className="bg-amber-500 hover:bg-amber-600 text-white px-6 py-3 rounded-xl font-semibold shadow-lg shadow-amber-200 transition flex items-center space-x-2"
              >
                <Save className="h-5 w-5" />
                <span>Save Configuration Changes</span>
              </button>
            </form>
          </div>
        )}

        {activeTab === 'builder' && (
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm text-center py-16">
            <Layout className="h-12 w-12 text-amber-500 mx-auto mb-4" />
            <h2 className="text-xl font-bold text-slate-900">Visual Canvas Workspace</h2>
            <p className="text-slate-500 max-w-md mx-auto mt-2 mb-6">Manage layout segments, components, and media blocks before pushing live updates.</p>
            <a 
              href="/?builder=true" 
              className="inline-flex items-center space-x-2 bg-amber-500 hover:bg-amber-600 text-white px-6 py-3 rounded-xl font-semibold shadow-lg shadow-amber-200 transition"
            >
              <span>Launch Full Visual Canvas</span>
            </a>
          </div>
        )}

        {activeTab === 'preview' && (
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm text-center py-16">
            <Eye className="h-12 w-12 text-amber-500 mx-auto mb-4" />
            <h2 className="text-xl font-bold text-slate-900">Wide Display & Push Center</h2>
            <p className="text-slate-500 max-w-md mx-auto mt-2 mb-6">Review your final interface configuration and push deployments instantly to Cloudflare.</p>
            <a 
              href="/" 
              className="inline-flex items-center space-x-2 bg-amber-500 hover:bg-amber-600 text-white px-6 py-3 rounded-xl font-semibold shadow-lg shadow-amber-200 transition"
            >
              <span>View Public Portal</span>
            </a>
          </div>
        )}
      </main>
    </div>
  );
}
