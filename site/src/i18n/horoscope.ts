import { defineStrings, type Strings } from './core';
import horoscope from './horoscope.json';
import type { Lang } from './core';

export const horoscopeStrings = defineStrings('horoscope', horoscope as Strings);

/** The Serbian URL slug for a sign, per D31 (the sign page lives at /horoskop/<serbian slug>/). */
export const SIGN_SLUG_SR: Record<string, string> = {
  aries: 'ovan',
  taurus: 'bik',
  gemini: 'blizanci',
  cancer: 'rak',
  leo: 'lav',
  virgo: 'devica',
  libra: 'vaga',
  scorpio: 'skorpija',
  sagittarius: 'strelac',
  capricorn: 'jarac',
  aquarius: 'vodolija',
  pisces: 'ribe',
};

/** Serbian URL slug -> English sign key (the reverse map). */
export const SLUG_TO_SIGN: Record<string, string> = Object.fromEntries(
  Object.entries(SIGN_SLUG_SR).map(([sign, slug]) => [slug, sign]),
);

/** Localized display name of a sign. */
export function signName(sign: string, lang: Lang): string {
  const key = sign as keyof typeof horoscopeStrings;
  return horoscopeStrings[key]?.[lang] ?? sign;
}