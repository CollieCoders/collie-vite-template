# Adoption Shop Refactor Notes

## What changed
- Added `src/context/AppContext.tsx` to centralize Adoption Shop state, derived data, and actions.
- `src/components/AdoptionShop.tsx` now wraps its UI with `AppProvider` and reads counts from context.
- `src/components/AnimalFilters.tsx`, `src/components/AnimalList.tsx`, and `src/components/CrateModal.tsx` now consume shared state via `useAppContext()`.
- Search input wiring now updates the query based on the user's input.

## Why these changes
- Splitting the UI into separate components required a shared source of truth for filters, memoized lists, crate contents, and expanded bios.
- Context prevents prop drilling and keeps filtering/sorting logic in one place so child components can focus on rendering.

## How it is wired now
- `AppProvider` (in `src/context/AppContext.tsx`) owns filter state, crate state, and expanded bios.
- Derived data (`filteredAnimals`, `counts`, `allHighlights`, `allConsiderations`, `crateItems`) is computed in the provider and exposed via context.
- `AnimalFilters` updates filter state and renders counts and filter options.
- `AnimalList` consumes `filteredAnimals` plus the crate/bio actions (`toggleCrate`, `toggleBio`, `quickAdopt`).
- `CrateModal` reads the same `crateItems`/`crateIds` and uses `toggleCrate` + `clearCrate` so it stays in sync with the list.
