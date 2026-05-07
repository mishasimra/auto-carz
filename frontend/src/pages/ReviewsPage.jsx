import { MessageCircleMore } from "lucide-react";
import { useEffect, useState } from "react";
import api from "../api/client.js";
import LoadingState from "../components/common/LoadingState.jsx";
import SectionHeading from "../components/common/SectionHeading.jsx";
import ReviewForm from "../components/reviews/ReviewForm.jsx";
import ReviewList from "../components/reviews/ReviewList.jsx";

const handoverImageModules = import.meta.glob("../assets/business-gallery/customer-handover.*", {
  eager: true,
  import: "default"
});

const handoverImage = Object.values(handoverImageModules)[0] || "";

const googleReviewUrl =
  "https://www.google.com/search?q=Auto+Carz+Pillar+108+Vanivilas+Road+Bengaluru+reviews";

const whatsappReviewUrl = `https://wa.me/919886346588?text=${encodeURIComponent(
  "Hi Auto Carz, I would like to share my review."
)}`;

const ReviewsPage = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadReviews = async ({ showLoader = true } = {}) => {
    try {
      if (showLoader) {
        setLoading(true);
      }

      const response = await api.get("/reviews");
      console.log("GET /api/reviews response:", response.data);

      const nextReviews = Array.isArray(response?.data?.data) ? response.data.data : [];
      setReviews(nextReviews);
    } catch (error) {
      console.error("Failed to load reviews:", error);
      setReviews([]);
    } finally {
      if (showLoader) {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    loadReviews();
  }, []);

  const handleReviewSubmitted = async (review) => {
    if (!review?._id) {
      await loadReviews({ showLoader: false });
      return;
    }

    setReviews((current) => [review, ...current.filter((item) => item._id !== review._id)]);
    await loadReviews({ showLoader: false });
  };

  return (
    <section className="section page-hero-pad">
      <div className="container">
        <SectionHeading
          eyebrow="Reviews"
          title="What customers say after the install"
          description="Real feedback from customers who trusted Auto Carz with premium accessories, fitment, and finishing."
        />

        <div className="two-column review-experience-grid">
          <ReviewForm onSubmitted={handleReviewSubmitted} />

          <div className="review-cta-card review-page-cta">
            <div className="review-cta-visual">
              {handoverImage ? (
                <img src={handoverImage} alt="Customer receiving completed car accessory installation" />
              ) : (
                <div className="review-cta-placeholder" aria-hidden="true" />
              )}
              <div className="review-cta-visual-overlay" />
            </div>
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
        </div>

        {loading ? (
          <LoadingState label="Loading reviews..." />
        ) : null}

        {!loading ? <ReviewList reviews={reviews} /> : null}
      </div>
    </section>
  );
};

export default ReviewsPage;
