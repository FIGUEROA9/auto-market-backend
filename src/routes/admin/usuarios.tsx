import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { adminListUsers, adminSetRole, type Profile } from "@/lib/market";

export const Route = createFileRoute("/admin/usuarios")({ component: Usuarios });

function Usuarios() {
  const [rows, setRows] = useState<Profile[]>([]);

  async function reload() {
    setRows(await adminListUsers());
  }

  useEffect(() => {
    reload().catch(() => setRows([]));
  }, []);

  async function setRole(userId: string, role: "admin" | "cliente") {
    try {
      await adminSetRole({ data: { userId, role } });
      await reload();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "No se pudo cambiar el rol.");
    }
  }

  return (
    <div>
      <h1 className="font-display text-3xl font-semibold">Usuarios</h1>
      <p className="mt-1 text-sm text-muted">{rows.length} perfiles, incluyendo vendedores de demostración.</p>
      <div className="mt-6 overflow-x-auto rounded-xl bg-surface shadow-[var(--shadow-border)]">
        <table className="w-full min-w-lg text-left text-sm">
          <thead className="border-b border-border text-xs uppercase tracking-wider text-subtle">
            <tr>
              <th className="px-4 py-3">Nombre</th>
              <th className="px-4 py-3">Correo</th>
              <th className="px-4 py-3">Ciudad</th>
              <th className="px-4 py-3">Rol</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody>
            {rows.map((u) => (
              <tr key={u.userId} className="border-b border-border last:border-0">
                <td className="px-4 py-3 font-medium">{u.displayName}</td>
                <td className="px-4 py-3 text-muted">{u.email ?? "—"}</td>
                <td className="px-4 py-3 text-muted">{u.city ?? "—"}</td>
                <td className="px-4 py-3">
                  <Badge tone={u.role === "admin" ? "accent" : "neutral"}>{u.role}</Badge>
                </td>
                <td className="px-4 py-3 text-right">
                  {u.role === "admin" ? (
                    <Button size="sm" variant="ghost" onClick={() => void setRole(u.userId, "cliente")}>
                      Quitar admin
                    </Button>
                  ) : (
                    <Button size="sm" variant="secondary" onClick={() => void setRole(u.userId, "admin")}>
                      Hacer admin
                    </Button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
