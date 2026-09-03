import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { C as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as Badge } from "./badge-BozmMpG6.mjs";
import { l as STATUS_LABEL } from "./format-C8tXPYk_.mjs";
import { t as Button } from "./button-CsbLcD7M.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { d as adminListVerifications, f as adminReviewVerification } from "./router-C_w5OZSs.mjs";
import { i as Textarea, t as Field } from "./input-Do1Wrx3v.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/verificaciones-BmI2vpFh.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Verificaciones() {
	const [rows, setRows] = (0, import_react.useState)([]);
	const [notes, setNotes] = (0, import_react.useState)({});
	async function reload() {
		setRows(await adminListVerifications());
	}
	(0, import_react.useEffect)(() => {
		reload().catch(() => setRows([]));
	}, []);
	async function review(userId, status) {
		try {
			await adminReviewVerification({ data: {
				userId,
				status,
				note: notes[userId] || void 0
			} });
			toast.success(status === "verificado" ? "Usuario verificado. Sus anuncios en cola salieron al catálogo." : "Solicitud rechazada.");
			await reload();
		} catch (err) {
			toast.error(err instanceof Error ? err.message : "No se pudo resolver.");
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "font-display text-3xl font-semibold",
			children: "Verificaciones"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-1 text-sm text-muted",
			children: "Revisa frente y reverso de la cédula. Al aprobar, los anuncios pendientes de esa persona se publican."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
			className: "mt-6 grid gap-4",
			children: [rows.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
				className: "text-sm text-muted",
				children: "No hay solicitudes."
			}), rows.map((u) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
				className: "rounded-xl bg-surface p-4 shadow-[var(--shadow-border)]",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-medium",
							children: u.displayName
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
							tone: u.verificationStatus === "verificado" ? "success" : u.verificationStatus === "pendiente" ? "warn" : "danger",
							children: STATUS_LABEL[u.verificationStatus]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-1 text-sm text-muted",
						children: [
							u.documentType,
							" ",
							u.documentNumber,
							" · ",
							u.email,
							" · ",
							u.city
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-4 grid gap-3 sm:grid-cols-2",
						children: [u.idFrontUrl ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: u.idFrontUrl,
							alt: "Frente cédula",
							className: "h-40 w-full rounded-md object-cover"
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "grid h-40 place-items-center rounded-md bg-elevated text-sm text-muted",
							children: "Sin frente"
						}), u.idBackUrl ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: u.idBackUrl,
							alt: "Reverso cédula",
							className: "h-40 w-full rounded-md object-cover"
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "grid h-40 place-items-center rounded-md bg-elevated text-sm text-muted",
							children: "Sin reverso"
						})]
					}),
					u.verificationStatus === "pendiente" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-4 grid gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Nota (opcional)",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
								value: notes[u.userId] ?? "",
								onChange: (e) => setNotes((n) => ({
									...n,
									[u.userId]: e.target.value
								})),
								placeholder: "Motivo si rechazas, o comentario interno."
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-wrap gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								size: "sm",
								onClick: () => void review(u.userId, "verificado"),
								children: "Aprobar"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								size: "sm",
								variant: "danger",
								onClick: () => void review(u.userId, "rechazado"),
								children: "Rechazar"
							})]
						})]
					})
				]
			}, u.userId))]
		})
	] });
}
//#endregion
export { Verificaciones as component };
