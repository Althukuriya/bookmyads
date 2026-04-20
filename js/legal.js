
(function() {
  'use strict';

  function getConfig() {
    if (typeof PRODUCT_CONFIG !== 'undefined') {
      return PRODUCT_CONFIG;
    }
    return null;
  }

  function formatLegalContent(text) {
    if (!text) return '';
    return text.split('\n\n').map(paragraph => {
      if (paragraph.includes('\n')) {
        const parts = paragraph.split('\n');
        return `<p>${parts.join('<br>')}</p>`;
      }
      return `<p>${paragraph}</p>`;
    }).join('');
  }

  function initLegal() {
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

    const pagePath = window.location.pathname.split('/').pop();
    const effectiveDate = `Effective: ${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long' })}`;
    
    if (pagePath === 'privacy.html') {
      const effectiveEl = document.querySelector('[data-privacy-effective]');
      if (effectiveEl) effectiveEl.textContent = effectiveDate;
      const contentEl = document.querySelector('[data-privacy-content]');
      if (contentEl) contentEl.innerHTML = formatLegalContent(config.legal.privacy);
      document.title = `Privacy Policy · ${config.brand.name}`;
    } else if (pagePath === 'terms.html') {
      const effectiveEl = document.querySelector('[data-terms-effective]');
      if (effectiveEl) effectiveEl.textContent = effectiveDate;
      const contentEl = document.querySelector('[data-terms-content]');
      if (contentEl) contentEl.innerHTML = formatLegalContent(config.legal.terms);
      document.title = `Terms of Service · ${config.brand.name}`;
    } else if (pagePath === 'refund.html') {
      const effectiveEl = document.querySelector('[data-refund-effective]');
      if (effectiveEl) effectiveEl.textContent = effectiveDate;
      const contentEl = document.querySelector('[data-refund-content]');
      if (contentEl) contentEl.innerHTML = formatLegalContent(config.legal.refund);
      document.title = `Refund Policy · ${config.brand.name}`;
    }
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
      initLegal();
      initMobileMenu();
    });
  } else {
    initLegal();
    initMobileMenu();
  }
})();