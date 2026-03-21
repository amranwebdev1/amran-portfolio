'use client'

import Link from 'next/link';
import { motion } from 'framer-motion';

export default function UnauthorizedPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center px-6 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-xl bg-white p-10 rounded-2xl shadow-xl border border-gray-100"
      > {/* <--- এখানে আগে ভুল করে ) ছিল, এখন > দিয়ে ঠিক করা হয়েছে */}
        
        {/* লক আইকন */}
        <div className="flex justify-center mb-8">
          <div className="p-5 rounded-full bg-red-100 text-red-600 shadow-inner">
            <svg
              className="w-16 h-16"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
          </div>
        </div>

        {/* এরর টেক্সট */}
        <h1 className="text-6xl font-extrabold text-gray-900 mb-4 tracking-tight">401</h1>
        <h2 className="text-3xl font-bold text-gray-800 mb-6">অ্যাক্সেস অনুমোদিত নয়!</h2>
        
        <p className="text-lg text-gray-600 mb-10 leading-relaxed">
          দুঃখিত, আপনি যে পেজটি দেখার চেষ্টা করছেন তা দেখার জন্য আপনার পর্যাপ্ত অনুমতি বা সেশন নেই। দয়া করে সঠিক অ্যাকাউন্ট দিয়ে লগইন করুন।
        </p>

        {/* অ্যাকশন বাটন */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="px-8 py-3 bg-red-600 text-white rounded-xl font-semibold hover:bg-red-700 transition-colors duration-300 shadow-md hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-red-300 text-center"
          >
            হোম পেজে যান
          </Link>
          
          <Link
            href="/auth/sign-in"
            className="px-8 py-3 bg-gray-100 text-gray-800 rounded-xl font-semibold hover:bg-gray-200 transition-colors duration-300 border border-gray-200 text-center"
          >
            লগইন করুন
          </Link>
        </div>
      </motion.div>

      <footer className="mt-16 text-center text-gray-500 text-sm">
        &copy; {new Date().getFullYear()} আপনার প্রজেক্টের নাম।
      </footer>
    </div>
  );
}
