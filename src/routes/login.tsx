import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { GROK_PROVIDERS, authClient, authEnabled, signIn } from "@/lib/auth/client";
import { useCurrentUserState } from "@/lib/auth/use-current-user";
import { SiteShell } from "@/components/site-shell";
import { Button } from "@/components/ui/button";
import { Field, Input, Select } from "@/components/ui/input";
import { CITIES, DOC_TYPES } from "@/lib/format";
import { updateMyProfile } from "@/lib/market";

export const Route = createFileRoute("/login")({ component: Login });

function Login() {
  const navigate = useNavigate();
  const { user, isPending } = useCurrentUserState();
  const [mode, setMode] = useState<"entrar" | "crear">("entrar");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [city, setCity] = useState("Bogotá");
  const [address, setAddress] = useState("");
  const [documentType, setDocumentType] = useState<"CC" | "CE" | "NIT" | "PA">("CC");
  const [documentNumber, setDocumentNumber] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  if (!isPending && user) {
    void navigate({ to: "/" });
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    setBusy(true);
    try {
      if (mode === "crear") {
        const name = `${firstName} ${lastName}`.trim();
        const res = await authClient.signUp.email({ email, password, name });
        if (res.error) throw new Error(res.error.message || "No se pudo crear la cuenta.");
        try {
          await updateMyProfile({
            data: {
              firstName,
              lastName,
              phone,
              whatsapp: whatsapp || phone,
              city,
              address: address || undefined,
              email,
              documentType,
              documentNumber: documentNumber || undefined,
            },
          });
        } catch {
          /* el perfil se puede completar después */
        }
      } else {
        const res = await authClient.signIn.email({ email, password });
        if (res.error) throw new Error(res.error.message || "Correo o contraseña incorrectos.");
      }
      await navigate({ to: "/" });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Algo salió mal.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <SiteShell>
      <main className="mx-auto grid min-h-[70vh] max-w-lg content-center px-4 py-16">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-subtle">Cuenta</p>
        <h1 className="mt-2 font-display text-3xl font-semibold">
          {mode === "entrar" ? "Entra a AutoMarket" : "Crea tu cuenta"}
        </h1>
        <p className="mt-2 text-sm text-muted">
          {mode === "crear"
            ? "Completa tus datos. El primer usuario real obtiene el panel de administración."
            : "El primer usuario real que se registra obtiene el panel de administración."}
        </p>

        <div className="mt-6 grid grid-cols-2 rounded-lg border border-border p-1">
          {(["entrar", "crear"] as const).map((m) => (
            <button
              key={m}
              type="button"
              onClick={() => setMode(m)}
              className={
                mode === m
                  ? "h-11 rounded-md bg-elevated text-sm font-medium text-fg"
                  : "h-11 rounded-md text-sm text-muted"
              }
            >
              {m === "entrar" ? "Entrar" : "Crear cuenta"}
            </button>
          ))}
        </div>

        {authEnabled ? (
          <div className="mt-6 grid gap-2">
            {GROK_PROVIDERS.map((p) => (
              <Button
                key={p.providerId}
                type="button"
                variant="secondary"
                onClick={() => signIn(p.providerId, { callbackURL: "/" })}
              >
                Continuar con {p.label}
              </Button>
            ))}
          </div>
        ) : (
          <p className="mt-6 text-sm text-muted">El inicio de sesión está desactivado.</p>
        )}

        <div className="my-6 flex items-center gap-3 text-xs uppercase tracking-wider text-subtle">
          <span className="h-px flex-1 bg-border" />
          o con correo
          <span className="h-px flex-1 bg-border" />
        </div>

        <form onSubmit={onSubmit} className="grid gap-3">
          {mode === "crear" && (
            <>
              <div className="grid gap-3 sm:grid-cols-2">
                <Field label="Nombres">
                  <Input
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                    minLength={2}
                    autoComplete="given-name"
                  />
                </Field>
                <Field label="Apellidos">
                  <Input
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                    minLength={2}
                    autoComplete="family-name"
                  />
                </Field>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <Field label="Tipo de documento">
                  <Select
                    value={documentType}
                    onChange={(e) => setDocumentType(e.target.value as typeof documentType)}
                  >
                    {DOC_TYPES.map((d) => (
                      <option key={d.value} value={d.value}>
                        {d.label}
                      </option>
                    ))}
                  </Select>
                </Field>
                <Field label="Número de documento">
                  <Input
                    value={documentNumber}
                    onChange={(e) => setDocumentNumber(e.target.value)}
                    required
                    minLength={4}
                  />
                </Field>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <Field label="Teléfono">
                  <Input
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                    minLength={7}
                    autoComplete="tel"
                  />
                </Field>
                <Field label="WhatsApp">
                  <Input
                    value={whatsapp}
                    onChange={(e) => setWhatsapp(e.target.value)}
                    placeholder="Si es distinto al teléfono"
                  />
                </Field>
              </div>
              <Field label="Ciudad">
                <Select value={city} onChange={(e) => setCity(e.target.value)}>
                  {CITIES.map((c) => (
                    <option key={c}>{c}</option>
                  ))}
                </Select>
              </Field>
              <Field label="Dirección">
                <Input
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Barrio y dirección"
                  autoComplete="street-address"
                />
              </Field>
            </>
          )}
          <Field label="Correo">
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
            />
          </Field>
          <Field label="Contraseña">
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={8}
              autoComplete={mode === "crear" ? "new-password" : "current-password"}
            />
          </Field>
          {error && <p className="text-sm text-danger">{error}</p>}
          <Button type="submit" disabled={busy}>
            {busy ? "Espera…" : mode === "crear" ? "Crear cuenta" : "Entrar"}
          </Button>
        </form>

        <p className="mt-6 text-xs leading-relaxed text-subtle">
          Al continuar aceptas los{" "}
          <Link to="/terminos" className="text-muted underline">
            términos
          </Link>
          . La verificación de identidad se hace después, con fotos de tu cédula.
        </p>
      </main>
    </SiteShell>
  );
}
