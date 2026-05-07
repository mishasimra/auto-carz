import { Star } from "lucide-react";

const ReviewStars = ({ rating = 0, interactive = false, onChange }) => (
  <div
    className={`rating-row review-stars${interactive ? " review-stars-input" : ""}`}
    aria-label={`${rating} out of 5 stars`}
  >
    {Array.from({ length: 5 }).map((_, index) => {
      const value = index + 1;
      const filled = value <= rating;

      if (!interactive) {
        return <Star key={value} size={18} fill={filled ? "currentColor" : "none"} />;
      }

      return (
        <button
          key={value}
          type="button"
          className={`review-star-button${filled ? " active" : ""}`}
          onClick={() => onChange(value)}
          aria-label={`Set rating to ${value} star${value > 1 ? "s" : ""}`}
          aria-pressed={filled}
        >
          <Star size={20} fill={filled ? "currentColor" : "none"} />
        </button>
      );
    })}
  </div>
);

export default ReviewStars;
