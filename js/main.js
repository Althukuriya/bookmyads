
(function() {
  'use strict';

  let config = null;

  // Helper to get config
  function getConfig() {
    if (typeof PRODUCT_CONFIG !== 'undefined') {
      return PRODUCT_CONFIG;
    }
    console.warn('PRODUCT_CONFIG not found');
    return null;
  }

  // Populate all dynamic content
  function populateSite(cfg) {
    if (!cfg) return;
    config = cfg;

    // Update SEO
    document.title = cfg.seo.title;
    const metaDesc = document.querySelector('meta[name="description"]');
    const metaKeywords = document.querySelector('meta[name="keywords"]');
    if (metaDesc) metaDesc.content = cfg.seo.description;
    if (metaKeywords) metaKeywords.content = cfg.seo.keywords;

    // Brand elements
    document.querySelectorAll('[data-brand-name]').forEach(el => {
      el.textContent = cfg.brand.name;
    });
    document.querySelectorAll('[data-brand-tagline]').forEach(el => {
      el.textContent = cfg.brand.tagline;
    });
    document.querySelectorAll('[data-copyright-year]').forEach(el => {
      el.textContent = new Date().getFullYear();
    });

    // Logo images
    document.querySelectorAll('[data-logo], [data-footer-logo]').forEach(el => {
      el.src = cfg.images.logo;
      el.alt = cfg.brand.name;
    });

    // Product elements
    document.querySelectorAll('[data-product-name]').forEach(el => {
      el.innerHTML = cfg.product.name.replace(' ', '<br>');
    });
    document.querySelectorAll('[data-product-shortname]').forEach(el => {
      el.textContent = cfg.product.shortName;
    });
    document.querySelectorAll('[data-product-badge]').forEach(el => {
      el.textContent = cfg.product.badge;
    });
    document.querySelectorAll('[data-product-tagline]').forEach(el => {
      el.textContent = cfg.product.tagline;
    });
    document.querySelectorAll('[data-product-price]').forEach(el => {
      el.textContent = cfg.product.priceFormatted;
    });
    document.querySelectorAll('[data-product-description]').forEach(el => {
      el.textContent = cfg.product.description;
    });
    document.querySelectorAll('[data-section-title]').forEach(el => {
      el.textContent = cfg.product.sectionTitle;
    });

    // Main product images
    document.querySelectorAll('[data-main-image], [data-main-image-gallery]').forEach(el => {
      el.src = cfg.images.mainProduct;
      el.alt = cfg.product.name;
    });

    // Benefits
    const benefitsContainer = document.querySelector('[data-benefits-container]');
    if (benefitsContainer) {
      benefitsContainer.innerHTML = '';
      cfg.product.benefits.forEach(benefit => {
        const card = document.createElement('div');
        card.className = 'benefit-card';
        card.innerHTML = `
          <div class="benefit-icon">${getIconSvg(benefit.icon)}</div>
          <h3>${benefit.title}</h3>
          <p>${benefit.description}</p>
        `;
        benefitsContainer.appendChild(card);
      });
    }

    // Features
    const featuresContainer = document.querySelector('[data-features-container]');
    if (featuresContainer) {
      featuresContainer.innerHTML = '';
      cfg.product.features.forEach(feature => {
        const li = document.createElement('li');
        li.innerHTML = `<span class="feature-marker">●</span> ${feature}`;
        featuresContainer.appendChild(li);
      });
    }

    // Trust badges
    const trustContainer = document.querySelector('[data-trust-container]');
    if (trustContainer) {
      trustContainer.innerHTML = '';
      cfg.product.trustBadges.forEach(badge => {
        const item = document.createElement('div');
        item.className = 'trust-item';
        item.innerHTML = `
          <span class="trust-icon">${getIconSvg(badge.icon)}</span>
          <div>
            <h4>${badge.title}</h4>
            <p>${badge.description}</p>
          </div>
        `;
        trustContainer.appendChild(item);
      });
    }

    // Gallery
    const galleryContainer = document.querySelector('[data-gallery-container]');
    const mainGalleryImg = document.querySelector('[data-main-image-gallery]');
    if (galleryContainer && cfg.images.gallery && cfg.images.gallery.length > 0) {
      galleryContainer.innerHTML = '';
      cfg.images.gallery.forEach((imgSrc, index) => {
        const img = document.createElement('img');
        img.src = imgSrc;
        img.alt = `${cfg.product.name} view ${index + 1}`;
        img.className = 'gallery-image';
        img.loading = 'lazy';
        img.onclick = () => {
          if (mainGalleryImg) {
            mainGalleryImg.style.opacity = '0';
            setTimeout(() => {
              mainGalleryImg.src = imgSrc;
              mainGalleryImg.style.opacity = '1';
            }, 200);
          }
        };
        galleryContainer.appendChild(img);
      });
    }

    // Video section
    const videoSection = document.querySelector('[data-video-section]');
    if (cfg.video && cfg.video.enabled && cfg.video.videoUrl) {
      if (videoSection) {
        videoSection.style.display = 'block';
        document.querySelector('[data-video-title]').textContent = cfg.video.title;
        document.querySelector('[data-video-desc]').textContent = cfg.video.description;
        const videoEl = document.querySelector('[data-video]');
        if (videoEl) {
          videoEl.src = cfg.video.videoUrl;
          videoEl.poster = cfg.video.posterImage;
        }
      }
    }

    // Footer WhatsApp and Email links
    const waLinks = document.querySelectorAll('[data-whatsapp-link]');
    waLinks.forEach(link => {
      link.href = `https://wa.me/${cfg.payment.whatsappNumber}?text=Hello%20${cfg.brand.name}%2C%20I%20have%20a%20question`;
      link.textContent = cfg.contact.whatsapp;
    });

    const emailLinks = document.querySelectorAll('[data-email-link]');
    emailLinks.forEach(link => {
      link.href = `mailto:${cfg.contact.email}`;
      link.textContent = cfg.contact.email;
    });
  }

  // Icon mapping function
  function getIconSvg(iconName) {
    const icons = {
      headphones: '<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M3 18v-6a9 9 0 0 1 18 0v6"/><path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"/></svg>',
      battery: '<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="6" y="6" width="14" height="11" rx="2" ry="2"/><line x1="4" y1="11" x2="6" y2="11"/><line x1="4" y1="8" x2="6" y2="8"/><line x1="4" y1="14" x2="6" y2="14"/><path d="M22 9v6"/></svg>',
      spatial: '<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="3"/><path d="M19.4 4.6C18.3 4 17.1 3.5 16 3.5M4.6 4.6C5.7 4 6.9 3.5 8 3.5M19.4 19.4C18.3 20 17.1 20.5 16 20.5M4.6 19.4C5.7 20 6.9 20.5 8 20.5"/><path d="M20 12h2M2 12h2M12 2V4M12 20v2"/></svg>',
      mic: '<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="22"/></svg>',
      shield: '<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>',
      truck: '<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>',
      support: '<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>'
    };
    return icons[iconName] || icons.headphones;
  }

  // Lightbox functionality
  function initLightbox() {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightboxImg');
    const closeBtn = document.querySelector('.lightbox-close');
    
    if (!lightbox || !lightboxImg) return;
    
    window.openLightbox = function(src) {
      lightboxImg.src = src;
      lightbox.classList.add('active');
      document.body.style.overflow = 'hidden';
    };
    
    window.closeLightbox = function() {
      lightbox.classList.remove('active');
      document.body.style.overflow = '';
    };
    
    if (closeBtn) {
      closeBtn.onclick = window.closeLightbox;
    }
    
    lightbox.onclick = function(e) {
      if (e.target === lightbox) window.closeLightbox();
    };
    
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') window.closeLightbox();
    });
    
    const mainImages = document.querySelectorAll('[data-main-image-gallery]');
    mainImages.forEach(img => {
      img.onclick = () => window.openLightbox(img.src);
    });
  }

  // Mobile menu toggle
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

  // Initialize site
  function init() {
    const cfg = getConfig();
    if (cfg) {
      populateSite(cfg);
    }
    initLightbox();
    initMobileMenu();
  }

  // Expose init function globally
  window.initSite = populateSite;
  
  // Run initialization
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();