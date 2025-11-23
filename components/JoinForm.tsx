"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

type JoinFormMode = "create" | "signin" | "forgot";
type OnboardingStep = 1 | 2 | 3 | 4 | 5;

interface OnboardingData {
  fullName: string;
  email: string;
  password: string;
  birthDate: string;
  goals: string[];
  classInterests: string[];
  experienceLevel: string;
  practiceTime: string;
  sessionDuration: string;
}

interface JoinFormProps {
  initialMode?: JoinFormMode;
}

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: { duration: 0.3, ease: "easeIn" },
  }
};

const JoinForm: React.FC<JoinFormProps> = ({ initialMode = "signin" }) => {
  const [mode, setMode] = useState<JoinFormMode>(initialMode);
  const [currentStep, setCurrentStep] = useState<OnboardingStep>(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const router = useRouter();

  const [onboardingData, setOnboardingData] = useState<OnboardingData>({
    fullName: "",
    email: "",
    password: "",
    birthDate: "",
    goals: [],
    classInterests: [],
    experienceLevel: "",
    practiceTime: "",
    sessionDuration: ""
  });

  const [signInData, setSignInData] = useState({
    email: "",
    password: ""
  });

  const [forgotPasswordEmail, setForgotPasswordEmail] = useState("");

  const goalOptions = [
    "Increase Flexibility",
    "Build Strength", 
    "Mindfulness & Mental Health",
    "Weight Management",
    "Pain Relief & Recovery",
    "Better Sleep",
    "Stress Reduction",
    "Dance & Expression",
    "Community & Connection"
  ];

  const classOptions = [
    "Contemporary Flow",
    "Yoga & Mindfulness", 
    "Strength Training",
    "Dance Movement",
    "Pilates",
    "Meditation",
    "Breathwork",
    "Gentle Movement",
    "High Intensity"
  ];

  const experienceOptions = [
    "Complete Beginner",
    "Some Experience", 
    "Intermediate",
    "Advanced"
  ];

  const timeOptions = [
    "Early Morning (6-8am)",
    "Morning (8-10am)",
    "Midday (10am-2pm)", 
    "Afternoon (2-6pm)",
    "Evening (6-8pm)",
    "Night (8pm+)"
  ];

  const durationOptions = [
    "15-20 minutes",
    "20-30 minutes",
    "30-45 minutes", 
    "45-60 minutes",
    "60+ minutes"
  ];

  const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      const result = await signIn("credentials", {
        email: signInData.email,
        password: signInData.password,
        redirect: false,
      });

      if (result?.error) {
        throw new Error("Invalid credentials");
      }

      if (result?.ok) {
        router.push("/dashboard");
      }
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleForgotPassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setIsSubmitting(true);

    try {
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: forgotPasswordEmail }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to send reset email");
      }

      setSuccess(data.message);
      
      // In development, show the reset link in console
      if (data.resetUrl) {
        console.log("Reset URL (dev only):", data.resetUrl);
      }
      
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleNextStep = () => {
    if (currentStep < 5) {
      setCurrentStep((prev) => (prev + 1) as OnboardingStep);
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => (prev - 1) as OnboardingStep);
    }
  };

  const handleArrayToggle = (array: string[], item: string, field: keyof OnboardingData) => {
    const newArray = array.includes(item) 
      ? array.filter(i => i !== item)
      : [...array, item];
    
    setOnboardingData(prev => ({
      ...prev,
      [field]: newArray
    }));
  };

  const handleCompleteOnboarding = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: onboardingData.fullName,
          email: onboardingData.email,
          password: onboardingData.password,
          birthDate: onboardingData.birthDate,
          goals: onboardingData.goals,
          classInterests: onboardingData.classInterests,
          experienceLevel: onboardingData.experienceLevel,
          practiceTime: onboardingData.practiceTime,
          sessionDuration: onboardingData.sessionDuration
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Registration failed");
      }

      const result = await signIn("credentials", {
        email: onboardingData.email,
        password: onboardingData.password,
        redirect: false,
      });

      if (result?.error) {
        throw new Error("Registration successful but login failed");
      }

      router.push("/dashboard");
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (mode === "forgot") {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#fffaf6] to-white flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <motion.div
          className="mx-auto max-w-md bg-white/80 backdrop-blur-md shadow-xl rounded-3xl px-8 py-10 border border-white/20"
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
        >
          <h1 className="text-2xl font-semibold text-center text-neutral-900 mb-2">
            Reset Password
          </h1>
          <p className="text-sm text-center text-neutral-500 mb-8">
            Enter your email address and we'll send you a link to reset your password.
          </p>

          <form onSubmit={handleForgotPassword} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                value={forgotPasswordEmail}
                onChange={(e) => setForgotPasswordEmail(e.target.value)}
                required
                className="w-full rounded-xl border border-neutral-200 bg-white/50 px-4 py-3 text-sm focus:border-black focus:ring-2 focus:ring-black/10 focus:outline-none transition-all duration-200"
                placeholder="Enter your email address"
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

            {success && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-sm text-green-600 bg-green-50 border border-green-200 rounded-xl px-4 py-3"
              >
                {success}
              </motion.div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full mt-6 bg-black text-white rounded-xl px-6 py-3 font-medium hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[0.98] active:scale-[0.96]"
            >
              {isSubmitting ? "Sending..." : "Send Reset Link"}
            </button>
          </form>

          <div className="mt-6 text-center">
            <button
              type="button"
              onClick={() => setMode("signin")}
              className="text-sm text-neutral-500 hover:text-neutral-700 transition-colors"
            >
              ← Back to Sign In
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  if (mode === "signin") {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#fffaf6] to-white flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <motion.div
          className="mx-auto max-w-md bg-white/80 backdrop-blur-md shadow-xl rounded-3xl px-8 py-10 border border-white/20"
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
        >
          <div className="flex justify-center mb-6">
            <div className="inline-flex rounded-full bg-neutral-100 p-1">
              <button
                type="button"
                onClick={() => setMode("create")}
                className="px-4 py-2 text-sm font-medium rounded-full transition text-neutral-500 hover:text-neutral-700"
              >
                Create Account
              </button>
              <button
                type="button"
                onClick={() => setMode("signin")}
                className="px-4 py-2 text-sm font-medium rounded-full transition bg-black text-white shadow-lg"
              >
                Sign In
              </button>
            </div>
          </div>

          <h1 className="text-2xl font-semibold text-center text-neutral-900 mb-2">
            Welcome Back
          </h1>
          <p className="text-sm text-center text-neutral-500 mb-8">
            Sign in to continue your practice.
          </p>

          <form onSubmit={handleSignIn} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                value={signInData.email}
                onChange={(e) => setSignInData(prev => ({ ...prev, email: e.target.value }))}
                required
                className="w-full rounded-xl border border-neutral-200 bg-white/50 px-4 py-3 text-sm focus:border-black focus:ring-2 focus:ring-black/10 focus:outline-none transition-all duration-200"
                placeholder="Enter your email address"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Password
              </label>
              <input
                type="password"
                value={signInData.password}
                onChange={(e) => setSignInData(prev => ({ ...prev, password: e.target.value }))}
                required
                className="w-full rounded-xl border border-neutral-200 bg-white/50 px-4 py-3 text-sm focus:border-black focus:ring-2 focus:ring-black/10 focus:outline-none transition-all duration-200"
                placeholder="Enter your password"
              />
            </div>

            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => setMode("forgot")}
                className="text-sm text-neutral-500 hover:text-neutral-700 transition-colors"
              >
                Forgot password?
              </button>
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
              disabled={isSubmitting}
              className="w-full mt-6 bg-black text-white rounded-xl px-6 py-3 font-medium hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[0.98] active:scale-[0.96]"
            >
              {isSubmitting ? "Signing In..." : "Sign In"}
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#fffaf6] to-white flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        className="mx-auto max-w-lg bg-white/80 backdrop-blur-md shadow-xl rounded-3xl px-8 py-10 border border-white/20"
        variants={fadeInUp}
        initial="hidden"
        animate="visible"
      >
        <div className="flex justify-center mb-6">
          <div className="inline-flex rounded-full bg-neutral-100 p-1">
            <button
              type="button"
              className="px-4 py-2 text-sm font-medium rounded-full transition bg-black text-white shadow-lg"
            >
              Create Account
            </button>
            <button
              type="button"
              onClick={() => setMode("signin")}
              className="px-4 py-2 text-sm font-medium rounded-full transition text-neutral-500 hover:text-neutral-700"
            >
              Sign In
            </button>
          </div>
        </div>

        <div className="flex items-center justify-center mb-8">
          {[1, 2, 3, 4, 5].map((step) => (
            <div key={step} className="flex items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium transition-all duration-200 ${
                  step <= currentStep
                    ? 'bg-black text-white'
                    : 'bg-gray-200 text-gray-500'
                }`}
              >
                {step}
              </div>
              {step < 5 && (
                <div
                  className={`w-8 h-0.5 mx-2 transition-all duration-200 ${
                    step < currentStep ? 'bg-black' : 'bg-gray-200'
                  }`}
                />
              )}
            </div>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="space-y-6"
          >
            
            {currentStep === 1 && (
              <div>
                <h2 className="text-xl font-semibold text-center text-neutral-900 mb-2">
                  Let's start with the basics
                </h2>
                <p className="text-sm text-center text-neutral-500 mb-6">
                  Tell us a little about yourself
                </p>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={onboardingData.fullName}
                      onChange={(e) => setOnboardingData(prev => ({ ...prev, fullName: e.target.value }))}
                      className="w-full rounded-xl border border-neutral-200 bg-white/50 px-4 py-3 text-sm focus:border-black focus:ring-2 focus:ring-black/10 focus:outline-none"
                      placeholder="Enter your full name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                      Date of Birth
                    </label>
                    <input
                      type="date"
                      value={onboardingData.birthDate}
                      onChange={(e) => setOnboardingData(prev => ({ ...prev, birthDate: e.target.value }))}
                      className="w-full rounded-xl border border-neutral-200 bg-white/50 px-4 py-3 text-sm focus:border-black focus:ring-2 focus:ring-black/10 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={onboardingData.email}
                      onChange={(e) => setOnboardingData(prev => ({ ...prev, email: e.target.value }))}
                      className="w-full rounded-xl border border-neutral-200 bg-white/50 px-4 py-3 text-sm focus:border-black focus:ring-2 focus:ring-black/10 focus:outline-none"
                      placeholder="Enter your email"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                      Password
                    </label>
                    <input
                      type="password"
                      value={onboardingData.password}
                      onChange={(e) => setOnboardingData(prev => ({ ...prev, password: e.target.value }))}
                      minLength={8}
                      className="w-full rounded-xl border border-neutral-200 bg-white/50 px-4 py-3 text-sm focus:border-black focus:ring-2 focus:ring-black/10 focus:outline-none"
                      placeholder="Create a password (min 8 characters)"
                    />
                  </div>
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <div>
                <h2 className="text-xl font-semibold text-center text-neutral-900 mb-2">
                  What are your movement goals?
                </h2>
                <p className="text-sm text-center text-neutral-500 mb-6">
                  Select all that apply (we'll personalize your experience)
                </p>

                <div className="grid grid-cols-1 gap-3">
                  {goalOptions.map((goal) => (
                    <button
                      key={goal}
                      type="button"
                      onClick={() => handleArrayToggle(onboardingData.goals, goal, 'goals')}
                      className={`p-4 rounded-xl border-2 text-left transition-all duration-200 ${
                        onboardingData.goals.includes(goal)
                          ? 'border-black bg-black/5'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-medium">{goal}</span>
                        {onboardingData.goals.includes(goal) && (
                          <div className="w-5 h-5 bg-black rounded-full flex items-center justify-center">
                            <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          </div>
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {currentStep === 3 && (
              <div>
                <h2 className="text-xl font-semibold text-center text-neutral-900 mb-2">
                  Which classes interest you most?
                </h2>
                <p className="text-sm text-center text-neutral-500 mb-6">
                  We'll recommend the perfect sessions for you
                </p>

                <div className="grid grid-cols-1 gap-3">
                  {classOptions.map((classType) => (
                    <button
                      key={classType}
                      type="button"
                      onClick={() => handleArrayToggle(onboardingData.classInterests, classType, 'classInterests')}
                      className={`p-4 rounded-xl border-2 text-left transition-all duration-200 ${
                        onboardingData.classInterests.includes(classType)
                          ? 'border-black bg-black/5'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-medium">{classType}</span>
                        {onboardingData.classInterests.includes(classType) && (
                          <div className="w-5 h-5 bg-black rounded-full flex items-center justify-center">
                            <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          </div>
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {currentStep === 4 && (
              <div>
                <h2 className="text-xl font-semibold text-center text-neutral-900 mb-2">
                  What's your experience level?
                </h2>
                <p className="text-sm text-center text-neutral-500 mb-6">
                  This helps us suggest the right intensity for you
                </p>

                <div className="space-y-3">
                  {experienceOptions.map((level) => (
                    <button
                      key={level}
                      type="button"
                      onClick={() => setOnboardingData(prev => ({ ...prev, experienceLevel: level }))}
                      className={`w-full p-4 rounded-xl border-2 text-left transition-all duration-200 ${
                        onboardingData.experienceLevel === level
                          ? 'border-black bg-black/5'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-medium">{level}</span>
                        {onboardingData.experienceLevel === level && (
                          <div className="w-5 h-5 bg-black rounded-full flex items-center justify-center">
                            <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          </div>
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {currentStep === 5 && (
              <div>
                <h2 className="text-xl font-semibold text-center text-neutral-900 mb-2">
                  When do you like to practice?
                </h2>
                <p className="text-sm text-center text-neutral-500 mb-6">
                  We'll send you reminders at the perfect time
                </p>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-3">
                      Preferred Practice Time
                    </label>
                    <div className="grid grid-cols-1 gap-2">
                      {timeOptions.map((time) => (
                        <button
                          key={time}
                          type="button"
                          onClick={() => setOnboardingData(prev => ({ ...prev, practiceTime: time }))}
                          className={`p-3 rounded-lg border text-left transition-all duration-200 text-sm ${
                            onboardingData.practiceTime === time
                              ? 'border-black bg-black/5'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          {time}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-3">
                      Session Duration
                    </label>
                    <div className="grid grid-cols-1 gap-2">
                      {durationOptions.map((duration) => (
                        <button
                          key={duration}
                          type="button"
                          onClick={() => setOnboardingData(prev => ({ ...prev, sessionDuration: duration }))}
                          className={`p-3 rounded-lg border text-left transition-all duration-200 text-sm ${
                            onboardingData.sessionDuration === duration
                              ? 'border-black bg-black/5'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          {duration}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-xl px-4 py-3"
              >
                {error}
              </motion.div>
            )}

            <div className="flex items-center justify-between pt-6">
              {currentStep > 1 && (
                <button
                  type="button"
                  onClick={handlePrevStep}
                  className="px-6 py-3 text-gray-600 hover:text-gray-800 font-medium transition-colors"
                >
                  ← Back
                </button>
              )}
              
              <div className="flex-1"></div>

              {currentStep < 5 ? (
                <button
                  type="button"
                  onClick={handleNextStep}
                  disabled={
                    (currentStep === 1 && (!onboardingData.fullName || !onboardingData.email || !onboardingData.password)) ||
                    (currentStep === 2 && onboardingData.goals.length === 0) ||
                    (currentStep === 3 && onboardingData.classInterests.length === 0) ||
                    (currentStep === 4 && !onboardingData.experienceLevel)
                  }
                  className="bg-black text-white px-8 py-3 rounded-xl font-medium hover:bg-gray-800 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Continue →
                </button>
              ) : (
                <form onSubmit={handleCompleteOnboarding} className="inline">
                  <button
                    type="submit"
                    disabled={isSubmitting || !onboardingData.practiceTime || !onboardingData.sessionDuration}
                    className="bg-black text-white px-8 py-3 rounded-xl font-medium hover:bg-gray-800 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? "Creating Account..." : "Complete Setup"}
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default JoinForm;