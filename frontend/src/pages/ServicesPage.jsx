import { CarFront, PaintBucket, Shield, Speaker, Wrench } from "lucide-react";
import SectionHeading from "../components/common/SectionHeading.jsx";

const services = [
  {
    icon: Wrench,
    title: "Accessory Installation",
    description: "Seat covers, floor mats, cameras, sensors, lighting, and more installed with clean fitment."
  },
  {
    icon: Speaker,
    title: "Audio & Infotainment",
    description: "Head units, speakers, subwoofers, reverse cameras, and modern multimedia upgrades."
  },
  {
    icon: PaintBucket,
    title: "Customization",
    description: "Ambient lighting, styling accents, trims, and cabin personalization tailored to your taste."
  },
  {
    icon: Shield,
    title: "Protection Upgrades",
    description: "Guards, durable coatings, and practical add-ons that preserve the look of your vehicle."
  },
  {
    icon: CarFront,
    title: "Exterior Styling",
    description: "Body kits, spoilers, chrome work, lamps, and details that elevate road presence."
  }
];

const ServicesPage = () => (
  <section className="section page-hero-pad">
    <div className="container">
      <SectionHeading
        eyebrow="Services"
        title="From basic upgrades to full car transformation"
        description="Auto Carz combines a broad catalog with careful installation to create polished, reliable results."
      />
      <div className="card-grid three">
        {services.map((service) => (
          <article key={service.title} className="info-card">
            <service.icon className="info-icon" />
            <h3>{service.title}</h3>
            <p>{service.description}</p>
          </article>
        ))}
      </div>
    </div>
  </section>
);

export default ServicesPage;
