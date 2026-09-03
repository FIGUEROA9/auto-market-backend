import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Bar, BarChart, Cell, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Badge } from "@/components/ui/badge";
import { adminStats } from "@/lib/market";
import { LISTING_LABEL, OFFER_TYPE_LABEL, STATUS_LABEL, formatCop } from "@/lib/format";

export const Route = createFileRoute("/admin/")({ component: AdminHome });

const COLORS = ["var(--color-accent)", "var(--color-subtle)", "var(--color-success)", "var(--color-warn)"];

function AdminHome() {
  const [data, setData] = useState<Awaited<ReturnType<typeof adminStats>> | null>(null);

  useEffect(() => {
    adminStats()
      .then(setData)
      .catch(() => setData(null));
  }, []);

  if (!data) {
    return <div className="h-48 animate-pulse rounded-xl bg-surface" />;
  }

  const cards = [
    { label: "Usuarios", value: data.users },
    { label: "Anuncios", value: data.vehicles },
    { label: "Ofertas pendientes", value: data.pending },
    { label: "Contactos", value: data.contacts },
  ];

  const pie = data.byType.map((r) => ({
    name: LISTING_LABEL[r.listing_type] ?? r.listing_type,
    value: r.c,
  }));

  const bars = data.byCity.map((r) => ({ name: r.city, n: r.c }));

  return (
    <div>
      <h1 className="font-display text-3xl font-semibold">Panel</h1>
      <p className="mt-1 text-sm text-muted">Actividad del marketplace.</p>
      <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {cards.map((c) => (
          <div key={c.label} className="rounded-xl bg-surface p-5 shadow-[var(--shadow-border)]">
            <p className="text-xs uppercase tracking-wider text-subtle">{c.label}</p>
            <p className="mt-2 font-display text-3xl font-semibold tabular-nums">{c.value}</p>
          </div>
        ))}
      </div>
      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <div className="rounded-xl bg-surface p-5 shadow-[var(--shadow-border)]">
          <h2 className="font-display text-lg font-semibold">Por operación</h2>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={pie} dataKey="value" nameKey="name" innerRadius={50} outerRadius={80}>
                  {pie.map((_, i) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    background: "var(--color-surface)",
                    border: "1px solid var(--color-border)",
                    color: "var(--color-fg)",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="rounded-xl bg-surface p-5 shadow-[var(--shadow-border)]">
          <h2 className="font-display text-lg font-semibold">Activos por ciudad</h2>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={bars}>
                <XAxis dataKey="name" tick={{ fill: "var(--color-muted)", fontSize: 11 }} />
                <YAxis allowDecimals={false} tick={{ fill: "var(--color-muted)", fontSize: 11 }} />
                <Tooltip
                  contentStyle={{
                    background: "var(--color-surface)",
                    border: "1px solid var(--color-border)",
                    color: "var(--color-fg)",
                  }}
                />
                <Bar dataKey="n" fill="var(--color-accent)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      <div className="mt-8 rounded-xl bg-surface p-5 shadow-[var(--shadow-border)]">
        <h2 className="font-display text-lg font-semibold">Ofertas recientes</h2>
        <ul className="mt-4 grid gap-3">
          {data.recentOffers.length === 0 && (
            <li className="text-sm text-muted">Todavía no hay ofertas.</li>
          )}
          {data.recentOffers.map((o) => (
            <li key={o.id} className="flex flex-wrap items-center justify-between gap-2 text-sm">
              <span>
                {o.buyerName ?? "Usuario"} · {o.vehicleTitle} ·{" "}
                {OFFER_TYPE_LABEL[o.offerType]}
                {o.amount ? ` · ${formatCop(o.amount)}` : ""}
              </span>
              <Badge tone={o.status === "pendiente" ? "warn" : o.status === "aceptada" ? "success" : "neutral"}>
                {STATUS_LABEL[o.status]}
              </Badge>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
