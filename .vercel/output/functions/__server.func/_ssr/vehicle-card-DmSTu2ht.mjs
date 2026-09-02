import { C as require_jsx_runtime, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as Badge } from "./badge-DxsH4oBu.mjs";
import { d as formatKm, o as LISTING_LABEL, t as BODY_LABEL, u as formatCop } from "./format-BnknwAXq.mjs";
import { m as Gauge, u as MapPin } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/vehicle-card-DmSTu2ht.js
var import_jsx_runtime = require_jsx_runtime();
function VehicleCard({ vehicle }) {
	const listingTone = vehicle.listingType === "permuta" ? "warn" : vehicle.listingType === "ambos" ? "accent" : "success";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
		to: "/vehiculo/$id",
		params: { id: String(vehicle.id) },
		className: "group flex flex-col overflow-hidden rounded-xl border border-border bg-surface transition-colors duration-200 hover:border-muted",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative aspect-16/9 overflow-hidden bg-elevated",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: vehicle.imageUrl,
				alt: vehicle.title,
				className: "h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "absolute left-3 top-3",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
					tone: listingTone,
					children: LISTING_LABEL[vehicle.listingType]
				})
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-1 flex-col gap-3 p-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-xs font-medium uppercase tracking-wider text-subtle",
					children: [
						vehicle.brand,
						" · ",
						vehicle.year
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "mt-1 font-display text-lg font-semibold leading-snug text-fg",
					children: vehicle.title
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-display text-xl font-semibold tabular-nums text-fg",
					children: formatCop(vehicle.price)
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-auto flex flex-wrap items-center gap-3 text-xs text-muted",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "inline-flex items-center gap-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Gauge, { className: "size-3.5" }), formatKm(vehicle.mileage)]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "inline-flex items-center gap-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "size-3.5" }), vehicle.city]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: BODY_LABEL[vehicle.bodyType] ?? vehicle.bodyType })
					]
				})
			]
		})]
	});
}
//#endregion
export { VehicleCard as t };
