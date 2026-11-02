# 02 · Edukacija

Modul: `learn-formats` · Sekcija na početnoj + hub `/edukacija/` i `/en/learn/`

## Svrha
Glavni deo sajta (brief: „glavni fokus su edukacije, snimljeni kursevi i digitalni proizvodi"). Pokazuje četiri načina učenja, od besplatnog do najdubljeg.

## Uvod sekcije

| Element | SR | EN |
|---|---|---|
| H2 | Nauči astrologiju, onoliko duboko koliko želiš. | Learn astrology, at the depth you want. |
| Uvod | Svaki format uči metod, a ne samo značenja: kako se karta pravi, kako se čita i zašto. Počni od besplatnog teksta ili idi sve do samostalnog čitanja karata. | Every format teaches the method, not just the meanings: how a chart is built, how it is read, and why. Start with a free article or go all the way to reading charts yourself. |

## Četiri formata (kartice)

| # | Oznaka | Naslov | Opis | Detalj | Dugme |
|---|---|---|---|---|---|
| 1 SR | Uživo sa Goricom | Edukativni programi | Programi u malim grupama, od dvanaest znakova do čitanja cele karte, sa časovima uživo i domaćim zadacima na pravim kartama. | Sledeća grupa [datum] | Pogledaj programe |
| 1 EN | Live with Gorica | Educational programs | Group programs in small cohorts, from the twelve signs to a full chart reading, with live sessions and homework on real charts. | Next cohort [date] | See the programs |
| 2 SR | Svojim tempom | Snimljeni kursevi | Video lekcije sa primerima karata i vežbama. Gledaj kad ti odgovara i zadrži ih zauvek. | Od [cena] € | Pogledaj kurseve |
| 2 EN | At your own pace | Recorded courses | Video lessons with chart examples and exercises. Watch them when it suits you and keep them for good. | From € [price] | Browse courses |
| 3 SR | Za preuzimanje | Digitalni proizvodi | Radne sveske, radni listovi za karte i godišnji vodič kroz velike tranzite, spremni za štampu ili ekran. | Od [cena] € | Pogledaj ponudu |
| 3 EN | To download | Digital products | Workbooks, chart worksheets and the yearly guide to the major transits, ready to print or use on screen. | From € [price] | See the shop |
| 4 SR | Besplatno | Tekstovi | Goričini autorski tekstovi o planetama, tranzitima i tome kako se astrologija zaista radi. Dobro mesto za početak. | Novo svake [nedelje] | Čitaj tekstove |
| 4 EN | Free | Articles | Gorica's own writing on planets, transits and how astrology is actually practised. A good place to start. | New every [week] | Read the articles |

## Strana jednog kursa (šablon, `specs/04`)
Za svaki kurs treba: ishod (šta ćeš znati na kraju), za koga je, program po lekcijama, format, trajanje, cena, predavač, česta pitanja, dugme za upis.

| Polje | Kurs 1 | Kurs 2 |
|---|---|---|
| Naziv | [naziv kursa] | [naziv kursa] |
| Za koga | [početnici / napredni] | |
| Ishod | [šta polaznik zna na kraju] | |
| Broj lekcija i trajanje | [n lekcija, n sati] | |
| Format | [uživo / snimljeno] | |
| Cena | [cena] € | |

## Tekstovi koji već postoje
Sa starog sajta je sačuvano 10 autorskih tekstova i godišnji horoskop za 12 znakova (`stari-sajt/tekstovi/`, oko 20.000 reči). Odmah mogu da budu prvi sadržaj u `/tekstovi/`:

| Tekst | Tema (za tematske stranice) |
|---|---|
| Potencijali koji oblikuju budućnost | lični razvoj |
| Kako da vratiš sebe sebi | lični razvoj |
| Podznak kao skriveni odraz prave ličnosti | podznak (ascendent) |
| Astro vodič kroz finansije | druga kuća, novac |
| Šta otkriva dečji horoskop? | dečja astrologija |
| Mars u Strelcu | tranziti |
| Poslednji poziv za promenu: retrogradni Uran u Biku | tranziti, retrogradne planete |
| Vremenski tuneli pomračenja Sunca i Meseca | pomračenja |
| Jupiter u Lavu | tranziti |
| Kada Saturn pomeri tlo pod nogama | tranziti, četvrta kuća |
| Godišnji horoskop + 12 znakova | znakovi |

Pre objave: proveriti da li su tranziti još aktuelni (neki su vezani za 2025), proveriti datume u efemeridi i doraditi naslove u obliku pitanja sa odgovorom u prvom pasusu (`specs/04`). Stari linkovi (npr. `/godisnji-horoskop/`, koju Google još pamti) treba da preusmere na nove adrese.

## Nove teme (predlog, bez izmišljenih podataka o pretrazi)
Teme postoje u njenim videima, pa se brzo pretvaraju u tekst: Saturn u Ovnu (14. 2. 2026 – 13. 4. 2028, proveriti u efemeridi), Uran u Blizancima, retrogradni Merkur u Ribama, retrogradna Venera, karijera u natalnoj karti.

## Za Goricu
- Koje kurseve i programe ima **na startu** sajta (P05 u `status/decisions.md`)? Nazivi, cene, datumi.
- Koje digitalne proizvode ima ili planira?
- Koliko često može da objavljuje tekstove (svake nedelje, dve nedelje, mesečno)?
