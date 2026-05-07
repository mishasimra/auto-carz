import { MapPin, Navigation } from "lucide-react";
import BusinessGallerySection from "../components/about/BusinessGallerySection.jsx";
import SectionHeading from "../components/common/SectionHeading.jsx";
import { businessInfo, businessLinks } from "../constants/businessInfo.js";

const AboutPage = () => (
  <section className="section page-hero-pad">
    <div className="container about-page-stack">
      <div className="two-column">
        <div>
          <SectionHeading
            eyebrow="About Us"
            title="30+ years of helping drivers personalize with confidence"
            description="Auto Carz has grown through repeat customers, reliable workmanship, and a strong eye for automotive detail."
          />
          <p className="lead">
            The business focuses on premium accessories and honest recommendations, whether a customer
            wants one practical upgrade or a full cabin and exterior refresh.
          </p>
        </div>
        <div className="glass-card trust-card">
          <h3>Why customers trust Auto Carz</h3>
          <ul className="plain-list">
            <li>Vehicle-specific advice for styling and functionality</li>
            <li>Clean installations with premium finishing</li>
            <li>Strong product range across interior, audio, lighting, and exterior</li>
            <li>Fast communication by phone and WhatsApp</li>
            <li>Transparent pricing and long-term customer relationships</li>
          </ul>
          <div className="premium-location-card compact">
            <div className="location-icon">
              <MapPin />
            </div>
            <div>
              <h3>Visit Auto Carz</h3>
            </div>
            <div className="about-map-frame">
              <iframe
                src={businessInfo.mapEmbedUrl}
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
                title="Auto Carz location"
              />
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
          </div>
        </div>
      </div>
      <BusinessGallerySection />
    </div>
  </section>
);

export default AboutPage;
