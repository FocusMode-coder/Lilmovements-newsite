'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import FadeInSection from '@/components/FadeInSection';

const YOUTUBE_LONG_URL = process.env.NEXT_PUBLIC_YOUTUBE_LONG_URL || '';

function convertYouTubeToEmbed(url: string): string {
  if (!url) return '';
  
  // Handle youtu.be links
  if (url.includes('youtu.be/')) {
    const videoId = url.split('youtu.be/')[1]?.split('?')[0];
    return `https://www.youtube.com/embed/${videoId}`;
  }
  
  // Handle youtube.com/watch?v= links
  if (url.includes('youtube.com/watch?v=')) {
    const urlObj = new URL(url);
    const videoId = urlObj.searchParams.get('v');
    return `https://www.youtube.com/embed/${videoId}`;
  }
  
  // Already an embed URL
  if (url.includes('youtube.com/embed/')) {
    return url;
  }
  
  return url;
}

export default function Home() {
  const embedUrl = convertYouTubeToEmbed(YOUTUBE_LONG_URL);

  return (
    <div className="bg-lmBg">
      {/* Hero Logo - Big logo displayed once */}
      <section className="pt-10 pb-8 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="relative w-full h-[240px] sm:h-[300px] md:h-[380px] lg:h-[440px] flex items-center justify-center perspective-[1200px]">
            <div className="relative w-full h-full transform-gpu transition-all duration-700 hover:scale-105 preserve-3d">
              <Image
                src="/assets/Lil Movements (LOGO).png"
                alt="Lil Movements"
                fill
                className="object-contain scale-[1.08] md:scale-[1.12] drop-shadow-[0_8px_32px_rgba(0,0,0,0.12)] transition-all duration-700"
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1280px) 1280px, 1280px"
                style={{
                  filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.08)) drop-shadow(0 12px 40px rgba(0,0,0,0.06))'
                }}
              />
            </div>
          </div>
          
          {/* Extracted signature - rendered once below logo */}
          <div className="mt-6 flex justify-center">
            <img 
              src="/assets/lil-signature.png" 
              alt="" 
              aria-hidden="true" 
              className="w-[240px] sm:w-[280px] md:w-[320px] h-auto opacity-85 transition-all duration-500 hover:opacity-100 hover:scale-105"
            />
          </div>
        </div>
      </section>

      {/* Hero Text */}
      <section className="pt-4 pb-16 px-6">
        <div className="max-w-4xl mx-auto">
          <FadeInSection>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif leading-tight text-lmInk text-center mb-10">
              A gentle return to the body, guided by movement.
            </h1>
          </FadeInSection>

          <FadeInSection delay={100}>
            <p className="text-lg md:text-xl text-lmMuted leading-relaxed text-center max-w-3xl mx-auto">
              A soulful blend of meditation, Qigong, intuitive dance, and yoga-inspired stretching.
            </p>
            <p className="text-lg md:text-xl text-lmMuted leading-relaxed text-center max-w-3xl mx-auto mt-4">
              Guided by Lily Hahn Shining, Lil Movements invites you to slow down, listen inward, and move with intention. Each class creates space to release what no longer serves and reconnect with your natural rhythm.
            </p>
            <p className="text-lg md:text-xl text-lmMuted leading-relaxed text-center max-w-3xl mx-auto mt-4">
              Presence matters more than performance. Through <em className="italic">small, intentional movements</em>, the practice opens pathways to clarity, grounding, and connection.
            </p>
          </FadeInSection>

          <FadeInSection delay={150}>
            <div className="mt-10 flex justify-center">
              <Link 
                href="/free-class"
                className="px-8 py-3 border-2 border-lmInk/20 text-lmInk rounded-full hover:border-lmInk/40 hover:bg-lmInk/5 transition-all duration-300 text-lg font-medium"
              >
                Free Class
              </Link>
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* Drone Video - Looping Background (NO controls, NO title) */}
      <section className="pb-20 px-6">
        <div className="max-w-4xl mx-auto">
          <FadeInSection delay={150}>
            <div className="rounded-2xl overflow-hidden" style={{ aspectRatio: '16/9' }}>
              <video
                src="/videos/drone.mp4"
                autoPlay
                loop
                muted
                playsInline
                preload="auto"
                disablePictureInPicture
                controlsList="nodownload noplaybackrate noremoteplayback"
                aria-hidden="true"
                className="w-full h-full object-cover videoLoopHero"
              />
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* YouTube Long-form Section (if configured) */}
      {embedUrl && (
        <section className="pb-20 px-6">
          <div className="max-w-4xl mx-auto">
            <FadeInSection delay={200}>
              <h2 className="text-3xl md:text-4xl font-serif text-lmInk mb-6 text-center">
                Featured Video
              </h2>
              <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                <iframe
                  src={embedUrl}
                  title="Featured YouTube Video"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="absolute top-0 left-0 w-full h-full rounded-2xl shadow-lg"
                />
              </div>
            </FadeInSection>
          </div>
        </section>
      )}

      {/* Classes Section */}
      <section id="classes" className="py-20 px-6 bg-lmBg2">
        <div className="max-w-4xl mx-auto">
          <FadeInSection>
            <h2 className="text-3xl md:text-4xl font-serif text-lmInk mb-12">
              Classes
            </h2>
          </FadeInSection>
          
          <div className="space-y-12">
            <FadeInSection delay={100}>
              <div className="space-y-3">
                <h3 className="text-2xl font-semibold text-lmInk">Group Classes</h3>
                <p className="text-lg text-lmMuted leading-relaxed">
                  Join weekly sessions at select locations in Santa Barbara. 
                  Each class blends meditation, Qigong, intuitive dance, and yoga inspired stretching 
                  to create a practice that grounds the body and awakens your inner rhythm.
                </p>
              </div>
            </FadeInSection>
            
            <FadeInSection delay={150}>
              <div className="lm-divider"></div>
            </FadeInSection>
            
            <FadeInSection delay={200}>
              <div className="space-y-3">
                <h3 className="text-2xl font-semibold text-lmInk">Private Sessions</h3>
                <p className="text-lg text-lmMuted leading-relaxed">
                  One on one movement sessions tailored to your needs. 
                  Work directly with Lillian to develop a personal practice that honors your body and supports your journey.
                </p>
              </div>
            </FadeInSection>
            
            <FadeInSection delay={250}>
              <div className="lm-divider"></div>
            </FadeInSection>
            
            <FadeInSection delay={300}>
              <div className="space-y-3">
                <h3 className="text-2xl font-semibold text-lmInk">Workshops</h3>
                <p className="text-lg text-lmMuted leading-relaxed">
                  Special events and extended practices throughout the year. 
                  Deepen your connection to movement through immersive experiences that blend mindfulness and embodied awareness.
                </p>
              </div>
            </FadeInSection>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-6">
        <div className="max-w-3xl mx-auto">
          <FadeInSection>
            <h2 className="text-3xl md:text-4xl font-serif text-lmInk mb-12 text-center">
              Get in Touch
            </h2>
          </FadeInSection>
          
          <FadeInSection delay={100}>
            <ContactFormMinimal />
          </FadeInSection>
        </div>
      </section>
    </div>
  );
}

// Minimal Contact Form Component
function ContactFormMinimal() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: '' });

    try {
      const response = await fetch('https://formspree.io/f/mgowplke', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message
        }),
      });

      if (response.ok) {
        setSubmitStatus({
          type: 'success',
          message: 'Sent ✅'
        });
        setFormData({
          name: '',
          email: '',
          message: ''
        });
      } else {
        setSubmitStatus({
          type: 'error',
          message: 'Something went wrong. Try again.'
        });
      }
    } catch (error) {
      setSubmitStatus({
        type: 'error',
        message: 'Something went wrong. Try again.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="name" className="block text-sm font-semibold text-lmInk mb-2">
          Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          required
          className="w-full px-4 py-3 bg-white border border-lmBorder rounded-lg text-lmInk placeholder-lmMuted focus:outline-none focus:ring-2 focus:ring-lmAccent focus:border-transparent transition-all duration-200"
          placeholder="Your name"
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-semibold text-lmInk mb-2">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          required
          className="w-full px-4 py-3 bg-white border border-lmBorder rounded-lg text-lmInk placeholder-lmMuted focus:outline-none focus:ring-2 focus:ring-lmAccent focus:border-transparent transition-all duration-200"
          placeholder="your@email.com"
        />
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-semibold text-lmInk mb-2">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleInputChange}
          required
          rows={5}
          className="w-full px-4 py-3 bg-white border border-lmBorder rounded-lg text-lmInk placeholder-lmMuted focus:outline-none focus:ring-2 focus:ring-lmAccent focus:border-transparent transition-all duration-200 resize-none"
          placeholder="Tell me about your interest in movement classes"
        />
      </div>

      {submitStatus.type && (
        <div
          className={`p-4 rounded-lg ${
            submitStatus.type === 'success'
              ? 'bg-green-100 border border-green-300 text-green-800'
              : 'bg-red-100 border border-red-300 text-red-800'
          }`}
        >
          {submitStatus.message}
        </div>
      )}

      <div className="flex justify-center">
        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-lmInk text-white px-8 py-3 rounded-lg font-semibold hover:bg-opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
        >
          {isSubmitting ? 'Sending' : 'Send Message'}
        </button>
      </div>
    </form>
  );
}