import { MapPin, Navigation, Phone } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import api from "../api/client.js";
import SectionHeading from "../components/common/SectionHeading.jsx";
import { businessInfo, businessLinks } from "../constants/businessInfo.js";

const ContactPage = () => {
  const [form, setForm] = useState({ name: "", phone: "", email: "", message: "" });
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      setSubmitting(true);
      await api.post("/inquiries", form);
      toast.success("Thanks, your message has been sent");
      setForm({ name: "", phone: "", email: "", message: "" });
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to send message");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="section page-hero-pad">
      <div className="container contact-grid">
        <div>
          <SectionHeading
            eyebrow="Contact"
            title="Talk to the team and plan your next upgrade"
            description="Share your car model and what you want to improve. We'll recommend the right options quickly."
          />
          <div className="contact-stack">
            <a href={businessLinks.telPrimary} className="contact-item">
              <Phone />
              <span>{businessInfo.phonePrimary}</span>
            </a>
            <a href={businessLinks.telSecondary} className="contact-item">
              <Phone />
              <span>{businessInfo.phoneSecondary}</span>
            </a>
            <a href={businessLinks.whatsapp} className="contact-item" target="_blank" rel="noreferrer">
              <Phone />
              <span>Chat on WhatsApp</span>
            </a>
            <a
              href={businessLinks.maps}
              className="contact-item"
              target="_blank"
              rel="noreferrer"
            >
              <Navigation />
              <span>Open in Google Maps</span>
            </a>
          </div>
          <div className="premium-location-card">
            <div className="location-icon">
              <MapPin />
            </div>
            <div>
              <h3>Visit Auto Carz</h3>
              <p>Find us easily on Google Maps.</p>
            </div>
            <a
              href={businessLinks.maps}
              className="button primary"
              target="_blank"
              rel="noreferrer"
            >
              <Navigation size={16} />
              Get Directions
            </a>
            <div className="map-frame">
              <iframe
                src={businessInfo.mapEmbedUrl}
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
                title="Auto Carz location"
              />
            </div>
          </div>
        </div>
        <form className="glass-card contact-form" onSubmit={handleSubmit}>
          <h3>Send a message</h3>
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
          <input
            type="email"
            placeholder="Email address"
            value={form.email}
            onChange={(event) => setForm({ ...form, email: event.target.value })}
          />
          <textarea
            rows="6"
            required
            placeholder="What are you looking for?"
            value={form.message}
            onChange={(event) => setForm({ ...form, message: event.target.value })}
          />
          <button className="button primary" disabled={submitting}>
            {submitting ? "Sending..." : "Submit Inquiry"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default ContactPage;
