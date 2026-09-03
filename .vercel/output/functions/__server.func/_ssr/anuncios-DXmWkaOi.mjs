import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { C as require_jsx_runtime, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as Badge } from "./badge-DxsH4oBu.mjs";
import { c as LISTING_LABEL, m as formatCop, u as STATUS_LABEL } from "./format-CKYgwz_q.mjs";
import { t as Button } from "./button-CuuAiOA2.mjs";
import { t as VerifiedBadge } from "./verified-badge-DMvU5z-z.mjs";
import { d as adminSetVehicleStatus, l as adminListVehicles } from "./router-Ih3cAWOQ.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/anuncios-DXmWkaOi.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function AdminAnuncios() {
	const [rows, setRows] = (0, import_react.useState)(null);
	const [filter, setFilter] = (0, import_react.useState)("pendiente");
	function load() {
		adminListVehicles().then(setRows).catch(() => setRows([]));
	}
	(0, import_react.useEffect)(() => {
		load();
	}, []);
	const visible = (rows ?? []).filter((v) => filter === "todos" ? true : v.status === "pendiente");
	const pendingCount = (rows ?? []).filter((v) => v.status === "pendiente").length;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "font-display text-3xl font-semibold",
			children: "Anuncios"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "mt-1 text-sm text-muted",
			children: [
				"Nada es público hasta que apruebes. Hay ",
				pendingCount,
				" en revisión."
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-4 flex gap-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				size: "sm",
				variant: filter === "pendiente" ? "default" : "secondary",
				onClick: () => setFilter("pendiente"),
				children: "Pendientes"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				size: "sm",
				variant: filter === "todos" ? "default" : "secondary",
				onClick: () => setFilter("todos"),
				children: "Todos"
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
			className: "mt-6 grid gap-3",
			children: [visible.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
				className: "rounded-xl border border-border bg-surface p-6 text-sm text-muted",
				children: filter === "pendiente" ? "No hay anuncios por aprobar." : "No hay anuncios."
			}), visible.map((v) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
				className: "flex flex-col gap-3 rounded-xl border border-border bg-surface p-4 sm:flex-row sm:items-center",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: v.imageUrl,
						alt: "",
						className: "h-20 w-full rounded-md object-cover sm:w-32"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-0 flex-1",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-wrap items-center gap-2",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, { children: LISTING_LABEL[v.listingType] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
										tone: v.status === "activo" ? "success" : v.status === "rechazado" ? "danger" : "warn",
										children: STATUS_LABEL[v.status]
									}),
									v.sellerVerified && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(VerifiedBadge, { compact: true })
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/vehiculo/$id",
								params: { id: String(v.id) },
								className: "mt-1 block truncate font-medium",
								children: v.title
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-xs text-muted",
								children: [
									v.brand,
									" ",
									v.model,
									" · ",
									v.sellerName || "Catálogo",
									" · ",
									formatCop(v.price)
								]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex flex-wrap gap-2",
						children: v.status === "pendiente" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							size: "sm",
							onClick: async () => {
								await adminSetVehicleStatus({ data: {
									id: v.id,
									status: "activo"
								} });
								load();
							},
							children: "Aprobar"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							size: "sm",
							variant: "outline",
							onClick: async () => {
								await adminSetVehicleStatus({ data: {
									id: v.id,
									status: "rechazado"
								} });
								load();
							},
							children: "Rechazar"
						})] }) : [
							"activo",
							"pausado",
							"rechazado",
							"vendido"
						].map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							size: "sm",
							variant: v.status === s ? "default" : "secondary",
							onClick: async () => {
								await adminSetVehicleStatus({ data: {
									id: v.id,
									status: s
								} });
								load();
							},
							children: STATUS_LABEL[s]
						}, s))
					})
				]
			}, v.id))]
		})
	] });
}
//#endregion
export { AdminAnuncios as component };
