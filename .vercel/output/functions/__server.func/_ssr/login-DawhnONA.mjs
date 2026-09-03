import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { C as require_jsx_runtime, x as useNavigate, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as DOC_TYPES, r as CITIES } from "./format-C8tXPYk_.mjs";
import { r as signIn, t as authClient } from "./client-B40BzJxt.mjs";
import { t as GROK_PROVIDERS } from "./server-Cracau7c.mjs";
import { a as useCurrentUserState } from "./gates-7MpIqa07.mjs";
import { t as Button } from "./button-CsbLcD7M.mjs";
import { M as updateMyProfile } from "./router-C_w5OZSs.mjs";
import { n as Input, r as Select, t as Field } from "./input-Do1Wrx3v.mjs";
import { t as SiteShell } from "./site-shell-BDUmb5FA.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/login-DawhnONA.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Login() {
	const navigate = useNavigate();
	const { user, isPending } = useCurrentUserState();
	const [mode, setMode] = (0, import_react.useState)("entrar");
	const [email, setEmail] = (0, import_react.useState)("");
	const [password, setPassword] = (0, import_react.useState)("");
	const [firstName, setFirstName] = (0, import_react.useState)("");
	const [lastName, setLastName] = (0, import_react.useState)("");
	const [phone, setPhone] = (0, import_react.useState)("");
	const [whatsapp, setWhatsapp] = (0, import_react.useState)("");
	const [city, setCity] = (0, import_react.useState)("Bogotá");
	const [address, setAddress] = (0, import_react.useState)("");
	const [documentType, setDocumentType] = (0, import_react.useState)("CC");
	const [documentNumber, setDocumentNumber] = (0, import_react.useState)("");
	const [error, setError] = (0, import_react.useState)("");
	const [busy, setBusy] = (0, import_react.useState)(false);
	if (!isPending && user) navigate({ to: "/" });
	async function onSubmit(e) {
		e.preventDefault();
		setError("");
		setBusy(true);
		try {
			if (mode === "crear") {
				const name = `${firstName} ${lastName}`.trim();
				const res = await authClient.signUp.email({
					email,
					password,
					name
				});
				if (res.error) throw new Error(res.error.message || "No se pudo crear la cuenta.");
				try {
					await updateMyProfile({ data: {
						firstName,
						lastName,
						phone,
						whatsapp: whatsapp || phone,
						city,
						address: address || void 0,
						email,
						documentType,
						documentNumber: documentNumber || void 0
					} });
				} catch {}
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
		className: "mx-auto grid min-h-[70vh] max-w-lg content-center px-4 py-16",
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
				children: mode === "crear" ? "Completa tus datos. El primer usuario real obtiene el panel de administración." : "El primer usuario real que se registra obtiene el panel de administración."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-6 grid grid-cols-2 rounded-lg border border-border p-1",
				children: ["entrar", "crear"].map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => setMode(m),
					className: mode === m ? "h-11 rounded-md bg-elevated text-sm font-medium text-fg" : "h-11 rounded-md text-sm text-muted",
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
				className: "grid gap-3",
				children: [
					mode === "crear" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-3 sm:grid-cols-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "Nombres",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									value: firstName,
									onChange: (e) => setFirstName(e.target.value),
									required: true,
									minLength: 2,
									autoComplete: "given-name"
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "Apellidos",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									value: lastName,
									onChange: (e) => setLastName(e.target.value),
									required: true,
									minLength: 2,
									autoComplete: "family-name"
								})
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-3 sm:grid-cols-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "Tipo de documento",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select, {
									value: documentType,
									onChange: (e) => setDocumentType(e.target.value),
									children: DOC_TYPES.map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: d.value,
										children: d.label
									}, d.value))
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "Número de documento",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									value: documentNumber,
									onChange: (e) => setDocumentNumber(e.target.value),
									required: true,
									minLength: 4
								})
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-3 sm:grid-cols-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "Teléfono",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									value: phone,
									onChange: (e) => setPhone(e.target.value),
									required: true,
									minLength: 7,
									autoComplete: "tel"
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "WhatsApp",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									value: whatsapp,
									onChange: (e) => setWhatsapp(e.target.value),
									placeholder: "Si es distinto al teléfono"
								})
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Ciudad",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select, {
								value: city,
								onChange: (e) => setCity(e.target.value),
								children: CITIES.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: c }, c))
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Dirección",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								value: address,
								onChange: (e) => setAddress(e.target.value),
								placeholder: "Barrio y dirección",
								autoComplete: "street-address"
							})
						})
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Correo",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							type: "email",
							value: email,
							onChange: (e) => setEmail(e.target.value),
							required: true,
							autoComplete: "email"
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Contraseña",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							type: "password",
							value: password,
							onChange: (e) => setPassword(e.target.value),
							required: true,
							minLength: 8,
							autoComplete: mode === "crear" ? "new-password" : "current-password"
						})
					}),
					error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-danger",
						children: error
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "submit",
						disabled: busy,
						children: busy ? "Espera…" : mode === "crear" ? "Crear cuenta" : "Entrar"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-6 text-xs leading-relaxed text-subtle",
				children: [
					"Al continuar aceptas los",
					" ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/terminos",
						className: "text-muted underline",
						children: "términos"
					}),
					". La verificación de identidad se hace después, con fotos de tu cédula."
				]
			})
		]
	}) });
}
//#endregion
export { Login as component };
