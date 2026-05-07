import { LoaderCircle, Send } from "lucide-react";
import axios from "axios";
import { useMemo, useState } from "react";
import ReviewStars from "./ReviewStars.jsx";

const initialForm = {
  name: "",
  rating: 5,
  message: ""
};

const reviewApiUrl = "http://localhost:5000/api/reviews";

const validateForm = ({ name, rating, message }) => {
  const errors = {};

  if (!name.trim()) {
    errors.name = "Customer name is required.";
  } else if (name.trim().length < 2) {
    errors.name = "Please enter at least 2 characters.";
  }

  if (!Number.isInteger(rating) || rating < 1 || rating > 5) {
    errors.rating = "Please choose a rating from 1 to 5 stars.";
  }

  if (!message.trim()) {
    errors.message = "Review message is required.";
  } else if (message.trim().length < 12) {
    errors.message = "Please share a little more detail in your review.";
  }

  return errors;
};

const ReviewForm = ({ onSubmitted }) => {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ type: "", message: "" });

  const messageLength = useMemo(() => form.message.trim().length, [form.message]);

  const handleChange = (field, value) => {
    setForm((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: "" }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const nextErrors = validateForm(form);

    if (Object.keys(nextErrors).length) {
      setErrors(nextErrors);
      setStatus({ type: "error", message: "Please fix the highlighted fields and try again." });
      return;
    }

    try {
      setLoading(true);
      setStatus({ type: "", message: "" });

      const payload = {
        name: form.name.trim(),
        rating: form.rating,
        message: form.message.trim()
      };

      const response = await axios.post(reviewApiUrl, payload, {
        headers: {
          "Content-Type": "application/json"
        }
      });

      console.log("POST /api/reviews response:", response.data);

      const createdReview = response?.data?.data || null;
      const success = Boolean(response?.data?.success);

      if (!success) {
        throw new Error("Review submission did not complete successfully.");
      }

      setForm(initialForm);
      setErrors({});
      setStatus({
        type: "success",
        message: "Review submitted successfully"
      });

      if (onSubmitted) {
        await onSubmitted(createdReview);
      }
    } catch (error) {
      console.error("POST /api/reviews failed:", {
        url: reviewApiUrl,
        payload: {
          name: form.name.trim(),
          rating: form.rating,
          message: form.message.trim()
        },
        status: error.response?.status,
        data: error.response?.data,
        message: error.message
      });
      setStatus({
        type: "error",
        message: error.response?.data?.message || "Unable to submit your review right now."
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="glass-card review-form-card" onSubmit={handleSubmit}>
      <div className="review-form-header">
        <span className="eyebrow">Share Your Experience</span>
        <h3>Tell other drivers how your Auto Carz upgrade went</h3>
        <p>Share your genuine experience with the products, fitment, and service.</p>
      </div>

      <label className="review-form-field">
        <span>Customer name</span>
        <input
          type="text"
          placeholder="Enter your name"
          value={form.name}
          onChange={(event) => handleChange("name", event.target.value)}
          aria-invalid={Boolean(errors.name)}
        />
        {errors.name ? <small className="field-error">{errors.name}</small> : null}
      </label>

      <label className="review-form-field">
        <span>Star rating</span>
        <ReviewStars rating={form.rating} interactive onChange={(value) => handleChange("rating", value)} />
        {errors.rating ? <small className="field-error">{errors.rating}</small> : null}
      </label>

      <label className="review-form-field">
        <span>Review message</span>
        <textarea
          rows="5"
          placeholder="Describe the install quality, product finish, service, or overall experience."
          value={form.message}
          onChange={(event) => handleChange("message", event.target.value)}
          aria-invalid={Boolean(errors.message)}
        />
        <div className="review-form-meta">
          <small>{messageLength}/1200 characters</small>
          {errors.message ? <small className="field-error">{errors.message}</small> : null}
        </div>
      </label>

      {status.message ? (
        <div className={`review-form-status ${status.type}`}>{status.message}</div>
      ) : null}

      <button className="button primary review-submit-button" disabled={loading}>
        {loading ? <LoaderCircle size={18} className="spin-icon" /> : <Send size={16} />}
        {loading ? "Submitting..." : "Submit Review"}
      </button>
    </form>
  );
};

export default ReviewForm;
