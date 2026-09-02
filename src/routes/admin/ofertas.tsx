import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { OFFER_TYPE_LABEL, STATUS_LABEL, formatCop } from "@/lib/format";
import { adminListOffers, type Offer } from "@/lib/market";

export const Route = createFileRoute("/admin/ofertas")({ component: AdminOfertas });

function AdminOfertas() {
  const [rows, setRows] = useState<Offer[] | null>(null);

  useEffect(() => {
    adminListOffers()
      .then(setRows)
      .catch(() => setRows([]));
  }, []);

  return (
    <div>
      <h1 className="font-display text-3xl font-semibold">Ofertas</h1>
      <p className="mt-1 text-sm text-muted">Compra y permuta en curso.</p>
      <ul className="mt-6 grid gap-3">
        {(rows ?? []).map((o) => (
          <li key={o.id} className="rounded-xl border border-border bg-surface p-4">
            <div className="flex flex-wrap gap-2">
              <Badge>{OFFER_TYPE_LABEL[o.offerType]}</Badge>
              <Badge tone={o.status === "pendiente" ? "warn" : "neutral"}>
                {STATUS_LABEL[o.status] ?? o.status}
              </Badge>
            </div>
            <Link to="/vehiculo/$id" params={{ id: String(o.vehicleId) }} className="mt-2 block font-medium">
              {o.vehicleTitle}
            </Link>
            {o.amount != null && (
              <p className="text-sm tabular-nums text-muted">{formatCop(o.amount)}</p>
            )}
            {o.swapTitle && <p className="text-sm text-muted">Permuta: {o.swapTitle}</p>}
            <p className="mt-1 text-xs text-subtle">{o.buyerName || "Comprador"}</p>
          </li>
        ))}
        {rows?.length === 0 && <p className="text-sm text-muted">Sin ofertas todavía.</p>}
      </ul>
    </div>
  );
}
