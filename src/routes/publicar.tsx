import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useRef, useState, type ChangeEvent, type FormEvent } from "react";
import { FolderUp, X } from "lucide-react";
import { toast } from "sonner";
import { SiteShell } from "@/components/site-shell";
import { Button } from "@/components/ui/button";
import { Field, Input, Select, Textarea } from "@/components/ui/input";
import { RedirectToSignIn } from "@/lib/auth/gates";
import { useCurrentUserState } from "@/lib/auth/use-current-user";
import { BRANDS, CITIES, STOCK_IMAGES } from "@/lib/format";
import { createVehicle } from "@/lib/market";

export const Route = createFileRoute("/publicar")({ component: Publicar });

function calcularEstado(yearNum: number): "nuevo" | "seminuevo" | "usado" {
  const anioActual = 2026;
  if (yearNum >= anioActual) return "nuevo";
  if (yearNum >= anioActual - 2) return "seminuevo";
  return "usado";
}

function Publicar() {
  const { user, isPending } = useCurrentUserState();
  const navigate = useNavigate();
  const fileRef = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>(STOCK_IMAGES[0].src);
  const [uploaded, setUploaded] = useState<{ src: string; name: string } | null>(null);

  const [year, setYear] = useState<string>("2020");
  const [condition, setCondition] = useState<"nuevo" | "seminuevo" | "usado">("usado");
  const [listingType, setListingType] = useState<string>("venta");
  const [taxesCurrent, setTaxesCurrent] = useState<string>("si");

  const handleYearChange = (e: ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setYear(val);
    const parsed = parseInt(val, 10);
    if (!isNaN(parsed)) {
      setCondition(calcularEstado(parsed));
    }
  };

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

  async function onPickFile(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    if (!file.type.startsWith("image/") && !/\.(jpe?g|png|webp|gif)$/i.test(file.name)) {
      toast.error("Elige una imagen (JPG, PNG o WEBP).");
      return;
    }
    if (file.size > 12 * 1024 * 1024) {
      toast.error("La imagen no puede superar 12 MB.");
      return;
    }
    try {
      const src = await compressImage(file);
      setUploaded({ src, name: file.name });
      setImageUrl(src);
    } catch {
      toast.error("No se pudo leer esa foto. Prueba JPG o PNG.");
    }
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    setBusy(true);
    try {
      const res = await createVehicle({
        data: {
          title: String(fd.get("title")),
          brand: String(fd.get("brand")),
          model: String(fd.get("year")), 
          year: Number(fd.get("year")),
          mileage: Number(fd.get("mileage")),
          price: Number(fd.get("price")),
          condition: condition,
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
          images: [imageUrl],
          listingType: listingType as "venta" | "permuta" | "ambos",
          taxesCurrent: taxesCurrent === "si",
          finesCurrent: true,
        },
      });
      toast.success("Anuncio publicado (Pendiente de aprobación por administración).");
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
            <Field label="Línea">
              <Input
                name="year"
                type="number"
                required
                min={1980}
                max={2030}
                value={year}
                onChange={handleYearChange}
              />
            </Field>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Kilometraje">
              <Input name="mileage" type="number" required min={0} defaultValue={40000} />
            </Field>
            <Field label="Precio COP">
              <Input name="price" type="number" required min={0} defaultValue={50000000} />
            </Field>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Estado (Autocalculado)">
              <Select
                name="condition"
                value={condition}
                onChange={(e) => setCondition(e.target.value as "nuevo" | "seminuevo" | "usado")}
              >
                <option value="usado">Usado</option>
                <option value="seminuevo">Seminuevo</option>
                <option value="nuevo">Nuevo</option>
              </Select>
            </Field>
            <Field label="Operación">
              <Select 
                name="listingType" 
                value={listingType} 
                onChange={(e) => setListingType(e.target.value)}
              >
                <option value="venta">Venta</option>
                <option value="permuta">Permuta</option>
                <option value="ambos">Venta o permuta</option>
              </Select>
            </Field>
          </div>

          {/* Sección de Documentación y Legalidad */}
          <div className="grid gap-4 rounded-lg border border-border p-4 bg-surface/50">
            <h2 className="text-sm font-semibold text-foreground">Documentación y Legalidad</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Vencimiento SOAT">
                <Input name="soatExpiry" type="date" required />
              </Field>
              <Field label="Vencimiento Tecnomecánica">
                <Input name="tecnoExpiry" type="date" required />
              </Field>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="¿Impuestos al día?">
                <Select 
                  name="taxesCurrentSelect" 
                  value={taxesCurrent} 
                  onChange={(e) => setTaxesCurrent(e.target.value)}
                >
                  <option value="si">Sí, están al día</option>
                  <option value="no">No están al día</option>
                </Select>
              </Field>
              {taxesCurrent === "no" && (
                <Field label="Valor adeudado de impuestos (COP)">
                  <Input name="taxesDebtAmount" type="number" min={0} placeholder="Ej: 450000" required />
                </Field>
              )}
            </div>
          </div>

          {/* Configuración de Permuta si aplica */}
          {(listingType === "permuta" || listingType === "ambos") && (
            <div className="grid gap-4 rounded-lg border border-border p-4 bg-surface/50">
              <h2 className="text-sm font-semibold text-foreground">Preferencias para Permuta</h2>
              <Field label="¿Qué tipo de vehículos aceptas?">
                <Select name="tradePreferenceType" defaultValue="cualquiera">
                  <option value="cualquiera">Recibo cualquier tipo de vehículo</option>
                  <option value="especifico">Especificar marca/línea de interés</option>
                </Select>
              </Field>
              <Field label="Detalles de lo que buscas (Opcional)">
                <Input name="tradeDetails" placeholder="Ej: Recibo camión o SUV de menor valor..." />
              </Field>
            </div>
          )}

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
            <p className="mb-2 text-sm font-medium text-muted">Fotos del anuncio (Máximo 6)</p>
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={onPickFile}
            />
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

              {uploaded ? (
                <div
                  className={
                    imageUrl === uploaded.src
                      ? "relative overflow-hidden rounded-md ring-2 ring-accent"
                      : "relative overflow-hidden rounded-md ring-1 ring-border"
                  }
                >
                  <button
                    type="button"
                    onClick={() => setImageUrl(uploaded.src)}
                    className="block w-full"
                    aria-label="Usar foto de mi equipo"
                  >
                    <img src={uploaded.src} alt={uploaded.name} className="aspect-square object-cover" />
                  </button>
                  <button
                    type="button"
                    aria-label="Quitar foto subida"
                    onClick={() => {
                      const next = STOCK_IMAGES[0].src;
                      setUploaded(null);
                      if (imageUrl === uploaded.src) setImageUrl(next);
                    }}
                    className="absolute right-1 top-1 flex size-6 items-center justify-center rounded-full bg-black/70 text-white"
                  >
                    <X className="size-3.5" />
                  </button>
                </div>
              ) : null}

              <button
                type="button"
                onClick={() => fileRef.current?.click()}
                className="flex aspect-square flex-col items-center justify-center gap-1 rounded-md border border-dashed border-accent/70 bg-surface px-1 text-center hover:border-accent"
                aria-label="Subir foto desde el explorador de archivos o la galería"
              >
                <FolderUp className="size-5 text-accent" />
                <span className="text-[10px] font-medium leading-tight text-muted">
                  Subir de mi equipo
                </span>
              </button>
            </div>
          </div>

          <Button type="submit" disabled={busy}>
            {busy ? "Publicando…" : "Publicar anuncio"}
          </Button>
        </form>
      </main>
    </SiteShell>
  );
}

function compressImage(file: File, maxEdge = 1600, quality = 0.84) {
  return new Promise<string>((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      const scale = Math.min(1, maxEdge / Math.max(img.width, img.height));
      const canvas = document.createElement("canvas");
      canvas.width = Math.max(1, Math.round(img.width * scale));
      canvas.height = Math.max(1, Math.round(img.height * scale));
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        URL.revokeObjectURL(url);
        reject(new Error("Canvas no disponible"));
        return;
      }
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      URL.revokeObjectURL(url);
      resolve(canvas.toDataURL("image/jpeg", quality));
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("No se pudo leer la imagen"));
    };
    img.src = url;
  });
}