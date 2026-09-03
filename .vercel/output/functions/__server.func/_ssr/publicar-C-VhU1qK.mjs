import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { C as require_jsx_runtime, x as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as CONDITION_LABEL, d as TAX_OPTIONS, f as TRANS_LABEL, i as CITIES, n as BODY_OPTIONS, r as BRANDS, s as FUEL_OPTIONS } from "./format-CKYgwz_q.mjs";
import { a as useCurrentUserState, t as RedirectToSignIn } from "./gates-DiqTagne.mjs";
import { t as Button } from "./button-CuuAiOA2.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { _ as emptySwapPrefs, h as createVehicle } from "./router-Ih3cAWOQ.mjs";
import { t as SiteShell } from "./site-shell-XNI7BQoO.mjs";
import { a as Select, i as Input, n as ChipToggle, o as Textarea, r as Field, t as CheckRow } from "./input-DDfGu04B.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/publicar-C-VhU1qK.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var STOCK_IMAGES = [
	"/vehicles/corolla.jpg",
	"/vehicles/cx5.jpg",
	"/vehicles/onix.jpg",
	"/vehicles/duster.jpg",
	"/vehicles/sportage.jpg",
	"/vehicles/frontier.jpg",
	"/vehicles/ranger.jpg",
	"/vehicles/tiguan.jpg",
	"/vehicles/hilux.jpg",
	"/vehicles/mazda3.jpg"
];
function toggleIn(list, value) {
	const cur = list ?? [];
	return cur.includes(value) ? cur.filter((x) => x !== value) : [...cur, value];
}
function Publicar() {
	const { user, isPending } = useCurrentUserState();
	const navigate = useNavigate();
	const [busy, setBusy] = (0, import_react.useState)(false);
	const [imageUrl, setImageUrl] = (0, import_react.useState)(STOCK_IMAGES[0]);
	const [listingType, setListingType] = (0, import_react.useState)("venta");
	const [impuestosAlDia, setImpuestosAlDia] = (0, import_react.useState)(true);
	const [taxSel, setTaxSel] = (0, import_react.useState)({});
	const [swap, setSwap] = (0, import_react.useState)(emptySwapPrefs());
	const [swapLines, setSwapLines] = (0, import_react.useState)("");
	const taxItems = (0, import_react.useMemo)(() => Object.entries(taxSel).filter(([, amount]) => amount !== "").map(([label, amount]) => ({
		label,
		amount: Number(amount) || 0
	})), [taxSel]);
	if (isPending) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "mx-auto max-w-2xl px-4 py-20",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-40 animate-pulse rounded-xl bg-surface" })
	}) });
	if (!user) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RedirectToSignIn, {});
	async function onSubmit(e) {
		e.preventDefault();
		const fd = new FormData(e.currentTarget);
		if (!impuestosAlDia && taxItems.length === 0) {
			toast.error("Marca qué impuestos no están al día y el valor.");
			return;
		}
		const prefs = {
			...swap,
			any: listingType === "venta" ? true : swap.any,
			lines: swapLines.split(",").map((s) => s.trim()).filter(Boolean)
		};
		setBusy(true);
		try {
			await createVehicle({ data: {
				title: String(fd.get("title")),
				brand: String(fd.get("brand")),
				model: String(fd.get("model")),
				year: Number(fd.get("year")),
				mileage: Number(fd.get("mileage")),
				price: Number(fd.get("price")),
				condition: String(fd.get("condition")),
				fuel: String(fd.get("fuel")),
				transmission: String(fd.get("transmission")),
				bodyType: String(fd.get("bodyType")),
				city: String(fd.get("city")),
				description: String(fd.get("description")),
				imageUrl,
				listingType,
				soatExpiry: String(fd.get("soatExpiry")),
				tecnoExpiry: String(fd.get("tecnoExpiry")),
				impuestosAlDia,
				impuestosItems: impuestosAlDia ? [] : taxItems,
				swapPrefs: prefs
			} });
			toast.success("Anuncio enviado a revisión. Un administrador lo publicará.");
			navigate({ to: "/mis-anuncios" });
		} catch (err) {
			toast.error(err instanceof Error ? err.message : "No se pudo publicar.");
		} finally {
			setBusy(false);
		}
	}
	const acceptsSwap = listingType === "permuta" || listingType === "ambos";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "mx-auto max-w-2xl px-4 py-10",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs font-semibold uppercase tracking-[0.18em] text-subtle",
				children: "Vender o permutar"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-2 font-display text-4xl font-semibold",
				children: "Publicar anuncio"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 text-sm text-muted",
				children: "El anuncio queda en revisión. Solo será público cuando un administrador lo apruebe."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				onSubmit,
				className: "mt-8 grid gap-8",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "grid gap-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "font-display text-lg font-semibold",
								children: "Datos del vehículo"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "Título",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									name: "title",
									required: true,
									minLength: 3,
									placeholder: "Mazda CX-5 Grand Touring 2020"
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid gap-4 sm:grid-cols-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
									label: "Marca",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select, {
										name: "brand",
										required: true,
										defaultValue: "Toyota",
										children: BRANDS.map((b) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: b }, b))
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
									label: "Línea de vehículo",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										name: "model",
										required: true,
										placeholder: "Corolla, CX-5, Onix…"
									})
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid gap-4 sm:grid-cols-3",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
										label: "Año",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
											name: "year",
											type: "number",
											required: true,
											min: 1980,
											max: 2030,
											defaultValue: 2020
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
										label: "Kilometraje",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
											name: "mileage",
											type: "number",
											required: true,
											min: 0,
											defaultValue: 4e4
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
										label: "Precio COP",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
											name: "price",
											type: "number",
											required: true,
											min: 0,
											defaultValue: 5e7
										})
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid gap-4 sm:grid-cols-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
									label: "Estado",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
										name: "condition",
										defaultValue: "usado",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: "usado",
												children: "Usado"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: "seminuevo",
												children: "Seminuevo"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: "nuevo",
												children: "Nuevo"
											})
										]
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
									label: "Operación",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
										name: "listingType",
										value: listingType,
										onChange: (e) => setListingType(e.target.value),
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: "venta",
												children: "Venta"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: "permuta",
												children: "Permuta"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: "ambos",
												children: "Venta o permuta"
											})
										]
									})
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid gap-4 sm:grid-cols-3",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
										label: "Combustible",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select, {
											name: "fuel",
											defaultValue: "gasolina",
											children: FUEL_OPTIONS.map(([v, l]) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: v,
												children: l
											}, v))
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
										label: "Caja",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
											name: "transmission",
											defaultValue: "automatica",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: "automatica",
												children: "Automática"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: "manual",
												children: "Manual"
											})]
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
										label: "Carrocería",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select, {
											name: "bodyType",
											defaultValue: "sedan",
											children: BODY_OPTIONS.map(([v, l]) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: v,
												children: l
											}, v))
										})
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "Ciudad",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select, {
									name: "city",
									defaultValue: "Bogotá",
									children: CITIES.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: c }, c))
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "Descripción",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
									name: "description",
									required: true,
									minLength: 10,
									placeholder: "Estado, extras, historia del vehículo…"
								})
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "grid gap-4 rounded-xl border border-border bg-surface p-4 sm:p-5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "font-display text-lg font-semibold",
								children: "Papeles"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm text-muted",
								children: "SOAT, tecnomecánica e impuestos quedan visibles en el anuncio."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid gap-4 sm:grid-cols-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
									label: "Vigencia SOAT",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										name: "soatExpiry",
										type: "date",
										required: true,
										defaultValue: "2027-01-15"
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
									label: "Vigencia tecnomecánica",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										name: "tecnoExpiry",
										type: "date",
										required: true,
										defaultValue: "2027-03-01"
									})
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CheckRow, {
								label: "Impuestos al día",
								checked: impuestosAlDia,
								onChange: (v) => {
									setImpuestosAlDia(v);
									if (v) setTaxSel({});
								}
							}),
							!impuestosAlDia && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm text-muted",
									children: "¿Cuáles no están al día y cuánto se debe?"
								}), TAX_OPTIONS.map((label) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid grid-cols-[1fr_140px] items-center gap-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CheckRow, {
										label,
										checked: label in taxSel,
										onChange: (on) => {
											setTaxSel((prev) => {
												const next = { ...prev };
												if (on) next[label] = next[label] ?? "";
												else delete next[label];
												return next;
											});
										}
									}), label in taxSel && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										type: "number",
										min: 0,
										placeholder: "Valor COP",
										value: taxSel[label],
										onChange: (e) => setTaxSel((p) => ({
											...p,
											[label]: e.target.value
										})),
										required: true
									})]
								}, label))]
							})
						]
					}),
					acceptsSwap && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "grid gap-4 rounded-xl border border-border bg-surface p-4 sm:p-5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "font-display text-lg font-semibold",
								children: "Qué recibes en permuta"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CheckRow, {
								label: "Recibo cualquier tipo de vehículo",
								checked: swap.any,
								onChange: (any) => setSwap((p) => ({
									...p,
									any
								}))
							}),
							!swap.any && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid gap-4",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mb-2 text-sm font-medium text-muted",
										children: "Marcas"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "flex flex-wrap gap-2",
										children: BRANDS.map((b) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChipToggle, {
											selected: swap.brands?.includes(b) ?? false,
											onToggle: () => setSwap((p) => ({
												...p,
												brands: toggleIn(p.brands, b)
											})),
											children: b
										}, b))
									})] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
										label: "Líneas de vehículo (separadas por coma)",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
											value: swapLines,
											onChange: (e) => setSwapLines(e.target.value),
											placeholder: "Corolla, CX-5, Sportage"
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "grid gap-4 sm:grid-cols-2",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
												label: "Año mínimo",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
													type: "number",
													min: 1980,
													max: 2030,
													value: swap.yearMin ?? "",
													onChange: (e) => setSwap((p) => ({
														...p,
														yearMin: e.target.value ? Number(e.target.value) : void 0
													}))
												})
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
												label: "Año máximo",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
													type: "number",
													min: 1980,
													max: 2030,
													value: swap.yearMax ?? "",
													onChange: (e) => setSwap((p) => ({
														...p,
														yearMax: e.target.value ? Number(e.target.value) : void 0
													}))
												})
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
												label: "Kilometraje máximo",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
													type: "number",
													min: 0,
													value: swap.mileageMax ?? "",
													onChange: (e) => setSwap((p) => ({
														...p,
														mileageMax: e.target.value ? Number(e.target.value) : void 0
													}))
												})
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
												label: "Precio máximo COP",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
													type: "number",
													min: 0,
													value: swap.priceMax ?? "",
													onChange: (e) => setSwap((p) => ({
														...p,
														priceMax: e.target.value ? Number(e.target.value) : void 0
													}))
												})
											})
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mb-2 text-sm font-medium text-muted",
										children: "Estado"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "flex flex-wrap gap-2",
										children: Object.entries(CONDITION_LABEL).map(([k, l]) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChipToggle, {
											selected: swap.conditions?.includes(k) ?? false,
											onToggle: () => setSwap((p) => ({
												...p,
												conditions: toggleIn(p.conditions, k)
											})),
											children: l
										}, k))
									})] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mb-2 text-sm font-medium text-muted",
										children: "Combustible"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "flex flex-wrap gap-2",
										children: FUEL_OPTIONS.map(([k, l]) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChipToggle, {
											selected: swap.fuels?.includes(k) ?? false,
											onToggle: () => setSwap((p) => ({
												...p,
												fuels: toggleIn(p.fuels, k)
											})),
											children: l
										}, k))
									})] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mb-2 text-sm font-medium text-muted",
										children: "Caja"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "flex flex-wrap gap-2",
										children: Object.entries(TRANS_LABEL).map(([k, l]) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChipToggle, {
											selected: swap.transmissions?.includes(k) ?? false,
											onToggle: () => setSwap((p) => ({
												...p,
												transmissions: toggleIn(p.transmissions, k)
											})),
											children: l
										}, k))
									})] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mb-2 text-sm font-medium text-muted",
										children: "Carrocería"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "flex flex-wrap gap-2",
										children: BODY_OPTIONS.map(([k, l]) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChipToggle, {
											selected: swap.bodyTypes?.includes(k) ?? false,
											onToggle: () => setSwap((p) => ({
												...p,
												bodyTypes: toggleIn(p.bodyTypes, k)
											})),
											children: l
										}, k))
									})] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mb-2 text-sm font-medium text-muted",
										children: "Ciudades"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "flex flex-wrap gap-2",
										children: CITIES.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChipToggle, {
											selected: swap.cities?.includes(c) ?? false,
											onToggle: () => setSwap((p) => ({
												...p,
												cities: toggleIn(p.cities, c)
											})),
											children: c
										}, c))
									})] })
								]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mb-2 text-sm font-medium text-muted",
						children: "Foto del anuncio"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid grid-cols-5 gap-2",
						children: STOCK_IMAGES.map((src) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => setImageUrl(src),
							className: imageUrl === src ? "overflow-hidden rounded-md ring-2 ring-accent" : "overflow-hidden rounded-md ring-1 ring-border",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src,
								alt: "",
								className: "aspect-square object-cover"
							})
						}, src))
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "submit",
						disabled: busy,
						children: busy ? "Enviando…" : "Enviar a revisión"
					})
				]
			})
		]
	}) });
}
//#endregion
export { Publicar as component };
