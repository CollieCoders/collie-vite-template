import { Button, Card, CardContent, Chip, Modal } from "@heroui/react";
import { useAppContext } from "../context/AppContextBase";
import shoppingCartIcon from "../assets/shopping-cart-icon.png";

export function CrateModal() {
  const { crateIds, crateItems, toggleCrate, clearCrate } = useAppContext();

  return (
    <Modal>
      <Modal.Trigger className="flex items-center gap-2">
        <Button
          variant={crateIds.size ? "secondary" : "primary"}
          className="crate-button bg-transparent hover:bg-transparent active:bg-transparent"
          aria-label="Open crate"
        >
          <img
            src={shoppingCartIcon}
            alt=""
            className="h-6 w-6"
          />
        </Button>

        {crateIds.size > 0 && (
          <Chip size="sm" variant="secondary" color="accent">
            {crateIds.size}
          </Chip>
        )}
      </Modal.Trigger>

      <Modal.Backdrop>
        <Modal.Container>
          <Modal.Dialog>
            <Modal.CloseTrigger />

            <Modal.Header>
              <Modal.Heading>
                Your Crate{" "}
                <span className="text-sm font-normal opacity-70">
                  ({crateItems.length} item{crateItems.length === 1 ? "" : "s"})
                </span>
              </Modal.Heading>
            </Modal.Header>

            <Modal.Body>
              {crateItems.length === 0 ? (
                <div className="rounded-xl border border-default-200 p-4">
                  <p className="text-sm opacity-80">
                    Your crate is empty. Add a few floofs and come back.
                  </p>
                </div>
              ) : (
                <div className="flex flex-col gap-3">
                  {crateItems.map((a) => (
                    <Card key={`crate-${a.id}`} className="border border-default-200">
                      <CardContent className="flex flex-row gap-3">
                        <img
                          src={a.image}
                          alt={`${a.name} thumbnail`}
                          className="h-20 w-20 shrink-0 object-cover"
                        />

                        <div className="min-w-0 flex-1">
                          <div className="flex items-start justify-between gap-3">
                            <div className="min-w-0">
                              <p className="font-medium leading-tight">
                                {a.name}{" "}
                                <span className="text-xs font-normal opacity-70">
                                  • {a.ageLabel}
                                </span>
                              </p>
                              <p className="text-sm opacity-80 line-clamp-2">
                                {a.tagline}
                              </p>
                            </div>

                            <Chip
                              size="sm"
                              variant={a.species === "dog" ? "primary" : "secondary"}
                            >
                              {a.species === "dog" ? "Dog" : "Cat"}
                            </Chip>
                          </div>

                          <div className="mt-2 flex flex-wrap gap-2">
                            {a.highlights.slice(0, 2).map((h) => (
                              <Chip
                                key={`${a.id}-crate-h-${h}`}
                                size="sm"
                                variant="tertiary"
                              >
                                {h}
                              </Chip>
                            ))}
                          </div>
                        </div>

                        <div className="flex flex-col gap-2">
                          <Button
                            size="sm"
                            variant="danger"
                            onPress={() => toggleCrate(a.id)}
                          >
                            Remove
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </Modal.Body>

            <Modal.Footer>
              <div className="flex w-full items-center justify-between gap-3">
                <Button
                  variant="tertiary"
                  onPress={clearCrate}
                  isDisabled={crateIds.size === 0}
                >
                  Clear Crate
                </Button>

                <Button
                  slot="close"
                  variant="primary"
                  isDisabled={crateIds.size === 0}
                >
                  Proceed to Adoption →
                </Button>
              </div>
            </Modal.Footer>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  )
}
