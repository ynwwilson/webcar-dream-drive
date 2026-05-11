import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { ShieldCheck, BadgeCheck, Wallet } from "lucide-react";
import { SiteHeader } from "@/components/site/header";
import { SiteFooter } from "@/components/site/footer";
import { CarCard } from "@/components/site/car-card";
import { WhatsAppIcon, WHATSAPP_URL } from "@/components/site/whatsapp-icon";
import { cars } from "@/data/cars";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "WebCar — Seminovos selecionados em Patos de Minas/MG" },
      {
        name: "description",
        content:
          "Seminovos premium revisados, com garantia e financiamento facilitado em Patos de Minas/MG.",
      },
      { property: "og:title", content: "WebCar — Seu próximo carro está aqui" },
      { property: "og:description", content: "Seminovos selecionados em Patos de Minas." },
    ],
  }),
  component: Index,
});

const HERO_IMG =
  "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1800&q=80";

const HERO_VIDEO_PLACEHOLDER =
  "https://cdn.coverr.co/videos/coverr-driving-a-sports-car-3186/1080p.mp4";

const clientPhotos = Array.from({ length: 15 }).map(
  (_, i) =>
    `https://i.pravatar.cc/480?img=${(i % 70) + 1}`,
);

function Index() {
  const featured = cars.slice(0, 6);

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      {/* HERO */}
      <section className="relative">
        {/* MOBILE: vertical video */}
        <div className="relative h-[100svh] w-full overflow-hidden md:hidden">
          <video
            autoPlay
            muted
            loop
            playsInline
            poster={HERO_IMG}
            className="absolute inset-0 h-full w-full object-cover"
          >
            <source src={HERO_VIDEO_PLACEHOLDER} type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-black/40" />
          <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center text-white">
            <h1 className="max-w-md text-4xl font-extrabold leading-[1.05] tracking-tight">
              Seu próximo carro está aqui.
            </h1>
            <p className="mt-4 max-w-xs text-base text-white/85">
              Seminovos selecionados em Patos de Minas.
            </p>
            <div className="mt-8 flex w-full max-w-xs flex-col gap-3">
              <Link
                to="/estoque"
                className="inline-flex items-center justify-center rounded-full bg-accent-blue px-6 py-3.5 text-sm font-semibold text-white shadow-lg"
              >
                Ver estoque
              </Link>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/40 bg-white/10 px-6 py-3.5 text-sm font-semibold text-white backdrop-blur"
              >
                <WhatsAppIcon className="h-4 w-4" />
                Falar no WhatsApp
              </a>
            </div>
          </div>
        </div>

        {/* DESKTOP */}
        <div className="hidden md:block">
          <div className="mx-auto grid max-w-7xl grid-cols-12 items-center gap-8 px-8 py-20 lg:py-28">
            <div className="col-span-12 lg:col-span-4">
              <p className="mb-5 inline-flex items-center gap-2 rounded-full bg-secondary px-3 py-1 text-xs font-semibold uppercase tracking-widest text-brand/70">
                Seminovos premium
              </p>
              <h1 className="text-[56px] font-extrabold leading-[1.02] tracking-[-0.02em] text-brand">
                Seu próximo<br />carro está aqui.
              </h1>
              <p className="mt-6 max-w-md text-lg text-muted-foreground">
                Seminovos selecionados em Patos de Minas.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  to="/estoque"
                  className="inline-flex items-center justify-center rounded-full bg-accent-blue px-7 py-3.5 text-sm font-semibold text-white shadow-sm transition-all hover:brightness-110 hover:shadow-md"
                >
                  Ver estoque
                </Link>
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-brand/15 bg-white px-7 py-3.5 text-sm font-semibold text-brand transition-all hover:border-brand/30"
                >
                  <WhatsAppIcon className="h-4 w-4" />
                  Falar no WhatsApp
                </a>
              </div>
            </div>
            <div className="col-span-12 lg:col-span-8">
              <div className="relative overflow-hidden rounded-3xl bg-secondary shadow-[0_30px_60px_-30px_rgba(10,37,64,0.35)]">
                <img
                  src={HERO_IMG}
                  alt="Carro premium em destaque"
                  className="h-[460px] w-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* DESTAQUES */}
      <section className="mx-auto max-w-7xl px-4 py-20 md:px-8 md:py-24">
        <div className="mb-12 text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-accent-blue">
            Em destaque
          </p>
          <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-brand md:text-4xl">
            Destaques do estoque
          </h2>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {featured.map((c) => <CarCard key={c.id} car={c} />)}
        </div>
        <div className="mt-12 text-center">
          <Link
            to="/estoque"
            className="inline-flex items-center justify-center rounded-full border border-brand/15 bg-white px-7 py-3 text-sm font-semibold text-brand hover:border-brand/30"
          >
            Ver todo o estoque
          </Link>
        </div>
      </section>

      {/* +1000 CLIENTES */}
      <section className="bg-secondary py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 text-center md:px-8">
          <h2 className="mx-auto max-w-3xl text-3xl font-extrabold leading-tight tracking-tight text-brand md:text-5xl">
            +1.000 clientes que confiaram na WebCar
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-base text-muted-foreground md:text-lg">
            Você também merece sair daqui com a chave na mão.
          </p>
        </div>
        <div className="relative mt-14 overflow-hidden">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-secondary to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-secondary to-transparent" />
          <div className="marquee-track flex w-max gap-4 md:gap-6">
            {[...clientPhotos, ...clientPhotos].map((src, i) => (
              <div
                key={i}
                className="h-[160px] w-[160px] shrink-0 overflow-hidden rounded-2xl bg-white shadow-sm md:h-[240px] md:w-[240px]"
              >
                <img src={src} alt="" loading="lazy" className="h-full w-full object-cover" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* POR QUE WEBCAR */}
      <section className="mx-auto max-w-7xl px-4 py-20 md:px-8 md:py-24">
        <div className="mb-12 text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-accent-blue">
            Por que WebCar
          </p>
          <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-brand md:text-4xl">
            Comprar bem é simples.
          </h2>
        </div>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {[
            { icon: BadgeCheck, title: "Procedência", desc: "Todos os carros passam por revisão completa antes de entrar no nosso estoque." },
            { icon: ShieldCheck, title: "Garantia", desc: "Cobertura de 3 meses pra você dirigir tranquilo nos primeiros quilômetros." },
            { icon: Wallet, title: "Financiamento", desc: "Parceria com os principais bancos. Aprovação rápida e taxas competitivas." },
          ].map(({ icon: Icon, title, desc }) => (
            <div key={title} className="rounded-2xl border bg-card p-8 transition-shadow hover:shadow-md">
              <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-secondary text-accent-blue">
                <Icon className="h-6 w-6" strokeWidth={1.5} />
              </div>
              <h3 className="text-lg font-bold text-brand">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="bg-brand">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-8 px-4 py-20 text-center md:px-8 md:py-24">
          <h2 className="max-w-2xl text-3xl font-extrabold tracking-tight text-white md:text-4xl">
            Não achou o que procura? Fale com a gente.
          </h2>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-3 rounded-full bg-white px-8 py-4 text-base font-semibold text-brand shadow-lg transition-transform hover:scale-[1.02]"
          >
            <WhatsAppIcon className="h-5 w-5 text-whatsapp" />
            Falar no WhatsApp
          </a>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}

function Index() {
  return <PlaceholderIndex />;
}
