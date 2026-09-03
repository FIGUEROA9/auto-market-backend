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
          <h1 className="font-display text-3xl font-semibold">Anuncio no encontrado</h1>
          <Link to="/catalogo" className="mt-4 inline-block text-sm text-accent">
            Volver al catálogo
          </Link>
        </main>
      </SiteShell>
    );
  }

  if (needAuth) return <RedirectToSignIn />;

  const own = user?.id === vehicle.userId;
  const listingTone =
    vehicle.listingType === "permuta" ? "warn" : vehicle.listingType === "ambos" ? "accent" : "success";

  async function onFav() {
    if (!user) {
      setNeedAuth(true);
      return;
    }
    try {
      const res = await toggleFavorite({ data: { vehicleId } });
      setFav(res.favorite);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "No se pudo guardar.");
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
          amount: amount ? Number(amount) : undefined,
          swapVehicleId: swapId ? Number(swapId) : undefined,
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
    { label: "Año", value: String(vehicle.year) },
    { label: "Kilometraje", value: formatKm(vehicle.mileage) },
    { label: "Estado", value: CONDITION_LABEL[vehicle.condition] ?? vehicle.condition },
    { label: "Combustible", value: FUEL_LABEL[vehicle.fuel] ?? vehicle.fuel },
    { label: "Caja", value: TRANS_LABEL[vehicle.transmission] ?? vehicle.transmission },
    { label: "Carrocería", value: BODY_LABEL[vehicle.bodyType] ?? vehicle.bodyType },
  ];

  return (
    <SiteShell>
      <main className="mx-auto grid max-w-6xl gap-8 px-4 py-10 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <div className="overflow-hidden rounded-xl bg-surface shadow-[var(--shadow-border)]">
            <img src={vehicle.imageUrl} alt={vehicle.title} className="aspect-video w-full object-cover" />
          </div>
          <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
            {specs.map((s) => (
              <div key={s.label} className="rounded-lg bg-surface px-3 py-3 shadow-[var(--shadow-border)]">
                <p className="text-xs uppercase tracking-wider text-subtle">{s.label}</p>
                <p className="mt-1 text-sm font-medium">{s.value}</p>
              </div>
            ))}
          </div>
          <div className="mt-8">
            <h2 className="font-display text-2xl font-semibold">Descripción</h2>
            <p className="mt-3 whitespace-pre-wrap text-sm leading-relaxed text-muted">{vehicle.description}</p>
          </div>
        </div>

        <aside className="lg:col-span-5">
          <div className="rounded-xl bg-surface p-6 shadow-[var(--shadow-border)] lg:sticky lg:top-24">
            <div className="flex items-start justify-between gap-3">
              <div>
                <Badge tone={listingTone}>{LISTING_LABEL[vehicle.listingType]}</Badge>
                <h1 className="mt-3 font-display text-3xl font-semibold">{vehicle.title}</h1>
                <p className="mt-1 text-sm text-muted">
                  {vehicle.brand} · {vehicle.sellerName ?? "Particular"}
                </p>
              </div>
              <button
                type="button"
                onClick={() => void onFav()}
                className="grid size-11 place-items-center rounded-md border border-border"
                aria-label={fav ? "Quitar de favoritos" : "Guardar en favoritos"}
              >
                <Heart className={fav ? "size-5 fill-accent text-accent" : "size-5 text-muted"} />
              </button>
            </div>
            <p className="mt-5 font-display text-3xl font-semibold tabular-nums text-accent">
              {formatCop(vehicle.price)}
            </p>
            <p className="mt-2 inline-flex items-center gap-1 text-sm text-muted">
              <MapPin className="size-4" /> {vehicle.city}
            </p>

            {own ? (
              <p className="mt-6 rounded-md bg-elevated px-3 py-3 text-sm text-muted">
                Este anuncio es tuyo. Gestiona ofertas desde{" "}
                <Link to="/ofertas" className="text-accent">
                  Ofertas
                </Link>
                .
              </p>
            ) : vehicle.status !== "activo" ? (
              <p className="mt-6 text-sm text-muted">Este anuncio ya no está activo.</p>
            ) : (
              <form onSubmit={onOffer} className="mt-6 grid gap-3">
                <Field label="Tipo de oferta">
                  <Select
                    value={offerType}
                    onChange={(e) => setOfferType(e.target.value as "compra" | "permuta")}
                  >
                    {vehicle.listingType !== "permuta" && <option value="compra">Compra</option>}
                    {vehicle.listingType !== "venta" && <option value="permuta">Permuta</option>}
                  </Select>
                </Field>
                {offerType === "compra" && (
                  <Field label="Monto (COP)">
                    <Input
                      type="number"
                      min={0}
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      required
                      placeholder="65000000"
                    />
                  </Field>
                )}
                {offerType === "permuta" && (
                  <Field label="Tu vehículo">
                    {mine.length === 0 ? (
                      <p className="text-sm text-muted">
                        Publica un anuncio propio para permutar.{" "}
                        <Link to="/publicar" className="text-accent">
                          Publicar
                        </Link>
                      </p>
                    ) : (
                      <Select value={swapId} onChange={(e) => setSwapId(e.target.value)} required>
                        <option value="">Elige uno de tus anuncios</option>
                        {mine.map((v) => (
                          <option key={v.id} value={v.id}>
                            {v.title}
                          </option>
                        ))}
                      </Select>
                    )}
                  </Field>
                )}
                <Field label="Mensaje">
                  <Textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Cuéntale al vendedor cómo quieres cerrar."
                  />
                </Field>
                {isPending ? (
                  <div className="h-11 animate-pulse rounded-md bg-elevated" />
                ) : (
                  <Button type="submit" disabled={busy || (offerType === "permuta" && mine.length === 0)}>
                    {busy ? "Enviando…" : "Enviar oferta"}
                  </Button>
                )}
              </form>
            )}
          </div>
        </aside>
      </main>
    </SiteShell>
  );
}
