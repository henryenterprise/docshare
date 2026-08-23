import React, { useEffect, useState } from 'react';
import { Shield, Share2, Lock, FileText, ArrowRight, Users, Settings } from 'lucide-react';

export default function Index() {
  const [isadminUnlocked, setIsAdminUnlocked] = useState(false);

  useEffect(() => {
    // Check if unlock parameter is in the URL
    const params = new URLSearchParams(window.location.search);
    if (params.get('unlock') === 'true') {
      localStorage.setItem('isAdminAllowed', 'true');
      setIsAdminUnlocked(true);
    } else if (localStorage.getItem('isAdminAllowed') === 'true') {
      setIsAdminUnlocked(true);
    }
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 relative">
      {/* Navigation Header */}
      <header className="border-b bg-white sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="bg-indigo-600 p-2 rounded-lg text-white">
              <FileText className="h-6 w-6" />
            </div>
            <span className="font-bold text-xl tracking-tight">docShare</span>
          </div>
          <div className="flex items-center space-x-4">
            <a href="#features" className="text-sm font-medium text-slate-600 hover:text-indigo-600">Features</a>
            <a href="#security" className="text-sm font-medium text-slate-600 hover:text-indigo-600">Security</a>
            <button 
              onClick={() => window.location.href = '/?admin=true'}
              className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 transition"
            >
              Get Started
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 text-center">
        <div className="inline-flex items-center space-x-2 bg-indigo-50 border border-indigo-100 px-3 py-1 rounded-full text-indigo-700 text-sm font-medium mb-6">
          <Shield className="h-3.5 w-3.5" />
          <span>Enterprise-Grade Document Security</span>
        </div>
        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-slate-900 max-w-3xl mx-auto mb-6">
          Secure Document Sharing <span className="text-indigo-600">Made Simple</span>
        </h1>
        <p className="text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto mb-10">
          A secure web platform for seamless document sharing, real-time collaboration, and bulletproof privacy control.
        </p>
        <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4">
          <button 
            onClick={() => window.location.href = '/?admin=true'}
            className="w-full sm:w-auto bg-indigo-600 text-white px-8 py-3.5 rounded-xl font-medium shadow-lg hover:bg-indigo-700 transition flex items-center justify-center space-x-2"
          >
            <span>Get Started Free</span>
            <ArrowRight className="h-4 w-4" />
          </button>
          <a href="#features" className="w-full sm:w-auto bg-white border border-slate-200 text-slate-700 px-8 py-3.5 rounded-xl font-medium hover:bg-slate-50 transition text-center">
            Explore Features
          </a>
        </div>
      </section>

      {/* Features Grid Section */}
      <section id="features" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t border-slate-200">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl font-bold tracking-tight mb-4">Why Choose docShare?</h2>
          <p className="text-slate-600">Everything you need to manage, share, and protect your most important files.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition">
            <div className="bg-indigo-50 text-indigo-600 p-3 rounded-xl w-fit mb-6">
              <Lock className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-semibold mb-3">End-to-End Security</h3>
            <p className="text-slate-600">Your documents are encrypted and protected with strict access permissions and secure links.</p>
          </div>

          <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition">
            <div className="bg-indigo-50 text-indigo-600 p-3 rounded-xl w-fit mb-6">
              <Share2 className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Instant Link Sharing</h3>
            <p className="text-slate-600">Generate secure links with expiration dates so you stay in total control of who views your content.</p>
          </div>

          <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition">
            <div className="bg-indigo-50 text-indigo-600 p-3 rounded-xl w-fit mb-6">
              <Users className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Team Collaboration</h3>
            <p className="text-slate-600">Collaborate with your team members in real-time with centralized workspace document management.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
