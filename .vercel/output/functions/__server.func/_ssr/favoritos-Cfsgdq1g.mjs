import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { C as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as useCurrentUserState, t as RedirectToSignIn } from "./gates-DiqTagne.mjs";
import { x as listFavorites } from "./router-Ih3cAWOQ.mjs";
import { t as SiteShell } from "./site-shell-XNI7BQoO.mjs";
import { t as VehicleCard } from "./vehicle-card-UhQN4o1S.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/favoritos-Cfsgdq1g.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Favoritos() {
	const { user, isPending } = useCurrentUserState();
	const [rows, setRows] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		if (!user) return;
		listFavorites().then(setRows).catch(() => setRows([]));
	}, [user]);
	if (isPending) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "mx-auto max-w-6xl px-4 py-16",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-32 animate-pulse rounded-xl bg-surface" })
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
			rows === null ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3",
				children: Array.from({ length: 3 }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "aspect-4/3 animate-pulse rounded-xl bg-surface" }, i))
			}) : rows.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-16 text-sm text-muted",
				children: "Aún no guardas vehículos."
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3",
				children: rows.map((v) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(VehicleCard, { vehicle: v }, v.id))
			})
		]
	}) });
}
//#endregion
export { Favoritos as component };
