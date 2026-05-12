import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Car, Send, CheckCircle2 } from "lucide-react";
import { SiteHeader } from "@/components/site/header";
import { SiteFooter } from "@/components/site/footer";
import { WhatsAppIcon, waLink } from "@/components/site/whatsapp-icon";

export const Route = createFileRoute("/vender-veiculo")({
  head: () => ({
    meta: [
      { title: "Vender meu Veículo — WebCar Patos de Minas" },
      { name: "description", content: "Cadastre seu carro para avaliação. Análise rápida, pagamento à vista ou troca." },
      { property: "og:title", content: "Vender meu Veículo — WebCar" },
    ],
  }),
  component: VenderVeiculoPage,
});

const FIELDS = [
  { id: "marca", label: "Marca", type: "text", required: true },
  { id: "modelo", label: "Modelo", type: "text", required: true },
  { id: "ano", label: "Ano", type: "text", placeholder: "Ex: 2022", required: true },
  { id: "km", label: "Quilometragem", type: "text", placeholder: "Ex: 35.000", required: true },
  { id: "cor", label: "Cor", type: "text", required: false },
  { id: "combustivel", label: "Combustível", type: "select", options: ["Flex", "Diesel", "Gasolina", "Elétrico", "Híbrido"], required: true },
  { id: "cambio", label: "Câmbio", type: "select", options: ["Automático", "Manual"], required: true },
  { id: "preco", label: "Quanto quer pelo carro?", type: "text", placeholder: "R$ 0,00", required: false },
  { id: "financiado", label: "Está financiado?", type: "select", options: ["Não", "Sim"], required: true },
  { id: "nome", label: "Seu nome", type: "text", required: true },
  { id: "telefone", label: "Telefone / WhatsApp", type: "tel", placeholder: "(34) 9 9999-9999", required: true },
  { id: "email", label: "E-mail", type: "email", required: false },
  { id: "observacoes", label: "Observações (opcional)", type: "textarea", required: false },
] as const;

const BENEFITS = [
  "Avaliação justa e transparente",
  "Pagamento à vista ou em troca",
  "Documentação resolvida pela gente",
  "Sem burocracia",
];

function VenderVeiculoPage() {
  const [form, setForm] = useState<Record<string, string>>({});

  const update = (id: string, v: string) => setForm((prev) => ({ ...prev, [id]: v }));

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const lines = ["🚗 *VENDER MEU VEÍCULO — WebCar*", ""];
    FIELDS.forEach((f) => {
      const v = form[f.id];
      if (v && v.trim()) {
        lines.push(`• ${f.label}: ${v}`);
      }
    });
    window.open(waLink(lines.join("\n")), "_blank");
  };

  return (
    <div className="min-h-screen bg-background page-transition">
      <SiteHeader />
      <div className="mx-auto max-w-5xl px-4 py-14 md:px-8 md:py-20">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_1.4fr]">
          {/* Coluna esquerda: pitch */}
          <div className="animate-fade-up">
            <div className="inline-flex items-center gap-2 rounded-full bg-secondary px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-accent-blue">
              <Car className="h-3.5 w-3.5" /> Avaliação rápida
            </div>
            <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-brand md:text-5xl">
              Vender meu veículo.
            </h1>
            <p className="mt-4 text-base text-muted-foreground">
              Preencha os dados e a gente faz uma proposta pelo WhatsApp em poucas horas.
              Pagamos à vista ou aceitamos como parte de pagamento em outro carro do nosso estoque.
            </p>

            <ul className="mt-8 space-y-3">
              {BENEFITS.map((b) => (
                <li key={b} className="flex items-start gap-3 text-sm text-brand">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-accent-blue" strokeWidth={2} />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Coluna direita: formulário */}
          <form
            onSubmit={submit}
            className="animate-fade-up rounded-2xl border bg-card p-6 md:p-8"
            style={{ animationDelay: "100ms" }}
          >
            <h2 className="mb-6 text-lg font-bold text-brand">Dados do veículo e contato</h2>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {FIELDS.map((field) => (
                <div key={field.id} className={field.type === "textarea" ? "md:col-span-2" : ""}>
                  <label htmlFor={field.id} className="mb-1.5 block text-xs font-semibold uppercase tracking-widest text-brand/70">
                    {field.label}
                    {field.required && <span className="ml-1 text-accent-blue">*</span>}
                  </label>
                  {field.type === "select" ? (
                    <select
                      id={field.id}
                      required={field.required}
                      value={form[field.id] || ""}
                      onChange={(e) => update(field.id, e.target.value)}
                      className="w-full rounded-lg border bg-background px-4 py-3 text-sm text-brand outline-none focus:border-accent-blue"
                    >
                      <option value="">Selecione…</option>
                      {"options" in field &&
                        field.options?.map((o) => (
                          <option key={o} value={o}>
                            {o}
                          </option>
                        ))}
                    </select>
                  ) : field.type === "textarea" ? (
                    <textarea
                      id={field.id}
                      required={field.required}
                      rows={3}
                      value={form[field.id] || ""}
                      onChange={(e) => update(field.id, e.target.value)}
                      className="w-full resize-none rounded-lg border bg-background px-4 py-3 text-sm text-brand outline-none focus:border-accent-blue"
                    />
                  ) : (
                    <input
                      id={field.id}
                      type={field.type}
                      required={field.required}
                      placeholder={"placeholder" in field ? field.placeholder : undefined}
                      value={form[field.id] || ""}
                      onChange={(e) => update(field.id, e.target.value)}
                      className="w-full rounded-lg border bg-background px-4 py-3 text-sm text-brand outline-none focus:border-accent-blue"
                    />
                  )}
                </div>
              ))}
            </div>

            <button
              type="submit"
              className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#25D366] px-7 py-3.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[#1da851]"
            >
              <WhatsAppIcon className="h-4 w-4" />
              Enviar pra avaliação
              <Send className="h-4 w-4" />
            </button>
          </form>
        </div>
      </div>
      <SiteFooter />
    </div>
  );
}
