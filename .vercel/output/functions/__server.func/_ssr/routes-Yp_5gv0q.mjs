import { C as require_jsx_runtime, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { _ as ArrowRight, a as Shield, c as RefreshCw, i as Tag } from "../_libs/lucide-react.mjs";
import { t as Button } from "./button-CuuAiOA2.mjs";
import { i as Route$17 } from "./router-Ih3cAWOQ.mjs";
import { t as SiteShell } from "./site-shell-XNI7BQoO.mjs";
import { t as VehicleCard } from "./vehicle-card-UhQN4o1S.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-Yp_5gv0q.js
var import_jsx_runtime = require_jsx_runtime();
function Home() {
	const { vehicles, stats } = Route$17.useLoaderData();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SiteShell, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "relative overflow-hidden",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: "/vehicles/hero.jpg",
					alt: "",
					className: "absolute inset-0 h-full w-full object-cover opacity-40"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-linear-to-r from-bg via-bg/85 to-bg/40" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative mx-auto grid max-w-6xl gap-10 px-4 py-20 md:grid-cols-12 md:py-28",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "md:col-span-7",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs font-semibold uppercase tracking-[0.18em] text-accent",
								children: "Marketplace de vehículos"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
								className: "mt-4 font-display text-4xl font-semibold leading-tight text-fg md:text-6xl",
								children: "Compra, vende o permuta. Sin intermediarios ruidosos."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-5 max-w-lg text-base leading-relaxed text-muted",
								children: "AutoMarket conecta dueños reales. Publica tu carro, haz una oferta de compra o propone una permuta con tu propio vehículo."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-8 flex flex-wrap gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/catalogo",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
										size: "lg",
										children: ["Ver catálogo ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-4" })]
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/publicar",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										size: "lg",
										variant: "outline",
										children: "Publicar anuncio"
									})
								})]
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid grid-cols-2 gap-3 md:col-span-5 md:content-end",
						children: [
							{
								label: "Activos",
								value: stats.active
							},
							{
								label: "En venta",
								value: stats.sale
							},
							{
								label: "Permuta",
								value: stats.swap
							},
							{
								label: "Ciudades",
								value: stats.cities
							}
						].map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-xl border border-border bg-surface/80 p-4 backdrop-blur-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs uppercase tracking-wider text-subtle",
								children: s.label
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 font-display text-3xl font-semibold tabular-nums",
								children: s.value
							})]
						}, s.label))
					})]
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "mx-auto max-w-6xl px-4 py-16",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-6 md:grid-cols-3",
				children: [
					{
						icon: Tag,
						title: "Comprar",
						text: "Filtra por marca, ciudad y tipo. Envía una oferta formal al vendedor."
					},
					{
						icon: Shield,
						title: "Vender",
						text: "Publica fotos, papeles y precio. Un administrador aprueba antes de que sea público."
					},
					{
						icon: RefreshCw,
						title: "Permutar",
						text: "Define qué marcas, línea y kilometraje recibes, o acepta cualquier vehículo."
					}
				].map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-xl border border-border bg-surface p-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(item.icon, { className: "size-5 text-accent" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "mt-4 font-display text-xl font-semibold",
							children: item.title
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-sm leading-relaxed text-muted",
							children: item.text
						})
					]
				}, item.title))
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mx-auto max-w-6xl px-4 pb-20",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-8 flex items-end justify-between gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs font-semibold uppercase tracking-[0.16em] text-subtle",
					children: "Selección"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-2 font-display text-3xl font-semibold",
					children: "Destacados"
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/catalogo",
					className: "text-sm text-muted hover:text-fg",
					children: "Ver todos"
				})]
			}), vehicles.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted",
				children: "Aún no hay anuncios activos."
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-3",
				children: vehicles.map((v) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(VehicleCard, { vehicle: v }, v.id))
			})]
		})
	] });
}
//#endregion
export { Home as component };
