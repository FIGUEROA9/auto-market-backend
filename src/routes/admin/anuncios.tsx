import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { VerifiedBadge } from "@/components/verified-badge";
import { LISTING_LABEL, STATUS_LABEL, formatCop } from "@/lib/format";
import { adminListVehicles, adminSetVehicleStatus, type Vehicle } from "@/lib/market";

export const Route = createFileRoute("/admin/anuncios")({ component: Anuncios });

function Anuncios() {
  const [rows, setRows] = useState<Vehicle[]>([]);

  async function reload() {
    setRows(await adminListVehicles());
  }

  useEffect(() => {
    reload().catch(() => setRows([]));
  }, []);

  const pending = rows.filter((v) => v.status === "pendiente_revision").length;

  return (
    <div>
      <h1 className="font-display text-3xl font-semibold">Anuncios</h1>
      <p className="mt-1 text-sm text-muted">
        {rows.length} publicados. {pending} en espera de aprobación.
      </p>
      <ul className="mt-6 grid gap-3">
        {rows.map((v) => (
          <li key={v.id} className="flex flex-col gap-3 rounded-xl bg-surface p-4 shadow-[var(--shadow-border)] sm:flex-row sm:items-center">
            <img src={v.imageUrl} alt="" className="h-20 w-full rounded-lg object-cover sm:w-32" />
            <div className="min-w-0 flex-1">
              <Link to="/vehiculo/$id" params={{ id: String(v.id) }} className="font-medium">
                {v.title}
              </Link>
              <p className="text-sm text-muted">
                {v.sellerName} · {v.city} · {formatCop(v.price)}
              </p>
              <div className="mt-2 flex flex-wrap gap-2">
                <Badge
                  tone={
                    v.status === "activo"
                      ? "success"
                      : v.status === "pausado" || v.status === "pendiente_revision"
                        ? "warn"
                        : "neutral"
                  }
                >
                  {STATUS_LABEL[v.status]}
                </Badge>
                <Badge>{LISTING_LABEL[v.listingType]}</Badge>
                {v.sellerVerified && <VerifiedBadge />}
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              {v.status === "pendiente_revision" && (
                <Button
                  size="sm"
                  onClick={() => void adminSetVehicleStatus({ data: { id: v.id, status: "activo" } }).then(reload)}
                >
                  Aprobar
                </Button>
              )}
              {(["activo", "pausado", "vendido", "rechazado"] as const).map((s) => (
                <Button
                  key={s}
                  size="sm"
                  variant={v.status === s ? "default" : "secondary"}
                  onClick={() => void adminSetVehicleStatus({ data: { id: v.id, status: s } }).then(reload)}
                >
                  {STATUS_LABEL[s]}
                </Button>
              ))}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
