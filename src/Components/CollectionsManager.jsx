import React, { useState } from 'react';
import useCollections from '../hooks/useCollections';

export default function CollectionsManager({ movieId, movieTitle }) {
  const { collections, addMovieToCollection, removeMovieFromCollection, createCollection } = useCollections();
  const [isCreating, setIsCreating] = useState(false);
  const [newCollectionName, setNewCollectionName] = useState('');
  const [newCollectionDesc, setNewCollectionDesc] = useState('');

  const handleAddToCollection = (collectionId) => {
    addMovieToCollection(collectionId, { id: movieId, title: movieTitle });
  };

  const handleRemoveFromCollection = (collectionId) => {
    removeMovieFromCollection(collectionId, movieId);
  };

  const handleCreateCollection = () => {
    if (newCollectionName.trim()) {
      createCollection(newCollectionName, newCollectionDesc);
      setNewCollectionName('');
      setNewCollectionDesc('');
      setIsCreating(false);
    }
  };

  return (
    <div className="bg-slate-800/50 backdrop-blur p-4 rounded-xl border border-slate-700">
      <div className="flex justify-between items-center mb-4">
        <h4 className="text-lg font-bold text-white">Add to Collection</h4>
        <button
          onClick={() => setIsCreating(!isCreating)}
          className="text-xs bg-emerald-600 hover:bg-emerald-500 text-white px-3 py-1 rounded-lg transition-all"
        >
          + New List
        </button>
      </div>

      {isCreating && (
        <div className="mb-4 p-3 bg-slate-700/50 rounded-lg">
          <input
            type="text"
            value={newCollectionName}
            onChange={(e) => setNewCollectionName(e.target.value)}
            placeholder="Collection name..."
            className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-white placeholder-slate-500 focus:border-emerald-500 focus:outline-none mb-2"
          />
          <textarea
            value={newCollectionDesc}
            onChange={(e) => setNewCollectionDesc(e.target.value)}
            placeholder="Description (optional)..."
            className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-white placeholder-slate-500 focus:border-emerald-500 focus:outline-none text-sm resize-none mb-2"
            rows="2"
          />
          <button
            onClick={handleCreateCollection}
            className="w-full bg-emerald-600 hover:bg-emerald-500 text-white py-2 rounded-lg font-semibold transition-all"
          >
            Create Collection
          </button>
        </div>
      )}

      <div className="space-y-2">
        {collections.map((col) => (
          <button
            key={col.id}
            onClick={() =>
              collections.find((c) => c.id === col.id)?.movies.some((m) => m.id === movieId)
                ? handleRemoveFromCollection(col.id)
                : handleAddToCollection(col.id)
            }
            className={`w-full p-3 rounded-lg font-semibold transition-all duration-200 text-left text-sm ${
              collections.find((c) => c.id === col.id)?.movies.some((m) => m.id === movieId)
                ? 'bg-emerald-600/30 border border-emerald-500 text-emerald-400'
                : 'bg-slate-700/50 border border-slate-600 text-slate-300 hover:bg-slate-600/50'
            }`}
          >
            <span className="flex justify-between items-center">
              {col.name}
              {collections.find((c) => c.id === col.id)?.movies.some((m) => m.id === movieId) && (
                <span>✓</span>
              )}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
