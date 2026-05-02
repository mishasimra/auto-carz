import { MessageCircleMore, Star } from "lucide-react";
import LoadingState from "../components/common/LoadingState.jsx";
import SectionHeading from "../components/common/SectionHeading.jsx";
import useFetch from "../hooks/useFetch.js";

const googleReviewUrl =
  "https://www.google.com/search?q=Auto+Carz+Pillar+108+Vanivilas+Road+Bengaluru+reviews";

const whatsappReviewUrl = `https://wa.me/919886346588?text=${encodeURIComponent(
  "Hi Auto Carz, I would like to share my review."
)}`;

const sampleReviews = [
  {
    name: "Rahul S.",
    text: "Clean installation and very helpful suggestions. The car looks much more premium now.",
    service: "Seat Covers"
  },
  {
    name: "Neha K.",
    text: "Good quality accessories and quick fitting. Highly recommended.",
    service: "Audio Upgrade"
  },
  {
    name: "Arjun M.",
    text: "They explained the options clearly and delivered exactly what I wanted.",
    service: "Lighting"
  }
];

const StarRating = ({ count = 5 }) => (
  <div className="rating-row review-stars" aria-label={`${count} star review`}>
    {Array.from({ length: count }).map((_, index) => (
      <Star key={index} size={16} fill="currentColor" />
    ))}
  </div>
);

const ReviewsPage = () => {
  const { data: reviews, loading } = useFetch("/reviews", []);

  return (
    <section className="section page-hero-pad">
      <div className="container">
        <SectionHeading
          eyebrow="Reviews"
          title="What customers say after the install"
          description="Real feedback from clients who trusted Auto Carz with their vehicles."
        />

        <div className="review-cta-card">
          <div>
            <h3>Loved your upgrade?</h3>
            <p>Share your experience and help other drivers choose Auto Carz with confidence.</p>
          </div>
          <div className="review-cta-actions">
            <a href={googleReviewUrl} className="button primary" target="_blank" rel="noreferrer">
              Write a Google Review
            </a>
            <a href={whatsappReviewUrl} className="button secondary" target="_blank" rel="noreferrer">
              <MessageCircleMore size={16} />
              Share on WhatsApp
            </a>
          </div>
        </div>

        <div className="card-grid three review-sample-grid">
          {sampleReviews.map((review) => (
            <article key={review.name} className="review-card premium-review-card">
              <StarRating />
              <p>{review.text}</p>
              <div className="review-card-footer">
                <strong>{review.name}</strong>
                <span>{review.service}</span>
              </div>
            </article>
          ))}
        </div>

        {loading ? (
          <LoadingState label="Loading reviews..." />
        ) : reviews.length ? (
          <div className="card-grid three">
            {reviews.map((review) => (
              <article key={review._id} className="review-card premium-review-card">
                <StarRating count={review.rating} />
                <p>{review.comment}</p>
                <div className="review-card-footer">
                  <strong>{review.customerName}</strong>
                  <span>{review.vehicle || "Auto Carz customer"}</span>
                </div>
              </article>
            ))}
          </div>
        ) : null}

        <p className="review-note">Reviews are collected through Google and direct customer feedback.</p>
      </div>
    </section>
  );
};

export default ReviewsPage;
