'use client';

import { useState } from 'react';
import React from 'react';
import { useActionState } from 'react';
import { createReview, deleteReview } from '@/app/lib/actions';


export default function ReviewForm({
  productId,
  existingReview,
}: {
  productId: string;
  existingReview?: any;
}) {
  const [message, formAction] = useActionState(createReview, '');

  const [isEditing, setIsEditing] = useState(!existingReview);

  const [rating, setRating] = useState(existingReview?.rating || 0);
  const [title, setTitle] = useState(existingReview?.title || '');
  const [hover, setHover] = useState(0);

  const canSubmit =
    rating > 0 && title.trim().length > 0;

  const hasReview = !!existingReview;

  const handleDelete = async () => {
    const confirmed = window.confirm(
      'Are you sure you want to delete your review? This cannot be undone.'
    );

    if (!confirmed) return;

    const formData = new FormData();
    formData.append('productId', productId);

    await deleteReview(undefined, formData);
  };

  return (
    <div className="mt-10 border-t pt-8">

      <h3 className="text-xl font-semibold mb-3">
        Your Review
      </h3>

      {hasReview && !isEditing && (
        <div className="mb-4">
          <p className="text-sm text-[#7a5c46] mb-2">
            You already reviewed this product.
          </p>

          <div className="mb-4 flex gap-3">
            <button
              onClick={() => setIsEditing(true)}
              className="text-sm px-4 py-2 border border-[#7a5c46] rounded-full hover:bg-white transition"
            >
              Edit Review
            </button>

            <button
              onClick={handleDelete}
              className="text-sm px-4 py-2 border border-red-400 text-red-500 rounded-full hover:bg-red-50 transition"
            >
              Delete Review
            </button>
          </div>
        </div>
      )}

      {/* ======================
          FORM
      ====================== */}
      {(!hasReview || isEditing) && (
        <form action={formAction} className="space-y-4">

          <input type="hidden" name="productId" value={productId} />
          <input type="hidden" name="rating" value={rating} />

          {/* ⭐ STARS */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Rating
            </label>

            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHover(star)}
                  onMouseLeave={() => setHover(0)}
                  className="w-10 h-10 flex items-center justify-center text-2xl"
                >
                  {star <= (hover || rating) ? '⭐' : '☆'}
                </button>
              ))}
            </div>
          </div>

          {/* Title */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Title
            </label>
            <input
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Summarize your experience"
              className="border rounded-lg px-3 py-2 w-full"
            />
          </div>

          {/* Comment */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Comment (optional)
            </label>
            <textarea
              name="comment"
              placeholder="Write your review..."
              rows={4}
              className="border rounded-lg px-3 py-2 w-full"
            />
          </div>

          {/* BUTTONS */}
          <div className="flex gap-3">
            <button
              type="submit"
              disabled={!canSubmit}
              className={`px-6 py-2 rounded-full transition ${
                  canSubmit
                    ? 'bg-[#7a5c46] text-white hover:bg-[#624836]'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
            >
              Save Review
            </button>

            {hasReview && (
              <button
                type="button"
                onClick={() => {
                  setIsEditing(false);
                  setRating(existingReview.rating);
                }}
                className="border px-6 py-2 rounded-full"
              >
                Cancel
              </button>
            )}
          </div>

          {message && (
            <p className="text-sm text-[#7a5c46]">
              {message}
            </p>
          )}
        </form>
      )}
    </div>
  );
}

