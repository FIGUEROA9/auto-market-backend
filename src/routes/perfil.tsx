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
    if (!user) return;
    getMyProfile()
      .then(setProfile)
      .catch(() => setProfile(null));
  }, [user]);

  if (isPending) {
    return (
      <SiteShell>
        <div className="mx-auto max-w-lg px-4 py-16">
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
          email: String(fd.get("email") || user?.primaryEmail || "") || undefined,
        },
      });
      toast.success("Perfil actualizado.");
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
        <div className="mt-4 flex flex-wrap gap-3 text-sm">
          <Link to="/mis-anuncios" className="text-muted hover:text-fg">
            Mis anuncios
          </Link>
          <Link to="/ofertas" className="text-muted hover:text-fg">
            Ofertas
          </Link>
          <Link to="/favoritos" className="text-muted hover:text-fg">
            Favoritos
          </Link>
        </div>
        {profile && (
          <p className="mt-3 text-xs uppercase tracking-wider text-subtle">
            Rol: {profile.role === "admin" ? "Administrador" : "Cliente"}
          </p>
        )}
        <form onSubmit={onSubmit} className="mt-8 grid gap-4">
          <Field label="Nombre">
            <Input
              name="displayName"
              required
              defaultValue={profile?.displayName || user.displayName || ""}
            />
          </Field>
          <Field label="Correo">
            <Input name="email" type="email" defaultValue={profile?.email || user.primaryEmail || ""} />
          </Field>
          <Field label="Teléfono">
            <Input name="phone" defaultValue={profile?.phone || ""} />
          </Field>
          <Field label="Ciudad">
            <Select name="city" defaultValue={profile?.city || "Bogotá"}>
              {CITIES.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </Select>
          </Field>
          <Button type="submit" disabled={busy}>
            {busy ? "Guardando…" : "Guardar"}
          </Button>
        </form>
      </main>
    </SiteShell>
  );
}
