/* eslint-disable @typescript-eslint/no-explicit-any */
import { Tabs, Input, Slider, Label, Select, Description, ListBox, Header, Separator, Chip, Button } from "@heroui/react";
import {
  useAppContext,
  type SpeciesFilter,
  type SortKey,
} from "../context/AppContextBase";

export function AnimalFilters() {
  const {
    species,
    query,
    ageRange,
    sortKey,
    highlightKeys,
    considerationKeys,
    counts,
    filteredAnimals,
    allHighlights,
    allConsiderations,
    setSpecies,
    setQuery,
    setAgeRange,
    setSortKey,
    setHighlightKeys,
    setConsiderationKeys,
    clearFilters,
  } = useAppContext();

  return (
    <div className="flex flex-col gap-4">
      <Tabs
        className="w-full"
        selectedKey={species}
        onSelectionChange={(key) => setSpecies(key as SpeciesFilter)}
      >
        <Tabs.ListContainer>
          <Tabs.List aria-label="Species filter">
            <Tabs.Tab id="all">
              All ({counts.total})
              <Tabs.Indicator />
            </Tabs.Tab>
            <Tabs.Tab id="dog">
              Dogs ({counts.dogs})
              <Tabs.Indicator />
            </Tabs.Tab>
            <Tabs.Tab id="cat">
              Cats ({counts.cats})
              <Tabs.Indicator />
            </Tabs.Tab>
          </Tabs.List>
        </Tabs.ListContainer>

        <Tabs.Panel id="all" className="pt-0"><span /></Tabs.Panel>
        <Tabs.Panel id="dog" className="pt-0"><span /></Tabs.Panel>
        <Tabs.Panel id="cat" className="pt-0"><span /></Tabs.Panel>
      </Tabs>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <Input
            aria-label="Search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder='Search name, bio, breeds, highlights, etc.'
          />
        </div>

        <div className="lg:col-span-4">
          <Slider
            minValue={0}
            maxValue={180}
            step={1}
            value={ageRange}
            onChange={(v) => setAgeRange(v as [number, number])}
            formatOptions={{ style: "unit", unit: "month" }}
          >
            <Label>Age range (months)</Label>
            <Slider.Output />

            <Slider.Track>
              {({ state }) => (
                <>
                  <Slider.Fill />
                  {state.values.map((_, i) => (
                    <Slider.Thumb key={i} index={i} />
                  ))}
                </>
              )}
            </Slider.Track>
          </Slider>

          <p className="mt-1 text-xs opacity-70">
            Showing {ageRange[0]}–{ageRange[1]} months
          </p>
        </div>

        {/* ✅ SORT SELECT (new anatomy) */}
        <div className="lg:col-span-4">
          <Select placeholder="Choose Sort Order">
            <Label>Sort</Label>

            <Select.Trigger>
              <Select.Value />
              <Select.Indicator />
            </Select.Trigger>

            <Description>How results should be ordered.</Description>

            <Select.Popover>
              <ListBox
                selectionMode="single"
                selectedKeys={new Set([sortKey])}
                onSelectionChange={(keys: any) => {
                  const first = Array.from(keys)[0] as SortKey | undefined;
                  setSortKey(first ?? "name-asc");
                }}
              >
                <ListBox.Item id="name-asc">
                  <Label>Name (A → Z)</Label>
                </ListBox.Item>
                <ListBox.Item id="age-asc">
                  <Label>Age (youngest first)</Label>
                </ListBox.Item>
                <ListBox.Item id="age-desc">
                  <Label>Age (oldest first)</Label>
                </ListBox.Item>
              </ListBox>
            </Select.Popover>
          </Select>
        </div>

        <div className="lg:col-span-6">
          <Select placeholder="Pick One or More">
            <Label>Highlights</Label>

            <Select.Trigger>
              <Select.Value />
              <Select.Indicator />
            </Select.Trigger>

            <Description>Filter to pets that match all selected highlights.</Description>

            <Select.Popover>
              <ListBox
                selectionMode="multiple"
                selectedKeys={highlightKeys}
                onSelectionChange={(keys: any) => {
                  setHighlightKeys(new Set(Array.from(keys).map(String)));
                }}
              >
                <ListBox.Section>
                  <Header>Traits</Header>
                  {allHighlights.map((h) => (
                    <ListBox.Item key={h} id={h} textValue={h}>
                      <Label>{h}</Label>
                      <ListBox.ItemIndicator />
                    </ListBox.Item>
                  ))}
                </ListBox.Section>

                <Separator />
              </ListBox>
            </Select.Popover>
          </Select>

          {highlightKeys.size > 0 && (
            <div className="mt-2 flex flex-wrap gap-2">
              {Array.from(highlightKeys).map((k) => (
                <Chip key={k} variant="secondary">
                  <span className="mr-1">{k}</span>
                  <Button
                    size="sm"
                    variant="ghost"
                    onPress={() => {
                      setHighlightKeys((prev) => {
                        const next = new Set(prev);
                        next.delete(k);
                        return next;
                      });
                    }}
                  >
                    ×
                  </Button>
                </Chip>
              ))}
            </div>
          )}
        </div>

        <div className="lg:col-span-6">
          <Select placeholder="Pick One or More">
            <Label>Considerations</Label>

            <Select.Trigger>
              <Select.Value />
              <Select.Indicator />
            </Select.Trigger>

            <Description>Filter to pets that include all selected considerations.</Description>

            <Select.Popover>
              <ListBox
                selectionMode="multiple"
                selectedKeys={considerationKeys}
                onSelectionChange={(keys: any) => {
                  setConsiderationKeys(new Set(Array.from(keys).map(String)));
                }}
              >
                <ListBox.Section>
                  <Header>Notes</Header>
                  {allConsiderations.map((c) => (
                    <ListBox.Item key={c} id={c} textValue={c}>
                      <Label>{c}</Label>
                      <ListBox.ItemIndicator />
                    </ListBox.Item>
                  ))}
                </ListBox.Section>
              </ListBox>
            </Select.Popover>
          </Select>

          {considerationKeys.size > 0 && (
            <div className="mt-2 flex flex-wrap gap-2">
              {Array.from(considerationKeys).map((k) => (
                <Chip key={k} variant="tertiary">
                  <span className="mr-1">{k}</span>
                  <Button
                    size="sm"
                    variant="ghost"
                    onPress={() => {
                      setConsiderationKeys((prev) => {
                        const next = new Set(prev);
                        next.delete(k);
                        return next;
                      });
                    }}
                  >
                    ×
                  </Button>
                </Chip>
              ))}
            </div>
          )}
        </div>

        <div className="lg:col-span-12 flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm opacity-80">
            Showing <span className="font-medium">{filteredAnimals.length}</span> result
            {filteredAnimals.length === 1 ? "" : "s"}.
          </p>

          <div className="flex gap-2">
            <Button variant="tertiary" onPress={clearFilters}>
              Clear filters
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
