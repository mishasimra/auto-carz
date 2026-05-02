export const businessInfo = {
  name: "Auto Carz",
  businessName: "Auto Carz",
  phonePrimary: "9886346588",
  phoneSecondary: "8660139262",
  phoneDisplay: "9886346588 / 8660139262",
  whatsapp: "919886346588",
  whatsappNumber: "919886346588",
  whatsappMessage: "Hi Auto Carz, I'm interested in your car accessories and services.",
  mapsLink:
    "https://www.google.com/maps/dir/?api=1&destination=Auto%20Carz%2C%20Pillar%20no%20108%2C%20Opposite%2C%208%2F3%2C%20Vanivilas%20Rd%2C%20Bengaluru%2C%20Karnataka%20560004",
  address:
    "Auto Carz, Pillar no 108, Opposite, 8/3, Vanivilas Rd, Bengaluru, Karnataka 560004",
  mapEmbedUrl:
    "https://www.google.com/maps?q=Auto%20Carz%2C%20Pillar%20no%20108%2C%20Opposite%2C%208%2F3%2C%20Vanivilas%20Rd%2C%20Bengaluru%2C%20Karnataka%20560004&output=embed"
};

export const businessLinks = {
  tel: `tel:${businessInfo.phonePrimary}`,
  telPrimary: `tel:${businessInfo.phonePrimary}`,
  telSecondary: `tel:${businessInfo.phoneSecondary}`,
  whatsapp: `https://wa.me/${businessInfo.whatsapp}?text=${encodeURIComponent(
    businessInfo.whatsappMessage
  )}`,
  maps: businessInfo.mapsLink
};
