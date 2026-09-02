import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { C as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as Button } from "./button-CuuAiOA2.mjs";
import { a as adminDeleteContact, o as adminListContacts } from "./router-BALgUNLD.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/contactos-oDJgkDvr.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function AdminContactos() {
	const [rows, setRows] = (0, import_react.useState)(null);
	function load() {
		adminListContacts().then(setRows).catch(() => setRows([]));
	}
	(0, import_react.useEffect)(() => {
		load();
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "font-display text-3xl font-semibold",
			children: "Contactos"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-1 text-sm text-muted",
			children: "Mensajes del formulario público."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
			className: "mt-6 grid gap-3",
			children: [(rows ?? []).map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
				className: "rounded-xl border border-border bg-surface p-4",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-start justify-between gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-medium",
							children: c.name
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-xs text-subtle",
							children: [
								c.email,
								" · ",
								c.phone
							]
						}),
						c.subject && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-sm",
							children: c.subject
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-sm text-muted",
							children: c.message
						})
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						size: "sm",
						variant: "ghost",
						onClick: async () => {
							await adminDeleteContact({ data: { id: c.id } });
							load();
						},
						children: "Eliminar"
					})]
				})
			}, c.id)), rows?.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted",
				children: "No hay mensajes."
			})]
		})
	] });
}
//#endregion
export { AdminContactos as component };
