import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { C as require_jsx_runtime, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as Badge } from "./badge-BozmMpG6.mjs";
import { c as STATUS_LABEL, d as formatCop, s as OFFER_TYPE_LABEL } from "./format-ZWbZZFM2.mjs";
import { s as adminListOffers } from "./router-MosyGjip.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/ofertas-CtNUEQmN.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function OfertasAdmin() {
	const [rows, setRows] = (0, import_react.useState)([]);
	(0, import_react.useEffect)(() => {
		adminListOffers().then(setRows).catch(() => setRows([]));
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "font-display text-3xl font-semibold",
			children: "Ofertas"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "mt-1 text-sm text-muted",
			children: [rows.length, " en total."]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "mt-6 grid gap-3",
			children: rows.map((o) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
				className: "rounded-xl bg-surface p-4 shadow-[var(--shadow-border)]",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
							tone: o.status === "pendiente" ? "warn" : o.status === "aceptada" ? "success" : "neutral",
							children: STATUS_LABEL[o.status]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, { children: OFFER_TYPE_LABEL[o.offerType] })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/vehiculo/$id",
						params: { id: String(o.vehicleId) },
						className: "mt-2 block font-medium",
						children: o.vehicleTitle
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-1 text-sm text-muted",
						children: [
							o.buyerName ?? "Usuario",
							" ·",
							" ",
							o.offerType === "compra" && o.amount != null ? formatCop(o.amount) : o.swapTitle ?? "Permuta"
						]
					}),
					o.message && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm text-muted",
						children: o.message
					})
				]
			}, o.id))
		})
	] });
}
//#endregion
export { OfertasAdmin as component };
