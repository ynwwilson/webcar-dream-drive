import { useEffect, useRef, useState } from "react";
import { useNavigate } from "@tanstack/react-router";

const MAX = 200;
const REDLINE = 190;

export function AcceleratorButton({ to = "/estoque", label = "Ver carros" }: { to?: string; label?: string }) {
  const [speed, setSpeed] = useState(0);
  const [holding, setHolding] = useState(false);
  const [success, setSuccess] = useState(false);
  const rafRef = useRef<number | null>(null);
  const lastTs = useRef<number | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (success) return;
    const tick = (ts: number) => {
      if (lastTs.current == null) lastTs.current = ts;
      const dt = (ts - lastTs.current) / 1000;
      lastTs.current = ts;
      setSpeed((s) => {
        let next = s;
        if (holding) {
          // accel: easier early, harder near redline
          const remaining = MAX - s;
          const accelRate = s < REDLINE ? 90 : 25; // km/h per second
          next = Math.min(MAX, s + accelRate * dt);
          if (s >= REDLINE && next < MAX) {
            next = s + 8 * dt; // crawls
          }
          if (next >= MAX) next = MAX;
        } else {
          next = Math.max(0, s - 140 * dt);
        }
        return next;
      });
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      lastTs.current = null;
    };
  }, [holding, success]);

  useEffect(() => {
    if (speed >= MAX && !success) {
      setSuccess(true);
      setTimeout(() => navigate({ to: to as any }), 700);
    }
  }, [speed, success, navigate, to]);

  const start = (e: React.PointerEvent) => {
    e.preventDefault();
    (e.target as Element).setPointerCapture?.(e.pointerId);
    setHolding(true);
  };
  const stop = () => setHolding(false);

  const pct = (speed / MAX) * 100;
  const struggling = speed >= REDLINE && speed < MAX && !success;
  const displaySpeed = Math.floor(speed);

  return (
    <div
      onPointerDown={start}
      onPointerUp={stop}
      onPointerLeave={stop}
      onPointerCancel={stop}
      className={`accel-btn ${struggling ? "is-struggling" : ""} ${success ? "is-success" : ""}`}
      role="button"
      aria-label={label}
    >
      <div className="accel-fill" style={{ width: `${pct}%` }} />
      <div className="accel-text">
        <div className="accel-speed">
          {success ? label : displaySpeed}
          {!success && <span>KM/H</span>}
        </div>
        <div className="accel-label">
          {success ? "Abrindo…" : holding ? "Acelerando…" : "Segure para acelerar"}
        </div>
      </div>
    </div>
  );
}