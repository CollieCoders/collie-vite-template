/* eslint-disable @typescript-eslint/no-explicit-any */
import { Card, CardHeader, Chip, CardContent, Button, CardFooter } from "@heroui/react";
import type { Animal } from "../data/animals/animals";
import { useAppContext } from "../context/AppContextBase";

function clampBio(text: string, maxChars: number) {
  const t = text.trim();
  if (t.length <= maxChars) return { short: t, isClamped: false };
  const slice = t.slice(0, maxChars);
  const lastSpace = slice.lastIndexOf(" ");
  const short = (lastSpace > 80 ? slice.slice(0, lastSpace) : slice).trim();
  return { short: short + "…", isClamped: true };
}

function formatBreeds(a: Animal) {
  return a.breeds.map((b) => `${b.name} (${b.confidence})`).join(", ");
}

export function AnimalList() {
  const {
    filteredAnimals,
    crateIds,
    expandedBioIds,
    toggleCrate,
    toggleBio,
    // quickAdopt,
  } = useAppContext();

  return (
    <>
      {filteredAnimals.length === 0 ? (
        <div className="rounded-xl border border-default-200 p-6">
          <p className="text-sm">
            No matches. Try clearing filters or searching something broader.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredAnimals.map((a: Animal) => {
            const inCrate = crateIds.has(a.id);
            const isBioExpanded = expandedBioIds.has(a.id);
            const { short, isClamped } = clampBio(a.bio, 220);

            return (
              <Card
                key={a.id}
                className="border border-default-200"
                data-species={a.species}
                data-in-crate={inCrate ? "true" : "false"}
              >
                <CardHeader className="flex flex-col items-start gap-2">
                  <div className="w-full">
                    <img
                      src={a.image}
                      alt={`${a.name} photo`}
                      className="h-48 w-full object-cover"
                    />
                  </div>

                  <div className="flex w-full items-start justify-between gap-3">
                    <div className="min-w-0">
                      <h3 className="card-base-font text-lg font-semibold leading-tight">
                        {a.name}{" "}
                        <span className="text-sm font-normal opacity-70">
                          • {a.ageLabel}
                        </span>
                      </h3>
                      <p className="card-base-font text-sm opacity-80">{a.tagline}</p>
                    </div>

                    <Chip
                      variant={a.species === "dog" ? "primary" : "secondary"}
                      className="shrink-0"
                    >
                      {a.species === "dog" ? "Dog" : "Cat"}
                    </Chip>
                  </div>
                </CardHeader>

                <CardContent className="flex flex-col gap-3">
                  <div className="flex flex-wrap gap-2" title={formatBreeds(a)}>
                    {a.breeds.map((b) => {
                      const color =
                        b.confidence === "primary"
                          ? "success"
                          : b.confidence === "secondary"
                            ? "warning"
                            : "default";

                      const variant = b.confidence === "primary" ? "solid" : "flat";

                      return (
                        <Chip
                          key={`${a.id}-${b.name}-${b.confidence}`}
                          color={color as any}
                          variant={variant as any}
                          size="sm"
                        >
                          {b.name}
                        </Chip>
                      );
                    })}
                  </div>

                  <div className="card-base-font text-sm leading-relaxed">
                    <p className="opacity-90">{isBioExpanded ? a.bio : short}</p>
                    {(isClamped || isBioExpanded) && (
                      <Button
                        size="sm"
                        variant="secondary"
                        className="mt-1 px-0"
                        onPress={() => toggleBio(a.id)}
                      >
                        {isBioExpanded ? "Show less" : "View Bio"}
                      </Button>
                    )}
                  </div>

                  <div className="flex flex-col gap-2">
                    <div>
                      <p className="text-xs font-medium opacity-70">Highlights</p>
                      <div className="mt-1 flex flex-wrap gap-2">
                        {a.highlights.slice(0, 4).map((h) => (
                          <Chip key={`${a.id}-h-${h}`} size="sm" variant="primary" color="success">
                            {h}
                          </Chip>
                        ))}
                        {a.highlights.length > 4 && (
                          <Chip size="sm" variant="tertiary">
                            +{a.highlights.length - 4} more
                          </Chip>
                        )}
                      </div>
                    </div>

                    <div>
                      <p className="text-xs font-medium opacity-70">Considerations</p>
                      <div className="mt-1 flex flex-wrap gap-2">
                        {a.considerations.slice(0, 3).map((c) => (
                          <Chip
                            key={`${a.id}-c-${c}`}
                            size="sm"
                            variant="primary"
                            color="warning"
                          >
                            {c}
                          </Chip>
                        ))}
                        {a.considerations.length > 3 && (
                          <Chip size="sm" variant="soft" color="warning">
                            +{a.considerations.length - 3} more
                          </Chip>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>

                <CardFooter className="flex items-center justify-between gap-2">
                  <Button
                    variant={inCrate ? "danger" : "primary"}
                    onPress={() => toggleCrate(a.id)}
                  >
                    {inCrate ? "Remove from Crate" : "Add to Crate"}
                  </Button>

                  {/* <Button
                    variant="secondary"
                    onPress={() => {
                      quickAdopt(a.id);
                    }}
                  >
                    Quick adopt →
                  </Button> */}
                </CardFooter>
              </Card>
            );
          })}
        </div>
      )}
    </>
  )
}
