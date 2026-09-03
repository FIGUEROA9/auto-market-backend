import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { C as require_jsx_runtime, x as useNavigate, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as cn } from "./utils-C_uf36nf.mjs";
import { t as Badge } from "./badge-BozmMpG6.mjs";
import { _ as mailtoHref, d as TRANS_LABEL, f as formatCop, g as isExpiringSoon, h as isExpired, i as CONDITION_LABEL, m as formatKm, o as FUEL_LABEL, p as formatDate, s as LISTING_LABEL, t as BODY_LABEL, v as whatsappHref } from "./format-C8tXPYk_.mjs";
import { a as useCurrentUserState, t as RedirectToSignIn } from "./gates-7MpIqa07.mjs";
import { S as FileCheck, T as ChevronLeft, _ as Mail, d as Play, f as Pause, g as MapPin, n as ZoomOut, p as MessageCircle, r as X, t as ZoomIn, w as ChevronRight, x as FileWarning, y as Heart } from "../_libs/lucide-react.mjs";
import { t as Button } from "./button-CsbLcD7M.mjs";
import { t as VerifiedBadge } from "./verified-badge-CzmIBawr.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { C as isFavorite, E as listMyVehicles, j as toggleFavorite, n as Route$1, y as createOffer } from "./router-C_w5OZSs.mjs";
import { i as Textarea, n as Input, r as Select, t as Field } from "./input-Do1Wrx3v.mjs";
import { t as SiteShell } from "./site-shell-BDUmb5FA.mjs";
import { n as vehicleMatchesPrefs } from "./swap-DrY_1FSC.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/vehiculo._id-Ci9Uvjo9.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ImageGallery({ images, alt }) {
	const slides = images.length ? images : [];
	const [index, setIndex] = (0, import_react.useState)(0);
	const [paused, setPaused] = (0, import_react.useState)(false);
	const [open, setOpen] = (0, import_react.useState)(false);
	const [zoom, setZoom] = (0, import_react.useState)(1);
	(0, import_react.useEffect)(() => {
		setIndex(0);
	}, [slides.join("|")]);
	(0, import_react.useEffect)(() => {
		if (slides.length < 2 || paused || open) return;
		if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
		const t = window.setInterval(() => {
			setIndex((i) => (i + 1) % slides.length);
		}, 4200);
		return () => window.clearInterval(t);
	}, [
		slides.length,
		paused,
		open
	]);
	(0, import_react.useEffect)(() => {
		if (!open) return;
		function onKey(e) {
			if (e.key === "Escape") setOpen(false);
			if (e.key === "ArrowRight") setIndex((i) => (i + 1) % slides.length);
			if (e.key === "ArrowLeft") setIndex((i) => (i - 1 + slides.length) % slides.length);
		}
		window.addEventListener("keydown", onKey);
		return () => window.removeEventListener("keydown", onKey);
	}, [open, slides.length]);
	if (!slides.length) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "aspect-video rounded-xl bg-surface" });
	const current = slides[index] ?? slides[0];
	function prev() {
		setIndex((i) => (i - 1 + slides.length) % slides.length);
	}
	function next() {
		setIndex((i) => (i + 1) % slides.length);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative overflow-hidden rounded-xl bg-surface shadow-[var(--shadow-border)]",
			onMouseEnter: () => setPaused(true),
			onMouseLeave: () => setPaused(false),
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "block w-full",
					onClick: () => {
						setZoom(1);
						setOpen(true);
					},
					"aria-label": "Ampliar foto",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: current,
						alt,
						className: "aspect-video w-full object-cover"
					})
				}),
				slides.length > 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: prev,
						className: "absolute left-3 top-1/2 grid size-11 -translate-y-1/2 place-items-center rounded-md bg-bg/70 text-fg",
						"aria-label": "Foto anterior",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, { className: "size-5" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: next,
						className: "absolute right-3 top-1/2 grid size-11 -translate-y-1/2 place-items-center rounded-md bg-bg/70 text-fg",
						"aria-label": "Foto siguiente",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "size-5" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "absolute bottom-3 left-0 right-0 flex justify-center gap-1.5",
						children: slides.map((src, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							"aria-label": `Foto ${i + 1}`,
							onClick: () => setIndex(i),
							className: cn("h-1.5 rounded-full transition-all", i === index ? "w-6 bg-accent" : "w-2 bg-fg/40")
						}, src + i))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => setPaused((v) => !v),
						className: "absolute right-3 top-3 grid size-9 place-items-center rounded-md bg-bg/70 text-fg",
						"aria-label": paused ? "Reanudar recorrido" : "Pausar recorrido",
						children: paused ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Play, { className: "size-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pause, { className: "size-4" })
					})
				] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "pointer-events-none absolute left-3 top-3 inline-flex items-center gap-1 rounded-md bg-bg/70 px-2 py-1 text-xs text-fg",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ZoomIn, { className: "size-3.5" }), " Zoom"]
				})
			]
		}),
		slides.length > 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-3 grid grid-cols-6 gap-2",
			children: slides.map((src, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				onClick: () => setIndex(i),
				className: cn("overflow-hidden rounded-md", i === index ? "ring-2 ring-accent" : "ring-1 ring-border"),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src,
					alt: "",
					className: "aspect-square object-cover"
				})
			}, src + i))
		}),
		open && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "fixed inset-0 z-50 grid place-items-center bg-bg/90 p-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "absolute right-4 top-4 flex gap-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "grid size-11 place-items-center rounded-md border border-border bg-surface",
						onClick: () => setZoom((z) => Math.min(2.5, z + .4)),
						"aria-label": "Acercar",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ZoomIn, { className: "size-5" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "grid size-11 place-items-center rounded-md border border-border bg-surface",
						onClick: () => setZoom((z) => Math.max(1, z - .4)),
						"aria-label": "Alejar",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ZoomOut, { className: "size-5" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "grid size-11 place-items-center rounded-md border border-border bg-surface",
						onClick: () => setOpen(false),
						"aria-label": "Cerrar",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-5" })
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "max-h-[85dvh] max-w-5xl overflow-auto",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: current,
					alt,
					className: "max-w-none origin-center object-contain",
					style: {
						transform: `scale(${zoom})`,
						width: "min(90vw, 960px)"
					}
				})
			})]
		})
	] });
}
function Row({ label, ok, detail }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-start gap-3 rounded-lg bg-elevated px-3 py-3",
		children: [ok ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileCheck, { className: "mt-0.5 size-4 shrink-0 text-success" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileWarning, { className: "mt-0.5 size-4 shrink-0 text-danger" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-sm font-medium",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-0.5 text-xs leading-relaxed text-muted",
			children: detail
		})] })]
	});
}
function dateStatus(value, name) {
	if (!value) return {
		ok: false,
		detail: `${name} sin fecha registrada.`
	};
	if (isExpired(value)) return {
		ok: false,
		detail: `Venció el ${formatDate(value)}.`
	};
	if (isExpiringSoon(value)) return {
		ok: true,
		detail: `Vence pronto: ${formatDate(value)}.`
	};
	return {
		ok: true,
		detail: `Vigente hasta ${formatDate(value)}.`
	};
}
function PapersPanel({ vehicle }) {
	const soat = dateStatus(vehicle.soatExpires, "SOAT");
	const tecno = dateStatus(vehicle.tecnoExpires, "Tecnomecánica");
	const taxes = vehicle.taxesCurrent ? {
		ok: true,
		detail: "Impuestos al día."
	} : {
		ok: false,
		detail: `${vehicle.taxesDetail || "Impuestos pendientes."}${vehicle.taxesAmount ? ` Valor: ${formatCop(vehicle.taxesAmount)}.` : ""}`
	};
	const fines = vehicle.finesCurrent ? {
		ok: true,
		detail: "Sin comparendos pendientes."
	} : {
		ok: false,
		detail: `${vehicle.finesDetail || "Hay comparendos pendientes."}${vehicle.finesAmount ? ` Valor: ${formatCop(vehicle.finesAmount)}.` : ""}`
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "mt-8",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "font-display text-2xl font-semibold",
			children: "Papeles y obligaciones"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-4 grid gap-2 sm:grid-cols-2",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
					label: "SOAT",
					ok: soat.ok,
					detail: soat.detail
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
					label: "Tecnomecánica",
					ok: tecno.ok,
					detail: tecno.detail
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
					label: "Impuestos",
					ok: taxes.ok,
					detail: taxes.detail
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
					label: "Comparendos",
					ok: fines.ok,
					detail: fines.detail
				})
			]
		})]
	});
}
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
	const selectedSwap = mine.find((v) => String(v.id) === swapId);
	const swapMatch = selectedSwap && vehicle.listingType !== "venta" ? vehicleMatchesPrefs(selectedSwap, vehicle.swapPrefs) : null;
	const preset = `Hola ${vehicle.sellerName ?? ""}, vi tu ${vehicle.title} en AutoMarket (${formatCop(vehicle.price)}) y me interesa. ¿Sigue disponible?`;
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
			label: "Línea",
			value: vehicle.model
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
	const wa = vehicle.sellerWhatsapp ? whatsappHref(vehicle.sellerWhatsapp, preset) : "";
	const mail = vehicle.sellerEmail ? mailtoHref(vehicle.sellerEmail, `Interés en ${vehicle.title}`, preset) : "";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "mx-auto grid max-w-6xl gap-8 px-4 py-10 lg:grid-cols-12",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "lg:col-span-7",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ImageGallery, {
					images: vehicle.images.length ? vehicle.images : [vehicle.imageUrl],
					alt: vehicle.title
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
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PapersPanel, { vehicle }),
				vehicle.listingType !== "venta" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "mt-8",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-2xl font-semibold",
						children: "Permuta"
					}), vehicle.swapPrefs.any ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 text-sm text-muted",
						children: "El vendedor recibe cualquier tipo de vehículo."
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
						className: "mt-3 grid gap-2 text-sm text-muted sm:grid-cols-2",
						children: [
							vehicle.swapPrefs.brand && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: ["Marca: ", vehicle.swapPrefs.brand] }),
							vehicle.swapPrefs.model && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: ["Línea: ", vehicle.swapPrefs.model] }),
							vehicle.swapPrefs.yearMin && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: ["Año desde: ", vehicle.swapPrefs.yearMin] }),
							vehicle.swapPrefs.yearMax && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: ["Año hasta: ", vehicle.swapPrefs.yearMax] }),
							vehicle.swapPrefs.mileageMax != null && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: ["Kilometraje máx.: ", formatKm(vehicle.swapPrefs.mileageMax)] }),
							vehicle.swapPrefs.bodyType && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: ["Carrocería: ", BODY_LABEL[vehicle.swapPrefs.bodyType] ?? vehicle.swapPrefs.bodyType] }),
							vehicle.swapPrefs.fuel && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: ["Combustible: ", FUEL_LABEL[vehicle.swapPrefs.fuel] ?? vehicle.swapPrefs.fuel] }),
							vehicle.swapPrefs.city && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: ["Ciudad: ", vehicle.swapPrefs.city] })
						]
					})]
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
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-wrap gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
									tone: listingTone,
									children: LISTING_LABEL[vehicle.listingType]
								}), vehicle.status !== "activo" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
									tone: "warn",
									children: vehicle.status === "pendiente_revision" ? "En revisión" : vehicle.status
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
								className: "mt-3 font-display text-3xl font-semibold",
								children: vehicle.title
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-1 flex flex-wrap items-center gap-2 text-sm text-muted",
								children: [
									vehicle.brand,
									" · ",
									vehicle.model,
									" · ",
									vehicle.sellerName ?? "Particular",
									vehicle.sellerVerified && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(VerifiedBadge, {})
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
					!own && vehicle.status === "activo" && (wa || mail) && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-5 grid gap-2 sm:grid-cols-2",
						children: [wa && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: wa,
							target: "_blank",
							rel: "noreferrer",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								type: "button",
								className: "w-full",
								variant: "secondary",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageCircle, { className: "size-4" }), " WhatsApp"]
							})
						}), mail && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: mail,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								type: "button",
								className: "w-full",
								variant: "outline",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mail, { className: "size-4" }), " Correo"]
							})
						})]
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
							swapMatch === false && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-warn",
								children: "Este vehículo no coincide del todo con lo que el vendedor quiere recibir. Igual puedes ofertar."
							}),
							offerType === "permuta" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "Diferencia en COP (opcional)",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									type: "number",
									min: 0,
									value: amount,
									onChange: (e) => setAmount(e.target.value),
									placeholder: "Si ofreces plata encima"
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
