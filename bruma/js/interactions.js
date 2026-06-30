/* ============================================================
   interactions.js — progreso de scroll, reveal, FAQ, nav,
   smooth scroll
   ============================================================ */
(function () {
  'use strict';

  // --- Barra de progreso + nav ---
  var progress = document.getElementById('scrollProgress');
  var nav = document.getElementById('nav');

  function onScroll() {
    var max = document.documentElement.scrollHeight - window.innerHeight;
    var pct = max > 0 ? (window.scrollY / max) * 100 : 0;
    if (progress) progress.style.width = pct + '%';
    if (nav) nav.classList.toggle('is-scrolled', window.scrollY > 24);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // --- Scroll reveal ---
  var revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('is-visible'); });
  }

  // --- Acordeón FAQ (solo uno abierto a la vez) ---
  var faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(function (item) {
    var btn = item.querySelector('.faq-q');
    var ans = item.querySelector('.faq-a');
    if (!btn || !ans) return;

    btn.addEventListener('click', function () {
      var isOpen = item.classList.contains('is-open');

      faqItems.forEach(function (other) {
        other.classList.remove('is-open');
        var oa = other.querySelector('.faq-a');
        var ob = other.querySelector('.faq-q');
        if (oa) oa.style.maxHeight = null;
        if (ob) ob.setAttribute('aria-expanded', 'false');
      });

      if (!isOpen) {
        item.classList.add('is-open');
        btn.setAttribute('aria-expanded', 'true');
        ans.style.maxHeight = ans.scrollHeight + 'px';
      }
    });
  });

  window.addEventListener('resize', function () {
    var open = document.querySelector('.faq-item.is-open .faq-a');
    if (open) open.style.maxHeight = open.scrollHeight + 'px';
  });

  // --- Smooth scroll en anclas internas ---
  var navHeight = 72;
  document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener('click', function (e) {
      var id = link.getAttribute('href');
      if (id === '#' || id.length < 2) return;
      var target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      var y = target.getBoundingClientRect().top + window.scrollY - navHeight + 1;
      window.scrollTo({ top: Math.max(y, 0), behavior: 'smooth' });
    });
  });
})();
