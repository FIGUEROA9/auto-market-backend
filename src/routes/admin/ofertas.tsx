import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { OFFER_TYPE_LABEL, STATUS_LABEL, formatCop } from "@/lib/format";
import { adminListOffers, type Offer } from "@/lib/market";

export const Route = createFileRoute("/admin/ofertas")({ component: OfertasAdmin });

function OfertasAdmin() {
  const [rows, setRows] = useState<Offer[]>([]);

  useEffect(() => {
    adminListOffers()
      .then(setRows)
      .catch(() => setRows([]));
  }, []);

  return (
    <div>
      <h1 className="font-display text-3xl font-semibold">Ofertas</h1>
      <p className="mt-1 text-sm text-muted">{rows.length} en total.</p>
      <ul className="mt-6 grid gap-3">
        {rows.map((o) => (
          <li key={o.id} className="rounded-xl bg-surface p-4 shadow-[var(--shadow-border)]">
            <div className="flex flex-wrap items-center gap-2">
              <Badge tone={o.status === "pendiente" ? "warn" : o.status === "aceptada" ? "success" : "neutral"}>
                {STATUS_LABEL[o.status]}
              </Badge>
              <Badge>{OFFER_TYPE_LABEL[o.offerType]}</Badge>
            </div>
            <Link to="/vehiculo/$id" params={{ id: String(o.vehicleId) }} className="mt-2 block font-medium">
              {o.vehicleTitle}
            </Link>
            <p className="mt-1 text-sm text-muted">
              {o.buyerName ?? "Usuario"} ·{" "}
              {o.offerType === "compra" && o.amount != null ? formatCop(o.amount) : o.swapTitle ?? "Permuta"}
            </p>
            {o.message && <p className="mt-2 text-sm text-muted">{o.message}</p>}
          </li>
        ))}
      </ul>
    </div>
  );
}
