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

function tone(status: string) {
  if (status === "pendiente") return "warn" as const;
  if (status === "aceptada") return "success" as const;
  if (status === "rechazada") return "danger" as const;
  return "neutral" as const;
}

function OfferCard({
  offer,
  incoming,
  onAct,
}: {
  offer: Offer;
  incoming?: boolean;
  onAct?: (status: "aceptada" | "rechazada") => void;
}) {
  return (
    <article className="flex gap-4 rounded-xl bg-surface p-4 shadow-[var(--shadow-border)]">
      {offer.vehicleImage && (
        <img src={offer.vehicleImage} alt="" className="hidden h-20 w-28 rounded-lg object-cover sm:block" />
      )}
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <Badge tone={tone(offer.status)}>{STATUS_LABEL[offer.status]}</Badge>
          <Badge>{OFFER_TYPE_LABEL[offer.offerType]}</Badge>
        </div>
        <Link to="/vehiculo/$id" params={{ id: String(offer.vehicleId) }} className="mt-2 block font-display text-lg font-semibold">
          {offer.vehicleTitle}
        </Link>
        <p className="mt-1 text-sm text-muted">
          {incoming ? offer.buyerName ?? "Comprador" : "Tú"} ·{" "}
          {offer.offerType === "compra" && offer.amount != null
            ? formatCop(offer.amount)
            : offer.swapTitle
              ? `Permuta por ${offer.swapTitle}`
              : "Permuta"}
        </p>
        {offer.message && <p className="mt-2 text-sm leading-relaxed text-muted">{offer.message}</p>}
        {incoming && offer.status === "pendiente" && onAct && (
          <div className="mt-3 flex gap-2">
            <Button size="sm" onClick={() => onAct("aceptada")}>
              Aceptar
            </Button>
            <Button size="sm" variant="outline" onClick={() => onAct("rechazada")}>
              Rechazar
            </Button>
          </div>
        )}
      </div>
    </article>
  );
}

function Ofertas() {
  const { user, isPending } = useCurrentUserState();
  const [data, setData] = useState<{ sent: Offer[]; received: Offer[] } | null>(null);

  async function reload() {
    setData(await listMyOffers());
  }

  useEffect(() => {
    if (isPending || !user) return;
    reload().catch(() => setData({ sent: [], received: [] }));
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

  async function act(id: number, status: "aceptada" | "rechazada") {
    try {
      await respondOffer({ data: { id, status } });
      toast.success(status === "aceptada" ? "Oferta aceptada. El anuncio pasó a vendido." : "Oferta rechazada.");
      await reload();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "No se pudo actualizar.");
    }
  }

  return (
    <SiteShell>
      <main className="mx-auto max-w-4xl px-4 py-10">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-subtle">Negociación</p>
        <h1 className="mt-2 font-display text-4xl font-semibold">Ofertas</h1>
        <p className="mt-2 text-sm text-muted">
          Recibidas sobre tus anuncios y las que tú enviaste. Aceptar una cierra el anuncio.
        </p>

        <h2 className="mt-10 font-display text-xl font-semibold">Recibidas</h2>
        <div className="mt-4 grid gap-3">
          {data?.received.length ? (
            data.received.map((o) => (
              <OfferCard key={o.id} offer={o} incoming onAct={(s) => void act(o.id, s)} />
            ))
          ) : (
            <p className="text-sm text-muted">Nadie ha ofertado todavía por tus carros.</p>
          )}
        </div>

        <h2 className="mt-10 font-display text-xl font-semibold">Enviadas</h2>
        <div className="mt-4 grid gap-3">
          {data?.sent.length ? (
            data.sent.map((o) => <OfferCard key={o.id} offer={o} />)
          ) : (
            <p className="text-sm text-muted">Aún no envías ofertas. Entra a un anuncio del catálogo.</p>
          )}
        </div>
      </main>
    </SiteShell>
  );
}
