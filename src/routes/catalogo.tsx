import { createFileRoute } from "@tanstack/react-router";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import { SiteShell } from "@/components/site-shell";
import { VehicleCard } from "@/components/vehicle-card";
import { Input, Select } from "@/components/ui/input";
import { BRANDS, CITIES } from "@/lib/format";
import { listVehicles, type Vehicle } from "@/lib/market";

export const Route = createFileRoute("/catalogo")({
  loader: () => listVehicles({ data: {} }),
  component: Catalogo,
});

function Catalogo() {
  const initial = Route.useLoaderData();
  const [q, setQ] = useState("");
  const [brand, setBrand] = useState("");
  const [listingType, setListingType] = useState("");
  const [bodyType, setBodyType] = useState("");
  const [city, setCity] = useState("");
  const [items, setItems] = useState<Vehicle[]>(initial);

  useEffect(() => {
    const t = setTimeout(() => {
      listVehicles({
        data: {
          q: q || undefined,
          brand: brand || undefined,
          listingType: listingType || undefined,
          bodyType: bodyType || undefined,
          city: city || undefined,
        },
      })
        .then(setItems)
        .catch(() => setItems([]));
    }, 120);
    return () => clearTimeout(t);
  }, [q, brand, listingType, bodyType, city]);

  return (
    <SiteShell>
      <main className="mx-auto max-w-6xl px-4 py-10">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-subtle">Inventario</p>
        <h1 className="mt-2 font-display text-4xl font-semibold">Catálogo</h1>
        <p className="mt-2 max-w-xl text-sm text-muted">
          Venta directa y permuta. Filtra y entra al detalle para ofertar.
        </p>

        <div className="mt-8 grid gap-3 rounded-xl border border-border bg-surface p-4 md:grid-cols-5">
          <div className="relative md:col-span-2">
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-subtle" />
            <Input
              className="pl-9"
              placeholder="Buscar marca, modelo o ciudad"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              suppressHydrationWarning
            />
          </div>
          <Select value={brand} onChange={(e) => setBrand(e.target.value)}>
            <option value="">Todas las marcas</option>
            {BRANDS.map((b) => (
              <option key={b} value={b}>
                {b}
              </option>
            ))}
          </Select>
          <Select value={listingType} onChange={(e) => setListingType(e.target.value)}>
            <option value="">Venta y permuta</option>
            <option value="venta">Venta</option>
            <option value="permuta">Permuta</option>
          </Select>
          <Select value={city} onChange={(e) => setCity(e.target.value)}>
            <option value="">Todas las ciudades</option>
            {CITIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </Select>
        </div>

        <div className="mt-4">
          <Select value={bodyType} onChange={(e) => setBodyType(e.target.value)} className="max-w-xs">
            <option value="">Todo tipo de carrocería</option>
            <option value="sedan">Sedán</option>
            <option value="suv">SUV</option>
            <option value="pickup">Pickup</option>
            <option value="hatchback">Hatchback</option>
            <option value="van">Van</option>
            <option value="coupe">Coupé</option>
          </Select>
        </div>

        {items.length === 0 ? (
          <p className="mt-16 text-center text-sm text-muted">No hay vehículos con esos filtros.</p>
        ) : (
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((v) => (
              <VehicleCard key={v.id} vehicle={v} />
            ))}
          </div>
        )}
      </main>
    </SiteShell>
  );
}
