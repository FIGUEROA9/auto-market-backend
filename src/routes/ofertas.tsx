import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { SiteShell } from "@/components/site-shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { RedirectToSignIn } from "@/lib/auth/gates";
import { useCurrentUserState } from "@/lib/auth/use-current-user";
import { OFFER_TYPE_LABEL, STATUS_LABEL, formatCop } from "@/lib/format";
import { listMyOffers, respondOffer, type Offer } from "@/lib/market";

export const Route = createFileRoute("/ofertas")({ component: Ofertas });

function toneFor(status: string) {
  if (status === "aceptada") return "success" as const;
  if (status === "rechazada") return "danger" as const;
  if (status === "cerrada") return "neutral" as const;
  return "warn" as const;
}

function OfferList({
  items,
  incoming,
  onChange,
}: {
  items: Offer[];
  incoming?: boolean;
  onChange: () => void;
}) {
  if (!items.length) {
    return <p className="text-sm text-muted">Nada por aquí todavía.</p>;
  }
  return (
    <ul className="grid gap-3">
      {items.map((o) => (
        <li key={o.id} className="rounded-xl border border-border bg-surface p-4">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <div className="flex flex-wrap gap-2">
                <Badge>{OFFER_TYPE_LABEL[o.offerType]}</Badge>
                <Badge tone={toneFor(o.status)}>{STATUS_LABEL[o.status] ?? o.status}</Badge>
              </div>
              <Link
                to="/vehiculo/$id"
                params={{ id: String(o.vehicleId) }}
                className="mt-2 block font-medium hover:underline"
              >
                {o.vehicleTitle}
              </Link>
              {o.offerType === "compra" && o.amount != null && (
                <p className="mt-1 text-sm tabular-nums text-muted">{formatCop(o.amount)}</p>
              )}
              {o.offerType === "permuta" && o.swapTitle && (
                <p className="mt-1 text-sm text-muted">A cambio de: {o.swapTitle}</p>
              )}
              {o.message && <p className="mt-2 text-sm text-muted">{o.message}</p>}
              {incoming && o.buyerName && (
                <p className="mt-2 text-xs text-subtle">De {o.buyerName}</p>
              )}
            </div>
            {incoming && o.status === "pendiente" && (
              <div className="flex gap-2">
                <Button
                  size="sm"
                  onClick={async () => {
                    await respondOffer({ data: { id: o.id, status: "aceptada" } });
                    toast.success("Oferta aceptada. El anuncio pasa a vendido.");
                    onChange();
                  }}
                >
                  Aceptar
                </Button>
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={async () => {
                    await respondOffer({ data: { id: o.id, status: "rechazada" } });
                    onChange();
                  }}
                >
                  Rechazar
                </Button>
              </div>
            )}
          </div>
        </li>
      ))}
    </ul>
  );
}

function Ofertas() {
  const { user, isPending } = useCurrentUserState();
  const [data, setData] = useState<{ sent: Offer[]; received: Offer[] } | null>(null);
  const [tab, setTab] = useState<"recibidas" | "enviadas">("recibidas");

  function load() {
    listMyOffers()
      .then(setData)
      .catch(() => setData({ sent: [], received: [] }));
  }

  useEffect(() => {
    if (user) load();
  }, [user]);

  if (isPending) {
    return (
      <SiteShell>
        <div className="mx-auto max-w-4xl px-4 py-16">
          <div className="h-32 animate-pulse rounded-xl bg-surface" />
        </div>
      </SiteShell>
    );
  }
  if (!user) return <RedirectToSignIn />;

  return (
    <SiteShell>
      <main className="mx-auto max-w-4xl px-4 py-10">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-subtle">Negociación</p>
        <h1 className="mt-2 font-display text-4xl font-semibold">Ofertas</h1>
        <div className="mt-6 grid grid-cols-2 rounded-lg border border-border p-1">
          <button
            type="button"
            className={tab === "recibidas" ? "h-10 rounded-md bg-elevated text-sm" : "h-10 text-sm text-muted"}
            onClick={() => setTab("recibidas")}
          >
            Recibidas {data ? `(${data.received.length})` : ""}
          </button>
          <button
            type="button"
            className={tab === "enviadas" ? "h-10 rounded-md bg-elevated text-sm" : "h-10 text-sm text-muted"}
            onClick={() => setTab("enviadas")}
          >
            Enviadas {data ? `(${data.sent.length})` : ""}
          </button>
        </div>
        <div className="mt-6">
          {data == null ? (
            <div className="h-32 animate-pulse rounded-xl bg-surface" />
          ) : tab === "recibidas" ? (
            <OfferList items={data.received} incoming onChange={load} />
          ) : (
            <OfferList items={data.sent} onChange={load} />
          )}
        </div>
      </main>
    </SiteShell>
  );
}
