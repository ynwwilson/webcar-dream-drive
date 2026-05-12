import { createFileRoute, Link } from "@tanstack/react-router";
import { ShieldCheck, Award, Handshake, Sparkles, MapPin, Phone } from "lucide-react";
import { SiteHeader } from "@/components/site/header";
import { SiteFooter } from "@/components/site/footer";
import { WhatsAppIcon, WHATSAPP_URL } from "@/components/site/whatsapp-icon";

export const Route = createFileRoute("/sobre")({
  head: () => ({
    meta: [
      { title: "Sobre a WebCar — Seminovos premium em Patos de Minas" },
      {
        name: "description",
        content:
          "Conheça a WebCar Veículos: anos de história em Patos de Minas/MG entregando seminovos premium com procedência, garantia e atendimento de verdade.",
      },
      { property: "og:title", content: "Sobre a WebCar — Quem somos" },
      {
        property: "og:description",
        content: "Procedência, transparência e cuidado em cada detalhe.",
      },
    ],
  }),
  component: SobrePage,
});

const valores = [
  {
    icon: ShieldCheck,
    title: "Procedência",
    text: "Cada veículo passa por uma avaliação rigorosa antes de entrar no nosso estoque.",
  },
  {
    icon: Award,
    title: "Qualidade",
    text: "Seleção criteriosa de seminovos premium revisados e prontos para rodar.",
  },
  {
    icon: Handshake,
    title: "Confiança",
    text: "Atendimento humano, transparente e sem letras miúdas — do primeiro contato à entrega.",
  },
  {
    icon: Sparkles,
    title: "Experiência",
    text: "Tornamos a compra do seu carro uma experiência segura, simples e memorável.",
  },
] as const;

function SobrePage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      {/* Hero */}
      <section className="relative overflow-hidden border-b bg-brand text-brand-foreground">
        <div className="absolute inset-0 opacity-[0.07]" aria-hidden>
          <div className="absolute -left-24 top-10 h-72 w-72 rounded-full bg-accent-blue blur-3xl" />
          <div className="absolute right-0 bottom-0 h-96 w-96 rounded-full bg-accent-blue blur-3xl" />
        </div>
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-20 md:grid-cols-2 md:px-8 md:py-28">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent-blue">
              Sobre nós
            </p>
            <h1 className="mt-3 text-4xl font-extrabold tracking-tight md:text-6xl">
              Quem somos.
            </h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-white/70 md:text-lg">
              A <strong className="text-white">WebCar Veículos</strong> é referência em
              credibilidade no mercado de seminovos em Patos de Minas/MG. Construímos
              nossa história na transparência, no compromisso com cada cliente e na
              busca incansável pelo melhor atendimento.
            </p>
          </div>
          <div className="flex items-end justify-end">
            <div className="grid grid-cols-3 gap-4 text-center md:text-left">
              {[
                { n: "10+", l: "Anos de mercado" },
                { n: "1.5k", l: "Clientes felizes" },
                { n: "100%", l: "Procedência" },
              ].map((s) => (
                <div key={s.l} className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur">
                  <p className="text-3xl font-extrabold text-white md:text-4xl">{s.n}</p>
                  <p className="mt-1 text-[11px] font-semibold uppercase tracking-widest text-white/60">{s.l}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* História */}
      <section className="mx-auto max-w-7xl px-4 py-20 md:px-8">
        <div className="grid gap-12 md:grid-cols-2">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent-blue">
              Nossa história
            </p>
            <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-brand md:text-4xl">
              Mais que vender carros, realizamos sonhos.
            </h2>
          </div>
          <div className="space-y-5 text-base leading-relaxed text-muted-foreground">
            <p>
              Com uma trajetória consolidada no mercado, acumulamos anos de experiência
              oferecendo qualidade, transparência e comprometimento a cada cliente.
              Trabalhamos com um estoque selecionado de veículos seminovos, todos
              rigorosamente avaliados para garantir segurança e procedência.
            </p>
            <p>
              Nossa missão é ir além da venda, proporcionando uma experiência de compra
              diferenciada, pautada em confiança e satisfação. Na WebCar não vendemos
              apenas carros — realizamos sonhos com excelência no atendimento e total
              dedicação à qualidade dos nossos serviços.
            </p>
          </div>
        </div>
      </section>

      {/* Valores */}
      <section className="border-y bg-secondary/40">
        <div className="mx-auto max-w-7xl px-4 py-20 md:px-8">
          <div className="mb-12 max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent-blue">
              O que nos move
            </p>
            <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-brand md:text-4xl">
              Nossos valores.
            </h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {valores.map((v) => (
              <div
                key={v.title}
                className="group rounded-2xl border bg-card p-7 transition-all hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent-blue/10 text-accent-blue">
                  <v.icon className="h-6 w-6" strokeWidth={1.5} />
                </div>
                <h3 className="mt-5 text-lg font-bold text-brand">{v.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{v.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-4 py-20 md:px-8">
        <div className="overflow-hidden rounded-3xl bg-brand px-8 py-14 text-center text-brand-foreground md:px-16 md:py-20">
          <h2 className="text-3xl font-extrabold tracking-tight md:text-5xl">
            Pronto para encontrar o seu próximo carro?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-white/70 md:text-lg">
            Visite nossa loja em Patos de Minas ou fale agora com um especialista.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link
              to="/estoque"
              className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-brand transition hover:bg-white/90"
            >
              Ver estoque
            </Link>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-accent-blue px-6 py-3 text-sm font-semibold text-white transition hover:brightness-110"
            >
              <WhatsAppIcon className="h-4 w-4" /> Falar no WhatsApp
            </a>
          </div>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm text-white/70">
            <span className="inline-flex items-center gap-2">
              <MapPin className="h-4 w-4" /> Patos de Minas / MG
            </span>
            <span className="inline-flex items-center gap-2">
              <Phone className="h-4 w-4" /> (34) 99999-9999
            </span>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
