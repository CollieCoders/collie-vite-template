import { useMemo, useState } from "react";
import type { ReactNode } from "react";
import { animals } from "../data/animals/animals";
import type { Animal } from "../data/animals/animals";
import {
  AppContext,
  type AgeRange,
  type AppContextValue,
  type SortKey,
  type SpeciesFilter,
} from "./AppContextBase";

const DEFAULT_AGE_RANGE: AgeRange = [0, 120];

const ANIMAL_COUNTS = {
  dogs: animals.filter((a) => a.species === "dog").length,
  cats: animals.filter((a) => a.species === "cat").length,
  total: animals.length,
};

const ALL_HIGHLIGHTS = Array.from(
  animals.reduce((set, a) => {
    for (const h of a.highlights) set.add(h);
    return set;
  }, new Set<string>())
).sort((a, b) => a.localeCompare(b));

const ALL_CONSIDERATIONS = Array.from(
  animals.reduce((set, a) => {
    for (const c of a.considerations) set.add(c);
    return set;
  }, new Set<string>())
).sort((a, b) => a.localeCompare(b));

export function AppProvider({ children }: { children: ReactNode }) {
  const [species, setSpecies] = useState<SpeciesFilter>("all");
  const [query, setQuery] = useState("");
  const [ageRange, setAgeRange] = useState<AgeRange>(DEFAULT_AGE_RANGE);
  const [sortKey, setSortKey] = useState<SortKey>("name-asc");
  const [highlightKeys, setHighlightKeys] = useState<Set<string>>(new Set());
  const [considerationKeys, setConsiderationKeys] = useState<Set<string>>(new Set());
  const [expandedBioIds, setExpandedBioIds] = useState<Set<string>>(new Set());
  const [crateIds, setCrateIds] = useState<Set<string>>(new Set());

  const filteredAnimals = useMemo(() => {
    const q = query.trim().toLowerCase();

    const matchesMulti = (a: Animal) => {
      if (highlightKeys.size > 0) {
        for (const k of highlightKeys) {
          if (!a.highlights.includes(k)) return false;
        }
      }
      if (considerationKeys.size > 0) {
        for (const k of considerationKeys) {
          if (!a.considerations.includes(k)) return false;
        }
      }
      return true;
    };

    let list = animals.filter((a) => {
      if (species !== "all" && a.species !== species) return false;
      if (a.ageMonths < ageRange[0] || a.ageMonths > ageRange[1]) return false;

      if (q) {
        const haystack = [
          a.name,
          a.tagline,
          a.bio,
          a.ageLabel,
          a.species,
          a.breeds.map((b) => b.name).join(" "),
          a.highlights.join(" "),
          a.considerations.join(" "),
        ]
          .join(" ")
          .toLowerCase();

        if (!haystack.includes(q)) return false;
      }

      return matchesMulti(a);
    });

    list = list.slice().sort((a, b) => {
      if (sortKey === "name-asc") return a.name.localeCompare(b.name);
      if (sortKey === "age-asc") return a.ageMonths - b.ageMonths;
      return b.ageMonths - a.ageMonths;
    });

    return list;
  }, [species, query, ageRange, sortKey, highlightKeys, considerationKeys]);

  const crateItems = useMemo(() => {
    return animals.filter((a) => crateIds.has(a.id));
  }, [crateIds]);

  function clearFilters() {
    setSpecies("all");
    setQuery("");
    setAgeRange(DEFAULT_AGE_RANGE);
    setSortKey("name-asc");
    setHighlightKeys(new Set());
    setConsiderationKeys(new Set());
  }

  function toggleBio(id: string) {
    setExpandedBioIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  function toggleCrate(id: string) {
    setCrateIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  function clearCrate() {
    setCrateIds(new Set());
  }

  function quickAdopt(id: string) {
    setExpandedBioIds((prev) => {
      const next = new Set(prev);
      next.add(id);
      return next;
    });
    setCrateIds((prev) => {
      const next = new Set(prev);
      next.add(id);
      return next;
    });
  }

  const value: AppContextValue = {
    species,
    query,
    ageRange,
    sortKey,
    highlightKeys,
    considerationKeys,
    setSpecies,
    setQuery,
    setAgeRange,
    setSortKey,
    setHighlightKeys,
    setConsiderationKeys,
    clearFilters,
    filteredAnimals,
    counts: ANIMAL_COUNTS,
    allHighlights: ALL_HIGHLIGHTS,
    allConsiderations: ALL_CONSIDERATIONS,
    expandedBioIds,
    toggleBio,
    crateIds,
    crateItems,
    toggleCrate,
    clearCrate,
    quickAdopt,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
