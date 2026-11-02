# Astromicroscope

Edukativna platforma za astrologiju – autorski pristup, znanje i edukativni programi.

## Cilj
Da Astromicroscope postane prepoznatljiv edukativni brend. Glavni fokus su edukacije, snimljeni kursevi i digitalni proizvodi, dok individualni rad predstavlja ekskluzivni (premijum) deo ponude.

## Sadržaj sajta
### Primarno (fokus)
- Edukativni programi
- Snimljeni kursevi
- Digitalni proizvodi
- Autorski tekstovi / blog
- Predstavljanje načina rada i pristupa astrologiji

### Premijum usluge (individualni rad)
- Natalna analiza
- Solarna analiza
- Karmička analiza
- Konsultacije za određene životne oblasti

## Vizuelni identitet
- Utisak: moderno, elegantno, profesionalno, kvalitetno
- Dominantne boje: bela i nežna bež
- Akcenat: nijanse plave, od svetloplave do duboke tamnoplave (simbolika Urana: originalnost, inovacija)
- Detalji: diskretni zlatni akcenti
- Pristup: jednostavno i praktično

## Dokumentacija
- [Originalni brief klijenta](docs/brief-klijenta.md)

---

## Predlozi dizajna: kako da ih pogledaš (za Goricu)

U folderu [`branding-directions/`](branding-directions/) su četiri predloga izgleda sajta i brenda (A, B, C i D), na **srpskom i engleskom**. Svaki predlog je cela početna strana sajta, a na dnu je prikaz brenda: logo, boje, slova i primeri Instagram objava. Ovo je referenca za izbor; kada izabereš pravac, od njega se pravi jedan konačan brending kit.

### Korak po korak (bez instaliranja bilo čega)

1. **Preuzmi projekat.** Otvori ovaj link u pregledaču; ZIP fajl se odmah preuzima:
   https://github.com/skojic/astromicroscope/archive/refs/heads/main.zip
2. **Raspakuj ga.** Dupli klik na preuzeti fajl `astromicroscope-main.zip` (Mac ga raspakuje sam; na Windows-u: desni klik → „Extract All” / „Izdvoj sve”).
3. **Otvori pregled.** U folderu `astromicroscope-main` otvori `branding-directions`, pa dupli klik na **`index.html`**. Otvoriće se u pregledaču (Chrome, Safari ili Edge).
4. **Pogledaj sva četiri predloga.** Na pregledu su A, B, C i D jedan pored drugog, sa kratkim opisom i tabelom poređenja. Klikni „Otvori predlog …” za ceo predlog.
5. **Isprobaj ih mišem.**
   - A i D: pomeraj kursor preko natalne karte, videćeš lupu.
   - D: pomeraj kursor po tamnom zaglavlju, zvezde prate kursor.
   - B: klikni na nazive analiza da se otvore.
   - C: pređi mišem preko znakova zodijaka.
6. **Promeni jezik** dugmićima **SR / EN** u zaglavlju ili u meniju na dnu strane.
7. **Skroluj do kraja svake strane**: tamo je prikaz brenda.
8. **Javi izbor Srđanu**: slovo predloga koji ti se najviše dopada, i šta bi volela da se preuzme iz ostalih (na primer „boje iz C, logo iz D”).

Saveti: gledaj na laptopu ili računaru, preko celog ekrana i sa uključenim internetom (fontovi i sličice YouTube videa se učitavaju sa interneta). Detaljnije uputstvo, uključujući preuzimanje preko Git-a i pitanja koja pomažu pri izboru: [`branding-directions/README.md`](branding-directions/README.md).

### Ako koristiš Git

```bash
git clone https://github.com/skojic/astromicroscope.git
cd astromicroscope
git pull                                  # kasnije, za najnoviju verziju
open branding-directions/index.html       # Mac
start branding-directions\index.html      # Windows
```

---

## Struktura projekta

| Folder / fajl | Sadržaj |
|---|---|
| `docs/` | Originalni brief klijenta |
| `branding-directions/` | Četiri predloga dizajna, srpski i engleski (referenca za izbor; ne menja se tokom izrade sajta) |
| `AGENTS.md` | Kratka pravila za rad (i za AI alate) |
| `specs/` | **Šta** se pravi: proizvod, mapa sajta, dizajn sistem, tehnologija, sadržaj, jezici, SEO i AI pretraga, performanse i Core Web Vitals, pristupačnost |
| `modules/` | **Kako** se pravi svaki deo sajta, sa zadacima |
| `testing/` | **Kada je gotovo**: kapije kvaliteta (G0–G5), plan testiranja, kontrolne liste |
| `CONTRIBUTING.md` | **Kako radimo**: grane `feature/`, `fix/`, `docs/`, pull request, pregled i spajanje (uputstvo za saradnike) |
| `.github/` | Pravila za GitHub: ko pregleda (CODEOWNERS), provera naziva grane, šablon za pull request |
| `status/` | **Gde smo**: `STATUS.md` (trenutno stanje i tabela svih delova), `log.md` (dnevnik rada), `decisions.md` (odluke i otvorena pitanja) |

Trenutno stanje projekta je uvek u [`status/STATUS.md`](status/STATUS.md).
