(function() {
  "use strict";
  
  // Get config from global scope with fallback
  const config = typeof PRODUCT_CONFIG !== 'undefined' ? PRODUCT_CONFIG : {
    brand: { name: "LUXE" },
    product: { name: "Aura Headphones", shortName: "Aura", priceFormatted: "₹24,999" },
    payment: { upiId: "luxe.payments@okhdfcbank", whatsappNumber: "919876543210", qrCodePath: "assets/qr.png" },
    images: { mainProduct: "assets/product.jpg" }
  };
  
  console.log('Config loaded:', config.brand.name);
  
  // ============================================
  // DYNAMIC CONTENT POPULATION
  // ============================================
  function populateDynamicContent() {
    // Brand name
    document.querySelectorAll('[data-brand]').forEach(function(el) {
      if (el) el.textContent = config.brand.name;
    });
    
    // Copyright year
    document.querySelectorAll('[data-copyright-year]').forEach(function(el) {
      if (el) el.textContent = new Date().getFullYear();
    });
    
    // Product name
    document.querySelectorAll('[data-product-name]').forEach(function(el) {
      if (el) el.textContent = config.product.name;
    });
    
    // Product price
    document.querySelectorAll('[data-product-price]').forEach(function(el) {
      if (el) el.textContent = config.product.priceFormatted;
    });
    
    // Main product image
    var mainImage = document.querySelector('[data-main-image]');
    if (mainImage && config.images) {
      mainImage.src = config.images.mainProduct;
    }
  }
  
  populateDynamicContent();

  // ============================================
  // ORDER PAGE LOGIC
  // ============================================
  var formSection = document.getElementById('orderFormSection');
  var paymentSection = document.getElementById('paymentSection');
  var instructionSection = document.getElementById('instructionSection');
  
  // If not on order page, exit
  if (!formSection || !paymentSection || !instructionSection) {
    console.log('Not on order page');
    return;
  }

  console.log('Order page initialized');

  var form = document.getElementById('customerForm');
  var downloadBtn = document.getElementById('downloadQrBtn');
  var upiIdElement = document.getElementById('upiIdDisplay');
  var qrImage = document.getElementById('qrImage');
  
  var orderData = {};

  // Set UPI ID and QR
  if (upiIdElement && config.payment) {
    upiIdElement.textContent = config.payment.upiId;
  }
  if (qrImage && config.payment) {
    qrImage.src = config.payment.qrCodePath;
  }

  // ============================================
  // STEP 1: FORM SUBMIT
  // ============================================
  if (form) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      console.log('Form submitted');
      
      var pincode = document.getElementById('pincode');
      var city = document.getElementById('city');
      var state = document.getElementById('state');
      var flatNo = document.getElementById('flatNo');
      var area = document.getElementById('area');
      var fullName = document.getElementById('fullName');
      var email = document.getElementById('email');
      var phone = document.getElementById('phone');
      
      if (!pincode || !city || !state || !flatNo || !area || !fullName || !email || !phone) {
        alert('Form fields missing');
        return;
      }
      
      var pincodeVal = pincode.value.trim();
      var cityVal = city.value.trim();
      var stateVal = state.value.trim();
      var flatNoVal = flatNo.value.trim();
      var areaVal = area.value.trim();
      var nameVal = fullName.value.trim();
      var emailVal = email.value.trim();
      var phoneVal = phone.value.trim();
      
      if (!pincodeVal || !cityVal || !stateVal || !flatNoVal || !areaVal || !nameVal || !emailVal || !phoneVal) {
        alert('Please fill in all required fields');
        return;
      }
      
      if (phoneVal.length < 10) {
        alert('Please enter a valid phone number');
        return;
      }
      
      orderData = {
        name: nameVal,
        email: emailVal,
        phone: phoneVal,
        address: flatNoVal + ', ' + areaVal + ', ' + cityVal + ', ' + stateVal + ' - ' + pincodeVal
      };
      
      console.log('Order saved:', orderData);
      
      // Save to storage
      try {
        sessionStorage.setItem('luxeOrderData', JSON.stringify(orderData));
      } catch (err) {}
      
      // Hide form, show payment
      formSection.style.display = 'none';
      formSection.classList.add('hidden');
      paymentSection.style.display = 'block';
      paymentSection.classList.remove('hidden');
      
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ============================================
  // UPI COPY BUTTON
  // ============================================
  if (upiIdElement) {
    var copyBtn = document.createElement('button');
    copyBtn.className = 'copy-upi-btn';
    copyBtn.innerHTML = '📋 Copy UPI ID';
    copyBtn.style.cssText = 'margin-top:12px;padding:14px 18px;background:#f3f4f6;border:1px solid #e5e7eb;border-radius:30px;font-size:1rem;font-weight:500;cursor:pointer;width:100%;';
    upiIdElement.parentElement.appendChild(copyBtn);
    
    copyBtn.addEventListener('click', function() {
      var upiId = upiIdElement.textContent.trim();
      
      // Try modern clipboard API
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(upiId).then(function() {
          copyBtn.innerHTML = '✓ Copied!';
          copyBtn.style.background = '#059669';
          copyBtn.style.color = 'white';
          setTimeout(function() {
            copyBtn.innerHTML = '📋 Copy UPI ID';
            copyBtn.style.background = '#f3f4f6';
            copyBtn.style.color = 'inherit';
          }, 2000);
        }).catch(function() {
          fallbackCopy();
        });
      } else {
        fallbackCopy();
      }
      
      function fallbackCopy() {
        var textarea = document.createElement('textarea');
        textarea.value = upiId;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
        copyBtn.innerHTML = '✓ Copied!';
        setTimeout(function() {
          copyBtn.innerHTML = '📋 Copy UPI ID';
        }, 2000);
      }
    });
  }

  // ============================================
  // DOWNLOAD QR -> STEP 3
  // ============================================
  if (downloadBtn) {
    downloadBtn.addEventListener('click', function() {
      console.log('Download QR clicked');
      
      if (!qrImage || !qrImage.src) {
        alert('QR code not found');
        return;
      }
      
      var btn = this;
      var originalText = btn.innerHTML;
      btn.innerHTML = '⏳ Downloading...';
      btn.disabled = true;
      
      // Try fetch API
      fetch(qrImage.src)
        .then(function(res) { return res.blob(); })
        .then(function(blob) {
          var url = URL.createObjectURL(blob);
          var a = document.createElement('a');
          a.href = url;
          a.download = 'LUXE_UPI_QR.png';
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          URL.revokeObjectURL(url);
          
          btn.innerHTML = originalText;
          btn.disabled = false;
          
          moveToStep3();
        })
        .catch(function() {
          // Fallback
          var a = document.createElement('a');
          a.href = qrImage.src;
          a.download = 'LUXE_UPI_QR.png';
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          
          btn.innerHTML = originalText;
          btn.disabled = false;
          
          moveToStep3();
        });
    });
  }
  
  function moveToStep3() {
    paymentSection.style.display = 'none';
    paymentSection.classList.add('hidden');
    instructionSection.style.display = 'block';
    instructionSection.classList.remove('hidden');
    
    setupStep3Buttons();
    
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // ============================================
  // SETUP STEP 3 BUTTONS
  // ============================================
  function setupStep3Buttons() {
    console.log('Setting up step 3 buttons');
    
    var paymentDoneBtn = document.getElementById('paymentDoneBtn');
    var cancelOrderBtn = document.getElementById('cancelOrderBtn');
    
    // Load saved order data
    try {
      var saved = sessionStorage.getItem('luxeOrderData');
      if (saved) {
        orderData = JSON.parse(saved);
        console.log('Loaded order:', orderData);
      }
    } catch (err) {}
    
    // Remove old listeners by replacing buttons
    if (paymentDoneBtn) {
      var newPaymentBtn = paymentDoneBtn.cloneNode(true);
      paymentDoneBtn.parentNode.replaceChild(newPaymentBtn, paymentDoneBtn);
      
      newPaymentBtn.addEventListener('click', function(e) {
        e.preventDefault();
        console.log('Payment Done clicked');
        
        if (!orderData.name || !orderData.phone || !orderData.address) {
          alert('Order information missing. Please refresh.');
          return;
        }
        
        var brandName = config.brand.name;
        var waNumber = config.payment.whatsappNumber;
        
        var message = 'Hello ' + brandName + ', I have completed payment and sending screenshot.%0A%0A';
        message += '*Name:* ' + orderData.name + '%0A';
        message += '*Phone:* ' + orderData.phone + '%0A';
        message += '*Email:* ' + (orderData.email || 'N/A') + '%0A';
        message += '*Address:* ' + orderData.address + '%0A%0A';
        message += '(Please attach payment screenshot)';
        
        var waUrl = 'https://wa.me/' + waNumber + '?text=' + message;
        console.log('Opening:', waUrl);
        
        window.open(waUrl, '_blank');
        
        // Show success
        var msg = document.createElement('p');
        msg.className = 'success-message';
        msg.style.cssText = 'color:#059669;margin-top:16px;font-weight:500;text-align:center;';
        msg.textContent = '✓ Thank you! Please send screenshot on WhatsApp.';
        newPaymentBtn.parentNode.appendChild(msg);
      });
    }
    
    if (cancelOrderBtn) {
      var newCancelBtn = cancelOrderBtn.cloneNode(true);
      cancelOrderBtn.parentNode.replaceChild(newCancelBtn, cancelOrderBtn);
      
      newCancelBtn.addEventListener('click', function(e) {
        e.preventDefault();
        console.log('Cancel clicked');
        
        var msg = 'I want to cancel my order';
        if (orderData.name) msg += ' for ' + orderData.name;
        if (orderData.phone) msg += ' (' + orderData.phone + ')';
        
        var waNumber = config.payment.whatsappNumber;
        var waUrl = 'https://wa.me/' + waNumber + '?text=' + encodeURIComponent(msg);
        
        window.open(waUrl, '_blank');
      });
    }
    
    console.log('Step 3 ready');
  }

  console.log('Checkout ready');
  
})();

// Active nav
document.addEventListener('DOMContentLoaded', function() {
  var currentPage = window.location.pathname.split('/').pop() || 'index.html';
  var links = document.querySelectorAll('.nav-link');
  for (var i = 0; i < links.length; i++) {
    if (links[i].getAttribute('href') === currentPage) {
      links[i].classList.add('active');
    }
  }
});
