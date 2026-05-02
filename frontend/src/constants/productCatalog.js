import { businessInfo } from "./businessInfo.js";
import leatherSeat from "../assets/products/leather-seat-covers.jpg";
import fabricSeat from "../assets/products/fabric-seat-covers.jpg";
import mats from "../assets/products/car-floor-mats.jpg";
import androidSystem from "../assets/products/android-car-system.jpg";
import stereoSystem from "../assets/products/car-stereo-system.jpg";
import speakers from "../assets/products/car-speakers.jpg";
import subwoofer from "../assets/products/car-subwoofer.jpg";
import halogen from "../assets/products/halogen-bulb.jpg";
import led from "../assets/products/led-headlight-bulb.jpg";
import horn from "../assets/products/car-horn.jpg";
import wheels from "../assets/products/mag-wheels.jpg";
import dashcam from "../assets/products/dashcam.jpg";
import steering from "../assets/products/fancy-steering-wheel.jpg";
import perfume from "../assets/products/car-perfume.jpg";
import bumper from "../assets/products/car-bumper.jpg";

export const productFilters = [
  "All",
  "Interior",
  "Audio",
  "Lighting",
  "Wheels",
  "Safety",
  "Exterior",
  "Accessories"
];

const buildWhatsappLink = (productName) =>
  `https://wa.me/${businessInfo.whatsappNumber}?text=${encodeURIComponent(
    `Hi Auto Carz, I'm interested in ${productName}. Please share price and availability.`
  )}`;

export const productCatalog = [
  {
    id: "leather-seat-covers",
    name: "Leather Seat Covers",
    category: "Interior",
    shortDescription:
      "Premium fitted leather seat covers for comfort, style, and durability.",
    image: leatherSeat,
    badge: "Best Seller",
    inquiryLabel: "Ask Price on WhatsApp",
    whatsappLink: buildWhatsappLink("Leather Seat Covers")
  },
  {
    id: "fabric-seat-covers",
    name: "Fabric Seat Covers",
    category: "Interior",
    shortDescription:
      "Comfortable daily-use fabric seat covers with custom-fit options.",
    image: fabricSeat,
    badge: "Daily Comfort",
    inquiryLabel: "Ask Price on WhatsApp",
    whatsappLink: buildWhatsappLink("Fabric Seat Covers")
  },
  {
    id: "full-fancy-mats",
    name: "Full Mats & Fancy Mats",
    category: "Interior",
    shortDescription: "Protect your car floor with stylish, easy-to-clean mats.",
    image: mats,
    badge: "Custom Fit",
    inquiryLabel: "Ask Price on WhatsApp",
    whatsappLink: buildWhatsappLink("Full Mats & Fancy Mats")
  },
  {
    id: "android-systems",
    name: "Android Systems",
    category: "Audio",
    shortDescription:
      "Smart touchscreen Android systems with navigation, music, and connectivity.",
    image: androidSystem,
    badge: "Smart Upgrade",
    inquiryLabel: "Ask Price on WhatsApp",
    whatsappLink: buildWhatsappLink("Android Systems")
  },
  {
    id: "stereo-systems",
    name: "Stereo Systems",
    category: "Audio",
    shortDescription:
      "Upgrade your entertainment with clear and powerful stereo systems.",
    image: stereoSystem,
    badge: "Clear Audio",
    inquiryLabel: "Ask Price on WhatsApp",
    whatsappLink: buildWhatsappLink("Stereo Systems")
  },
  {
    id: "speakers",
    name: "Speakers",
    category: "Audio",
    shortDescription: "Crisp and balanced sound upgrades for every drive.",
    image: speakers,
    badge: "Sound Upgrade",
    inquiryLabel: "Ask Price on WhatsApp",
    whatsappLink: buildWhatsappLink("Speakers")
  },
  {
    id: "subwoofers",
    name: "Subwoofers",
    category: "Audio",
    shortDescription:
      "Deep bass performance for a powerful in-car audio experience.",
    image: subwoofer,
    badge: "Deep Bass",
    inquiryLabel: "Ask Price on WhatsApp",
    whatsappLink: buildWhatsappLink("Subwoofers")
  },
  {
    id: "halogen-bulbs",
    name: "Halogen Bulbs",
    category: "Lighting",
    shortDescription:
      "Reliable halogen bulbs for bright and steady visibility.",
    image: halogen,
    badge: "Reliable",
    inquiryLabel: "Ask Price on WhatsApp",
    whatsappLink: buildWhatsappLink("Halogen Bulbs")
  },
  {
    id: "led-bulbs",
    name: "LED Bulbs",
    category: "Lighting",
    shortDescription:
      "Modern LED lighting upgrades with better brightness and style.",
    image: led,
    badge: "Bright LED",
    inquiryLabel: "Ask Price on WhatsApp",
    whatsappLink: buildWhatsappLink("LED Bulbs")
  },
  {
    id: "horns",
    name: "Horns",
    category: "Accessories",
    shortDescription: "Powerful and durable horns for clear road presence.",
    image: horn,
    badge: "Road Presence",
    inquiryLabel: "Ask Price on WhatsApp",
    whatsappLink: buildWhatsappLink("Horns")
  },
  {
    id: "mag-wheels",
    name: "Mag Wheels",
    category: "Wheels",
    shortDescription: "Stylish alloy/mag wheels to improve your car's look.",
    image: wheels,
    badge: "Premium Finish",
    inquiryLabel: "Ask Price on WhatsApp",
    whatsappLink: buildWhatsappLink("Mag Wheels")
  },
  {
    id: "dashcams",
    name: "Dashcams",
    category: "Safety",
    shortDescription:
      "Record every drive with dependable dash camera installation.",
    image: dashcam,
    badge: "Drive Secure",
    inquiryLabel: "Ask Price on WhatsApp",
    whatsappLink: buildWhatsappLink("Dashcams")
  },
  {
    id: "fancy-steering-wheels",
    name: "Fancy Steering Wheels",
    category: "Interior",
    shortDescription: "Sporty and stylish steering wheel upgrades.",
    image: steering,
    badge: "Sport Styling",
    inquiryLabel: "Ask Price on WhatsApp",
    whatsappLink: buildWhatsappLink("Fancy Steering Wheels")
  },
  {
    id: "car-perfumes",
    name: "Car Perfumes",
    category: "Accessories",
    shortDescription:
      "Long-lasting car fragrances for a fresh cabin feel.",
    image: perfume,
    badge: "Fresh Cabin",
    inquiryLabel: "Ask Price on WhatsApp",
    whatsappLink: buildWhatsappLink("Car Perfumes")
  },
  {
    id: "bumpers",
    name: "Bumpers",
    category: "Exterior",
    shortDescription:
      "Exterior bumper upgrades and replacements for style and protection.",
    image: bumper,
    badge: "Exterior Upgrade",
    inquiryLabel: "Ask Price on WhatsApp",
    whatsappLink: buildWhatsappLink("Bumpers")
  }
];
