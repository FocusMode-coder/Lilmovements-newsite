'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function VideoPreviewPage() {
  const [isPlaying, setIsPlaying] = useState(false);

  const videos = [
    {
      id: 'drone',
      title: 'Drone Shot',
      src: '/assets/dronshot.mp4',
      description: 'Aerial view drone footage',
      type: 'video'
    },
    {
      id: 'fullclass',
      title: 'Full Class',
      src: 'https://www.youtube.com/embed/CPegMkl79EU?modestbranding=1&rel=0&showinfo=0&iv_load_policy=3&cc_load_policy=0&fs=1&color=white&controls=1&disablekb=1&playsinline=1&widget_referrer=https%3A%2F%2Flilmovements.onrender.com',
      description: 'Complete class recording (YouTube Unlisted)',
      type: 'youtube'
    },
    {
      id: 'howgotstarted',
      title: 'How I Got Started',
      src: '/assets/howgotstarted.mp4',
      description: 'Origin story',
      type: 'video'
    },
    {
      id: 'interview',
      title: 'Lily Interview',
      src: '/assets/Lilinteview.mp4',
      description: 'Interview with Lily',
      type: 'video'
    }
  ];

  return (
    <div className="min-h-screen bg-lmBg py-12 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <Link 
            href="/"
            className="inline-flex items-center text-lmInk hover:text-lmAccent transition-colors mb-6"
          >
            ← Back to Home
          </Link>
          <h1 className="text-4xl font-serif text-lmInk mb-4">
            Video Preview & Testing
          </h1>
          <p className="text-lg text-lmMuted">
            Preview and confirm all video assets with full playback controls
          </p>
        </div>

        {/* Video Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {videos.map((video) => (
            <div 
              key={video.id}
              className="bg-white rounded-2xl shadow-sm overflow-hidden border border-lmBorder"
            >
              {/* Video Player */}
              <div className="relative bg-black" style={{ aspectRatio: '16/9' }}>
                {video.type === 'youtube' ? (
                  <iframe
                    src={video.src}
                    title={video.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full"
                  />
                ) : (
                  <video
                    controls
                    preload="metadata"
                    playsInline
                    className="w-full h-full"
                    onPlay={() => setIsPlaying(true)}
                    onPause={() => setIsPlaying(false)}
                  >
                    <source src={video.src} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                )}
              </div>

              {/* Video Info */}
              <div className="p-6">
                <h3 className="text-xl font-semibold text-lmInk mb-2">
                  {video.title}
                </h3>
                <p className="text-lmMuted mb-4">
                  {video.description}
                </p>
                <div className="flex items-center gap-4 text-sm text-lmMuted">
                  <span className="font-mono bg-lmBg2 px-3 py-1 rounded text-xs break-all">
                    {video.src}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Status Info */}
        <div className="mt-12 bg-white rounded-2xl shadow-sm border border-lmBorder p-8">
          <h2 className="text-2xl font-semibold text-lmInk mb-4">
            Video Implementation Status
          </h2>
          
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <span className="text-green-600 font-bold text-xl">✓</span>
              <div>
                <p className="font-semibold text-lmInk">Homepage Implementation</p>
                <p className="text-lmMuted">Drone video is live on homepage with autoplay/loop</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <span className="text-green-600 font-bold text-xl">✓</span>
              <div>
                <p className="font-semibold text-lmInk">Full Class Video</p>
                <p className="text-lmMuted">Now hosted on YouTube (Unlisted) for reliable streaming on Render</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <span className="text-green-600 font-bold text-xl">✓</span>
              <div>
                <p className="font-semibold text-lmInk">Full Playback Controls</p>
                <p className="text-lmMuted">This preview page provides complete video controls for testing</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <span className="text-green-600 font-bold text-xl">✓</span>
              <div>
                <p className="font-semibold text-lmInk">Production Ready</p>
                <p className="text-lmMuted">All videos are optimized and ready for Render deployment</p>
              </div>
            </div>
          </div>

          <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-sm text-blue-900">
              <strong>Note:</strong> The full class video is now hosted on YouTube (Unlisted) to avoid file size limitations on Render. 
              Other videos are served from <code className="bg-blue-100 px-2 py-1 rounded">/public/assets/</code>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
