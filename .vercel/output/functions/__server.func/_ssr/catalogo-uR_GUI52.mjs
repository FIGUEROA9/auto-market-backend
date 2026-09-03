import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { C as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as BRANDS, r as CITIES } from "./format-C8tXPYk_.mjs";
import { l as Search } from "../_libs/lucide-react.mjs";
import { D as listVehicles, r as Route$16 } from "./router-C_w5OZSs.mjs";
import { n as Input, r as Select } from "./input-Do1Wrx3v.mjs";
import { t as SiteShell } from "./site-shell-BDUmb5FA.mjs";
import { t as VehicleCard } from "./vehicle-card-CSwhjG3a.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/catalogo-uR_GUI52.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Catalogo() {
	const initial = Route$16.useLoaderData();
	const [q, setQ] = (0, import_react.useState)("");
	const [brand, setBrand] = (0, import_react.useState)("");
	const [listingType, setListingType] = (0, import_react.useState)("");
	const [bodyType, setBodyType] = (0, import_react.useState)("");
	const [city, setCity] = (0, import_react.useState)("");
	const [fuel, setFuel] = (0, import_react.useState)("");
	const [minPrice, setMinPrice] = (0, import_react.useState)("");
	const [maxPrice, setMaxPrice] = (0, import_react.useState)("");
	const [verifiedOnly, setVerifiedOnly] = (0, import_react.useState)(false);
	const [items, setItems] = (0, import_react.useState)(initial);
	const [loading, setLoading] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		const t = setTimeout(() => {
			setLoading(true);
			listVehicles({ data: {
				q: q || void 0,
				brand: brand || void 0,
				listingType: listingType || void 0,
				bodyType: bodyType || void 0,
				city: city || void 0,
				fuel: fuel || void 0,
				minPrice: minPrice ? Number(minPrice) : void 0,
				maxPrice: maxPrice ? Number(maxPrice) : void 0,
				verifiedOnly: verifiedOnly || void 0
			} }).then(setItems).catch(() => setItems([])).finally(() => setLoading(false));
		}, 180);
		return () => clearTimeout(t);
	}, [
		q,
		brand,
		listingType,
		bodyType,
		city,
		fuel,
		minPrice,
		maxPrice,
		verifiedOnly
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "mx-auto max-w-6xl px-4 py-10",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs font-semibold uppercase tracking-[0.18em] text-subtle",
				children: "Inventario"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-2 font-display text-4xl font-semibold",
				children: "Catálogo"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 max-w-xl text-sm text-muted",
				children: "Solo anuncios aprobados. Los vendedores verificados llevan sello visible."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-8 grid gap-3 rounded-xl bg-surface p-4 shadow-[var(--shadow-border)] md:grid-cols-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative md:col-span-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-subtle" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							className: "pl-9",
							placeholder: "Marca, línea o ciudad",
							value: q,
							onChange: (e) => setQ(e.target.value),
							suppressHydrationWarning: true
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
						value: brand,
						onChange: (e) => setBrand(e.target.value),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "",
							children: "Todas las marcas"
						}), BRANDS.map((b) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: b,
							children: b
						}, b))]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
						value: listingType,
						onChange: (e) => setListingType(e.target.value),
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "",
								children: "Venta y permuta"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "venta",
								children: "Venta"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "permuta",
								children: "Permuta"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
						value: city,
						onChange: (e) => setCity(e.target.value),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "",
							children: "Todas las ciudades"
						}), CITIES.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: c,
							children: c
						}, c))]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
						value: bodyType,
						onChange: (e) => setBodyType(e.target.value),
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "",
								children: "Carrocería"
							}),
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
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
						value: fuel,
						onChange: (e) => setFuel(e.target.value),
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "",
								children: "Combustible"
							}),
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
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						type: "number",
						min: 0,
						placeholder: "Precio min",
						value: minPrice,
						onChange: (e) => setMinPrice(e.target.value)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						type: "number",
						min: 0,
						placeholder: "Precio max",
						value: maxPrice,
						onChange: (e) => setMaxPrice(e.target.value)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "flex items-center gap-2 text-sm text-muted md:col-span-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "checkbox",
							checked: verifiedOnly,
							onChange: (e) => setVerifiedOnly(e.target.checked)
						}), "Solo vendedores verificados"]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-5 text-sm text-muted",
				children: loading ? "Buscando…" : `${items.length} vehículo${items.length === 1 ? "" : "s"}`
			}),
			items.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-16 text-center text-sm text-muted",
				children: "No hay vehículos con esos filtros."
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3",
				children: items.map((v) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(VehicleCard, { vehicle: v }, v.id))
			})
		]
	}) });
}
//#endregion
export { Catalogo as component };
