
(function() {
  'use strict';

  function getConfig() {
    if (typeof PRODUCT_CONFIG !== 'undefined') {
      return PRODUCT_CONFIG;
    }
    return null;
  }

  function initContact() {
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

    // Contact page specific content
    const whatsappLink = document.getElementById('whatsappLink');
    if (whatsappLink) {
      whatsappLink.href = `https://wa.me/${config.payment.whatsappNumber}?text=Hello%20${config.brand.name}%2C%20I%20have%20a%20question%20about%20${config.product.name}`;
      whatsappLink.textContent = config.contact.whatsapp;
    }
    
    const contactEmail = document.getElementById('contactEmail');
    if (contactEmail) {
      contactEmail.innerHTML = `<a href="mailto:${config.contact.email}">${config.contact.email}</a>`;
    }
    
    const contactLocations = document.getElementById('contactLocations');
    if (contactLocations) {
      contactLocations.innerHTML = config.contact.locations.join(' · ') + ' · By appointment only';
    }
    
    document.title = `Contact · ${config.brand.name}`;
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
      initContact();
      initMobileMenu();
    });
  } else {
    initContact();
    initMobileMenu();
  }
})();