import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { C as require_jsx_runtime, x as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { l as STOCK_IMAGES, n as BRANDS, r as CITIES } from "./format-ZWbZZFM2.mjs";
import { a as useCurrentUserState, t as RedirectToSignIn } from "./gates-B_IGPI9u.mjs";
import { t as Button } from "./button-CsbLcD7M.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { m as createVehicle } from "./router-MosyGjip.mjs";
import { t as SiteShell } from "./site-shell-DUuezdiF.mjs";
import { i as Textarea, n as Input, r as Select, t as Field } from "./input-Do1Wrx3v.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/publicar-D30obizA.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Publicar() {
	const { user, isPending } = useCurrentUserState();
	const navigate = useNavigate();
	const [busy, setBusy] = (0, import_react.useState)(false);
	const [imageUrl, setImageUrl] = (0, import_react.useState)(STOCK_IMAGES[0].src);
	if (isPending) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "mx-auto max-w-2xl px-4 py-20",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-40 animate-pulse rounded-xl bg-surface" })
	}) });
	if (!user) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RedirectToSignIn, {});
	async function onSubmit(e) {
		e.preventDefault();
		const fd = new FormData(e.currentTarget);
		setBusy(true);
		try {
			const res = await createVehicle({ data: {
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
				listingType: String(fd.get("listingType"))
			} });
			toast.success("Anuncio publicado.");
			navigate({
				to: "/vehiculo/$id",
				params: { id: String(res.id) }
			});
		} catch (err) {
			toast.error(err instanceof Error ? err.message : "No se pudo publicar.");
		} finally {
			setBusy(false);
		}
	}
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
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				onSubmit,
				className: "mt-8 grid gap-4",
				children: [
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
							label: "Modelo",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								name: "model",
								required: true
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
								defaultValue: "venta",
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
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
									name: "fuel",
									defaultValue: "gasolina",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "gasolina",
											children: "Gasolina"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "diesel",
											children: "Diésel"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "hibrido",
											children: "Híbrido"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "electrico",
											children: "Eléctrico"
										})
									]
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
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
									name: "bodyType",
									defaultValue: "sedan",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "sedan",
											children: "Sedán"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "suv",
											children: "SUV"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "pickup",
											children: "Pickup"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "hatchback",
											children: "Hatchback"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "van",
											children: "Van"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "coupe",
											children: "Coupé"
										})
									]
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
							placeholder: "Estado, papeles, extras…"
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mb-2 text-sm font-medium text-muted",
						children: "Foto del anuncio"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid grid-cols-3 gap-2 sm:grid-cols-5",
						children: STOCK_IMAGES.map((img) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => setImageUrl(img.src),
							className: imageUrl === img.src ? "overflow-hidden rounded-md ring-2 ring-accent" : "overflow-hidden rounded-md ring-1 ring-border",
							"aria-label": img.label,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: img.src,
								alt: "",
								className: "aspect-square object-cover"
							})
						}, img.src))
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "submit",
						disabled: busy,
						children: busy ? "Publicando…" : "Publicar"
					})
				]
			})
		]
	}) });
}
//#endregion
export { Publicar as component };
