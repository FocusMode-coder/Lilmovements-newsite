'use client';

import Link from 'next/link';
import FadeInSection from '@/components/FadeInSection';

export default function FreeClassPage() {
  return (
    <div className="bg-lmBg min-h-screen">
      {/* Header spacing */}
      <div className="h-20"></div>

      <div className="max-w-5xl mx-auto px-6 py-16">
        <FadeInSection>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif leading-tight text-lmInk text-center mb-6">
            Free Full Class
          </h1>
          
          <p className="text-lg md:text-xl text-lmMuted leading-relaxed text-center max-w-3xl mx-auto mb-12">
            A 30-minute guided movement experience
          </p>
        </FadeInSection>

        <FadeInSection delay={100}>
          <div className="w-full max-w-4xl mx-auto">
            <video
              className="w-full rounded-lg shadow-2xl"
              controls
              preload="metadata"
            >
              <source src="/assets/fullclassLilmovementsCompressed.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </FadeInSection>

        <FadeInSection delay={150}>
          <div className="mt-12 flex justify-center">
            <Link 
              href="/"
              className="px-8 py-3 border-2 border-lmInk/20 text-lmInk rounded-full hover:border-lmInk/40 hover:bg-lmInk/5 transition-all duration-300 text-lg font-medium"
            >
              Back to Home
            </Link>
          </div>
        </FadeInSection>
      </div>
    </div>
  );
}
