import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { C as require_jsx_runtime, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as Badge } from "./badge-BozmMpG6.mjs";
import { c as OFFER_TYPE_LABEL, f as formatCop, l as STATUS_LABEL, s as LISTING_LABEL } from "./format-C8tXPYk_.mjs";
import { a as Bar, c as ResponsiveContainer, i as XAxis, l as Tooltip, n as BarChart, o as Pie, r as YAxis, s as Cell, t as PieChart } from "../_libs/recharts+[...].mjs";
import { g as adminStats } from "./router-C_w5OZSs.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin-8yDo0lt1.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var COLORS = [
	"var(--color-accent)",
	"var(--color-subtle)",
	"var(--color-success)",
	"var(--color-warn)"
];
function AdminHome() {
	const [data, setData] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		adminStats().then(setData).catch(() => setData(null));
	}, []);
	if (!data) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-48 animate-pulse rounded-xl bg-surface" });
	const cards = [
		{
			label: "Usuarios",
			value: data.users
		},
		{
			label: "Anuncios",
			value: data.vehicles
		},
		{
			label: "Ofertas abiertas",
			value: data.pending
		},
		{
			label: "Contactos",
			value: data.contacts
		},
		{
			label: "Anuncios en revisión",
			value: data.pendingListings
		},
		{
			label: "Verificaciones",
			value: data.pendingVerifications
		}
	];
	const pie = data.byType.map((r) => ({
		name: LISTING_LABEL[r.listing_type] ?? r.listing_type,
		value: r.c
	}));
	const bars = data.byCity.map((r) => ({
		name: r.city,
		n: r.c
	}));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "font-display text-3xl font-semibold",
			children: "Panel"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-1 text-sm text-muted",
			children: "Actividad del marketplace."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-3",
			children: cards.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-xl bg-surface p-5 shadow-[var(--shadow-border)]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs uppercase tracking-wider text-subtle",
					children: c.label
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 font-display text-3xl font-semibold tabular-nums",
					children: c.value
				})]
			}, c.label))
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-4 flex flex-wrap gap-3 text-sm",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/admin/anuncios",
				className: "text-accent",
				children: "Revisar anuncios"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/admin/verificaciones",
				className: "text-accent",
				children: "Revisar verificaciones"
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-8 grid gap-6 lg:grid-cols-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-xl bg-surface p-5 shadow-[var(--shadow-border)]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-lg font-semibold",
					children: "Por operación"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "h-56",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
						width: "100%",
						height: "100%",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PieChart, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pie, {
							data: pie,
							dataKey: "value",
							nameKey: "name",
							innerRadius: 50,
							outerRadius: 80,
							children: pie.map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cell, { fill: COLORS[i % COLORS.length] }, i))
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, { contentStyle: {
							background: "var(--color-surface)",
							border: "1px solid var(--color-border)",
							color: "var(--color-fg)"
						} })] })
					})
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-xl bg-surface p-5 shadow-[var(--shadow-border)]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-lg font-semibold",
					children: "Activos por ciudad"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "h-56",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
						width: "100%",
						height: "100%",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(BarChart, {
							data: bars,
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
									dataKey: "name",
									tick: {
										fill: "var(--color-muted)",
										fontSize: 11
									}
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
									allowDecimals: false,
									tick: {
										fill: "var(--color-muted)",
										fontSize: 11
									}
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, { contentStyle: {
									background: "var(--color-surface)",
									border: "1px solid var(--color-border)",
									color: "var(--color-fg)"
								} }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
									dataKey: "n",
									fill: "var(--color-accent)",
									radius: [
										4,
										4,
										0,
										0
									]
								})
							]
						})
					})
				})]
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-8 rounded-xl bg-surface p-5 shadow-[var(--shadow-border)]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-display text-lg font-semibold",
				children: "Ofertas recientes"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
				className: "mt-4 grid gap-3",
				children: [data.recentOffers.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
					className: "text-sm text-muted",
					children: "Todavía no hay ofertas."
				}), data.recentOffers.map((o) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "flex flex-wrap items-center justify-between gap-2 text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
						o.buyerName ?? "Usuario",
						" · ",
						o.vehicleTitle,
						" · ",
						OFFER_TYPE_LABEL[o.offerType],
						o.amount ? ` · ${formatCop(o.amount)}` : ""
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
						tone: o.status === "pendiente" || o.status === "contraoferta" ? "warn" : o.status === "aceptada" ? "success" : "neutral",
						children: STATUS_LABEL[o.status]
					})]
				}, o.id))]
			})]
		})
	] });
}
//#endregion
export { AdminHome as component };
