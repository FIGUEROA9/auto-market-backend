import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { C as require_jsx_runtime, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as Badge } from "./badge-DxsH4oBu.mjs";
import { l as OFFER_TYPE_LABEL, m as formatCop, u as STATUS_LABEL } from "./format-CKYgwz_q.mjs";
import { a as useCurrentUserState, t as RedirectToSignIn } from "./gates-DiqTagne.mjs";
import { t as Button } from "./button-CuuAiOA2.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { S as listMyOffers, T as respondOffer } from "./router-Ih3cAWOQ.mjs";
import { t as SiteShell } from "./site-shell-XNI7BQoO.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/ofertas-Ci_T7Vvs.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function toneFor(status) {
	if (status === "aceptada") return "success";
	if (status === "rechazada") return "danger";
	if (status === "cerrada") return "neutral";
	return "warn";
}
function OfferList({ items, incoming, onChange }) {
	if (!items.length) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "text-sm text-muted",
		children: "Nada por aquí todavía."
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
		className: "grid gap-3",
		children: items.map((o) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
			className: "rounded-xl border border-border bg-surface p-4",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-start justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, { children: OFFER_TYPE_LABEL[o.offerType] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
							tone: toneFor(o.status),
							children: STATUS_LABEL[o.status] ?? o.status
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/vehiculo/$id",
						params: { id: String(o.vehicleId) },
						className: "mt-2 block font-medium hover:underline",
						children: o.vehicleTitle
					}),
					o.offerType === "compra" && o.amount != null && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-sm tabular-nums text-muted",
						children: formatCop(o.amount)
					}),
					o.offerType === "permuta" && o.swapTitle && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-1 text-sm text-muted",
						children: ["A cambio de: ", o.swapTitle]
					}),
					o.message && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm text-muted",
						children: o.message
					}),
					incoming && o.buyerName && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-2 text-xs text-subtle",
						children: ["De ", o.buyerName]
					})
				] }), incoming && o.status === "pendiente" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						size: "sm",
						onClick: async () => {
							await respondOffer({ data: {
								id: o.id,
								status: "aceptada"
							} });
							toast.success("Oferta aceptada. El anuncio pasa a vendido.");
							onChange();
						},
						children: "Aceptar"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						size: "sm",
						variant: "secondary",
						onClick: async () => {
							await respondOffer({ data: {
								id: o.id,
								status: "rechazada"
							} });
							onChange();
						},
						children: "Rechazar"
					})]
				})]
			})
		}, o.id))
	});
}
function Ofertas() {
	const { user, isPending } = useCurrentUserState();
	const [data, setData] = (0, import_react.useState)(null);
	const [tab, setTab] = (0, import_react.useState)("recibidas");
	function load() {
		listMyOffers().then(setData).catch(() => setData({
			sent: [],
			received: []
		}));
	}
	(0, import_react.useEffect)(() => {
		if (user) load();
	}, [user]);
	if (isPending) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "mx-auto max-w-4xl px-4 py-16",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-32 animate-pulse rounded-xl bg-surface" })
	}) });
	if (!user) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RedirectToSignIn, {});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "mx-auto max-w-4xl px-4 py-10",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs font-semibold uppercase tracking-[0.18em] text-subtle",
				children: "Negociación"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-2 font-display text-4xl font-semibold",
				children: "Ofertas"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-6 grid grid-cols-2 rounded-lg border border-border p-1",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					className: tab === "recibidas" ? "h-10 rounded-md bg-elevated text-sm" : "h-10 text-sm text-muted",
					onClick: () => setTab("recibidas"),
					children: ["Recibidas ", data ? `(${data.received.length})` : ""]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					className: tab === "enviadas" ? "h-10 rounded-md bg-elevated text-sm" : "h-10 text-sm text-muted",
					onClick: () => setTab("enviadas"),
					children: ["Enviadas ", data ? `(${data.sent.length})` : ""]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-6",
				children: data == null ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-32 animate-pulse rounded-xl bg-surface" }) : tab === "recibidas" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OfferList, {
					items: data.received,
					incoming: true,
					onChange: load
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OfferList, {
					items: data.sent,
					onChange: load
				})
			})
		]
	}) });
}
//#endregion
export { Ofertas as component };
