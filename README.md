# Gentleman Sailing — web (Jubilejný 20. ročník, 2026)

Statická jednostránková landing page podľa dizajnu **Verzia A** (dark cinematic luxury).
Bez build kroku — čisté HTML + CSS + JS.

## Štruktúra
```
gentleman-sailing/
├── index.html      # celá stránka (SK default, EN cez prepínač)
├── prihlaska.html  # samostatná prihlášková stránka (polia podľa gentlemansailing.sk)
├── prihlaska.js    # validácia formulára + SK/EN + odoslanie (POST na send.php)
├── send.php        # odošle štruktúrovaný e-mail prihlášky na info@nautitech.sk
├── partneri.html   # stránka Partneri (logo wall + realizačný partner + CTA)
├── partneri.js     # nav + SK/EN pre stránku partnerov
├── info.html       # „Ako sa pripraviť na regatu" (trasa, balenie, dôležité info, pravidlá)
├── info.js         # nav + SK/EN pre stránku prípravy
├── zazijete.html   # „Čo zažijete na regate?" (preteky, Kornati, program, atmosféra + CTA)
├── zazijete.js     # nav + SK/EN pre stránku zážitku
├── eventy.html     # Eventy & teambuildingy (firemné regaty + teambuilding + CTA Prihláška)
├── eventy.js       # nav + SK/EN pre Eventy stránku
├── styles.css      # dizajn tokeny + layout + responzivita (vrátane formulára)
├── script.js       # video, odpočet, SK/EN prepínač, scroll nav, mobilné menu
└── assets/
    ├── logo-gs-light.png   # logo pre tmavé pozadie (nav + footer)
    ├── logo-gs-dark.png    # logo pre svetlé pozadie (nepoužité vo Verzii A)
    ├── logo-gs.png         # originál (favicon / OG)
    ├── hero.mp4            # úvodné hero video (29 MB)
    └── partners/           # 18 log partnerov (stiahnuté z gentlemansailing.sk)
```

## Spustenie lokálne
Kvôli videu a fontom radšej cez malý server (nie priamo file://):
```bash
cd gentleman-sailing
python -m http.server 4321
# → http://localhost:4321
```

## Nasadenie
Nahrať obsah priečinka na akýkoľvek statický hosting (Netlify, Vercel, GitHub Pages,
FTP na web NautiTech). Žiadny backend nie je potrebný okrem bodov nižšie.

## Čo treba ešte doplniť (TODO)
- [ ] **Finálne fotky** — momentálne sa načítavajú z gentlemansailing.sk. Vymeniť za
      lokálne optimalizované JPG/WebP v `assets/photos/` (intro 4:5, Kornati 5:4,
      4× minulé ročníky 3:4, 5× galéria).
- [x] **Prihlášková stránka** — hotová (`prihlaska.html`), CTA na webe už na ňu vedú.
- [x] **Odoslanie prihlášky** — `send.php` pošle štruktúrovaný e-mail na `info@nautitech.sk`.
      ⚠️ Vyžaduje **PHP hosting so zapnutou funkciou `mail()`** (typický shared hosting,
      ako beží aj gentlemansailing.sk). Ak sa web nasadí na statický hosting bez PHP,
      formulár sa automaticky prepne na `mailto:` fallback (otvorí e-mailový klient
      s predvyplnenou prihláškou). Na spoľahlivé doručovanie odporúčam nastaviť SPF/DKIM
      pre doménu odosielateľa, prípadne použiť SMTP knižnicu (PHPMailer).
- [x] **Stránka Partneri** — hotová (`partneri.html`), 18 log (17 partnerov + NautiTech
      ako realizačný partner). Logá sú v `assets/partners/`.
- [ ] **Odkazy na weby partnerov** — logá zatiaľ nie sú preklikateľné (zdrojová stránka
      nemala odkazy). Ak dodáš URL adresy partnerov, obalím logá do `<a href>`.
- [x] **Stránka „Ako sa pripraviť na regatu"** — hotová (`info.html`), obsah z /travel/.
- [x] **Stránka „Čo zažijete na regate?"** — hotová (`zazijete.html`) s dodaným textom
      (manifest „Regata, v ktorej nejde len o víťazstvo" — fair play, noblesa, tímy…).
- [x] **Stránka Eventy & teambuildingy** — hotová (`eventy.html`) s CTA „Prihláška".
- [ ] **EN preklad Info + Eventy** — tieto stránky majú preloženú navigáciu a nadpisy,
      ale dlhé texty (pravidlá, balenie, event copy) sú zatiaľ len po slovensky
      (rovnako ako zdrojová stránka). Doplním EN, ak treba.
- [x] **SEO/GEO základ** — H1 na každej stránke, canonical, Open Graph + Twitter karty,
      JSON-LD (SportsEvent + Organization), `robots.txt`, `sitemap.xml`, `llms.txt`.
      ⚠️ Canonical/sitemap/OG používajú doménu `https://www.gentlemansailing.sk/` —
      ak bude finálna doména iná, treba ju v týchto súboroch nahradiť (find & replace).
- [ ] **Lokálne fotky na homepage** — intro, Kornati, minulé ročníky a galéria stále
      hotlinkujú z gentlemansailing.sk (6 obrázkov). Nahradiť lokálnymi optimalizovanými.
- [ ] **Newsletter** — odoslanie je len front-end stub. Napojiť na Mailchimp/API.
- [ ] **YouTube video** — potvrdiť správne ID (teraz `L2LPzQpE8WI`).
- [ ] **Dátum odpočtu** — cieľ `2026-05-18` v `script.js` (upraviť ak sa termín zmení).
- [ ] **Cookies/GDPR lišta** — ak treba (YouTube iframe nastavuje cookies).
- [ ] (voliteľné) WebM verzia videa + self-hosted fonty pre rýchlosť.
