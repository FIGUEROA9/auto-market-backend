import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { C as require_jsx_runtime, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as useCurrentUserState, t as RedirectToSignIn } from "./gates-B_IGPI9u.mjs";
import { t as Button } from "./button-CsbLcD7M.mjs";
import { v as listFavorites } from "./router-MosyGjip.mjs";
import { t as SiteShell } from "./site-shell-DUuezdiF.mjs";
import { t as VehicleCard } from "./vehicle-card-OhgFqgtZ.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/favoritos-CSWWX0ze.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Favoritos() {
	const { user, isPending } = useCurrentUserState();
	const [items, setItems] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		if (isPending || !user) return;
		listFavorites().then(setItems).catch(() => setItems([]));
	}, [user, isPending]);
	if (isPending) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "mx-auto max-w-6xl px-4 py-20",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-40 animate-pulse rounded-xl bg-surface" })
	}) });
	if (!user) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RedirectToSignIn, {});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "mx-auto max-w-6xl px-4 py-10",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs font-semibold uppercase tracking-[0.18em] text-subtle",
				children: "Guardados"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-2 font-display text-4xl font-semibold",
				children: "Favoritos"
			}),
			items === null ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "mt-8 h-32 animate-pulse rounded-xl bg-surface" }) : items.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-16 text-center",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted",
					children: "Aún no guardas vehículos. Toca el corazón en un anuncio."
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/catalogo",
					className: "mt-4 inline-block",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, { children: "Ir al catálogo" })
				})]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3",
				children: items.map((v) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(VehicleCard, { vehicle: v }, v.id))
			})
		]
	}) });
}
//#endregion
export { Favoritos as component };
