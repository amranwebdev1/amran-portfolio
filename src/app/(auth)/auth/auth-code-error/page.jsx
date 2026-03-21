// app/auth/auth-code-error/page.jsx
'use client'

import Link from 'next/link';
import { motion } from 'framer-motion';

export default function AuthCodeError() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center items-center px-6">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md w-full bg-white p-8 rounded-3xl shadow-2xl border border-slate-100 text-center"
      >
        {/* এরর আইকন */}
        <div className="flex justify-center mb-6">
          <div className="bg-amber-100 p-4 rounded-full">
            <svg 
              className="w-12 h-12 text-amber-600" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth="2" 
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" 
              />
            </svg>
          </div>
        </div>

        <h1 className="text-2xl font-bold text-slate-800 mb-2">
          অথেন্টিকেশন সমস্যা!
        </h1>
        
        <p className="text-slate-600 mb-8">
          দুঃখিত, আপনার লগইন লিঙ্কটি অবৈধ অথবা এর মেয়াদ শেষ হয়ে গেছে। দয়া করে আবার নতুন করে লগইন করার চেষ্টা করুন।
        </p>

        <div className="space-y-3">
          <Link 
            href="/auth/sign-in"
            className="block w-full py-3 bg-indigo-600 text-white rounded-xl font-medium hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200"
          >
            আবার চেষ্টা করুন
          </Link>
          
          <Link 
            href="/"
            className="block w-full py-3 bg-slate-100 text-slate-700 rounded-xl font-medium hover:bg-slate-200 transition-all"
          >
            হোম পেজে ফিরে যান
          </Link>
        </div>

        <p className="mt-8 text-xs text-slate-400">
          Error Code: AUTH_CODE_EXPIRED_OR_INVALID
        </p>
      </motion.div>
    </div>
  );
}
