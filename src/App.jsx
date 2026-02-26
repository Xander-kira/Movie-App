import { useState } from 'react'
import React from "react";
import MovieApp from "./Components/MovieApps";
import TopRatedMovies from "./Components/TopRatedMovie";
import Watchlist from "./Components/Watchlist";
import ThemeToggle from "./Components/ThemeToggle";
import SplashScreen from "./Components/SplashScreen";
import './App.css'
import './styles/theme.css'

function App() {
  const [activeTab, setActiveTab] = useState('popular');

  return (
    <>
      <SplashScreen />
      {/* Navigation Tabs */}
      <nav className="sticky top-0 z-40 bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 backdrop-blur-md border-b border-gradient-to-r from-cyan-500/20 via-purple-500/20 to-blue-500/20 shadow-xl">
        <div className="flex justify-center gap-3 p-5 flex-wrap items-center max-w-7xl mx-auto">
          <button
            onClick={() => setActiveTab('popular')}
            className={`px-6 py-3 rounded-xl font-bold font-display transition-all duration-300 text-sm md:text-base flex items-center gap-2 transform ${
              activeTab === 'popular'
                ? 'bg-gradient-to-r from-emerald-600 to-emerald-500 text-white shadow-lg shadow-emerald-500/40 scale-105'
                : 'bg-slate-700/50 backdrop-blur text-slate-300 hover:bg-slate-600/70 hover:text-white'
            }`}
          >
            <span>🍿</span> Popular
          </button>
          <button
            onClick={() => setActiveTab('toprated')}
            className={`px-6 py-3 rounded-xl font-bold font-display transition-all duration-300 text-sm md:text-base flex items-center gap-2 transform ${
              activeTab === 'toprated'
                ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg shadow-amber-500/40 scale-105'
                : 'bg-slate-700/50 backdrop-blur text-slate-300 hover:bg-slate-600/70 hover:text-white'
            }`}
          >
            <span>⭐</span> Top Rated
          </button>
          <button
            onClick={() => setActiveTab('watchlist')}
            className={`px-6 py-3 rounded-xl font-bold font-display transition-all duration-300 text-sm md:text-base flex items-center gap-2 transform ${
              activeTab === 'watchlist'
                ? 'bg-gradient-to-r from-rose-600 to-red-500 text-white shadow-lg shadow-rose-500/40 scale-105'
                : 'bg-slate-700/50 backdrop-blur text-slate-300 hover:bg-slate-600/70 hover:text-white'
            }`}
          >
            <span>❤️</span> Watchlist
          </button>
          <div className="flex-grow"></div>
          <ThemeToggle />
        </div>
      </nav>

      {/* Content */}
      {activeTab === 'popular' && <MovieApp />}
      {activeTab === 'toprated' && <TopRatedMovies />}
      {activeTab === 'watchlist' && <Watchlist />}
    </>
  )
}

export default App
