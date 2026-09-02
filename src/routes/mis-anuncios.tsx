import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { SiteShell } from "@/components/site-shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { RedirectToSignIn } from "@/lib/auth/gates";
import { useCurrentUserState } from "@/lib/auth/use-current-user";
import { LISTING_LABEL, STATUS_LABEL, formatCop } from "@/lib/format";
import { deleteMyVehicle, listMyVehicles, updateVehicleStatus, type Vehicle } from "@/lib/market";

export const Route = createFileRoute("/mis-anuncios")({ component: MisAnuncios });

function MisAnuncios() {
  const { user, isPending } = useCurrentUserState();
  const [rows, setRows] = useState<Vehicle[] | null>(null);

  function load() {
    listMyVehicles()
      .then(setRows)
      .catch(() => setRows([]));
  }

  useEffect(() => {
    if (user) load();
  }, [user]);

  if (isPending) {
    return (
      <SiteShell>
        <div className="mx-auto max-w-5xl px-4 py-16">
          <div className="h-32 animate-pulse rounded-xl bg-surface" />
        </div>
      </SiteShell>
    );
  }
  if (!user) return <RedirectToSignIn />;

  return (
    <SiteShell>
      <main className="mx-auto max-w-5xl px-4 py-10">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-subtle">Tu inventario</p>
            <h1 className="mt-2 font-display text-4xl font-semibold">Mis anuncios</h1>
          </div>
          <Link to="/publicar">
            <Button>Publicar</Button>
          </Link>
        </div>
        {rows === null ? (
          <div className="mt-8 h-40 animate-pulse rounded-xl bg-surface" />
        ) : rows.length === 0 ? (
          <p className="mt-16 text-sm text-muted">Aún no publicas vehículos.</p>
        ) : (
          <ul className="mt-8 grid gap-3">
            {rows.map((v) => (
              <li
                key={v.id}
                className="flex flex-col gap-4 rounded-xl border border-border bg-surface p-4 sm:flex-row sm:items-center"
              >
                <img src={v.imageUrl} alt="" className="h-24 w-full rounded-lg object-cover sm:w-40" />
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap gap-2">
                    <Badge>{LISTING_LABEL[v.listingType]}</Badge>
                    <Badge tone={v.status === "activo" ? "success" : v.status === "vendido" ? "accent" : "warn"}>
                      {STATUS_LABEL[v.status]}
                    </Badge>
                  </div>
                  <Link
                    to="/vehiculo/$id"
                    params={{ id: String(v.id) }}
                    className="mt-1 block truncate font-medium hover:underline"
                  >
                    {v.title}
                  </Link>
                  <p className="text-sm tabular-nums text-muted">{formatCop(v.price)}</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {v.status === "activo" && (
                    <Button
                      size="sm"
                      variant="secondary"
                      onClick={async () => {
                        await updateVehicleStatus({ data: { id: v.id, status: "pausado" } });
                        load();
                      }}
                    >
                      Pausar
                    </Button>
                  )}
                  {v.status === "pausado" && (
                    <Button
                      size="sm"
                      variant="secondary"
                      onClick={async () => {
                        await updateVehicleStatus({ data: { id: v.id, status: "activo" } });
                        load();
                      }}
                    >
                      Activar
                    </Button>
                  )}
                  {v.status !== "vendido" && (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={async () => {
                        await updateVehicleStatus({ data: { id: v.id, status: "vendido" } });
                        load();
                      }}
                    >
                      Marcar vendido
                    </Button>
                  )}
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={async () => {
                      await deleteMyVehicle({ data: { id: v.id } });
                      toast.success("Anuncio eliminado.");
                      load();
                    }}
                  >
                    Eliminar
                  </Button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </main>
    </SiteShell>
  );
}
