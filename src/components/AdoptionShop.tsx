import { useAppContext } from "../context/AppContextBase";
import { AnimalFilters } from "./AnimalFilters";
import { AnimalList } from "./AnimalList";

function AdoptionShopContent() {
  const { counts } = useAppContext();
  return (
    <section className="w-full">
      <div className="mx-auto max-w-90vw px-4 py-6">
        <div className="flex items-start gap-6">
          <main className="min-w-0 flex-1">
            <div className="flex flex-col gap-1">
              <h1 className="text-2xl font-semibold tracking-tight">
                Collie + Vite Template
              </h1>
              <p className="text-sm opacity-80">
                Browse {counts.total} floofs ({counts.dogs} dogs, {counts.cats} cats). Add favorites to your{" "}
                <span className="font-medium">Crate</span>.
              </p>
            </div>

            <div className="mt-5">
              <AnimalList />
            </div>
          </main>

          <aside className="w-[25vw] shrink-0">
            <div className="sticky top-24">
              <div className="rounded-3xl border border-slate-200/80 bg-gradient-to-b from-white via-slate-50 to-slate-100 p-4 text-slate-900 shadow-xl shadow-slate-900/10">
                <AnimalFilters />
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}

export function AdoptionShop() {
  return <AdoptionShopContent />;
}
