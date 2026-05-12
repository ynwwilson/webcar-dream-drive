import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { FileText, Send, User, MapPin, Briefcase, Users2, Car } from "lucide-react";
import { SiteHeader } from "@/components/site/header";
import { SiteFooter } from "@/components/site/footer";
import { WhatsAppIcon, waLink } from "@/components/site/whatsapp-icon";

export const Route = createFileRoute("/ficha-cadastral")({
  head: () => ({
    meta: [
      { title: "Ficha Cadastral — WebCar Patos de Minas" },
      { name: "description", content: "Preencha sua ficha cadastral pra análise de crédito. Resposta rápida pelo WhatsApp." },
      { property: "og:title", content: "Ficha Cadastral — WebCar" },
    ],
  }),
  component: FichaCadastralPage,
});

type FormState = Record<string, string>;

const SECTIONS = [
  {
    icon: User,
    title: "Dados pessoais",
    fields: [
      { id: "nome", label: "Nome completo", type: "text", required: true },
      { id: "cpf", label: "CPF", type: "text", placeholder: "000.000.000-00", required: true },
      { id: "rg", label: "RG", type: "text", required: true },
      { id: "nascimento", label: "Data de nascimento", type: "date", required: true },
      { id: "celular", label: "Celular / WhatsApp", type: "tel", placeholder: "(34) 9 9999-9999", required: true },
      { id: "email", label: "E-mail", type: "email", required: true },
      { id: "cnh", label: "Possui CNH?", type: "select", options: ["Sim", "Não"], required: true },
      { id: "restricao", label: "Possui alguma restrição?", type: "select", options: ["Não", "Serasa / SPC", "Outro"], required: true },
      { id: "financiamento", label: "Já teve financiamento em seu nome?", type: "select", options: ["Não", "Sim"], required: true },
    ],
  },
  {
    icon: MapPin,
    title: "Endereço",
    fields: [
      { id: "cep", label: "CEP", type: "text", placeholder: "00000-000", required: true },
      { id: "rua", label: "Rua", type: "text", required: true },
      { id: "numero", label: "Número", type: "text", required: true },
      { id: "bairro", label: "Bairro", type: "text", required: true },
      { id: "cidade", label: "Cidade", type: "text", required: true },
      { id: "complemento", label: "Complemento (opcional)", type: "text", required: false },
    ],
  },
  {
    icon: Briefcase,
    title: "Dados profissionais",
    fields: [
      { id: "profissao", label: "Profissão", type: "text", required: true },
      { id: "cargo", label: "Cargo", type: "text", required: true },
      { id: "renda", label: "Renda mensal", type: "text", placeholder: "R$ 0,00", required: true },
    ],
  },
  {
    icon: Users2,
    title: "Referências bancárias",
    fields: [
      { id: "referencia_pessoal", label: "Referência pessoal", type: "text", required: false },
      { id: "referencia_telefone", label: "Telefone da referência", type: "tel", required: false },
      { id: "banco", label: "Banco", type: "text", required: false },
      { id: "agencia", label: "Agência", type: "text", required: false },
      { id: "conta", label: "Conta corrente", type: "text", required: false },
      { id: "gerente", label: "Nome do seu gerente", type: "text", required: false },
    ],
  },
  {
    icon: Car,
    title: "Veículo de interesse",
    fields: [
      { id: "marca_interesse", label: "Marca", type: "text", required: true },
      { id: "modelo_interesse", label: "Modelo", type: "text", required: true },
      { id: "ano_interesse", label: "Ano", type: "text", required: true },
      { id: "combustivel_interesse", label: "Combustível", type: "select", options: ["Flex", "Diesel", "Gasolina", "Elétrico", "Híbrido"], required: true },
      { id: "entrada", label: "Valor de entrada disponível", type: "text", placeholder: "R$ 0,00", required: true },
    ],
  },
] as const;

function FichaCadastralPage() {
  const [form, setForm] = useState<FormState>({});

  const updateField = (id: string, value: string) => {
    setForm((prev) => ({ ...prev, [id]: value }));
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const lines: string[] = ["📋 *FICHA CADASTRAL — WebCar*", ""];
    SECTIONS.forEach((section) => {
      lines.push(`*${section.title.toUpperCase()}*`);
      section.fields.forEach((field) => {
        const value = form[field.id];
        if (value && value.trim() !== "") {
          lines.push(`• ${field.label}: ${value}`);
        }
      });
      lines.push("");
    });
    window.open(waLink(lines.join("\n")), "_blank");
  };

  return (
    <div className="min-h-screen bg-background page-transition">
      <SiteHeader />
      <div className="mx-auto max-w-4xl px-4 py-14 md:px-8 md:py-20">
        {/* Header */}
        <div className="mb-12 animate-fade-up">
          <div className="inline-flex items-center gap-2 rounded-full bg-secondary px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-accent-blue">
            <FileText className="h-3.5 w-3.5" /> Pré-aprovação rápida
          </div>
          <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-brand md:text-5xl">
            Ficha cadastral
          </h1>
          <p className="mt-4 max-w-2xl text-base text-muted-foreground">
            Preencha seus dados pra adiantar a análise de crédito. Quanto mais completo, mais rápido a gente
            consegue te dar uma resposta. Suas informações vão direto pro WhatsApp do nosso time.
          </p>
        </div>

        <form onSubmit={submit} className="space-y-6">
          {SECTIONS.map((section, idx) => {
            const Icon = section.icon;
            return (
              <div
                key={section.title}
                className="animate-fade-up rounded-2xl border bg-card p-6 md:p-8"
                style={{ animationDelay: `${(idx + 1) * 80}ms` }}
              >
                <div className="mb-6 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary text-accent-blue">
                    <Icon className="h-5 w-5" strokeWidth={1.75} />
                  </div>
                  <h2 className="text-lg font-bold text-brand">{section.title}</h2>
                </div>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  {section.fields.map((field) => (
                    <FormField
                      key={field.id}
                      field={field}
                      value={form[field.id] || ""}
                      onChange={(v) => updateField(field.id, v)}
                    />
                  ))}
                </div>
              </div>
            );
          })}

          {/* Botão */}
          <div
            className="animate-fade-up sticky bottom-4 z-10 rounded-2xl border bg-white p-5 shadow-lg"
            style={{ animationDelay: `${(SECTIONS.length + 1) * 80}ms` }}
          >
            <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-between">
              <p className="text-sm text-muted-foreground">
                Seus dados vão por WhatsApp. Não enviamos pra terceiros sem autorização.
              </p>
              <button
                type="submit"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#25D366] px-7 py-3.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[#1da851]"
              >
                <WhatsAppIcon className="h-4 w-4" />
                Enviar via WhatsApp
                <Send className="h-4 w-4" />
              </button>
            </div>
          </div>
        </form>
      </div>
      <SiteFooter />
    </div>
  );
}

type FieldDef = {
  id: string;
  label: string;
  type: string;
  placeholder?: string;
  required?: boolean;
  options?: readonly string[];
};

function FormField({ field, value, onChange }: { field: FieldDef; value: string; onChange: (v: string) => void }) {
  const baseClass =
    "w-full rounded-lg border bg-background px-4 py-3 text-sm text-brand outline-none transition-colors focus:border-accent-blue";

  return (
    <div>
      <label htmlFor={field.id} className="mb-1.5 block text-xs font-semibold uppercase tracking-widest text-brand/70">
        {field.label}
        {field.required && <span className="ml-1 text-accent-blue">*</span>}
      </label>
      {field.type === "select" ? (
        <select
          id={field.id}
          required={field.required}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={baseClass}
        >
          <option value="">Selecione…</option>
          {field.options?.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      ) : (
        <input
          id={field.id}
          type={field.type}
          required={field.required}
          placeholder={field.placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={baseClass}
        />
      )}
    </div>
  );
}
