import { Link } from "@tanstack/react-router";
import { FileText, Car } from "lucide-react";

const FICHA_IMG =
  "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=1400&q=80";
const VENDER_IMG =
  "https://images.unsplash.com/photo-1560179707-f14e90ef3623?auto=format&fit=crop&w=1400&q=80";

export function ServicesBanner() {
  return (
    <section className="bg-white">
      <div className="grid grid-cols-1 md:grid-cols-2">
        <ServiceCard
          to="/ficha-cadastral"
          icon={<FileText className="h-9 w-9" strokeWidth={1.5} />}
          title="Ficha Cadastral"
          subtitle="Clique aqui e preencha sua ficha cadastral."
          bgImage={FICHA_IMG}
        />
        <ServiceCard
          to="/vender-veiculo"
          icon={<Car className="h-9 w-9" strokeWidth={1.5} />}
          title="Quer vender seu veículo?"
          subtitle="Cadastre seu veículo clicando aqui."
          bgImage={VENDER_IMG}
        />
      </div>
    </section>
  );
}

function ServiceCard({
  to,
  icon,
  title,
  subtitle,
  bgImage,
}: {
  to: string;
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  bgImage: string;
}) {
  return (
    <Link
      to={to}
      className="group relative block aspect-[16/9] overflow-hidden md:aspect-[16/9]"
    >
      {/* Imagem de fundo */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-105"
        style={{ backgroundImage: `url(${bgImage})` }}
      />
      {/* Overlay escuro */}
      <div className="absolute inset-0 bg-black/55 transition-colors duration-300 group-hover:bg-black/45" />

      {/* Conteúdo */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
        <div className="text-white">{icon}</div>
        <h3 className="mt-4 text-2xl font-bold tracking-tight text-white md:text-3xl">
          {title}
        </h3>
        <p className="mt-2 max-w-sm text-sm text-white/85 md:text-base">
          {subtitle}
        </p>
        <span className="mt-5 inline-flex items-center gap-2 rounded-full border border-white/40 px-5 py-2 text-xs font-semibold uppercase tracking-widest text-white transition-all group-hover:border-white group-hover:bg-white group-hover:text-black">
          Acessar
        </span>
      </div>
    </Link>
  );
}
