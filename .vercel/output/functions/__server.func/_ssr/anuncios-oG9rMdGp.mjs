import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { C as require_jsx_runtime, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as Badge } from "./badge-BozmMpG6.mjs";
import { f as formatCop, l as STATUS_LABEL, s as LISTING_LABEL } from "./format-C8tXPYk_.mjs";
import { t as Button } from "./button-CsbLcD7M.mjs";
import { t as VerifiedBadge } from "./verified-badge-CzmIBawr.mjs";
import { h as adminSetVehicleStatus, u as adminListVehicles } from "./router-C_w5OZSs.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/anuncios-oG9rMdGp.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Anuncios() {
	const [rows, setRows] = (0, import_react.useState)([]);
	async function reload() {
		setRows(await adminListVehicles());
	}
	(0, import_react.useEffect)(() => {
		reload().catch(() => setRows([]));
	}, []);
	const pending = rows.filter((v) => v.status === "pendiente_revision").length;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "font-display text-3xl font-semibold",
			children: "Anuncios"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "mt-1 text-sm text-muted",
			children: [
				rows.length,
				" publicados. ",
				pending,
				" en espera de aprobación."
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "mt-6 grid gap-3",
			children: rows.map((v) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
				className: "flex flex-col gap-3 rounded-xl bg-surface p-4 shadow-[var(--shadow-border)] sm:flex-row sm:items-center",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: v.imageUrl,
						alt: "",
						className: "h-20 w-full rounded-lg object-cover sm:w-32"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-0 flex-1",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/vehiculo/$id",
								params: { id: String(v.id) },
								className: "font-medium",
								children: v.title
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-sm text-muted",
								children: [
									v.sellerName,
									" · ",
									v.city,
									" · ",
									formatCop(v.price)
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-2 flex flex-wrap gap-2",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
										tone: v.status === "activo" ? "success" : v.status === "pausado" || v.status === "pendiente_revision" ? "warn" : "neutral",
										children: STATUS_LABEL[v.status]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, { children: LISTING_LABEL[v.listingType] }),
									v.sellerVerified && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(VerifiedBadge, {})
								]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap gap-2",
						children: [v.status === "pendiente_revision" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							size: "sm",
							onClick: () => void adminSetVehicleStatus({ data: {
								id: v.id,
								status: "activo"
							} }).then(reload),
							children: "Aprobar"
						}), [
							"activo",
							"pausado",
							"vendido",
							"rechazado"
						].map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							size: "sm",
							variant: v.status === s ? "default" : "secondary",
							onClick: () => void adminSetVehicleStatus({ data: {
								id: v.id,
								status: s
							} }).then(reload),
							children: STATUS_LABEL[s]
						}, s))]
					})
				]
			}, v.id))
		})
	] });
}
//#endregion
export { Anuncios as component };
