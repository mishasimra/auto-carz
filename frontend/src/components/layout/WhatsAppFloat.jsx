import { MessageCircleMore } from "lucide-react";
import { businessLinks } from "../../constants/businessInfo.js";

const WhatsAppFloat = () => (
  <a
    href={businessLinks.whatsapp}
    target="_blank"
    rel="noreferrer"
    className="whatsapp-float"
    aria-label="Chat on WhatsApp"
  >
    <MessageCircleMore size={22} />
  </a>
);

export default WhatsAppFloat;
