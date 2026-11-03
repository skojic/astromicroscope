# Priprema sadržaja sajta

Šta stoji u svakom delu sajta, na srpskom i engleskom. Pravac dizajna je **D · Midnight Lens** (odluka Gorice i Srđana, 2026-11-02).

Ovo je **predlog teksta**, ne konačan tekst. Polazna osnova su brief (`docs/brief-klijenta.md`), tekstovi sa starog sajta (`stari-sajt/`) i tekstovi iz dizajna D (`branding-directions/d-midnight-lens.html`). Sve što zna samo Gorica upisano je kao `[placeholder]` i skupljeno u [upitniku](upitnik-za-goricu.md). Konačnu verziju odobrava Gorica.

## Delovi sajta

| Fajl | Deo sajta | Modul | Stanje teksta |
|---|---|---|---|
| [01-zaglavlje-i-pocetna.md](01-zaglavlje-i-pocetna.md) | Zaglavlje, meni, hero na početnoj | `header-nav`, `hero` | predlog, čeka potvrdu |
| [02-edukacija.md](02-edukacija.md) | Formati učenja: programi, kursevi, proizvodi, tekstovi | `learn-formats` | predlog; kursevi u 2027 (D14); tekstovi dva puta mesečno |
| [03-video.md](03-video.md) | YouTube lekcije | `youtube-feed` | predlog |
| [04-individualne-analize.md](04-individualne-analize.md) | Natalna, solarna, karmička analiza, konsultacije | `private-analyses` | **odlučeno** (D19): četiri usluge, cene, trajanje, telefon, uplata unapred |
| [05-o-meni.md](05-o-meni.md) | O Gorici, način rada | `about` | po Goričinim odgovorima (D18, D20); nova fotografija u `slike/` |
| [06-newsletter.md](06-newsletter.md) | Prijava na mejl listu | `newsletter` | predlog |
| [07-podnozje-i-kontakt.md](07-podnozje-i-kontakt.md) | Podnožje, kontakt, pravne strane | `footer` | predlog |
| [upitnik-za-goricu.md](upitnik-za-goricu.md) | Sva pitanja za Goricu na jednom mestu | — | **odgovoreno** 2026-11-02, osim 14 i 26 |
| [slike/](slike/) | Goričin portret za sajt | M10 | izvorni fajl |
| [stari-sajt/](stari-sajt/README.md) | Tekstovi i logo sa starog WordPress sajta; spisak spam adresa | M02, M13 | izvor |

## Pravila pisanja (iz `specs/04-content.md`)
- **Odgovor prvi**: prva rečenica kaže suštinu. Tako nas citiraju Google i AI alati.
- Jedan H1 po strani; podnaslovi kao pitanja koja ljudi stvarno pretražuju.
- Bez fatalizma i bez obećanja (zdravlje, novac, pravo). Astrologija se opisuje kao tumačenje.
- Srpski je glavni jezik; engleski je prilagođen, ne bukvalan prevod.
- Svaka slika ima opis (alt) na oba jezika.

## Stari sajt
Stari WordPress sajt je sačuvan iz Hostinger backupa (2026-10-08): 28 strana teksta i originalni logo su u [`stari-sajt/`](stari-sajt/README.md). Stari sajt je bio hakovan (spam o kazinima), pa se ne vraća; koristimo samo njen tekst i slike.

## Sledeći korak
1. ~~Gorica odgovori na upitnik.~~ Urađeno 2026-11-02.
2. ~~Odgovori se upišu u fajlove 01–07.~~ Urađeno; otvoreno ostaje 14 i 26.
3. Tekstovi se prenose u module (`plan/modules/*/PLAN.md` i fajlove sadržaja po `plan/contracts.md`) da bi moduli prošli gate G0.
