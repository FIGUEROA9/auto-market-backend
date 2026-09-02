import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { adminDeleteContact, adminListContacts, type ContactRow } from "@/lib/market";

export const Route = createFileRoute("/admin/contactos")({ component: AdminContactos });

function AdminContactos() {
  const [rows, setRows] = useState<ContactRow[] | null>(null);

  function load() {
    adminListContacts()
      .then(setRows)
      .catch(() => setRows([]));
  }

  useEffect(() => {
    load();
  }, []);

  return (
    <div>
      <h1 className="font-display text-3xl font-semibold">Contactos</h1>
      <p className="mt-1 text-sm text-muted">Mensajes del formulario público.</p>
      <ul className="mt-6 grid gap-3">
        {(rows ?? []).map((c) => (
          <li key={c.id} className="rounded-xl border border-border bg-surface p-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="font-medium">{c.name}</p>
                <p className="text-xs text-subtle">
                  {c.email} · {c.phone}
                </p>
                {c.subject && <p className="mt-2 text-sm">{c.subject}</p>}
                <p className="mt-2 text-sm text-muted">{c.message}</p>
              </div>
              <Button
                size="sm"
                variant="ghost"
                onClick={async () => {
                  await adminDeleteContact({ data: { id: c.id } });
                  load();
                }}
              >
                Eliminar
              </Button>
            </div>
          </li>
        ))}
        {rows?.length === 0 && <p className="text-sm text-muted">No hay mensajes.</p>}
      </ul>
    </div>
  );
}
