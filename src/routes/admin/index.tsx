import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { Badge } from "@/components/ui/badge";
import { adminStats } from "@/lib/market";
import { LISTING_LABEL, OFFER_TYPE_LABEL, STATUS_LABEL } from "@/lib/format";

export const Route = createFileRoute("/admin/")({ component: AdminHome });

const COLORS = [
  "var(--color-accent)",
  "var(--color-subtle)",
  "var(--color-success)",
  "var(--color-warn)",
];

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

  return (
    <div>
      <h1 className="font-display text-3xl font-semibold">Panel</h1>
      <p className="mt-1 text-sm text-muted">Actividad del marketplace.</p>
      <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {cards.map((c) => (
          <div key={c.label} className="rounded-xl border border-border bg-surface p-5">
            <p className="text-xs uppercase tracking-wider text-subtle">{c.label}</p>
            <p className="mt-2 font-display text-3xl font-semibold tabular-nums">{c.value}</p>
          </div>
        ))}
      </div>
      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <div className="rounded-xl border border-border bg-surface p-5">
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
        <div className="rounded-xl border border-border bg-surface p-5">
          <h2 className="font-display text-lg font-semibold">Ofertas recientes</h2>
          <ul className="mt-4 grid gap-3">
            {data.recentOffers.length === 0 && (
              <li className="text-sm text-muted">Todavía no hay ofertas.</li>
            )}
            {data.recentOffers.map((o) => (
              <li key={o.id} className="flex items-center justify-between gap-3 text-sm">
                <span className="truncate">{o.vehicleTitle}</span>
                <span className="flex shrink-0 gap-2">
                  <Badge>{OFFER_TYPE_LABEL[o.offerType]}</Badge>
                  <Badge tone={o.status === "pendiente" ? "warn" : "neutral"}>
                    {STATUS_LABEL[o.status] ?? o.status}
                  </Badge>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
