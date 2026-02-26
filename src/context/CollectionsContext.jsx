import React, { useState, useEffect } from 'react';
import CollectionsContext from './collectionsValue';

export default function CollectionsProvider({ children }) {
  const [collections, setCollections] = useState([
    { id: 'favorites', name: 'Favorites', description: 'My favorite movies', movies: [], isDefault: true },
    { id: 'watched', name: 'Watched', description: 'Movies I\'ve watched', movies: [], isDefault: true },
    { id: 'towatch', name: 'Plan to Watch', description: 'Movies to watch later', movies: [], isDefault: true },
  ]);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem('collections');
      if (saved) {
        setCollections(JSON.parse(saved));
      }
    } catch (error) {
      console.error('Error loading collections:', error);
    }
  }, []);

  // Save to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem('collections', JSON.stringify(collections));
    } catch (error) {
      console.error('Error saving collections:', error);
    }
  }, [collections]);

  const addMovieToCollection = (collectionId, movie) => {
    setCollections((prev) =>
      prev.map((col) =>
        col.id === collectionId
          ? {
              ...col,
              movies: col.movies.some((m) => m.id === movie.id)
                ? col.movies
                : [...col.movies, movie],
            }
          : col
      )
    );
  };

  const removeMovieFromCollection = (collectionId, movieId) => {
    setCollections((prev) =>
      prev.map((col) =>
        col.id === collectionId
          ? { ...col, movies: col.movies.filter((m) => m.id !== movieId) }
          : col
      )
    );
  };

  const createCollection = (name, description) => {
    const id = `custom-${Date.now()}`;
    setCollections((prev) => [
      ...prev,
      { id, name, description, movies: [], isDefault: false },
    ]);
    return id;
  };

  const deleteCollection = (collectionId) => {
    if (!collections.find((col) => col.id === collectionId)?.isDefault) {
      setCollections((prev) => prev.filter((col) => col.id !== collectionId));
    }
  };

  const isMovieInCollection = (collectionId, movieId) => {
    return collections
      .find((col) => col.id === collectionId)
      ?.movies.some((m) => m.id === movieId) ?? false;
  };

  return (
    <CollectionsContext.Provider
      value={{
        collections,
        addMovieToCollection,
        removeMovieFromCollection,
        createCollection,
        deleteCollection,
        isMovieInCollection,
      }}
    >
      {children}
    </CollectionsContext.Provider>
  );
}
