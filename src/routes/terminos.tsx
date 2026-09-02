import { createFileRoute } from "@tanstack/react-router";
import { SiteShell } from "@/components/site-shell";

export const Route = createFileRoute("/terminos")({ component: Terminos });

function Terminos() {
  return (
    <SiteShell>
      <main className="mx-auto max-w-2xl px-4 py-12">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-subtle">Legal</p>
        <h1 className="mt-2 font-display text-4xl font-semibold">Términos</h1>
        <div className="mt-8 grid gap-4 text-sm leading-relaxed text-muted">
          <p>
            AutoMarket es un marketplace para compra, venta y permuta de vehículos entre
            particulares. La plataforma publica anuncios y facilita ofertas; no es
            intermediario de pago ni garante del estado mecánico.
          </p>
          <p>
            El vendedor es responsable de la veracidad del anuncio, papeles y
            kilometraje. El comprador debe verificar el vehículo antes de cerrar.
          </p>
          <p>
            Las ofertas (compra o permuta) son propuestas no vinculantes hasta que
            ambas partes confirmen. AutoMarket puede pausar anuncios que incumplan
            estas reglas.
          </p>
          <p>
            Al crear una cuenta aceptas el tratamiento de los datos de perfil
            necesarios para operar el marketplace.
          </p>
        </div>
      </main>
    </SiteShell>
  );
}
