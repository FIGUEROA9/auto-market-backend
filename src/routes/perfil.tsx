import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent } from "react";
import { toast } from "sonner";
import { SiteShell } from "@/components/site-shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Field, Input, Select } from "@/components/ui/input";
import { VerifiedBadge } from "@/components/verified-badge";
import { RedirectToSignIn } from "@/lib/auth/gates";
import { authClient } from "@/lib/auth/client";
import { useCurrentUserState } from "@/lib/auth/use-current-user";
import { CITIES, DOC_TYPES, STATUS_LABEL } from "@/lib/format";
import { compressImageFile } from "@/lib/images";
import { getMyProfile, submitVerification, updateMyProfile, type Profile } from "@/lib/market";

export const Route = createFileRoute("/perfil")({ component: Perfil });

function Perfil() {
  const { user, isPending } = useCurrentUserState();
  
  const [profile, setProfile] = useState<Profile | null>(null);
  const [busy, setBusy] = useState(false);
  const [pwdBusy, setPwdBusy] = useState(false);
  const [front, setFront] = useState<string>("");
  const [back, setBack] = useState<string>("");
  const [verBusy, setVerBusy] = useState(false);

  useEffect(() => {
    if (isPending || !user) return;
    getMyProfile()
      .then((p: any) => {
        setProfile(p);
        setFront(p?.idFrontUrl ?? "");
        setBack(p?.idBackUrl ?? "");
      })
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
          firstName: String(fd.get("firstName")),
          lastName: String(fd.get("lastName")),
          phone: String(fd.get("phone")),
          whatsapp: String(fd.get("whatsapp") || "") || undefined,
          city: String(fd.get("city")),
          address: String(fd.get("address") || "") || undefined,
          email: String(fd.get("email") || "") || undefined,
          documentType: (String(fd.get("documentType") || "CC") as "CC" | "CE" | "NIT" | "PA") || undefined,
          documentNumber: String(fd.get("documentNumber") || "") || undefined,
        },
      });
      toast.success("Perfil actualizado con éxito.");
      setProfile(await getMyProfile());
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "No se pudo guardar.");
    } finally {
      setBusy(false);
    }
  }

  async function onPassword(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const currentPassword = String(fd.get("currentPassword"));
    const newPassword = String(fd.get("newPassword"));
    const confirm = String(fd.get("confirmPassword"));
    if (newPassword !== confirm) {
      toast.error("La confirmación no coincide.");
      return;
    }
    setPwdBusy(true);
    try {
      const res = await authClient.changePassword({ currentPassword, newPassword });
      if (res.error) throw new Error(res.error.message || "No se pudo cambiar la contraseña.");
      toast.success("Contraseña actualizada.");
      e.currentTarget.reset();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "No se pudo cambiar la contraseña.");
    } finally {
      setPwdBusy(false);
    }
  }

  async function pickSide(side: "front" | "back", file: File | undefined) {
    if (!file) return;
    const toastId = toast.loading("Procesando imagen de la cédula...");
    try {
      const url = await compressImageFile(file, 1200, 0.7);
      if (side === "front") setFront(url);
      else setBack(url);
      toast.dismiss(toastId);
      toast.success("Foto de cédula cargada correctamente.");
    } catch (err) {
      toast.dismiss(toastId);
      toast.error(err instanceof Error ? err.message : "No se pudo leer la foto.");
    }
  }

  async function sendVerification(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    if (!front || !back) {
      toast.error("Debes subir tanto el frente como el reverso de tu cédula.");
      return;
    }
    const documentNumber = String(fd.get("documentNumber") || profile?.documentNumber || "");
    if (!documentNumber) {
      toast.error("Por favor ingresa tu número de documento en tus datos personales antes de verificar.");
      return;
    }

    setVerBusy(true);
    try {
      await submitVerification({
        data: {
          idFrontUrl: front,
          idBackUrl: back,
          documentType: String(fd.get("documentType") || "CC") as "CC" | "CE" | "NIT" | "PA",
          documentNumber: documentNumber,
        },
      });
      toast.success("Documentos de verificación enviados. Un administrador los revisará pronto.");
      setProfile(await getMyProfile());
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "No se pudo enviar la verificación.");
    } finally {
      setVerBusy(false);
    }
  }

  const disabled = profile?.accountStatus === "deshabilitado";

  return (
    <SiteShell>
      <main className="mx-auto max-w-lg px-4 py-10">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-subtle">Cuenta</p>
        <div className="mt-2 flex flex-wrap items-center gap-2">
          <h1 className="font-display text-4xl font-semibold">Perfil y Verificación</h1>
          {profile?.verificationStatus === "verificado" && <VerifiedBadge />}
        </div>
        <p className="mt-2 text-sm text-muted">
          {profile?.role === "admin"
            ? "Eres administrador de AutoMarket."
            : "Completa tus datos personales y sube las fotos de tu cédula para validar tu cuenta."}
        </p>
        {disabled && (
          <p className="mt-4 rounded-md bg-danger/15 px-3 py-3 text-sm text-danger">
            Esta cuenta está deshabilitada. No puedes publicar ni ofertar.
          </p>
        )}
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
          <>
            <form onSubmit={onSubmit} className="mt-8 grid gap-4">
              <h2 className="font-display text-xl font-semibold">1. Datos Personales</h2>
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Nombres">
                  <Input
                    name="firstName"
                    defaultValue={profile.firstName ?? profile.displayName.split(" ")[0] ?? ""}
                    required
                    minLength={2}
                  />
                </Field>
                <Field label="Apellidos">
                  <Input
                    name="lastName"
                    defaultValue={
                      profile.lastName ?? profile.displayName.split(" ").slice(1).join(" ")
                    }
                    required
                    minLength={2}
                  />
                </Field>
              </div>
              <Field label="Correo">
                <Input name="email" type="email" defaultValue={profile.email ?? ""} />
              </Field>
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Teléfono">
                  <Input name="phone" defaultValue={profile.phone ?? ""} required minLength={7} />
                </Field>
                <Field label="WhatsApp">
                  <Input name="whatsapp" defaultValue={profile.whatsapp ?? profile.phone ?? ""} />
                </Field>
              </div>
              <Field label="Ciudad">
                <Select name="city" defaultValue={profile.city ?? "Bogotá"}>
                  {CITIES.map((c) => (
                    <option key={c}>{c}</option>
                  ))}
                </Select>
              </Field>
              <Field label="Dirección">
                <Input name="address" defaultValue={profile.address ?? ""} />
              </Field>
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Tipo de documento">
                  <Select name="documentType" defaultValue={profile.documentType ?? "CC"}>
                    {DOC_TYPES.map((d) => (
                      <option key={d.value} value={d.value}>
                        {d.label}
                      </option>
                    ))}
                  </Select>
                </Field>
                <Field label="Número de documento">
                  <Input name="documentNumber" defaultValue={profile.documentNumber ?? ""} required />
                </Field>
              </div>
              <Button type="submit" disabled={busy || disabled}>
                {busy ? "Guardando…" : "Guardar datos personales"}
              </Button>
            </form>

            <section className="mt-12">
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="font-display text-2xl font-semibold">2. Verificación de Identidad (Cédula)</h2>
                <Badge
                  tone={
                    profile.verificationStatus === "verificado"
                      ? "success"
                      : profile.verificationStatus === "pendiente"
                        ? "warn"
                        : profile.verificationStatus === "rechazado"
                          ? "danger"
                          : "neutral"
                  }
                >
                  {STATUS_LABEL[profile.verificationStatus] ?? profile.verificationStatus}
                </Badge>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                Sube las fotos del frente y el reverso de tu documento de identidad para completar la verificación de tu cuenta en la plataforma.
              </p>
              {profile.verificationNote && (
                <p className="mt-3 rounded-md bg-elevated px-3 py-2 text-sm text-muted">
                  Nota del administrador: {profile.verificationNote}
                </p>
              )}
              {profile.verificationStatus !== "verificado" && (
                <form onSubmit={sendVerification} className="mt-4 grid gap-4">
                  <input type="hidden" name="documentType" defaultValue={profile.documentType ?? "CC"} />
                  <input type="hidden" name="documentNumber" defaultValue={profile.documentNumber ?? ""} />
                  
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="grid gap-2 text-sm rounded-xl border border-border p-4 bg-surface/50">
                      <span className="font-semibold text-foreground">Frente de la cédula</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="text-xs text-muted cursor-pointer"
                        onChange={(e) => void pickSide("front", e.target.files?.[0])}
                      />
                      {front ? (
                        <img src={front} alt="Frente de cédula" className="h-36 w-full rounded-md object-cover mt-2 border border-border" />
                      ) : (
                        <div className="h-36 w-full rounded-md bg-surface border border-dashed border-border flex items-center justify-center text-xs text-muted">
                          Sin imagen frontal
                        </div>
                      )}
                    </div>

                    <div className="grid gap-2 text-sm rounded-xl border border-border p-4 bg-surface/50">
                      <span className="font-semibold text-foreground">Reverso de la cédula</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="text-xs text-muted cursor-pointer"
                        onChange={(e) => void pickSide("back", e.target.files?.[0])}
                      />
                      {back ? (
                        <img src={back} alt="Reverso de cédula" className="h-36 w-full rounded-md object-cover mt-2 border border-border" />
                      ) : (
                        <div className="h-36 w-full rounded-md bg-surface border border-dashed border-border flex items-center justify-center text-xs text-muted">
                          Sin imagen posterior
                        </div>
                      )}
                    </div>
                  </div>

                  <Button type="submit" variant="secondary" disabled={verBusy || disabled}>
                    {verBusy ? "Enviando documentos…" : "Enviar cédula a revisión"}
                  </Button>
                </form>
              )}
            </section>

            <section className="mt-12">
              <h2 className="font-display text-2xl font-semibold">Seguridad y Contraseña</h2>
              <p className="mt-1 text-sm text-muted">Actualiza tu contraseña de acceso.</p>
              <form onSubmit={onPassword} className="mt-4 grid gap-3">
                <Field label="Contraseña actual">
                  <Input name="currentPassword" type="password" required minLength={8} autoComplete="current-password" />
                </Field>
                <Field label="Nueva contraseña">
                  <Input name="newPassword" type="password" required minLength={8} autoComplete="new-password" />
                </Field>
                <Field label="Confirmar nueva">
                  <Input name="confirmPassword" type="password" required minLength={8} autoComplete="new-password" />
                </Field>
                <Button type="submit" variant="outline" disabled={pwdBusy || disabled}>
                  {pwdBusy ? "Actualizando…" : "Cambiar contraseña"}
                </Button>
              </form>
            </section>
          </>
        )}
      </main>
    </SiteShell>
  );
}