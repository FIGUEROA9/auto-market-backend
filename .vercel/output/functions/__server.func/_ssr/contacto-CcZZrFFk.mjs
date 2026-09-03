import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { C as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as Button } from "./button-CuuAiOA2.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { D as submitContact } from "./router-Ih3cAWOQ.mjs";
import { t as SiteShell } from "./site-shell-XNI7BQoO.mjs";
import { i as Input, o as Textarea, r as Field } from "./input-DDfGu04B.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/contacto-CcZZrFFk.js
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
		} catch {
			toast.error("No se pudo enviar. Intenta de nuevo.");
		} finally {
			setBusy(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "mx-auto grid max-w-5xl gap-10 px-4 py-12 lg:grid-cols-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs font-semibold uppercase tracking-[0.18em] text-subtle",
				children: "Soporte"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-2 font-display text-4xl font-semibold",
				children: "Contacto"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4 text-sm leading-relaxed text-muted",
				children: "¿Dudas sobre una permuta, un anuncio o el proceso de compra? Escríbenos. El equipo de AutoMarket responde en horario hábil."
			})
		] }), sent ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "rounded-xl border border-border bg-surface p-8",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-display text-2xl font-semibold",
				children: "Recibido"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-sm text-muted",
				children: "Te contactaremos al correo que dejaste."
			})]
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
			onSubmit,
			className: "grid gap-4 rounded-xl border border-border bg-surface p-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Nombre",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						name: "name",
						required: true,
						minLength: 2
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Correo",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						name: "email",
						type: "email",
						required: true
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Teléfono",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						name: "phone",
						required: true,
						minLength: 6
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Asunto",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, { name: "subject" })
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
		})]
	}) });
}
//#endregion
export { Contacto as component };
