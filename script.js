document.addEventListener('DOMContentLoaded', function() {
  var form = document.querySelector('.news-form');
  if (form) {
    var consent = document.getElementById('cookie-consent');
    var submitBtn = form.querySelector('.button');
    if (consent && submitBtn) {
      var persisted = localStorage.getItem('cookieConsentNewsletter');
      if (persisted !== null) {
        consent.checked = persisted === 'true';
      }
      submitBtn.disabled = !consent.checked;
      consent.addEventListener('change', function() {
        submitBtn.disabled = !consent.checked;
        localStorage.setItem('cookieConsentNewsletter', consent.checked ? 'true' : 'false');
      });
    }
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      if (consent && !consent.checked) {
        alert('Per proseguire, devi accettare i cookie.');
        return;
      }
      var input = form.querySelector('input[type="email"]');
      if (input && input.value.trim()) {
        alert('Grazie per l’iscrizione: ' + input.value.trim());
        input.value = '';
        if (consent) {
          consent.checked = false;
          submitBtn && (submitBtn.disabled = true);
          localStorage.setItem('cookieConsentNewsletter', 'false');
        }
      }
    });
  }

  var consentToggle = document.getElementById('consent-toggle');
  if (consentToggle) {
    var persistedToggle = localStorage.getItem('cookieConsentNewsletter');
    if (persistedToggle !== null) {
      consentToggle.checked = persistedToggle === 'true';
    }
    consentToggle.addEventListener('change', function() {
      localStorage.setItem('cookieConsentNewsletter', consentToggle.checked ? 'true' : 'false');
      alert('Preferenza aggiornata: ' + (consentToggle.checked ? 'consenso attivo' : 'consenso disattivato'));
    });
  }

  var pulse = function(el) {
    el.classList.add('is-active');
    setTimeout(function() { el.classList.remove('is-active'); }, 900);
  };

  document.querySelectorAll('.info-box, .sub-card, .news-card').forEach(function(el) {
    el.addEventListener('click', function() { pulse(el); });
    el.addEventListener('keydown', function(e) {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); pulse(el); }
    });
  });

  var galleryItems = document.querySelectorAll('.gallery-grid .gallery-item');
  if (galleryItems && galleryItems.length) {
    var lightbox = document.getElementById('lightbox');
    var lightboxImg = document.getElementById('lightbox-image');
    var btnClose = document.querySelector('.lightbox-close');
    var btnPrev = document.querySelector('.lightbox-prev');
    var btnNext = document.querySelector('.lightbox-next');
    var sources = Array.prototype.map.call(galleryItems, function(img) { return img.getAttribute('src'); });
    var alts = Array.prototype.map.call(galleryItems, function(img) { return img.getAttribute('alt') || ''; });
    var current = 0;

    var openAt = function(i) {
      current = i;
      lightboxImg.src = sources[current];
      lightboxImg.alt = alts[current];
      lightbox.classList.add('is-open');
      document.body.style.overflow = 'hidden';
    };
    var close = function() {
      lightbox.classList.remove('is-open');
      document.body.style.overflow = '';
    };
    var next = function() { openAt((current + 1) % sources.length); };
    var prev = function() { openAt((current - 1 + sources.length) % sources.length); };

    galleryItems.forEach(function(img, i) {
      img.style.cursor = 'pointer';
      img.addEventListener('click', function() { openAt(i); });
    });
    if (btnClose) btnClose.addEventListener('click', close);
    if (btnNext) btnNext.addEventListener('click', next);
    if (btnPrev) btnPrev.addEventListener('click', prev);
    if (lightbox) {
      lightbox.addEventListener('click', function(e) { if (e.target === lightbox) close(); });
    }
    document.addEventListener('keydown', function(e) {
      if (!lightbox.classList.contains('is-open')) return;
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowRight') next();
      if (e.key === 'ArrowLeft') prev();
    });
  }
});