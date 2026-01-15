import { createContext, useContext } from "react";
import type { Dispatch, SetStateAction } from "react";
import type { Animal } from "../data/animals/animals";

export type SpeciesFilter = "all" | "dog" | "cat";
export type SortKey = "name-asc" | "age-asc" | "age-desc";
export type AgeRange = [number, number];

type SetState<T> = Dispatch<SetStateAction<T>>;

export type AppContextValue = {
  species: SpeciesFilter;
  query: string;
  ageRange: AgeRange;
  sortKey: SortKey;
  highlightKeys: Set<string>;
  considerationKeys: Set<string>;
  setSpecies: SetState<SpeciesFilter>;
  setQuery: SetState<string>;
  setAgeRange: SetState<AgeRange>;
  setSortKey: SetState<SortKey>;
  setHighlightKeys: SetState<Set<string>>;
  setConsiderationKeys: SetState<Set<string>>;
  clearFilters: () => void;
  filteredAnimals: Animal[];
  counts: { dogs: number; cats: number; total: number };
  allHighlights: string[];
  allConsiderations: string[];
  expandedBioIds: Set<string>;
  toggleBio: (id: string) => void;
  crateIds: Set<string>;
  crateItems: Animal[];
  toggleCrate: (id: string) => void;
  clearCrate: () => void;
  quickAdopt: (id: string) => void;
};

export const AppContext = createContext<AppContextValue | null>(null);

export function useAppContext() {
  const ctx = useContext(AppContext);
  if (!ctx) {
    throw new Error("useAppContext must be used within AppProvider");
  }
  return ctx;
}
