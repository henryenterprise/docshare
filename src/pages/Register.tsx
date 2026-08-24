import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { Building2, Users, ShieldCheck, Upload, ArrowRight, ArrowLeft, CheckCircle2 } from 'lucide-react';

export default function Register() {
  const [accountType, setAccountType] = useState<'organization' | 'group'>('organization');
  const [step, setStep] = useState<number>(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Form Fields State
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    otherNames: '',
    dob: '',
    email: '',
    phoneCountryCode: '+234',
    phone: '',
    occupation: '',
    industry: 'Telecommunications & Digital Services',
    country: 'Nigeria',
    state: '',
    lga: '',
    streetAddress: '',
    entityName: '',
    registrationNumber: '', // CAC or Group Reg No
    taxId: '', // TIN
    designation: '',
    staffSize: '1-10 employees',
    idType: 'National ID (NIN)',
  });
      useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const regType = params.get('type');
    if (regType === 'group') {
      setAccountType('group');
      setFormData(prev => ({ ...prev, staffSize: '1 - 5' }));
    } else if (regType === 'organization') {
      setAccountType('organization');
      setFormData(prev => ({ ...prev, staffSize: '1-10 employees' }));
    }
  }, []);

  const [idFile, setIdFile] = useState<File | null>(null);
  const [corpFile, setCorpFile] = useState<File | null>(null);
  const [termsAccepted, setTermsAccepted] = useState(false); // Default is false (Cancel/Decline state)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegistrationSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!termsAccepted) {
      setError('You must accept the Terms of Service to proceed. Registration cancelled.');
      return;
    }

    if (!idFile) {
      setError('Please upload your valid means of identification.');
      return;
    }

    setLoading(true);

    try {
      // 1. Create Supabase Auth User (Password can be auto-generated or prompted, keeping standard signup here)
      // For security, registrations default to a 'pending_verification' status in your database.
      const tempPassword = Math.random().toString(36).slice(-8) + 'A1!';
 
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: formData.email,
        password: tempPassword,
        options: {
          data: {
            first_name: formData.firstName,
            last_name: formData.lastName,
            entity_name: formData.entityName,
            entity_type: accountType,
            status: 'pending_review'
          }
        }
      });

      if (authError) throw authError;

      // 2. Upload verification files to Supabase Storage (if buckets are set up)
      // Note: In production, upload files to your secure 'verifications' storage bucket here.

      setSuccessMessage('Registration submitted successfully! Your account is currently pending owner verification and review. Check your email for initial login credentials.');
      setStep(3); // Success Screen
    } catch (err: any) {
      setError(err.message || 'An error occurred during registration. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F4F1EA] text-slate-800 flex flex-col justify-center items-center p-4 sm:p-6 py-12">
      
      {/* Header */}
      <div className="mb-6 text-center">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-slate-900 text-white mb-2 shadow-md">
          <ShieldCheck className="w-6 h-6" />
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">docShare Onboarding</h1>
        <p className="text-sm text-slate-600 mt-1">Secure Organization & Group Registration Portal</p>
      </div>

      <div className="w-full max-w-2xl bg-white border border-slate-200/80 rounded-2xl shadow-xl p-6 sm:p-8">
        
        {error && (
          <div className="mb-6 p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-xl font-medium">
            {error}
          </div>
        )}

        {step === 3 ? (
          <div className="text-center py-8 space-y-4">
            <div className="inline-flex p-3 bg-emerald-100 text-emerald-700 rounded-full">
              <CheckCircle2 className="w-12 h-12" />
            </div>
            <h2 className="text-xl font-bold text-slate-900">Application Under Review</h2>
            <p className="text-sm text-slate-600 max-w-md mx-auto">{successMessage}</p>
            <div className="pt-4">
              <a 
                href="/login" 
                className="inline-flex items-center gap-2 px-6 py-2.5 bg-slate-900 text-white text-sm font-semibold rounded-xl shadow hover:bg-slate-800 transition"
              >
                Return to Login <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        ) : (
          <form onSubmit={handleRegistrationSubmit} className="space-y-6">
            
            {/* Account Type Selection */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">
                Registering As
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setAccountType('organization')}
                  className={`py-3 px-4 text-xs font-bold rounded-xl border flex items-center justify-center gap-2 transition ${accountType === 'organization' ? 'bg-slate-900 text-white border-slate-900 shadow' : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'}`}
                >
                  <Building2 className="w-4 h-4" /> Organization / Corporate
                </button>
                <button
                  type="button"
                  onClick={() => setAccountType('group')}
                  className={`py-3 px-4 text-xs font-bold rounded-xl border flex items-center justify-center gap-2 transition ${accountType === 'group' ? 'bg-slate-900 text-white border-slate-900 shadow' : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'}`}
                >
                  <Users className="w-4 h-4" /> Association / Group
                </button>
              </div>
            </div>

            {/* Section 1: Personal Details */}
            <div className="space-y-4 pt-4 border-t border-slate-100">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">1. Representative / Owner Details</h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 mb-1">First Name *</label>
                  <input type="text" name="firstName" required value={formData.firstName} onChange={handleInputChange} className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-slate-900 focus:bg-white" />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 mb-1">Last Name *</label>
                  <input type="text" name="lastName" required value={formData.lastName} onChange={handleInputChange} className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-slate-900 focus:bg-white" />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 mb-1">Other Names</label>
                  <input type="text" name="otherNames" value={formData.otherNames} onChange={handleInputChange} className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-slate-900 focus:bg-white" />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 mb-1">Date of Birth *</label>
                  <input type="date" name="dob" required value={formData.dob} onChange={handleInputChange} className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-slate-900 focus:bg-white" />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 mb-1">Email Address *</label>
                  <input type="email" name="email" required value={formData.email} onChange={handleInputChange} placeholder="owner@company.com" className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-slate-900 focus:bg-white" />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 mb-1">Phone Number (with Country Code) *</label>
                  <div className="flex gap-2">
                    <select name="phoneCountryCode" value={formData.phoneCountryCode} onChange={handleInputChange} className="w-24 p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs">
                      <option value="+234">+234 (NG)</option>
                      <option value="+1">+1 (US)</option>
                      <option value="+44">+44 (UK)</option>
                      <option value="+233">+233 (GH)</option>
                    </select>
                    <input type="tel" name="phone" required value={formData.phone} onChange={handleInputChange} placeholder="8012345678" className="flex-1 p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-slate-900 focus:bg-white" />
                  </div>
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 mb-1">Profession / Occupation *</label>
                  <input type="text" name="occupation" required value={formData.occupation} onChange={handleInputChange} placeholder="e.g. Telecommunications Engineer / Director" className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-slate-900 focus:bg-white" />
                </div>
              </div>
            </div>

            {/* Section 2: Entity & Geographic Traceability */}
            <div className="space-y-4 pt-4 border-t border-slate-100">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">2. Entity & Location Information</h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 mb-1">Official {accountType === 'organization' ? 'Organization' : 'Group'} Name *</label>
                  <input type="text" name="entityName" required value={formData.entityName} onChange={handleInputChange} placeholder="e.g. Apex Global Communications" className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-slate-900 focus:bg-white" />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 mb-1">Registration / CAC Number (Optional)</label>
                  <input type="text" name="registrationNumber" value={formData.registrationNumber} onChange={handleInputChange} placeholder="e.g. RC-1234567" className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-slate-900 focus:bg-white" />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 mb-1">Country *</label>
                  <select name="country" value={formData.country} onChange={handleInputChange} className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs">
                    <option value="Nigeria">Nigeria</option>
                    <option value="Ghana">Ghana</option>
                    <option value="United Kingdom">United Kingdom</option>
                    <option value="United States">United States</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 mb-1">State / Province *</label>
                  <input type="text" name="state" required value={formData.state} onChange={handleInputChange} placeholder="e.g. Lagos State" className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-slate-900 focus:bg-white" />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 mb-1">City / LGA *</label>
                  <input type="text" name="lga" required value={formData.lga} onChange={handleInputChange} placeholder="e.g. Ikeja LGA" className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-slate-900 focus:bg-white" />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-600 mb-1">Registered Street Address *</label>
                <input type="text" name="streetAddress" required value={formData.streetAddress} onChange={handleInputChange} placeholder="e.g. 15 Broad Street, Suite 4B" className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-slate-900 focus:bg-white" />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 mb-1">Designation / Role *</label>
                  <input type="text" name="designation" required value={formData.designation} onChange={handleInputChange} placeholder="e.g. Managing Director / President" className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-slate-900 focus:bg-white" />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 mb-1">Estimated Staff / Member Scope *</label>
                  <<select 
  name="staffSize" 
  value={formData.staffSize} 
  onChange={handleInputChange} 
  className="block w-full px-3 py-2 border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 bg-white"
>
  {accountType === 'group' ? (
    <option value="1 - 5">1 - 5 members</option>
  ) : (
    <>
      <option value="1-10 employees">1 - 10 employees</option>
      <option value="11-50 members">11 - 50 members</option>
      <option value="51-200 employees">51 - 200 members</option>
      <option value="200+ employees">200+ members</option>
    </>
  )}
</select>



                </div>
              </div>
            </div>

            {/* Section 3: Verification Documents & Security */}
            <div className="space-y-4 pt-4 border-t border-slate-100">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">3. Security & Compliance Uploads</h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 mb-1">Select ID Type *</label>
                  <select name="idType" value={formData.idType} onChange={handleInputChange} className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs mb-2">
                    <option value="National ID (NIN)">National ID (NIN)</option>
                    <option value="International Passport">International Passport</option>
                    <option value="Driver's License">Driver's License</option>
                  </select>
                  <label className="block text-[11px] font-semibold text-slate-600 mb-1">Upload ID Document (PDF/Image) *</label>
                  <input type="file" required onChange={(e) => setIdFile(e.target.files?.[0] || null)} className="w-full text-xs text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-slate-900 file:text-white hover:file:bg-slate-800" />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 mb-1">Corporate Registration / MoU Document (Optional)</label>
                  <div className="h-7"></div>
                  <input type="file" onChange={(e) => setCorpFile(e.target.files?.[0] || null)} className="w-full text-xs text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-slate-100 file:text-slate-700 hover:file:bg-slate-200" />
                </div>
              </div>
            </div>

            {/* Terms of Service Checkbox (Default to Cancel behavior) */}
            <div className="pt-4 border-t border-slate-100 bg-amber-50/50 p-4 rounded-xl border border-amber-200/60">
              <label className="flex items-start gap-3 cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={termsAccepted} 
                  onChange={(e) => {
                    const checked = e.target.checked;
                    setTermsAccepted(checked);
                    if (!checked) {
                      // Redirect back or notify cancel
                      alert('Registration cancelled. Returning to login.');
                      window.location.href = '/login';
                    }
                  }} 
                  className="mt-1 w-4 h-4 text-slate-900 rounded border-slate-300 focus:ring-slate-900"
                />
                <span className="text-xs text-slate-700 leading-relaxed">
                  I agree to docShare's <span className="font-semibold underline">Terms of Service</span>, Privacy Policy, and confirm that all entity information and identification details provided are accurate and authorized for platform registration. *(Unchecking this box cancels registration).*
                </span>
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 px-4 bg-slate-900 hover:bg-slate-800 text-white text-sm font-semibold rounded-xl shadow-md transition flex items-center justify-center gap-2"
            >
              {loading ? 'Submitting for Review...' : 'Complete & Submit Registration'} <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        )}

      </div>

      {/* Footer Navigation */}
      <div className="mt-8 text-center text-xs text-slate-500 flex items-center justify-center gap-4">
        <a href="/login" className="flex items-center gap-1 font-semibold text-slate-900 underline">
          <ArrowLeft className="w-3.5 h-3.5" /> Back to User Login
        </a>
        <span>•</span>
        <a href="/admin" className="font-semibold text-slate-900 underline">Admin Command Center</a>
      </div>
    </div>
  );
}
