import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { toast } from "sonner";
import { SiteShell } from "@/components/site-shell";
import { Button } from "@/components/ui/button";
import { Field, Input, Textarea } from "@/components/ui/input";
import { submitContact } from "@/lib/market";

export const Route = createFileRoute("/contacto")({ component: Contacto });

function Contacto() {
  const [busy, setBusy] = useState(false);
  const [sent, setSent] = useState(false);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    setBusy(true);
    try {
      await submitContact({
        data: {
          name: String(fd.get("name")),
          email: String(fd.get("email")),
          phone: String(fd.get("phone")),
          subject: String(fd.get("subject") || "") || undefined,
          message: String(fd.get("message")),
        },
      });
      setSent(true);
      toast.success("Mensaje enviado.");
    } catch {
      toast.error("No se pudo enviar. Intenta de nuevo.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <SiteShell>
      <main className="mx-auto grid max-w-5xl gap-10 px-4 py-12 lg:grid-cols-2">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-subtle">Soporte</p>
          <h1 className="mt-2 font-display text-4xl font-semibold">Contacto</h1>
          <p className="mt-4 text-sm leading-relaxed text-muted">
            ¿Dudas sobre una permuta, un anuncio o el proceso de compra? Escríbenos.
            El equipo de AutoMarket responde en horario hábil.
          </p>
        </div>
        {sent ? (
          <div className="rounded-xl border border-border bg-surface p-8">
            <h2 className="font-display text-2xl font-semibold">Recibido</h2>
            <p className="mt-2 text-sm text-muted">Te contactaremos al correo que dejaste.</p>
          </div>
        ) : (
          <form onSubmit={onSubmit} className="grid gap-4 rounded-xl border border-border bg-surface p-6">
            <Field label="Nombre">
              <Input name="name" required minLength={2} />
            </Field>
            <Field label="Correo">
              <Input name="email" type="email" required />
            </Field>
            <Field label="Teléfono">
              <Input name="phone" required minLength={6} />
            </Field>
            <Field label="Asunto">
              <Input name="subject" />
            </Field>
            <Field label="Mensaje">
              <Textarea name="message" required minLength={8} />
            </Field>
            <Button type="submit" disabled={busy}>
              {busy ? "Enviando…" : "Enviar"}
            </Button>
          </form>
        )}
      </main>
    </SiteShell>
  );
}
