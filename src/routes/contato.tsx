import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { MapPin, Phone, Clock, Mail, Instagram, Facebook } from "lucide-react";
import { SiteHeader } from "@/components/site/header";
import { SiteFooter } from "@/components/site/footer";
import { WhatsAppIcon, waLink } from "@/components/site/whatsapp-icon";
import { CONTACT } from "@/data/contact";

export const Route = createFileRoute("/contato")({
  head: () => ({
    meta: [
      { title: "Contato — WebCar Patos de Minas" },
      { name: "description", content: "Fale com a WebCar pelo WhatsApp ou venha nos visitar em Patos de Minas/MG." },
      { property: "og:title", content: "Contato — WebCar" },
      { property: "og:description", content: "Endereço, telefone e horário de funcionamento." },
    ],
  }),
  component: ContatoPage,
});

function ContatoPage() {
  const [form, setForm] = useState({ nome: "", telefone: "", email: "", mensagem: "" });
  const [mapLoaded, setMapLoaded] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = `Olá, sou ${form.nome} (${form.telefone}). ${form.mensagem}`;
    window.open(waLink(text), "_blank");
  };

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <div className="mx-auto max-w-7xl px-4 py-14 md:px-8 md:py-20">
        <div className="mb-12 max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-widest text-accent-blue">Contato</p>
          <h1 className="mt-2 text-4xl font-extrabold tracking-tight text-brand md:text-5xl">Vamos conversar.</h1>
          <p className="mt-4 text-base text-muted-foreground">Envie sua mensagem e respondemos no WhatsApp em poucos minutos.</p>
        </div>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          <form onSubmit={submit} className="space-y-5 rounded-2xl border bg-card p-8">
            {[
              { id: "nome", label: "Nome", type: "text" },
              { id: "telefone", label: "Telefone", type: "tel" },
              { id: "email", label: "Email", type: "email" },
            ].map((f) => (
              <div key={f.id}>
                <label htmlFor={f.id} className="mb-1.5 block text-xs font-semibold uppercase tracking-widest text-brand/70">{f.label}</label>
                <input
                  id={f.id}
                  type={f.type}
                  required
                  value={form[f.id as keyof typeof form]}
                  onChange={(e) => setForm({ ...form, [f.id]: e.target.value })}
                  className="w-full rounded-lg border bg-background px-4 py-3 text-sm text-brand outline-none focus:border-accent-blue"
                />
              </div>
            ))}
            <div>
              <label htmlFor="mensagem" className="mb-1.5 block text-xs font-semibold uppercase tracking-widest text-brand/70">Mensagem</label>
              <textarea
                id="mensagem"
                required
                rows={4}
                value={form.mensagem}
                onChange={(e) => setForm({ ...form, mensagem: e.target.value })}
                className="w-full resize-none rounded-lg border bg-background px-4 py-3 text-sm text-brand outline-none focus:border-accent-blue"
              />
            </div>
            <button type="submit" className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#25D366] px-6 py-3.5 text-sm font-semibold text-white hover:bg-[#1da851]">
              <WhatsAppIcon className="h-4 w-4" /> Enviar via WhatsApp
            </button>
          </form>

          <div className="space-y-6">
            <div className="rounded-2xl border bg-card p-8">
              <ul className="space-y-5 text-sm">
                <li className="flex gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-secondary text-accent-blue">
                    <MapPin className="h-5 w-5" strokeWidth={1.5} />
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-widest text-brand/60">Endereço</p>
                    <p className="mt-1 text-brand">
                      {CONTACT.address.street}<br />
                      {CONTACT.address.neighborhood} — {CONTACT.address.city}/{CONTACT.address.state}<br />
                      CEP {CONTACT.address.zip}
                    </p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-secondary text-accent-blue">
                    <Phone className="h-5 w-5" strokeWidth={1.5} />
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-widest text-brand/60">Telefone & WhatsApp</p>
                    <a href={`tel:+55${CONTACT.phone.raw}`} className="mt-1 block text-brand hover:underline">
                      {CONTACT.phone.display}
                    </a>
                  </div>
                </li>
                <li className="flex gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-secondary text-accent-blue">
                    <Mail className="h-5 w-5" strokeWidth={1.5} />
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-widest text-brand/60">Email</p>
                    <a href={`mailto:${CONTACT.email}`} className="mt-1 block text-brand hover:underline">
                      {CONTACT.email}
                    </a>
                  </div>
                </li>
                <li className="flex gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-secondary text-accent-blue">
                    <Clock className="h-5 w-5" strokeWidth={1.5} />
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-widest text-brand/60">Horário</p>
                    <p className="mt-1 text-brand">
                      {CONTACT.hours.weekdays}<br />
                      {CONTACT.hours.saturday}<br />
                      {CONTACT.hours.sunday}
                    </p>
                  </div>
                </li>
              </ul>
              <div className="mt-6 flex gap-3 border-t pt-5">
                <a
                  href={CONTACT.social.instagram.url}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Instagram"
                  className="inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-medium text-brand hover:border-brand/30"
                >
                  <Instagram className="h-4 w-4" /> {CONTACT.social.instagram.handle}
                </a>
                <a
                  href={CONTACT.social.facebook.url}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Facebook"
                  className="inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-medium text-brand hover:border-brand/30"
                >
                  <Facebook className="h-4 w-4" /> Facebook
                </a>
              </div>
            </div>
            <div className="overflow-hidden rounded-2xl border">
              {mapLoaded ? (
                <iframe
                  title="Mapa WebCar Patos de Minas"
                  src={CONTACT.mapsEmbed}
                  width="100%"
                  height="280"
                  style={{ border: 0 }}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              ) : (
                <button
                  type="button"
                  onClick={() => setMapLoaded(true)}
                  className="flex h-[280px] w-full items-center justify-center bg-secondary text-sm font-semibold text-brand hover:bg-secondary/70"
                >
                  <MapPin className="mr-2 h-5 w-5" /> Carregar mapa
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
      <SiteFooter />
    </div>
  );
}
