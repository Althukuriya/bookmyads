
(function() {
  'use strict';

  let config = null;
  let orderData = {};

  function getConfig() {
    if (typeof PRODUCT_CONFIG !== 'undefined') {
      return PRODUCT_CONFIG;
    }
    return null;
  }

  function initHeaderAndFooter(cfg) {
    document.querySelectorAll('[data-logo], [data-footer-logo]').forEach(el => {
      el.src = cfg.images.logo;
      el.alt = cfg.brand.name;
    });
    document.querySelectorAll('[data-brand-name]').forEach(el => {
      el.textContent = cfg.brand.name;
    });
    document.querySelectorAll('[data-brand-tagline]').forEach(el => {
      el.textContent = cfg.brand.tagline;
    });
    document.querySelectorAll('[data-copyright-year]').forEach(el => {
      el.textContent = new Date().getFullYear();
    });
    
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

  function initCheckout() {
    config = getConfig();
    if (!config) return;
    
    initHeaderAndFooter(config);
    
    const formSection = document.getElementById('orderFormSection');
    const paymentSection = document.getElementById('paymentSection');
    const instructionSection = document.getElementById('instructionSection');
    const continueBtn = document.getElementById('continueToPaymentBtn');
    const downloadBtn = document.getElementById('downloadQrBtn');
    const paymentDoneBtn = document.getElementById('paymentDoneBtn');
    const cancelOrderBtn = document.getElementById('cancelOrderBtn');
    const upiDisplay = document.getElementById('upiIdDisplay');
    const qrImage = document.getElementById('qrImage');
    
    if (upiDisplay) upiDisplay.textContent = config.payment.upiId;
    if (qrImage) qrImage.src = config.payment.qrCodePath;
    
    // Copy UPI button
    if (upiDisplay) {
      const copyBtn = document.createElement('button');
      copyBtn.textContent = 'Copy UPI ID';
      copyBtn.className = 'copy-upi-btn';
      copyBtn.onclick = function() {
        navigator.clipboard.writeText(upiDisplay.textContent).then(() => {
          copyBtn.textContent = 'Copied!';
          setTimeout(() => { copyBtn.textContent = 'Copy UPI ID'; }, 2000);
        });
      };
      upiDisplay.parentNode.appendChild(copyBtn);
    }
    
    // Step 1: Continue to payment
    if (continueBtn) {
      continueBtn.addEventListener('click', function() {
        const fullName = document.getElementById('fullName');
        const email = document.getElementById('email');
        const phone = document.getElementById('phone');
        const pincode = document.getElementById('pincode');
        const city = document.getElementById('city');
        const state = document.getElementById('state');
        const flatNo = document.getElementById('flatNo');
        const area = document.getElementById('area');
        
        if (!fullName.value || !email.value || !phone.value || !pincode.value || 
            !city.value || !state.value || !flatNo.value || !area.value) {
          alert('Please fill all required fields');
          return;
        }
        
        if (phone.value.length < 10) {
          alert('Please enter a valid phone number');
          return;
        }
        
        orderData = {
          name: fullName.value,
          email: email.value,
          phone: phone.value,
          address: `${flatNo.value}, ${area.value}, ${city.value}, ${state.value} - ${pincode.value}`
        };
        
        try {
          sessionStorage.setItem('orderData', JSON.stringify(orderData));
        } catch(e) {}
        
        formSection.classList.add('hidden');
        paymentSection.classList.remove('hidden');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }
    
    // Step 2: Download QR
    if (downloadBtn && qrImage) {
      downloadBtn.addEventListener('click', function() {
        const link = document.createElement('a');
        link.href = qrImage.src;
        link.download = `${config.brand.name}_UPI_QR.png`;
        link.click();
        
        paymentSection.classList.add('hidden');
        instructionSection.classList.remove('hidden');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }
    
    // Step 3: Payment done
    if (paymentDoneBtn) {
      paymentDoneBtn.addEventListener('click', function() {
        try {
          const saved = sessionStorage.getItem('orderData');
          if (saved) orderData = JSON.parse(saved);
        } catch(e) {}
        
        if (!orderData.name) {
          alert('Order information missing. Please refresh and try again.');
          return;
        }
        
        let message = `Hello ${config.brand.name}, I have completed the payment.%0A%0A`;
        message += `Name: ${orderData.name}%0A`;
        message += `Phone: ${orderData.phone}%0A`;
        message += `Email: ${orderData.email}%0A`;
        message += `Address: ${orderData.address}%0A%0A`;
        message += `(Attaching payment screenshot)`;
        
        const waUrl = `https://wa.me/${config.payment.whatsappNumber}?text=${message}`;
        window.open(waUrl, '_blank');
        
        alert(`Thank you! Please send the payment screenshot on WhatsApp for order confirmation.`);
      });
    }
    
    // Cancel order
    if (cancelOrderBtn) {
      cancelOrderBtn.addEventListener('click', function() {
        let message = 'I want to cancel my order';
        if (orderData.name) message += ` for ${orderData.name}`;
        const waUrl = `https://wa.me/${config.payment.whatsappNumber}?text=${encodeURIComponent(message)}`;
        window.open(waUrl, '_blank');
      });
    }
  }
  
  // Mobile menu
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
      initCheckout();
      initMobileMenu();
    });
  } else {
    initCheckout();
    initMobileMenu();
  }
})();