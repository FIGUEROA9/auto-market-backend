import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { C as require_jsx_runtime, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as Badge } from "./badge-DxsH4oBu.mjs";
import { c as STATUS_LABEL, o as LISTING_LABEL, u as formatCop } from "./format-BnknwAXq.mjs";
import { a as useCurrentUserState, t as RedirectToSignIn } from "./gates-B_IGPI9u.mjs";
import { t as Button } from "./button-CuuAiOA2.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { E as updateVehicleStatus, b as listMyVehicles, h as deleteMyVehicle } from "./router-BALgUNLD.mjs";
import { t as SiteShell } from "./site-shell-CmKuxx-u.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/mis-anuncios-M2KAEAM-.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function MisAnuncios() {
	const { user, isPending } = useCurrentUserState();
	const [rows, setRows] = (0, import_react.useState)(null);
	function load() {
		listMyVehicles().then(setRows).catch(() => setRows([]));
	}
	(0, import_react.useEffect)(() => {
		if (user) load();
	}, [user]);
	if (isPending) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "mx-auto max-w-5xl px-4 py-16",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-32 animate-pulse rounded-xl bg-surface" })
	}) });
	if (!user) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RedirectToSignIn, {});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "mx-auto max-w-5xl px-4 py-10",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-wrap items-end justify-between gap-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs font-semibold uppercase tracking-[0.18em] text-subtle",
				children: "Tu inventario"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-2 font-display text-4xl font-semibold",
				children: "Mis anuncios"
			})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/publicar",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, { children: "Publicar" })
			})]
		}), rows === null ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "mt-8 h-40 animate-pulse rounded-xl bg-surface" }) : rows.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-16 text-sm text-muted",
			children: "Aún no publicas vehículos."
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "mt-8 grid gap-3",
			children: rows.map((v) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
				className: "flex flex-col gap-4 rounded-xl border border-border bg-surface p-4 sm:flex-row sm:items-center",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: v.imageUrl,
						alt: "",
						className: "h-24 w-full rounded-lg object-cover sm:w-40"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-0 flex-1",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-wrap gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, { children: LISTING_LABEL[v.listingType] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
									tone: v.status === "activo" ? "success" : v.status === "vendido" ? "accent" : "warn",
									children: STATUS_LABEL[v.status]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/vehiculo/$id",
								params: { id: String(v.id) },
								className: "mt-1 block truncate font-medium hover:underline",
								children: v.title
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm tabular-nums text-muted",
								children: formatCop(v.price)
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap gap-2",
						children: [
							v.status === "activo" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								size: "sm",
								variant: "secondary",
								onClick: async () => {
									await updateVehicleStatus({ data: {
										id: v.id,
										status: "pausado"
									} });
									load();
								},
								children: "Pausar"
							}),
							v.status === "pausado" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								size: "sm",
								variant: "secondary",
								onClick: async () => {
									await updateVehicleStatus({ data: {
										id: v.id,
										status: "activo"
									} });
									load();
								},
								children: "Activar"
							}),
							v.status !== "vendido" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								size: "sm",
								variant: "outline",
								onClick: async () => {
									await updateVehicleStatus({ data: {
										id: v.id,
										status: "vendido"
									} });
									load();
								},
								children: "Marcar vendido"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								size: "sm",
								variant: "ghost",
								onClick: async () => {
									await deleteMyVehicle({ data: { id: v.id } });
									toast.success("Anuncio eliminado.");
									load();
								},
								children: "Eliminar"
							})
						]
					})
				]
			}, v.id))
		})]
	}) });
}
//#endregion
export { MisAnuncios as component };
