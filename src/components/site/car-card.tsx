import { Link } from "@tanstack/react-router";
import type { Car } from "@/data/cars";
import { formatBRL, formatKM } from "@/data/cars";

export function CarCard({ car }: { car: Car }) {
  return (
    <Link
      to="/veiculo/$id"
      params={{ id: car.id }}
      className="group block overflow-hidden rounded-2xl border bg-card transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_40px_-20px_rgba(10,37,64,0.25)]"
    >
      <div className="relative aspect-video overflow-hidden bg-muted">
        <img
          src={car.image}
          alt={car.fullName}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="p-5">
        <p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
          {car.brand}
        </p>
        <h3 className="mt-1 text-lg font-bold text-brand">{car.model}</h3>
        <p className="mt-1 text-sm text-muted-foreground">
          {car.year} · {formatKM(car.km)}
        </p>
        <div className="mt-4 flex items-end justify-between gap-3">
          <p className="text-xl font-extrabold text-brand">{formatBRL(car.price)}</p>
          <span className="text-sm font-semibold text-accent-blue group-hover:underline">
            Ver detalhes →
          </span>
        </div>
      </div>
    </Link>
  );
}