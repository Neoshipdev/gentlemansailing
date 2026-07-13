/* ==========================================================================
   Gentleman Sailing — partneri (partners page)
   Nav scroll + mobile menu + SK/EN toggle
   ========================================================================== */
(function () {
  'use strict';

  var DICT = {
    nav_home: { sk: 'Domov', en: 'Home' },
    ev_info: { sk: 'Ako sa pripraviť na regatu', en: 'How to prepare' },
    ev_experience: { sk: 'Čo zažijete na regate', en: 'What you’ll experience' },
    ev_events: { sk: 'Eventy & teambuildingy', en: 'Events & teambuilding' },
    ev_gallery: { sk: 'Galéria', en: 'Gallery' },
    ev_partners: { sk: 'Partneri', en: 'Partners' },
    ev_signup: { sk: 'Prihláška', en: 'Sign up' },

    p_eyebrow: { sk: 'Na plavbe nás podporujú', en: 'They support us on the voyage' },
    p_title: { sk: 'Partneri', en: 'Partners' },
    p_lead: { sk: 'Bez našich partnerov by regata nebola tým, čím je. Ďakujeme spoločnostiam, ktoré nám držia vietor v plachtách — z roka na rok, ročník za ročníkom.', en: 'Without our partners the regatta would not be what it is. Thank you to the companies that keep the wind in our sails — year after year, edition after edition.' },

    p_realizator: { sk: 'Realizačný partner', en: 'Organising partner' },
    p_realizator_text: { sk: 'Plavíme sa pod kapitánskym dozorom spoločnosti NautiTech, s.r.o., ktorá sa ujíma organizácie jubilejného 20. ročníka.', en: 'We sail under the captain’s supervision of NautiTech, s.r.o., which takes on the organisation of the 20th jubilee edition.' },

    p_partners_label: { sk: 'Partneri & sponzori', en: 'Partners & sponsors' },

    p_cta_title: { sk: 'Chcete sa stať partnerom?', en: 'Want to become a partner?' },
    p_cta_text: { sk: 'Spojte svoju značku s regatou s 19-ročnou tradíciou a osloviť desiatky firiem na palube i na brehu.', en: 'Connect your brand with a regatta of 19-year tradition and reach dozens of companies on board and ashore.' },
    p_cta_btn: { sk: 'Napíšte nám', en: 'Get in touch' },

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

  /* Nav scroll state */
  var nav = document.getElementById('nav');
  function onScroll() {
    if (!nav) return;
    if (window.scrollY > 40) nav.classList.add('is-scrolled');
    else nav.classList.remove('is-scrolled');
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* Mobile menu */
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
