import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site/header";
import { SiteFooter } from "@/components/site/footer";
import { WhatsAppIcon } from "@/components/site/whatsapp-icon";

const COTACAO_URL =
  "https://api.whatsapp.com/send?phone=553438141144&text=Ol%C3%A1%2C%20quero%20uma%20cota%C3%A7%C3%A3o%20de%20seguro";

export const Route = createFileRoute("/seguros")({
  head: () => ({
    meta: [
      { title: "Webseguros — Seguros do Grupo Web em Patos de Minas/MG" },
      {
        name: "description",
        content:
          "Webseguros é a corretora de seguros do Grupo Web. Auto, vida, residencial e empresarial — atendimento humano em Patos de Minas/MG há 12 anos.",
      },
      { property: "og:title", content: "Webseguros — A mesma confiança da WebCar" },
      {
        property: "og:description",
        content:
          "Cotação com várias seguradoras. Auto, vida, residencial e empresarial.",
      },
    ],
  }),
  component: SegurosPage,
});

const tipos = [
  {
    Icon: CarIcon,
    title: "Auto",
    text: "Cobertura completa contra roubo, colisão, terceiros e fenômenos naturais. Cotação com várias seguradoras.",
  },
  {
    Icon: HeartIcon,
    title: "Vida",
    text: "Proteção financeira pra família em caso de imprevistos. Indenizações compatíveis com o seu padrão.",
  },
  {
    Icon: HouseIcon,
    title: "Residencial",
    text: "Sua casa protegida contra incêndio, roubo, danos elétricos, vendaval e mais. Cobertura sob medida.",
  },
  {
    Icon: BuildingIcon,
    title: "Empresarial",
    text: "Seguros pra empresas, frotas e equipamentos. Soluções específicas pra cada porte e setor.",
  },
] as const;

const passos = [
  {
    n: "1",
    title: "Conta pra gente.",
    text: "WhatsApp, e-mail ou na loja. Diz o que você quer proteger e qual seu orçamento.",
  },
  {
    n: "2",
    title: "A gente cota com várias seguradoras.",
    text: "Comparamos preços e condições nas principais seguradoras do mercado. Você recebe as opções.",
  },
  {
    n: "3",
    title: "Você escolhe e contrata.",
    text: "Sem pressão. Decide a melhor opção, contrata, e segue tranquilo. A gente fica do seu lado se precisar acionar.",
  },
] as const;

function SegurosPage() {
  const manrope = { fontFamily: "'Manrope', Inter, system-ui, sans-serif" } as const;

  const scrollToTipos = (e: React.MouseEvent) => {
    e.preventDefault();
    document.getElementById("tipos")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-white text-[#0A2540]">
      <SiteHeader />

      {/* HERO */}
      <section
        className="relative flex min-h-[60vh] items-center"
        style={{ background: "linear-gradient(180deg, #FFFFFF 0%, #EEF1F5 100%)" }}
      >
        <div className="mx-auto w-full max-w-4xl px-6 py-16 text-center md:py-24">
          <p className="text-[12px] font-medium uppercase tracking-[0.3em] text-[#6B7280]">
            Grupo Web · Seguros
          </p>
          <h1
            className="mt-6 font-bold normal-case text-[#0A2540]"
            style={{
              ...manrope,
              fontWeight: 700,
              fontSize: "clamp(28px, 5vw, 64px)",
              letterSpacing: "-0.03em",
              lineHeight: 1.1,
            }}
          >
            A mesma confiança da WebCar.
            <br />
            Agora pra proteger o resto da sua vida.
          </h1>
          <p className="mx-auto mt-6 max-w-[600px] text-base text-[#6B7280] md:text-[18px]">
            Webseguros é a corretora de seguros do nosso grupo. Em Patos de Minas, há 12 anos cuidando das duas pontas: do carro que você compra ao seguro que te protege.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href={COTACAO_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#2E7CF6] px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-[#2566D1] sm:w-auto"
            >
              <WhatsAppIcon className="h-4 w-4" />
              Fazer cotação
            </a>
            <a
              href="#tipos"
              onClick={scrollToTipos}
              className="inline-flex w-full items-center justify-center rounded-full border border-[#0A2540] px-7 py-3.5 text-sm font-semibold text-[#0A2540] transition hover:bg-[#0A2540] hover:text-white sm:w-auto"
            >
              Saber mais
            </a>
          </div>
        </div>
      </section>

      {/* TIPOS DE SEGURO */}
      <section id="tipos" className="bg-white">
        <div className="mx-auto max-w-6xl px-6 py-20 md:px-16 md:py-24">
          <div className="max-w-2xl">
            <p className="text-[12px] font-medium uppercase tracking-[0.3em] text-[#6B7280]">
              O que protegemos
            </p>
            <h2
              className="mt-4 normal-case text-[#0A2540]"
              style={{ ...manrope, fontWeight: 700, fontSize: "clamp(26px, 3.4vw, 36px)", letterSpacing: "-0.02em", lineHeight: 1.15 }}
            >
              Cobertura completa, atendimento próximo.
            </h2>
            <p className="mt-3 text-base text-[#6B7280]">
              Quatro frentes pra garantir que você durma tranquilo.
            </p>
          </div>

          <div className="mt-14 grid grid-cols-1 gap-y-10 sm:grid-cols-2 sm:gap-x-8 lg:grid-cols-4 lg:divide-x lg:divide-[#E5E7EB] lg:gap-y-0">
            {tipos.map(({ Icon, title, text }) => (
              <div
                key={title}
                className="flex items-start gap-5 lg:block lg:px-6 lg:first:pl-0 lg:last:pr-0"
              >
                <div className="shrink-0 text-[#0A2540]">
                  <Icon />
                </div>
                <div className="lg:mt-6">
                  <h3
                    className="text-lg normal-case text-[#0A2540]"
                    style={{ ...manrope, fontWeight: 600, letterSpacing: "-0.01em" }}
                  >
                    {title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#6B7280]">{text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* COMO FUNCIONA */}
      <section className="bg-[#FAFAFA]">
        <div className="mx-auto max-w-5xl px-6 py-20 md:px-16 md:py-24">
          <div className="max-w-2xl">
            <p className="text-[12px] font-medium uppercase tracking-[0.3em] text-[#6B7280]">
              Processo
            </p>
            <h2
              className="mt-4 normal-case text-[#0A2540]"
              style={{ ...manrope, fontWeight: 700, fontSize: "clamp(26px, 3.4vw, 36px)", letterSpacing: "-0.02em", lineHeight: 1.15 }}
            >
              Em 3 passos, simples.
            </h2>
          </div>

          <div className="mt-14 grid grid-cols-1 gap-12 md:grid-cols-3 md:gap-8">
            {passos.map((p) => (
              <div key={p.n} className="relative pt-12 md:pt-16">
                <span
                  aria-hidden
                  className="pointer-events-none absolute -top-2 left-0 select-none leading-none text-[#DDE3EC] md:left-0"
                  style={{ ...manrope, fontWeight: 800, fontSize: "120px", letterSpacing: "-0.05em" }}
                >
                  {p.n}
                </span>
                <div className="relative">
                  <h3
                    className="normal-case text-[#0A2540]"
                    style={{ ...manrope, fontWeight: 600, fontSize: "20px", letterSpacing: "-0.01em" }}
                  >
                    {p.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-[#6B7280]">{p.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="bg-white">
        <div className="mx-auto max-w-3xl px-6 py-20 text-center md:py-24">
          <h2
            className="normal-case text-[#0A2540]"
            style={{ ...manrope, fontWeight: 700, fontSize: "clamp(28px, 4vw, 44px)", letterSpacing: "-0.02em", lineHeight: 1.15 }}
          >
            Pronto pra cotar seu seguro?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base text-[#6B7280] md:text-[18px]">
            Atendimento humano. Resposta em minutos. Sem letra miúda.
          </p>
          <div className="mt-8 flex justify-center">
            <a
              href={COTACAO_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-3 rounded-full bg-[#2E7CF6] px-9 py-4 text-base font-semibold text-white transition hover:bg-[#2566D1]"
            >
              <WhatsAppIcon className="h-5 w-5" />
              Falar com a Webseguros
            </a>
          </div>
          <p className="mt-5 text-xs text-[#6B7280]">
            Seg a Sex 8h-18h · Sáb 8h-13h · Patos de Minas/MG
          </p>
          <div className="mt-10">
            <Link to="/" className="text-sm text-[#6B7280] underline-offset-4 hover:text-[#0A2540] hover:underline">
              ← Voltar para WebCar
            </Link>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}

/* ====== Outline icons (stroke 1.5px, no fill) ====== */
const iconProps = {
  width: 48,
  height: 48,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

function CarIcon() {
  return (
    <svg {...iconProps}>
      <path d="M5 17h14M4 17v-4l2-5a2 2 0 0 1 1.9-1.4h8.2A2 2 0 0 1 18 8l2 5v4" />
      <circle cx="7.5" cy="17.5" r="1.7" />
      <circle cx="16.5" cy="17.5" r="1.7" />
      <path d="M5 13h14" />
    </svg>
  );
}
function HeartIcon() {
  return (
    <svg {...iconProps}>
      <path d="M12 20s-7-4.5-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.5-7 10-7 10z" />
    </svg>
  );
}
function HouseIcon() {
  return (
    <svg {...iconProps}>
      <path d="M3 11l9-7 9 7" />
      <path d="M5 10v9h14v-9" />
      <path d="M10 19v-5h4v5" />
    </svg>
  );
}
function BuildingIcon() {
  return (
    <svg {...iconProps}>
      <path d="M4 21V5a1 1 0 0 1 1-1h9a1 1 0 0 1 1 1v16" />
      <path d="M15 21V11a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1v10" />
      <path d="M3 21h18" />
      <path d="M7 8h2M7 12h2M7 16h2M11 8h0M11 12h0M11 16h0" />
    </svg>
  );
}