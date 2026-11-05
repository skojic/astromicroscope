import { defineStrings, type Strings } from './core';
import articles from './articles.json';

export const articleStrings = defineStrings('articles', articles as Strings);