"use client";
import React from "react";
import Logo from "@/components/common/Logo";
import { createClient } from "@/lib/supabase/client";

//import { FcGoogle } from "react-icons/fc";

const SignIn = () => {
  const supabase =  createClient();
  const handleGoogleLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider:"google",
      options:{
        redirectTo:`${location.origin}/auth/callback`
      }
    })
    console.log("Google Sign In");
  };

  return (
    <div className="min-h-screen bg-[#020617] flex items-center justify-center px-4">
      
      <div className="w-full max-w-sm sm:max-w-md bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl shadow-xl p-6 sm:p-8 space-y-6">
        
        {/* Logo */}
        <div className="flex justify-center">
          <Logo />
        </div>

        {/* Title */}
        <div className="text-center space-y-2">
          <h2 className="text-xl sm:text-2xl font-semibold text-white">
            Welcome Back 👋
          </h2>
          <p className="text-sm text-gray-400">
            Sign in to continue to your dashboard
          </p>
        </div>

        {/* Google Button */}
        <button
          onClick={handleGoogleLogin}
          className="w-full flex items-center justify-center gap-3 py-2.5 rounded-lg bg-white hover:bg-gray-100 text-gray-800 font-medium transition"
        >
          <img
    src="https://www.svgrepo.com/show/475656/google-color.svg"
    className="w-5 h-5"
  />

          Continue with Google
        </button>

        {/* Footer */}
        <p className="text-center text-xs text-gray-500">
          Secure login powered by Google
        </p>

      </div>
    </div>
  );
};

export default SignIn;