import { ShieldCheck, Sparkles, Wrench } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/client.js";
import EmptyState from "../components/common/EmptyState.jsx";
import LoadingState from "../components/common/LoadingState.jsx";
import SectionHeading from "../components/common/SectionHeading.jsx";
import Hero from "../components/home/Hero.jsx";
import ProductCard from "../components/product/ProductCard.jsx";
import { productCatalog } from "../constants/productCatalog.js";

const serviceCards = [
  {
    icon: Wrench,
    title: "Precision Installation",
    description: "Experienced fitment for audio systems, seat covers, lighting, cameras, and more."
  },
  {
    icon: Sparkles,
    title: "Custom Styling",
    description: "Bold, tasteful upgrades that sharpen your car's cabin and road presence."
  },
  {
    icon: ShieldCheck,
    title: "Trusted Expertise",
    description: "30+ years of hands-on experience and product advice that fits your vehicle and budget."
  }
];

const HomePage = () => {
  const [reviews, setReviews] = useState([]);
  const [reviewsLoading, setReviewsLoading] = useState(true);

  useEffect(() => {
    let active = true;

    const loadReviews = async () => {
      try {
        setReviewsLoading(true);
        const response = await api.get("/reviews");
        console.log("Home page GET /api/reviews response:", response.data);

        if (active) {
          setReviews(Array.isArray(response?.data?.data) ? response.data.data : []);
        }
      } catch (error) {
        console.error("Failed to load home page reviews:", error);

        if (active) {
          setReviews([]);
        }
      } finally {
        if (active) {
          setReviewsLoading(false);
        }
      }
    };

    loadReviews();

    return () => {
      active = false;
    };
  }, []);

  return (
    <>
      <Hero />

      <section className="section">
        <div className="container">
          <SectionHeading
            eyebrow="Featured Products"
            title="Best-selling upgrades with a premium finish"
            description="A curated range of accessories chosen for performance, design, and clean vehicle-specific fitment."
          />
          <div className="card-grid three">
            {productCatalog.slice(0, 3).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      <section className="section section-dark">
        <div className="container">
          <SectionHeading
            eyebrow="Why Auto Carz"
            title="Built for people who care how their car looks and feels"
            description="Everything is designed to help customers browse quickly, trust the workmanship, and reach the team without friction."
            center
          />
          <div className="card-grid three">
            {serviceCards.map((card) => (
              <article key={card.title} className="info-card">
                <card.icon className="info-icon" />
                <h3>{card.title}</h3>
                <p>{card.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHeading
            eyebrow="Client Reviews"
            title="Drivers keep coming back for the detail"
            description="A few words from customers who wanted premium work without the guesswork."
          />
          {reviewsLoading ? (
            <LoadingState label="Loading reviews..." />
          ) : !reviews.length ? (
            <EmptyState title="No reviews yet" description="" />
          ) : (
            <div className="card-grid three">
              {reviews.slice(0, 3).map((review) => (
                <article key={review._id} className="review-card premium-review-card">
                  <div className="rating-row review-stars" aria-label={`${review.rating} star review`}>
                    {Array.from({ length: review.rating }).map((_, index) => (
                      <span key={index}>★</span>
                    ))}
                  </div>
                  <p>{review.message}</p>
                  <div className="review-card-footer">
                    <strong>{review.name}</strong>
                    <span>Auto Carz customer</span>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="section cta-band">
        <div className="container cta-band-content">
          <div>
            <span className="eyebrow">Ready to upgrade?</span>
            <h2>Tell us your car model and the look you want. We&apos;ll guide the rest.</h2>
          </div>
          <Link to="/contact" className="button primary large">
            Start Your Inquiry
          </Link>
        </div>
      </section>
    </>
  );
};

export default HomePage;
