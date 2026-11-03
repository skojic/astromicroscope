import { defineStrings, type Strings } from './core';
import common from './common.json';

/** Strings shared by M00's own components. Each module adds its own `<module>.json` and validates it the same way. */
export const commonStrings = defineStrings('common', common as Strings);
