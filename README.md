# 🎬 ScreenFlix - Advanced Movie Discovery Platform

A modern, feature-rich movie exploration application built with React + Vite that provides an immersive cinematic experience powered by The Movie Database (TMDB) API.

## ✨ Features

### Core Features

- **🔍 Advanced Search** - Search movies by title, actor, or director
- **📊 Smart Filtering** - Filter by genre, release year, and minimum rating
- **⭐ Sorting Options** - Sort by popularity, rating, release date, or alphabetically
- **♾️ Infinite Scroll** - Seamlessly load more movies as you browse
- **🎬 Movie Details Modal** - Comprehensive movie information with cast, ratings, and trailers

### User Engagement Features

- **📺 Recently Viewed** - Auto-tracks movies you've viewed with one-click access
- **🔥 Trending This Week** - Discover what's trending on TMDB right now
- **✨ Personalized Recommendations** - Smart suggestions based on your watchlist
- **❤️ Watchlist Management** - Save movies for later viewing
- **🎥 Trailer Integration** - Watch official YouTube trailers directly in the app

### Personal Collections

- **📋 Collections/Lists** - Create custom movie lists
  - 3 Pre-made Collections: Favorites, Watched, Plan to Watch
  - Create unlimited custom collections
  - Add/remove movies with one click
- **⭐ Ratings & Reviews** - Rate movies 1-10 and write personal reviews
- **🛍️ Where to Watch** - See streaming/rental/purchase options with provider logos

### Visual & Performance

- **🌙 Modern Dark Theme** - Emerald, teal, and violet gradient aesthetic
- **📱 Fully Responsive** - Works seamlessly on mobile, tablet, and desktop
- **⚡ Fast Performance** - Optimized with Vite and React best practices
- **🎨 Smooth Animations** - Hover effects and transitions throughout

## 🛠️ Technologies Used

- **Frontend Framework**: React 18
- **Build Tool**: Vite 7
- **Styling**: Tailwind CSS
- **HTTP Client**: Axios
- **State Management**: React Context API
- **Data Persistence**: localStorage
- **API**: The Movie Database (TMDB) v3
- **Video Integration**: YouTube Embed

## 📦 Installation

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Setup Steps

1. **Clone the repository**

   ```bash
   git clone https://github.com/Xander-kira/Movie-App.git
   cd Movie-App
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Create environment file**

   Create a `.env` file in the root directory with the following variables:

   ```env
   VITE_API_KEY=your_tmdb_api_key_here
   VITE_TOP_RATED_URL=https://api.themoviedb.org/3/movie/top_rated
   ```

   Get your free API key from [The Movie Database](https://www.themoviedb.org/settings/api)

4. **Start development server**

   ```bash
   npm run dev
   ```

   The app will open at `http://localhost:5173` (or next available port)

5. **Build for production**
   ```bash
   npm run build
   ```

## 🌐 Deployment

### Deploy to Vercel

1. **Push your code to GitHub** (if not already done)

2. **Import project to Vercel**
   - Go to [Vercel Dashboard](https://vercel.com/dashboard)
   - Click **"Add New Project"**
   - Import your GitHub repository

3. **Configure Environment Variables**
   - In Vercel Dashboard → Your Project → **Settings** → **Environment Variables**
   - Add the following variables:

   | Variable Name        | Value                                          |
   | -------------------- | ---------------------------------------------- |
   | `VITE_API_KEY`       | Your TMDB API key                              |
   | `VITE_TOP_RATED_URL` | `https://api.themoviedb.org/3/movie/top_rated` |
   - Select **Production**, **Preview**, and **Development** for each variable
   - Click **Save**

4. **Deploy**
   - Vercel will automatically build and deploy
   - Any new commits to `main` branch will trigger automatic deployments

5. **Redeploy if needed**
   - Go to **Deployments** tab
   - Click three dots (•••) on latest deployment
   - Select **Redeploy**

### Deploy to Other Platforms

The app can also be deployed to:

- **Netlify** - Similar process with environment variables in Build settings
- **GitHub Pages** - Requires additional configuration for client-side routing
- **Railway** - Automatic deployment from GitHub with env vars

## 🚀 Usage

### Browsing Movies

- Click on any movie card to view detailed information
- Use search bar to find specific titles, actors, or directors
- Use filter bar to narrow down by genre, year, and rating

### Managing Your Collections

1. Open a movie's detail modal
2. Click **"Create New List"** or select existing collections
3. Add movies to your favorite lists with one click

### Rating Movies

1. Open any movie's detail modal
2. Scroll to the **Rating Component**
3. Click 1-10 stars to rate
4. Add an optional review in the textarea
5. Ratings are automatically saved

### Checking Where to Watch

1. Open any movie's detail modal
2. Scroll to **"Where to Watch"** section
3. See all available streaming, rental, and purchase options
4. Provider logos show which services offer the movie

### Discovering Content

- **Recently Viewed** appears at top of home page
- **Trending Movies** shows what's popular this week
- **Recommended For You** suggests movies based on your watchlist

## 📊 Data Persistence

All user data is saved to browser's localStorage:

- **Viewing History** - Last 50 movies viewed (cleared manually)
- **Collections** - Unlimited custom and default collections
- **Ratings** - All ratings and reviews you create
- **Watchlist** - Your personal watchlist

Data persists across sessions until you clear browser data.

## 🔐 Security

- API key is stored in `.env` file (never committed to git)
- No sensitive data is stored on external servers
- All data saved locally to your browser only

## 📱 Features by Device

### Desktop (1920px+)

- 5 movie columns with full details
- Spacious modal with 3-column layout
- Advanced filtering and sorting

### Tablet (768px - 1920px)

- 3-4 movie columns
- Optimized touch controls
- Responsive modal design

### Mobile (< 768px)

- 2 movie columns
- Full-screen friendly modal
- Touch-optimized buttons and controls

## 🎬 TMDB API Endpoints Used

- `/movie/popular` - Popular movies list
- `/movie/search` - Search movies
- `/movie/{id}` - Movie details
- `/movie/{id}/credits` - Cast information
- `/movie/{id}/videos` - Trailers and videos
- `/movie/{id}/similar` - Similar movies
- `/movie/{id}/watch/providers` - Where to watch
- `/trending/movie/week` - Weekly trending movies
- `/genre/movie/list` - Available genres
- `/search/person` - Actor/person search

## 🚦 Current Roadmap

- [ ] Advanced Filters Enhancement (Director, Writer, Production Company)
- [ ] Performance Optimization (Image lazy loading, API caching)
- [ ] PWA Implementation (Offline support)
- [ ] User Authentication & Cloud Sync
- [ ] Social Features (Share lists, compare ratings)
- [ ] Dark/Light Theme Toggle

## 🤝 Contributing

Contributions are welcome! Feel free to:

- Report bugs
- Suggest new features
- Submit pull requests
- Improve documentation

## 📄 License

This project is open source and available under the MIT License.

## 🙏 Acknowledgments

- [The Movie Database (TMDB)](https://www.themoviedb.org/) for the amazing API
- [Vite](https://vitejs.dev/) for the lightning-fast build tool
- [React](https://react.dev/) for the powerful UI library
- [Tailwind CSS](https://tailwindcss.com/) for styling utilities

## 📧 Contact

Questions or feedback? Feel free to reach out or open an issue on GitHub!

---

**Made with ❤️ for movie lovers everywhere** 🎬🍿
