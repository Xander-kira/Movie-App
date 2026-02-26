import { useContext } from 'react';
import RatingsContext from '../context/ratingsValue';

export default function useRatings() {
  const context = useContext(RatingsContext);
  if (!context) {
    throw new Error('useRatings must be used within RatingsProvider');
  }
  return context;
}
