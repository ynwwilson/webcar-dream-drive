import { Link } from "@tanstack/react-router";
import { Instagram, Facebook, Youtube, MapPin } from "lucide-react";
import logo from "@/assets/webcar-logo.png";

export function SiteFooter() {
  return (
    <footer className="bg-brand text-white">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-4 py-14 md:grid-cols-4 md:px-8">
        <div>
          <img src={logo} alt="WebCar" className="h-10 w-auto brightness-0 invert" />
          <p className="mt-4 max-w-xs text-sm text-white/70">
            Seminovos selecionados em Patos de Minas. Procedência, garantia e atendimento de verdade.
          </p>
        </div>
        <div>
          <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-white/50">Sobre</p>
          <ul className="space-y-2 text-sm text-white/80">
            <li><Link to="/sobre" className="hover:text-white">Quem somos</Link></li>
            <li><Link to="/financiamento" className="hover:text-white">Financiamento</Link></li>
          </ul>
        </div>
        <div>
          <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-white/50">Estoque</p>
          <ul className="space-y-2 text-sm text-white/80">
            <li><Link to="/estoque" className="hover:text-white">Todos os carros</Link></li>
            <li><Link to="/estoque" className="hover:text-white">Destaques</Link></li>
          </ul>
        </div>
        <div>
          <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-white/50">Contato</p>
          <ul className="space-y-2 text-sm text-white/80">
            <li className="flex items-start gap-2">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0" />
              <span>Patos de Minas / MG</span>
            </li>
            <li>(34) 99999-9999</li>
          </ul>
          <div className="mt-4 flex gap-3">
            <a href="https://www.instagram.com/webcarmg" target="_blank" rel="noreferrer" aria-label="Instagram" className="rounded-full bg-white/10 p-2 hover:bg-white/20"><Instagram className="h-4 w-4" /></a>
            <a href="#" aria-label="Facebook" className="rounded-full bg-white/10 p-2 hover:bg-white/20"><Facebook className="h-4 w-4" /></a>
            <a href="#" aria-label="YouTube" className="rounded-full bg-white/10 p-2 hover:bg-white/20"><Youtube className="h-4 w-4" /></a>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-4 py-5 text-xs text-white/50 md:px-8">
          © {new Date().getFullYear()} WebCar — Patos de Minas/MG
        </div>
      </div>
    </footer>
  );
}