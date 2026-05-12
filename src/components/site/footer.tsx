import { Link } from "@tanstack/react-router";
import { Instagram, Facebook, Youtube, MapPin } from "lucide-react";
import logo from "@/assets/webcar-logo-color.webp";

export function SiteFooter() {
  return (
    <footer className="border-t border-[#E5E7EB] bg-white text-[#0A0A0A]">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-4 py-14 md:grid-cols-4 md:px-8">
        <div>
          <img src={logo} alt="WebCar" className="h-10 w-auto" />
          <p className="mt-4 max-w-xs text-sm text-[#6B7280]">
            Seminovos selecionados em Patos de Minas. Procedência, garantia e atendimento de verdade.
          </p>
        </div>
        <div>
          <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-[#6B7280]">Sobre</p>
          <ul className="space-y-2 text-sm text-[#0A0A0A]/80">
            <li><Link to="/sobre" className="hover:text-[#0A0A0A]">Quem somos</Link></li>
            <li><Link to="/financiamento" className="hover:text-[#0A0A0A]">Financiamento</Link></li>
          </ul>
        </div>
        <div>
          <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-[#6B7280]">Estoque</p>
          <ul className="space-y-2 text-sm text-[#0A0A0A]/80">
            <li><Link to="/estoque" className="hover:text-[#0A0A0A]">Todos os carros</Link></li>
            <li><Link to="/estoque" className="hover:text-[#0A0A0A]">Destaques</Link></li>
          </ul>
        </div>
        <div>
          <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-[#6B7280]">Contato</p>
          <ul className="space-y-2 text-sm text-[#0A0A0A]/80">
            <li className="flex items-start gap-2">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0" />
              <span>Patos de Minas / MG</span>
            </li>
            <li>(34) 99999-9999</li>
          </ul>
          <div className="mt-4 flex gap-3">
            <a href="https://www.instagram.com/webcarmg" target="_blank" rel="noreferrer" aria-label="Instagram" className="rounded-full border border-[#E5E7EB] p-2 text-[#0A0A0A] hover:border-[#0A0A0A]"><Instagram className="h-4 w-4" /></a>
            <a href="#" aria-label="Facebook" className="rounded-full border border-[#E5E7EB] p-2 text-[#0A0A0A] hover:border-[#0A0A0A]"><Facebook className="h-4 w-4" /></a>
            <a href="#" aria-label="YouTube" className="rounded-full border border-[#E5E7EB] p-2 text-[#0A0A0A] hover:border-[#0A0A0A]"><Youtube className="h-4 w-4" /></a>
          </div>
        </div>
      </div>
      <div className="border-t border-[#E5E7EB]">
        <div className="mx-auto max-w-7xl px-4 py-5 text-xs text-[#6B7280] md:px-8">
          © {new Date().getFullYear()} WebCar — Patos de Minas/MG
        </div>
      </div>
    </footer>
  );
}