import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft, Calculator } from "lucide-react";
import { SiteHeader } from "@/components/site/header";
import { SiteFooter } from "@/components/site/footer";
import { WhatsAppIcon, WHATSAPP_URL } from "@/components/site/whatsapp-icon";
import { cars, formatBRL, formatKM } from "@/data/cars";

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

  const specs: [string, string | number][] = [
    ["Marca", car.brand],
    ["Modelo", car.model],
    ["Ano", car.year],
    ["KM", formatKM(car.km)],
    ["Combustível", car.fuel],
    ["Câmbio", car.transmission],
    ["Cor", car.color],
    ["Portas", car.doors],
  ];

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
              <img src={gallery[active]} alt={car.fullName} className="aspect-[4/3] w-full object-cover" />
            </div>
            {gallery.length > 1 && (
              <div className="mt-3 grid grid-cols-5 gap-3">
                {gallery.map((g, i) => (
                  <button
                    key={i}
                    onClick={() => setActive(i)}
                    className={`overflow-hidden rounded-lg border-2 transition-colors ${
                      active === i ? "border-accent-blue" : "border-transparent"
                    }`}
                  >
                    <img src={g} alt="" className="aspect-square w-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Info */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">{car.brand} · {car.year}</p>
            <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-brand md:text-4xl">{car.model}</h1>
            <p className="mt-5 text-3xl font-extrabold text-accent-blue md:text-4xl">{formatBRL(car.price)}</p>

            <dl className="mt-8 divide-y rounded-2xl border bg-card">
              {specs.map(([k, v]) => (
                <div key={k} className="flex items-center justify-between px-5 py-3 text-sm">
                  <dt className="text-muted-foreground">{k}</dt>
                  <dd className="font-semibold text-brand">{v}</dd>
                </div>
              ))}
            </dl>

            <div className="mt-6 flex flex-col gap-3">
              <a
                href={`${WHATSAPP_URL}%20-%20${encodeURIComponent(car.fullName)}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-accent-blue px-6 py-4 text-base font-semibold text-white shadow-sm hover:brightness-110"
              >
                <WhatsAppIcon className="h-5 w-5" />
                Falar no WhatsApp
              </a>
              <Link
                to="/financiamento"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-brand/15 bg-white px-6 py-4 text-base font-semibold text-brand hover:border-brand/30"
              >
                <Calculator className="h-5 w-5" />
                Simular financiamento
              </Link>
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
      <SiteFooter />
    </div>
  );
}