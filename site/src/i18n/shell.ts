import { defineStrings, type Strings } from './core';
import shell from './shell.json';

/** Strings of the site shell (M03). */
export const shellStrings = defineStrings('shell', shell as Strings);
