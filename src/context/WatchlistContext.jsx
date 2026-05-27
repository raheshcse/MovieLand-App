import { createContext, useEffect, useState } from 'react';

export const WatchlistContext = createContext({
  watchlist: [],
  addToWatchlist: () => {},
  removeFromWatchlist: () => {},
});

const STORAGE_KEY = 'movieland_watchlist';

export const WatchlistProvider = ({ children }) => {
  const [watchlist, setWatchlist] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setWatchlist(JSON.parse(stored));
      } catch {
        setWatchlist([]);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(watchlist));
  }, [watchlist]);

  const addToWatchlist = (movie) => {
    setWatchlist((current) => {
      if (current.some((item) => item.imdbID === movie.imdbID)) {
        return current;
      }
      return [...current, movie];
    });
  };

  const removeFromWatchlist = (imdbID) => {
    setWatchlist((current) => current.filter((movie) => movie.imdbID !== imdbID));
  };

  return (
    <WatchlistContext.Provider value={{ watchlist, addToWatchlist, removeFromWatchlist }}>
      {children}
    </WatchlistContext.Provider>
  );
};
