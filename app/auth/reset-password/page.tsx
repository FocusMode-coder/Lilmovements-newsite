"use client";

import React, { useState, useEffect, Suspense } from "react";
import { motion } from "framer-motion";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

const ResetPasswordForm = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  useEffect(() => {
    if (!token) {
      setError("Invalid reset link. Please request a new password reset.");
    }
  }, [token]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters long");
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to reset password");
      }

      setSuccess(data.message);
      
      // Redirect to sign in after 3 seconds
      setTimeout(() => {
        router.push("/join");
      }, 3000);
      
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    }
  };

  if (!token) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#fffaf6] to-white flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <motion.div
          className="mx-auto max-w-md bg-white/80 backdrop-blur-md shadow-xl rounded-3xl px-8 py-10 border border-white/20"
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
        >
          <div className="text-center">
            <h1 className="text-2xl font-semibold text-neutral-900 mb-4">
              Invalid Reset Link
            </h1>
            <p className="text-neutral-600 mb-6">
              This password reset link is invalid or has expired. Please request a new one.
            </p>
            <Link
              href="/join"
              className="inline-block bg-black text-white px-6 py-3 rounded-xl font-medium hover:bg-gray-800 transition-colors duration-200"
            >
              Back to Sign In
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#fffaf6] to-white flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <motion.div
          className="mx-auto max-w-md bg-white/80 backdrop-blur-md shadow-xl rounded-3xl px-8 py-10 border border-white/20"
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
        >
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 className="text-2xl font-semibold text-neutral-900 mb-4">
              Password Reset Successful
            </h1>
            <p className="text-neutral-600 mb-6">
              Your password has been successfully updated. You will be redirected to sign in shortly.
            </p>
            <Link
              href="/join"
              className="inline-block bg-black text-white px-6 py-3 rounded-xl font-medium hover:bg-gray-800 transition-colors duration-200"
            >
              Sign In Now
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#fffaf6] to-white flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        className="mx-auto max-w-md bg-white/80 backdrop-blur-md shadow-xl rounded-3xl px-8 py-10 border border-white/20"
        variants={fadeInUp}
        initial="hidden"
        animate="visible"
      >
        <h1 className="text-2xl font-semibold text-center text-neutral-900 mb-2">
          Set New Password
        </h1>
        <p className="text-sm text-center text-neutral-500 mb-8">
          Enter your new password below. Make sure it's secure and memorable.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">
              New Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={8}
              className="w-full rounded-xl border border-neutral-200 bg-white/50 px-4 py-3 text-sm focus:border-black focus:ring-2 focus:ring-black/10 focus:outline-none transition-all duration-200"
              placeholder="Enter your new password"
            />
            <p className="text-xs text-neutral-500 mt-1">
              Must be at least 8 characters long
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">
              Confirm New Password
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="w-full rounded-xl border border-neutral-200 bg-white/50 px-4 py-3 text-sm focus:border-black focus:ring-2 focus:ring-black/10 focus:outline-none transition-all duration-200"
              placeholder="Confirm your new password"
            />
          </div>

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-xl px-4 py-3"
            >
              {error}
            </motion.div>
          )}

          <button
            type="submit"
            disabled={isSubmitting || !password || !confirmPassword}
            className="w-full mt-6 bg-black text-white rounded-xl px-6 py-3 font-medium hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[0.98] active:scale-[0.96]"
          >
            {isSubmitting ? "Updating Password..." : "Update Password"}
          </button>
        </form>

        <div className="mt-6 text-center">
          <Link
            href="/join"
            className="text-sm text-neutral-500 hover:text-neutral-700 transition-colors"
          >
            ← Back to Sign In
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

const ResetPasswordPage = () => {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-b from-[#fffaf6] to-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-black mx-auto"></div>
          <p className="mt-2 text-neutral-600">Loading...</p>
        </div>
      </div>
    }>
      <ResetPasswordForm />
    </Suspense>
  );
};

export default ResetPasswordPage;