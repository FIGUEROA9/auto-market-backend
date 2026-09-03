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

function toneFor(status: string) {
  if (status === "activo") return "success" as const;
  if (status === "pausado") return "warn" as const;
  if (status === "vendido") return "accent" as const;
  return "danger" as const;
}

function MisAnuncios() {
  const { user, isPending } = useCurrentUserState();
  const [items, setItems] = useState<Vehicle[] | null>(null);

  async function reload() {
    const rows = await listMyVehicles();
    setItems(rows);
  }

  useEffect(() => {
    if (isPending || !user) return;
    reload().catch(() => setItems([]));
  }, [user, isPending]);

  if (isPending) {
    return (
      <SiteShell>
        <div className="mx-auto max-w-4xl px-4 py-20">
          <div className="h-40 animate-pulse rounded-xl bg-surface" />
        </div>
      </SiteShell>
    );
  }
  if (!user) return <RedirectToSignIn />;

  return (
    <SiteShell>
      <main className="mx-auto max-w-4xl px-4 py-10">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-subtle">Tu inventario</p>
            <h1 className="mt-2 font-display text-4xl font-semibold">Mis anuncios</h1>
          </div>
          <Link to="/publicar">
            <Button size="sm">Publicar</Button>
          </Link>
        </div>

        {items === null ? (
          <div className="mt-8 h-32 animate-pulse rounded-xl bg-surface" />
        ) : items.length === 0 ? (
          <p className="mt-16 text-center text-sm text-muted">
            Todavía no publicas. Empieza con un anuncio para poder permutar.
          </p>
        ) : (
          <ul className="mt-8 grid gap-3">
            {items.map((v) => (
              <li
                key={v.id}
                className="flex flex-col gap-4 rounded-xl bg-surface p-4 shadow-[var(--shadow-border)] sm:flex-row sm:items-center"
              >
                <img src={v.imageUrl} alt="" className="h-24 w-full rounded-lg object-cover sm:w-36" />
                <div className="min-w-0 flex-1">
                  <Link to="/vehiculo/$id" params={{ id: String(v.id) }} className="font-display text-lg font-semibold">
                    {v.title}
                  </Link>
                  <p className="mt-1 text-sm tabular-nums text-muted">{formatCop(v.price)}</p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    <Badge tone={toneFor(v.status)}>{STATUS_LABEL[v.status]}</Badge>
                    <Badge>{LISTING_LABEL[v.listingType]}</Badge>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {v.status !== "activo" && (
                    <Button size="sm" variant="secondary" onClick={() => void updateVehicleStatus({ data: { id: v.id, status: "activo" } }).then(reload)}>
                      Activar
                    </Button>
                  )}
                  {v.status === "activo" && (
                    <Button size="sm" variant="secondary" onClick={() => void updateVehicleStatus({ data: { id: v.id, status: "pausado" } }).then(reload)}>
                      Pausar
                    </Button>
                  )}
                  {v.status !== "vendido" && (
                    <Button size="sm" variant="outline" onClick={() => void updateVehicleStatus({ data: { id: v.id, status: "vendido" } }).then(reload)}>
                      Vendido
                    </Button>
                  )}
                  <Button
                    size="sm"
                    variant="danger"
                    onClick={() => {
                      void deleteMyVehicle({ data: { id: v.id } })
                        .then(() => {
                          toast.success("Anuncio eliminado.");
                          return reload();
                        })
                        .catch((err) => toast.error(err instanceof Error ? err.message : "No se pudo borrar."));
                    }}
                  >
                    Borrar
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
