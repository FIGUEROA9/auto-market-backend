import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { C as require_jsx_runtime, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as Badge } from "./badge-BozmMpG6.mjs";
import { f as formatCop, l as STATUS_LABEL, s as LISTING_LABEL } from "./format-C8tXPYk_.mjs";
import { a as useCurrentUserState, t as RedirectToSignIn } from "./gates-7MpIqa07.mjs";
import { t as Button } from "./button-CsbLcD7M.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { E as listMyVehicles, N as updateVehicleStatus, x as deleteMyVehicle } from "./router-C_w5OZSs.mjs";
import { t as SiteShell } from "./site-shell-BDUmb5FA.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/mis-anuncios-D2ntMxJs.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function toneFor(status) {
	if (status === "activo") return "success";
	if (status === "pausado" || status === "pendiente_revision") return "warn";
	if (status === "vendido") return "accent";
	return "danger";
}
function MisAnuncios() {
	const { user, isPending } = useCurrentUserState();
	const [items, setItems] = (0, import_react.useState)(null);
	async function reload() {
		const rows = await listMyVehicles();
		setItems(rows);
	}
	(0, import_react.useEffect)(() => {
		if (isPending || !user) return;
		reload().catch(() => setItems([]));
	}, [user, isPending]);
	if (isPending) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "mx-auto max-w-4xl px-4 py-20",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-40 animate-pulse rounded-xl bg-surface" })
	}) });
	if (!user) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RedirectToSignIn, {});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "mx-auto max-w-4xl px-4 py-10",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-end justify-between gap-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs font-semibold uppercase tracking-[0.18em] text-subtle",
				children: "Tu inventario"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-2 font-display text-4xl font-semibold",
				children: "Mis anuncios"
			})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/publicar",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					size: "sm",
					children: "Publicar"
				})
			})]
		}), items === null ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "mt-8 h-32 animate-pulse rounded-xl bg-surface" }) : items.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-16 text-center text-sm text-muted",
			children: "Todavía no publicas. Empieza con un anuncio para poder permutar."
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "mt-8 grid gap-3",
			children: items.map((v) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
				className: "flex flex-col gap-4 rounded-xl bg-surface p-4 shadow-[var(--shadow-border)] sm:flex-row sm:items-center",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: v.imageUrl,
						alt: "",
						className: "h-24 w-full rounded-lg object-cover sm:w-36"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-0 flex-1",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/vehiculo/$id",
								params: { id: String(v.id) },
								className: "font-display text-lg font-semibold",
								children: v.title
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-sm tabular-nums text-muted",
								children: formatCop(v.price)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-2 flex flex-wrap gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
									tone: toneFor(v.status),
									children: STATUS_LABEL[v.status] ?? v.status
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, { children: LISTING_LABEL[v.listingType] })]
							}),
							v.status === "pendiente_revision" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-xs text-muted",
								children: "En revisión. Si verificas tu cuenta, los siguientes anuncios salen de inmediato."
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap gap-2",
						children: [
							v.status === "pausado" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								size: "sm",
								variant: "secondary",
								onClick: () => void updateVehicleStatus({ data: {
									id: v.id,
									status: "activo"
								} }).then(reload),
								children: "Activar"
							}),
							v.status === "activo" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								size: "sm",
								variant: "secondary",
								onClick: () => void updateVehicleStatus({ data: {
									id: v.id,
									status: "pausado"
								} }).then(reload),
								children: "Pausar"
							}),
							v.status !== "vendido" && v.status !== "pendiente_revision" && v.status !== "rechazado" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								size: "sm",
								variant: "outline",
								onClick: () => void updateVehicleStatus({ data: {
									id: v.id,
									status: "vendido"
								} }).then(reload),
								children: "Vendido"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								size: "sm",
								variant: "danger",
								onClick: () => {
									deleteMyVehicle({ data: { id: v.id } }).then(() => {
										toast.success("Anuncio eliminado.");
										return reload();
									}).catch((err) => toast.error(err instanceof Error ? err.message : "No se pudo borrar."));
								},
								children: "Borrar"
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
