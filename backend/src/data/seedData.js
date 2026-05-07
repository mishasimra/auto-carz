export const categories = [
  { name: "Interior", slug: "interior", description: "Cabin upgrades with comfort and style." },
  { name: "Exterior", slug: "exterior", description: "Bold exterior protection and detailing." },
  { name: "Audio", slug: "audio", description: "Premium sound and multimedia systems." },
  { name: "Lighting", slug: "lighting", description: "High-performance visibility and accents." },
  { name: "Wheels", slug: "wheels", description: "Wheel upgrades with stronger road presence." },
  { name: "Safety", slug: "safety", description: "Practical upgrades for everyday driving confidence." },
  { name: "Accessories", slug: "accessories", description: "Useful finishing touches for every cabin." }
];

export const reviews = [
  {
    name: "Aman Verma",
    rating: 5,
    message: "Excellent fit and finish. The team treated my car like their own.",
    approved: true
  },
  {
    name: "Rhea Khanna",
    rating: 5,
    message: "Fast installation, honest advice, and the cabin lighting upgrade looks stunning.",
    approved: true
  },
  {
    name: "Dev Malhotra",
    rating: 4,
    message: "Great product range and strong after-sales support.",
    approved: false
  }
];

export const products = [
  {
    name: "Leather Seat Covers",
    shortDescription: "Premium fitted leather seat covers for comfort, style, and durability.",
    description:
      "Crafted for a factory-fit look with durable materials, precise stitching, and easy maintenance for daily driving comfort.",
    price: 18999,
    categorySlug: "interior",
    featured: true,
    images: ["leather-seat-covers.jpg"],
    specs: ["Custom fit", "Premium leatherette", "Water resistant", "Easy clean"]
  },
  {
    name: "Fabric Seat Covers",
    shortDescription: "Comfortable daily-use fabric seat covers with custom-fit options.",
    description:
      "Comfortable seat cover options designed for daily use, clean fitment, and easy maintenance.",
    price: 9999,
    categorySlug: "interior",
    featured: true,
    images: ["fabric-seat-covers.jpg"],
    specs: ["Comfort fabric", "Custom fit", "Breathable finish", "Easy clean"]
  },
  {
    name: "Full Mats & Fancy Mats",
    shortDescription: "Protect your car floor with stylish, easy-to-clean mats.",
    description:
      "Vehicle-specific floor mat options that protect the cabin while adding a cleaner interior finish.",
    price: 6999,
    categorySlug: "interior",
    featured: false,
    images: ["car-floor-mats.jpg"],
    specs: ["Custom fit", "Easy clean", "Durable finish", "Cabin protection"]
  },
  {
    name: "Android Systems",
    shortDescription: "Smart touchscreen Android systems with navigation, music, and connectivity.",
    description:
      "A modern multimedia system with a responsive display, Bluetooth connectivity, reverse camera support, and app integration.",
    price: 24999,
    categorySlug: "audio",
    featured: true,
    images: ["android-car-system.jpg"],
    specs: ["Android interface", "Bluetooth", "Reverse camera ready", "HD display"]
  },
  {
    name: "Stereo Systems",
    shortDescription: "Upgrade your entertainment with clear and powerful stereo systems.",
    description: "Reliable stereo system upgrades for cleaner sound, better controls, and improved cabin entertainment.",
    price: 14999,
    categorySlug: "audio",
    featured: false,
    images: ["car-stereo-system.jpg"],
    specs: ["Clear audio", "USB support", "Bluetooth options", "Clean installation"]
  },
  {
    name: "Speakers",
    shortDescription: "Crisp and balanced sound upgrades for every drive.",
    description: "Speaker upgrades tuned for richer vocals, tighter mids, and a more balanced in-car listening experience.",
    price: 7999,
    categorySlug: "audio",
    featured: false,
    images: ["car-speakers.jpg"],
    specs: ["Balanced sound", "Door fitment", "Brand options", "Clean wiring"]
  },
  {
    name: "Subwoofers",
    shortDescription: "Deep bass performance for a powerful in-car audio experience.",
    description: "Subwoofer setups that add controlled low-end punch without compromising daily usability.",
    price: 15999,
    categorySlug: "audio",
    featured: false,
    images: ["car-subwoofer.jpg"],
    specs: ["Deep bass", "Amplifier options", "Secure fitment", "Tuned output"]
  },
  {
    name: "Halogen Bulbs",
    shortDescription: "Reliable halogen bulbs for bright and steady visibility.",
    description: "Dependable halogen bulb replacements for steady visibility and straightforward maintenance.",
    price: 1999,
    categorySlug: "lighting",
    featured: false,
    images: ["halogen-bulb.jpg"],
    specs: ["Reliable beam", "Easy replacement", "Multiple fitments", "Steady visibility"]
  },
  {
    name: "LED Bulbs",
    shortDescription: "Modern LED lighting upgrades with better brightness and style.",
    description: "LED bulb upgrades that improve brightness and give the front profile a cleaner modern look.",
    price: 4999,
    categorySlug: "lighting",
    featured: true,
    images: ["led-headlight-bulb.jpg"],
    specs: ["Bright LED", "Modern finish", "Low power draw", "Fitment support"]
  },
  {
    name: "Horns",
    shortDescription: "Powerful and durable horns for clear road presence.",
    description: "Durable horn upgrades with strong sound output and neat installation.",
    price: 2499,
    categorySlug: "accessories",
    featured: false,
    images: ["car-horn.jpg"],
    specs: ["Strong sound", "Durable build", "Clean fitment", "Road presence"]
  },
  {
    name: "Mag Wheels",
    shortDescription: "Stylish alloy/mag wheels to improve your car's look.",
    description: "Premium wheel options that sharpen stance, finish, and overall road presence.",
    price: 32999,
    categorySlug: "wheels",
    featured: false,
    images: ["mag-wheels.jpg"],
    specs: ["Premium finish", "Multiple sizes", "Fitment advice", "Balanced stance"]
  },
  {
    name: "Dashcams",
    shortDescription: "Record every drive with dependable dash camera installation.",
    description: "Dashcam installation for dependable trip recording, added security, and cleaner wiring.",
    price: 8999,
    categorySlug: "safety",
    featured: false,
    images: ["dashcam.jpg"],
    specs: ["Loop recording", "Clean wiring", "Wide angle", "Daily security"]
  },
  {
    name: "Fancy Steering Wheels",
    shortDescription: "Sporty and stylish steering wheel upgrades.",
    description: "Steering wheel upgrades for a sportier cabin look and a more premium hand feel.",
    price: 11999,
    categorySlug: "interior",
    featured: false,
    images: ["fancy-steering-wheel.jpg"],
    specs: ["Sport styling", "Premium grip", "Vehicle fitment", "Cabin upgrade"]
  },
  {
    name: "Car Perfumes",
    shortDescription: "Long-lasting car fragrances for a fresh cabin feel.",
    description: "Cabin fragrances selected for a clean, lasting scent without overwhelming the interior.",
    price: 999,
    categorySlug: "accessories",
    featured: false,
    images: ["car-perfume.jpg"],
    specs: ["Fresh cabin", "Long-lasting", "Compact design", "Daily use"]
  },
  {
    name: "Bumpers",
    shortDescription: "Exterior bumper upgrades and replacements for style and protection.",
    description: "Bumper upgrades and replacements that improve exterior finish while supporting practical protection.",
    price: 10999,
    categorySlug: "exterior",
    featured: false,
    images: ["car-bumper.jpg"],
    specs: ["Exterior upgrade", "Vehicle-specific", "Durable finish", "Protection support"]
  }
];
