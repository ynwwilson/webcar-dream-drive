import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronDown } from "lucide-react";
import { SiteHeader } from "@/components/site/header";
import { SiteFooter } from "@/components/site/footer";
import { CarCard } from "@/components/site/car-card";
import { WhatsAppIcon, WHATSAPP_URL } from "@/components/site/whatsapp-icon";
import { cars } from "@/data/cars";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "WebCar — Seminovos premium em Patos de Minas/MG" },
      {
        name: "description",
        content:
          "Seminovos premium revisados, com garantia e financiamento facilitado em Patos de Minas/MG.",
      },
      { property: "og:title", content: "WebCar — Seu próximo carro." },
      { property: "og:description", content: "Selecionados a dedo em Patos de Minas." },
    ],
  }),
  component: Index,
});

const HERO_IMG =
  "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=2400&q=85";

const HERO_VIDEO_PLACEHOLDER =
  "https://cdn.coverr.co/videos/coverr-driving-a-sports-car-3186/1080p.mp4";

const clientPhotos = Array.from({ length: 20 }).map(
  (_, i) => `https://i.pravatar.cc/240?img=${(i % 70) + 1}`,
);

function Index() {
  const featured = cars.slice(0, 6);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader transparentOnTop />

      {/* HERO — fullscreen cinematic */}
      <section className="relative h-[100svh] w-full overflow-hidden">
        <img
          src={HERO_IMG}
          alt="Porsche em destaque"
          className="absolute inset-0 hidden h-full w-full object-cover md:block"
        />
        <video
          autoPlay
          muted
          loop
          playsInline
          poster={HERO_IMG}
          className="absolute inset-0 h-full w-full object-cover md:hidden"
        >
          <source src={HERO_VIDEO_PLACEHOLDER} type="video/mp4" />
        </video>

        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black" />

        <div className="relative z-10 flex h-full flex-col items-center justify-end px-6 pb-24 text-center md:pb-32">
          <p className="mb-6 text-[11px] font-medium uppercase tracking-[0.25em] text-white/60">
            Seminovos premium · Patos de Minas/MG
          </p>
          <h1
            className="font-bold leading-[0.95] tracking-[-0.03em] text-white"
            style={{ fontSize: "clamp(48px, 8vw, 96px)" }}
          >
            Seu próximo carro.
          </h1>
          <p className="mt-6 max-w-md text-base text-white/70 md:text-lg">
            Selecionados a dedo. Entregues no padrão que você merece.
          </p>
          <div className="mt-10 flex w-full max-w-sm flex-col items-stretch gap-3 sm:w-auto sm:flex-row">
            <Link
              to="/estoque"
              className="inline-flex items-center justify-center rounded-full border border-white/80 bg-transparent px-8 py-3.5 text-sm font-medium text-white transition-all duration-300 hover:bg-white hover:text-black"
            >
              Ver estoque
            </Link>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/80 bg-transparent px-8 py-3.5 text-sm font-medium text-white transition-all duration-300 hover:bg-white hover:text-black"
            >
              <WhatsAppIcon className="h-4 w-4" />
              Falar no WhatsApp
            </a>
          </div>
        </div>

        <div className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2 text-white/40">
          <ChevronDown className="scroll-hint h-5 w-5" strokeWidth={1.5} />
        </div>
      </section>

      {/* DESTAQUES */}
      <section className="bg-background px-4 py-24 md:px-8 md:py-32">
        <div className="mx-auto max-w-7xl">
          <div className="mb-14 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="text-[11px] font-medium uppercase tracking-[0.25em] text-white/50">
                Em destaque
              </p>
              <h2 className="mt-3 text-3xl font-semibold tracking-[-0.02em] text-white md:text-5xl">
                Destaques do estoque
              </h2>
            </div>
            <Link
              to="/estoque"
              className="text-sm text-white/60 underline-offset-4 transition-colors hover:text-white hover:underline"
            >
              Ver todos →
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {featured.map((c) => (
              <CarCard key={c.id} car={c} />
            ))}
          </div>
        </div>
      </section>

      {/* +1000 CLIENTES — true infinite marquee */}
      <section className="bg-black py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-4 text-center md:px-8">
          <h2 className="mx-auto text-3xl font-semibold leading-[1.05] tracking-[-0.02em] text-white md:text-5xl">
            +1.000 clientes.
            <br />
            <span className="text-white/50">Uma história em cada chave entregue.</span>
          </h2>
        </div>
        <div className="relative mt-16 overflow-hidden">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-black to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-black to-transparent" />
          <div className="marquee-track flex w-max gap-6 md:gap-8">
            {[...clientPhotos, ...clientPhotos].map((src, i) => (
              <div
                key={i}
                className="h-20 w-20 shrink-0 overflow-hidden rounded-full border border-white/10 md:h-[120px] md:w-[120px]"
              >
                <img src={src} alt="" loading="lazy" className="h-full w-full object-cover" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* POR QUE WEBCAR */}
      <section className="bg-black px-4 py-24 md:px-8 md:py-32">
        <div className="mx-auto max-w-7xl">
          <div className="mb-16 text-center">
            <p className="text-[11px] font-medium uppercase tracking-[0.25em] text-white/50">
              Por que WebCar
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-[-0.02em] text-white md:text-5xl">
              Comprar bem é simples.
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 md:divide-x md:divide-white/10">
            {[
              {
                icon: <CheckIcon />,
                title: "Procedência",
                desc: "Todos os carros passam por revisão completa antes de entrar no nosso estoque.",
              },
              {
                icon: <ShieldIcon />,
                title: "Garantia",
                desc: "Cobertura de 3 meses pra você dirigir tranquilo nos primeiros quilômetros.",
              },
              {
                icon: <CardIcon />,
                title: "Financiamento",
                desc: "Parceria com os principais bancos. Aprovação rápida e taxas competitivas.",
              },
            ].map((item) => (
              <div key={item.title} className="px-6 py-10 md:px-12">
                <div className="text-white">{item.icon}</div>
                <h3 className="mt-8 text-xl font-semibold text-white">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-white/60">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="bg-background px-4 py-24 md:px-8 md:py-32">
        <div className="mx-auto flex max-w-3xl flex-col items-center gap-8 text-center">
          <h2 className="text-3xl font-semibold tracking-[-0.02em] text-white md:text-5xl">
            Não achou o que procura?
            <br />
            <span className="text-white/50">Fale com a gente.</span>
          </h2>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-3 rounded-full border border-white/80 bg-transparent px-10 py-4 text-base font-medium text-white transition-all duration-300 hover:bg-white hover:text-black"
          >
            <WhatsAppIcon className="h-5 w-5" />
            Falar no WhatsApp
          </a>
          <p className="text-xs text-white/40">
            Resposta em minutos · Atendimento humano · Patos de Minas/MG
          </p>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}

/* Minimalist outline icons (stroke 1.5px, no fill) */
function CheckIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12.5l4.5 4.5L19 7" />
    </svg>
  );
}
function ShieldIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3l8 3v6c0 5-3.5 8.5-8 9-4.5-.5-8-4-8-9V6l8-3z" />
    </svg>
  );
}
function CardIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="6" width="18" height="13" rx="2" />
      <path d="M3 10h18" />
    </svg>
  );
}
