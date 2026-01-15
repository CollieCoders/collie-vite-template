import { AppProvider } from "../context/AppContext";
import { useAppContext } from "../context/AppContextBase";
import { CrateModal } from "./CrateModal";
import { AnimalFilters } from "./AnimalFilters";
import { AnimalList } from "./AnimalList";

function AdoptionShopContent() {
  const { counts } = useAppContext();
  return (
    <section className="w-full">
      <div className="mx-auto max-w-7xl px-4 py-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div className="flex flex-col gap-1">
            <h1 className="text-2xl font-semibold tracking-tight">
              Adoptables Marketplace
            </h1>
            <p className="text-sm opacity-80">
              Browse {counts.total} floofs ({counts.dogs} dogs, {counts.cats} cats). Add favorites to your{" "}
              <span className="font-medium">Crate</span>.
            </p>
          </div>

          <CrateModal />
        </div>
        <AnimalFilters />
        <AnimalList />
      </div>
    </section>
  );
}

export function AdoptionShop() {
  return (
    <AppProvider>
      <AdoptionShopContent />
    </AppProvider>
  );
}
