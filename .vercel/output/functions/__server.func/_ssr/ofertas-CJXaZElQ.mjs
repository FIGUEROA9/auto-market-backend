import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { C as require_jsx_runtime, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as Badge } from "./badge-BozmMpG6.mjs";
import { c as STATUS_LABEL, d as formatCop, s as OFFER_TYPE_LABEL } from "./format-ZWbZZFM2.mjs";
import { a as useCurrentUserState, t as RedirectToSignIn } from "./gates-B_IGPI9u.mjs";
import { t as Button } from "./button-CsbLcD7M.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { S as respondOffer, y as listMyOffers } from "./router-MosyGjip.mjs";
import { t as SiteShell } from "./site-shell-DUuezdiF.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/ofertas-CJXaZElQ.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function tone(status) {
	if (status === "pendiente") return "warn";
	if (status === "aceptada") return "success";
	if (status === "rechazada") return "danger";
	return "neutral";
}
function OfferCard({ offer, incoming, onAct }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: "flex gap-4 rounded-xl bg-surface p-4 shadow-[var(--shadow-border)]",
		children: [offer.vehicleImage && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
			src: offer.vehicleImage,
			alt: "",
			className: "hidden h-20 w-28 rounded-lg object-cover sm:block"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "min-w-0 flex-1",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
						tone: tone(offer.status),
						children: STATUS_LABEL[offer.status]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, { children: OFFER_TYPE_LABEL[offer.offerType] })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/vehiculo/$id",
					params: { id: String(offer.vehicleId) },
					className: "mt-2 block font-display text-lg font-semibold",
					children: offer.vehicleTitle
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-1 text-sm text-muted",
					children: [
						incoming ? offer.buyerName ?? "Comprador" : "Tú",
						" ·",
						" ",
						offer.offerType === "compra" && offer.amount != null ? formatCop(offer.amount) : offer.swapTitle ? `Permuta por ${offer.swapTitle}` : "Permuta"
					]
				}),
				offer.message && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm leading-relaxed text-muted",
					children: offer.message
				}),
				incoming && offer.status === "pendiente" && onAct && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-3 flex gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						size: "sm",
						onClick: () => onAct("aceptada"),
						children: "Aceptar"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						size: "sm",
						variant: "outline",
						onClick: () => onAct("rechazada"),
						children: "Rechazar"
					})]
				})
			]
		})]
	});
}
function Ofertas() {
	const { user, isPending } = useCurrentUserState();
	const [data, setData] = (0, import_react.useState)(null);
	async function reload() {
		setData(await listMyOffers());
	}
	(0, import_react.useEffect)(() => {
		if (isPending || !user) return;
		reload().catch(() => setData({
			sent: [],
			received: []
		}));
	}, [user, isPending]);
	if (isPending) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "mx-auto max-w-4xl px-4 py-20",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-40 animate-pulse rounded-xl bg-surface" })
	}) });
	if (!user) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RedirectToSignIn, {});
	async function act(id, status) {
		try {
			await respondOffer({ data: {
				id,
				status
			} });
			toast.success(status === "aceptada" ? "Oferta aceptada. El anuncio pasó a vendido." : "Oferta rechazada.");
			await reload();
		} catch (err) {
			toast.error(err instanceof Error ? err.message : "No se pudo actualizar.");
		}
	}
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
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-sm text-muted",
				children: "Recibidas sobre tus anuncios y las que tú enviaste. Aceptar una cierra el anuncio."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mt-10 font-display text-xl font-semibold",
				children: "Recibidas"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-4 grid gap-3",
				children: data?.received.length ? data.received.map((o) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OfferCard, {
					offer: o,
					incoming: true,
					onAct: (s) => void act(o.id, s)
				}, o.id)) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted",
					children: "Nadie ha ofertado todavía por tus carros."
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mt-10 font-display text-xl font-semibold",
				children: "Enviadas"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-4 grid gap-3",
				children: data?.sent.length ? data.sent.map((o) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OfferCard, { offer: o }, o.id)) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted",
					children: "Aún no envías ofertas. Entra a un anuncio del catálogo."
				})
			})
		]
	}) });
}
//#endregion
export { Ofertas as component };
