import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { adminListUsers, adminSetRole, type Profile } from "@/lib/market";

export const Route = createFileRoute("/admin/usuarios")({ component: AdminUsuarios });

function AdminUsuarios() {
  const [rows, setRows] = useState<Profile[] | null>(null);

  function load() {
    adminListUsers()
      .then(setRows)
      .catch(() => setRows([]));
  }

  useEffect(() => {
    load();
  }, []);

  return (
    <div>
      <h1 className="font-display text-3xl font-semibold">Usuarios</h1>
      <p className="mt-1 text-sm text-muted">Cuentas con perfil en AutoMarket.</p>
      <div className="mt-6 overflow-x-auto rounded-xl border border-border">
        <table className="w-full min-w-lg text-left text-sm">
          <thead className="bg-surface text-xs uppercase tracking-wider text-subtle">
            <tr>
              <th className="px-4 py-3">Nombre</th>
              <th className="px-4 py-3">Correo</th>
              <th className="px-4 py-3">Ciudad</th>
              <th className="px-4 py-3">Rol</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody>
            {(rows ?? []).map((u) => (
              <tr key={u.userId} className="border-t border-border">
                <td className="px-4 py-3">{u.displayName}</td>
                <td className="px-4 py-3 text-muted">{u.email || "—"}</td>
                <td className="px-4 py-3 text-muted">{u.city || "—"}</td>
                <td className="px-4 py-3">
                  <Badge tone={u.role === "admin" ? "accent" : "neutral"}>
                    {u.role === "admin" ? "Admin" : "Cliente"}
                  </Badge>
                </td>
                <td className="px-4 py-3 text-right">
                  <Button
                    size="sm"
                    variant="secondary"
                    onClick={async () => {
                      try {
                        await adminSetRole({
                          data: {
                            userId: u.userId,
                            role: u.role === "admin" ? "cliente" : "admin",
                          },
                        });
                        load();
                      } catch (err) {
                        toast.error(err instanceof Error ? err.message : "No se pudo cambiar el rol.");
                      }
                    }}
                  >
                    {u.role === "admin" ? "Hacer cliente" : "Hacer admin"}
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {rows?.length === 0 && (
          <p className="px-4 py-8 text-center text-sm text-muted">Aún no hay perfiles.</p>
        )}
      </div>
    </div>
  );
}
