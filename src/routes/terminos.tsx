import { createFileRoute } from "@tanstack/react-router";
import { SiteShell } from "@/components/site-shell";

export const Route = createFileRoute("/terminos")({ component: Terminos });

function Terminos() {
  return (
    <SiteShell>
      <main className="mx-auto max-w-2xl px-4 py-12">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-subtle">Legal</p>
        <h1 className="mt-2 font-display text-4xl font-semibold">Términos de uso</h1>
        <div className="mt-8 grid gap-6 text-sm leading-relaxed text-muted">
          <p>
            AutoMarket es un marketplace de anuncios entre particulares. No
            interviene como comprador, vendedor ni intermediario de dinero. El
            acuerdo, la revisión mecánica y el traspaso son responsabilidad de
            las partes.
          </p>
          <p>
            Quien publica declara ser dueño o estar autorizado a disponer del
            vehículo, y que la información (precio, kilometraje, estado y fotos)
            es veraz. AutoMarket puede pausar o retirar anuncios que incumplan
            estas reglas.
          </p>
          <p>
            Las ofertas de compra o permuta no constituyen un contrato hasta que
            el vendedor las acepte. Aceptar una oferta marca el anuncio como
            vendido y cierra las demás ofertas pendientes sobre ese vehículo.
          </p>
          <p>
            Los datos de contacto se usan solo para operar el marketplace y
            responder mensajes. No se venden a terceros.
          </p>
        </div>
      </main>
    </SiteShell>
  );
}
