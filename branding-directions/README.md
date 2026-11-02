# Kako pogledati predloge dizajna

U folderu `branding-directions/` nalaze se četiri predloga izgleda sajta i brenda za Astromicroscope. Svaki predlog je cela početna strana sajta, a na dnu strane je kratak prikaz brenda: logo, boje, fontovi i primeri Instagram objava.

Svi predlozi prate brief iz `docs/brief-klijenta.md`: sajt je pre svega edukativna platforma (programi, snimljeni kursevi, digitalni proizvodi, autorski tekstovi), a natalna, solarna i karmička analiza i konsultacije za životne oblasti su premijum, individualni deo ponude. Dominiraju bela i nežna bež, uz plave tonove od svetloplave do tamnoplave i diskretne zlatne detalje. U svakom predlogu su i tri najnovija videa sa YouTube kanala.

| Predlog | Ukratko |
|---|---|
| **A · Under the Lens** | Astrologija pod mikroskopom: potpuno svetao, smiren i precizan. Lupa koja se pomera po natalnoj karti. |
| **B · Cycles** | Gradi se na rečenici „Tvoja priroda. Tvoji ciklusi.” Elegantan modni stil: krupna Bodoni slova u ultramarin plavoj, na beloj i bež podlozi. |
| **C · Sky Atlas** | Škola astrologije: četiri elementa kao sistem boja (vatra zlatna, zemlja bež, vazduh svetloplava, voda tamnoplava). Najprirodniji za kurseve. |
| **D · Midnight Lens** | Predlog A sa noćnim nebom u zaglavlju: zvezde koje prate kursor. Koristi postojeći logo (G sa mikroskopom), prekopiran u vektor. |

Svi predlozi su na **srpskom i engleskom**: srpski je podrazumevan, a jezik se menja dugmićima **SR / EN** u zaglavlju strane ili u meniju na dnu. Izbor jezika se pamti. Cene, datumi, naziv fakulteta i broj termina mesečno su privremeni tekst u [uglastim zagradama].

---

## Način 1: bez ikakvih programa (preporučeno)

1. Otvori ovaj link u pregledaču. Odmah se preuzima ZIP fajl:
   https://github.com/skojic/astromicroscope/archive/refs/heads/main.zip
2. Otvori preuzeti fajl `astromicroscope-main.zip` (dupli klik) da se raspakuje.
3. U raspakovanom folderu `astromicroscope-main` otvori `branding-directions`, pa dupli klik na **`index.html`**.
4. Otvoriće se pregled sva četiri predloga jedan pored drugog. Klikni na „Open direction …” da otvoriš ceo predlog.

## Način 2: preko Git-a

Za one koji već koriste Git, ili žele da uvek imaju najnoviju verziju.

**Instalacija Git-a (samo prvi put)**
- **Mac:** otvori aplikaciju Terminal i ukucaj `git --version`. Ako Git nije instaliran, Mac će ponuditi da ga instalira; prihvati.
- **Windows:** preuzmi i instaliraj Git sa https://git-scm.com/download/win (podrazumevana podešavanja su u redu).

**Preuzimanje projekta**

Otvori Terminal (Mac) ili Git Bash (Windows) i ukucaj:

```bash
cd ~/Desktop
git clone https://github.com/skojic/astromicroscope.git
```

Na radnoj površini pojaviće se folder `astromicroscope`.

**Otvaranje pregleda**

- Mac: `open ~/Desktop/astromicroscope/branding-directions/index.html`
- Windows: `start ~/Desktop/astromicroscope/branding-directions/index.html`, ili dupli klik na `index.html` u folderu.

**Kada stigne nova verzija**

```bash
cd ~/Desktop/astromicroscope
git pull
```

---

## Saveti za gledanje

- Gledaj na **laptopu ili računaru**, u Chrome-u, Safari-ju ili Edge-u, ceo ekran. Mobilna verzija postoji, ali je utisak najbolji na većem ekranu.
- Potreban je **internet**, jer se fontovi i sličice YouTube videa učitavaju sa interneta. Bez interneta stranice rade, ali sa drugačijim slovima i bez sličica.
- Koristi **miša ili tačped**:
  - u predlozima A i D pomeri kursor preko natalne karte da vidiš lupu;
  - u predlogu D pomeraj kursor po tamnom zaglavlju da vidiš zvezde;
  - u predlogu B klikni na nazive analiza da se otvore;
  - u predlogu C pređi mišem preko znakova zodijaka.
- Na dnu svake strane je meni za brzo prebacivanje između predloga i jezika (SR / EN).
- Skroluj **do samog kraja** svake strane: tamo je prikaz brenda (logo, boje, fontovi, Instagram).

## Pitanja koja pomažu pri izboru

1. Koji predlog najviše liči na tebe i na način na koji radiš?
2. Koji bi ti bilo prijatno da gledaš na svom Instagramu svaki dan?
3. Koji najbolje nosi edukacije i kurseve, a da individualne analize i dalje deluju ekskluzivno?
4. Da li tamno noćno nebo u zaglavlju (predlog D) ili potpuno svetao sajt (A, B, C)?
5. Šta ti se dopada u predlozima koje ne biraš? Delovi se mogu kombinovati, na primer boje iz jednog i lupa iz drugog.

Odgovore, ili samo slovo predloga koji ti se najviše dopada, pošalji Srđanu.

---

## Lokalna kopija projekta (za Srđana)

Projekat je na Mac-u u `~/projects/astromicroscope`, na grani `main`. Na novom računaru:

```bash
cd ~/projects
git clone https://github.com/skojic/astromicroscope.git
cd astromicroscope
open branding-directions/index.html
```

Za pregled preko lokalnog servera (isto kao `file://`, ali sa adresom koja se može otvoriti na drugom uređaju u istoj mreži):

```bash
cd ~/projects/astromicroscope/branding-directions
python3 -m http.server 8765
```

pa u pregledaču otvori http://localhost:8765/.
