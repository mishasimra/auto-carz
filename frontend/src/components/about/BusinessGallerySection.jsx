import SectionHeading from "../common/SectionHeading.jsx";

const galleryItems = [
  {
    filename: "workshop-front.jpg",
    title: "Workshop Front"
  },
  {
    filename: "seat-installation.jpg",
    title: "Seat Cover Installation"
  },
  {
    filename: "accessories-display.jpg",
    title: "Premium Accessories"
  },
  {
    filename: "customer-delivery.jpg",
    title: "Customer Delivery"
  },
  {
    filename: "interior-customization.jpg",
    title: "Interior Customization"
  },
  {
    filename: "audio-upgrade.jpg",
    title: "Audio Upgrade Work"
  }
];

const galleryImageModules = import.meta.glob("../../assets/business-gallery/*.{jpg,jpeg,png,webp}", {
  eager: true,
  import: "default"
});

const galleryImages = Object.fromEntries(
  Object.entries(galleryImageModules).map(([path, source]) => [path.split("/").pop(), source])
);

const BusinessGallerySection = () => {
  const missingImages = galleryItems.filter((item) => !galleryImages[item.filename]);

  return (
    <section className="about-gallery-section">
      <SectionHeading
        eyebrow="Our Workshop & Real Work"
        title="See the real space, real fitment, and real finishing"
        description="These photos help customers understand the workshop environment, installation quality, and the kind of premium work Auto Carz delivers every day."
      />

      <div className="business-gallery-grid">
        {galleryItems.map((item, index) => {
          const imageSource = galleryImages[item.filename];

          return (
            <article
              key={item.filename}
              className={`business-gallery-card${index === 0 ? " featured" : ""}`}
            >
              <div className="business-gallery-media">
                {imageSource ? (
                  <img src={imageSource} alt={item.title} loading="lazy" />
                ) : (
                  <div className="business-gallery-placeholder">
                    <span>Add Photo</span>
                    <strong>{item.filename}</strong>
                  </div>
                )}
              </div>
              <div className="business-gallery-caption">
                <strong>{item.title}</strong>
              </div>
            </article>
          );
        })}
      </div>

      {missingImages.length ? (
        <div className="business-gallery-note">
          <p>
            Place your real business photos in <code>frontend/src/assets/business-gallery/</code>
            using these filenames:
          </p>
          <div className="business-gallery-filelist">
            {galleryItems.map((item) => (
              <span key={item.filename}>{item.filename}</span>
            ))}
          </div>
        </div>
      ) : null}
    </section>
  );
};

export default BusinessGallerySection;
