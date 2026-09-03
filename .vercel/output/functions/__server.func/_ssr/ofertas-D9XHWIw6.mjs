import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { C as require_jsx_runtime, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as Badge } from "./badge-DxsH4oBu.mjs";
import { l as OFFER_TYPE_LABEL, m as formatCop, u as STATUS_LABEL } from "./format-CKYgwz_q.mjs";
import { s as adminListOffers } from "./router-Ih3cAWOQ.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/ofertas-D9XHWIw6.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function AdminOfertas() {
	const [rows, setRows] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		adminListOffers().then(setRows).catch(() => setRows([]));
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "font-display text-3xl font-semibold",
			children: "Ofertas"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-1 text-sm text-muted",
			children: "Compra y permuta en curso."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
			className: "mt-6 grid gap-3",
			children: [(rows ?? []).map((o) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
				className: "rounded-xl border border-border bg-surface p-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, { children: OFFER_TYPE_LABEL[o.offerType] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
							tone: o.status === "pendiente" ? "warn" : "neutral",
							children: STATUS_LABEL[o.status] ?? o.status
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/vehiculo/$id",
						params: { id: String(o.vehicleId) },
						className: "mt-2 block font-medium",
						children: o.vehicleTitle
					}),
					o.amount != null && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm tabular-nums text-muted",
						children: formatCop(o.amount)
					}),
					o.swapTitle && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-sm text-muted",
						children: ["Permuta: ", o.swapTitle]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-xs text-subtle",
						children: o.buyerName || "Comprador"
					})
				]
			}, o.id)), rows?.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted",
				children: "Sin ofertas todavía."
			})]
		})
	] });
}
//#endregion
export { AdminOfertas as component };
