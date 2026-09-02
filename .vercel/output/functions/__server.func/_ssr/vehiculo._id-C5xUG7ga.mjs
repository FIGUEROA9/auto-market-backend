import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { C as require_jsx_runtime, x as useNavigate, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as Badge } from "./badge-DxsH4oBu.mjs";
import { a as FUEL_LABEL, d as formatKm, i as CONDITION_LABEL, l as TRANS_LABEL, o as LISTING_LABEL, t as BODY_LABEL, u as formatCop } from "./format-BnknwAXq.mjs";
import { a as useCurrentUserState, t as RedirectToSignIn } from "./gates-B_IGPI9u.mjs";
import { p as Heart, u as MapPin } from "../_libs/lucide-react.mjs";
import { t as Button } from "./button-CuuAiOA2.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { _ as isFavorite, b as listMyVehicles, n as Route$1, p as createOffer, w as toggleFavorite } from "./router-BALgUNLD.mjs";
import { t as SiteShell } from "./site-shell-CmKuxx-u.mjs";
import { i as Textarea, n as Input, r as Select, t as Field } from "./input-Do1Wrx3v.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/vehiculo._id-C5xUG7ga.js
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
			className: "font-display text-2xl font-semibold",
			children: "Anuncio no encontrado"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
			to: "/catalogo",
			className: "mt-4 inline-block text-sm text-muted hover:text-fg",
			children: "Volver al catálogo"
		})]
	}) });
	if (needAuth && !isPending && !user) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RedirectToSignIn, {});
	const listingTone = vehicle.listingType === "permuta" ? "warn" : vehicle.listingType === "ambos" ? "accent" : "success";
	async function onFav() {
		if (!user) {
			setNeedAuth(true);
			return;
		}
		try {
			const r = await toggleFavorite({ data: { vehicleId } });
			setFav(r.favorite);
		} catch {
			toast.error("No se pudo actualizar favoritos.");
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
				amount: offerType === "compra" ? Number(amount) : void 0,
				swapVehicleId: offerType === "permuta" ? Number(swapId) : void 0,
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
		["Kilometraje", formatKm(vehicle.mileage)],
		["Combustible", FUEL_LABEL[vehicle.fuel]],
		["Caja", TRANS_LABEL[vehicle.transmission]],
		["Carrocería", BODY_LABEL[vehicle.bodyType]],
		["Estado", CONDITION_LABEL[vehicle.condition]],
		["Ciudad", vehicle.city]
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "mx-auto grid max-w-6xl gap-8 px-4 py-10 lg:grid-cols-5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "lg:col-span-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "overflow-hidden rounded-xl border border-border bg-surface",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: vehicle.imageUrl,
					alt: vehicle.title,
					className: "aspect-video w-full object-cover"
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
						tone: listingTone,
						children: LISTING_LABEL[vehicle.listingType]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "mt-3 font-display text-3xl font-semibold md:text-4xl",
						children: vehicle.title
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-2 flex items-center gap-1 text-sm text-muted",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "size-4" }),
							" ",
							vehicle.city,
							" · ",
							vehicle.year
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 font-display text-3xl font-semibold tabular-nums",
						children: formatCop(vehicle.price)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-6 text-sm leading-relaxed text-muted",
						children: vehicle.description
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dl", {
						className: "mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3",
						children: specs.map(([k, v]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-lg border border-border bg-surface p-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
								className: "text-xs uppercase tracking-wider text-subtle",
								children: k
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
								className: "mt-1 text-sm font-medium",
								children: v
							})]
						}, k))
					})
				]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("aside", {
			className: "lg:col-span-2",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "sticky top-24 rounded-xl border border-border bg-surface p-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-start justify-between gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs uppercase tracking-wider text-subtle",
						children: "Vendedor"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 font-medium",
						children: vehicle.sellerName || "Particular"
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "outline",
						size: "icon",
						onClick: onFav,
						"aria-label": "Favorito",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heart, { className: fav ? "size-4 fill-fg" : "size-4" })
					})]
				}), vehicle.status !== "activo" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-6 text-sm text-muted",
					children: "Este anuncio ya no está activo."
				}) : user && user.id === vehicle.userId ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-6 text-sm text-muted",
					children: "Este es tu anuncio."
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					onSubmit: onOffer,
					className: "mt-6 grid gap-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Tipo de oferta",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
								value: offerType,
								onChange: (e) => setOfferType(e.target.value),
								children: [(vehicle.listingType === "venta" || vehicle.listingType === "ambos") && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "compra",
									children: "Compra"
								}), (vehicle.listingType === "permuta" || vehicle.listingType === "ambos") && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "permuta",
									children: "Permuta"
								})]
							})
						}),
						offerType === "compra" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Monto ofrecido (COP)",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								type: "number",
								min: 0,
								value: amount,
								onChange: (e) => setAmount(e.target.value),
								required: true
							})
						}),
						offerType === "permuta" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Field, {
							label: "Tu vehículo",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
								value: swapId,
								onChange: (e) => setSwapId(e.target.value),
								required: true,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "",
									children: "Selecciona uno de tus anuncios"
								}), mine.map((v) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
									value: v.id,
									children: [
										v.title,
										" · ",
										formatCop(v.price)
									]
								}, v.id))]
							}), mine.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-1 text-xs text-subtle",
								children: [
									"Publica un anuncio primero para permutar.",
									" ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
										to: "/publicar",
										className: "underline",
										children: "Publicar"
									})
								]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Mensaje",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
								value: message,
								onChange: (e) => setMessage(e.target.value),
								placeholder: "Cuéntale al vendedor tu propuesta"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "submit",
							disabled: busy,
							children: busy ? "Enviando…" : "Enviar oferta"
						})
					]
				})]
			})
		})]
	}) });
}
//#endregion
export { Detalle as component };
