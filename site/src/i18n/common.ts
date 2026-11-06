import { defineStrings, type Strings } from './core';
import common from './common.json';

export const commonStrings = defineStrings('common', common as Strings);