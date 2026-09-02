import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { LISTING_LABEL, STATUS_LABEL, formatCop } from "@/lib/format";
import { adminListVehicles, adminSetVehicleStatus, type Vehicle } from "@/lib/market";

export const Route = createFileRoute("/admin/anuncios")({ component: AdminAnuncios });

function AdminAnuncios() {
  const [rows, setRows] = useState<Vehicle[] | null>(null);

  function load() {
    adminListVehicles()
      .then(setRows)
      .catch(() => setRows([]));
  }

  useEffect(() => {
    load();
  }, []);

  return (
    <div>
      <h1 className="font-display text-3xl font-semibold">Anuncios</h1>
      <p className="mt-1 text-sm text-muted">Modera el inventario publicado.</p>
      <ul className="mt-6 grid gap-3">
        {(rows ?? []).map((v) => (
          <li key={v.id} className="flex flex-col gap-3 rounded-xl border border-border bg-surface p-4 sm:flex-row sm:items-center">
            <img src={v.imageUrl} alt="" className="h-20 w-full rounded-md object-cover sm:w-32" />
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap gap-2">
                <Badge>{LISTING_LABEL[v.listingType]}</Badge>
                <Badge tone={v.status === "activo" ? "success" : "warn"}>{STATUS_LABEL[v.status]}</Badge>
              </div>
              <Link to="/vehiculo/$id" params={{ id: String(v.id) }} className="mt-1 block truncate font-medium">
                {v.title}
              </Link>
              <p className="text-xs text-muted">
                {v.sellerName || "Catálogo"} · {formatCop(v.price)}
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              {(["activo", "pausado", "rechazado", "vendido"] as const).map((s) => (
                <Button
                  key={s}
                  size="sm"
                  variant={v.status === s ? "default" : "secondary"}
                  onClick={async () => {
                    await adminSetVehicleStatus({ data: { id: v.id, status: s } });
                    load();
                  }}
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
