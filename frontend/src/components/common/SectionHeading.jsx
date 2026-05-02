import { motion } from "framer-motion";

const SectionHeading = ({ eyebrow, title, description, center = false }) => (
  <motion.div
    className={`section-heading ${center ? "center" : ""}`}
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.3 }}
    transition={{ duration: 0.45 }}
  >
    {eyebrow ? <span className="eyebrow">{eyebrow}</span> : null}
    <h2>{title}</h2>
    {description ? <p>{description}</p> : null}
  </motion.div>
);

export default SectionHeading;
