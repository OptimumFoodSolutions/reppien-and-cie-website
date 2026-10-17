/* Reppien & Cie – site.js
   Menu (hamburger + "Who are we"-dropdown), aktivt menupunkt, fade-in, scroll-til-top, årstal og mailto-formular.
   Ingen eksterne kald. Bump ?v= i alle sider, når filen ændres. */
(function () {
  'use strict';
  document.documentElement.classList.add('js');

  // --- Hamburger ---
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.querySelector('.nav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  }

  // --- Dropdown ("Who are we") ---
  document.querySelectorAll('.nav .has-sub').forEach(function (li) {
    var btn = li.querySelector('.sub-toggle');
    if (!btn) return;
    btn.addEventListener('click', function (e) {
      e.stopPropagation();
      var open = li.classList.toggle('open');
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    // Hover på desktop
    li.addEventListener('mouseenter', function () { if (window.innerWidth > 1024) { li.classList.add('open'); btn.setAttribute('aria-expanded', 'true'); } });
    li.addEventListener('mouseleave', function () { if (window.innerWidth > 1024) { li.classList.remove('open'); btn.setAttribute('aria-expanded', 'false'); } });
  });
  document.addEventListener('click', function (e) {
    if (!e.target.closest('.nav')) {
      document.querySelectorAll('.nav .has-sub.open').forEach(function (li) { li.classList.remove('open'); });
    }
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      document.querySelectorAll('.nav .has-sub.open').forEach(function (li) { li.classList.remove('open'); });
      if (nav) nav.classList.remove('open');
    }
  });

  // --- Aktivt menupunkt ---
  var path = location.pathname.replace(/index\.html$/, '');
  document.querySelectorAll('.nav a').forEach(function (a) {
    var href = a.getAttribute('href') || '';
    var target = a.pathname.replace(/index\.html$/, '');
    if (target === path && href !== '#') {
      a.classList.add('active');
      var parent = a.closest('.has-sub');
      if (parent) parent.querySelector('.sub-toggle').classList.add('active');
    }
  });

  // --- Fade-in ---
  var fades = document.querySelectorAll('.fade');
  if ('IntersectionObserver' in window && fades.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); } });
    }, { threshold: 0.1 });
    fades.forEach(function (el) { io.observe(el); });
  } else {
    fades.forEach(function (el) { el.classList.add('in'); });
  }

  // --- Scroll-til-top ---
  var top = document.querySelector('.to-top');
  if (top) {
    window.addEventListener('scroll', function () { top.classList.toggle('show', window.scrollY > 400); }, { passive: true });
    top.addEventListener('click', function () { window.scrollTo({ top: 0, behavior: 'smooth' }); });
  }

  // --- Årstal i footer ---
  document.querySelectorAll('.year').forEach(function (el) { el.textContent = new Date().getFullYear(); });

  // --- Kontaktformular (mailto – sitet er statisk) ---
  var form = document.querySelector('.form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var v = function (n) { var el = form.querySelector('[name="' + n + '"]'); return el ? el.value.trim() : ''; };
      var insights = form.querySelector('[name="insights"]');
      var name = (v('first') + ' ' + v('last')).trim();
      var subject = 'Message from ' + (name || 'the website');
      var body = 'Name: ' + name + '\nCountry: ' + v('country') + '\nE-mail: ' + v('email') + '\n' +
        'Insights mailing list: ' + (insights && insights.checked ? 'yes' : 'no') + '\n\n' + v('message');
      location.href = 'mailto:' + form.getAttribute('data-to') + '?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
    });
  }
})();
