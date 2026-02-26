import React, { useState, useEffect } from 'react';
import useRatings from '../hooks/useRatings';

export default function RatingComponent({ movieId }) {
  const { getMovieRating, rateMovie, removeRating } = useRatings();
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [review, setReview] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const saved = getMovieRating(movieId);
    if (saved) {
      setRating(saved.rating);
      setReview(saved.review || '');
    }
  }, [movieId, getMovieRating]);

  const handleRate = (newRating) => {
    setRating(newRating);
    rateMovie(movieId, newRating, review);
  };

  const handleReviewSubmit = () => {
    if (rating > 0) {
      rateMovie(movieId, rating, review);
      setIsEditing(false);
    }
  };

  const handleRemoveRating = () => {
    removeRating(movieId);
    setRating(0);
    setReview('');
  };

  return (
    <div className="bg-slate-800/50 backdrop-blur p-4 rounded-xl border border-slate-700">
      <h4 className="text-lg font-bold text-white mb-4">Your Rating</h4>

      {/* Star Rating */}
      <div className="flex gap-2 mb-4">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((star) => (
          <button
            key={star}
            onClick={() => handleRate(star)}
            onMouseEnter={() => setHoverRating(star)}
            onMouseLeave={() => setHoverRating(0)}
            className={`w-10 h-10 rounded-lg font-bold transition-all duration-200 ${
              (hoverRating || rating) >= star
                ? 'bg-emerald-600 text-white scale-110'
                : 'bg-slate-700 text-slate-400 hover:bg-slate-600'
            }`}
          >
            {star}
          </button>
        ))}
      </div>

      {rating > 0 && (
        <>
          <p className="text-emerald-400 mb-3">
            You rated this: <span className="text-lg font-bold">{rating}/10</span>
          </p>

          {/* Review Section */}
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="text-sm text-emerald-400 hover:text-emerald-300 mb-3 underline"
          >
            {isEditing ? 'Cancel' : 'Add Review'}
          </button>

          {isEditing && (
            <div className="mb-3">
              <textarea
                value={review}
                onChange={(e) => setReview(e.target.value)}
                placeholder="Write your review..."
                className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-white placeholder-slate-500 focus:border-emerald-500 focus:outline-none text-sm resize-none"
                rows="3"
              />
              <button
                onClick={handleReviewSubmit}
                className="mt-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg font-semibold transition-all duration-200"
              >
                Save Review
              </button>
            </div>
          )}

          {review && (
            <div className="bg-slate-700/50 p-3 rounded-lg mb-3">
              <p className="text-sm text-slate-300 italic">"{review}"</p>
            </div>
          )}

          {/* Remove Rating Button */}
          <button
            onClick={handleRemoveRating}
            className="text-xs text-red-400 hover:text-red-300 underline"
          >
            Remove rating
          </button>
        </>
      )}
    </div>
  );
}
