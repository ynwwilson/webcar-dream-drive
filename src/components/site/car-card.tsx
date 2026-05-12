import { Link } from "@tanstack/react-router";
import { Gauge, Fuel, Settings2 } from "lucide-react";
import type { Car } from "@/data/cars";
import { formatBRL, formatKM } from "@/data/cars";

export function CarCard({ car }: { car: Car }) {
  return (
    <Link
      to="/veiculo/$id"
      params={{ id: car.id }}
      className="group block cursor-pointer overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-[var(--accent-blue)]/40"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-[#FAFAFA]">
        <img
          src={car.image}
          alt={car.fullName}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
      </div>
      <div className="flex flex-col p-5">
        <p className="text-[11px] font-medium uppercase tracking-[0.15em] text-[#6B7280]">
          {car.brand}
        </p>
        <h3 className="mt-1.5 truncate text-lg font-semibold tracking-tight text-[#0A0A0A]">
          {car.model}
        </h3>
        <p className="mt-1 truncate text-sm text-[#6B7280]">
          {car.year} · {car.transmission}
        </p>

        <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 text-[12px] text-[#6B7280]">
          <span className="inline-flex items-center gap-1.5 whitespace-nowrap">
            <Gauge className="h-3.5 w-3.5 shrink-0" strokeWidth={1.5} />
            {formatKM(car.km)}
          </span>
          <span className="inline-flex items-center gap-1.5 whitespace-nowrap">
            <Fuel className="h-3.5 w-3.5 shrink-0" strokeWidth={1.5} />
            {car.fuel}
          </span>
        </div>

        <div className="mt-4 border-t border-border/70 pt-4">
          <p className="whitespace-nowrap text-[22px] font-bold tracking-tight text-[#0A0A0A]">
            {formatBRL(car.price)}
          </p>
        </div>
      </div>
    </Link>
  );
}