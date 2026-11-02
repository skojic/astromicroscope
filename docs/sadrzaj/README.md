# Priprema sadržaja sajta

Šta stoji u svakom delu sajta, na srpskom i engleskom. Pravac dizajna je **D · Midnight Lens** (odluka Gorice i Srđana, 2026-11-02).

Ovo je **predlog teksta**, ne konačan tekst. Polazna osnova su brief (`docs/brief-klijenta.md`), tekstovi sa starog sajta (`stari-sajt/`) i tekstovi iz dizajna D (`branding-directions/d-midnight-lens.html`). Sve što zna samo Gorica upisano je kao `[placeholder]` i skupljeno u [upitniku](upitnik-za-goricu.md). Konačnu verziju odobrava Gorica.

## Delovi sajta

| Fajl | Deo sajta | Modul | Stanje teksta |
|---|---|---|---|
| [01-zaglavlje-i-pocetna.md](01-zaglavlje-i-pocetna.md) | Zaglavlje, meni, hero na početnoj | `header-nav`, `hero` | predlog, čeka potvrdu |
| [02-edukacija.md](02-edukacija.md) | Formati učenja: programi, kursevi, proizvodi, tekstovi | `learn-formats` | predlog; nedostaju kursevi, cene, datumi |
| [03-video.md](03-video.md) | YouTube lekcije | `youtube-feed` | predlog |
| [04-individualne-analize.md](04-individualne-analize.md) | Natalna, solarna, karmička analiza, konsultacije | `private-analyses` | predlog; spisak usluga se razlikuje od starog sajta; nedostaju cene i postupak |
| [05-o-meni.md](05-o-meni.md) | O Gorici, način rada | `about` | predlog po njenom tekstu sa starog sajta; čeka potvrdu |
| [06-newsletter.md](06-newsletter.md) | Prijava na mejl listu | `newsletter` | predlog |
| [07-podnozje-i-kontakt.md](07-podnozje-i-kontakt.md) | Podnožje, kontakt, pravne strane | `footer` | predlog |
| [upitnik-za-goricu.md](upitnik-za-goricu.md) | Sva pitanja za Goricu na jednom mestu | — | čeka odgovore |
| [stari-sajt/](stari-sajt/README.md) | Tekstovi i logo sa starog WordPress sajta | — | izvor |

## Pravila pisanja (iz `specs/04-content.md`)
- **Odgovor prvi**: prva rečenica kaže suštinu. Tako nas citiraju Google i AI alati.
- Jedan H1 po strani; podnaslovi kao pitanja koja ljudi stvarno pretražuju.
- Bez fatalizma i bez obećanja (zdravlje, novac, pravo). Astrologija se opisuje kao tumačenje.
- Srpski je glavni jezik; engleski je prilagođen, ne bukvalan prevod.
- Svaka slika ima opis (alt) na oba jezika.

## Stari sajt
Stari WordPress sajt je sačuvan iz Hostinger backupa (2026-10-08): 28 strana teksta i originalni logo su u [`stari-sajt/`](stari-sajt/README.md). Stari sajt je bio hakovan (spam o kazinima), pa se ne vraća; koristimo samo njen tekst i slike.

## Sledeći korak
1. Gorica odgovori na upitnik.
2. Odgovori se upišu u fajlove 01–07 umesto placeholdera.
3. Tekstovi se prenose u module (`modules/*.md`, odeljak „Content (sr and en)") da bi moduli prošli gate G0.
