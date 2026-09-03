import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { C as require_jsx_runtime, f as useRouterState, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as cn } from "./utils-C_uf36nf.mjs";
import { a as useCurrentUserState, i as UserButton, n as SignedIn, r as SignedOut } from "./gates-DiqTagne.mjs";
import { l as Menu, t as X } from "../_libs/lucide-react.mjs";
import { t as Button } from "./button-CuuAiOA2.mjs";
import { y as getMyProfile } from "./router-Ih3cAWOQ.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/site-shell-XNI7BQoO.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var LINKS = [{
	to: "/catalogo",
	label: "Catálogo"
}, {
	to: "/contacto",
	label: "Contacto"
}];
function AuthSlot({ isAdmin }) {
	const { user, isPending } = useCurrentUserState();
	if (isPending) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-11 w-24 animate-pulse rounded-md bg-elevated" });
	if (!user) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
		to: "/login",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			size: "sm",
			children: "Entrar"
		})
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-center gap-2",
		children: [isAdmin && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
			to: "/admin",
			className: "hidden sm:block",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				variant: "ghost",
				size: "sm",
				children: "Admin"
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserButton, {})]
	});
}
function SiteHeader() {
	const pathname = useRouterState({ select: (s) => s.location.pathname });
	const { user, isPending } = useCurrentUserState();
	const [open, setOpen] = (0, import_react.useState)(false);
	const [isAdmin, setIsAdmin] = (0, import_react.useState)(false);
	const [needsVerify, setNeedsVerify] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		if (isPending || !user) {
			setIsAdmin(false);
			setNeedsVerify(false);
			return;
		}
		getMyProfile().then((p) => {
			setIsAdmin(p?.role === "admin");
			setNeedsVerify(p?.verificationStatus !== "verificado");
		}).catch(() => {
			setIsAdmin(false);
			setNeedsVerify(false);
		});
	}, [user, isPending]);
	(0, import_react.useEffect)(() => {
		setOpen(false);
	}, [pathname]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
		className: "sticky top-0 z-40 border-b border-border bg-bg/90 backdrop-blur-md",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto flex h-16 max-w-6xl items-center justify-between px-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/",
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "grid size-8 place-items-center rounded-md bg-accent text-accent-fg",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
								viewBox: "0 0 24 24",
								className: "size-4",
								fill: "currentColor",
								"aria-hidden": true,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M5 17a2 2 0 1 0 4 0H5Zm10 0a2 2 0 1 0 4 0h-4ZM4.2 11l1.4-4.2A2 2 0 0 1 7.5 5.5h9a2 2 0 0 1 1.9 1.3L20 11H4.2ZM3 12h18v3.5a1.5 1.5 0 0 1-1.5 1.5H19a3 3 0 0 0-6 0H11a3 3 0 0 0-6 0H4.5A1.5 1.5 0 0 1 3 15.5V12Z" })
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-display text-lg font-semibold tracking-tight",
							children: "AutoMarket"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
						className: "hidden items-center gap-6 md:flex",
						children: [
							LINKS.map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: l.to,
								className: cn("text-sm font-medium transition-colors", pathname.startsWith(l.to) ? "text-fg" : "text-muted hover:text-fg"),
								children: l.label
							}, l.to)),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/publicar",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									size: "sm",
									variant: "secondary",
									children: "Publicar"
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthSlot, { isAdmin })
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "grid size-11 place-items-center rounded-md border border-border md:hidden",
						onClick: () => setOpen((v) => !v),
						"aria-label": open ? "Cerrar menú" : "Abrir menú",
						children: open ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-5" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, { className: "size-5" })
					})
				]
			}),
			open && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "border-t border-border bg-surface px-4 py-4 md:hidden",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-2",
					children: [
						LINKS.map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: l.to,
							className: "rounded-md px-3 py-3 text-sm text-fg hover:bg-elevated",
							children: l.label
						}, l.to)),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/publicar",
							className: "rounded-md px-3 py-3 text-sm text-fg hover:bg-elevated",
							children: "Publicar anuncio"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SignedIn, { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/mis-anuncios",
								className: "rounded-md px-3 py-3 text-sm text-fg hover:bg-elevated",
								children: "Mis anuncios"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/ofertas",
								className: "rounded-md px-3 py-3 text-sm text-fg hover:bg-elevated",
								children: "Ofertas"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/favoritos",
								className: "rounded-md px-3 py-3 text-sm text-fg hover:bg-elevated",
								children: "Favoritos"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/perfil",
								className: "rounded-md px-3 py-3 text-sm text-fg hover:bg-elevated",
								children: "Perfil"
							}),
							isAdmin && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/admin",
								className: "rounded-md px-3 py-3 text-sm text-fg hover:bg-elevated",
								children: "Administración"
							})
						] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SignedOut, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/login",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								className: "w-full",
								children: "Entrar"
							})
						}) })
					]
				})
			}),
			needsVerify && pathname !== "/perfil" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "border-t border-border bg-elevated px-4 py-2 text-center text-xs text-muted",
				children: [
					"Verifica tu cédula para destacar tu perfil y tus anuncios.",
					" ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/perfil",
						className: "text-fg underline",
						children: "Ir a verificación"
					})
				]
			})
		]
	});
}
function SiteFooter() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", {
		className: "border-t border-border bg-surface",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto flex max-w-6xl flex-col gap-6 px-4 py-10 sm:flex-row sm:items-start sm:justify-between",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-display text-lg font-semibold",
				children: "AutoMarket"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 max-w-xs text-sm text-muted",
				children: "Compra, venta y permuta de vehículos. Directo entre personas, con proceso claro y transparente."
			})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-2 gap-8 text-sm",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-medium text-fg",
							children: "Mercado"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/catalogo",
							className: "text-muted hover:text-fg",
							children: "Catálogo"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/publicar",
							className: "text-muted hover:text-fg",
							children: "Publicar"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/contacto",
							className: "text-muted hover:text-fg",
							children: "Contacto"
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-medium text-fg",
							children: "Cuenta"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/login",
							className: "text-muted hover:text-fg",
							children: "Entrar"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/terminos",
							className: "text-muted hover:text-fg",
							children: "Términos"
						})
					]
				})]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "border-t border-border py-4 text-center text-xs text-subtle",
			children: "AutoMarket · Marketplace de vehículos"
		})]
	});
}
function SiteShell({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex min-h-dvh flex-col bg-bg text-fg",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteHeader, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex-1",
				children
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteFooter, {})
		]
	});
}
//#endregion
export { SiteShell as t };
