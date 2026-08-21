import React, { useState } from 'react';
import { supabase } from '../utils/supabase';
import { ArrowLeft } from 'lucide-react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [isResetMode, setIsResetMode] = useState(false);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    if (isResetMode) {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: window.location.origin + '/?admin=true',
      });
      if (error) setMessage(error.message);
      else setMessage('Password reset instructions sent to your email!');
    } else {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) {
        setMessage(error.message);
      } else {
        window.location.href = '/?admin=true';
      }
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="text-center text-3xl font-extrabold text-slate-900">
          {isResetMode ? 'Reset Password' : 'Admin Portal Login'}
        </h2>
        <p className="mt-2 text-center text-sm text-slate-600">
          Protected backend access for docShare
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10 border border-slate-200">
          <form onSubmit={handleAuth} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-700">Email Address</label>
              <div className="mt-1">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="admin@docshare.com"
                />
              </div>
            </div>

            {!isResetMode && (
              <div>
                <label className="block text-sm font-medium text-slate-700">Password</label>
                <div className="mt-1">
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="appearance-none block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    placeholder="••••••••"
                  />
                </div>
              </div>
            )}

            {message && (
              <div className="text-sm text-center p-3 rounded-md bg-indigo-50 text-indigo-700 font-medium">
                {message}
              </div>
            )}

            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none transition"
              >
                {loading ? 'Processing...' : isResetMode ? 'Send Reset Instructions' : 'Sign In'}
              </button>
            </div>
          </form>

          <div className="mt-6 flex items-center justify-between text-sm">
            <button
              onClick={() => setIsResetMode(!isResetMode)}
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              {isResetMode ? 'Back to Login' : 'Forgot Password?'}
            </button>
            <a href="/" className="font-medium text-slate-600 hover:text-slate-500 flex items-center space-x-1">
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Home</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

