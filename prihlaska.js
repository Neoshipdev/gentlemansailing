/* ==========================================================================
   Gentleman Sailing — prihláška (application form)
   Nav scroll + mobile menu, SK/EN toggle, client-side validation + submit stub
   ========================================================================== */
(function () {
  'use strict';

  /* ---------- i18n ---------- */
  var DICT = {
    nav_home: { sk: 'Domov', en: 'Home' },
    ev_info: { sk: 'Ako sa pripraviť na regatu', en: 'How to prepare' },
    ev_experience: { sk: 'Čo zažijete na regate', en: 'What you’ll experience' },
    ev_events: { sk: 'Eventy & teambuildingy', en: 'Events & teambuilding' },
    ev_gallery: { sk: 'Galéria', en: 'Gallery' },
    ev_partners: { sk: 'Partneri', en: 'Partners' },

    form_eyebrow: { sk: 'Prihláška · 21. ročník', en: 'Registration · 21st edition' },
    form_title: { sk: 'Prihláste svoju posádku', en: 'Register your crew' },
    form_lead: { sk: 'Vyplňte prihlášku na 21. ročník Gentleman Sailing — máj 2027. Po odoslaní vás budeme kontaktovať s ďalšími pokynmi a platobnými údajmi.', en: 'Fill in the registration for the 21st edition of Gentleman Sailing — May 2027. After submission we will contact you with further instructions and payment details.' },

    fs_fee: { sk: 'Účastnícky poplatok', en: 'Participation fee' },
    opt_boat: { sk: 'Celá loď', en: 'Whole boat' },
    opt_ind: { sk: 'Jednotlivec', en: 'Individual' },

    fs_billing: { sk: 'Fakturačné údaje', en: 'Billing details' },
    l_nazov: { sk: 'Názov spoločnosti / Meno', en: 'Company name / Name' },
    l_adresa: { sk: 'Adresa', en: 'Address' },
    l_ico: { sk: 'IČO', en: 'Company ID (IČO)' },
    l_dic: { sk: 'DIČ', en: 'Tax ID (DIČ)' },
    l_iban: { sk: 'Bankové spojenie (účet v tvare IBAN)', en: 'Bank account (IBAN format)' },

    fs_contact: { sk: 'Kontaktné údaje', en: 'Contact details' },
    l_osoba: { sk: 'Kontaktná osoba', en: 'Contact person' },
    l_tel: { sk: 'Telefón', en: 'Phone' },
    l_email: { sk: 'Email', en: 'Email' },

    fs_crew: { sk: 'Posádka a požiadavky', en: 'Crew and requirements' },
    l_skipper: { sk: 'Požiadavky na skippera', en: 'Skipper required' },
    yes: { sk: 'Áno', en: 'Yes' },
    no: { sk: 'Nie', en: 'No' },
    l_vybava: { sk: 'Požiadavky na doplnkovú výbavu', en: 'Additional equipment requests' },
    l_char: { sk: 'Charakteristika posádky', en: 'Crew profile' },
    ph_char: { sk: 'Napr. skúsenosti s plavbou na plachetnici…', en: 'E.g. sailing experience…' },

    c_week: { sk: 'Chcem loď na celý týždeň (termín upresníme)', en: 'I want the boat for the whole week (dates to be confirmed)' },
    c_gdpr: { sk: 'Súhlasím so spracovaním osobných údajov na účel vybavenia prihlášky. <a href="gdpr.html">Viac informácií</a> <span class="req">*</span>', en: 'I consent to the processing of personal data for the purpose of handling the registration. <a href="gdpr.html">More info</a> <span class="req">*</span>' },

    submit: { sk: 'Odoslať', en: 'Submit' },
    form_note: { sk: 'Po odoslaní vás budeme kontaktovať e-mailom. Platby je potrebné uhradiť najneskôr do 31. 1. 2027.', en: 'After submission we will contact you by e-mail. Payments must be settled no later than 31 January 2027.' },
    success: { sk: 'Ďakujeme! Vaša prihláška bola odoslaná. Čoskoro sa vám ozveme.', en: 'Thank you! Your registration has been sent. We will be in touch shortly.' },

    foot_vop: { sk: 'Všeobecné obchodné podmienky', en: 'Terms and conditions' },
    foot_gdpr: { sk: 'Ochrana osobných údajov', en: 'Privacy policy' },
    foot_tagline: { sk: 'Regata s noblesou a 20-ročnou tradíciou. Organizuje NautiTech, s.r.o.', en: 'A regatta of nobility with a 20-year tradition. Organised by NautiTech, s.r.o.' },
    foot_email_label: { sk: 'E-mail', en: 'E-mail' },
    foot_phone_label: { sk: 'Telefón', en: 'Phone' },
    foot_social_label: { sk: 'Sledujte nás', en: 'Follow us' },
    back: { sk: '← Späť na hlavnú stránku', en: '← Back to homepage' }
  };

  var lang = 'sk';
  try { if (localStorage.getItem('gs-lang') === 'en') lang = 'en'; } catch (e) {}

  function applyLang() {
    document.documentElement.lang = lang;
    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      var k = el.getAttribute('data-i18n');
      if (DICT[k]) el.textContent = DICT[k][lang];
    });
    document.querySelectorAll('[data-i18n-html]').forEach(function (el) {
      var k = el.getAttribute('data-i18n-html');
      if (DICT[k]) el.innerHTML = DICT[k][lang];
    });
    // GDPR label contains markup → render as HTML
    var gdpr = document.querySelector('[data-i18n="c_gdpr"]');
    if (gdpr && DICT.c_gdpr) gdpr.innerHTML = DICT.c_gdpr[lang];
    document.querySelectorAll('[data-i18n-ph]').forEach(function (el) {
      var k = el.getAttribute('data-i18n-ph');
      if (DICT[k]) el.placeholder = DICT[k][lang];
    });
    var toggle = document.getElementById('langToggle');
    if (toggle) toggle.textContent = lang === 'sk' ? 'SK / en' : 'sk / EN';
  }

  var langToggle = document.getElementById('langToggle');
  if (langToggle) {
    langToggle.addEventListener('click', function () {
      lang = lang === 'sk' ? 'en' : 'sk';
      try { localStorage.setItem('gs-lang', lang); } catch (e) {}
      applyLang();
    });
  }

  /* ---------- Nav scroll + mobile menu ---------- */
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

  /* ---------- Form validation + submit ---------- */
  var form = document.getElementById('prihlaskaForm');
  var success = document.getElementById('formSuccess');

  function markInvalid(field, invalid) {
    var el = field.closest ? field.closest('.field, .choice, .check-row') : null;
    if (!el) el = field;
    el.style.setProperty('--x', '');
    var input = field;
    if (invalid) {
      if (input.style) input.style.borderBottomColor = '#EE5A2C';
    } else {
      if (input.style) input.style.borderBottomColor = '';
    }
  }

  if (form) {
    // clear error styling on input
    form.addEventListener('input', function (e) {
      if (e.target && e.target.style) e.target.style.borderBottomColor = '';
    });

    // highlight selected participation card — fallback for browsers without :has()
    function syncChoice() {
      form.querySelectorAll('.choice__opt').forEach(function (opt) {
        var input = opt.querySelector('input');
        opt.classList.toggle('is-checked', !!(input && input.checked));
      });
    }
    form.querySelectorAll('.choice__opt input').forEach(function (input) {
      input.addEventListener('change', syncChoice);
    });
    syncChoice();

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var ok = true;
      var firstBad = null;

      // required text/email/tel inputs
      form.querySelectorAll('input[required], textarea[required]').forEach(function (input) {
        if (input.type === 'radio' || input.type === 'checkbox') return;
        var valid = input.value.trim() !== '' && (input.type !== 'email' || /.+@.+\..+/.test(input.value));
        markInvalid(input, !valid);
        if (!valid) { ok = false; firstBad = firstBad || input; }
      });

      // participation radio (required)
      if (!form.querySelector('input[name="ucast"]:checked')) {
        ok = false; firstBad = firstBad || form.querySelector('.choice');
      }

      // GDPR checkbox (required)
      var gdpr = form.querySelector('input[name="GDPR"]');
      if (gdpr && !gdpr.checked) {
        ok = false; firstBad = firstBad || gdpr;
      }

      if (!ok) {
        if (firstBad && firstBad.scrollIntoView) firstBad.scrollIntoView({ behavior: 'smooth', block: 'center' });
        if (firstBad && firstBad.focus) firstBad.focus({ preventScroll: true });
        return;
      }

      submitForm();
    });
  }

  function showSuccess() {
    if (success) {
      success.classList.add('is-visible');
      success.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
    var btn = form.querySelector('button[type=submit]');
    if (btn) btn.disabled = true;
  }

  /* Zostaví predmet + telo pre mailto: fallback (rovnaké poradie ako send.php) */
  function buildMailto() {
    var order = [
      ['Účastnícky poplatok', 'ucast'],
      ['Názov / Meno', 'Názov / Meno'],
      ['Adresa', 'Adresa'],
      ['IČO', 'IČO'],
      ['DIČ', 'DIČ'],
      ['IBAN', 'IBAN'],
      ['Kontaktná osoba', 'Kontaktná osoba'],
      ['Telefón', 'Telefón'],
      ['Email', 'Email'],
      ['Požiadavky na skippera', 'Skipper'],
      ['Doplnková výbava', 'Doplnková výbava'],
      ['Charakteristika posádky', 'Charakteristika posádky'],
      ['Loď na celý týždeň', 'Loď na celý týždeň'],
      ['Súhlas GDPR', 'GDPR']
    ];
    var data = new FormData(form);
    var lines = ['NOVÁ PRIHLÁŠKA — GENTLEMAN SAILING 2027', ''];
    order.forEach(function (pair) {
      var v = (data.get(pair[1]) || '').toString().trim();
      lines.push(pair[0] + ': ' + (v || '—'));
    });
    var who = (data.get('Názov / Meno') || '').toString().trim();
    var subject = 'Nová prihláška — Gentleman Sailing 2027' + (who ? ' · ' + who : '');
    return 'mailto:info@nautitech.sk?subject=' + encodeURIComponent(subject) +
           '&body=' + encodeURIComponent(lines.join('\n'));
  }

  function submitForm() {
    var btn = form.querySelector('button[type=submit]');
    if (btn) btn.disabled = true;

    var data = new FormData(form);
    fetch('send.php', { method: 'POST', body: data })
      .then(function (res) { return res.json().catch(function () { return { ok: false }; }); })
      .then(function (json) {
        if (json && json.ok) {
          showSuccess();
        } else {
          // Server dostupný, ale odoslanie zlyhalo → mailto fallback
          window.location.href = buildMailto();
          if (btn) btn.disabled = false;
        }
      })
      .catch(function () {
        // send.php nedostupný (napr. statický hosting bez PHP) → mailto fallback
        window.location.href = buildMailto();
        if (btn) btn.disabled = false;
      });
  }

  /* ---------- Init ---------- */
  applyLang();
})();
