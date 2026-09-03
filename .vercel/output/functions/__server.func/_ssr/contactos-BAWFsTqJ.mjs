import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { C as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as Button } from "./button-CsbLcD7M.mjs";
import { a as adminDeleteContact, s as adminListContacts } from "./router-C_w5OZSs.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/contactos-BAWFsTqJ.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ContactosAdmin() {
	const [rows, setRows] = (0, import_react.useState)([]);
	async function reload() {
		setRows(await adminListContacts());
	}
	(0, import_react.useEffect)(() => {
		reload().catch(() => setRows([]));
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "font-display text-3xl font-semibold",
			children: "Contactos"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "mt-1 text-sm text-muted",
			children: [rows.length, " mensajes recibidos."]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "mt-6 grid gap-3",
			children: rows.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
				className: "rounded-xl bg-surface p-4 shadow-[var(--shadow-border)]",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-start justify-between gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-medium",
							children: c.name
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-sm text-muted",
							children: [
								c.email,
								" · ",
								c.phone
							]
						}),
						c.subject && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-sm text-fg",
							children: c.subject
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-sm leading-relaxed text-muted",
							children: c.message
						})
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						size: "sm",
						variant: "ghost",
						onClick: () => void adminDeleteContact({ data: { id: c.id } }).then(reload),
						children: "Borrar"
					})]
				})
			}, c.id))
		})
	] });
}
//#endregion
export { ContactosAdmin as component };
