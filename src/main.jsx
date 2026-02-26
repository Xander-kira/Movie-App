import { StrictMode } from 'react'
import ReactDOM from "react-dom/client";
import './index.css'
import App from './App.jsx'
import { ThemeProvider } from './context/ThemeContext';
import { WatchlistProvider } from './context/WatchlistContext';
import ViewingHistoryProvider from './context/ViewingHistoryContext';
import CollectionsProvider from './context/CollectionsContext';
import RatingsProvider from './context/RatingsContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider>
      <WatchlistProvider>
        <ViewingHistoryProvider>
          <CollectionsProvider>
            <RatingsProvider>
              <App />
            </RatingsProvider>
          </CollectionsProvider>
        </ViewingHistoryProvider>
      </WatchlistProvider>
    </ThemeProvider>
  </StrictMode>,
)
