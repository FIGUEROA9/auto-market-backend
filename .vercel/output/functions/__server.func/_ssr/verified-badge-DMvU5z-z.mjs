import { C as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as cn } from "./utils-C_uf36nf.mjs";
import { o as ShieldCheck } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/verified-badge-DMvU5z-z.js
var import_jsx_runtime = require_jsx_runtime();
function VerifiedBadge({ className, compact }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		className: cn("inline-flex items-center gap-1 rounded-full bg-success/15 font-medium text-success", compact ? "px-1.5 py-0.5 text-[10px]" : "px-2.5 py-0.5 text-xs", className),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: compact ? "size-3" : "size-3.5" }), compact ? "Verificado" : "Usuario verificado"]
	});
}
//#endregion
export { VerifiedBadge as t };
