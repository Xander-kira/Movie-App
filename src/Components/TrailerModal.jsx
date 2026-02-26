import React, { useState } from 'react';

export default function TrailerModal({ trailerKey, movieTitle, isOpen, onClose }) {
  const [playbackError, setPlaybackError] = useState(false);

  if (!isOpen || !trailerKey) return null;

  const youtubeWatchUrl = `https://www.youtube.com/watch?v=${trailerKey}`;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-5xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute -top-12 right-0 text-white text-3xl font-bold hover:text-gray-300 z-10"
        >
          ✕
        </button>

        {/* Trailer Container */}
        <div className="bg-black rounded-lg overflow-hidden">
          {playbackError ? (
            /* Fallback UI */
            <div className="aspect-video bg-black flex flex-col items-center justify-center p-8">
              <div className="text-center">
                <p className="text-4xl mb-4">🎬</p>
                <p className="text-white text-xl font-bold mb-2">
                  Unable to play trailer in-app
                </p>
                <p className="text-gray-400 mb-6">
                  YouTube playback is restricted. Watch on YouTube instead.
                </p>
                <a
                  href={youtubeWatchUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-lg font-bold inline-flex items-center gap-2 transition-colors"
                >
                  ▶️ Watch on YouTube
                </a>
              </div>
            </div>
          ) : (
            /* YouTube Iframe */
            <div className="aspect-video bg-black">
              <iframe
                key={trailerKey}
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1&modestbranding=1&rel=0`}
                title={`${movieTitle} Trailer`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                frameBorder="0"
                onError={() => setPlaybackError(true)}
              ></iframe>
            </div>
          )}
        </div>

        {/* Movie Title */}
        <p className="text-white text-center mt-4 text-lg font-semibold">
          {movieTitle} - Official Trailer
        </p>

        {/* Note */}
        <p className="text-gray-400 text-center text-sm mt-2">
          💡 If video doesn't play, click "Watch on YouTube" to open in YouTube
        </p>
      </div>
    </div>
  );
}

