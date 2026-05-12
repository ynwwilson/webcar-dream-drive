import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { SiteHeader } from "@/components/site/header";
import { SiteFooter } from "@/components/site/footer";
import { WhatsAppIcon } from "@/components/site/whatsapp-icon";

export const Route = createFileRoute("/financiamento")({
  head: () => ({
    meta: [
      { title: "Financiamento — WebCar Patos de Minas" },
      {
        name: "description",
        content:
          "Simule o financiamento do seu próximo carro com a WebCar. Aprovação rápida, melhores taxas e parcelas que cabem no seu bolso.",
      },
      { property: "og:title", content: "Financiamento — WebCar" },
      {
        property: "og:description",
        content: "Simulação rápida, aprovação ágil e parcelas que cabem no bolso.",
      },
    ],
  }),
  component: FinanciamentoPage,
});

const formatBRL = (n: number) =>
  n.toLocaleString("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 });

const beneficios = [
  {
    title: "Agilidade",
    text: "Resposta em minutos para você não perder a oportunidade do carro ideal.",
    icon: (
      <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
  },
  {
    title: "Segurança bancária",
    text: "Parcerias com as principais instituições do país e contratos transparentes.",
    icon: (
      <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
  },
  {
    title: "Carência flexível",
    text: "Primeira parcela em até 60 dias, conforme o seu perfil de crédito.",
    icon: (
      <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
] as const;

const passos = [
  { n: "01", title: "Escolha o modelo", text: "Selecione qualquer veículo do nosso estoque." },
  { n: "02", title: "Simule e envie", text: "Preencha os dados básicos para a análise preliminar." },
  { n: "03", title: "Aprovação digital", text: "Receba o retorno da análise 100% online." },
  { n: "04", title: "Assine e leve", text: "Documentação pronta e chave na mão em poucos dias." },
] as const;

const documentos = [
  "RG ou CNH (digital ou físico)",
  "Comprovante de residência atualizado",
  "Comprovante de rendimentos (3 meses)",
  "Ficha cadastral preenchida",
];

function FinanciamentoPage() {
  const [valor, setValor] = useState(180000);
  const [entrada, setEntrada] = useState(54000);
  const [parcelas, setParcelas] = useState(48);

  const { financiado, parcela, taxaMes, cetAno } = useMemo(() => {
    const fin = Math.max(valor - entrada, 0);
    const i = 0.0179;
    const n = parcelas;
    const pmt = fin > 0 ? (fin * i) / (1 - Math.pow(1 + i, -n)) : 0;
    const cet = (Math.pow(1 + i, 12) - 1) * 100;
    return { financiado: fin, parcela: pmt, taxaMes: i * 100, cetAno: cet };
  }, [valor, entrada, parcelas]);

  const whatsappMsg = encodeURIComponent(
    `Olá! Quero solicitar análise de crédito.\n• Valor do veículo: ${formatBRL(valor)}\n• Entrada: ${formatBRL(entrada)}\n• Parcelas: ${parcelas}x\n• Parcela estimada: ${formatBRL(parcela)}`,
  );
  const whatsappHref = `https://api.whatsapp.com/send?phone=553438141144&text=${whatsappMsg}`;

  return (
    <div className="min-h-screen bg-white text-[#0A0A0A]">
      <SiteHeader transparentOnTop={false} />

      {/* Hero */}
      <section className="mx-auto max-w-7xl px-6 pt-20 pb-12 md:pt-28 md:pb-16">
        <p className="eyebrow text-[12px] text-[#2E7CF6]">Financiamento WebCar</p>
        <h1
          className="mt-5 max-w-3xl text-4xl leading-[1.05] tracking-tight text-[#0A0A0A] md:text-6xl"
          style={{ fontFamily: "var(--font-display)", fontWeight: 600 }}
        >
          A conquista do seu próximo carro de forma{" "}
          <span className="text-[#2E7CF6]">inteligente.</span>
        </h1>
        <p className="mt-6 max-w-xl text-base leading-relaxed text-[#6B7280] md:text-lg">
          Taxas competitivas e aprovação ágil com as principais financeiras do país. Simule
          agora e receba retorno em poucos minutos.
        </p>
      </section>

      {/* Simulador */}
      <section className="mx-auto max-w-7xl px-6 pb-20 md:pb-28">
        <div className="grid gap-8 lg:grid-cols-12">
          {/* Inputs */}
          <div className="rounded-3xl border border-[#EEF1F5] bg-[#F7F9FB] p-8 md:p-10 lg:col-span-7">
            <h2 className="text-xl font-semibold text-[#0A0A0A]">Simulador de crédito</h2>

            <div className="mt-8 space-y-10">
              <SliderField
                label="Valor do veículo"
                value={valor}
                min={20000}
                max={500000}
                step={1000}
                display={formatBRL(valor)}
                onChange={setValor}
              />
              <SliderField
                label="Entrada"
                value={entrada}
                min={0}
                max={Math.max(valor - 1000, 0)}
                step={1000}
                display={formatBRL(entrada)}
                onChange={setEntrada}
              />

              <div>
                <div className="mb-4 flex items-baseline justify-between">
                  <label className="text-sm font-medium text-[#475569]">Parcelas</label>
                  <span className="text-lg font-semibold tracking-tight text-[#0A0A0A]">
                    {parcelas}x
                  </span>
                </div>
                <div className="grid grid-cols-4 gap-2">
                  {[24, 36, 48, 60].map((p) => (
                    <button
                      key={p}
                      type="button"
                      onClick={() => setParcelas(p)}
                      className={`rounded-lg border py-2.5 text-sm font-medium transition-colors ${
                        parcelas === p
                          ? "border-[#2E7CF6] bg-[#2E7CF6] text-white"
                          : "border-[#E2E8F0] bg-white text-[#0A0A0A] hover:border-[#2E7CF6]"
                      }`}
                    >
                      {p}x
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Resultado */}
          <div className="flex flex-col rounded-3xl bg-[#2E7CF6] p-8 text-white md:p-10 lg:col-span-5">
            <p className="text-[12px] font-semibold uppercase tracking-[0.2em] text-white/70">
              Resultado estimado
            </p>
            <div className="mt-6">
              <span className="block text-xs text-white/70">Parcela mensal de</span>
              <div
                className="mt-1 text-5xl font-bold tracking-tight"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {formatBRL(parcela)}
              </div>
            </div>

            <dl className="mt-8 space-y-4 border-t border-white/15 pt-6 text-sm">
              <Row k="Valor financiado" v={formatBRL(financiado)} />
              <Row k="Taxa de juros" v={`${taxaMes.toFixed(2)}% a.m.`} />
              <Row k="CET anual" v={`${cetAno.toFixed(1)}%`} />
            </dl>

            <a
              href={whatsappHref}
              target="_blank"
              rel="noreferrer"
              className="mt-8 inline-flex items-center justify-center gap-2 rounded-xl bg-white px-6 py-4 text-sm font-semibold text-[#2E7CF6] shadow-sm transition-colors hover:bg-blue-50"
            >
              <WhatsAppIcon className="h-4 w-4" />
              Solicitar análise de crédito
            </a>
            <p className="mt-3 text-[11px] text-white/60">
              * Valores estimados. Sujeito à aprovação de crédito.
            </p>
          </div>
        </div>
      </section>

      {/* Benefícios */}
      <section className="mx-auto max-w-7xl px-6 pb-20 md:pb-28">
        <div className="grid gap-12 md:grid-cols-3">
          {beneficios.map((b) => (
            <div key={b.title}>
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-[#2E7CF6]">
                {b.icon}
              </div>
              <h3 className="mt-6 text-xl font-semibold text-[#0A0A0A]">{b.title}</h3>
              <p className="mt-3 text-[15px] leading-relaxed text-[#6B7280]">{b.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Como funciona + Documentos */}
      <section className="bg-[#F7F9FB] py-20 md:py-28">
        <div className="mx-auto grid max-w-7xl gap-16 px-6 lg:grid-cols-2 lg:gap-20">
          <div>
            <h2
              className="text-3xl font-semibold tracking-tight text-[#0A0A0A] md:text-4xl"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Como funciona
            </h2>
            <ol className="mt-12 space-y-8">
              {passos.map((p) => (
                <li key={p.n} className="flex gap-6">
                  <span
                    className="text-4xl font-light text-[#CBD5E1]"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {p.n}
                  </span>
                  <div>
                    <h4 className="text-lg font-medium text-[#0A0A0A]">{p.title}</h4>
                    <p className="mt-1 text-[15px] leading-relaxed text-[#6B7280]">{p.text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          <div className="rounded-3xl border border-[#EEF1F5] bg-white p-10 shadow-sm">
            <h2
              className="text-2xl font-semibold tracking-tight text-[#0A0A0A]"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Documentos necessários
            </h2>
            <ul className="mt-8 space-y-5">
              {documentos.map((d) => (
                <li key={d} className="flex items-center gap-4">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-50">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#2E7CF6]" />
                  </span>
                  <span className="text-[15px] text-[#334155]">{d}</span>
                </li>
              ))}
            </ul>

            <div className="mt-10 rounded-2xl bg-[#F7F9FB] p-6">
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#94A3B8]">
                Dica WebCar
              </p>
              <p className="mt-2 text-sm leading-relaxed text-[#475569]">
                Para autônomos e PJ a documentação pode variar. Fale com nossos especialistas
                para a lista completa.
              </p>
              <Link
                to="/contato"
                className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-[#2E7CF6] hover:underline"
              >
                Falar com especialista →
              </Link>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex items-center justify-between">
      <dt className="text-white/70">{k}</dt>
      <dd className="font-medium">{v}</dd>
    </div>
  );
}

function SliderField({
  label,
  value,
  min,
  max,
  step,
  display,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  display: string;
  onChange: (n: number) => void;
}) {
  return (
    <div>
      <div className="mb-4 flex items-baseline justify-between">
        <label className="text-sm font-medium text-[#475569]">{label}</label>
        <span className="text-lg font-semibold tracking-tight text-[#0A0A0A]">{display}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="h-1.5 w-full cursor-pointer appearance-none rounded-lg bg-slate-200 accent-[#2E7CF6]"
      />
    </div>
  );
}
