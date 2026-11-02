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

## Brend kit (pravac D, Midnight Lens)

Gorica je izabrala **pravac D, Midnight Lens**. Ceo brend je u folderu [`brand/`](brand/): pravila (logo, boje, slova, elementi, ton komunikacije), fajlovi loga, fontovi, tokeni dizajna, šabloni za Instagram i YouTube i odobrena početna strana. Sve je na **srpskom i engleskom**.

### Kako da ga pogledaš, korak po korak

1. **Preuzmi projekat:** https://github.com/skojic/astromicroscope/archive/refs/heads/main.zip
2. **Raspakuj** fajl `astromicroscope-main.zip` (dupli klik; na Windows-u desni klik → „Extract All” / „Izdvoj sve”).
3. U folderu `astromicroscope-main/brand` dupli klik na **`index.html`**: to je brend kit.
4. Odozgo je meni sa poglavljima (Suština, Logo, Boje, Tipografija …); dole je dugme **„Početna strana (referenca)”** za odobreni izgled sajta.
5. Jezik menjaš dugmićima **SR / EN**.
6. Šabloni za objave su u `brand/social` (otvori, klikni na tekst da ga promeniš). Profilna slika je `brand/logo/png/instagram-avatar-1080.png`.

Sa Git-om:
```bash
git clone https://github.com/skojic/astromicroscope.git
cd astromicroscope
open brand/index.html        # Mac
start brand\index.html       # Windows
```

---

## Struktura projekta

| Folder / fajl | Sadržaj |
|---|---|
| `docs/` | Originalni brief klijenta |
| `brand/` | **Brend kit** (pravac D): pravila, logo, fontovi, tokeni dizajna, šabloni za društvene mreže, odobrena početna strana. Izvor istine za izgled sajta |
| `AGENTS.md` | Kratka pravila za rad (i za AI alate) |
| `specs/` | **Šta** se pravi: proizvod, mapa sajta, dizajn sistem, tehnologija, sadržaj, jezici, SEO i AI pretraga, performanse i Core Web Vitals, pristupačnost |
| `plan/` | **Kako** se pravi sajt: koncept, ugovor za spajanje, kritički osvrt, 15 modula; svaki ima plan (`PLAN.md`) i izveštaj (`REPORT.md`) |
| `testing/` | **Kada je gotovo**: kapije kvaliteta (G0–G5), plan testiranja, kontrolne liste |
| `CONTRIBUTING.md` | **Kako radimo**: grane `feature/`, `fix/`, `docs/`, pull request, pregled i spajanje (uputstvo za saradnike) |
| `.github/` | Pravila za GitHub: ko pregleda (CODEOWNERS), provera naziva grane, šablon za pull request |
| `status/` | **Gde smo**: `STATUS.md` (trenutno stanje i tabela svih delova), `log.md` (dnevnik rada), `decisions.md` (odluke i otvorena pitanja) |

Trenutno stanje projekta je uvek u [`status/STATUS.md`](status/STATUS.md).
