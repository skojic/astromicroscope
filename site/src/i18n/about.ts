import { defineStrings, type Strings } from './core';
import about from './about.json';

export const aboutStrings = defineStrings('about', about as Strings);