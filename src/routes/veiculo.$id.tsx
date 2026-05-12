import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft, Calculator, Calendar, Gauge, Settings2, Fuel, DoorOpen, Car as CarIcon, Palette, X } from "lucide-react";
import { SiteHeader } from "@/components/site/header";
import { SiteFooter } from "@/components/site/footer";
import { WhatsAppIcon, WHATSAPP_URL } from "@/components/site/whatsapp-icon";
import { cars, formatBRL, formatKM, type Car } from "@/data/cars";

export const Route = createFileRoute("/veiculo/$id")({
  loader: ({ params }) => {
    const car = cars.find((c) => c.id === params.id);
    if (!car) throw notFound();
    return { car };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.car.fullName} — WebCar` },
          { name: "description", content: loaderData.car.description },
          { property: "og:title", content: loaderData.car.fullName },
          { property: "og:description", content: loaderData.car.description },
          { property: "og:image", content: loaderData.car.image },
          { name: "twitter:image", content: loaderData.car.image },
        ]
      : [],
  }),
  notFoundComponent: () => (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <div className="mx-auto max-w-3xl px-4 py-24 text-center">
        <h1 className="text-2xl font-bold text-brand">Veículo não encontrado</h1>
        <Link to="/estoque" className="mt-6 inline-block text-accent-blue hover:underline">Voltar ao estoque</Link>
      </div>
      <SiteFooter />
    </div>
  ),
  errorComponent: ({ error, reset }) => (
    <div className="p-12 text-center">
      <p>{error.message}</p>
      <button onClick={reset} className="mt-4 underline">Tentar novamente</button>
    </div>
  ),
  component: VeiculoPage,
});

function VeiculoPage() {
  const params = Route.useParams();
  const car = cars.find((c) => c.id === params.id)!;
  const gallery = car.gallery.length > 0 ? car.gallery : [car.image];
  const [active, setActive] = useState(0);
  const [simulatorOpen, setSimulatorOpen] = useState(false);
  const [showAll, setShowAll] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <div className="mx-auto max-w-7xl px-4 py-8 md:px-8 md:py-12">
        <Link to="/estoque" className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-brand">
          <ArrowLeft className="h-4 w-4" /> Voltar ao estoque
        </Link>

        <div className="mt-6 grid grid-cols-1 gap-10 lg:grid-cols-[3fr_2fr]">
          {/* Galeria */}
          <div>
            <div className="overflow-hidden rounded-2xl bg-secondary">
              <img src={gallery[active]} alt={car.fullName} fetchPriority="high" decoding="async" className="aspect-[4/3] w-full object-cover transition-opacity duration-300" />
            </div>
            {gallery.length > 1 && (
              <div className="mt-3 grid grid-cols-5 gap-3">
                {gallery.slice(0, 4).map((g, i) => (
                  <button
                    key={i}
                    onClick={() => setActive(i)}
                    className={`overflow-hidden rounded-lg border-2 transition-colors ${
                      active === i ? "border-accent-blue" : "border-transparent"
                    }`}
                  >
                    <img src={g} alt="" loading="lazy" decoding="async" className="aspect-square w-full object-cover" />
                  </button>
                ))}
                {gallery.length > 4 && (
                  <button
                    onClick={() => setShowAll(true)}
                    className="group relative overflow-hidden rounded-lg border-2 border-transparent"
                    aria-label={`Ver todas as ${gallery.length} fotos`}
                  >
                    <img src={gallery[4]} alt="" loading="lazy" decoding="async" className="aspect-square w-full object-cover" />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/65 transition-colors group-hover:bg-black/75">
                      <span className="text-sm font-semibold text-accent-blue">
                        Ver mais
                      </span>
                    </div>
                  </button>
                )}
              </div>
            )}

            {/* Lightbox: todas as fotos */}
            {showAll && (
              <div
                className="fixed inset-0 z-50 overflow-y-auto bg-black/80 p-4 md:p-8"
                onClick={() => setShowAll(false)}
              >
                <div className="mx-auto max-w-5xl">
                  <div className="mb-4 flex items-center justify-between">
                    <p className="text-sm font-semibold text-white">
                      {gallery.length} fotos · {car.fullName}
                    </p>
                    <button
                      onClick={(e) => { e.stopPropagation(); setShowAll(false); }}
                      className="rounded-full bg-white/10 p-2 text-white hover:bg-white/20"
                      aria-label="Fechar"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>
                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
                    {gallery.map((g, i) => (
                      <button
                        key={i}
                        onClick={(e) => {
                          e.stopPropagation();
                          setActive(i);
                          setShowAll(false);
                        }}
                        className="overflow-hidden rounded-lg"
                      >
                        <img src={g} alt="" loading="lazy" decoding="async" className="aspect-square w-full object-cover transition-transform duration-300 hover:scale-105" />
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Info */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">{car.brand} · {car.year}</p>
            <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-brand md:text-4xl">{car.model}</h1>
            <p className="mt-5 text-3xl font-extrabold text-accent-blue md:text-4xl">{formatBRL(car.price)}</p>

            {/* Grid de specs com ícones — 4 colunas x 2 linhas */}
            <div className="mt-8 grid grid-cols-4 gap-x-4 gap-y-7 rounded-2xl border bg-card p-6">
              <SpecItem icon={<Calendar className="h-7 w-7" />} label={String(car.year)} />
              <SpecItem icon={<Gauge className="h-7 w-7" />} label={formatKM(car.km)} />
              <SpecItem
                icon={
                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-brand text-xs font-bold text-white">
                    {car.brand[0]}
                  </div>
                }
                label={car.brand}
              />
              <SpecItem icon={<Settings2 className="h-7 w-7" />} label={car.transmission} />
              <SpecItem icon={<Fuel className="h-7 w-7" />} label={car.fuel} />
              <SpecItem icon={<DoorOpen className="h-7 w-7" />} label={`${car.doors} Portas`} />
              <SpecItem icon={<CarIcon className="h-7 w-7" />} label={car.model} truncate />
              <SpecItem icon={<Palette className="h-7 w-7" />} label={car.color} />
            </div>

            {/* Botões: WhatsApp verde + Simular preto */}
            <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
              <a
                href={`${WHATSAPP_URL}%20-%20${encodeURIComponent(car.fullName)}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full bg-[#25D366] px-6 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[#1da851]"
              >
                <WhatsAppIcon className="h-4 w-4" />
                Proposta via WhatsApp
              </a>
              <button
                type="button"
                onClick={() => setSimulatorOpen(true)}
                className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full bg-black px-6 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-neutral-800"
              >
                <Calculator className="h-4 w-4" />
                Simular Financiamento
              </button>
            </div>
          </div>
        </div>

        {/* Descrição + opcionais */}
        <div className="mt-16 grid grid-cols-1 gap-12 md:grid-cols-2">
          <div>
            <h2 className="text-xs font-semibold uppercase tracking-widest text-accent-blue">Descrição</h2>
            <p className="mt-3 text-base leading-relaxed text-muted-foreground">{car.description}</p>
          </div>
          <div>
            <h2 className="text-xs font-semibold uppercase tracking-widest text-accent-blue">Opcionais</h2>
            <div className="mt-3 flex flex-wrap gap-2">
              {car.options.map((o) => (
                <span key={o} className="rounded-full bg-secondary px-4 py-1.5 text-sm font-medium text-brand">
                  {o}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {simulatorOpen && (
        <FinancingSimulator car={car} onClose={() => setSimulatorOpen(false)} />
      )}

      <SiteFooter />
    </div>
  );
}

function SpecItem({ icon, label, truncate }: { icon: React.ReactNode; label: string; truncate?: boolean }) {
  return (
    <div className="flex flex-col items-center text-center">
      <div className="text-brand">{icon}</div>
      <span
        className={`mt-2 text-sm font-medium text-brand ${truncate ? "max-w-full truncate" : ""}`}
        title={label}
      >
        {label}
      </span>
    </div>
  );
}

function FinancingSimulator({ car, onClose }: { car: Car; onClose: () => void }) {
  // Defaults: 30% de entrada, 48 meses, taxa de mercado pra seminovo
  const [downPaymentPct, setDownPaymentPct] = useState(30);
  const [months, setMonths] = useState(48);
  const interestRate = 0.018; // 1.8% ao mês (taxa estimada CET de mercado)

  const downPayment = Math.round((car.price * downPaymentPct) / 100);
  const financed = car.price - downPayment;
  const monthlyPayment =
    financed > 0
      ? (financed * (interestRate * Math.pow(1 + interestRate, months))) /
        (Math.pow(1 + interestRate, months) - 1)
      : 0;
  const totalAmount = monthlyPayment * months + downPayment;

  const waMessage = encodeURIComponent(
    `Olá! Tenho interesse no ${car.fullName}.\n\nSimulação que fiz no site:\n- Valor: ${formatBRL(car.price)}\n- Entrada (${downPaymentPct}%): ${formatBRL(downPayment)}\n- Parcelas: ${months}x de ${formatBRL(monthlyPayment)}\n\nPodemos seguir?`,
  );
  const waLink = `https://api.whatsapp.com/send?phone=553438141144&text=${waMessage}`;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 p-4 backdrop-blur-sm sm:items-center"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b px-6 py-4">
          <div>
            <h3 className="text-lg font-bold text-brand">Simular Financiamento</h3>
            <p className="mt-0.5 text-xs text-muted-foreground">{car.fullName}</p>
          </div>
          <button
            onClick={onClose}
            aria-label="Fechar"
            className="rounded-full p-1 text-brand hover:bg-secondary"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="px-6 py-5">
          {/* Valor do carro */}
          <div className="flex items-baseline justify-between">
            <span className="text-sm text-muted-foreground">Valor do veículo</span>
            <span className="text-2xl font-extrabold text-brand">{formatBRL(car.price)}</span>
          </div>

          {/* Entrada */}
          <div className="mt-6">
            <div className="flex items-center justify-between text-sm">
              <span className="font-medium text-brand">Entrada</span>
              <span className="font-bold text-accent-blue">
                {formatBRL(downPayment)} ({downPaymentPct}%)
              </span>
            </div>
            <input
              type="range"
              min={20}
              max={80}
              step={5}
              value={downPaymentPct}
              onChange={(e) => setDownPaymentPct(+e.target.value)}
              className="mt-2 w-full accent-[var(--accent-blue)]"
            />
            <div className="mt-1 flex justify-between text-[10px] text-muted-foreground">
              <span>20%</span>
              <span>80%</span>
            </div>
          </div>

          {/* Prazo */}
          <div className="mt-5">
            <p className="mb-2 text-sm font-medium text-brand">Em quantas vezes?</p>
            <div className="grid grid-cols-5 gap-2">
              {[12, 24, 36, 48, 60].map((m) => (
                <button
                  key={m}
                  type="button"
                  onClick={() => setMonths(m)}
                  className={`rounded-full py-2 text-sm font-semibold transition-colors ${
                    months === m
                      ? "bg-brand text-white"
                      : "bg-secondary text-brand hover:bg-secondary/80"
                  }`}
                >
                  {m}x
                </button>
              ))}
            </div>
          </div>

          {/* Resultado */}
          <div className="mt-6 rounded-xl bg-secondary p-5">
            <p className="text-xs uppercase tracking-wider text-muted-foreground">
              Parcela mensal aproximada
            </p>
            <p className="mt-1 text-3xl font-extrabold text-accent-blue">
              {formatBRL(monthlyPayment)}
            </p>
            <div className="mt-4 grid grid-cols-2 gap-2 text-xs">
              <div>
                <p className="text-muted-foreground">Financiado</p>
                <p className="font-semibold text-brand">{formatBRL(financed)}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Total a pagar</p>
                <p className="font-semibold text-brand">{formatBRL(totalAmount)}</p>
              </div>
            </div>
          </div>

          <p className="mt-4 text-[11px] leading-relaxed text-muted-foreground">
            * Simulação aproximada (Tabela Price, taxa estimada de 1,80% a.m.). Valor real do CET
            depende da análise de crédito do banco.
          </p>

          {/* CTA WhatsApp */}
          <a
            href={waLink}
            target="_blank"
            rel="noreferrer"
            className="mt-5 flex items-center justify-center gap-2 rounded-full bg-[#25D366] px-6 py-3.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[#1da851]"
          >
            <WhatsAppIcon className="h-4 w-4" />
            Confirmar simulação via WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}