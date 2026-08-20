import React from "react";
import { Shield, Share2, Users, ArrowRight, Lock, FileText } from "lucide-react";

export default function Index() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col">
      {/* Header / Navbar */}
      <header className="border-b bg-white/80 backdrop-blur-md sticky top-0 z-50 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="bg-indigo-600 p-2 rounded-lg text-white">
            <FileText className="w-5 h-5" />
          </div>
          <span className="text-xl font-bold tracking-tight">docShare</span>
        </div>
        <div className="flex items-center gap-4">
          <a href="/auth" className="text-sm font-medium text-slate-600 hover:text-indigo-600 transition">
            Sign In
          </a>
          <a href="/auth" className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium px-4 py-2 rounded-lg shadow-sm transition">
            Get Started
          </a>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1">
        <section className="px-6 py-20 md:py-32 max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full text-xs font-semibold mb-6">
            <Shield className="w-3.5 h-3.5" /> Enterprise-Grade Document Security
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-slate-900 mb-6">
            Secure Document Sharing <span className="text-indigo-600">Made Simple</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto mb-10">
            A secure web platform for seamless document sharing, real-time collaboration, and bulletproof privacy control.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="/auth" className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-6 py-3 rounded-xl shadow-md transition flex items-center justify-center gap-2">
              Get Started Free <ArrowRight className="w-4 h-4" />
            </a>
            <a href="#features" className="w-full sm:w-auto bg-white hover:bg-slate-100 text-slate-700 border font-medium px-6 py-3 rounded-xl transition">
              Explore Features
            </a>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="bg-white py-20 border-t px-6">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tight mb-4">Why Choose docShare?</h2>
              <p className="text-slate-600 max-w-lg mx-auto">Everything you need to manage, share, and protect your most important files.</p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="p-6 rounded-2xl border bg-slate-50/50">
                <div className="bg-indigo-100 text-indigo-600 p-3 rounded-xl w-fit mb-4">
                  <Lock className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-semibold mb-2">End-to-End Security</h3>
                <p className="text-sm text-slate-600">Your documents are encrypted and protected with strict access permissions.</p>
              </div>
              <div className="p-6 rounded-2xl border bg-slate-50/50">
                <div className="bg-indigo-100 text-indigo-600 p-3 rounded-xl w-fit mb-4">
                  <Share2 className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Instant Sharing</h3>
                <p className="text-sm text-slate-600">Generate secure links with expiration dates and password controls instantly.</p>
              </div>
              <div className="p-6 rounded-2xl border bg-slate-50/50">
                <div className="bg-indigo-100 text-indigo-600 p-3 rounded-xl w-fit mb-4">
                  <Users className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Team Collaboration</h3>
                <p className="text-sm text-slate-600">Work together seamlessly with permissions tailored for clients and teammates.</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t bg-white py-6 px-6 text-center text-sm text-slate-500">
        <p>&copy; 2026 docShare. All rights reserved.</p>
      </footer>
    </div>
  );
}
