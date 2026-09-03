import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { C as require_jsx_runtime, x as useNavigate, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as Badge } from "./badge-BozmMpG6.mjs";
import { a as FUEL_LABEL, d as formatCop, f as formatKm, i as CONDITION_LABEL, o as LISTING_LABEL, t as BODY_LABEL, u as TRANS_LABEL } from "./format-ZWbZZFM2.mjs";
import { a as useCurrentUserState, t as RedirectToSignIn } from "./gates-B_IGPI9u.mjs";
import { p as Heart, u as MapPin } from "../_libs/lucide-react.mjs";
import { t as Button } from "./button-CsbLcD7M.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { _ as isFavorite, b as listMyVehicles, n as Route$1, p as createOffer, w as toggleFavorite } from "./router-MosyGjip.mjs";
import { t as SiteShell } from "./site-shell-DUuezdiF.mjs";
import { i as Textarea, n as Input, r as Select, t as Field } from "./input-Do1Wrx3v.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/vehiculo._id-lmhRyob1.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Detalle() {
	const { id } = Route$1.useParams();
	const vehicleId = Number(id);
	const loaded = Route$1.useLoaderData();
	const navigate = useNavigate();
	const { user, isPending } = useCurrentUserState();
	const [vehicle, setVehicle] = (0, import_react.useState)(loaded);
	const [fav, setFav] = (0, import_react.useState)(false);
	const [mine, setMine] = (0, import_react.useState)([]);
	const [offerType, setOfferType] = (0, import_react.useState)("compra");
	const [amount, setAmount] = (0, import_react.useState)("");
	const [swapId, setSwapId] = (0, import_react.useState)("");
	const [message, setMessage] = (0, import_react.useState)("");
	const [needAuth, setNeedAuth] = (0, import_react.useState)(false);
	const [busy, setBusy] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		setVehicle(loaded);
	}, [loaded]);
	(0, import_react.useEffect)(() => {
		if (!user) return;
		isFavorite({ data: { vehicleId } }).then((r) => setFav(r.favorite)).catch(() => void 0);
		listMyVehicles().then((rows) => setMine(rows.filter((v) => v.status === "activo"))).catch(() => setMine([]));
	}, [user, vehicleId]);
	(0, import_react.useEffect)(() => {
		if (!vehicle) return;
		setOfferType(vehicle.listingType === "permuta" ? "permuta" : "compra");
	}, [vehicle]);
	if (vehicle === void 0) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "mx-auto max-w-6xl px-4 py-16",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "aspect-video animate-pulse rounded-xl bg-surface" })
	}) });
	if (!vehicle) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "mx-auto max-w-xl px-4 py-24 text-center",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "font-display text-3xl font-semibold",
			children: "Anuncio no encontrado"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
			to: "/catalogo",
			className: "mt-4 inline-block text-sm text-accent",
			children: "Volver al catálogo"
		})]
	}) });
	if (needAuth) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RedirectToSignIn, {});
	const own = user?.id === vehicle.userId;
	const listingTone = vehicle.listingType === "permuta" ? "warn" : vehicle.listingType === "ambos" ? "accent" : "success";
	async function onFav() {
		if (!user) {
			setNeedAuth(true);
			return;
		}
		try {
			const res = await toggleFavorite({ data: { vehicleId } });
			setFav(res.favorite);
		} catch (err) {
			toast.error(err instanceof Error ? err.message : "No se pudo guardar.");
		}
	}
	async function onOffer(e) {
		e.preventDefault();
		if (!user) {
			setNeedAuth(true);
			return;
		}
		setBusy(true);
		try {
			await createOffer({ data: {
				vehicleId,
				offerType,
				amount: amount ? Number(amount) : void 0,
				swapVehicleId: swapId ? Number(swapId) : void 0,
				message: message || void 0
			} });
			toast.success("Oferta enviada.");
			navigate({ to: "/ofertas" });
		} catch (err) {
			toast.error(err instanceof Error ? err.message : "No se pudo enviar.");
		} finally {
			setBusy(false);
		}
	}
	const specs = [
		{
			label: "Año",
			value: String(vehicle.year)
		},
		{
			label: "Kilometraje",
			value: formatKm(vehicle.mileage)
		},
		{
			label: "Estado",
			value: CONDITION_LABEL[vehicle.condition] ?? vehicle.condition
		},
		{
			label: "Combustible",
			value: FUEL_LABEL[vehicle.fuel] ?? vehicle.fuel
		},
		{
			label: "Caja",
			value: TRANS_LABEL[vehicle.transmission] ?? vehicle.transmission
		},
		{
			label: "Carrocería",
			value: BODY_LABEL[vehicle.bodyType] ?? vehicle.bodyType
		}
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "mx-auto grid max-w-6xl gap-8 px-4 py-10 lg:grid-cols-12",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "lg:col-span-7",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "overflow-hidden rounded-xl bg-surface shadow-[var(--shadow-border)]",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: vehicle.imageUrl,
						alt: vehicle.title,
						className: "aspect-video w-full object-cover"
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3",
					children: specs.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-lg bg-surface px-3 py-3 shadow-[var(--shadow-border)]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs uppercase tracking-wider text-subtle",
							children: s.label
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-sm font-medium",
							children: s.value
						})]
					}, s.label))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-8",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-2xl font-semibold",
						children: "Descripción"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 whitespace-pre-wrap text-sm leading-relaxed text-muted",
						children: vehicle.description
					})]
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("aside", {
			className: "lg:col-span-5",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-xl bg-surface p-6 shadow-[var(--shadow-border)] lg:sticky lg:top-24",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-start justify-between gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
								tone: listingTone,
								children: LISTING_LABEL[vehicle.listingType]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
								className: "mt-3 font-display text-3xl font-semibold",
								children: vehicle.title
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-1 text-sm text-muted",
								children: [
									vehicle.brand,
									" · ",
									vehicle.sellerName ?? "Particular"
								]
							})
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => void onFav(),
							className: "grid size-11 place-items-center rounded-md border border-border",
							"aria-label": fav ? "Quitar de favoritos" : "Guardar en favoritos",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heart, { className: fav ? "size-5 fill-accent text-accent" : "size-5 text-muted" })
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-5 font-display text-3xl font-semibold tabular-nums text-accent",
						children: formatCop(vehicle.price)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-2 inline-flex items-center gap-1 text-sm text-muted",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "size-4" }),
							" ",
							vehicle.city
						]
					}),
					own ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-6 rounded-md bg-elevated px-3 py-3 text-sm text-muted",
						children: [
							"Este anuncio es tuyo. Gestiona ofertas desde",
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/ofertas",
								className: "text-accent",
								children: "Ofertas"
							}),
							"."
						]
					}) : vehicle.status !== "activo" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-6 text-sm text-muted",
						children: "Este anuncio ya no está activo."
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						onSubmit: onOffer,
						className: "mt-6 grid gap-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "Tipo de oferta",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
									value: offerType,
									onChange: (e) => setOfferType(e.target.value),
									children: [vehicle.listingType !== "permuta" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "compra",
										children: "Compra"
									}), vehicle.listingType !== "venta" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "permuta",
										children: "Permuta"
									})]
								})
							}),
							offerType === "compra" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "Monto (COP)",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									type: "number",
									min: 0,
									value: amount,
									onChange: (e) => setAmount(e.target.value),
									required: true,
									placeholder: "65000000"
								})
							}),
							offerType === "permuta" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "Tu vehículo",
								children: mine.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-sm text-muted",
									children: [
										"Publica un anuncio propio para permutar.",
										" ",
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
											to: "/publicar",
											className: "text-accent",
											children: "Publicar"
										})
									]
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
									value: swapId,
									onChange: (e) => setSwapId(e.target.value),
									required: true,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "",
										children: "Elige uno de tus anuncios"
									}), mine.map((v) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: v.id,
										children: v.title
									}, v.id))]
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "Mensaje",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
									value: message,
									onChange: (e) => setMessage(e.target.value),
									placeholder: "Cuéntale al vendedor cómo quieres cerrar."
								})
							}),
							isPending ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-11 animate-pulse rounded-md bg-elevated" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								type: "submit",
								disabled: busy || offerType === "permuta" && mine.length === 0,
								children: busy ? "Enviando…" : "Enviar oferta"
							})
						]
					})
				]
			})
		})]
	}) });
}
//#endregion
export { Detalle as component };
