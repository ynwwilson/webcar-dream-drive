import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site/header";
import { SiteFooter } from "@/components/site/footer";
import { CarCard } from "@/components/site/car-card";
import { WhatsAppIcon, WHATSAPP_URL } from "@/components/site/whatsapp-icon";
import { cars } from "@/data/cars";
import heroImg from "@/assets/hero-porsche.png";

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

const HERO_IMG = heroImg;

const clientPhotos = Array.from({ length: 20 }).map(
  (_, i) => `https://i.pravatar.cc/240?img=${(i % 70) + 1}`,
);

function Index() {
  const featured = cars.slice(0, 6);

  return (
    <div className="min-h-screen bg-white text-[#0A0A0A]">
      <SiteHeader transparentOnTop />

      {/* HERO — light, persuasivo */}
      <section className="relative h-[100svh] w-full overflow-hidden">
        <img
          src={HERO_IMG}
          alt="Porsche premium"
          className="absolute inset-0 h-full w-full object-cover"
        />
      </section>

      {/* PROVA EM NÚMEROS */}
      <section className="border-y border-[#E5E7EB] bg-white px-4 py-16 md:px-8">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 md:grid-cols-4 md:divide-x md:divide-[#E5E7EB] md:gap-0">
          {[
            { n: "1.000+", l: "clientes em Patos" },
            { n: "12 anos", l: "no mercado" },
            { n: "4.9 ★", l: "avaliação Google" },
            { n: "100%", l: "carros revisados" },
          ].map((s) => (
            <div key={s.l} className="text-center md:px-6">
              <p className="font-bold tracking-[-0.02em] text-[#0A0A0A]" style={{ fontSize: "clamp(36px, 5vw, 56px)" }}>{s.n}</p>
              <p className="mt-2 text-[12px] font-medium uppercase tracking-[0.1em] text-[#6B7280]">{s.l}</p>
            </div>
          ))}
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
