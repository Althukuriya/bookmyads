const PRODUCT_CONFIG = {
  "brand": {
    "name": "SmartSweep",
    "tagline": "Clean smarter. Live better.",
    "logo": "assets/logo.png",
    "description": "Crafting exceptional audio products."
  },
  "product": {
    "name": "SmartSweep Pro Intelligent Automatic Floor Cleaning Robot System",
    "shortName": "SmartSweep Pro",
    "price": 999,
    "priceFormatted": "₹999",
    "currency": "INR",
    "tagline": "Effortless cleaning. Smarter living.",
    "description": "SmartSweep Pro is an intelligent automatic floor cleaning robot designed for modern homes. It effectively sweeps and collects dust, hair, and debris across multiple surfaces with ease. Its ultra-slim design allows it to reach under furniture and clean tight corners, while rotating brushes ensure thorough edge-to-edge cleaning. Built for convenience, it delivers a reliable, hands-free cleaning experience that saves time and effort every day.",
    "badge": "Next Generation Cleaning",
    "sectionTitle": "Engineered for Perfection",
    "features": [
      "Intelligent Automatic Cleaning",
      "Ultra-Slim Design for Under Furniture",
      "Edge & Corner Cleaning Brushes",
      "Efficient Dust Pickup System",
      "Modern Minimal Design",
      "Hands-Free Cleaning Experience",
      "Low Noise Operation"
    ],
    "benefits": [
      {
        "icon": "cleaning",
        "title": "Smart Cleaning",
        "description": "Intelligent navigation for efficient cleaning"
      },
      {
        "icon": "battery",
        "title": "Long Battery",
        "description": "Cleans longer "
      }
    ],
    "trustBadges": [
      {
        "icon": "shield",
        "title": "Secure Transaction",
        "description": "Every order verified"
      },
      {
        "icon": "shield-check",
        "title": "Trusted Dealer",
        "description": "Secure & Safe"
      },
      {
        "icon": "truck",
        "title": "Fast Delivery",
        "description": "Quick and reliable shipping to your doorstep"
      },
      {
        "icon": "star",
        "title": "Premium Quality",
        "description": "Built with high-quality materials and design"
      },
      {
        "icon": "headset",
        "title": "24/7 Support",
        "description": "Always here to help you anytime"
      }
    ]
  },
  "images": {
    "logo": "assets/logo.png",
    "mainProduct": "assets/product-main.jpg",
    "gallery": [
      "assets/1.jpg",
      "assets/2.jpg",
      "assets/3.jpg",
      "assets/4.jpg",
      "assets/5.jpg",
      "assets/6.jpg",
      "assets/7.jpg",
      "assets/8.jpg",
      "assets/9.jpg",
      "assets/10.jpg"
    ],
    "qrCode": "assets/qr.png"
  },
  "about": {
    "story": "Cleaning shouldn’t feel like a daily burden. Yet, in most homes, it still does.\nWe noticed how people spend time and effort on repetitive cleaning, only to miss the spots that matter most. That’s where the idea of SmartSweep Pro was born — a smarter, simpler way to keep homes clean without constant effort.\n\nBuilt for modern lifestyles, our goal was clear: create a solution that works quietly in the background while you focus on what truly matters.",
    "mission": "To make everyday living easier through smart, practical technology.\nWe aim to eliminate unnecessary effort from daily routines by offering products that are efficient, reliable, and easy to use.\n\nSmartSweep Pro is designed to bring comfort, convenience, and consistency into your home — without complexity.",
    "whyExists": "Because your time is more valuable than chores.\n\nWe exist to:\n\nReduce the effort of daily cleaning\nImprove the quality of home living\nMake smart technology accessible to everyone\n\nA clean home should not require constant work — it should simply stay clean."
  },
  "contact": {
    "whatsapp": "+91 8088396708",
    "email": "bookmyads122@gmail.com",
    "locations": [
      "Mumbai",
      "Bangalore"
    ]
  },
  "payment": {
    "upiId": "8088396708@jupiteraxis",
    "whatsappNumber": "918088396708",
    "qrCodePath": "assets/qr.png"
  },
  "legal": {
    "privacy": "",
    "terms": "",
    "refund": ""
  },
  "video": {
    "enabled": false,
    "videoUrl": "",
    "posterImage": "",
    "title": "",
    "description": ""
  },
  "seo": {
    "title": "SmartSweep Pro Robot Vacuum Cleaner | Automatic Floor Cleaning Robot for Home, Smart Sweeping & Dust Removal, Slim Design Multi-Surface Cleaner",
    "description": "SmartSweep Pro is an intelligent automatic floor cleaning robot designed for effortless home cleaning. With smart sweeping technology, it removes dust, hair, and debris from tiles, wood, and multiple surfaces. Its ultra-slim design easily reaches under sofas and corners, ensuring complete cleaning without manual effort. Perfect for modern homes, SmartSweep Pro delivers hands-free convenience, saving time while keeping your space consistently clean.",
    "keywords": "headphones, audio"
  },
  "urls": {
    "website": "https://auralis.com"
  }
};

if (typeof window !== 'undefined' && document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => { if (typeof window.initSite === 'function') window.initSite(PRODUCT_CONFIG); });
} else if (typeof window !== 'undefined' && typeof window.initSite === 'function') {
  window.initSite(PRODUCT_CONFIG);
}
