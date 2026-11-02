# Uputstvo za Filipa: plan izrade sajta

Ćao Filipe! Ovo je tvoj vodič kroz plan izrade novog sajta. Pročitaj ga celog pre nego što kreneš. **Development (kod sajta) još ne počinje**; prvo završavamo pripremu (Faza 0), pa onda svako kreće sa svojim modulima.

## 1. Šta da pročitaš, ovim redom

| # | Fajl | Zašto |
|---|---|---|
| 1 | [`AGENTS.md`](../AGENTS.md) | Osam pravila projekta, kratko |
| 2 | [`CONTRIBUTING.md`](../CONTRIBUTING.md) | Kako radimo: grane, pull request, pregled |
| 3 | [`plan/README.md`](README.md) | Ceo plan: moduli, ko radi šta, faze, kako se nastavlja posao |
| 4 | [`plan/concept.md`](concept.md) | Kako će sajt izgledati i gde ide koji tekst |
| 5 | [`plan/challenge.md`](challenge.md) | Rizici, dileme i **lista za Fazu 0** |
| 6 | [`plan/contracts.md`](contracts.md) | **Najvažnije za tebe**: koji folderi su tvoji, format sadržaja (šeme), rute. Ovo omogućava da radimo paralelno bez sudara |
| 7 | [`brand/index.html`](../brand/index.html) (otvori u pregledaču) | Brend kit: boje, slova, logo, ton |
| 8 | Planovi tvojih modula (tabela ispod) | Šta tačno praviš |

## 2. Tvoji moduli

| Modul | Šta | Kada možeš da kreneš |
|---|---|---|
| [M02 Prenos sadržaja](modules/M02-content-migration/PLAN.md) | 28 strana sa starog sajta u dogovoreni Markdown format | **Odmah posle Faze 0** (ne čeka kod, format je u `contracts.md`) |
| [M14 Prevod na engleski](modules/M14-translation/PLAN.md) | Sve tekstove na engleski: mašinski prvi prevod, ti ga urediš, Srđan proverava engleski. **Sve mora biti prevedeno pre lansiranja** (odluka D17) | Uporedo sa M02 |
| [M06 Tekstovi](modules/M06-articles/PLAN.md) | Strane za tekstove, teme, šablon teksta | Kad Srđan završi M00 |
| [M08 Edukacija](modules/M08-education/PLAN.md) | Besplatno učenje + lista čekanja za kurseve 2027. | Kad Srđan završi M00 |
| [M09 Individualne analize](modules/M09-analyses/PLAN.md) | Ponuda analiza, strana po analizi, forma za zahtev | Posle M00 i Goričinih odgovora |
| [M10 O meni, kontakt, pravne strane](modules/M10-about-contact-legal/PLAN.md) | Strane o Gorici, kontakt, privatnost, uslovi | Kad Srđan završi M00 |
| [M13 Provera i lansiranje](modules/M13-launch/PLAN.md) | Zajedno sa Srđanom, na kraju | Na kraju |

Srđan radi M00 (temelj), M03 (zaglavlje i podnožje), M04 (SEO), M05 (početna), M07 (horoskop), M11 (video) i M12 (forme).

## 3. Faza 0: tvoji zadaci sada (bez koda)

1. **Uključi dvofaktorsku prijavu (2FA) na svom GitHub nalogu** i javi Srđanu. (GitHub → Settings → Password and authentication.)
2. **Napravi Cloudflare nalog za sajt** (odluka D16), uključi 2FA i dodaj Srđana kao člana. Ne pravi još ništa na njemu; postavljanje radi M00.
3. **Razgovor sa Goricom.** Prođi sa njom kroz [`docs/sadrzaj/upitnik-za-goricu.md`](../docs/sadrzaj/upitnik-za-goricu.md):
   - pitanja 8–10 (kursevi) preskoči, kursevi su 2027;
   - **najvažnije:** 1 (ti ili vi), 7 (dečja astrologija kao usluga?), 12–17 (koje analize, cene, kako se zakazuje), 20–26 (newsletter, kontakt, pravno);
   - pitaj i kada stiže **novi godišnji horoskop** (stari važi još oko mesec dana);
   - pitaj je za **portret** i za originalni **vektorski logo** od dizajnera, ako postoji;
   - podseti je da promeni lozinku i uključi 2FA na Gmail-u, Instagramu i YouTube-u (`specs/09-security.md` §2).
   Odgovore upiši u upitnik i u fajlove `docs/sadrzaj/01–07`, umesto teksta u `[uglastim zagradama]`. To radiš kroz granu `docs/odgovori-gorice` i pull request.
4. **Spisak spam adresa sa starog sajta.** Iz backupa baze izvuci adrese (URL) onih oko 140 spam članaka i stavi ih u `docs/sadrzaj/stari-sajt/spam-adrese.md` (samo adrese, bez sadržaja). Trebaće u M13 da Google dobije status 410 za njih.
5. **Napravi svoj plan rada.** Za svaki svoj modul pročitaj `PLAN.md`; ako nešto fali ili nije jasno, dopiši pitanje u `REPORT.md` tog modula, pod „Problems and blockers”, i javi Srđanu. Ako misliš da zadatke treba podeliti drugačije, predloži to kroz pull request na `PLAN.md`.

Kad završiš Fazu 0, štikliraj svoje stavke u listi na dnu [`plan/challenge.md`](challenge.md).

## 4. Kako radiš na modulu (kad krene izrada)

1. `git switch main && git pull`
2. Napravi granu iz plana modula, na primer `git switch -c feature/m02-content-migration`.
3. Radi u malim koracima; dodiruj **samo svoje foldere** iz `contracts.md`. Ako ti treba izmena u tuđem folderu, napiši je u svom izveštaju pod „Requests to other modules” i javi vlasniku.
4. **Na kraju svake radne sesije ažuriraj `REPORT.md` svog modula**, čak i ako nisi završio:
   - šta je urađeno (sa dokazom: komanda i rezultat, ili link na PR);
   - šta nije urađeno;
   - problemi i blokade;
   - **„Next step”**: tačno šta je sledeće, sa komandama, tako da može da nastavi neko drugi ili ti sa drugog računara.

   Ažuriraj i red svog modula u `status/STATUS.md`, i dodaj jedan red u `status/log.md`.
5. Otvori pull request; Srđan pregleda; posle odobrenja spajaš (**Squash and merge**).

## 5. Saveti za M02 i M14

- **Format je zakon.** Svaki tekst ima zaglavlje (front matter) tačno po `contracts.md` §3: naslov, opis, jezik, `translationKey`, datumi, teme, „odgovor prvo” od 40–60 reči.
- **Ne menjaj Goričin glas.** Laka uređivanja (odgovor prvo, naslovi kao pitanja) da, prepravljanje smisla ne. Gorica odobrava uređene tekstove.
- **Datumi tranzita:** svaki datum proveri u efemeridi i tek onda postavi `ephemerisChecked: true`. Kad nisi siguran, ostavi `false` i napiši u izveštaju.
- **Prevod:** mašinski prevod je samo početak. Pročitaj ceo engleski tekst, ispravi astrološke izraze po rečniku (`plan/modules/M14-translation/glossary.md`, koji praviš ti), pa ga pošalji Srđanu na proveru. Šalji ga u manjim paketima (na primer pet tekstova po PR-u), da pregled bude brz.
- **Vodi brojku reči** u izveštaju M14 (koliko je prevedeno od ukupno oko 20.000), da se vidi da li stižemo do lansiranja.

## 6. Šta ne radiš

- Ne praviš kod sajta (`site/`) dok Srđan ne završi M00 i potvrdi `contracts.md`.
- Ne menjaš `brand/` (to je zamrznuti brend kit).
- Ne stavljaš lozinke, ključeve ni tokene u repozitorijum (GitHub će ih ionako blokirati).
- Ne vraćaš stari WordPress sajt i ne stavljaš backup na server ni u repozitorijum.

## 7. Kad zapne

Napiši u `REPORT.md` šta je problem i šta si probao, pa pošalji Srđanu link. Pitanja su deo posla; bolje pitati rano nego popravljati kasnije. Engleski u PR-ovima i komentarima je dobrodošao: dobra je vežba.
