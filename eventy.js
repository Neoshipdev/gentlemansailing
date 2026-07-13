/* ==========================================================================
   Gentleman Sailing — eventy & teambuildingy
   Nav scroll + mobile menu + SK/EN toggle (structural labels)
   ========================================================================== */
(function () {
  'use strict';

  var DICT = {
    nav_home: { sk: 'Domov', en: 'Home' },
    ev_info: { sk: 'Ako sa pripraviť na regatu', en: 'How to prepare' },
    ev_experience: { sk: 'Čo zažijete na regate', en: 'What you’ll experience' },
    ev_partners: { sk: 'Partneri', en: 'Partners' },
    ev_signup: { sk: 'Prihláška', en: 'Sign up' },

    e_eyebrow: { sk: 'Pre firmy', en: 'For companies' },
    e_lead: { sk: 'More spája tímy ako nič iné.', en: 'The sea bonds teams like nothing else.' },

    e_title: { sk: "Eventy & teambuildingy", en: "Events & teambuilding" },
    e_p1: { sk: "Doprajte svojim klientom, obchodným partnerom alebo zamestnancom zážitok, na ktorý sa nezabúda. Gentleman Sailing nie je len regata. Je to priestor, kde sa stretáva súťaživá energia, tímová spolupráca, oddych na mori a atmosféra, ktorá prirodzene vytvára nové vzťahy.", en: "Give your clients, business partners or employees an experience they will never forget. Gentleman Sailing is not just a regatta. It is a space where competitive energy, teamwork, relaxation at sea and an atmosphere that naturally creates new relationships come together." },
    e_p2: { sk: "Doterajších 20 ročníkov si užilo viac ako 89 firiem. Posádky zažili napätie pretekov, spoločné večery, nové priateľstvá aj momenty, ktoré v bežnej zasadacej miestnosti nikdy nevzniknú.", en: "More than 89 companies have enjoyed the past 20 editions. Crews have experienced the tension of racing, shared dinners, new friendships and moments that would never arise in an ordinary meeting room." },
    e_p3: { sk: "Na palube sa rozdiely strácajú. Každý má svoju úlohu, jeden spoločný cieľ a vietor v plachtách, ktorý tím prirodzene posúva dopredu.", en: "On board, differences disappear. Everyone has their role, one common goal and wind in the sails that naturally pushes the team forward." },
    e_fe_eb: { sk: "Firemný event", en: "Corporate event" },
    e_fe_t: { sk: "Firemný event s atmosférou pravej regaty", en: "A corporate event with the atmosphere of a true regatta" },
    e_fe_p1: { sk: "Hľadáte výnimočný event pre svojich klientov alebo obchodných partnerov? Gentleman Sailing ponúka prostredie, ktoré spája noblesu jachtingu, krásu chorvátskeho pobrežia a zážitok zo spoločnej plavby.", en: "Looking for an exceptional event for your clients or business partners? Gentleman Sailing offers a setting that combines the nobility of yachting, the beauty of the Croatian coast and the experience of sailing together." },
    e_fe_p2: { sk: "Firemná regata je ideálnou príležitosťou, ako pozvať klientov do neformálneho, no stále reprezentatívneho prostredia. Na mori vznikajú rozhovory prirodzenejšie, vzťahy sa prehlbujú rýchlejšie a spoločný zážitok zostáva v pamäti omnoho dlhšie ako klasické stretnutie pri stole.", en: "A corporate regatta is the perfect opportunity to invite clients into an informal yet representative environment. At sea, conversations start more naturally, relationships deepen faster and a shared experience stays in the memory far longer than a classic meeting at a table." },
    e_fe_p3: { sk: "Súťaživá, no priateľská atmosféra na vode, vyhodnotenie, trofeje a spoločný program vytvárajú event, ktorý má štýl, energiu aj emóciu.", en: "A competitive yet friendly atmosphere on the water, awards, trophies and a shared programme create an event with style, energy and emotion." },
    e_01_t: { sk: "Firemné regaty", en: "Corporate regattas" },
    e_01_p1: { sk: "Pozvite svojich klientov alebo partnerov na palubu a zažite spolu regatu, ktorá má charakter. Každá posádka sa stáva tímom, každá loď súčasťou súťaže a každý deň prináša nové spoločné momenty.", en: "Invite your clients or partners on board and experience a regatta with character together. Every crew becomes a team, every boat part of the competition, and every day brings new shared moments." },
    e_01_p2: { sk: "Firemná regata je vhodná pre spoločnosti, ktoré chcú svojim klientom ponúknuť viac ako len klasický event. Je to zážitok, ktorý spája aktívny program, networking, súťaživosť a výnimočnú atmosféru mora.", en: "A corporate regatta suits companies that want to offer their clients more than a standard event. It is an experience combining an active programme, networking, competitiveness and the unique atmosphere of the sea." },
    e_01_sub: { sk: "Čo vás čaká", en: "What awaits you" },
    e_01_l1: { sk: "Súťažná, ale priateľská atmosféra na vode", en: "A competitive yet friendly atmosphere on the water" },
    e_01_l2: { sk: "Spoločná plavba v krásnom prostredí Chorvátska", en: "Sailing together in the beautiful setting of Croatia" },
    e_01_l3: { sk: "Vyhodnotenie regaty a odovzdávanie trofejí", en: "Regatta results ceremony and trophies" },
    e_01_l4: { sk: "Priestor na networking a neformálne rozhovory", en: "Space for networking and informal conversations" },
    e_01_l6: { sk: "Zážitok, ktorý prirodzene posilňuje vzťahy s klientmi aj partnermi", en: "An experience that naturally strengthens relationships with clients and partners" },
    e_tb_t: { sk: "Teambuilding, ktorý stmelí tím na celý rok", en: "Teambuilding that bonds the team for the whole year" },
    e_tb_p1: { sk: "Na mori sa tímová spolupráca nedá hrať. Posádka musí komunikovať, reagovať, pomáhať si a spoločne smerovať k cieľu. Práve preto je regata jedným z najsilnejších teambuildingových zážitkov.", en: "At sea, teamwork cannot be faked. A crew must communicate, react, help each other and head for the goal together. That is why a regatta is one of the most powerful teambuilding experiences." },
    e_tb_p2: { sk: "Každý člen posádky má svoju rolu. Niekto drží kurz, niekto pracuje s plachtami, niekto sleduje vietor a niekto povzbudzuje tím v správnej chvíli. Spoločne však všetci zažívajú niečo, čo v kancelárii nevznikne — dôveru, spoluprácu a pocit, že sú na jednej lodi.", en: "Every crew member has a role. Someone holds the course, someone works the sails, someone watches the wind and someone cheers the team on at the right moment. Together they all experience something an office can never create — trust, cooperation and the feeling of being in the same boat." },
    e_tb_p3: { sk: "A to doslova.", en: "Quite literally." },
    e_02_t: { sk: "Teambuilding na mori", en: "Teambuilding at sea" },
    e_02_p1: { sk: "Zoberte svoj tím mimo každodenného pracovného prostredia a doprajte mu zážitok, ktorý ho skutočne spojí. Teambuilding na mori nie je len o oddychu. Je o spoločnej zodpovednosti, rozhodovaní, komunikácii a radosti z dosiahnutého cieľa.", en: "Take your team out of the everyday work environment and give them an experience that truly brings them together. Teambuilding at sea is not just about relaxing. It is about shared responsibility, decision-making, communication and the joy of reaching a goal." },
    e_02_p2: { sk: "Počas regaty sa z kolegov stáva posádka. Každý priloží ruku k dielu a každý je súčasťou spoločného výsledku. Práve preto si tímy odnášajú nielen krásne spomienky, ale aj silnejšie vzťahy, lepšiu komunikáciu a energiu, ktorá pretrvá aj po návrate na pevninu.", en: "During the regatta, colleagues become a crew. Everyone lends a hand and everyone is part of the common result. That is why teams take away not only beautiful memories but also stronger relationships, better communication and energy that lasts long after returning to shore." },
    e_02_sub: { sk: "Prečo zvoliť teambuilding na mori", en: "Why choose teambuilding at sea" },
    e_02_l1: { sk: "Tím zažije skutočnú spoluprácu v praxi", en: "The team experiences real cooperation in practice" },
    e_02_l2: { sk: "Každý člen posádky má svoju úlohu", en: "Every crew member has a role" },
    e_02_l3: { sk: "Spoločný cieľ prirodzene podporuje komunikáciu", en: "A common goal naturally encourages communication" },
    e_02_l4: { sk: "Prostredie mimo kancelárie otvára nové rozhovory", en: "An environment away from the office opens new conversations" },
    e_02_l5: { sk: "Regata prináša zdravú súťaživosť aj silné emócie", en: "A regatta brings healthy competitiveness and strong emotions" },
    e_02_l6: { sk: "Zážitok zostáva v tíme ešte dlho po návrate", en: "The experience stays with the team long after the return" },
    e_end_eb: { sk: "Jeden cieľ · jedna posádka", en: "One goal · one crew" },
    e_end_t: { sk: "Jeden cieľ. Jedna posádka. Jeden nezabudnuteľný zážitok.", en: "One goal. One crew. One unforgettable experience." },
    e_end_p1: { sk: "Gentleman Sailing vytvára ideálny priestor pre firmy, ktoré chcú svojim klientom alebo zamestnancom ponúknuť niečo výnimočné. More, vietor, plachty a spoločná posádka dokážu spojiť ľudí prirodzenejšie než akýkoľvek štandardný event.", en: "Gentleman Sailing creates the ideal space for companies that want to offer their clients or employees something exceptional. The sea, the wind, the sails and a shared crew connect people more naturally than any standard event." },
    e_end_p2: { sk: "Či už pripravujete reprezentatívne stretnutie pre klientov, odmenu pre obchodných partnerov alebo teambuilding pre interný tím, regata prináša kombináciu zážitku, emócie a spoločného cieľa.", en: "Whether you are preparing a representative meeting for clients, a reward for business partners or teambuilding for your internal team, the regatta brings a combination of experience, emotion and a common goal." },
    e_cta_t: { sk: "Plavte sa s nami", en: "Sail with us" },
    e_cta_p: { sk: "Vytvorte si vlastnú firemnú posádku, pozvite klientov alebo doprajte svojmu tímu teambuilding, ktorý bude mať vietor v plachtách. Pridajte sa k Gentleman Sailing a zažite firemný event, na ktorý sa bude spomínať ešte dlho po návrate z mora.", en: "Create your own corporate crew, invite clients or give your team a teambuilding with wind in its sails. Join Gentleman Sailing and experience a corporate event that will be remembered long after returning from the sea." },
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
