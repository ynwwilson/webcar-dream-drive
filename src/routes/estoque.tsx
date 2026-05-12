import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { SlidersHorizontal, X } from "lucide-react";
import { SiteHeader } from "@/components/site/header";
import { SiteFooter } from "@/components/site/footer";
import { CarCard } from "@/components/site/car-card";
import { cars } from "@/data/cars";

export const Route = createFileRoute("/estoque")({
  head: () => ({
    meta: [
      { title: "Estoque — WebCar Patos de Minas" },
      { name: "description", content: "Confira nosso estoque completo de seminovos selecionados." },
      { property: "og:title", content: "Estoque — WebCar" },
      { property: "og:description", content: "Filtre por marca, ano, preço e mais." },
    ],
  }),
  component: EstoquePage,
});

type SortKey = "recent" | "price-asc" | "price-desc" | "km-asc";

const brands = Array.from(new Set(cars.map((c) => c.brand))).sort();
const fuels = Array.from(new Set(cars.map((c) => c.fuel)));
const transmissions = Array.from(new Set(cars.map((c) => c.transmission)));

// Limites dos filtros
const STOCK_LIMITS = {
  maxKm: 500000,
  maxPrice: 1000000,
  minYear: 2010,
  maxYear: new Date().getFullYear() + 1,
};

// Mapeia arquivo da logo → nome da marca (precisa bater EXATO com c.brand em cars.ts)
const BRAND_LOGOS = [
  { file: "bmw", label: "BMW" },
  { file: "chevrolet", label: "Chevrolet" },
  { file: "fiat", label: "Fiat" },
  { file: "ford", label: "Ford" },
  { file: "honda", label: "Honda" },
  { file: "hyundai", label: "Hyundai" },
  { file: "jeep", label: "Jeep" },
  { file: "kia", label: "Kia" },
  { file: "mercedes", label: "Mercedes-Benz" },
  { file: "mitsubishi", label: "Mitsubishi" },
  { file: "nissan", label: "Nissan" },
  { file: "ram", label: "RAM" },
  { file: "toyota", label: "Toyota" },
  { file: "volkswagen", label: "Volkswagen" },
] as const;

const PAGE_SIZE = 9;

function EstoquePage() {
  const [brand, setBrand] = useState<string>("");
  const [fuel, setFuel] = useState<string>("");
  const [transmission, setTransmission] = useState<string>("");
  const [maxPrice, setMaxPrice] = useState<number>(STOCK_LIMITS.maxPrice);
  const [maxKm, setMaxKm] = useState<number>(STOCK_LIMITS.maxKm);
  const [minYear, setMinYear] = useState<number>(STOCK_LIMITS.minYear);
  const [sort, setSort] = useState<SortKey>("recent");
  const [page, setPage] = useState(1);
  const [drawer, setDrawer] = useState(false);

  const filtered = useMemo(() => {
    let list = cars.filter((c) =>
      (!brand || c.brand === brand) &&
      (!fuel || c.fuel === fuel) &&
      (!transmission || c.transmission === transmission) &&
      c.price <= maxPrice &&
      c.km <= maxKm &&
      c.year >= minYear,
    );
    if (sort === "price-asc") list = [...list].sort((a, b) => a.price - b.price);
    if (sort === "price-desc") list = [...list].sort((a, b) => b.price - a.price);
    if (sort === "km-asc") list = [...list].sort((a, b) => a.km - b.km);
    return list;
  }, [brand, fuel, transmission, maxPrice, maxKm, minYear, sort]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const visible = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  const reset = () => {
    setBrand(""); setFuel(""); setTransmission("");
    setMaxPrice(STOCK_LIMITS.maxPrice); setMaxKm(STOCK_LIMITS.maxKm); setMinYear(STOCK_LIMITS.minYear);
  };

  const FiltersInner = (
    <div className="space-y-7">
      <FilterGroup label="Marca">
        <select value={brand} onChange={(e) => setBrand(e.target.value)} className="filter-select">
          <option value="">Todas</option>
          {brands.map((b) => <option key={b} value={b}>{b}</option>)}
        </select>
      </FilterGroup>
      <FilterGroup label="Combustível">
        <select value={fuel} onChange={(e) => setFuel(e.target.value)} className="filter-select">
          <option value="">Todos</option>
          {fuels.map((f) => <option key={f} value={f}>{f}</option>)}
        </select>
      </FilterGroup>
      <FilterGroup label="Câmbio">
        <select value={transmission} onChange={(e) => setTransmission(e.target.value)} className="filter-select">
          <option value="">Todos</option>
          {transmissions.map((t) => <option key={t} value={t}>{t}</option>)}
        </select>
      </FilterGroup>
      <FilterGroup label={`Ano a partir de ${minYear}`}>
        <input type="range" min={STOCK_LIMITS.minYear} max={STOCK_LIMITS.maxYear} value={minYear} onChange={(e) => setMinYear(+e.target.value)} className="w-full accent-[var(--accent-blue)]" />
        <input
          type="number"
          min={STOCK_LIMITS.minYear}
          max={STOCK_LIMITS.maxYear}
          value={minYear}
          onChange={(e) => {
            const v = +e.target.value;
            if (!Number.isFinite(v)) return;
            setMinYear(Math.max(STOCK_LIMITS.minYear, Math.min(STOCK_LIMITS.maxYear, v)));
          }}
          className="filter-select mt-2"
        />
      </FilterGroup>
      <FilterGroup label={`Preço até R$ ${maxPrice.toLocaleString("pt-BR")}`}>
        <input type="range" min={50000} max={STOCK_LIMITS.maxPrice} step={10000} value={maxPrice} onChange={(e) => setMaxPrice(+e.target.value)} className="w-full accent-[var(--accent-blue)]" />
        <input
          type="number"
          min={0}
          max={STOCK_LIMITS.maxPrice}
          step={1000}
          value={maxPrice}
          onChange={(e) => {
            const v = +e.target.value;
            if (!Number.isFinite(v)) return;
            setMaxPrice(Math.max(0, Math.min(STOCK_LIMITS.maxPrice, v)));
          }}
          className="filter-select mt-2"
        />
      </FilterGroup>
      <FilterGroup label={`KM até ${maxKm.toLocaleString("pt-BR")}`}>
        <input type="range" min={5000} max={STOCK_LIMITS.maxKm} step={5000} value={maxKm} onChange={(e) => setMaxKm(+e.target.value)} className="w-full accent-[var(--accent-blue)]" />
        <input
          type="number"
          min={0}
          max={STOCK_LIMITS.maxKm}
          step={1000}
          value={maxKm}
          onChange={(e) => {
            const v = +e.target.value;
            if (!Number.isFinite(v)) return;
            setMaxKm(Math.max(0, Math.min(STOCK_LIMITS.maxKm, v)));
          }}
          className="filter-select mt-2"
        />
      </FilterGroup>
      <button onClick={reset} className="text-sm font-semibold text-accent-blue hover:underline">
        Limpar filtros
      </button>
    </div>
  );

  const BrandGrid = (
    <div className="grid grid-cols-3 gap-2">
      {BRAND_LOGOS.filter((b) => brands.includes(b.label)).map((b) => {
        const count = cars.filter((c) => c.brand === b.label).length;
        const isActive = brand === b.label;
        return (
          <button
            key={b.file}
            onClick={() => setBrand(brand === b.label ? "" : b.label)}
            className={`group relative flex aspect-square items-center justify-center rounded-xl border-2 bg-white p-2 transition-all hover:border-[var(--accent-blue)] ${
              isActive
                ? "border-[var(--accent-blue)] shadow-md ring-2 ring-[var(--accent-blue)]/20"
                : "border-gray-200"
            }`}
            title={`${b.label} (${count})`}
            aria-label={`Filtrar por ${b.label}`}
          >
            <img
              src={`/brands/${b.file}.png`}
              alt={b.label}
              className="h-8 w-auto object-contain transition-transform group-hover:scale-110"
            />
            <span className="absolute -right-1 -top-1 flex h-4 min-w-[1rem] items-center justify-center rounded-full bg-[var(--accent-blue)] px-1 text-[10px] font-bold leading-none text-white">
              {count}
            </span>
          </button>
        );
      })}
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <div className="mx-auto max-w-7xl px-4 py-10 md:px-8 md:py-14">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight text-brand md:text-4xl">Estoque</h1>
            <p className="mt-2 text-sm text-muted-foreground">{filtered.length} {filtered.length === 1 ? "veículo encontrado" : "veículos encontrados"}</p>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => setDrawer(true)} className="inline-flex items-center gap-2 rounded-full border bg-white px-4 py-2 text-sm font-semibold text-brand md:hidden">
              <SlidersHorizontal className="h-4 w-4" /> Filtros
            </button>
            <select value={sort} onChange={(e) => setSort(e.target.value as SortKey)} className="rounded-full border bg-white px-4 py-2 text-sm font-medium text-brand">
              <option value="recent">Mais recentes</option>
              <option value="price-asc">Menor preço</option>
              <option value="price-desc">Maior preço</option>
              <option value="km-asc">Menor KM</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-10 md:grid-cols-[260px_1fr]">
          <aside className="hidden md:block">
            <div className="sticky top-24 space-y-4">
              <div className="rounded-2xl border bg-card p-6">
                <p className="mb-5 text-xs font-semibold uppercase tracking-widest text-brand/60">Filtros</p>
                {FiltersInner}
              </div>
              <div className="rounded-2xl border bg-card p-6">
                <p className="mb-5 text-xs font-semibold uppercase tracking-widest text-brand/60">Por marca</p>
                {BrandGrid}
              </div>
            </div>
          </aside>

          <div>
            {visible.length === 0 ? (
              <div className="rounded-2xl border bg-card p-12 text-center text-muted-foreground">
                Nenhum veículo com esses filtros.
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {visible.map((c) => <CarCard key={c.id} car={c} />)}
              </div>
            )}

            {totalPages > 1 && (
              <div className="mt-10 flex items-center justify-center gap-1">
                {Array.from({ length: totalPages }).map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setPage(i + 1)}
                    className={`h-10 w-10 rounded-full text-sm font-semibold transition-colors ${
                      currentPage === i + 1
                        ? "bg-brand text-white"
                        : "text-brand hover:bg-secondary"
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* mobile drawer */}
      {drawer && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="absolute inset-0 bg-black/40" onClick={() => setDrawer(false)} />
          <div className="absolute inset-y-0 right-0 w-[85%] max-w-sm overflow-y-auto bg-white p-6 shadow-2xl">
            <div className="mb-6 flex items-center justify-between">
              <p className="text-base font-bold text-brand">Filtros</p>
              <button onClick={() => setDrawer(false)} aria-label="Fechar">
                <X className="h-5 w-5 text-brand" />
              </button>
            </div>
            {FiltersInner}
            <div className="mt-7">
              <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-brand/60">Por marca</p>
              {BrandGrid}
            </div>
          </div>
        </div>
      )}

      <SiteFooter />
    </div>
  );
}

function FilterGroup({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-brand/60">{label}</p>
      {children}
    </div>
  );
}