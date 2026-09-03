import { C as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as cn } from "./utils-C_uf36nf.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/badge-BozmMpG6.js
var import_jsx_runtime = require_jsx_runtime();
function Badge({ children, tone = "neutral", className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: cn("inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium", tone === "neutral" && "border border-border bg-elevated text-muted", tone === "accent" && "bg-accent text-accent-fg", tone === "success" && "bg-success/15 text-success", tone === "warn" && "bg-warn/15 text-warn", tone === "danger" && "bg-danger/15 text-danger", className),
		children
	});
}
//#endregion
export { Badge as t };
