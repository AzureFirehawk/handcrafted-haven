import { getReviewsByProductId, getAverageRating } from "@/app/lib/data";
import { ReviewWithUser } from "@/app/lib/definitions";

export default async function ReviewSection({ productId }: { productId: string }) {
  const reviews = await getReviewsByProductId(productId);
  const ratingData = await getAverageRating(productId);

  return (
    <div className="mt-16">
      <h2 className="text-2xl font-bold mb-6">Customer Reviews</h2>

      {/* Rating Summary */}
      <div className="flex items-center gap-2 mb-6">
        <span className="text-lg font-semibold">
          {ratingData.average}
        </span>
        <span>{"⭐".repeat(Math.round(ratingData.average))}</span>
        <span className="text-sm text-gray-500">
          ({ratingData.count} reviews)
        </span>
      </div>

      {/* Review List */}
      {reviews.length === 0 ? (
        <p className="text-gray-500">
          No reviews yet. Be the first to leave one!
        </p>
      ) : (
        <div className="space-y-6">
          {reviews.map((review: ReviewWithUser) => (
            <div
              key={review.id}
              className="border border-[#e5dcd3] rounded-2xl p-5 bg-white shadow-sm"
            >
              <div className="flex justify-between items-center">
                <p className="font-semibold">{review.user_name}</p>
                <span>{"⭐".repeat(review.rating)}</span>
              </div>

              {review.title && (
                <h3 className="mt-2 font-semibold text-lg">
                  {review.title}
                </h3>
              )}

              {review.comment && (
                <p className="mt-2 text-[#5f4a3a]">
                  {review.comment}
                </p>
              )}

              <p className="mt-2 text-xs text-gray-400">
                {new Date(review.created_at).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}