/* ==========================================================================
   Gentleman Sailing — interactions
   - Hero video autoplay/loop watchdog
   - Countdown to the 2027 edition (provisional date)
   - SK/EN language toggle
   - Nav scroll state + mobile menu
   ========================================================================== */
(function () {
  'use strict';

  /* ---------- i18n dictionary ---------- */
  var DICT = {
    ev_info: { sk: 'Ako sa pripraviť na regatu', en: 'How to prepare' },
    ev_experience: { sk: 'Čo zažijete na regate', en: 'What you’ll experience' },
    ev_events: { sk: 'Eventy & teambuildingy', en: 'Events & teambuilding' },
    ev_past: { sk: 'Minulé ročníky', en: 'Past editions' },
    ev_gallery: { sk: 'Galéria', en: 'Gallery' },
    ev_partners: { sk: 'Partneri', en: 'Partners' },
    ev_signup: { sk: 'Prihláška', en: 'Sign up' },
    hero_kicker: { sk: '21. ročník — Chorvátsko 2027', en: '21st Edition — Croatia 2027' },
    hero_title_html: { sk: 'S novým vetrom<br><span>v plachtách</span>', en: 'With fresh wind<br><span>in the sails</span>' },
    hero_date: { sk: 'Máj 2027  ·  Národný park Kornati', en: 'May 2027  ·  Kornati National Park' },
    cd_days: { sk: 'DNÍ', en: 'DAYS' }, cd_hours: { sk: 'HODÍN', en: 'HOURS' }, cd_min: { sk: 'MINÚT', en: 'MIN' }, cd_sec: { sk: 'SEKÚND', en: 'SEC' },
    hero_cta: { sk: 'Prihlásiť posádku', en: 'Register a crew' },
    intro_eyebrow: { sk: 'Gentleman Sailing', en: 'Gentleman Sailing' },
    intro_title: { sk: 'Neočakávané zážitky', en: 'Unexpected experiences' },
    intro_body: { sk: 'Gentleman Sailing je regata s 20-ročnou tradíciou, ktorá v minulosti niesla názvy IT Regata Open, či neskôr Trend Regata. Od roku 2011 sa plavíme pod názvom Gentleman Sailing, a po úspešných ročníkoch pod taktovkou Maxo Yachting sa kormidla ujíma NautiTech. Tentokrát nás čaká už 21. ročník.', en: 'Gentleman Sailing is a regatta with a 20-year tradition, formerly known as IT Regata Open and later Trend Regata. Since 2011 we sail under the Gentleman Sailing name, and after successful editions led by Maxo Yachting, the helm is now taken by NautiTech. This time the 21st edition awaits us.' },
    stat1_label: { sk: 'moreplavcov', en: 'sailors' }, stat2_label: { sk: 'lodí', en: 'boats' }, stat3_label: { sk: 'prístavov', en: 'ports' }, stat4_label: { sk: 'zážitkov', en: 'memories' },
    stats_note: { sk: '89 firiem · 9 marín · 20 odplavených ročníkov', en: '89 companies · 9 marinas · 20 editions sailed' },
    dest_eyebrow: { sk: 'Kornati · Severná Dalmácia', en: 'Kornati · Northern Dalmatia' },
    dest_title: { sk: 'Na vlnách k novým obzorom', en: 'On the waves to new horizons' },
    dest_body: { sk: 'Budeme sa plaviť v oblasti národného parku Kornati v severnej Dalmácii. Park tvorí 147 zväčša neobývaných ostrovov, ostrovčekov a útesov v prekrásnom blankytnom mori. Čaká vás nedotknutá príroda a nádherné zátoky.', en: 'We will sail the waters of the Kornati National Park in northern Dalmatia. The park comprises 147 mostly uninhabited islands, islets and reefs in a stunning azure sea. Pristine nature and beautiful bays await you.' },
    route_label: { sk: 'Trasa plavby', en: 'The route' },
    video_eyebrow: { sk: 'Pozvánka', en: 'Invitation' },
    video_title: { sk: 'Pozvánka na regatu Gentleman Sailing', en: 'Invitation to the Gentleman Sailing regatta' },
    events_eyebrow: { sk: 'Pre firmy', en: 'For companies' },
    events_title: { sk: 'Eventy & teambuildingy', en: 'Events & teambuilding' },
    events_body: { sk: 'Doterajších 20 ročníkov si užilo viac ako 89 firiem. More spája tímy ako nič iné — spoločná posádka, jeden cieľ a noblesa pravej regaty. Pripravíme vám firemný event na mieru, od jednej plachetnice po celú flotilu.', en: 'More than 89 companies have enjoyed the past 20 editions. The sea bonds teams like nothing else — one crew, one goal and the nobility of a true regatta. We will craft a tailor-made corporate event for you, from a single yacht to a whole fleet.' },
    ev_card1_t: { sk: 'Firemné regaty', en: 'Corporate regattas' },
    ev_card1_b: { sk: 'Súťaživá no priateľská atmosféra na vode, vyhodnotenie, trofeje a logá vašej značky na plachtách.', en: 'A competitive yet friendly atmosphere on the water, awards, trophies and your brand on the sails.' },
    ev_card2_t: { sk: 'Teambuilding na mori', en: 'Teambuilding at sea' },
    ev_card2_b: { sk: 'Tím v jednej posádke, kde každý rukou priloží k dielu. Zážitok, ktorý stmelí kolektív na celý rok.', en: 'A team in one crew where everyone lends a hand. An experience that bonds the group for the whole year.' },
    ev_card3_t: { sk: 'Incentívne plavby', en: 'Incentive cruises' },
    ev_card3_b: { sk: 'Odmeňte partnerov a klientov nezabudnuteľným týždňom v zátokách Jadranu so spoločnými večerami.', en: 'Reward partners and clients with an unforgettable week in Adriatic bays with shared dinners.' },
    past_eyebrow: { sk: '20 odplavených ročníkov', en: '20 editions sailed' },
    past_title: { sk: 'Zážitky na spoločnej vlne', en: 'Experiences on a shared wave' },
    past_body: { sk: 'Od IT Regaty Open cez Trend Regatu až po Gentleman Sailing. Každý ročník vlastný príbeh, prístav a posádky.', en: 'From IT Regata Open through Trend Regata to Gentleman Sailing. Every edition its own story, port and crews.' },
    gallery_eyebrow: { sk: '#gentlemansailing', en: '#gentlemansailing' },
    gallery_title: { sk: 'Galéria', en: 'Gallery' },
    gallery_body: { sk: 'Momentky spod napnutých plachiet — slobodu osolenú morskou vodou treba vidieť.', en: 'Moments from beneath full sails — freedom salted by the sea must be seen.' },
    price_eyebrow: { sk: 'Podmienky účasti', en: 'Conditions of entry' },
    price_title: { sk: 'Plavte sa s nami na plné plachty', en: 'Sail with us at full sail' },
    price_boat_label: { sk: 'Plachetnica pre 8 osôb', en: 'Yacht for 8 people' },
    price_ind_label: { sk: 'Cena pre jednotlivca', en: 'Price per individual' },
    price_extra_label: { sk: 'Doplatok za nesúťažnú časť týždňa', en: 'Surcharge for the non-competitive part of the week' },
    price_includes_title: { sk: 'Cena zahŕňa', en: 'The price includes' },
    price_includes_body: { sk: 'Prenájom lode vrátane dokladov, prístavné poplatky, čistenie lode, slávnostné otvorenie a vyhodnotenie regaty, spoločné večere pre celú posádku s limitovanými nápojmi, rozhodcovskú loď a rozhodcu, tričká, trofeje, pobytovú taxu, označenie lodí firemnými logami a parkovanie áut v maríne.', en: 'Yacht rental including documents, port fees, boat cleaning, opening ceremony and regatta evaluation, shared dinners for the whole crew with limited drinks, the jury boat and referee, t-shirts, trophies, tourist tax, branding of the boats with company logos and car parking at the marina.' },
    price_iban_note: { sk: 'Platby je potrebné uhradiť najneskôr do 31. 1. 2027.', en: 'Payments must be settled no later than 31 January 2027.' },
    price_cta: { sk: 'Vyplniť prihlášku', en: 'Fill in the entry' },
    news_eyebrow: { sk: 'Never miss a moment', en: 'Never miss a moment' },
    news_title: { sk: 'Zostaňte v spojení & buďte informovaní', en: 'Stay connected & stay informed' },
    news_body: { sk: 'Gentleman Sailing nie je len súťažné zápolenie. Zažite pravú slobodu osolenú morskou vodou, adrenalín pod napnutými plachtami a predovšetkým priateľstvá na celý život.', en: 'Gentleman Sailing is more than a competition. Experience true freedom salted by the sea, adrenaline under full sails and, above all, friendships for life.' },
    news_btn: { sk: 'Prihlásiť', en: 'Subscribe' },
    foot_email_label: { sk: 'E-mail', en: 'E-mail' },
    foot_phone_label: { sk: 'Telefón', en: 'Phone' },
    foot_social_label: { sk: 'Sledujte nás', en: 'Follow us' },
    foot_tagline: { sk: 'Regata s noblesou a 20-ročnou tradíciou. Organizuje NautiTech, s.r.o.', en: 'A regatta of nobility with a 20-year tradition. Organised by NautiTech, s.r.o.' }
  };

  var lang = 'sk';

  /* ---------- Language toggle ---------- */
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

    var email = document.getElementById('newsEmail');
    if (email) email.placeholder = lang === 'sk' ? 'Váš e-mail' : 'Your e-mail';

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

  /* ---------- Countdown ---------- */
  var target = new Date('2027-05-17T00:00:00'); // predbežný termín — upraviť po potvrdení
  function pad(n) { return String(n).padStart(2, '0'); }
  function tickCountdown() {
    var diff = Math.max(0, target - new Date());
    var set = function (id, v) { var el = document.getElementById(id); if (el) el.textContent = pad(v); };
    set('cd_d', Math.floor(diff / 864e5));
    set('cd_h', Math.floor((diff % 864e5) / 36e5));
    set('cd_m', Math.floor((diff % 36e5) / 6e4));
    set('cd_s', Math.floor((diff % 6e4) / 1e3));
  }

  /* ---------- Hero video ---------- */
  var video = document.getElementById('heroVideo');
  function tryPlay() {
    if (!video) return;
    var p = video.play();
    if (p && p.catch) p.catch(function () {});
  }
  function setupVideo() {
    if (!video) return;
    video.muted = true; video.defaultMuted = true; video.loop = true; video.playsInline = true;
    tryPlay();
    video.addEventListener('canplay', tryPlay, { once: true });
    video.addEventListener('ended', function () { video.currentTime = 0; tryPlay(); });
  }
  function videoWatchdog() {
    if (video && video.paused && video.readyState >= 2 && !document.hidden) {
      video.muted = true; tryPlay();
    }
  }

  /* ---------- Nav scroll state ---------- */
  var nav = document.getElementById('nav');
  function onScroll() {
    if (!nav) return;
    if (window.scrollY > 40) nav.classList.add('is-scrolled');
    else nav.classList.remove('is-scrolled');
  }

  /* ---------- Mobile menu ---------- */
  var burger = document.getElementById('burger');
  var navLinks = document.getElementById('navLinks');
  function closeMenu() {
    if (!nav) return;
    nav.classList.remove('is-open');
    if (burger) burger.setAttribute('aria-expanded', 'false');
  }
  if (burger && nav) {
    burger.addEventListener('click', function () {
      var open = nav.classList.toggle('is-open');
      burger.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  }
  if (navLinks) {
    navLinks.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', closeMenu);
    });
  }

  /* ---------- Newsletter (front-end only stub) ---------- */
  var newsForm = document.getElementById('newsForm');
  if (newsForm) {
    newsForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var btn = newsForm.querySelector('button');
      if (btn) btn.textContent = lang === 'sk' ? 'Ďakujeme!' : 'Thank you!';
      // TODO: wire to real newsletter backend / API endpoint.
    });
  }

  /* ---------- Video cards: click-to-play (lite YouTube embed) ---------- */
  document.querySelectorAll('.video-card').forEach(function (card) {
    card.addEventListener('click', function () {
      if (card.querySelector('iframe')) return;
      var id = card.getAttribute('data-yt');
      var iframe = document.createElement('iframe');
      iframe.src = 'https://www.youtube-nocookie.com/embed/' + id + '?autoplay=1&rel=0';
      iframe.title = 'Gentleman Sailing — video';
      iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
      iframe.allowFullscreen = true;
      card.appendChild(iframe);
    });
  });

  /* ---------- Init ---------- */
  applyLang();
  setupVideo();
  tickCountdown();
  setInterval(tickCountdown, 1000);
  setInterval(videoWatchdog, 1000);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
})();
