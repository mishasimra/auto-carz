import { BadgeIndianRupee, CircleCheckBig } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import api from "../api/client.js";
import EmptyState from "../components/common/EmptyState.jsx";
import LoadingState from "../components/common/LoadingState.jsx";
import SectionHeading from "../components/common/SectionHeading.jsx";
import { productCatalog } from "../constants/productCatalog.js";
import useFetch from "../hooks/useFetch.js";

const getImageUrl = (image) =>
  image?.startsWith("/uploads")
    ? `${(import.meta.env.VITE_API_URL || "http://localhost:5000/api").replace("/api", "")}${image}`
    : image;

const getLocalProductImage = (product) =>
  productCatalog.find(
    (catalogProduct) =>
      catalogProduct.id === product.slug ||
      catalogProduct.name.toLowerCase() === product.name?.toLowerCase()
  )?.image;

const ProductDetailsPage = () => {
  const { slug } = useParams();
  const { data: product, loading } = useFetch(`/products/${slug}`, null);
  const [activeImage, setActiveImage] = useState(0);
  const [form, setForm] = useState({ name: "", phone: "", message: "" });
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      setSubmitting(true);
      await api.post("/inquiries", {
        ...form,
        product: product._id,
        message: form.message || `Interested in ${product.name}`
      });
      toast.success("Inquiry sent successfully");
      setForm({ name: "", phone: "", message: "" });
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to send inquiry");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <LoadingState label="Loading product details..." />;
  }

  if (!product) {
    return (
      <section className="section page-hero-pad">
        <div className="container">
          <EmptyState
            title="Product not found"
            description="This product may have been removed or the link is no longer valid."
          />
        </div>
      </section>
    );
  }

  const localImage = getLocalProductImage(product);
  const productImages = localImage ? [localImage] : (product.images || []).map(getImageUrl);

  return (
    <section className="section page-hero-pad">
      <div className="container product-detail-grid">
        <div>
          <div className="detail-main-image">
            <img src={productImages[activeImage]} alt={product.name} />
          </div>
          <div className="thumbnail-row">
            {productImages.map((image, index) => (
              <button
                key={image}
                className={activeImage === index ? "active" : ""}
                onClick={() => setActiveImage(index)}
              >
                <img src={image} alt={`${product.name} ${index + 1}`} />
              </button>
            ))}
          </div>
        </div>
        <div className="detail-content">
          <SectionHeading
            eyebrow={product.category?.name}
            title={product.name}
            description={product.shortDescription}
          />
          <div className="price-pill">
            <BadgeIndianRupee size={18} />
            {product.price.toLocaleString("en-IN")}
          </div>
          <p className="detail-description">{product.description}</p>
          <div className="spec-list">
            {product.specs.map((spec) => (
              <div key={spec}>
                <CircleCheckBig size={16} />
                <span>{spec}</span>
              </div>
            ))}
          </div>

          <form className="glass-card detail-form" onSubmit={handleSubmit}>
            <h3>Request this product</h3>
            <input
              required
              placeholder="Your name"
              value={form.name}
              onChange={(event) => setForm({ ...form, name: event.target.value })}
            />
            <input
              required
              placeholder="Phone number"
              value={form.phone}
              onChange={(event) => setForm({ ...form, phone: event.target.value })}
            />
            <textarea
              placeholder="Tell us your car model or requirement"
              rows="4"
              value={form.message}
              onChange={(event) => setForm({ ...form, message: event.target.value })}
            />
            <button className="button primary" disabled={submitting}>
              {submitting ? "Sending..." : "Send Inquiry"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ProductDetailsPage;
