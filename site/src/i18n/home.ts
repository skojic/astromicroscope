import { defineStrings, type Strings } from './core';
import home from './home.json';

export const homeStrings = defineStrings('home', home as Strings);
