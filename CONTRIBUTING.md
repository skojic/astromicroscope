# Kako radimo na projektu

Ovo je uputstvo za rad na Astromicroscope repozitorijumu. Radimo kao u pravom timu: **niko ne menja `main` direktno**. Svaka izmena ide preko posebne grane i pull requesta, Srđan je pregleda i odobri, i tek onda ide u `main`.

Zašto: `main` je uvek ispravna verzija projekta. Pregled (review) hvata greške pre nego što stignu tamo, a usput se uči.

## Pravila ukratko

| Pravilo | Šta znači |
|---|---|
| Nema direktnog pusha na `main` | GitHub će odbiti `git push` na `main`. |
| Grana po zadatku | Jedna grana = jedna izmena (jedna funkcija, jedna ispravka). |
| Naziv grane | `feature/…` nova funkcija, `fix/…` ispravka greške, `docs/…` dokumentacija. Posle `/` kratak opis: mala slova, cifre, crtice. Primeri: `feature/hero-sekcija`, `fix/prevod-footer`, `docs/uputstvo-za-git`. |
| Pull request | Svaka grana ulazi u `main` samo preko pull requesta (PR). |
| Odobrenje | Srđan dobija obaveštenje i pregleda PR. Bez njegovog odobrenja nema spajanja. |
| Nova izmena posle odobrenja | Ako posle odobrenja pošalješ novi commit, odobrenje se poništava i Srđan pregleda ponovo. |
| Komentari | Svi komentari u pregledu moraju biti rešeni (**Resolve conversation**) pre spajanja. |
| Spajanje | Posle odobrenja PR spajaš ti, dugmetom **Squash and merge**. Ako nisi tu, može i Srđan. |
| Provera naziva | GitHub automatski proverava naziv grane. Ako nije dobar, dobićeš komentar na PR-u (srpski i engleski) sa tačnim komandama za ispravku. |

## Korak po korak

### 1. Osveži `main`
Uvek kreni od najnovije verzije.
```bash
git switch main
git pull
```

### 2. Napravi granu
Izaberi prefiks prema vrsti izmene i kratak opis.
```bash
git switch -c feature/hero-sekcija
```
Ako si pogrešio naziv **pre** nego što si poslao granu na GitHub, samo je preimenuj:
```bash
git branch -m feature/hero-sekcija
```
Ako je grana **već na GitHub-u i PR je otvoren**, prati uputstvo iz komentara koji će provera ostaviti na PR-u: napravi novu granu sa istim izmenama, otvori novi PR i zatvori stari.

### 3. Radi i pravi male commitove
```bash
git status                  # šta je izmenjeno
git add putanja/do/fajla    # dodaj samo ono što pripada ovoj izmeni
git commit -m "Dodaj hero sekciju na početnu stranu"
```
Poruka commita:
- počinje glagolom u imperativu: „Dodaj”, „Ispravi”, „Obriši”, „Ažuriraj” (ili na engleskom: “Add”, “Fix”, “Remove”, “Update”);
- kaže **šta** se menja, kratko (do ~70 znakova);
- ako treba objašnjenje **zašto**, ostavi prazan red pa napiši više.

Pre svakog commita proveri `git diff --staged`: tu vidiš tačno šta šalješ.

### 4. Pošalji granu na GitHub
Prvi put:
```bash
git push -u origin feature/hero-sekcija
```
Svaki sledeći put samo `git push`.

### 5. Otvori pull request
Na GitHub-u će se pojaviti dugme **Compare & pull request**. Ili iz terminala:
```bash
gh pr create --base main
```
- Naslov: isto kao dobra poruka commita.
- Opis: popuni šablon koji se sam pojavi (šta, zašto, kako je testirano, kontrolna lista).
- Srđan automatski dobija zahtev za pregled; ne moraš nikoga da dodaješ.

### 6. Sačekaj proveru i pregled
- **Provera naziva grane** (`branch-name`) mora biti zelena ✓. Ako je crvena ✗, pročitaj komentar na PR-u.
- **Pregled**: Srđan može da odobri (**Approve**) ili da zatraži izmene (**Request changes**). Kako se čitaju i rešavaju komentari: [`docs/workflow/review-guide.md`](docs/workflow/review-guide.md).
- Izmene radiš na **istoj grani**: commit, `git push`, i PR se sam ažurira.

### 7. Spoji (merge)
Kada je PR odobren, provera zelena i svi komentari rešeni:
1. klikni **Squash and merge** (svi tvoji commitovi postaju jedan uredan commit na `main`);
2. proveri naslov tog commita, pa **Confirm squash and merge**;
3. grana se na GitHub-u briše automatski.

### 8. Počisti lokalno
```bash
git switch main
git pull
git branch -d feature/hero-sekcija
```

## Kad nešto pođe naopako

| Problem | Rešenje |
|---|---|
| `git push` na `main` je odbijen | Tako treba. Napravi granu od svojih izmena: `git switch -c feature/opis`, pa `git push -u origin feature/opis`. Zatim vrati svoj lokalni `main`: `git switch main` i `git reset --hard origin/main` (pažljivo: ovo briše lokalne izmene na `main`, ali one su već sačuvane na novoj grani). |
| Commitovao si na `main` umesto na granu | Isto kao gore: `git switch -c feature/opis` čuva commit na novoj grani; zatim vrati `main` na `origin/main`. |
| `git push` kaže *rejected (fetch first)* | Na GitHub-u ima novih commitova na tvojoj grani. `git pull`, reši eventualni konflikt, pa `git push`. |
| Konflikt sa `main` na PR-u | `git switch main && git pull`, pa `git switch tvoja-grana && git merge main`. U fajlovima sa konfliktom izaberi ispravnu verziju i obriši oznake `<<<<<<<`, `=======`, `>>>>>>>`. Zatim `git add`, `git commit`, `git push`. Ako nisi siguran, pitaj pre nego što nešto obrišeš. |
| Pogrešna poruka poslednjeg commita (još nije poslat) | `git commit --amend -m "Nova poruka"` |
| Ne znaš u kom si stanju | `git status` i `git log --oneline -5`. Ako je i dalje nejasno, pošalji Srđanu izlaz ove dve komande. |

**Nikada** ne koristi `git push --force` na `main` (GitHub to ionako blokira). Na svojoj grani samo ako znaš zašto, i najbolje posle dogovora.

## Projekat i dokumentacija
Pre rada pročitaj [`AGENTS.md`](AGENTS.md) i [`status/STATUS.md`](status/STATUS.md). Svaki zadatak ima svoj fajl u `modules/` ili `specs/`, a na kraju zadatka ažuriraš `status/STATUS.md` i `status/log.md`.
