# Context & Problem
This repo is a Vite + React template that will be publicly forked/cloned by users. It uses npm (not pnpm). We want:
1) A public-friendly dependency setup (it will only truly work for end users after @collie-lang/* packages are published).
2) A reliable local development/testing flow for the Collie authors to test unpublished changes from the local collie monorepo WITHOUT using npm link and WITHOUT workspace protocol.
3) Remove any “relink” script that depends on `npm link`, because it causes type duplication and fragile installs.

IMPORTANT:
- Do NOT write tests.
- The template must remain simple and standard for public users.
- Local Collie dev flow should use tarballs produced by the collie repo (`pnpm local:pack`).

# Do NOT write tests
- Do NOT add tests or test tooling.
- Do NOT modify CI.

# Tasks

## A) Remove npm-link workflow
- Remove the existing `relink` script that runs `npm link ...` for @collie-lang/* packages.
- Replace it with a local-tarball install workflow.

## B) Add “install from local Collie tarballs” workflow (author-only)
Add a small script under `scripts/` (ex: `scripts/use-local-collie.mjs`) that:
1) Accepts a path to the collie repo’s `.local-packs/manifest.json` (or the folder).
2) Reads the manifest and installs the needed tarballs using npm.
3) Installs packages into correct dependency buckets:
   - `@collie-lang/vite` should be a devDependency
   - `@collie-lang/react` should be a dependency
   - any additional @collie-lang runtime packages used by the template should be dependencies
4) Runs `npm install` in a deterministic way:
   - remove `node_modules` + `package-lock.json` only if user explicitly passes a `--clean` flag
   - otherwise do not aggressively delete things

Add npm scripts:
- `local:collie:use` => `node scripts/use-local-collie.mjs --manifest ../collie/.local-packs/manifest.json`
- `local:collie:clean` => deletes node_modules + lock file (optional convenience)

## C) Public-facing dependencies
In `package.json`, add the *published* dependency placeholders:
- Add `@collie-lang/vite` in devDependencies with version `^1.1.1`
- Add `@collie-lang/react` in dependencies with version `^1.1.1`
Keep everything else (vite/react) as-is.

This does NOT make the template runnable for external users until publish, but it is the correct final state for when publish happens.

## D) Validate template usage patterns
- Ensure no direct `.collie` imports from userland TS/TSX. Template should render via:
  - `import { Collie } from '@collie-lang/react'`
  - `<Collie id="..." />`
- Ensure `vite.config.ts` uses `@collie-lang/vite` plugin.
- If plugin order matters, prefer `[collie(), react()]` OR document why the current order is correct.
  (Choose the order that matches Collie’s plugin assumptions.)

# Acceptance Criteria
- No scripts use `npm link`.
- Template has a clear, repeatable local testing flow using tarballs + manifest from collie repo.
- `package.json` includes `@collie-lang/vite` (devDependency) and `@collie-lang/react` (dependency) at `^1.1.1`.
- Template contains no direct `.collie` imports in TS/TSX.
- No tests added/changed.