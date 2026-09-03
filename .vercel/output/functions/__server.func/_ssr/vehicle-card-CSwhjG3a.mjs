import { C as require_jsx_runtime, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as Badge } from "./badge-BozmMpG6.mjs";
import { f as formatCop, m as formatKm, s as LISTING_LABEL, t as BODY_LABEL } from "./format-C8tXPYk_.mjs";
import { b as Gauge, g as MapPin } from "../_libs/lucide-react.mjs";
import { t as VerifiedBadge } from "./verified-badge-CzmIBawr.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/vehicle-card-CSwhjG3a.js
var import_jsx_runtime = require_jsx_runtime();
function VehicleCard({ vehicle }) {
	const listingTone = vehicle.listingType === "permuta" ? "warn" : vehicle.listingType === "ambos" ? "accent" : "success";
	const cover = vehicle.images[0] ?? vehicle.imageUrl;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
		to: "/vehiculo/$id",
		params: { id: String(vehicle.id) },
		className: "group flex flex-col overflow-hidden rounded-xl bg-surface shadow-[var(--shadow-border)] transition-[transform,box-shadow] duration-200 hover:-translate-y-0.5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative aspect-video overflow-hidden bg-elevated",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: cover,
					alt: vehicle.title,
					className: "h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "absolute left-3 top-3 flex flex-wrap gap-1.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
						tone: listingTone,
						children: LISTING_LABEL[vehicle.listingType]
					}), vehicle.sellerVerified && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(VerifiedBadge, {})]
				}),
				vehicle.images.length > 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "absolute bottom-3 right-3 rounded-full bg-bg/70 px-2 py-0.5 text-xs text-fg",
					children: [vehicle.images.length, " fotos"]
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-1 flex-col gap-3 p-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-xs font-medium uppercase tracking-wider text-subtle",
					children: [
						vehicle.brand,
						" · ",
						vehicle.model,
						" · ",
						vehicle.year
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "mt-1 font-display text-lg font-semibold leading-snug text-fg",
					children: vehicle.title
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-display text-xl font-semibold tabular-nums text-accent",
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
