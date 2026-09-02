import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { C as require_jsx_runtime, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as Badge } from "./badge-DxsH4oBu.mjs";
import { c as STATUS_LABEL, o as LISTING_LABEL, u as formatCop } from "./format-BnknwAXq.mjs";
import { t as Button } from "./button-CuuAiOA2.mjs";
import { d as adminSetVehicleStatus, l as adminListVehicles } from "./router-BALgUNLD.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/anuncios-HZU9uLT6.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function AdminAnuncios() {
	const [rows, setRows] = (0, import_react.useState)(null);
	function load() {
		adminListVehicles().then(setRows).catch(() => setRows([]));
	}
	(0, import_react.useEffect)(() => {
		load();
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "font-display text-3xl font-semibold",
			children: "Anuncios"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-1 text-sm text-muted",
			children: "Modera el inventario publicado."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "mt-6 grid gap-3",
			children: (rows ?? []).map((v) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
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
								className: "flex flex-wrap gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, { children: LISTING_LABEL[v.listingType] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
									tone: v.status === "activo" ? "success" : "warn",
									children: STATUS_LABEL[v.status]
								})]
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
									v.sellerName || "Catálogo",
									" · ",
									formatCop(v.price)
								]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex flex-wrap gap-2",
						children: [
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
			}, v.id))
		})
	] });
}
//#endregion
export { AdminAnuncios as component };
