/* ==========================================================================
   Gentleman Sailing — čo zažijete na regate?
   Nav scroll + mobile menu + SK/EN toggle (structural labels)
   ========================================================================== */
(function () {
  'use strict';

  var DICT = {
    nav_home: { sk: 'Domov', en: 'Home' },
    ev_info: { sk: 'Ako sa pripraviť na regatu', en: 'How to prepare' },
    ev_events: { sk: 'Eventy & teambuildingy', en: 'Events & teambuilding' },
    ev_partners: { sk: 'Partneri', en: 'Partners' },
    ev_signup: { sk: 'Prihláška', en: 'Sign up' },

    z_eyebrow: { sk: 'Čo zažijete na regate', en: 'What you’ll experience' },

    foot_tagline: { sk: 'Regata s noblesou a 19-ročnou tradíciou. Organizuje NautiTech, s.r.o.', en: 'A regatta of nobility with a 19-year tradition. Organised by NautiTech, s.r.o.' },
    foot_email_label: { sk: 'E-mail', en: 'E-mail' },
    foot_phone_label: { sk: 'Telefón', en: 'Phone' },
    foot_social_label: { sk: 'Sledujte nás', en: 'Follow us' },
    back: { sk: '← Späť na hlavnú stránku', en: '← Back to homepage' }
  };

  var lang = 'sk';

  function applyLang() {
    document.documentElement.lang = lang;
    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      var k = el.getAttribute('data-i18n');
      if (DICT[k]) el.textContent = DICT[k][lang];
    });
    var toggle = document.getElementById('langToggle');
    if (toggle) toggle.textContent = lang === 'sk' ? 'SK / en' : 'sk / EN';
  }

  var langToggle = document.getElementById('langToggle');
  if (langToggle) {
    langToggle.addEventListener('click', function () {
      lang = lang === 'sk' ? 'en' : 'sk';
      applyLang();
    });
  }

  var nav = document.getElementById('nav');
  function onScroll() {
    if (!nav) return;
    if (window.scrollY > 40) nav.classList.add('is-scrolled');
    else nav.classList.remove('is-scrolled');
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  var burger = document.getElementById('burger');
  var navLinks = document.getElementById('navLinks');
  if (burger && nav) {
    burger.addEventListener('click', function () {
      var open = nav.classList.toggle('is-open');
      burger.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  }
  if (navLinks) {
    navLinks.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        nav.classList.remove('is-open');
        if (burger) burger.setAttribute('aria-expanded', 'false');
      });
    });
  }

  applyLang();
})();
