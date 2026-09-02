import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { GROK_PROVIDERS, authClient, authEnabled, signIn } from "@/lib/auth/client";
import { useCurrentUserState } from "@/lib/auth/use-current-user";
import { SiteShell } from "@/components/site-shell";
import { Button } from "@/components/ui/button";
import { Field, Input } from "@/components/ui/input";

export const Route = createFileRoute("/login")({ component: Login });

function Login() {
  const navigate = useNavigate();
  const { user, isPending } = useCurrentUserState();
  const [mode, setMode] = useState<"entrar" | "crear">("entrar");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
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
        const res = await authClient.signUp.email({ email, password, name });
        if (res.error) throw new Error(res.error.message || "No se pudo crear la cuenta.");
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
      <main className="mx-auto grid min-h-[70vh] max-w-md content-center px-4 py-16">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-subtle">Cuenta</p>
        <h1 className="mt-2 font-display text-3xl font-semibold">
          {mode === "entrar" ? "Entra a AutoMarket" : "Crea tu cuenta"}
        </h1>
        <p className="mt-2 text-sm text-muted">
          El primer usuario en registrarse obtiene el panel de administración.
        </p>

        <div className="mt-6 grid grid-cols-2 rounded-lg border border-border p-1">
          {(["entrar", "crear"] as const).map((m) => (
            <button
              key={m}
              type="button"
              onClick={() => setMode(m)}
              className={
                mode === m
                  ? "h-10 rounded-md bg-elevated text-sm font-medium text-fg"
                  : "h-10 rounded-md text-sm text-muted"
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
          <p className="mt-6 text-sm text-muted">El acceso está desactivado.</p>
        )}

        <div className="my-6 flex items-center gap-3 text-xs uppercase tracking-wider text-subtle">
          <span className="h-px flex-1 bg-border" />
          o con correo
          <span className="h-px flex-1 bg-border" />
        </div>

        <form onSubmit={onSubmit} className="grid gap-4">
          {mode === "crear" && (
            <Field label="Nombre">
              <Input value={name} onChange={(e) => setName(e.target.value)} required minLength={2} />
            </Field>
          )}
          <Field label="Correo">
            <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </Field>
          <Field label="Contraseña">
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={8}
            />
          </Field>
          {error && <p className="text-sm text-danger">{error}</p>}
          <Button type="submit" disabled={busy}>
            {busy ? "Procesando…" : mode === "entrar" ? "Entrar" : "Crear cuenta"}
          </Button>
        </form>
        <p className="mt-4 text-xs text-subtle">
          Al continuar aceptas los{" "}
          <Link to="/terminos" className="text-muted underline">
            términos
          </Link>
          .
        </p>
      </main>
    </SiteShell>
  );
}
