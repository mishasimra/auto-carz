import EmptyState from "../common/EmptyState.jsx";
import ReviewStars from "./ReviewStars.jsx";

const formatReviewDate = (createdAt) =>
  new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric"
  }).format(new Date(createdAt));

const ReviewList = ({ reviews }) => {
  if (!reviews.length) {
    return (
      <EmptyState
        title="No reviews yet"
        description="Be the first to write one."
      />
    );
  }

  return (
    <div className="card-grid three">
      {reviews.map((review) => (
        <article key={review._id} className="review-card premium-review-card">
          <div className="review-card-top">
            <ReviewStars rating={review.rating} />
            <span className="review-date">{formatReviewDate(review.createdAt)}</span>
          </div>
          <p>{review.message}</p>
          <div className="review-card-footer">
            <strong>{review.name}</strong>
            <span>Verified Auto Carz customer</span>
          </div>
        </article>
      ))}
    </div>
  );
};

export default ReviewList;
