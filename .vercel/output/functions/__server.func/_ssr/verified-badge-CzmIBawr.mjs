import { C as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as cn } from "./utils-C_uf36nf.mjs";
import { E as BadgeCheck } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/verified-badge-CzmIBawr.js
var import_jsx_runtime = require_jsx_runtime();
function VerifiedBadge({ className, label = "Verificado" }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		className: cn("inline-flex items-center gap-1 rounded-full bg-success/15 px-2 py-0.5 text-xs font-medium text-success", className),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BadgeCheck, { className: "size-3.5" }), label]
	});
}
//#endregion
export { VerifiedBadge as t };
