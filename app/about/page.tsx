'use client';

import Image from 'next/image';
import FadeInSection from '@/components/FadeInSection';

export default function AboutPage() {
  return (
    <div className="bg-lmBg min-h-screen">
      {/* Hero Section with Photo + Bio */}
      <section className="pt-24 md:pt-32 pb-20 px-6">
        <div className="max-w-6xl mx-auto">
          {/* Desktop: 2-column grid, Mobile: stacked */}
          <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-start">
            {/* Left: Photo */}
            <FadeInSection>
              <div className="relative aspect-[3/4] w-full max-w-lg mx-auto rounded-lg overflow-hidden border border-lmBorder bg-lmBg2 shadow-lg">
                <Image
                  src="/assets/Lily_BIO_picture.png"
                  alt="Lillian Hahn Shining"
                  fill
                  priority
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </FadeInSection>

            {/* Right: Bio Text */}
            <FadeInSection delay={100}>
              <div className="space-y-8">
                <h1 className="text-4xl md:text-5xl font-serif text-lmInk">
                  About Lillian
                </h1>
                
                <div className="space-y-6 text-lg text-lmMuted leading-relaxed">
                  <p>
                    Lillian Hahn Shining brings a soulful approach to movement that honors the wisdom of the body 
                    and the power of presence. Her practice weaves together ancient traditions and intuitive expression, 
                    creating space for transformation and genuine connection.
                  </p>
                  
                  <p>
                    Beloved for her nurturing, spirit-led approach, Lily guides students to tap into their own power 
                    and release what no longer serves them. Her classes blend meditation, Qigong, intuitive dance, 
                    and yoga inspired stretching into a gently energizing practice designed to ground the body 
                    and awaken your inner rhythm.
                  </p>
                  
                  <p>
                    Accessible to all levels and all bodies, Lil Movements invites you to move with intention, 
                    reconnect with your power, and come home to yourself, one breath and one movement at a time.
                  </p>
                  
                  <p>
                    Classes are offered at select locations in Santa Barbara and beyond. 
                    Private sessions are available by request.
                  </p>
                </div>
              </div>
            </FadeInSection>
          </div>
        </div>
      </section>

      {/* Divider */}
      <section className="py-12 px-6">
        <div className="max-w-4xl mx-auto">
          <FadeInSection>
            <div className="lm-divider"></div>
          </FadeInSection>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-20 px-6 bg-lmBg2">
        <div className="max-w-4xl mx-auto">
          <FadeInSection>
            <h2 className="text-3xl md:text-4xl font-serif text-lmInk mb-8 text-center">
              Teaching Philosophy
            </h2>
          </FadeInSection>
          
          <FadeInSection delay={100}>
            <p className="text-xl md:text-2xl text-lmInk leading-relaxed text-center font-serif">
              As Lily shares, her intention is to guide you to tap into your own power and tap out what does not serve us, 
              so we can be present today and every day moving forward.
            </p>
          </FadeInSection>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-20 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <FadeInSection>
            <h2 className="text-3xl md:text-4xl font-serif text-lmInk mb-6">
              Get in Touch
            </h2>
            <p className="text-lg text-lmMuted mb-8">
              Interested in private sessions or group classes? Reach out to learn more.
            </p>
            <a
              href="/#contact"
              className="inline-block bg-lmInk text-white px-8 py-3 rounded-lg font-semibold hover:bg-opacity-90 transition-all duration-200"
            >
              Contact
            </a>
          </FadeInSection>
        </div>
      </section>
    </div>
  );
}
