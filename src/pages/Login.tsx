import React, { useState } from 'react';
import { Shield, ArrowLeft, KeyRound, CheckCircle } from 'lucide-react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isResetMode, setIsResetMode] = useState(false);
  const [resetSent, setResetSent] = useState(false);

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    if (isResetMode) {
      setResetSent(true);
      setTimeout(() => {
        setResetSent(false);
        setIsResetMode(false);
      }, 4000);
    } else {
      // Standard login logic / Supabase auth call
      alert("Authenticating...");
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <div className="bg-indigo-600 p-3 rounded-2xl text-white shadow-md">
            <Shield className="h-8 w-8" />
          </div>
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-slate-900">
          {isResetMode ? 'Reset Your Password' : 'Admin Portal Login'}
        </h2>
        <p className="mt-2 text-center text-sm text-slate-600">
          {isResetMode ? 'Enter your email to receive a secure recovery link' : 'Protected backend access for docShare'}
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4">
        <div className="bg-white py-8 px-4 shadow-xl sm:rounded-2xl sm:px-10 border border-slate-200">
          {resetSent ? (
            <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-xl text-center space-y-2">
              <CheckCircle className="h-8 w-8 text-emerald-600 mx-auto" />
              <h3 className="font-bold text-emerald-900">Recovery Link Sent!</h3>
              <p className="text-xs text-emerald-700">Check your email inbox for instructions to set your new password.</p>
            </div>
          ) : (
            <form onSubmit={handleAuth} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Email Address</label>
                <input 
                  type="email" 
                  required 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@docshare.com"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                />
              </div>

              {!isResetMode && (
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Password</label>
                  <input 
                    type="password" 
                    required 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                  />
                </div>
              )}

              <div>
                <button 
                  type="submit" 
                  className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-md text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 transition"
                >
                  {isResetMode ? 'Send Password Reset Link' : 'Sign In'}
                </button>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                <button 
                  type="button"
                  onClick={() => setIsResetMode(!isResetMode)}
                  className="text-xs font-medium text-indigo-600 hover:text-indigo-500 flex items-center space-x-1"
                >
                  <KeyRound className="h-3.5 w-3.5" />
                  <span>{isResetMode ? 'Back to Sign In' : 'Request Password Change'}</span>
                </button>

                <a href="/" className="text-xs font-medium text-slate-600 hover:text-slate-900 flex items-center space-x-1">
                  <ArrowLeft className="h-3.5 w-3.5" />
                  <span>Back to Home</span>
                </a>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
