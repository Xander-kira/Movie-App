import { useContext } from 'react';
import { WatchlistContext } from '../context/watchlistContextValue';

export function useWatchlist() {
  return useContext(WatchlistContext);
}
