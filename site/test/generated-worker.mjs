// The Worker's generated module (the 404 pages and the 143 spam paths) is written by the build. The tests that import the
// Worker run `npm run build` first (P07, D59); this helper gives a clear error instead of a module-not-found when it is
// missing, and says what to run.
import { existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

export const GENERATED = fileURLToPath(new URL('../src/worker/generated/not-found.ts', import.meta.url));

export function requireGenerated() {
  if (!existsSync(GENERATED)) {
    throw new Error(`run \`npm run build\` first: it writes ${GENERATED.replace(/^.*\/site\//, 'site/')} (P07, D59)`);
  }
}
