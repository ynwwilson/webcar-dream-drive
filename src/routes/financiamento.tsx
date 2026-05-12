import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Calculator, FileCheck2, Banknote, Clock, ShieldCheck, CheckCircle2 } from "lucide-react";
import { SiteHeader } from "@/components/site/header";
import { SiteFooter } from "@/components/site/footer";
import { WhatsAppIcon, WHATSAPP_URL } from "@/components/site/whatsapp-icon";

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
  { icon: Clock, title: "Aprovação rápida", text: "Resposta em poucos minutos com as principais financeiras do país." },
  { icon: Banknote, title: "Melhores taxas", text: "Negociamos por você condições competitivas e personalizadas." },
  { icon: FileCheck2, title: "Documentação simples", text: "Cuidamos de toda a burocracia — você só precisa assinar e dirigir." },
  { icon: ShieldCheck, title: "Segurança total", text: "Parcerias com instituições sólidas e contratos transparentes." },
] as const;

const passos = [
  { n: "01", title: "Simule online", text: "Use o simulador ou nos chame no WhatsApp." },
  { n: "02", title: "Envie seus dados", text: "Pré-aprovação com análise rápida e sem compromisso." },
  { n: "03", title: "Aprove a proposta", text: "Escolha a melhor condição entre as financeiras parceiras." },
  { n: "04", title: "Leve seu carro", text: "Assine o contrato e saia dirigindo no mesmo dia." },
] as const;

function FinanciamentoPage() {
  const [valor, setValor] = useState(80000);
  const [entrada, setEntrada] = useState(20000);
  const [parcelas, setParcelas] = useState(48);

  const { financiado, parcela, total } = useMemo(() => {
    const fin = Math.max(valor - entrada, 0);
    const i = 0.0179; // taxa estimada mensal
    const n = parcelas;
    const pmt = fin > 0 ? (fin * i) / (1 - Math.pow(1 + i, -n)) : 0;
    return { financiado: fin, parcela: pmt, total: pmt * n + entrada };
  }, [valor, entrada, parcelas]);

  const whatsappMsg = encodeURIComponent(
    `Olá! Quero simular um financiamento.\n• Valor do veículo: ${formatBRL(valor)}\n• Entrada: ${formatBRL(entrada)}\n• Parcelas: ${parcelas}x\n• Parcela estimada: ${formatBRL(parcela)}`,
  );

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      {/* Hero */}
      <section className="relative overflow-hidden border-b bg-brand text-brand-foreground">
        <div className="absolute inset-0 opacity-[0.07]" aria-hidden>
          <div className="absolute -right-24 top-0 h-80 w-80 rounded-full bg-accent-blue blur-3xl" />
          <div className="absolute -left-10 bottom-0 h-96 w-96 rounded-full bg-accent-blue blur-3xl" />
        </div>
        <div className="mx-auto max-w-7xl px-4 py-20 md:px-8 md:py-28">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent-blue">
            Financiamento
          </p>
          <h1 className="mt-3 max-w-3xl text-4xl font-extrabold tracking-tight md:text-6xl">
            Seu próximo carro, em parcelas que cabem no bolso.
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/70 md:text-lg">
            Trabalhamos com as principais financeiras do país para oferecer a melhor
            condição para você. Simule abaixo ou fale com um especialista agora.
          </p>
        </div>
      </section>

      {/* Simulador */}
      <section className="mx-auto max-w-7xl px-4 py-16 md:px-8 md:py-20">
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-3xl border bg-card p-8 md:p-10">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent-blue/10 text-accent-blue">
                <Calculator className="h-5 w-5" strokeWidth={1.5} />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-brand/60">
                  Simulador
                </p>
                <h2 className="text-xl font-bold text-brand">Calcule sua parcela</h2>
              </div>
            </div>

            <div className="mt-8 space-y-7">
              <FieldRange
                label="Valor do veículo"
                value={valor}
                min={20000}
                max={300000}
                step={1000}
                onChange={setValor}
                format={formatBRL}
              />
              <FieldRange
                label="Entrada"
                value={entrada}
                min={0}
                max={Math.max(valor - 1000, 0)}
                step={1000}
                onChange={setEntrada}
                format={formatBRL}
              />
              <div>
                <div className="mb-3 flex items-baseline justify-between">
                  <label className="text-xs font-semibold uppercase tracking-widest text-brand/70">
                    Parcelas
                  </label>
                  <span className="text-sm font-bold text-brand">{parcelas}x</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {[24, 36, 48, 60].map((p) => (
                    <button
                      key={p}
                      type="button"
                      onClick={() => setParcelas(p)}
                      className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${
                        parcelas === p
                          ? "border-accent-blue bg-accent-blue text-white"
                          : "border-border bg-background text-brand hover:border-accent-blue"
                      }`}
                    >
                      {p}x
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-between rounded-3xl bg-brand p-8 text-brand-foreground md:p-10">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-accent-blue">
                Parcela estimada
              </p>
              <p className="mt-3 text-5xl font-extrabold tracking-tight md:text-6xl">
                {formatBRL(parcela)}
                <span className="ml-2 text-base font-medium text-white/60">/mês</span>
              </p>
              <p className="mt-2 text-xs text-white/50">
                * Valores estimados. Sujeito à aprovação de crédito.
              </p>

              <dl className="mt-8 space-y-3 border-t border-white/10 pt-6 text-sm">
                <Row k="Valor financiado" v={formatBRL(financiado)} />
                <Row k="Entrada" v={formatBRL(entrada)} />
                <Row k="Total a pagar" v={formatBRL(total)} />
              </dl>
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href={`https://wa.me/5534999999999?text=${whatsappMsg}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-accent-blue px-6 py-3.5 text-sm font-semibold text-white transition hover:brightness-110"
              >
                <WhatsAppIcon className="h-4 w-4" /> Enviar simulação
              </a>
              <Link
                to="/estoque"
                className="inline-flex flex-1 items-center justify-center rounded-full border border-white/20 bg-white/5 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                Ver estoque
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Benefícios */}
      <section className="border-y bg-secondary/40">
        <div className="mx-auto max-w-7xl px-4 py-20 md:px-8">
          <div className="mb-12 max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent-blue">
              Por que financiar com a WebCar
            </p>
            <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-brand md:text-4xl">
              Vantagens reais.
            </h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {beneficios.map((b) => (
              <div key={b.title} className="rounded-2xl border bg-card p-7 transition hover:-translate-y-1 hover:shadow-lg">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent-blue/10 text-accent-blue">
                  <b.icon className="h-6 w-6" strokeWidth={1.5} />
                </div>
                <h3 className="mt-5 text-lg font-bold text-brand">{b.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{b.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Como funciona */}
      <section className="mx-auto max-w-7xl px-4 py-20 md:px-8">
        <div className="mb-12 max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent-blue">
            Como funciona
          </p>
          <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-brand md:text-4xl">
            Em 4 passos simples.
          </h2>
        </div>
        <ol className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {passos.map((p) => (
            <li key={p.n} className="relative rounded-2xl border bg-card p-7">
              <span className="text-sm font-extrabold tracking-widest text-accent-blue">
                {p.n}
              </span>
              <h3 className="mt-3 text-lg font-bold text-brand">{p.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.text}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* Documentos */}
      <section className="mx-auto max-w-7xl px-4 pb-20 md:px-8">
        <div className="grid gap-8 rounded-3xl border bg-card p-8 md:grid-cols-2 md:p-12">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent-blue">
              Documentação
            </p>
            <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-brand">
              O que você precisa.
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              Reúna os documentos abaixo para agilizar a análise. Para autônomos e
              empresas a lista pode variar — fale com a gente.
            </p>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noreferrer"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-brand px-5 py-3 text-sm font-semibold text-brand-foreground transition hover:brightness-110"
            >
              <WhatsAppIcon className="h-4 w-4" /> Tirar dúvidas
            </a>
          </div>
          <ul className="grid gap-3 text-sm text-brand">
            {[
              "RG e CPF",
              "CNH (se possuir)",
              "Comprovante de residência atualizado",
              "Comprovante de renda (3 últimos)",
              "Referências pessoais",
              "Dados bancários",
            ].map((d) => (
              <li key={d} className="flex items-center gap-3 rounded-xl border bg-background px-4 py-3">
                <CheckCircle2 className="h-5 w-5 text-accent-blue" strokeWidth={1.5} />
                <span>{d}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex items-center justify-between text-white/80">
      <dt className="text-white/60">{k}</dt>
      <dd className="font-semibold text-white">{v}</dd>
    </div>
  );
}

function FieldRange({
  label,
  value,
  min,
  max,
  step,
  onChange,
  format,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (n: number) => void;
  format: (n: number) => string;
}) {
  return (
    <div>
      <div className="mb-3 flex items-baseline justify-between">
        <label className="text-xs font-semibold uppercase tracking-widest text-brand/70">
          {label}
        </label>
        <span className="text-sm font-bold text-brand">{format(value)}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="h-2 w-full cursor-pointer appearance-none rounded-full bg-secondary accent-[var(--accent-blue)]"
      />
      <div className="mt-1 flex justify-between text-[11px] text-muted-foreground">
        <span>{format(min)}</span>
        <span>{format(max)}</span>
      </div>
    </div>
  );
}
