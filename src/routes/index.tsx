import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu } from "lucide-react";
import { SiteHeader } from "@/components/site/header";
import { SiteFooter } from "@/components/site/footer";
import { CarCard } from "@/components/site/car-card";
import { WhatsAppIcon, WHATSAPP_URL } from "@/components/site/whatsapp-icon";
import { AcceleratorButton } from "@/components/site/accelerator-button";
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

const clientPhotos = Array.from({ length: 20 }).map(
  (_, i) => `https://i.pravatar.cc/240?img=${(i % 70) + 1}`,
);

function Index() {
  const featured = cars.slice(0, 6);
  const [scrolled, setScrolled] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        const y = window.scrollY;
        setScrollY(y);
        setScrolled(y > window.innerHeight * 0.8);
        raf = 0;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  // Parallax — strong, clamped to viewport
  const vh = typeof window !== "undefined" ? window.innerHeight : 900;
  const p = Math.min(scrollY, vh) / vh; // 0 → 1
  // Tudo sobe junto, em velocidades diferentes (parallax forte)
  // Carro usa vh-based para ficar estável em diferentes telas
  const porscheY = p * vh * -0.55;
  const webcarY = p * -520;
  const headlineY = p * -900;
  const ctasY = p * -780;
  const headerY = p * -1100;
  const labelLeftY = p * -650;
  const labelRightY = p * -650;
  const statsY = p * -600;
  const heroOpacity = 1 - p * 0.4;

  const navLinks = [
    { to: "/estoque", label: "Estoque" },
    { to: "/financiamento", label: "Financiamento" },
    { to: "/sobre", label: "Sobre" },
    { to: "/contato", label: "Contato" },
  ] as const;

  return (
    <div className="min-h-screen bg-white text-[#0A0A0A]">
      {scrolled && <SiteHeader transparentOnTop={false} />}

      {/* HERO — 3 zonas verticais (TOP / MID / BOTTOM) */}
      <section
        className="hero-webcar relative flex h-[100vh] w-full flex-col overflow-hidden"
        style={{ background: "linear-gradient(180deg, #FFFFFF 0%, #EEF1F5 100%)" }}
      >
        {/* ZONA TOP — header */}
        <header
          className="hero-ui hero-ui-1 relative z-10 flex h-20 items-center justify-between px-5 will-change-transform md:px-8"
          style={{ transform: `translate3d(0, ${headerY}px, 0)`, opacity: heroOpacity }}
        >
          <div className="flex items-center gap-4">
            <Link to="/" className="font-bold text-[#0A2540]" style={{ fontFamily: "Manrope, sans-serif", fontSize: 22, letterSpacing: "-0.02em" }}>
              WEBCAR
            </Link>
            <span className="hidden h-px w-6 bg-[#0A2540] opacity-30 md:block" />
            <p className="hidden text-[11px] font-medium uppercase text-[#6B7280] md:block" style={{ letterSpacing: "0.3em" }}>
              Est. 2014 · Patos de Minas/MG
            </p>
          </div>
          <nav className="hidden items-center gap-3 md:flex">
            {navLinks.map((l, i) => (
              <span key={l.to} className="flex items-center gap-3">
                <Link to={l.to as any} className="text-sm font-medium text-[#0A2540] transition-opacity hover:opacity-70">
                  {l.label}
                </Link>
                {i < navLinks.length - 1 && <span className="text-[#C5CDD8]">·</span>}
              </span>
            ))}
          </nav>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noreferrer"
            className="hidden items-center gap-2 rounded-full bg-[#2E7CF6] px-5 py-2.5 text-sm font-semibold text-white transition-all hover:brightness-110 md:inline-flex"
          >
            <WhatsAppIcon className="h-4 w-4" />
            WhatsApp
          </a>
          <button className="inline-flex h-10 w-10 items-center justify-center rounded-md text-[#0A2540] md:hidden" aria-label="Menu">
            <Menu className="h-5 w-5" />
          </button>
        </header>

        {/* ZONA MID — carro + WEBCAR + labels verticais */}
        <div className="relative flex-1 overflow-hidden">
          {/* fundo */}
          <div
            className="hero-fade-bg absolute inset-0"
            style={{ zIndex: 1, background: "linear-gradient(180deg, #FFFFFF 0%, #EEF1F5 100%)" }}
          />
          {/* WEBCAR */}
          <div
            className="absolute inset-0 flex items-center justify-center will-change-transform"
            style={{ zIndex: 2, transform: `translate3d(0, ${webcarY}px, 0)`, opacity: heroOpacity }}
          >
            <span
              aria-hidden
              className="hero-webcar-text pointer-events-none select-none text-center"
              style={{
                fontFamily: "Manrope, system-ui, sans-serif",
                fontWeight: 800,
                fontSize: "clamp(70px, 22vw, 380px)",
                letterSpacing: "-0.05em",
                lineHeight: 0.9,
                color: "#DDE3EC",
              }}
            >
              WEBCAR
            </span>
          </div>
          {/* Headline sobre o W do WEBCAR */}
          <div
            className="absolute left-6 top-5 z-[4] max-w-[calc(100%-48px)] text-left will-change-transform md:left-16 md:top-8 md:max-w-[700px] lg:top-10"
            style={{ transform: `translate3d(0, ${headlineY}px, 0)`, opacity: heroOpacity }}
          >
            <h2
              className="hero-ui hero-ui-2 text-[#0A2540]"
              style={{
                fontFamily: "Manrope, sans-serif",
                fontWeight: 900,
                fontSize: "clamp(26px, 2.9vw, 40px)",
                letterSpacing: "-0.035em",
                lineHeight: 1.02,
              }}
            >
              WebCar — Seminovos premium.<br />
              Desde 2014 transformando vidas!
            </h2>
            <p className="hero-ui hero-ui-3 mt-3 max-w-[460px] text-[15px] leading-relaxed text-[#6B7280] md:mt-4">
              Há 12 anos selecionando carros pra quem mora aqui. +1.000 chaves entregues.
            </p>
          </div>
          {/* Porsche */}
          <img
            src="/porsche.png"
            alt=""
            className="hero-porsche-img absolute inset-0 h-full w-full will-change-transform"
            style={{
              zIndex: 3,
              objectFit: "contain",
              objectPosition: "60% 62%",
              transform: `translate3d(0, ${porscheY}px, 0) scale(${1 + p * 0.06})`,
              transformOrigin: "60% 62%",
            }}
          />
          {/* Labels verticais — desktop only */}
          <div
            className="hero-ui hero-ui-1 absolute top-1/2 hidden md:block"
            style={{ left: 32, transform: `translate3d(0, calc(-50% + ${labelLeftY}px), 0) rotate(180deg)`, writingMode: "vertical-rl", zIndex: 4, opacity: heroOpacity }}
          >
            <span className="text-[10px] font-medium uppercase text-[#6B7280]" style={{ letterSpacing: "0.4em" }}>
              Edição 01
            </span>
          </div>
          <div
            className="hero-ui hero-ui-1 absolute top-1/2 hidden md:block"
            style={{ right: 32, transform: `translate3d(0, calc(-50% + ${labelRightY}px), 0)`, writingMode: "vertical-rl", zIndex: 4, opacity: heroOpacity }}
          >
            <span className="text-[10px] font-medium uppercase text-[#6B7280]" style={{ letterSpacing: "0.4em" }}>
              Vol. 12 — 2026
            </span>
          </div>
          {/* CTAs — abaixo do "R" de WEBCAR */}
          <div
            className="hero-ui hero-ui-4 absolute z-[5] flex flex-col items-center gap-3 will-change-transform md:items-end"
            style={{ right: "3%", bottom: "8%", transform: `translate3d(0, ${ctasY}px, 0)`, opacity: heroOpacity }}
          >
            <AcceleratorButton to="/estoque" label="Ver carros" />
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noreferrer"
              className="text-base font-semibold text-[#0A2540] underline underline-offset-4 hover:opacity-70"
            >
              Falar no WhatsApp →
            </a>
          </div>
        </div>

        {/* ZONA BOTTOM — texto + CTAs + stats */}
        <div
          className="relative z-10 flex flex-col justify-end bg-white/0 px-6 will-change-transform md:px-16"
          style={{ height: 56, transform: `translate3d(0, ${statsY}px, 0)`, opacity: heroOpacity }}
        >
          {/* Linha 2: stats bar */}
          <div className="hero-stats border-y border-[#E5E7EB] py-2.5">
            <div className="hidden flex-wrap items-center justify-around gap-x-6 gap-y-2 text-[11px] font-medium uppercase text-[#6B7280] md:flex" style={{ letterSpacing: "0.2em" }}>
              <span>1.000+ Entregas</span>
              <span>4.9 ★ Google</span>
              <span>100% Revisados</span>
              <span>12 Anos em Patos</span>
            </div>
            <div className="grid grid-cols-2 gap-y-2 text-center text-[10px] font-medium uppercase text-[#6B7280] md:hidden" style={{ letterSpacing: "0.2em" }}>
              <span>1.000+ Entregas</span>
              <span>4.9 ★ Google</span>
              <span>100% Revisados</span>
              <span>12 Anos em Patos</span>
            </div>
          </div>
        </div>
      </section>

      {/* DESTAQUES */}
      <section className="bg-white px-4 py-24 md:px-8 md:py-32">
        <div className="mx-auto max-w-7xl">
          <div className="mb-14 max-w-2xl">
            <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#6B7280]">Em destaque</p>
            <h2 className="mt-3 text-3xl font-bold tracking-[-0.02em] text-[#0A0A0A] md:text-5xl">
              Selecionados pra você.
            </h2>
            <p className="mt-4 text-base text-[#6B7280] md:text-lg">
              Carros revisados, com procedência e prontos pra rodar.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3">
            {featured.map((c) => (
              <CarCard key={c.id} car={c} />
            ))}
          </div>
          <div className="mt-14 flex justify-center">
            <Link
              to="/estoque"
              className="inline-flex items-center justify-center rounded-full border border-[#0A0A0A] bg-transparent px-8 py-3.5 text-sm font-semibold text-[#0A0A0A] transition-all duration-200 hover:bg-[#0A0A0A] hover:text-white"
            >
              Ver todo o estoque
            </Link>
          </div>
        </div>
      </section>

      {/* POR QUE WEBCAR */}
      <section className="bg-white px-4 py-24 md:px-8 md:py-32">
        <div className="mx-auto max-w-7xl">
          <div className="mb-16 max-w-2xl">
            <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#6B7280]">Por que WebCar</p>
            <h2 className="mt-3 text-3xl font-bold tracking-[-0.02em] text-[#0A0A0A] md:text-5xl">
              Comprar carro pode ser simples.
            </h2>
            <p className="mt-4 text-base text-[#6B7280] md:text-lg">
              Você escolhe, a gente cuida do resto. Sem letras miúdas, sem surpresas.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 md:divide-x md:divide-[#E5E7EB]">
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
                <div className="text-[#0A0A0A]">{item.icon}</div>
                <h3 className="mt-8 text-xl font-bold text-[#0A0A0A]">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-[#6B7280]">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* +1.000 CLIENTES — carrossel 3D côncavo */}
      <section className="bg-[#FAFAFA] py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-4 text-center md:px-8">
          <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#6B7280]">Quem já comprou conosco</p>
          <h2 className="mt-3 text-3xl font-bold leading-[1.05] tracking-[-0.02em] text-[#0A0A0A] md:text-5xl">
            Mais de 1.000 chaves entregues.
          </h2>
          <p className="mt-4 text-base text-[#6B7280] md:text-lg">
            Cada cliente é um endereço novo em Patos.
          </p>
        </div>
        <div className="carousel3d-stage mt-16">
          <div className="carousel3d-scene">
            <div className="carousel3d-rotor">
              {clientPhotos.slice(0, 14).map((src, i, arr) => {
                const angle = (360 / arr.length) * i;
                return (
                  <div
                    key={i}
                    className="carousel3d-card"
                    style={{ transform: `rotateY(${angle}deg) translateZ(700px) rotateY(180deg)` }}
                  >
                    <img src={src} alt="" loading="lazy" />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="bg-white px-4 py-24 md:px-8 md:py-32">
        <div className="mx-auto flex max-w-[720px] flex-col items-center gap-6 text-center">
          <h2 className="text-3xl font-bold tracking-[-0.02em] text-[#0A0A0A] md:text-5xl">
            Pronto pra encontrar seu próximo carro?
          </h2>
          <p className="text-base text-[#6B7280] md:text-lg">
            Resposta em minutos. Atendimento humano. Sem enrolação.
          </p>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noreferrer"
            className="mt-2 inline-flex items-center gap-3 rounded-full bg-[#2E7CF6] px-10 py-4 text-base font-semibold text-white transition-all duration-200 hover:bg-[#2566D1]"
          >
            <WhatsAppIcon className="h-5 w-5" />
            Falar no WhatsApp
          </a>
          <p className="text-xs text-[#6B7280]">
            Atendimento de seg a sáb · WhatsApp · Patos de Minas/MG
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
