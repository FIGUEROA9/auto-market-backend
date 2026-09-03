import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { C as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as Badge } from "./badge-DxsH4oBu.mjs";
import { p as VERIFICATION_LABEL } from "./format-CKYgwz_q.mjs";
import { t as Button } from "./button-CuuAiOA2.mjs";
import { t as VerifiedBadge } from "./verified-badge-DMvU5z-z.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { c as adminListUsers, f as adminSetVerification, u as adminSetRole } from "./router-Ih3cAWOQ.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/usuarios-BhsNSEFN.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function toneFor(status) {
	if (status === "verificado") return "success";
	if (status === "rechazado") return "danger";
	if (status === "pendiente") return "warn";
	return "neutral";
}
function AdminUsuarios() {
	const [rows, setRows] = (0, import_react.useState)(null);
	const [open, setOpen] = (0, import_react.useState)(null);
	function load() {
		adminListUsers().then(setRows).catch(() => setRows([]));
	}
	(0, import_react.useEffect)(() => {
		load();
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "font-display text-3xl font-semibold",
			children: "Usuarios"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-1 text-sm text-muted",
			children: "Roles y verificación de cédula."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-6 grid gap-3",
			children: [(rows ?? []).map((u) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
				className: "rounded-xl border border-border bg-surface p-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col gap-3 sm:flex-row sm:items-center",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-0 flex-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-wrap items-center gap-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-medium",
									children: u.displayName
								}),
								u.verificationStatus === "verificado" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(VerifiedBadge, { compact: true }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
									tone: toneFor(u.verificationStatus),
									children: VERIFICATION_LABEL[u.verificationStatus]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
									tone: u.role === "admin" ? "accent" : "neutral",
									children: u.role === "admin" ? "Admin" : "Cliente"
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-1 text-sm text-muted",
							children: [
								u.email || "Sin correo",
								" · ",
								u.city || "Sin ciudad"
							]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap gap-2",
						children: [(u.verificationStatus === "pendiente" || u.idFrontUrl) && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							size: "sm",
							variant: "secondary",
							onClick: () => setOpen(open === u.userId ? null : u.userId),
							children: open === u.userId ? "Ocultar docs" : "Ver cédula"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							size: "sm",
							variant: "secondary",
							onClick: async () => {
								try {
									await adminSetRole({ data: {
										userId: u.userId,
										role: u.role === "admin" ? "cliente" : "admin"
									} });
									load();
								} catch (err) {
									toast.error(err instanceof Error ? err.message : "No se pudo cambiar el rol.");
								}
							},
							children: u.role === "admin" ? "Hacer cliente" : "Hacer admin"
						})]
					})]
				}), open === u.userId && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-4 grid gap-3 border-t border-border pt-4 sm:grid-cols-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mb-2 text-xs uppercase tracking-wider text-subtle",
							children: "Frente"
						}), u.idFrontUrl ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: u.idFrontUrl,
							alt: "Cédula frente",
							className: "max-h-56 w-full rounded-md object-contain bg-elevated"
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-muted",
							children: "Sin foto"
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mb-2 text-xs uppercase tracking-wider text-subtle",
							children: "Reverso"
						}), u.idBackUrl ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: u.idBackUrl,
							alt: "Cédula reverso",
							className: "max-h-56 w-full rounded-md object-contain bg-elevated"
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-muted",
							children: "Sin foto"
						})] }),
						u.verificationStatus !== "verificado" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-wrap gap-2 sm:col-span-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								size: "sm",
								onClick: async () => {
									await adminSetVerification({ data: {
										userId: u.userId,
										status: "verificado"
									} });
									toast.success("Usuario verificado.");
									load();
								},
								children: "Verificar"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								size: "sm",
								variant: "outline",
								onClick: async () => {
									await adminSetVerification({ data: {
										userId: u.userId,
										status: "rechazado",
										note: "Documento ilegible o no coincide."
									} });
									toast.success("Verificación rechazada.");
									load();
								},
								children: "Rechazar"
							})]
						})
					]
				})]
			}, u.userId)), rows?.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "px-4 py-8 text-center text-sm text-muted",
				children: "Aún no hay perfiles."
			})]
		})
	] });
}
//#endregion
export { AdminUsuarios as component };
