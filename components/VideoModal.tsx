'use client';

import { useEffect, useState } from 'react';

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  src: string;
  title?: string;
}

export default function VideoModal({ isOpen, onClose, src, title }: VideoModalProps) {
  const [videoError, setVideoError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Handle escape key press to close modal
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      // Prevent body scroll when modal is open
      document.body.style.overflow = 'hidden';
      // Reset states when modal opens
      setVideoError(false);
      setIsLoading(true);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  // Handle backdrop click to close modal
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  // Fallback content when video fails to load
  const VideoFallback = () => (
    <div className="w-full bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 flex items-center justify-center" style={{ aspectRatio: '9/16', minHeight: '500px' }}>
      <div className="text-center text-white p-8">
        <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6 backdrop-blur-sm">
          <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
          </svg>
        </div>
        <h3 className="text-2xl font-semibold mb-4">{title || 'Video Preview'}</h3>
        <p className="text-white/80 mb-6 leading-relaxed">This video is currently being optimized for the best viewing experience.</p>
        <div className="text-sm text-white/60">
          <p>Full videos are available with membership access.</p>
          <button 
            onClick={onClose}
            className="mt-4 bg-white/20 hover:bg-white/30 px-6 py-2 rounded-lg transition-all duration-200"
          >
            Close Preview
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-label={title || "Video modal"}
    >
      {/* Video Container */}
      <div className="relative w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl mx-4 rounded-2xl bg-black overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-300">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-black/50 backdrop-blur-md border border-white/20 
                     flex items-center justify-center text-white hover:bg-black/70 
                     transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white/50"
          aria-label="Close video"
        >
          <svg 
            className="w-5 h-5" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M6 18L18 6M6 6l12 12" 
            />
          </svg>
        </button>

        {/* Loading State */}
        {isLoading && !videoError && (
          <div className="w-full bg-gray-900 flex items-center justify-center" style={{ aspectRatio: '9/16', minHeight: '500px' }}>
            <div className="text-center text-white">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
              <p>Loading video...</p>
            </div>
          </div>
        )}

        {/* Video Element or Fallback */}
        <div className="relative w-full flex items-center justify-center bg-black rounded-2xl">
          {videoError ? (
            <VideoFallback />
          ) : (
            <video
              controls
              autoPlay
              playsInline
              muted
              className="w-full max-w-full max-h-[85vh] object-contain rounded-2xl"
              onLoadedData={() => setIsLoading(false)}
              onError={() => {
                console.warn('Video failed to load:', src);
                setVideoError(true);
                setIsLoading(false);
              }}
              style={{
                aspectRatio: '9/16',
                maxHeight: '85vh',
                maxWidth: '100%'
              }}
            >
              <source src={src} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          )}
        </div>

        {/* Optional Title - only show if video loads successfully */}
        {title && !videoError && !isLoading && (
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
            <h3 className="text-white text-lg font-medium">{title}</h3>
          </div>
        )}
      </div>
    </div>
  );
}