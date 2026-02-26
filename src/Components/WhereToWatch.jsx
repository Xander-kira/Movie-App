import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';

export default function WhereToWatch({ movieId }) {
  const [watched, setWatched] = useState(null);
  const [loading, setLoading] = useState(false);
  const API_KEY = import.meta.env.VITE_API_KEY;

  const fetchWatchProviders = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/${movieId}/watch/providers?api_key=${API_KEY}`
      );
      const usData = response.data.results?.US;
      if (usData) {
        setWatched({
          flatrate: usData.flatrate || [],
          rent: usData.rent || [],
          buy: usData.buy || [],
          free: usData.free || [],
        });
      }
    } catch (error) {
      console.error('Error fetching watch providers:', error);
    } finally {
      setLoading(false);
    }
  }, [movieId, API_KEY]);

  useEffect(() => {
    fetchWatchProviders();
  }, [fetchWatchProviders]);

  if (loading) {
    return (
      <div className="bg-slate-800/50 backdrop-blur p-4 rounded-xl border border-slate-700">
        <p className="text-slate-400 text-sm">Loading where to watch...</p>
      </div>
    );
  }

  if (!watched || (watched.flatrate.length === 0 && watched.rent.length === 0 && watched.buy.length === 0)) {
    return (
      <div className="bg-slate-800/50 backdrop-blur p-4 rounded-xl border border-slate-700">
        <p className="text-slate-400 text-sm">Watch provider information not available</p>
      </div>
    );
  }

  const renderProviders = (providers) => (
    <div className="flex gap-2 flex-wrap">
      {providers.map((provider) => (
        <div key={provider.provider_id} className="flex items-center gap-2">
          {provider.logo_path && (
            <img
              src={`https://image.tmdb.org/t/p/original${provider.logo_path}`}
              alt={provider.provider_name}
              title={provider.provider_name}
              className="w-10 h-10 rounded-lg"
            />
          )}
        </div>
      ))}
    </div>
  );

  return (
    <div className="bg-slate-800/50 backdrop-blur p-4 rounded-xl border border-slate-700">
      <h4 className="text-lg font-bold text-white mb-4">Where to Watch</h4>
      
      {watched.flatrate && watched.flatrate.length > 0 && (
        <div className="mb-4">
          <p className="text-emerald-400 font-semibold mb-2">📺 Streaming</p>
          {renderProviders(watched.flatrate)}
        </div>
      )}

      {watched.buy && watched.buy.length > 0 && (
        <div className="mb-4">
          <p className="text-blue-400 font-semibold mb-2">🛍️ Buy</p>
          {renderProviders(watched.buy)}
        </div>
      )}

      {watched.rent && watched.rent.length > 0 && (
        <div className="mb-4">
          <p className="text-amber-400 font-semibold mb-2">🎫 Rent</p>
          {renderProviders(watched.rent)}
        </div>
      )}

      {watched.free && watched.free.length > 0 && (
        <div>
          <p className="text-green-400 font-semibold mb-2">✨ Free with Ads</p>
          {renderProviders(watched.free)}
        </div>
      )}

      <p className="text-slate-400 text-xs mt-3">*Available in US region</p>
    </div>
  );
}
