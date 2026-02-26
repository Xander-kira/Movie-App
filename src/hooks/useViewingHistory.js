import { useContext } from 'react';
import ViewingHistoryContext from '../context/viewingHistoryValue';

export default function useViewingHistory() {
  const context = useContext(ViewingHistoryContext);
  if (!context) {
    throw new Error('useViewingHistory must be used within ViewingHistoryProvider');
  }
  return context;
}
