import { defineStrings, type Strings } from './core';
import videos from './videos.json';

export const videoStrings = defineStrings('videos', videos as Strings);
