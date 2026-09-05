import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  RefreshCw,
  Shield,
  Tag,
  CheckCircle2,
  Sparkles,
  Car,
} from "lucide-react";
import { SiteShell } from "@/components/site-shell";
import { VehicleCard } from "@/components/vehicle-card";
import { Button } from "@/components/ui/button";
import { featuredVehicles, marketStats } from "@/lib/market";

export const Route = createFileRoute("/")({
  loader: async () => {
    const [vehicles, stats] = await Promise.all([featuredVehicles(), marketStats()]);
    return { vehicles, stats };
  },
  component: Home,
});

function Home() {
  const { vehicles, stats } = Route.useLoaderData();

  return (
    <SiteShell>
      {/* HERO */}
      <section className="relative min-h-[90vh] overflow-hidden">
        <img
          src="/vehicles/hero.jpg"
          alt="AutoMarket"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-black/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />
        <div className="absolute -left-20 top-1/3 h-72 w-72 rounded-full bg-accent/30 blur-[120px]" />
        <div className="absolute bottom-20 right-10 h-64 w-64 rounded-full bg-orange-500/20 blur-[100px]" />

        <div className="relative mx-auto flex min-h-[90vh] max-w-6xl flex-col justify-center px-4 py-20">
          <div className="max-w-3xl">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-accent/50 bg-accent/20 px-5 py-2 text-sm font-semibold text-accent backdrop-blur-md">
              <Sparkles className="size-4" />
              Marketplace #1 de vehículos en Colombia
            </div>

            <h1 className="font-display text-5xl font-bold leading-[1.05] tracking-tight text-white md:text-7xl lg:text-8xl">
              Compra, vende
              <br />
              o <span className="text-accent">permuta</span>
              <br />
              tu carro
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/80 md:text-xl">
              Conectamos dueños reales. Sin concesionarios, sin comisiones
              escondidas. Publica, negocia y cierra directo.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <Link to="/catalogo">
                <Button
                  size="lg"
                  className="h-14 px-8 text-base font-bold shadow-2xl shadow-accent/40 transition-transform hover:scale-105"
                >
                  Ver catálogo
                  <ArrowRight className="ml-2 size-5" />
                </Button>
              </Link>
              <Link to="/publicar">
                <Button
                  size="lg"
                  variant="outline"
                  className="h-14 border-2 border-white/30 bg-white/10 px-8 text-base font-semibold text-white backdrop-blur-md hover:bg-white/20"
                >
                  Publicar mi carro
                </Button>
              </Link>
            </div>

            <div className="mt-12 flex flex-wrap gap-x-8 gap-y-3 text-sm text-white/70">
              <span className="flex items-center gap-2">
                <CheckCircle2 className="size-4 text-accent" /> Sin comisiones ocultas
              </span>
              <span className="flex items-center gap-2">
                <CheckCircle2 className="size-4 text-accent" /> Vendedores verificados
              </span>
              <span className="flex items-center gap-2">
                <CheckCircle2 className="size-4 text-accent" /> Ofertas formales
              </span>
            </div>
          </div>

          <div className="mt-16 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {[
              { label: "Activos", value: stats.active },
              { label: "En venta", value: stats.sale },
              { label: "Permuta", value: stats.swap },
              { label: "Verificados", value: stats.verified },
            ].map((item) => (
              <div
                key={item.label}
                className="rounded-2xl border border-white/10 bg-white/10 p-4 text-center backdrop-blur-md"
              >
                <p className="font-display text-3xl font-bold text-white">{item.value}</p>
                <p className="mt-1 text-xs uppercase tracking-wider text-white/60">
                  {item.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CÓMO FUNCIONA - VERSIÓN MÁS FUERTE */}
      <section className="bg-[#0b0f1a] py-28">
        <div className="mx-auto max-w-6xl px-4">
          <div className="mb-16 text-center">
            <p className="text-sm font-bold uppercase tracking-[0.25em] text-accent">
              Cómo funciona
            </p>
            <h2 className="mt-4 font-display text-4xl font-bold text-white md:text-5xl">
              Tres formas de moverte
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                icon: Tag,
                title: "Comprar",
                text: "Filtra por marca, ciudad y precio. Envía ofertas formales y negocia directo con el dueño.",
                color: "bg-orange-500/20 text-orange-400",
              },
              {
                icon: Shield,
                title: "Vender",
                text: "Sube fotos y datos de tu carro. Si no estás verificado, un admin revisa tu anuncio.",
                color: "bg-emerald-500/20 text-emerald-400",
              },
              {
                icon: RefreshCw,
                title: "Permutar",
                text: "Indica qué tipo de vehículo buscas a cambio y recibe propuestas de otros dueños.",
                color: "bg-blue-500/20 text-blue-400",
              },
            ].map((item, i) => (
              <div
                key={item.title}
                className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm transition hover:bg-white/10"
              >
                <div className={`mb-6 flex size-14 items-center justify-center rounded-2xl ${item.color}`}>
                  <item.icon className="size-7" />
                </div>
                <div className="mb-2 text-sm font-bold text-white/40">0{i + 1}</div>
                <h3 className="font-display text-2xl font-bold text-white">{item.title}</h3>
                <p className="mt-3 leading-relaxed text-white/60">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DESTACADOS */}
      <section className="bg-[#111827] py-28">
        <div className="mx-auto max-w-6xl px-4">
          <div className="mb-12 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-white/40">
                Selección
              </p>
              <h2 className="mt-3 font-display text-4xl font-bold text-white">
                Vehículos destacados
              </h2>
            </div>
            <Link
              to="/catalogo"
              className="inline-flex items-center gap-2 text-sm font-semibold text-accent hover:underline"
            >
              Ver catálogo completo
              <ArrowRight className="size-4" />
            </Link>
          </div>

          {vehicles.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-white/20 py-20 text-center">
              <Car className="mx-auto size-12 text-white/40" />
              <p className="mt-4 text-white/50">Aún no hay anuncios activos.</p>
              <Link to="/publicar" className="mt-6 inline-block">
                <Button size="lg">Publicar el primero</Button>
              </Link>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {vehicles.map((v) => (
                <VehicleCard key={v.id} vehicle={v} />
              ))}
            </div>
          )}
        </div>
      </section>
    </SiteShell>
  );
}