import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { C as require_jsx_runtime, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as Badge } from "./badge-BozmMpG6.mjs";
import { c as OFFER_TYPE_LABEL, f as formatCop, l as STATUS_LABEL } from "./format-C8tXPYk_.mjs";
import { a as useCurrentUserState, t as RedirectToSignIn } from "./gates-7MpIqa07.mjs";
import { t as Button } from "./button-CsbLcD7M.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { E as listMyVehicles, O as respondOffer, T as listMyOffers, v as counterOffer } from "./router-C_w5OZSs.mjs";
import { i as Textarea, n as Input, r as Select, t as Field } from "./input-Do1Wrx3v.mjs";
import { t as SiteShell } from "./site-shell-BDUmb5FA.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/ofertas-Dg1fxhh0.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function tone(status) {
	if (status === "pendiente" || status === "contraoferta") return "warn";
	if (status === "aceptada") return "success";
	if (status === "rechazada") return "danger";
	return "neutral";
}
function OfferCard({ offer, userId, mine, onDone }) {
	const incoming = offer.vehicleOwnerId === userId;
	const open = offer.status === "pendiente" || offer.status === "contraoferta";
	const myTurn = open && offer.lastActorId !== userId;
	const [showCounter, setShowCounter] = (0, import_react.useState)(false);
	const [amount, setAmount] = (0, import_react.useState)(offer.amount != null ? String(offer.amount) : "");
	const [swapId, setSwapId] = (0, import_react.useState)(offer.swapVehicleId ? String(offer.swapVehicleId) : "");
	const [message, setMessage] = (0, import_react.useState)("");
	const [busy, setBusy] = (0, import_react.useState)(false);
	async function act(status) {
		setBusy(true);
		try {
			await respondOffer({ data: {
				id: offer.id,
				status
			} });
			toast.success(status === "aceptada" ? "Oferta aceptada. El anuncio pasó a vendido." : "Oferta rechazada.");
			onDone();
		} catch (err) {
			toast.error(err instanceof Error ? err.message : "No se pudo actualizar.");
		} finally {
			setBusy(false);
		}
	}
	async function onCounter(e) {
		e.preventDefault();
		setBusy(true);
		try {
			await counterOffer({ data: {
				id: offer.id,
				amount: amount ? Number(amount) : void 0,
				swapVehicleId: swapId ? Number(swapId) : void 0,
				message
			} });
			toast.success("Contraoferta enviada.");
			setShowCounter(false);
			onDone();
		} catch (err) {
			toast.error(err instanceof Error ? err.message : "No se pudo contraofertar.");
		} finally {
			setBusy(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: "flex flex-col gap-4 rounded-xl bg-surface p-4 shadow-[var(--shadow-border)] sm:flex-row",
		children: [offer.vehicleImage && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
			src: offer.vehicleImage,
			alt: "",
			className: "h-24 w-full rounded-lg object-cover sm:h-20 sm:w-28"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "min-w-0 flex-1",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap items-center gap-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
							tone: tone(offer.status),
							children: STATUS_LABEL[offer.status]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, { children: OFFER_TYPE_LABEL[offer.offerType] }),
						incoming && offer.matchesPrefs === false && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
							tone: "warn",
							children: "Fuera de preferencias"
						})
					]
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
						offer.offerType === "compra" && offer.amount != null ? formatCop(offer.amount) : offer.swapTitle ? `Permuta por ${offer.swapTitle}${offer.amount ? ` + ${formatCop(offer.amount)}` : ""}` : "Permuta"
					]
				}),
				offer.message && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm leading-relaxed text-muted",
					children: offer.message
				}),
				offer.events && offer.events.length > 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
					className: "mt-3 grid gap-1 border-l border-border pl-3 text-xs text-subtle",
					children: offer.events.map((ev) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
						ev.actorName ?? "Usuario",
						" · ",
						STATUS_LABEL[ev.action] ?? ev.action,
						ev.amount != null ? ` · ${formatCop(ev.amount)}` : "",
						ev.message ? ` — ${ev.message}` : ""
					] }, ev.id))
				}),
				myTurn && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-3 flex flex-wrap gap-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							size: "sm",
							disabled: busy,
							onClick: () => void act("aceptada"),
							children: "Aceptar"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							size: "sm",
							variant: "outline",
							disabled: busy,
							onClick: () => void act("rechazada"),
							children: "Rechazar"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							size: "sm",
							variant: "secondary",
							disabled: busy,
							onClick: () => setShowCounter((v) => !v),
							children: "Contraofertar"
						})
					]
				}),
				open && !myTurn && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 text-xs text-subtle",
					children: "Esperando respuesta de la otra parte."
				}),
				showCounter && myTurn && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					onSubmit: onCounter,
					className: "mt-4 grid gap-3 rounded-lg bg-elevated p-3",
					children: [
						offer.offerType === "compra" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Nuevo monto COP",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								type: "number",
								min: 0,
								value: amount,
								onChange: (e) => setAmount(e.target.value),
								required: true
							})
						}),
						offer.offerType === "permuta" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [!incoming && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Tu vehículo",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
								value: swapId,
								onChange: (e) => setSwapId(e.target.value),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "",
									children: "Mantener el actual"
								}), mine.map((v) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: v.id,
									children: v.title
								}, v.id))]
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Diferencia COP (opcional)",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								type: "number",
								min: 0,
								value: amount,
								onChange: (e) => setAmount(e.target.value)
							})
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Mensaje de la contraoferta",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
								value: message,
								onChange: (e) => setMessage(e.target.value),
								required: true,
								minLength: 2
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "submit",
							size: "sm",
							disabled: busy,
							children: busy ? "Enviando…" : "Enviar contraoferta"
						})
					]
				})
			]
		})]
	});
}
function Ofertas() {
	const { user, isPending } = useCurrentUserState();
	const [data, setData] = (0, import_react.useState)(null);
	const [mine, setMine] = (0, import_react.useState)([]);
	async function reload() {
		const [offers, vehicles] = await Promise.all([listMyOffers(), listMyVehicles()]);
		setData(offers);
		setMine(vehicles.filter((v) => v.status === "activo"));
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
				children: "Recibidas sobre tus anuncios y las que tú enviaste. Puedes aceptar, rechazar o contraofertar. Aceptar una cierra el anuncio."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mt-10 font-display text-xl font-semibold",
				children: "Recibidas"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-4 grid gap-3",
				children: data?.received.length ? data.received.map((o) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OfferCard, {
					offer: o,
					userId: user.id,
					mine,
					onDone: () => void reload()
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
				children: data?.sent.length ? data.sent.map((o) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OfferCard, {
					offer: o,
					userId: user.id,
					mine,
					onDone: () => void reload()
				}, o.id)) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted",
					children: "Aún no envías ofertas. Entra a un anuncio del catálogo."
				})
			})
		]
	}) });
}
//#endregion
export { Ofertas as component };
