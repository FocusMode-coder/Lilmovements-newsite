'use client';

import Image from "next/image";
import { motion } from "framer-motion";
import { useState } from "react";
import VideoModal from './VideoModal';
import Link from 'next/link';

export default function Hero() {
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  // Fast, subtle animations - content appears quickly
  const fadeInUp = {
    hidden: { opacity: 0, y: 10 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        duration: 0.3, 
        ease: "easeOut" 
      } 
    }
  };

  // Quick staggered reveals with minimal delay
  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0
      }
    }
  };

  const staggerItem = {
    hidden: { opacity: 0, y: 10 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        duration: 0.3, 
        ease: "easeOut" 
      } 
    }
  };

  return (
    <section className="relative py-20 lg:py-32 min-h-screen flex items-center justify-center overflow-hidden">
      
      {/* Video Background - Positioned behind everything */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover"
          style={{
            filter: 'brightness(0.95) saturate(0.9) contrast(1.05)',
          }}
        >
          <source src="/assets/Lilywhitebackground.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        
        {/* Subtle overlay to ensure content readability */}
        <div className="absolute inset-0 bg-white/10"></div>
        
        {/* Gradient overlay for better text contrast */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/5 to-white/20"></div>
      </div>

      {/* Premium Compact Join Button - Left Side */}
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 1.5 }}
        className="fixed left-6 top-1/2 -translate-y-1/2 z-40 hidden lg:block"
      >
        <Link
          href="/join"
          className="group relative overflow-hidden"
        >
          <div className="relative bg-white/90 backdrop-blur-xl rounded-full px-6 py-4 shadow-xl border border-white/60 transition-all duration-400 hover:scale-105 hover:shadow-2xl hover:bg-white/95 flex items-center space-x-3"
            style={{
              boxShadow: '0 15px 50px rgba(0,0,0,0.1), 0 8px 25px rgba(0,0,0,0.08), inset 0 1px 0 rgba(255,255,255,0.9)'
            }}
          >
            {/* Main text */}
            <div className="text-sm font-semibold text-gray-800 group-hover:text-gray-900 transition-colors duration-300">
              Join
            </div>
            
            {/* Animated arrow */}
            <div className="flex items-center space-x-0.5">
              <svg className="w-4 h-4 text-gray-600 group-hover:text-gray-800 transition-all duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </div>
            
            {/* Subtle glow effect */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            {/* Premium shimmer effect */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out"></div>
          </div>
        </Link>
      </motion.div>

      {/* Main Content Container */}
      <div className="relative z-20 container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center text-center space-y-8 max-w-4xl mx-auto"
        >
          
          {/* Logo - Enhanced glassmorphism for video background */}
          <motion.div 
            variants={staggerItem}
          >
            <div className="rounded-3xl bg-white/70 backdrop-blur-xl border border-white/80 shadow-xl p-8"
              style={{
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.8)'
              }}
            >
              <Image 
                src="/brand/lilmovements-logo.png" 
                alt="Lil Movements logo" 
                width={600} 
                height={600} 
                priority
                sizes="(max-width: 768px) 420px, 570px"
                className="relative w-auto h-auto max-w-[420px] md:max-w-[570px]"
              />
            </div>
          </motion.div>
          
          {/* Title - Enhanced glassmorphism */}
          <motion.div 
            variants={staggerItem}
            className="rounded-3xl bg-white/70 backdrop-blur-xl border border-white/80 shadow-xl px-10 py-8"
            style={{
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.8)'
            }}
          >
            <div className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight text-neutral-900 max-w-4xl leading-tight">
              <div>Move with intention.</div>
              <div>Build mindful strength.</div>
            </div>
          </motion.div>
          
          {/* Subtitle - Enhanced glassmorphism */}
          <motion.div
            variants={staggerItem}
            className="rounded-3xl bg-white/70 backdrop-blur-xl border border-white/80 shadow-xl p-8 max-w-2xl"
            style={{
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.8)'
            }}
          >
            <p className="text-lg md:text-xl text-neutral-700 leading-relaxed font-medium">
              Join Lillian Hahn Shining for transformative movement practices that blend mindfulness, 
              strength, and community in every session.
            </p>
          </motion.div>

          {/* Mobile CTA Button - Enhanced for video background */}
          <motion.div variants={staggerItem} className="lg:hidden">
            <Link
              href="/join"
              className="bg-white/90 backdrop-blur-xl border border-white/80 text-gray-900 px-8 py-4 rounded-full font-semibold text-lg hover:bg-white/95 transition-all duration-300 transform hover:scale-105 shadow-xl"
              style={{
                boxShadow: '0 20px 40px -10px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.8)'
              }}
            >
              Join
            </Link>
          </motion.div>

        </motion.div>
      </div>
      <VideoModal
        isOpen={isVideoOpen}
        onClose={() => setIsVideoOpen(false)}
        src="/assets/Lilinteview.mp4"
      />
    </section>
  );
}