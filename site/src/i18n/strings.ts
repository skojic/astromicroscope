// Interface strings of every module (contracts section 2): one `<module>.json` each, checked here when the build loads
// them (every key needs a non-empty sr and en text, or the build fails). The horoscope and transit strings live in
// horoscope.ts and transits.ts, next to the logic that uses them.
import { defineStrings, type Strings } from './core';
import about from './about.json';
import analyses from './analyses.json';
import articles from './articles.json';
import common from './common.json';
import home from './home.json';
import learn from './learn.json';
import newsletter from './newsletter.json';
import shell from './shell.json';
import videos from './videos.json';

export const aboutStrings = defineStrings('about', about as Strings);
export const analysesStrings = defineStrings('analyses', analyses as Strings);
export const articleStrings = defineStrings('articles', articles as Strings);
export const commonStrings = defineStrings('common', common as Strings);
export const homeStrings = defineStrings('home', home as Strings);
export const learnStrings = defineStrings('learn', learn as Strings);
export const newsletterStrings = defineStrings('newsletter', newsletter as Strings);
export const shellStrings = defineStrings('shell', shell as Strings);
export const videoStrings = defineStrings('videos', videos as Strings);
