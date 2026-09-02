import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { SiteShell } from "@/components/site-shell";
import { VehicleCard } from "@/components/vehicle-card";
import { RedirectToSignIn } from "@/lib/auth/gates";
import { useCurrentUserState } from "@/lib/auth/use-current-user";
import { listFavorites, type Vehicle } from "@/lib/market";

export const Route = createFileRoute("/favoritos")({ component: Favoritos });

function Favoritos() {
  const { user, isPending } = useCurrentUserState();
  const [rows, setRows] = useState<Vehicle[] | null>(null);

  useEffect(() => {
    if (!user) return;
    listFavorites()
      .then(setRows)
      .catch(() => setRows([]));
  }, [user]);

  if (isPending) {
    return (
      <SiteShell>
        <div className="mx-auto max-w-6xl px-4 py-16">
          <div className="h-32 animate-pulse rounded-xl bg-surface" />
        </div>
      </SiteShell>
    );
  }
  if (!user) return <RedirectToSignIn />;

  return (
    <SiteShell>
      <main className="mx-auto max-w-6xl px-4 py-10">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-subtle">Guardados</p>
        <h1 className="mt-2 font-display text-4xl font-semibold">Favoritos</h1>
        {rows === null ? (
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="aspect-4/3 animate-pulse rounded-xl bg-surface" />
            ))}
          </div>
        ) : rows.length === 0 ? (
          <p className="mt-16 text-sm text-muted">Aún no guardas vehículos.</p>
        ) : (
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {rows.map((v) => (
              <VehicleCard key={v.id} vehicle={v} />
            ))}
          </div>
        )}
      </main>
    </SiteShell>
  );
}
