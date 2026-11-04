import { defineStrings, type Strings } from './core';
import newsletter from './newsletter.json';

export const newsletterStrings = defineStrings('newsletter', newsletter as Strings);