import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent } from "react";
import { toast } from "sonner";
import { SiteShell } from "@/components/site-shell";
import { Button } from "@/components/ui/button";
import { Field, Input, Select } from "@/components/ui/input";
import { RedirectToSignIn } from "@/lib/auth/gates";
import { useCurrentUserState } from "@/lib/auth/use-current-user";
import { CITIES } from "@/lib/format";
import { getMyProfile, updateMyProfile, type Profile } from "@/lib/market";

export const Route = createFileRoute("/perfil")({ component: Perfil });

function Perfil() {
  const { user, isPending } = useCurrentUserState();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (isPending || !user) return;
    getMyProfile()
      .then(setProfile)
      .catch(() => setProfile(null));
  }, [user, isPending]);

  if (isPending) {
    return (
      <SiteShell>
        <div className="mx-auto max-w-lg px-4 py-20">
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
      await updateMyProfile({
        data: {
          displayName: String(fd.get("displayName")),
          phone: String(fd.get("phone") || "") || undefined,
          city: String(fd.get("city") || "") || undefined,
          email: String(fd.get("email") || "") || undefined,
        },
      });
      toast.success("Perfil actualizado.");
      setProfile(await getMyProfile());
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "No se pudo guardar.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <SiteShell>
      <main className="mx-auto max-w-lg px-4 py-10">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-subtle">Cuenta</p>
        <h1 className="mt-2 font-display text-4xl font-semibold">Perfil</h1>
        <p className="mt-2 text-sm text-muted">
          {profile?.role === "admin"
            ? "Eres administrador de AutoMarket."
            : "Completa tus datos para que los vendedores puedan contactarte."}
        </p>
        <div className="mt-4 flex flex-wrap gap-3 text-sm">
          <Link to="/mis-anuncios" className="text-accent">
            Mis anuncios
          </Link>
          <Link to="/ofertas" className="text-accent">
            Ofertas
          </Link>
          {profile?.role === "admin" && (
            <Link to="/admin" className="text-accent">
              Panel admin
            </Link>
          )}
        </div>
        {profile && (
          <form onSubmit={onSubmit} className="mt-8 grid gap-4">
            <Field label="Nombre">
              <Input name="displayName" defaultValue={profile.displayName} required minLength={2} />
            </Field>
            <Field label="Correo">
              <Input name="email" type="email" defaultValue={profile.email ?? ""} />
            </Field>
            <Field label="Teléfono">
              <Input name="phone" defaultValue={profile.phone ?? ""} />
            </Field>
            <Field label="Ciudad">
              <Select name="city" defaultValue={profile.city ?? "Bogotá"}>
                {CITIES.map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </Select>
            </Field>
            <Button type="submit" disabled={busy}>
              {busy ? "Guardando…" : "Guardar"}
            </Button>
          </form>
        )}
      </main>
    </SiteShell>
  );
}
