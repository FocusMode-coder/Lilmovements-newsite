'use client';

import Link from 'next/link';

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

export default function DronePage() {
  const embedUrl = convertYouTubeToEmbed(YOUTUBE_LONG_URL);

  return (
    <div className="min-h-screen bg-lmBg py-12 px-6">
      <div className="max-w-5xl mx-auto">
        {/* Back Link */}
        <div className="mb-8">
          <Link 
            href="/"
            className="inline-flex items-center text-lmInk hover:text-lmInk/70 transition-colors"
          >
            ← Back to Home
          </Link>
        </div>

        {/* Drone Preview Section */}
        <section className="mb-12">
          <h1 className="text-3xl md:text-4xl font-serif text-lmInk mb-6">
            Drone Preview
          </h1>
          
          <div className="mb-4">
            <video
              src="/videos/drone.mp4"
              controls
              playsInline
              preload="metadata"
              className="w-full max-w-[900px] mx-auto rounded-2xl shadow-lg"
              style={{ maxWidth: '900px' }}
            >
              Your browser does not support the video tag.
            </video>
          </div>
          
          <div className="text-center text-sm text-lmMuted mt-4">
            <p>
              If the player doesn&apos;t load, 
              <a 
                href="/videos/drone.mp4" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-lmInk hover:underline ml-1"
              >
                open the file directly: /videos/drone.mp4
              </a>
            </p>
          </div>
        </section>

        {/* YouTube Long-form Section */}
        {embedUrl ? (
          <section>
            <h2 className="text-2xl md:text-3xl font-serif text-lmInk mb-6">
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
          </section>
        ) : (
          <div className="text-center text-sm text-lmMuted py-8">
            <p>No YouTube video configured yet.</p>
            <p className="mt-2 text-xs">Set NEXT_PUBLIC_YOUTUBE_LONG_URL to display an embedded video here.</p>
          </div>
        )}
      </div>
    </div>
  );
}
