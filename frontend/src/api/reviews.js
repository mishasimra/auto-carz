import api from "./client.js";

const parseReviewCollection = (response) => {
  if (response?.data?.success && Array.isArray(response.data.data)) {
    return response.data.data;
  }

  return [];
};

export const getPublicReviews = async () => {
  const response = await api.get("/reviews");
  return parseReviewCollection(response);
};

export const getAdminReviews = async () => {
  const response = await api.get("/reviews/admin");
  return parseReviewCollection(response);
};

export const submitReview = async (payload) => {
  const response = await api.post("/reviews", payload);

  return {
    success: Boolean(response?.data?.success),
    data: response?.data?.data || null,
    message: response?.data?.message || "Thanks for sharing your review."
  };
};

export const updateReview = async (id, payload) => {
  const response = await api.put(`/reviews/${id}`, payload);
  return response.data.data;
};
