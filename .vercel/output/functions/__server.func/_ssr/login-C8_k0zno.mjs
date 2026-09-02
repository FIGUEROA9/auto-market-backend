import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { C as require_jsx_runtime, x as useNavigate, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { r as signIn, t as authClient } from "./client-B40BzJxt.mjs";
import { a as useCurrentUserState } from "./gates-B_IGPI9u.mjs";
import { t as Button } from "./button-CuuAiOA2.mjs";
import { t as GROK_PROVIDERS } from "./server-Z5hXOMKe.mjs";
import { t as SiteShell } from "./site-shell-CmKuxx-u.mjs";
import { n as Input, t as Field } from "./input-Do1Wrx3v.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/login-C8_k0zno.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Login() {
	const navigate = useNavigate();
	const { user, isPending } = useCurrentUserState();
	const [mode, setMode] = (0, import_react.useState)("entrar");
	const [email, setEmail] = (0, import_react.useState)("");
	const [password, setPassword] = (0, import_react.useState)("");
	const [name, setName] = (0, import_react.useState)("");
	const [error, setError] = (0, import_react.useState)("");
	const [busy, setBusy] = (0, import_react.useState)(false);
	if (!isPending && user) navigate({ to: "/" });
	async function onSubmit(e) {
		e.preventDefault();
		setError("");
		setBusy(true);
		try {
			if (mode === "crear") {
				const res = await authClient.signUp.email({
					email,
					password,
					name
				});
				if (res.error) throw new Error(res.error.message || "No se pudo crear la cuenta.");
			} else {
				const res = await authClient.signIn.email({
					email,
					password
				});
				if (res.error) throw new Error(res.error.message || "Correo o contraseña incorrectos.");
			}
			await navigate({ to: "/" });
		} catch (err) {
			setError(err instanceof Error ? err.message : "Algo salió mal.");
		} finally {
			setBusy(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "mx-auto grid min-h-[70vh] max-w-md content-center px-4 py-16",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs font-semibold uppercase tracking-[0.18em] text-subtle",
				children: "Cuenta"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-2 font-display text-3xl font-semibold",
				children: mode === "entrar" ? "Entra a AutoMarket" : "Crea tu cuenta"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-sm text-muted",
				children: "El primer usuario en registrarse obtiene el panel de administración."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-6 grid grid-cols-2 rounded-lg border border-border p-1",
				children: ["entrar", "crear"].map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => setMode(m),
					className: mode === m ? "h-10 rounded-md bg-elevated text-sm font-medium text-fg" : "h-10 rounded-md text-sm text-muted",
					children: m === "entrar" ? "Entrar" : "Crear cuenta"
				}, m))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-6 grid gap-2",
				children: GROK_PROVIDERS.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					type: "button",
					variant: "secondary",
					onClick: () => signIn(p.providerId, { callbackURL: "/" }),
					children: ["Continuar con ", p.label]
				}, p.providerId))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "my-6 flex items-center gap-3 text-xs uppercase tracking-wider text-subtle",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-px flex-1 bg-border" }),
					"o con correo",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-px flex-1 bg-border" })
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				onSubmit,
				className: "grid gap-4",
				children: [
					mode === "crear" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Nombre",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							value: name,
							onChange: (e) => setName(e.target.value),
							required: true,
							minLength: 2
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Correo",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							type: "email",
							value: email,
							onChange: (e) => setEmail(e.target.value),
							required: true
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Contraseña",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							type: "password",
							value: password,
							onChange: (e) => setPassword(e.target.value),
							required: true,
							minLength: 8
						})
					}),
					error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-danger",
						children: error
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "submit",
						disabled: busy,
						children: busy ? "Procesando…" : mode === "entrar" ? "Entrar" : "Crear cuenta"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-4 text-xs text-subtle",
				children: [
					"Al continuar aceptas los",
					" ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/terminos",
						className: "text-muted underline",
						children: "términos"
					}),
					"."
				]
			})
		]
	}) });
}
//#endregion
export { Login as component };
