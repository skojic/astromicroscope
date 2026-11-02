# Kako da radiš sa pregledom (code review)

Pregled nije ocena tebe, nego izmene. Cilj je da `main` ostane ispravan i da usput naučiš kako se radi u timu.

## Šta Srđan može da odgovori

| Odgovor na GitHub-u | Značenje | Šta radiš |
|---|---|---|
| **Approve** (odobreno) | Izmena je spremna. | Proveri da je `branch-name` zelen i da su svi komentari rešeni, pa **Squash and merge**. |
| **Request changes** (traže se izmene) | Nešto mora da se promeni pre spajanja. | Prođi kroz sve komentare (vidi dole), uradi izmene na istoj grani, `git push`, pa **Re-request review** (ikonica sa strelicama pored Srđanovog imena). |
| **Comment** (samo komentar) | Pitanje ili predlog, bez odluke. | Odgovori na pitanje; ako predlog ima smisla, uradi ga. |

## Kako čitamo komentare

Komentari počinju oznakom, da bi bilo jasno koliko su važni:

| Oznaka | Značenje |
|---|---|
| **obavezno:** | Mora da se uradi pre spajanja. |
| **predlog:** | Bolje bi bilo ovako; tvoja odluka, ali objasni ako ne prihvatiš. |
| **pitanje:** | Nije jasno zašto je urađeno ovako. Odgovori; možda ništa ne treba menjati. |
| **sitnica:** | Sitna stvar (razmak, zarez, naziv). Uradi ako je brzo. |
| **pohvala:** | Ovo je dobro urađeno. 🙂 |

## Kako odgovaraš

1. Na svaki komentar odgovori u istom razgovoru (thread): „Urađeno u abc1234”, ili objasni zašto si uradio drugačije.
2. Kada je stvar rešena, klikni **Resolve conversation**. Spajanje nije moguće dok ima nerešenih razgovora.
3. Ako ne razumeš komentar, pitaj. To je potpuno u redu i deo je posla.
4. Ne briši i ne prepravljaj istoriju commitova tokom pregleda (bez `--force`), da bi Srđan video šta se promenilo od prošlog pregleda. Na kraju će ionako sve postati jedan commit (**Squash and merge**).

## Dobar pull request

- **Mali**: idealno do nekoliko stotina izmenjenih redova. Veliki PR se teško pregleda; podeli ga na više manjih.
- **Jedna stvar**: hero sekcija u jednom PR-u, prevod footera u drugom.
- **Opis koji pomaže**: šta, zašto, kako je testirano (šablon to traži).
- **Sam ga prvo pregledaj**: na kartici **Files changed** pročitaj svoje izmene kao da su tuđe. Često tu nađeš sitnice pre Srđana.

## Engleski
Komentari i poruke mogu biti i na engleskom; to je dobra vežba. Česte reči u pregledu:
*LGTM* (looks good to me, izgleda dobro), *nit* (sitnica), *blocking* (obavezno), *suggestion* (predlog), *PTAL* (please take another look, pogledaj ponovo).
