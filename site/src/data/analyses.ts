// Analyses (M09, D19) — the premium offer, per plan/contracts.md section 3 (Analysis).
// Names, summaries, needs and format are Gorica's own text (docs/sadrzaj/04); English is a work draft (M14 review).
export interface LocaleText { sr: string; en: string }
export interface Analysis {
  id: string;
  order: number;
  name: LocaleText;
  summary: LocaleText;
  /** What the analysis covers (list), per the analysis-page template (specs/04). */
  includes: { sr: string[]; en: string[] };
  needs: LocaleText;
  duration: LocaleText | null;
  format: LocaleText;
  price: number | null;
  priceEur: number | null;
  currency: 'RSD' | 'EUR' | null;
}

export const analyses: Analysis[] = [
  {
    id: 'natal',
    order: 1,
    name: { sr: 'Natalna analiza', en: 'Natal analysis' },
    summary: {
      sr: 'Svaka natalna karta predstavlja jedinstven simbolički prikaz naših potencijala, životnih obrazaca i ciklusa kroz koje prolazimo. Kroz njenu simboliku istražujem karakter, sposobnosti, potencijale, porodične obrasce, partnerske odnose, profesionalne predispozicije i druge važne životne oblasti.',
      en: 'Every natal chart is a unique symbolic picture of our potential, our life patterns and the cycles we move through. Through its symbolism I explore character, abilities, potential, family patterns, relationships, professional inclinations and other important areas of life.',
    },
    includes: {
      sr: ['Karakter i sposobnosti', 'Porodični obrasci', 'Partnerski odnosi', 'Profesionalne predispozicije'],
      en: ['Character and abilities', 'Family patterns', 'Relationships', 'Professional inclinations'],
    },
    needs: { sr: 'Datum, tačno vreme i mesto rođenja.', en: 'Date, exact time and place of birth.' },
    duration: { sr: 'do 90 minuta', en: 'up to 90 minutes' },
    format: { sr: 'Razgovor telefonom; termin se rezerviše uplatom unapred.', en: 'Session by phone; booked with payment in advance.' },
    price: null,
    priceEur: null,
    currency: 'RSD',
  },
  {
    id: 'solar',
    order: 2,
    name: { sr: 'Solarna analiza', en: 'Solar return analysis' },
    summary: {
      sr: 'Solarna karta izrađuje se za period od jednog rođendana do sledećeg i predstavlja simbolički prikaz tema koje mogu biti naglašene tokom te godine. Analiza obuhvata najvažnije životne oblasti, potencijalne promene, izazove i vremenske periode značajne za donošenje odluka.',
      en: 'A solar return chart covers the period from one birthday to the next and gives a symbolic picture of the themes that may be emphasised during that year. It covers the most important areas of life and the periods that may matter for decisions.',
    },
    includes: {
      sr: ['Najvažnije životne oblasti', 'Potencijalne promene', 'Izazovi i mogućnosti', 'Vremenski periodi za odluke'],
      en: ['Most important areas of life', 'Possible changes', 'Challenges and opportunities', 'Periods for decisions'],
    },
    needs: { sr: 'Datum, tačno vreme i mesto rođenja.', en: 'Date, exact time and place of birth.' },
    duration: { sr: 'do 60 minuta', en: 'up to 60 minutes' },
    format: { sr: 'Razgovor telefonom; termin se rezerviše uplatom unapred.', en: 'Session by phone; booked with payment in advance.' },
    price: null,
    priceEur: null,
    currency: 'RSD',
  },
  {
    id: 'karmic',
    order: 3,
    name: { sr: 'Karmička analiza', en: 'Karmic analysis' },
    summary: {
      sr: 'Karmička analiza bavi se istraživanjem dubljih životnih obrazaca, nasleđenih iskustava i tema koje se ponavljaju tokom života. Usmerena je na razumevanje unutrašnjih procesa, simbolike karmičkog nasleđa i obrazaca značajnih za lični razvoj i evoluciju svesti.',
      en: 'A karmic analysis explores deeper life patterns, inherited experiences and themes that repeat over a lifetime. It focuses on understanding inner processes, the symbolism of karmic inheritance and the patterns that can matter for personal growth.',
    },
    includes: {
      sr: ['Dublji životni obrasci', 'Nasleđena iskustva', 'Simbolika karmičkog nasleđa', 'Lični razvoj'],
      en: ['Deeper life patterns', 'Inherited experiences', 'Karmic inheritance', 'Personal growth'],
    },
    needs: { sr: 'Datum, tačno vreme i mesto rođenja.', en: 'Date, exact time and place of birth.' },
    duration: { sr: 'do 60 minuta', en: 'up to 60 minutes' },
    format: { sr: 'Razgovor telefonom; termin se rezerviše uplatom unapred.', en: 'Session by phone; booked with payment in advance.' },
    price: null,
    priceEur: null,
    currency: 'RSD',
  },
  {
    id: 'consultation',
    order: 4,
    name: { sr: 'Astrološke konsultacije', en: 'Astrological consultation' },
    summary: {
      sr: 'Astrološke konsultacije namenjene su osobama koje žele da se detaljnije posvete određenoj životnoj temi. Tema može biti partnerski odnos, porodica, posao, finansije, preseljenje ili neka druga važna životna oblast.',
      en: 'Astrological consultations are for people who want to look more closely at one particular area of life. The topic can be a relationship, family, work, finances, relocation or another important area of life.',
    },
    includes: {
      sr: ['Određena životna tema', 'Partnerski odnos', 'Posao i finansije', 'Preseljenje i životne odluke'],
      en: ['A specific life topic', 'Relationship', 'Work and finances', 'Relocation and life decisions'],
    },
    needs: { sr: 'Datum, tačno vreme i mesto rođenja (za natalnu kartu).', en: 'Date, exact time and place of birth (for the natal chart).' },
    duration: { sr: 'do 60 minuta', en: 'up to 60 minutes' },
    format: { sr: 'Razgovor telefonom; termin se rezerviše uplatom unapred.', en: 'Session by phone; booked with payment in advance.' },
    price: null,
    priceEur: null,
    currency: 'RSD',
  },
].sort((a, b) => a.order - b.order);