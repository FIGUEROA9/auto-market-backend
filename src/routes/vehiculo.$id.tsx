import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Heart, MapPin } from "lucide-react";
import { useEffect, useState, type FormEvent } from "react";
import { toast } from "sonner";
import { SiteShell } from "@/components/site-shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Field, Select, Textarea, Input } from "@/components/ui/input";
import {
  BODY_LABEL,
  CONDITION_LABEL,
  FUEL_LABEL,
  LISTING_LABEL,
  TRANS_LABEL,
  formatCop,
  formatKm,
} from "@/lib/format";
import { useCurrentUserState } from "@/lib/auth/use-current-user";
import { RedirectToSignIn } from "@/lib/auth/gates";
import {
  createOffer,
  getVehicle,
  isFavorite,
  listMyVehicles,
  toggleFavorite,
  type Vehicle,
} from "@/lib/market";

export const Route = createFileRoute("/vehiculo/$id")({
  loader: async ({ params }) => {
    const id = Number(params.id);
    if (!Number.isFinite(id)) return null;
    return getVehicle({ data: { id } });
  },
  component: Detalle,
});

function Detalle() {
  const { id } = Route.useParams();
  const vehicleId = Number(id);
  const loaded = Route.useLoaderData();
  const navigate = useNavigate();
  const { user, isPending } = useCurrentUserState();
  const [vehicle, setVehicle] = useState<Vehicle | null | undefined>(loaded);
  const [fav, setFav] = useState(false);
  const [mine, setMine] = useState<Vehicle[]>([]);
  const [offerType, setOfferType] = useState<"compra" | "permuta">("compra");
  const [amount, setAmount] = useState("");
  const [swapId, setSwapId] = useState("");
  const [message, setMessage] = useState("");
  const [needAuth, setNeedAuth] = useState(false);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    setVehicle(loaded);
  }, [loaded]);

  useEffect(() => {
    if (!user) return;
    isFavorite({ data: { vehicleId } })
      .then((r) => setFav(r.favorite))
      .catch(() => undefined);
    listMyVehicles()
      .then((rows) => setMine(rows.filter((v) => v.status === "activo")))
      .catch(() => setMine([]));
  }, [user, vehicleId]);

  useEffect(() => {
    if (!vehicle) return;
    setOfferType(vehicle.listingType === "permuta" ? "permuta" : "compra");
  }, [vehicle]);

  if (vehicle === undefined) {
    return (
      <SiteShell>
        <div className="mx-auto max-w-6xl px-4 py-16">
          <div className="aspect-video animate-pulse rounded-xl bg-surface" />
        </div>
      </SiteShell>
    );
  }

  if (!vehicle) {
    return (
      <SiteShell>
        <main className="mx-auto max-w-xl px-4 py-24 text-center">
          <h1 className="font-display text-2xl font-semibold">Anuncio no encontrado</h1>
          <Link to="/catalogo" className="mt-4 inline-block text-sm text-muted hover:text-fg">
            Volver al catálogo
          </Link>
        </main>
      </SiteShell>
    );
  }

  if (needAuth && !isPending && !user) {
    return <RedirectToSignIn />;
  }

  const listingTone =
    vehicle.listingType === "permuta" ? "warn" : vehicle.listingType === "ambos" ? "accent" : "success";

  async function onFav() {
    if (!user) {
      setNeedAuth(true);
      return;
    }
    try {
      const r = await toggleFavorite({ data: { vehicleId } });
      setFav(r.favorite);
    } catch {
      toast.error("No se pudo actualizar favoritos.");
    }
  }

  async function onOffer(e: FormEvent) {
    e.preventDefault();
    if (!user) {
      setNeedAuth(true);
      return;
    }
    setBusy(true);
    try {
      await createOffer({
        data: {
          vehicleId,
          offerType,
          amount: offerType === "compra" ? Number(amount) : undefined,
          swapVehicleId: offerType === "permuta" ? Number(swapId) : undefined,
          message: message || undefined,
        },
      });
      toast.success("Oferta enviada.");
      void navigate({ to: "/ofertas" });
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "No se pudo enviar.");
    } finally {
      setBusy(false);
    }
  }

  const specs = [
    ["Kilometraje", formatKm(vehicle.mileage)],
    ["Combustible", FUEL_LABEL[vehicle.fuel]],
    ["Caja", TRANS_LABEL[vehicle.transmission]],
    ["Carrocería", BODY_LABEL[vehicle.bodyType]],
    ["Estado", CONDITION_LABEL[vehicle.condition]],
    ["Ciudad", vehicle.city],
  ];

  return (
    <SiteShell>
      <main className="mx-auto grid max-w-6xl gap-8 px-4 py-10 lg:grid-cols-5">
        <div className="lg:col-span-3">
          <div className="overflow-hidden rounded-xl border border-border bg-surface">
            <img src={vehicle.imageUrl} alt={vehicle.title} className="aspect-video w-full object-cover" />
          </div>
          <div className="mt-6">
            <Badge tone={listingTone}>{LISTING_LABEL[vehicle.listingType]}</Badge>
            <h1 className="mt-3 font-display text-3xl font-semibold md:text-4xl">{vehicle.title}</h1>
            <p className="mt-2 flex items-center gap-1 text-sm text-muted">
              <MapPin className="size-4" /> {vehicle.city} · {vehicle.year}
            </p>
            <p className="mt-4 font-display text-3xl font-semibold tabular-nums">{formatCop(vehicle.price)}</p>
            <p className="mt-6 text-sm leading-relaxed text-muted">{vehicle.description}</p>
            <dl className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3">
              {specs.map(([k, v]) => (
                <div key={k} className="rounded-lg border border-border bg-surface p-3">
                  <dt className="text-xs uppercase tracking-wider text-subtle">{k}</dt>
                  <dd className="mt-1 text-sm font-medium">{v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        <aside className="lg:col-span-2">
          <div className="sticky top-24 rounded-xl border border-border bg-surface p-5">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-xs uppercase tracking-wider text-subtle">Vendedor</p>
                <p className="mt-1 font-medium">{vehicle.sellerName || "Particular"}</p>
              </div>
              <Button variant="outline" size="icon" onClick={onFav} aria-label="Favorito">
                <Heart className={fav ? "size-4 fill-fg" : "size-4"} />
              </Button>
            </div>

            {vehicle.status !== "activo" ? (
              <p className="mt-6 text-sm text-muted">Este anuncio ya no está activo.</p>
            ) : user && user.id === vehicle.userId ? (
              <p className="mt-6 text-sm text-muted">Este es tu anuncio.</p>
            ) : (
              <form onSubmit={onOffer} className="mt-6 grid gap-4">
                <Field label="Tipo de oferta">
                  <Select
                    value={offerType}
                    onChange={(e) => setOfferType(e.target.value as "compra" | "permuta")}
                  >
                    {(vehicle.listingType === "venta" || vehicle.listingType === "ambos") && (
                      <option value="compra">Compra</option>
                    )}
                    {(vehicle.listingType === "permuta" || vehicle.listingType === "ambos") && (
                      <option value="permuta">Permuta</option>
                    )}
                  </Select>
                </Field>
                {offerType === "compra" && (
                  <Field label="Monto ofrecido (COP)">
                    <Input
                      type="number"
                      min={0}
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      required
                    />
                  </Field>
                )}
                {offerType === "permuta" && (
                  <Field label="Tu vehículo">
                    <Select value={swapId} onChange={(e) => setSwapId(e.target.value)} required>
                      <option value="">Selecciona uno de tus anuncios</option>
                      {mine.map((v) => (
                        <option key={v.id} value={v.id}>
                          {v.title} · {formatCop(v.price)}
                        </option>
                      ))}
                    </Select>
                    {mine.length === 0 && (
                      <p className="mt-1 text-xs text-subtle">
                        Publica un anuncio primero para permutar.{" "}
                        <Link to="/publicar" className="underline">
                          Publicar
                        </Link>
                      </p>
                    )}
                  </Field>
                )}
                <Field label="Mensaje">
                  <Textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Cuéntale al vendedor tu propuesta"
                  />
                </Field>
                <Button type="submit" disabled={busy}>
                  {busy ? "Enviando…" : "Enviar oferta"}
                </Button>
              </form>
            )}
          </div>
        </aside>
      </main>
    </SiteShell>
  );
}
