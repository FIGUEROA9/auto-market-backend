import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { toast } from "sonner";
import { SiteShell } from "@/components/site-shell";
import { Button } from "@/components/ui/button";
import { Field, Input, Select, Textarea } from "@/components/ui/input";
import { RedirectToSignIn } from "@/lib/auth/gates";
import { useCurrentUserState } from "@/lib/auth/use-current-user";
import { BRANDS, CITIES, STOCK_IMAGES } from "@/lib/format";
import { createVehicle } from "@/lib/market";

export const Route = createFileRoute("/publicar")({ component: Publicar });

function Publicar() {
  const { user, isPending } = useCurrentUserState();
  const navigate = useNavigate();
  const [busy, setBusy] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>(STOCK_IMAGES[0].src);

  if (isPending) {
    return (
      <SiteShell>
        <div className="mx-auto max-w-2xl px-4 py-20">
          <div className="h-40 animate-pulse rounded-xl bg-surface" />
        </div>
      </SiteShell>
    );
  }
  if (!user) return <RedirectToSignIn />;

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    setBusy(true);
    try {
      const res = await createVehicle({
        data: {
          title: String(fd.get("title")),
          brand: String(fd.get("brand")),
          model: String(fd.get("model")),
          year: Number(fd.get("year")),
          mileage: Number(fd.get("mileage")),
          price: Number(fd.get("price")),
          condition: String(fd.get("condition")) as "nuevo" | "seminuevo" | "usado",
          fuel: String(fd.get("fuel")) as "gasolina" | "diesel" | "hibrido" | "electrico",
          transmission: String(fd.get("transmission")) as "manual" | "automatica",
          bodyType: String(fd.get("bodyType")) as
            | "sedan"
            | "suv"
            | "pickup"
            | "hatchback"
            | "van"
            | "coupe",
          city: String(fd.get("city")),
          description: String(fd.get("description")),
          imageUrl,
          listingType: String(fd.get("listingType")) as "venta" | "permuta" | "ambos",
        },
      });
      toast.success("Anuncio publicado.");
      void navigate({ to: "/vehiculo/$id", params: { id: String(res.id) } });
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "No se pudo publicar.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <SiteShell>
      <main className="mx-auto max-w-2xl px-4 py-10">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-subtle">
          Vender o permutar
        </p>
        <h1 className="mt-2 font-display text-4xl font-semibold">Publicar anuncio</h1>
        <form onSubmit={onSubmit} className="mt-8 grid gap-4">
          <Field label="Título">
            <Input name="title" required minLength={3} placeholder="Mazda CX-5 Grand Touring 2020" />
          </Field>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Marca">
              <Select name="brand" required defaultValue="Toyota">
                {BRANDS.map((b) => (
                  <option key={b}>{b}</option>
                ))}
              </Select>
            </Field>
            <Field label="Modelo">
              <Input name="model" required />
            </Field>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            <Field label="Año">
              <Input name="year" type="number" required min={1980} max={2030} defaultValue={2020} />
            </Field>
            <Field label="Kilometraje">
              <Input name="mileage" type="number" required min={0} defaultValue={40000} />
            </Field>
            <Field label="Precio COP">
              <Input name="price" type="number" required min={0} defaultValue={50000000} />
            </Field>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Estado">
              <Select name="condition" defaultValue="usado">
                <option value="usado">Usado</option>
                <option value="seminuevo">Seminuevo</option>
                <option value="nuevo">Nuevo</option>
              </Select>
            </Field>
            <Field label="Operación">
              <Select name="listingType" defaultValue="venta">
                <option value="venta">Venta</option>
                <option value="permuta">Permuta</option>
                <option value="ambos">Venta o permuta</option>
              </Select>
            </Field>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            <Field label="Combustible">
              <Select name="fuel" defaultValue="gasolina">
                <option value="gasolina">Gasolina</option>
                <option value="diesel">Diésel</option>
                <option value="hibrido">Híbrido</option>
                <option value="electrico">Eléctrico</option>
              </Select>
            </Field>
            <Field label="Caja">
              <Select name="transmission" defaultValue="automatica">
                <option value="automatica">Automática</option>
                <option value="manual">Manual</option>
              </Select>
            </Field>
            <Field label="Carrocería">
              <Select name="bodyType" defaultValue="sedan">
                <option value="sedan">Sedán</option>
                <option value="suv">SUV</option>
                <option value="pickup">Pickup</option>
                <option value="hatchback">Hatchback</option>
                <option value="van">Van</option>
                <option value="coupe">Coupé</option>
              </Select>
            </Field>
          </div>
          <Field label="Ciudad">
            <Select name="city" defaultValue="Bogotá">
              {CITIES.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </Select>
          </Field>
          <Field label="Descripción">
            <Textarea name="description" required minLength={10} placeholder="Estado, papeles, extras…" />
          </Field>
          <div>
            <p className="mb-2 text-sm font-medium text-muted">Foto del anuncio</p>
            <div className="grid grid-cols-3 gap-2 sm:grid-cols-5">
              {STOCK_IMAGES.map((img) => (
                <button
                  key={img.src}
                  type="button"
                  onClick={() => setImageUrl(img.src)}
                  className={
                    imageUrl === img.src
                      ? "overflow-hidden rounded-md ring-2 ring-accent"
                      : "overflow-hidden rounded-md ring-1 ring-border"
                  }
                  aria-label={img.label}
                >
                  <img src={img.src} alt="" className="aspect-square object-cover" />
                </button>
              ))}
            </div>
          </div>
          <Button type="submit" disabled={busy}>
            {busy ? "Publicando…" : "Publicar"}
          </Button>
        </form>
      </main>
    </SiteShell>
  );
}
