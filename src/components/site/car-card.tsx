import { Link } from "@tanstack/react-router";
import { Gauge, Fuel, Settings2 } from "lucide-react";
import type { Car } from "@/data/cars";
import { formatBRL, formatKM } from "@/data/cars";

export function CarCard({ car }: { car: Car }) {
  return (
    <Link
      to="/veiculo/$id"
      params={{ id: car.id }}
      className="group block cursor-pointer"
    >
      <div className="relative aspect-[16/9] overflow-hidden rounded-lg bg-[#FAFAFA]">
        <img
          src={car.image}
          alt={car.fullName}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
      </div>
      <div className="pt-5">
        <p className="text-[11px] font-medium uppercase tracking-[0.15em] text-[#6B7280]">
          {car.brand}
        </p>
        <h3 className="mt-1.5 text-xl font-semibold tracking-tight text-[#0A0A0A]">{car.model}</h3>
        <p className="mt-1 text-sm text-[#6B7280]">
          {car.year} · {formatKM(car.km)} · {car.transmission}
        </p>
        <div className="mt-4 flex items-end justify-between">
          <div className="flex items-center gap-3 text-[12px] text-[#6B7280]">
            <span className="inline-flex items-center gap-1.5"><Gauge className="h-3.5 w-3.5" strokeWidth={1.5} />{formatKM(car.km)}</span>
            <span className="inline-flex items-center gap-1.5"><Fuel className="h-3.5 w-3.5" strokeWidth={1.5} />{car.fuel}</span>
          </div>
          <p className="text-[22px] font-bold tracking-tight text-[#0A0A0A]">{formatBRL(car.price)}</p>
        </div>
      </div>
    </Link>
  );
}