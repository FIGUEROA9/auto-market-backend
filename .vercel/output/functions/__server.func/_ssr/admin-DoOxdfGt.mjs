import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { C as require_jsx_runtime, f as useRouterState, h as Outlet, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as cn } from "./utils-C_uf36nf.mjs";
import { a as useCurrentUserState, i as UserButton, t as RedirectToSignIn } from "./gates-7MpIqa07.mjs";
import { C as ClipboardList, _ as Mail, c as ShieldCheck, h as Megaphone, i as Users, v as LayoutDashboard } from "../_libs/lucide-react.mjs";
import { S as getMyProfile } from "./router-C_w5OZSs.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin-DoOxdfGt.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var NAV = [
	{
		to: "/admin",
		label: "Inicio",
		icon: LayoutDashboard,
		exact: true
	},
	{
		to: "/admin/usuarios",
		label: "Usuarios",
		icon: Users
	},
	{
		to: "/admin/verificaciones",
		label: "Verificaciones",
		icon: ShieldCheck
	},
	{
		to: "/admin/anuncios",
		label: "Anuncios",
		icon: Megaphone
	},
	{
		to: "/admin/ofertas",
		label: "Ofertas",
		icon: ClipboardList
	},
	{
		to: "/admin/contactos",
		label: "Contactos",
		icon: Mail
	}
];
function AdminLayout() {
	const { user, isPending } = useCurrentUserState();
	const pathname = useRouterState({ select: (s) => s.location.pathname });
	const [allowed, setAllowed] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		if (isPending) return;
		if (!user) {
			setAllowed(false);
			return;
		}
		getMyProfile().then((p) => setAllowed(p?.role === "admin")).catch(() => setAllowed(false));
	}, [user, isPending]);
	if (isPending || allowed === null) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "grid min-h-dvh place-items-center bg-bg text-muted",
		children: "Cargando panel…"
	});
	if (!user) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RedirectToSignIn, {});
	if (!allowed) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "grid min-h-dvh place-items-center bg-bg px-6 text-center",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-2xl font-semibold text-fg",
				children: "Sin acceso"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-sm text-muted",
				children: "Este panel es solo para administradores."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/",
				className: "mt-4 inline-block text-sm text-accent",
				children: "Volver al inicio"
			})
		] })
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex min-h-dvh bg-bg text-fg",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
			className: "hidden w-60 shrink-0 flex-col border-r border-border bg-surface md:flex",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/",
				className: "border-b border-border px-5 py-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-display text-lg font-semibold",
					children: "AutoMarket"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs uppercase tracking-wider text-subtle",
					children: "Administración"
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
				className: "flex flex-1 flex-col gap-1 p-3",
				children: NAV.map((item) => {
					const active = item.exact ? pathname === item.to : pathname.startsWith(item.to);
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: item.to,
						className: cn("flex items-center gap-2 rounded-md px-3 py-2.5 text-sm", active ? "bg-elevated text-fg" : "text-muted hover:bg-elevated hover:text-fg"),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(item.icon, { className: "size-4" }), item.label]
					}, item.to);
				})
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex min-w-0 flex-1 flex-col",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "flex h-16 items-center justify-between border-b border-border px-4 md:px-8",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex gap-2 overflow-x-auto md:hidden",
						children: NAV.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: item.to,
							className: "shrink-0 rounded-md border border-border px-3 py-2 text-xs",
							children: item.label
						}, item.to))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						className: "hidden text-sm text-muted hover:text-fg md:inline",
						children: "Ver sitio"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "ml-auto",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserButton, {})
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
				className: "flex-1 overflow-auto p-4 md:p-8",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {})
			})]
		})]
	});
}
//#endregion
export { AdminLayout as component };
