import { Link } from "@tanstack/react-router";
import { Gauge, Fuel, Settings2 } from "lucide-react";
import type { Car } from "@/data/cars";
import { formatBRL, formatKM } from "@/data/cars";

export function CarCard({ car }: { car: Car }) {
  return (
    <Link
      to="/veiculo/$id"
      params={{ id: car.id }}
      className="group block cursor-pointer overflow-hidden rounded-2xl border border-white/10 bg-[#0A0A0A] transition-all duration-300 hover:border-white/30"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-black">
        <img
          src={car.image}
          alt={car.fullName}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
      </div>
      <div className="p-6">
        <p className="text-[11px] font-medium uppercase tracking-[0.15em] text-white/50">
          {car.brand}
        </p>
        <h3 className="mt-1.5 text-xl font-semibold tracking-tight text-white">{car.model}</h3>
        <p className="mt-1 text-sm text-white/50">{car.year}</p>

        <div className="my-5 h-px w-full bg-white/10" />

        <div className="flex items-center gap-4 text-[12px] text-white/60">
          <span className="inline-flex items-center gap-1.5"><Gauge className="h-3.5 w-3.5" strokeWidth={1.5} />{formatKM(car.km)}</span>
          <span className="inline-flex items-center gap-1.5"><Fuel className="h-3.5 w-3.5" strokeWidth={1.5} />{car.fuel}</span>
          <span className="inline-flex items-center gap-1.5"><Settings2 className="h-3.5 w-3.5" strokeWidth={1.5} />{car.transmission === "Automático" ? "Aut." : "Man."}</span>
        </div>

        <p className="mt-6 text-2xl font-semibold tracking-tight text-white">{formatBRL(car.price)}</p>
      </div>
    </Link>
  );
}