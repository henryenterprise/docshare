import React, { useState } from 'react';
import { supabase } from '../lib/supabase';
import { Shield, Activity, Layout, Eye, LogOut, ArrowLeft, Database, Sparkles } from 'lucide-react';

export default function Admin() {
  const [activeTab, setActiveTab] = useState<'activity' | 'branding' | 'canvas' | 'live'>('activity');

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = '/admin';
  };

  return (
    // <--- The change is here: updated bg-slate-950 to bg-stone-100 --->
    <div className="min-h-screen bg-stone-100 text-slate-900 p-4 md:p-8">
      
      {/* Top Header Card (Dark card on light background for premium feel) */}
      <div className="max-w-6xl mx-auto bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-lg mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-indigo-600/20 border border-indigo-500/30 rounded-xl text-indigo-400">
            <Shield className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-white">Command Center</h1>
            <div className="flex items-center gap-2 mt-1">
              <span className="inline-block w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="text-xs font-medium text-slate-400">Logged in as Owner • Full System Oversight</span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-3 w-full md:w-auto">
          <a 
            href="/" 
            className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-sm font-medium rounded-xl transition border border-slate-700"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Site
          </a>
          <button 
            onClick={handleLogout}
            className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2.5 bg-rose-600/20 hover:bg-rose-600/30 text-rose-400 text-sm font-medium rounded-xl transition border border-rose-500/30"
          >
            <LogOut className="w-4 h-4" /> Logout
          </button>
        </div>
      </div>

      {/* Navigation Cards Grid */}
      <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <button 
          onClick={() => setActiveTab('activity')}
          // Dark card on light bg
          className={`p-4 rounded-2xl border text-left transition flex flex-col justify-between ${activeTab === 'activity' ? 'bg-indigo-600 border-indigo-500 text-white shadow-lg shadow-indigo-600/20' : 'bg-slate-900 border-slate-800 text-slate-200 hover:bg-slate-800/90'}`}
        >
          <Activity className="w-6 h-6 mb-3" />
          <div>
            <h3 className="font-semibold text-sm">Activity Summary</h3>
            <p className={`text-xs mt-0.5 ${activeTab === 'activity' ? 'text-indigo-100' : 'text-slate-400'}`}>Real-time metrics</p>
          </div>
        </button>
        
        {/* Repeat this pattern for other buttons, keeping them dark */}
        <button 
          onClick={() => setActiveTab('branding')}
          className={`p-4 rounded-2xl border text-left transition flex flex-col justify-between ${activeTab === 'branding' ? 'bg-indigo-600 border-indigo-500 text-white shadow-lg shadow-indigo-600/20' : 'bg-slate-900 border-slate-800 text-slate-200 hover:bg-slate-800/90'}`}
        >
          <Layout className="w-6 h-6 mb-3" />
          <div>
            <h3 className="font-semibold text-sm">Branding & Content</h3>
            <p className={`text-xs mt-0.5 ${activeTab === 'branding' ? 'text-indigo-100' : 'text-slate-400'}`}>Assets & text</p>
          </div>
        </button>

        <button 
          onClick={() => setActiveTab('canvas')}
          className={`p-4 rounded-2xl border text-left transition flex flex-col justify-between ${activeTab === 'canvas' ? 'bg-indigo-600 border-indigo-500 text-white shadow-lg shadow-indigo-600/20' : 'bg-slate-900 border-slate-800 text-slate-200 hover:bg-slate-800/90'}`}
        >
          <Sparkles className="w-6 h-6 mb-3" />
          <div>
            <h3 className="font-semibold text-sm">Visual Canvas</h3>
            <p className={`text-xs mt-0.5 ${activeTab === 'canvas' ? 'text-indigo-100' : 'text-slate-400'}`}>Layout builder</p>
          </div>
        </button>

        <button 
          onClick={() => setActiveTab('live')}
          className={`p-4 rounded-2xl border text-left transition flex flex-col justify-between ${activeTab === 'live' ? 'bg-indigo-600 border-indigo-500 text-white shadow-lg shadow-indigo-600/20' : 'bg-slate-900 border-slate-800 text-slate-200 hover:bg-slate-800/90'}`}
        >
          <Eye className="w-6 h-6 mb-3" />
          <div>
            <h3 className="font-semibold text-sm">Live Display</h3>
            <p className={`text-xs mt-0.5 ${activeTab === 'live' ? 'text-indigo-100' : 'text-slate-400'}`}>Push updates</p>
          </div>
        </button>
      </div>

      {/* Main Content Display Card (Dark card on light background) */}
      <div className="max-w-6xl mx-auto bg-slate-900 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-xl">
        <div className="border-b border-slate-800 pb-4 mb-6">
          <h2 className="text-lg font-bold text-white capitalize flex items-center gap-2">
            <Database className="w-5 h-5 text-indigo-400" />
            {activeTab === 'activity' && 'docShare Active Uniqueness Summary'}
            {activeTab === 'branding' && 'Platform Branding & Content Management'}
            {activeTab === 'canvas' && 'Visual Canvas Builder'}
            {activeTab === 'live' && 'Live Display & Push Controls'}
          </h2>
          <p className="text-sm text-slate-400 mt-1">
            {activeTab === 'activity' && 'Real-time overview of isolated activities across your platform modules.'}
            {activeTab === 'branding' && 'Customize logos, hero titles, and global site assets.'}
            {activeTab === 'canvas' && 'Drag, drop, and structure modular interface blocks.'}
            {activeTab === 'live' && 'Instantly sync live announcements and feeds to your user base.'}
          </p>
        </div>

        {/* Internal metrics cards (Dark cards) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-slate-950 border border-slate-800/80 rounded-xl p-5">
            <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">Document Transmissions</span>
            <div className="text-3xl font-extrabold text-white mt-2">1,248</div>
            <span className="inline-block text-xs font-semibold text-emerald-400 mt-2 bg-emerald-500/10 px-2 py-0.5 rounded">
              +14% higher than yesterday
            </span>
          </div>

          <div className="bg-slate-950 border border-slate-800/80 rounded-xl p-5">
            <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">Active System Nodes</span>
            <div className="text-3xl font-extrabold text-white mt-2">99.8%</div>
            <span className="inline-block text-xs font-semibold text-indigo-400 mt-2 bg-indigo-500/10 px-2 py-0.5 rounded">
              All services online
            </span>
          </div>

          <div className="bg-slate-950 border border-slate-800/80 rounded-xl p-5">
            <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">Security State</span>
            <div className="text-3xl font-extrabold text-white mt-2">Secure</div>
            <span className="inline-block text-xs font-semibold text-emerald-400 mt-2 bg-emerald-500/10 px-2 py-0.5 rounded">
              Supabase Connected
            </span>
          </div>
        </div>
      </div>
      
      {/* Footer text for context (now dark on light) */}
      <footer className="max-w-6xl mx-auto mt-12 text-center text-xs text-stone-500 py-4">
        Admin Panel | Powered by DocShare Core Services | System Status: Operational
      </footer>
    </div>
  );
}
