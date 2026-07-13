/* ==========================================================================
   Gentleman Sailing — info (Kapitánske info)
   Nav scroll + mobile menu + SK/EN toggle (structural labels)
   ========================================================================== */
(function () {
  'use strict';

  var DICT = {
    nav_home: { sk: 'Domov', en: 'Home' },
    ev_experience: { sk: 'Čo zažijete na regate', en: 'What you’ll experience' },
    ev_events: { sk: 'Eventy & teambuildingy', en: 'Events & teambuilding' },
    ev_partners: { sk: 'Partneri', en: 'Partners' },
    ev_signup: { sk: 'Prihláška', en: 'Sign up' },

    i_eyebrow: { sk: 'Kapitánske info', en: 'Captain’s info' },
    i_title: { sk: 'Ako sa pripraviť na regatu', en: 'How to prepare for the regatta' },
    i_route_eyebrow: { sk: 'Trasa & doprava', en: 'Route & travel' },
    i_pack_eyebrow: { sk: 'Ako sa zbaliť', en: 'How to pack' },
    i_important_eyebrow: { sk: 'Dôležité informácie', en: 'Important information' },
    i_rules_title: { sk: 'Pravidlá a rozpis pretekov', en: 'Race rules & notice of race' },
    i_cta_title: { sk: 'Máte ďalšie otázky?', en: 'Any more questions?' },
    i_cta_text: { sk: 'Radi vám poradíme s prípravou aj dopravou. Ozvite sa nám alebo rovno prihláste svoju posádku.', en: 'We’re happy to help with preparation and travel. Get in touch or register your crew right away.' },

    i_lead: { sk: "Ako sa zbaliť? Aké sú pravidlá? Čo vás čaká? Ako sa dopraviť na regatu? Všetky praktické informácie, ako sa dostať do Marina Drage a nielen to, nájdete práve tu. Neváhajte nás kontaktovať s ďalšími otázkami.", en: "How to pack? What are the rules? What awaits you? How to get to the regatta? All the practical information on getting to Marina Drage — and more — is right here. Do not hesitate to contact us with any further questions." },
    i_f_event: { sk: "Udalosť", en: "Event" },
    i_f_event_v: { sk: "Máj 2027 (termín upresníme) · Marina Drage (43° 53.28′ N, 15° 32.10′ E)", en: "May 2027 (date to be confirmed) · Marina Drage (43° 53.28′ N, 15° 32.10′ E)" },
    i_f_dist: { sk: "Vzdialenosť", en: "Distance" },
    i_f_dist_v: { sk: "cca 730—790 km · približne 7—8 hodín jazdy", en: "approx. 730–790 km · about 7–8 hours by car" },
    i_f_r1: { sk: "Trasa 1", en: "Route 1" },
    i_f_r2: { sk: "Trasa 2", en: "Route 2" },
    i_f_board: { sk: "Nalodenie", en: "Boarding" },
    i_f_park: { sk: "Parkovanie", en: "Parking" },
    i_f_park_v: { sk: "2 vozidlá k lodi zdarma v areáli Marina Drage", en: "2 cars per boat free of charge at Marina Drage" },
    i_f_marina: { sk: "Marína", en: "Marina" },
    i_pack_t2: { sk: "Výstroj na palubu", en: "Gear for on board" },
    i_pack_p: { sk: "Na palube sa oplatí byť pripravený na letné dni aj na zmeny počasia. Nižšie nájdete odporúčaný zoznam oblečenia, doplnkov a povinných dokladov.", en: "On board it pays to be ready for summer days as well as changes in the weather. Below is a recommended list of clothing, accessories and required documents." },
    i_c1_t: { sk: "Oblečenie a výstroj", en: "Clothing and gear" },
    i_c1_s1: { sk: "Na letné dni na mori", en: "For summer days at sea" },
    i_c1_l1: { sk: "Tričká, šortky, tenké nohavice, bermudy, plavky", en: "T-shirts, shorts, light trousers, bermudas, swimwear" },
    i_c1_l2: { sk: "Ľahká obuv (šľapky), jachtárska obuv, príp. tenisky nezanechávajúce tmavé stopy", en: "Light footwear (flip-flops), sailing shoes or trainers that leave no dark marks" },
    i_c1_l3: { sk: "Ľahká bunda alebo teplejšie tričko", en: "A light jacket or a warmer shirt" },
    i_c1_l4: { sk: "Šiltovka, slnečné okuliare", en: "A cap and sunglasses" },
    i_c1_s2: { sk: "V prípade nepriaznivého počasia", en: "In case of bad weather" },
    i_c1_l5: { sk: "Nepremokavé oblečenie (bunda s kapucňou, nohavice)", en: "Waterproof clothing (hooded jacket, trousers)" },
    i_c1_l6: { sk: "Vetrovka alebo flanelová bunda, teplé oblečenie", en: "A windbreaker or flannel jacket, warm clothing" },
    i_c1_l7: { sk: "Gumená obuv alebo neoprénové topánky", en: "Rubber boots or neoprene shoes" },
    i_c1_l8: { sk: "Čiapka/čelenka, teplé ponožky, vodotesné vrece", en: "A beanie or headband, warm socks, a waterproof bag" },
    i_c2_t: { sk: "Odporúčané doplnky", en: "Recommended accessories" },
    i_c2_l1: { sk: "Pracovné nohavice, jachtárske rukavice na prácu s lanami", en: "Work trousers, sailing gloves for rope handling" },
    i_c2_l2: { sk: "Zatvárací nôž alebo nôž v puzdre, baterka", en: "A folding or sheathed knife, a torch" },
    i_c2_l3: { sk: "Gumička alebo šnúrka na okuliare", en: "A strap or cord for your glasses" },
    i_c2_l4: { sk: "Lieky proti kinetóze, hygienické potreby, opaľovací krém", en: "Motion-sickness medication, toiletries, sunscreen" },
    i_c2_l5: { sk: "Fotoaparát, resp. video s príslušenstvom", en: "A camera or video camera with accessories" },
    i_c3_t: { sk: "Povinné doklady a vybavenie", en: "Required documents and equipment" },
    i_c3_l1: { sk: "Platné cestovné doklady (pas alebo ID)", en: "Valid travel documents (passport or ID)" },
    i_c3_l2: { sk: "Doklady skippera — veliteľa námorného plavidla a osvedčenie rádiotelefonistu", en: "Skipper's licence for commanding a seagoing vessel and a radio operator certificate" },
    i_c3_l3: { sk: "Používané lieky", en: "Any medication you use" },
    i_c3_l4: { sk: "Akumulátory, adaptéry, nabíjačky (na lodi 12 V, v prístave aj 220 V)", en: "Batteries, adapters, chargers (12 V on board, 220 V in the marina)" },
    i_imp_t: { sk: "Organizátor & partneri", en: "Organiser & partners" },
    i_f_org: { sk: "Organizátor", en: "Organiser" },
    i_f_real: { sk: "Realizačný partner", en: "Organising partner" },
    i_b01: { sk: "Preteky sa riadia pravidlami definovanými v Pretekových pravidlách jachtingu platnými na rok 2027.", en: "The races are governed by the Racing Rules of Sailing in force for 2027." },
    i_b02: { sk: "Účastníci pretekov sú povinní mať na určených miestach na lodiach umiestnené reklamné materiály sponzorov podujatia, ktoré dodá organizátor GS 2027. Akákoľvek iná reklamná a propagačná činnosť spojená s pretekmi pred, počas alebo po pretekoch je možná iba na základe písomnej dohody s organizátorom.", en: "Competitors are required to display the event sponsors' advertising materials, supplied by the GS 2027 organiser, in the designated places on the boats. Any other advertising or promotional activity connected with the races before, during or after the event is possible only under a written agreement with the organiser." },
    i_b03a: { sk: "Aspoň jeden člen posádky musí predložiť pri registrácii platnú kvalifikáciu potrebnú pre plavbu na námornej plachetnici v oblasti Jadranu a aspoň jeden člen posádky musí vlastniť osvedčenie rádiooperátora plavebnej pohyblivej služby v oblasti Jadranu.", en: "At registration, at least one crew member must present a valid qualification for sailing a seagoing yacht in the Adriatic, and at least one crew member must hold a maritime mobile service radio operator certificate for the Adriatic." },
    i_b03b: { sk: "Posádky s loďami, ktoré sú spôsobilé na účasť, sa môžu prihlásiť do 31. marca 2027. Do tohto termínu musí byť taktiež uhradené štartovné. Kontaktnou osobou je Peter Piala, info@gentlemansailing.sk.", en: "Crews with eligible boats may enter until 31 March 2027. The entry fee must also be paid by this date. The contact person is Peter Piala, info@gentlemansailing.sk." },
    i_b05a: { sk: "Žrebovanie lodí sa uskutoční 2 týždne pred regatou, miesto a čas budú upresnené.", en: "The boat draw will take place 2 weeks before the regatta; the place and time will be announced." },
    i_b05b: { sk: "Prevzatie lodí sa podľa rozpisu zo žrebovania uskutoční deň pred štartom regaty od 15:00 h v Marine Drage, Drage.", en: "Boat handover, according to the draw schedule, takes place the day before the start of the regatta from 3 p.m. at Marina Drage, Drage." },
    i_b05c: { sk: "Počet rozjázd: 5.", en: "Number of races: 5." },
    i_b06: { sk: "Plachetné smernice budú zverejnené pred začatím registrácie na vývesnej tabuli pretekovej komisie na rozhodcovskej lodi.", en: "The sailing instructions will be published before registration opens on the race committee notice board on the committee boat." },
    i_b07: { sk: "Trať bude určená pretekovou komisiou v oblasti Stredného Jadranu.", en: "The course will be set by the race committee in the central Adriatic." },
    i_b08: { sk: "Preteky budú organizované tak, aby sa každý deň pri priaznivej poveternostnej situácii odjazdili najviac tri rozjazdy. Rozjazdy môžu byť skrátené.", en: "Racing will be organised so that, weather permitting, no more than three races are sailed each day. Races may be shortened." },
    i_b09: { sk: "Pre všetky kategórie sa pravidlá 44.1 a 44.2 menia tak, že sa požaduje iba jedna otáčka, vrátane jedného obratu a jedného prehodenia.", en: "For all categories, rules 44.1 and 44.2 are changed so that only one turn is required, including one tack and one gybe." },
    i_b10a: { sk: "Aby boli preteky platné, je nutné uskutočniť aspoň jednu rozjazdu.", en: "For the regatta to be valid, at least one race must be completed." },
    i_b10b: { sk: "(a) ak sa uskutočnia 1 až 3 rozjazdy, celkové body lode sú súčtom jej bodov zo všetkých rozjázd; (b) ak sa uskutoční 4 a viac rozjázd, body lode sú súčtom jej bodov zo všetkých rozjázd s vylúčením najhorších bodov.", en: "(a) if 1 to 3 races are completed, a boat's series score is the total of her race scores; (b) if 4 or more races are completed, a boat's series score is the total of her race scores excluding her worst score." },
    i_b11: { sk: "Lode zúčastnené daného preteku sa nesmú vyťahovať v priebehu pretekov z vody, okrem písomne vopred povolených termínov pretekovej komisie, a to iba v rámci týchto termínov.", en: "Boats taking part must not be hauled out of the water during the regatta except at times approved in advance and in writing by the race committee, and only within those times." },
    i_b12: { sk: "Udelené za prvé (Putovný pohár), druhé a tretie miesto, Cena Fair Play a Cena Funny Crew.", en: "Awarded for first place (the Challenge Cup), second and third place, plus the Fair Play Award and the Funny Crew Award." },
    i_b13: { sk: "Pretekári sa zúčastňujú pretekov jedine na vlastnú zodpovednosť. Usporiadateľ nepreberá žiadnu zodpovednosť za poškodenie materiálu, osobné zranenie alebo smrť, ktorá by sa stala v súvislosti, pred, v priebehu alebo po pretekoch.", en: "Competitors take part in the races entirely at their own risk. The organiser accepts no liability for material damage, personal injury or death occurring in connection with, before, during or after the races." },
    i_r01: { sk: "Pravidlá a rozpis pretekov", en: "Rules and notice of race" },
    i_r02: { sk: "Reklama", en: "Advertising" },
    i_r03: { sk: "Spôsobilosť a účasť", en: "Eligibility and entry" },
    i_r05: { sk: "Časový program", en: "Schedule" },
    i_r06: { sk: "Plachetné smernice", en: "Sailing instructions" },
    i_r07: { sk: "Miesto", en: "Venue" },
    i_r08: { sk: "Trate", en: "Courses" },
    i_r09: { sk: "Systém trestov", en: "Penalty system" },
    i_r10: { sk: "Bodovanie", en: "Scoring" },
    i_r11: { sk: "Obmedzenie vyťahovania", en: "Haul-out restrictions" },
    i_r12: { sk: "Ceny GS", en: "GS prizes" },
    i_r13: { sk: "Vzdanie sa zodpovednosti", en: "Disclaimer of liability" },
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
