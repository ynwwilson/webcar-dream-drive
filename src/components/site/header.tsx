import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { WhatsAppIcon, WHATSAPP_URL } from "./whatsapp-icon";
import logo from "@/assets/webcar-logo.png";

const links = [
  { to: "/estoque", label: "Estoque" },
  { to: "/financiamento", label: "Financiamento" },
  { to: "/sobre", label: "Sobre" },
  { to: "/contato", label: "Contato" },
] as const;

type Props = { transparentOnTop?: boolean };

export function SiteHeader({ transparentOnTop = false }: Props) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
    <header
      className={`fixed top-0 z-50 w-full transition-all duration-300 ${
        scrolled || !transparentOnTop
          ? "bg-black/90 backdrop-blur-md border-b border-white/10"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:px-8">
        <Link to="/" aria-label="WebCar" className="flex items-center">
          <img src={logo} alt="WebCar" className="h-9 w-auto brightness-0 invert md:h-10" />
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to as any}
              className="text-sm font-medium text-white/70 transition-colors hover:text-white"
              activeProps={{ className: "text-sm font-semibold text-white" }}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:block">
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-accent-blue px-5 py-2.5 text-sm font-semibold text-white transition-all hover:brightness-110"
          >
            <WhatsAppIcon className="h-4 w-4" />
            WhatsApp
          </a>
        </div>

        <button
          onClick={() => setOpen((v) => !v)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-md text-white md:hidden"
          aria-label="Abrir menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-white/10 bg-black md:hidden">
          <div className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-3">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to as any}
                onClick={() => setOpen(false)}
                className="rounded-md px-3 py-2.5 text-sm font-medium text-white/80 hover:bg-white/5"
              >
                {l.label}
              </Link>
            ))}
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noreferrer"
              className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-accent-blue px-5 py-3 text-sm font-semibold text-white"
            >
              <WhatsAppIcon className="h-4 w-4" />
              WhatsApp
            </a>
          </div>
        </div>
      )}
    </header>
    {!transparentOnTop && <div className="h-16" aria-hidden />}
    </>
  );
}