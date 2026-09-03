import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { C as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as Button } from "./button-CsbLcD7M.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { k as submitContact } from "./router-C_w5OZSs.mjs";
import { i as Textarea, n as Input, t as Field } from "./input-Do1Wrx3v.mjs";
import { t as SiteShell } from "./site-shell-BDUmb5FA.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/contacto-IXNa_X15.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Contacto() {
	const [busy, setBusy] = (0, import_react.useState)(false);
	const [sent, setSent] = (0, import_react.useState)(false);
	async function onSubmit(e) {
		e.preventDefault();
		const fd = new FormData(e.currentTarget);
		setBusy(true);
		try {
			await submitContact({ data: {
				name: String(fd.get("name")),
				email: String(fd.get("email")),
				phone: String(fd.get("phone")),
				subject: String(fd.get("subject") || "") || void 0,
				message: String(fd.get("message"))
			} });
			setSent(true);
			toast.success("Mensaje enviado.");
		} catch (err) {
			toast.error(err instanceof Error ? err.message : "No se pudo enviar.");
		} finally {
			setBusy(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "mx-auto max-w-xl px-4 py-12",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs font-semibold uppercase tracking-[0.18em] text-subtle",
				children: "Soporte"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-2 font-display text-4xl font-semibold",
				children: "Contacto"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-sm leading-relaxed text-muted",
				children: "Dudas de un anuncio, reportes o alianzas. El equipo de AutoMarket lee cada mensaje."
			}),
			sent ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-10 rounded-xl bg-surface p-6 text-sm text-muted shadow-[var(--shadow-border)]",
				children: "Gracias. Te respondemos al correo que dejaste."
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				onSubmit,
				className: "mt-8 grid gap-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Nombre",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							name: "name",
							required: true,
							minLength: 2
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-4 sm:grid-cols-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Correo",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								name: "email",
								type: "email",
								required: true
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Teléfono",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								name: "phone",
								required: true,
								minLength: 6
							})
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Asunto",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							name: "subject",
							placeholder: "Quiero vender / reportar / alianza"
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Mensaje",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
							name: "message",
							required: true,
							minLength: 8
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "submit",
						disabled: busy,
						children: busy ? "Enviando…" : "Enviar"
					})
				]
			})
		]
	}) });
}
//#endregion
export { Contacto as component };
