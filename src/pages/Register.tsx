import React, { useState } from 'react';
import { Users, User, Building2, ArrowRight } from 'lucide-react';

export default function Register() {
  const [accountType, setAccountType] = useState<'individual' | 'group' | 'organization'>('individual');
  const [orgStaffTier, setOrgStaffTier] = useState<string>('5');
  const [customStaff, setCustomStaff] = useState<string>('');

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="text-center text-3xl font-extrabold text-slate-900">
          Create your docShare account
        </h2>
        <p className="mt-2 text-center text-sm text-slate-600">
          Get started with individual, group, or organization access
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-xl">
        <div className="bg-white py-8 px-4 shadow sm:rounded-xl sm:px-10 border border-slate-200">
          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            
            {/* Account Type Selector */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-3">
                Select Account Type
              </label>
              <div className="grid grid-cols-3 gap-3">
                <button
                  type="button"
                  onClick={() => setAccountType('individual')}
                  className={`flex flex-col items-center p-4 rounded-xl border text-sm font-medium transition ${
                    accountType === 'individual'
                      ? 'border-indigo-600 bg-indigo-50 text-indigo-700'
                      : 'border-slate-200 hover:border-slate-300 text-slate-700'
                  }`}
                >
                  <User className="h-6 w-6 mb-2" />
                  Individual
                </button>

                <button
                  type="button"
                  onClick={() => setAccountType('group')}
                  className={`flex flex-col items-center p-4 rounded-xl border text-sm font-medium transition ${
                    accountType === 'group'
                      ? 'border-indigo-600 bg-indigo-50 text-indigo-700'
                      : 'border-slate-200 hover:border-slate-300 text-slate-700'
                  }`}
                >
                  <Users className="h-6 w-6 mb-2" />
                  Group
                </button>

                <button
                  type="button"
                  onClick={() => setAccountType('organization')}
                  className={`flex flex-col items-center p-4 rounded-xl border text-sm font-medium transition ${
                    accountType === 'organization'
                      ? 'border-indigo-600 bg-indigo-50 text-indigo-700'
                      : 'border-slate-200 hover:border-slate-300 text-slate-700'
                  }`}
                >
                  <Building2 className="h-6 w-6 mb-2" />
                  Organization
                </button>
              </div>
            </div>

            {/* Conditional Staff Sizing based on Account Type */}
            {accountType === 'individual' && (
              <div className="p-4 bg-slate-50 rounded-lg border border-slate-200 text-sm text-slate-600">
                <span className="font-semibold text-slate-900">Individual Account:</span> Set up for 1 user (Creator/Admin).
              </div>
            )}

            {accountType === 'group' && (
              <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Group Size
                </label>
                <div className="text-sm font-semibold text-indigo-600">
                  Staff 5 and below
                </div>
                <p className="text-xs text-slate-500 mt-1">Ideal for small teams, project groups, and circles.</p>
              </div>
            )}

            {accountType === 'organization' && (
              <div className="p-4 bg-slate-50 rounded-lg border border-slate-200 space-y-4">
                <label className="block text-sm font-medium text-slate-700">
                  Organization Staff Strength
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {['5', '10', '20', '40'].map((tier) => (
                    <button
                      key={tier}
                      type="button"
                      onClick={() => { setOrgStaffTier(tier); setCustomStaff(''); }}
                      className={`py-2 px-3 rounded-lg border text-sm font-medium transition ${
                        orgStaffTier === tier && !customStaff
                          ? 'bg-indigo-600 text-white border-indigo-600'
                          : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      Staff {tier}
                    </button>
                  ))}
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1">
                    Or specify custom staff strength:
                  </label>
                  <input
                    type="number"
                    placeholder="e.g. 75"
                    value={customStaff}
                    onChange={(e) => { setCustomStaff(e.target.value); setOrgStaffTier(''); }}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
                  />
                </div>
              </div>
            )}

            {/* Basic Info Fields */}
            <div>
              <label className="block text-sm font-medium text-slate-700">Email Address</label>
              <input
                type="email"
                required
                placeholder="creator@example.com"
                className="mt-1 w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700">Password</label>
              <input
                type="password"
                required
                placeholder="••••••••"
                className="mt-1 w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-3 rounded-xl font-medium hover:bg-indigo-700 transition flex items-center justify-center space-x-2"
            >
              <span>Create Account & Continue as Admin</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
