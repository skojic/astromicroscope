import { defineStrings, type Strings } from './core';
import analyses from './analyses.json';

export const analysesStrings = defineStrings('analyses', analyses as Strings);