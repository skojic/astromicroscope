# Brend kit: Astromicroscope

**Pravac D, Midnight Lens**, izabrala Gorica Vićentijević 2. novembra 2026. Ovo je jedini važeći izgled brenda; ostali predlozi su obrisani.

## Kako da ga pogledaš
Dupli klik na **`index.html`** u ovom folderu. Otvara se brend kit sa poglavljima: suština, logo, boje (sa proverenim kontrastima), tipografija, grafički elementi, komponente, pokret, fotografija, društvene mreže, ton komunikacije i spisak fajlova. Jezik menjaš dugmićima **SR / EN**. Dugme **„Početna strana (referenca)”** otvara odobreni izgled početne strane.

Sve radi bez interneta; samo sličice YouTube videa na referentnoj strani traže internet.

## Šta je u folderu

| Putanja | Sadržaj |
|---|---|
| `index.html` | Brend kit: sva pravila, na srpskom i engleskom |
| `home-reference.html` | Odobrena početna strana (referenca za izradu sajta) |
| `tokens/tokens.css`, `tokens/tokens.json` | Tokeni dizajna: boje, slova, razmaci, oblici, pokret |
| `fonts/` | Schibsted Grotesk i Newsreader (woff2, latinica + proširena latinica), `fonts.css`, licence (SIL OFL 1.1) |
| `logo/*.svg` | Znak u bojama (zlatni, ponoćni, beli, mastilo), avatar, ikonica, kombinacije sa imenom |
| `logo/png/` | Favicon 32 i 48, apple-touch-icon 180, ikonice 192 i 512, Instagram avatar 1080, znakovi 850 × 1050, kombinacije sa imenom 1520 |
| `social/` | Šabloni: Instagram objava (lekcija, najava), story, YouTube sličica; PNG pregledi u `social/png/` |
| `i18n/` | Prebacivanje SR / EN za strane kita |

## Šabloni za društvene mreže
1. Otvori šablon iz `social/` u Chrome-u.
2. Klikni na tekst i promeni ga.
3. Izvezi u tačnoj veličini (piše u naslovu kartice), na primer snimkom ekrana te veličine ili alatom za izvoz po izboru.

## Za izradu sajta
„Koristi brending kit” znači: tokeni iz `tokens/tokens.css`, fontovi iz `fonts/`, logo iz `logo/`, pravila iz `index.html`, raspored iz `home-reference.html`. Vidi `specs/02-design-system.md` i `AGENTS.md`, pravilo 7.

## Napomene
- Logo je vektorizovan (potrace) iz originalnog fajla sa starog sajta (`docs/sadrzaj/stari-sajt/slike/logo-original.png`, 667 × 667 px). Ako postoji dizajnerov vektorski original, on je još bolji izvor.
- Tekst u kombinacijama sa imenom (`lockup-*.svg`) koristi fontove brenda; pre štampe ga treba pretvoriti u krive.
