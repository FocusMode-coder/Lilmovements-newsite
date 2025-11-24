'use client';

import Hero from '@/components/Hero';
import { motion } from 'framer-motion';
import { ContactForm } from '@/components/ContactForm';
import VideoModal from '@/components/VideoModal';
import { useState } from 'react';
import Link from 'next/link';

export default function Home() {
  const [videoModal, setVideoModal] = useState<string | null>(null);

  // Fast, subtle fade-in - content appears quickly
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

  // Quick staggered animations with minimal delay
  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
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

  // Video configuration with working sample videos or elegant placeholders
  const videoConfig = {
    background: {
      // Using a sample video that should work, with fallback
      src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
      fallback: true
    },
    classes: [
      {
        title: "Contemporary Flow",
        description: "Fluid movements that connect mind, body, and spirit",
        // Using working sample videos for now
        video: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4"
      },
      {
        title: "Mindful Movement", 
        description: "Gentle practices focused on awareness and presence",
        video: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4"
      },
      {
        title: "Expressive Dance",
        description: "Freedom of expression through creative movement",
        video: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4"
      }
    ],
    testimonials: [
      {
        video: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
        name: "Sarah M.",
        title: "Student since 2022"
      },
      {
        video: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
        name: "Maria L.",
        title: "Student since 2021"
      }
    ],
    story: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4"
  };

  // Enhanced Video placeholder component
  const VideoPlaceholder = ({ title, description, className = "" }: { title: string, description?: string, className?: string }) => (
    <div className={`bg-gradient-to-br from-purple-900 via-gray-900 to-purple-900 flex items-center justify-center relative overflow-hidden ${className}`}>
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 via-pink-600/20 to-blue-600/20 animate-pulse"></div>
      
      {/* Content */}
      <div className="relative z-10 text-center text-white p-8">
        <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 backdrop-blur-sm animate-pulse">
          <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
          </svg>
        </div>
        <h3 className="text-lg font-semibold mb-2">{title}</h3>
        <p className="text-sm text-white/80">{description || "Coming Soon"}</p>
        <div className="mt-4 text-xs text-white/60">
          <p>Upload your videos to /public/assets/ to see them here</p>
        </div>
      </div>
    </div>
  );

  // Enhanced Background video component with working fallback
  const BackgroundVideo = () => (
    <div className="absolute inset-0 z-0">
      {/* Beautiful animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-gray-900 to-purple-900">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/30 via-pink-600/30 to-blue-600/30 animate-pulse"></div>
        
        {/* Particle effects */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-white/40 rounded-full animate-ping"></div>
          <div className="absolute top-3/4 right-1/4 w-1 h-1 bg-white/60 rounded-full animate-ping animation-delay-1000"></div>
          <div className="absolute bottom-1/4 left-1/2 w-1.5 h-1.5 bg-white/50 rounded-full animate-ping animation-delay-2000"></div>
          <div className="absolute top-1/2 left-1/3 w-1 h-1 bg-white/30 rounded-full animate-ping animation-delay-1000"></div>
          <div className="absolute bottom-1/3 right-1/3 w-2 h-2 bg-white/20 rounded-full animate-ping animation-delay-2000"></div>
        </div>
      </div>
      
      {/* Try to load background video with working URL */}
      <video
        autoPlay
        loop
        muted
        playsInline
        preload="none"
        className="absolute inset-0 w-full h-full object-cover opacity-0"
        style={{
          filter: 'brightness(0.4) saturate(0.8)',
        }}
        onLoadedData={(e) => {
          e.currentTarget.style.opacity = '0.7';
        }}
        onError={(e) => {
          console.log('Background video failed to load, using gradient fallback');
          e.currentTarget.style.display = 'none';
        }}
      >
        <source src={videoConfig.background.src} type="video/mp4" />
      </video>
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/70"></div>
    </div>
  );

  return (
    <div className="bg-white">
      <Hero />

      {/* Classes Preview with Enhanced Background */}    
      <motion.section
        initial="hidden" 
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={fadeInUp}
        className="relative py-20 px-6 overflow-hidden"
      >
        <BackgroundVideo />

        <div className="relative z-10 max-w-6xl mx-auto">
          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={fadeInUp}
            className="text-4xl md:text-5xl font-bold text-center mb-16 text-white drop-shadow-2xl"
          >
            Movement Classes
          </motion.h2>
          
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="grid md:grid-cols-3 gap-8"
          >
            {videoConfig.classes.map((classItem, index) => (
              <motion.div
                key={classItem.title}
                variants={staggerItem}
                style={{
                  background: 'rgba(255, 255, 255, 0.08)',
                  backdropFilter: 'blur(20px)',
                  WebkitBackdropFilter: 'blur(20px)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
                }}
                className="rounded-2xl overflow-hidden hover:shadow-3xl transition-all duration-300 transform hover:scale-[1.02] group hover:bg-white/12"
              >
                <div className="relative overflow-hidden">
                  {/* Video container with working URLs */}
                  <div className="relative w-full overflow-hidden bg-gray-900/20 backdrop-blur-sm" style={{ aspectRatio: '16/9', maxHeight: '300px' }}>
                    <video
                      src={classItem.video}
                      className="w-full h-full object-cover cursor-pointer transition-all duration-500 group-hover:scale-105 opacity-0"
                      muted
                      loop
                      playsInline
                      preload="metadata"
                      onLoadedData={(e) => {
                        e.currentTarget.currentTime = 1;
                        e.currentTarget.style.opacity = '1';
                      }}
                      onError={(e) => {
                        console.log(`Video ${classItem.title} failed to load`);
                        e.currentTarget.style.display = 'none';
                        const placeholder = e.currentTarget.nextElementSibling as HTMLElement;
                        if (placeholder) placeholder.style.display = 'flex';
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.play();
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.pause();
                      }}
                      onClick={() => setVideoModal(classItem.video)}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover'
                      }}
                    />
                    
                    {/* Enhanced placeholder */}
                    <VideoPlaceholder 
                      title={classItem.title}
                      description={classItem.description}
                      className="absolute inset-0 hidden"
                    />
                    
                    {/* Overlay elements */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/30 group-hover:from-black/30 transition-all duration-300" />
                    
                    {/* Play indicator */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                      <div 
                        style={{
                          background: 'rgba(255, 255, 255, 0.15)',
                          backdropFilter: 'blur(10px)',
                          WebkitBackdropFilter: 'blur(10px)',
                          border: '1px solid rgba(255, 255, 255, 0.3)'
                        }}
                        className="rounded-full p-4 transform scale-75 group-hover:scale-100 transition-transform duration-300"
                      >
                        <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z"/>
                        </svg>
                      </div>
                    </div>
                    
                    {/* Preview badge */}
                    <div 
                      style={{
                        background: 'rgba(0, 0, 0, 0.4)',
                        backdropFilter: 'blur(10px)',
                        WebkitBackdropFilter: 'blur(10px)',
                        border: '1px solid rgba(255, 255, 255, 0.3)'
                      }}
                      className="absolute top-3 left-3 text-white text-xs px-3 py-1.5 rounded-full font-medium"
                    >
                      Preview
                    </div>
                  </div>
                </div>
                
                <div 
                  style={{
                    background: 'rgba(255, 255, 255, 0.05)',
                    backdropFilter: 'blur(20px)',
                    WebkitBackdropFilter: 'blur(20px)'
                  }}
                  className="p-6"
                >
                  <h3 className="text-xl font-bold mb-3 text-white group-hover:text-white/90 transition-colors duration-200 drop-shadow-lg">
                    {classItem.title}
                  </h3>
                  <p className="text-white/80 mb-4 text-sm leading-relaxed drop-shadow">
                    {classItem.description}
                  </p>
                  <button
                    onClick={() => setVideoModal(classItem.video)}
                    className="text-white font-semibold hover:text-white/80 transition-colors duration-200 text-sm flex items-center space-x-2 group/button drop-shadow"
                  >
                    <span>Watch Preview</span>
                    <svg className="w-4 h-4 transform group-hover/button:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </button>
                  
                  <div className="mt-4 pt-4" style={{ borderTop: '1px solid rgba(255, 255, 255, 0.2)' }}>
                    <p className="text-xs text-white/60 mb-2 drop-shadow">
                      Full class available with membership
                    </p>
                    <Link
                      href="/join"
                      style={{
                        background: 'rgba(255, 255, 255, 0.12)',
                        backdropFilter: 'blur(10px)',
                        WebkitBackdropFilter: 'blur(10px)',
                        border: '1px solid rgba(255, 255, 255, 0.3)'
                      }}
                      className="inline-block text-white text-xs px-4 py-2 rounded-lg font-medium hover:bg-white/20 transition-all duration-200"
                    >
                      Join Now
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
          
          {/* Membership CTA */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={fadeInUp}
            className="mt-16 text-center"
          >
            <div 
              style={{
                background: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(25px)',
                WebkitBackdropFilter: 'blur(25px)',
                border: '1px solid rgba(255, 255, 255, 0.25)',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
              }}
              className="rounded-3xl p-8 max-w-2xl mx-auto transition-all duration-300 hover:bg-white/15"
            >
              <h3 className="text-2xl font-bold text-white mb-4 drop-shadow-xl">
                Ready for the Full Experience?
              </h3>
              <p className="text-white/90 mb-6 leading-relaxed drop-shadow-lg">
                These are just previews of our movement classes. Join our membership to access full-length sessions, 
                exclusive content, and connect with our community of mindful movers.
              </p>
              <Link
                href="/join"
                style={{
                  background: 'rgba(255, 255, 255, 0.15)',
                  backdropFilter: 'blur(15px)',
                  WebkitBackdropFilter: 'blur(15px)',
                  border: '1px solid rgba(255, 255, 255, 0.4)',
                  boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.2)'
                }}
                className="text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white/25 transition-all duration-300 transform hover:scale-105 inline-block drop-shadow-xl"
              >
                Become a Member
              </Link>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Testimonials with Working Videos */}
      <motion.section
        initial="hidden"
        whileInView="visible" 
        viewport={{ once: true, amount: 0.1 }}
        variants={fadeInUp}
        className="py-20 px-6 bg-white"
      >
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={fadeInUp}
            className="text-4xl md:text-5xl font-bold text-center mb-16 text-gray-900"
          >
            What Students Say
          </motion.h2>
          
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="grid md:grid-cols-2 gap-8"
          >
            {videoConfig.testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                variants={staggerItem}
                className="bg-gray-50 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-200 group"
              >
                {/* Testimonial video */}
                <div className="relative overflow-hidden bg-gray-900" style={{ aspectRatio: '16/9', maxHeight: '300px' }}>
                  <video
                    src={testimonial.video}
                    className="w-full h-full object-cover cursor-pointer transition-all duration-300 group-hover:scale-105 opacity-0"
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    onLoadedData={(e) => {
                      e.currentTarget.currentTime = 1;
                      e.currentTarget.style.opacity = '1';
                    }}
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                      const placeholder = e.currentTarget.nextElementSibling as HTMLElement;
                      if (placeholder) placeholder.style.display = 'flex';
                    }}
                    onMouseEnter={(e) => e.currentTarget.play()}
                    onMouseLeave={(e) => e.currentTarget.pause()}
                    onClick={() => setVideoModal(testimonial.video)}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover'
                    }}
                  />
                  
                  <VideoPlaceholder 
                    title={testimonial.name}
                    description="Student Testimonial"
                    className="absolute inset-0 hidden"
                  />
                  
                  {/* Play overlay */}
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all duration-300 flex items-center justify-center">
                    <div className="bg-white/20 backdrop-blur-sm rounded-full p-3 opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300">
                      <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z"/>
                      </svg>
                    </div>
                  </div>
                  
                  <div className="absolute top-3 left-3 bg-black/70 backdrop-blur-sm text-white text-xs px-3 py-1.5 rounded-full font-medium border border-white/20">
                    Testimonial
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="font-bold text-gray-900 text-lg">{testimonial.name}</h3>
                  <p className="text-gray-600 text-sm">{testimonial.title}</p>
                  <button
                    onClick={() => setVideoModal(testimonial.video)}
                    className="mt-3 text-gray-900 font-medium hover:text-gray-700 transition-colors duration-200 text-sm flex items-center space-x-2"
                  >
                    <span>Watch Story</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h1m4 0h1m-6-8h8a2 2 0 012 2v8a2 2 0 01-2 2H8a2 2 0 01-2-2V8a2 2 0 012-2z" />
                    </svg>
                  </button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Meet Lily Section */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={fadeInUp}
        className="py-20 px-6 bg-gray-50"
      >
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
            >
              <motion.h2
                variants={staggerItem}
                className="text-4xl md:text-5xl font-bold mb-6 text-gray-900"
              >
                Meet Lily
              </motion.h2>
              <motion.p
                variants={staggerItem}
                className="text-lg text-gray-700 mb-6 leading-relaxed"
              >
                With over a decade of experience in dance and movement therapy, 
                Lily has helped thousands discover their inner strength through the power of movement.
              </motion.p>
              <motion.p
                variants={staggerItem}
                className="text-lg text-gray-700 mb-8 leading-relaxed"
              >
                Her unique approach combines contemporary dance, mindfulness, and personal growth 
                to create transformative experiences for students of all levels.
              </motion.p>
              <motion.button
                variants={staggerItem}
                onClick={() => setVideoModal(videoConfig.story)}
                className="bg-gray-900 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-800 transition-all duration-200 transform hover:scale-105 shadow-lg"
              >
                Watch Her Story
              </motion.button>
            </motion.div>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              variants={fadeInUp}
              className="relative"
            >
              <img
                src="/assets/Lily_BIO_picture.png"
                alt="Lily"
                className="w-full rounded-2xl shadow-2xl"
                onError={(e) => {
                  const target = e.currentTarget;
                  target.style.display = 'none';
                  const placeholder = document.createElement('div');
                  placeholder.className = 'w-full h-96 bg-gradient-to-br from-purple-200 to-pink-200 rounded-2xl shadow-2xl flex items-center justify-center';
                  placeholder.innerHTML = '<div class="text-center text-gray-600"><div class="text-4xl mb-4">👩‍🎨</div><p>Lily\'s Photo</p><p class="text-sm">Upload to /public/assets/Lily_BIO_picture.png</p></div>';
                  target.parentNode?.appendChild(placeholder);
                }}
              />
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Contact Section */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={fadeInUp}
        className="py-20 px-6 bg-gray-900 text-white"
      >
        <div className="max-w-4xl mx-auto">
          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={fadeInUp}
            className="text-4xl md:text-5xl font-bold text-center mb-16"
          >
            Start Your Journey
          </motion.h2>
          
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={fadeInUp}
            className="max-w-2xl mx-auto"
          >
            <ContactForm />
          </motion.div>
        </div>
      </motion.section>

      {/* Video Modal */}
      {videoModal && (
        <VideoModal
          isOpen={!!videoModal}
          onClose={() => setVideoModal(null)}
          src={videoModal}
        />
      )}
    </div>
  );
}