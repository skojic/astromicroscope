import { defineStrings, type Strings } from './core';
import learn from './learn.json';

export const learnStrings = defineStrings('learn', learn as Strings);