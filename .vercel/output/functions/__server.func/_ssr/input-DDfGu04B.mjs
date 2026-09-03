import { C as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as cn } from "./utils-C_uf36nf.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/input-DDfGu04B.js
var import_jsx_runtime = require_jsx_runtime();
function Input({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
		suppressHydrationWarning: true,
		className: cn("h-11 w-full rounded-md border border-border bg-elevated px-3 text-sm text-fg placeholder:text-subtle", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50", className),
		...props
	});
}
function Textarea({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
		className: cn("min-h-28 w-full rounded-md border border-border bg-elevated px-3 py-2 text-sm text-fg placeholder:text-subtle", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50", className),
		...props
	});
}
function Select({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
		className: cn("h-11 w-full rounded-md border border-border bg-elevated px-3 text-sm text-fg", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50", className),
		...props
	});
}
function Field({ label, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
		className: "grid gap-1.5 text-sm",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "font-medium text-muted",
			children: label
		}), children]
	});
}
function CheckRow({ label, checked, onChange }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
		className: "flex min-h-11 cursor-pointer items-center gap-2 text-sm text-fg",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
			type: "checkbox",
			checked,
			onChange: (e) => onChange(e.target.checked),
			className: "size-4 shrink-0 accent-accent"
		}), label]
	});
}
function ChipToggle({ selected, onToggle, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		type: "button",
		onClick: onToggle,
		className: cn("h-11 rounded-md px-3 text-sm transition-colors duration-150", selected ? "bg-accent text-accent-fg" : "border border-border bg-elevated text-muted hover:text-fg"),
		children
	});
}
//#endregion
export { Select as a, Input as i, ChipToggle as n, Textarea as o, Field as r, CheckRow as t };
