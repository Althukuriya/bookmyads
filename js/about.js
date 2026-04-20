
(function() {
  'use strict';

  function getConfig() {
    if (typeof PRODUCT_CONFIG !== 'undefined') {
      return PRODUCT_CONFIG;
    }
    return null;
  }

  function initAbout() {
    const config = getConfig();
    if (!config) return;

    // Header and footer elements
    document.querySelectorAll('[data-logo], [data-footer-logo]').forEach(el => {
      el.src = config.images.logo;
      el.alt = config.brand.name;
    });
    document.querySelectorAll('[data-brand-name]').forEach(el => {
      el.textContent = config.brand.name;
    });
    document.querySelectorAll('[data-brand-tagline]').forEach(el => {
      el.textContent = config.brand.tagline;
    });
    document.querySelectorAll('[data-copyright-year]').forEach(el => {
      el.textContent = new Date().getFullYear();
    });
    document.querySelectorAll('[data-product-shortname]').forEach(el => {
      el.textContent = config.product.shortName;
    });

    // Footer WhatsApp and Email links
    const waLinks = document.querySelectorAll('[data-whatsapp-link]');
    waLinks.forEach(link => {
      link.href = `https://wa.me/${config.payment.whatsappNumber}?text=Hello%20${config.brand.name}%2C%20I%20have%20a%20question`;
      link.textContent = config.contact.whatsapp;
    });
    const emailLinks = document.querySelectorAll('[data-email-link]');
    emailLinks.forEach(link => {
      link.href = `mailto:${config.contact.email}`;
      link.textContent = config.contact.email;
    });

    // About content
    const headlineEl = document.querySelector('[data-about-headline]');
    if (headlineEl) {
      headlineEl.textContent = `${config.product.shortName}: Sound, Refined.`;
    }
    
    const storyEl = document.querySelector('[data-about-story]');
    if (storyEl) {
      storyEl.textContent = config.about.story;
    }
    
    const missionEl = document.querySelector('[data-about-mission]');
    if (missionEl) {
      missionEl.textContent = config.about.mission;
    }
    
    const whyEl = document.querySelector('[data-about-why]');
    if (whyEl) {
      whyEl.textContent = config.about.whyExists;
    }
    
    document.title = `About · ${config.brand.name}`;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.content = `Learn about ${config.brand.name} and our journey to create ${config.product.name}`;
  }

  function initMobileMenu() {
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const nav = document.querySelector('.nav');
    if (menuBtn && nav) {
      menuBtn.addEventListener('click', () => {
        menuBtn.classList.toggle('active');
        nav.classList.toggle('active');
      });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      initAbout();
      initMobileMenu();
    });
  } else {
    initAbout();
    initMobileMenu();
  }
})();