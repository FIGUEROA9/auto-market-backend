import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { C as require_jsx_runtime, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { r as CITIES } from "./format-ZWbZZFM2.mjs";
import { a as useCurrentUserState, t as RedirectToSignIn } from "./gates-B_IGPI9u.mjs";
import { t as Button } from "./button-CsbLcD7M.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { T as updateMyProfile, g as getMyProfile } from "./router-MosyGjip.mjs";
import { t as SiteShell } from "./site-shell-DUuezdiF.mjs";
import { n as Input, r as Select, t as Field } from "./input-Do1Wrx3v.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/perfil-BMtZfZ6_.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Perfil() {
	const { user, isPending } = useCurrentUserState();
	const [profile, setProfile] = (0, import_react.useState)(null);
	const [busy, setBusy] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		if (isPending || !user) return;
		getMyProfile().then(setProfile).catch(() => setProfile(null));
	}, [user, isPending]);
	if (isPending) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "mx-auto max-w-lg px-4 py-20",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-40 animate-pulse rounded-xl bg-surface" })
	}) });
	if (!user) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RedirectToSignIn, {});
	async function onSubmit(e) {
		e.preventDefault();
		const fd = new FormData(e.currentTarget);
		setBusy(true);
		try {
			await updateMyProfile({ data: {
				displayName: String(fd.get("displayName")),
				phone: String(fd.get("phone") || "") || void 0,
				city: String(fd.get("city") || "") || void 0,
				email: String(fd.get("email") || "") || void 0
			} });
			toast.success("Perfil actualizado.");
			setProfile(await getMyProfile());
		} catch (err) {
			toast.error(err instanceof Error ? err.message : "No se pudo guardar.");
		} finally {
			setBusy(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "mx-auto max-w-lg px-4 py-10",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs font-semibold uppercase tracking-[0.18em] text-subtle",
				children: "Cuenta"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-2 font-display text-4xl font-semibold",
				children: "Perfil"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-sm text-muted",
				children: profile?.role === "admin" ? "Eres administrador de AutoMarket." : "Completa tus datos para que los vendedores puedan contactarte."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 flex flex-wrap gap-3 text-sm",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/mis-anuncios",
						className: "text-accent",
						children: "Mis anuncios"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/ofertas",
						className: "text-accent",
						children: "Ofertas"
					}),
					profile?.role === "admin" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/admin",
						className: "text-accent",
						children: "Panel admin"
					})
				]
			}),
			profile && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				onSubmit,
				className: "mt-8 grid gap-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Nombre",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							name: "displayName",
							defaultValue: profile.displayName,
							required: true,
							minLength: 2
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Correo",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							name: "email",
							type: "email",
							defaultValue: profile.email ?? ""
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Teléfono",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							name: "phone",
							defaultValue: profile.phone ?? ""
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Ciudad",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select, {
							name: "city",
							defaultValue: profile.city ?? "Bogotá",
							children: CITIES.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: c }, c))
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "submit",
						disabled: busy,
						children: busy ? "Guardando…" : "Guardar"
					})
				]
			})
		]
	}) });
}
//#endregion
export { Perfil as component };
