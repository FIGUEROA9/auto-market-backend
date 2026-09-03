import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { C as require_jsx_runtime, S as useRouter, _ as createFileRoute, d as HeadContent, g as lazyRouteComponent, h as Outlet, m as createRouter, u as Scripts, v as createRootRoute } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as getServerFnById, i as TSS_SERVER_FUNCTION, r as createServerFn, s as __exportAll } from "./ssr.mjs";
import { t as authMiddleware } from "./middleware-CWNnPn8G.mjs";
import { bn as union, cn as _enum, dn as boolean, gn as object, hn as number, pn as literal, un as array, yn as string } from "../_libs/@better-auth/core+[...].mjs";
import { n as auth } from "./server-Cracau7c.mjs";
import { a as TriangleAlert } from "../_libs/lucide-react.mjs";
import { t as Toaster } from "../_libs/sonner.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/market-DTDZGACj.js
var createSsrRpc = (functionId) => {
	const url = "/_serverFn/" + functionId;
	const serverFnMeta = { id: functionId };
	const fn = async (...args) => {
		return (await getServerFnById(functionId, { origin: "server" }))(...args);
	};
	return Object.assign(fn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var swapPrefsSchema = object({
	any: boolean(),
	brand: string().max(40).optional(),
	model: string().max(40).optional(),
	yearMin: number().int().min(1980).max(2030).optional(),
	yearMax: number().int().min(1980).max(2030).optional(),
	mileageMax: number().int().min(0).max(1e6).optional(),
	condition: string().max(20).optional(),
	fuel: string().max(20).optional(),
	transmission: string().max(20).optional(),
	bodyType: string().max(20).optional(),
	city: string().max(60).optional(),
	priceMin: number().min(0).optional(),
	priceMax: number().min(0).optional()
});
var vehicleInput = object({
	title: string().min(3).max(120),
	brand: string().min(1).max(40),
	model: string().min(1).max(40),
	year: number().int().min(1980).max(2030),
	mileage: number().int().min(0).max(1e6),
	price: number().min(0),
	condition: _enum([
		"nuevo",
		"seminuevo",
		"usado"
	]),
	fuel: _enum([
		"gasolina",
		"diesel",
		"hibrido",
		"electrico"
	]),
	transmission: _enum(["manual", "automatica"]),
	bodyType: _enum([
		"sedan",
		"suv",
		"pickup",
		"hatchback",
		"van",
		"coupe"
	]),
	city: string().min(2).max(60),
	description: string().min(10).max(2e3),
	images: array(string().min(1)).min(1).max(6),
	listingType: _enum([
		"venta",
		"permuta",
		"ambos"
	]),
	soatExpires: string().optional(),
	tecnoExpires: string().optional(),
	taxesCurrent: boolean(),
	taxesDetail: string().max(400).optional(),
	taxesAmount: number().min(0).optional(),
	finesCurrent: boolean(),
	finesDetail: string().max(400).optional(),
	finesAmount: number().min(0).optional(),
	swapPrefs: swapPrefsSchema.optional()
});
var listFilter = object({
	q: string().optional(),
	brand: string().optional(),
	listingType: string().optional(),
	bodyType: string().optional(),
	city: string().optional(),
	fuel: string().optional(),
	minPrice: number().optional(),
	maxPrice: number().optional(),
	yearMin: number().optional(),
	yearMax: number().optional(),
	verifiedOnly: boolean().optional()
});
var listVehicles = createServerFn({ method: "GET" }).validator(listFilter).handler(createSsrRpc("8e8d9e3514494b7d7c824100f6459e0542b8e1954214f2fb4bc645219e083582"));
var getVehicle = createServerFn({ method: "GET" }).validator(object({ id: number() })).handler(createSsrRpc("e57651b22d5aae505d1987db30fd14e53d33dcba46e5c94fa6dde1cfd0caeaca"));
var featuredVehicles = createServerFn({ method: "GET" }).handler(createSsrRpc("3f93c033f08ce25c61eb0c63727d4af8b3029ed4677dcf75b0e4a3975c48ea3d"));
var marketStats = createServerFn({ method: "GET" }).handler(createSsrRpc("e1a7d1599464aa7cece15ef92763881330d6c1e5282cbf37158b22048434979a"));
var getMyProfile = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(createSsrRpc("3bb987c2dd3c1408c63c66c46d9989de1337f46076d1cd176d97486ddc515e6c"));
var profileFields = object({
	firstName: string().min(2).max(60),
	lastName: string().min(2).max(60),
	phone: string().min(7).max(30),
	whatsapp: string().max(30).optional(),
	city: string().min(2).max(60),
	address: string().max(160).optional(),
	email: string().email().optional(),
	documentType: _enum([
		"CC",
		"CE",
		"NIT",
		"PA"
	]).optional(),
	documentNumber: string().max(30).optional()
});
var updateMyProfile = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator(profileFields).handler(createSsrRpc("ae2026bd31978517e8a16f26dcfea6d515c96b8e28f24278bf736712190a11dc"));
var submitVerification = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator(object({
	idFrontUrl: string().min(20),
	idBackUrl: string().min(20),
	documentType: _enum([
		"CC",
		"CE",
		"NIT",
		"PA"
	]),
	documentNumber: string().min(4).max(30)
})).handler(createSsrRpc("1f5ee8ac64dce6ec65dda5869719e02be04f83b54cdca775cb043d29083f1831"));
var createVehicle = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator(vehicleInput).handler(createSsrRpc("872db24c654235b1ea035d7a6f33f7e3e906376efb819b722eae1066e31bdb88"));
var listMyVehicles = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(createSsrRpc("500ce052c70b44499ccb055486c0782c46a07032936114e16d5f31473869a147"));
var updateVehicleStatus = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator(object({
	id: number(),
	status: _enum([
		"activo",
		"pausado",
		"vendido"
	])
})).handler(createSsrRpc("61ba521e47a60af446fff85467351603d65bd1d742826ddcf8f5142e135eed9b"));
var deleteMyVehicle = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator(object({ id: number() })).handler(createSsrRpc("5b13f53e1e66ccadb08189572c7ce8bed43db14cd7acf851496721cc0c274318"));
var toggleFavorite = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator(object({ vehicleId: number() })).handler(createSsrRpc("4228a2fbef9856664c6604d378d3fd9130e27659cd9d12504251644309c9e121"));
var listFavorites = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(createSsrRpc("f78c5a3522e7617e991a488e7d1693410ba3e4bc919087024a5b79a03f5f64a8"));
createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(createSsrRpc("b2fd9960ad1891cfaee06bd81973ee40f5733d7626bb419abc855235098d0cb4"));
var isFavorite = createServerFn({ method: "GET" }).middleware([authMiddleware]).validator(object({ vehicleId: number() })).handler(createSsrRpc("40e30b76c4a08f6e8ac6f3c95267b71558c5e7845ffcd452380c9caf77a133ad"));
var createOffer = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator(object({
	vehicleId: number(),
	offerType: _enum(["compra", "permuta"]),
	amount: number().optional(),
	swapVehicleId: number().optional(),
	message: string().max(800).optional()
})).handler(createSsrRpc("535749e4449666afd747fcbe7d062724e9ac354f40505f97eb1130dc56ce0fe3"));
var listMyOffers = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(createSsrRpc("880ef5ec41c1db3d3d62edaaf3f2439d6bddb425428d1edc3a858fe8cba13324"));
var respondOffer = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator(object({
	id: number(),
	status: _enum(["aceptada", "rechazada"])
})).handler(createSsrRpc("21f77dd4cce131c34186ce9c4e45018e0243178ca47c730aaaa693a49963264d"));
var counterOffer = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator(object({
	id: number(),
	amount: number().optional(),
	swapVehicleId: number().optional(),
	message: string().min(2).max(800)
})).handler(createSsrRpc("c84a24fce94ecf0f0081d36afd968cd4f88655729890c8ee68e6ff03c69db863"));
var submitContact = createServerFn({ method: "POST" }).validator(object({
	name: string().min(2).max(80),
	email: string().email(),
	phone: string().min(6).max(30),
	subject: string().max(120).optional(),
	message: string().min(8).max(2e3)
})).handler(createSsrRpc("80872669a7e86587fa82b542eabcf80dd7e750ba39b4d79b600d5b0b8f2b7504"));
var adminStats = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(createSsrRpc("b34b17628a3c8ac02d7d5f81af711f24679e14cbbcaa059e8245837a56896633"));
var adminListUsers = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(createSsrRpc("9c8a94074c5453ba74bbccea89e6f5e1d5057e1f223f8e62446c4dd6acaa0670"));
var adminSetRole = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator(object({
	userId: string(),
	role: _enum(["admin", "cliente"])
})).handler(createSsrRpc("1d34babc538074bb215ff83d0e260131bcadad30f354ec63b06b87464c270370"));
var adminUpdateUser = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator(object({
	userId: string(),
	firstName: string().min(2).max(60),
	lastName: string().min(2).max(60),
	phone: string().max(30).optional(),
	whatsapp: string().max(30).optional(),
	city: string().max(60).optional(),
	address: string().max(160).optional(),
	email: string().email().optional(),
	documentType: _enum([
		"CC",
		"CE",
		"NIT",
		"PA"
	]).optional(),
	documentNumber: string().max(30).optional(),
	role: _enum(["admin", "cliente"])
})).handler(createSsrRpc("ff501bd9fa2f5abd645bab13a129d495f9935da190496173650e4068bca3cac8"));
var adminSetAccountStatus = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator(object({
	userId: string(),
	status: _enum(["activo", "deshabilitado"])
})).handler(createSsrRpc("fad41571d8c41943631218494d104bf06fdf605679d3b692156d33a477175d72"));
var adminDeleteUser = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator(object({ userId: string() })).handler(createSsrRpc("659492080f2fc86aeeb077c7ec5be7fafc4d8de15b5e5349cb91c04e3ca5c3cd"));
var adminListVerifications = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(createSsrRpc("53cfbee33d0f68dee4d22c875ff55d107ef98d918382ebf169b00a5d2764db15"));
var adminReviewVerification = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator(object({
	userId: string(),
	status: _enum(["verificado", "rechazado"]),
	note: string().max(400).optional()
})).handler(createSsrRpc("cefeb6f8bb01c4043d3524e737f9f3f420e544d09c8e239f8fdf577e60fb6afc"));
var adminListVehicles = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(createSsrRpc("60756c55fd3cc7cd573e79c47978d562e4d9fb5e3fb9035dffe883813ef25091"));
var adminSetVehicleStatus = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator(object({
	id: number(),
	status: _enum([
		"activo",
		"pausado",
		"vendido",
		"rechazado",
		"pendiente_revision"
	])
})).handler(createSsrRpc("83f08895a16fbb4a72b960f20b76a5f59f70f5f9b57d348c1f22ac9888b3e9a5"));
var adminListOffers = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(createSsrRpc("61a89f085b2a5a595898b3dba1ebc7c02ad22d6512070d27c2b15add31afe025"));
var adminListContacts = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(createSsrRpc("2696d9b016ee365bd9a90a107e3039f80f894adec4fe5e3abb9b77d5390f00d8"));
var adminDeleteContact = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator(object({ id: number() })).handler(createSsrRpc("054b395ec6887f9228b384f9d69a5016dc163f04e43ff12416b7956511dc8f58"));
//#endregion
//#region node_modules/.nitro/vite/services/ssr/assets/router-C_w5OZSs.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function AppErrorComponent({ error }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "flex min-h-screen flex-col items-center justify-center gap-3 px-6 text-center bg-zinc-50 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-50",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-red-500",
				"aria-hidden": "true",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, {
					className: "size-10",
					strokeWidth: 2
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-lg font-semibold",
				children: "Something went wrong"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "max-w-md text-sm break-words text-zinc-500 dark:text-zinc-400",
				children: error.message || "An unexpected error occurred. Try reloading the page."
			})
		]
	});
}
/**
* App-wide client provider mounted once near the root (in `src/routes/__root.tsx`):
*
*   <AuthProvider><Outlet /></AuthProvider>
*
* Better Auth's React client (`@/lib/auth/client`) needs NO context provider —
* its `useSession()` works standalone — so this is a passthrough today. It's
* kept as the single, stable mount point for any future client-side providers
* (e.g. a toast or theme provider) without churning the root shell.
*/
function AuthProvider({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children });
}
function isGrokEmbedderOrigin(origin) {
	try {
		const url = new URL(origin);
		if (url.protocol !== "https:" && url.protocol !== "http:") return false;
		const host = url.hostname.toLowerCase();
		if (host === "grok.com" || host.endsWith(".grok.com")) return true;
		if (host === "localhost" || host === "127.0.0.1" || host === "[::1]") return true;
		return false;
	} catch {
		return false;
	}
}
function isSandboxPreviewGuestHost(hostname) {
	const host = hostname.toLowerCase();
	return host === "grok-sandbox.com" || host.endsWith(".grok-sandbox.com");
}
function isRemintPreviewPair(guestHost, parentHost) {
	const guest = guestHost.toLowerCase();
	const parent = parentHost.toLowerCase();
	const i = guest.indexOf(".preview.");
	if (i <= 0) return false;
	const label = guest.slice(0, i);
	const rest = guest.slice(i + 9);
	if (label.includes(".") || !rest.includes(".")) return false;
	return parent === rest || parent === `grok.${rest}`;
}
function resolveParentEmbedderOrigin(parentIsSelf, referrer, ancestorOrigin, guestHostname = "") {
	if (parentIsSelf) return null;
	for (const candidate of [referrer, ancestorOrigin ?? ""].filter(Boolean)) try {
		const url = new URL(candidate.includes("://") ? candidate : `https://${candidate}`);
		if (url.protocol !== "https:" && url.protocol !== "http:") continue;
		if (isGrokEmbedderOrigin(url.origin)) return url.origin;
		if (isSandboxPreviewGuestHost(guestHostname) || isRemintPreviewPair(guestHostname, url.hostname)) return url.origin;
	} catch {}
	return null;
}
/**
* Guest side of the grok-web ↔ sandbox preview postMessage bridge.
*
* Activates only when this page is framed by an allowlisted Grok embedder.
* Top-level runs (download/export, local `npm run dev`, deployed sites) noop.
*/
var PREVIEW_BRIDGE_CHANNEL = "grok-preview-bridge";
var EnvelopeSchema = object({
	channel: literal(PREVIEW_BRIDGE_CHANNEL),
	version: number().int().positive(),
	type: string().min(1)
});
var HelloSchema = EnvelopeSchema.extend({ type: literal("hello") });
var NavigateSchema = EnvelopeSchema.extend({
	type: literal("navigate"),
	path: string().min(1)
});
var HistorySchema = EnvelopeSchema.extend({
	type: literal("history"),
	delta: union([literal(-1), literal(1)])
});
function isSafeBridgePath(path) {
	if (!path.startsWith("/") || path.startsWith("//") || path.includes("\\")) return false;
	try {
		return new URL(path, "https://preview.invalid").origin === "https://preview.invalid";
	} catch {
		return false;
	}
}
/**
* Install host↔guest messaging. Returns a dispose function.
* Noops (returns a no-op dispose) when not embedded under a Grok parent.
*/
function installPreviewHostBridge(options = {}) {
	if (typeof window === "undefined") return () => {};
	const ancestorOrigin = typeof location.ancestorOrigins !== "undefined" && location.ancestorOrigins.length > 0 ? location.ancestorOrigins[0] : null;
	const parentOrigin = resolveParentEmbedderOrigin(window.parent === window, document.referrer, ancestorOrigin, window.location.hostname);
	if (parentOrigin === null) return () => {};
	const ROOT_STATE_KEY = "__grokPreviewBridgeRoot";
	const originalPushState = window.history.pushState.bind(window.history);
	const originalReplaceState = window.history.replaceState.bind(window.history);
	const isAtHistoryRoot = () => {
		const state = window.history.state;
		return Boolean(state && typeof state === "object" && state[ROOT_STATE_KEY] === true);
	};
	try {
		const current = window.history.state;
		if (!(current !== null && typeof current === "object" && Object.prototype.hasOwnProperty.call(current, ROOT_STATE_KEY))) {
			const isRoot = window.history.length <= 1;
			originalReplaceState(current && typeof current === "object" ? {
				...current,
				[ROOT_STATE_KEY]: isRoot
			} : { [ROOT_STATE_KEY]: isRoot }, "", window.location.href);
		}
	} catch {}
	const post = (message) => {
		window.parent.postMessage(message, parentOrigin);
	};
	const reportLocation = () => {
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "location",
			path: window.location.pathname || "/",
			search: window.location.search,
			hash: window.location.hash
		});
	};
	const reportRoutes = () => {
		const paths = options.getRoutePaths?.() ?? [];
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "routes",
			paths
		});
	};
	const defaultNavigate = (path) => {
		if (!isSafeBridgePath(path)) return;
		try {
			const url = new URL(path, window.location.origin);
			if (url.origin !== window.location.origin) return;
			const next = `${url.pathname}${url.search}${url.hash}`;
			window.history.pushState(window.history.state, "", next);
			window.dispatchEvent(new PopStateEvent("popstate", { state: window.history.state }));
		} catch {}
	};
	const navigate = (path) => {
		if (!isSafeBridgePath(path)) return;
		if (options.navigate) {
			options.navigate(path);
			return;
		}
		defaultNavigate(path);
	};
	const announce = () => {
		reportLocation();
		reportRoutes();
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "ready"
		});
	};
	const onMessage = (event) => {
		if (event.source !== window.parent) return;
		if (event.origin !== parentOrigin) return;
		const envelope = EnvelopeSchema.safeParse(event.data);
		if (!envelope.success || envelope.data.version !== 1) return;
		if (envelope.data.type === "hello") {
			if (!HelloSchema.safeParse(event.data).success) return;
			announce();
			return;
		}
		if (envelope.data.type === "navigate") {
			const parsed = NavigateSchema.safeParse(event.data);
			if (!parsed.success) return;
			navigate(parsed.data.path);
			queueMicrotask(reportLocation);
			return;
		}
		if (envelope.data.type === "history") {
			const parsed = HistorySchema.safeParse(event.data);
			if (!parsed.success) return;
			if (parsed.data.delta === -1 && isAtHistoryRoot()) return;
			window.history.go(parsed.data.delta);
		}
	};
	const onPopState = () => {
		reportLocation();
	};
	const onHashChange = () => {
		reportLocation();
	};
	window.history.pushState = (data, unused, url) => {
		const next = data && typeof data === "object" ? {
			...data,
			[ROOT_STATE_KEY]: false
		} : data;
		originalPushState(next, unused, url);
		reportLocation();
	};
	window.history.replaceState = (data, unused, url) => {
		const next = isAtHistoryRoot() ? {
			...data && typeof data === "object" ? data : {},
			[ROOT_STATE_KEY]: true
		} : data;
		originalReplaceState(next, unused, url);
		reportLocation();
	};
	window.addEventListener("message", onMessage);
	window.addEventListener("popstate", onPopState);
	window.addEventListener("hashchange", onHashChange);
	announce();
	return () => {
		window.removeEventListener("message", onMessage);
		window.removeEventListener("popstate", onPopState);
		window.removeEventListener("hashchange", onHashChange);
		window.history.pushState = originalPushState;
		window.history.replaceState = originalReplaceState;
	};
}
/** Collect static path patterns from a TanStack route tree (best-effort). */
function collectRoutePathsFromTree(routeTree) {
	const paths = /* @__PURE__ */ new Set();
	const walk = (node) => {
		if (!node || typeof node !== "object") return;
		const record = node;
		const full = typeof record.fullPath === "string" ? record.fullPath : typeof record.path === "string" ? record.path : null;
		if (full !== null && full !== "") paths.add(full.startsWith("/") ? full : `/${full}`);
		else if (full === "") paths.add("/");
		const children = record.children;
		if (Array.isArray(children)) for (const child of children) walk(child);
		else if (children && typeof children === "object") for (const child of Object.values(children)) walk(child);
	};
	walk(routeTree);
	return [...paths];
}
/**
* Mount once in `__root.tsx` so the Grok preview chrome can drive navigation
* (and later receive registered routes). Noops when the app is not embedded.
*/
function PreviewHostBridge() {
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		return installPreviewHostBridge({
			navigate: (path) => {
				router.history.push(path);
			},
			getRoutePaths: () => collectRoutePathsFromTree(router.routeTree)
		});
	}, [router]);
	return null;
}
var styles_default = "/assets/styles-SGUxF2hk.css";
var APP_NAME = "AutoMarket";
var Route$19 = createRootRoute({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: APP_NAME },
			{
				name: "description",
				content: "Compra, venta y permuta de vehículos entre personas en Colombia."
			},
			{
				name: "theme-color",
				content: "#0c0d10"
			}
		],
		links: [
			{
				rel: "icon",
				type: "image/svg+xml",
				href: "/favicon.svg"
			},
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "manifest",
				href: "/__grok/manifest.webmanifest"
			},
			{
				rel: "apple-touch-icon",
				href: "/__grok/icon-180.png"
			},
			{
				rel: "preconnect",
				href: "https://fonts.googleapis.com"
			},
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com"
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600;9..144,700&family=Outfit:wght@400;500;600;700&display=swap"
			}
		]
	}),
	component: () => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "es",
		className: "antialiased",
		suppressHydrationWarning: true,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", {
			className: "bg-bg text-fg",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PreviewHostBridge, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AuthProvider, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster, {
					theme: "dark",
					position: "top-center",
					toastOptions: { style: {
						background: "var(--color-elevated)",
						color: "var(--color-fg)",
						border: "1px solid var(--color-border)"
					} }
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})
			]
		})]
	})
});
var $$splitComponentImporter$17 = () => import("./routes-lQm0gp4c.mjs");
var Route$18 = createFileRoute("/")({
	loader: async () => {
		const [vehicles, stats] = await Promise.all([featuredVehicles(), marketStats()]);
		return {
			vehicles,
			stats
		};
	},
	component: lazyRouteComponent($$splitComponentImporter$17, "component")
});
var $$splitComponentImporter$16 = () => import("./admin-DoOxdfGt.mjs");
var Route$17 = createFileRoute("/admin")({ component: lazyRouteComponent($$splitComponentImporter$16, "component") });
var $$splitComponentImporter$15 = () => import("./catalogo-uR_GUI52.mjs");
var Route$16 = createFileRoute("/catalogo")({
	loader: () => listVehicles({ data: {} }),
	component: lazyRouteComponent($$splitComponentImporter$15, "component")
});
var $$splitComponentImporter$14 = () => import("./contacto-IXNa_X15.mjs");
var Route$15 = createFileRoute("/contacto")({ component: lazyRouteComponent($$splitComponentImporter$14, "component") });
var $$splitComponentImporter$13 = () => import("./favoritos-Cm4JCJav.mjs");
var Route$14 = createFileRoute("/favoritos")({ component: lazyRouteComponent($$splitComponentImporter$13, "component") });
var $$splitComponentImporter$12 = () => import("./login-DawhnONA.mjs");
var Route$13 = createFileRoute("/login")({ component: lazyRouteComponent($$splitComponentImporter$12, "component") });
var $$splitComponentImporter$11 = () => import("./mis-anuncios-D2ntMxJs.mjs");
var Route$12 = createFileRoute("/mis-anuncios")({ component: lazyRouteComponent($$splitComponentImporter$11, "component") });
var $$splitComponentImporter$10 = () => import("./ofertas-Dg1fxhh0.mjs");
var Route$11 = createFileRoute("/ofertas")({ component: lazyRouteComponent($$splitComponentImporter$10, "component") });
var $$splitComponentImporter$9 = () => import("./perfil-BO1USPfJ.mjs");
var Route$10 = createFileRoute("/perfil")({ component: lazyRouteComponent($$splitComponentImporter$9, "component") });
var $$splitComponentImporter$8 = () => import("./publicar-1RG0Ir9X.mjs");
var Route$9 = createFileRoute("/publicar")({ component: lazyRouteComponent($$splitComponentImporter$8, "component") });
var $$splitComponentImporter$7 = () => import("./terminos-Dtr20PdA.mjs");
var Route$8 = createFileRoute("/terminos")({ component: lazyRouteComponent($$splitComponentImporter$7, "component") });
var $$splitComponentImporter$6 = () => import("./admin-8yDo0lt1.mjs");
var Route$7 = createFileRoute("/admin/")({ component: lazyRouteComponent($$splitComponentImporter$6, "component") });
var $$splitComponentImporter$5 = () => import("./anuncios-oG9rMdGp.mjs");
var Route$6 = createFileRoute("/admin/anuncios")({ component: lazyRouteComponent($$splitComponentImporter$5, "component") });
var $$splitComponentImporter$4 = () => import("./contactos-BAWFsTqJ.mjs");
var Route$5 = createFileRoute("/admin/contactos")({ component: lazyRouteComponent($$splitComponentImporter$4, "component") });
var $$splitComponentImporter$3 = () => import("./ofertas-BLAFj2qj.mjs");
var Route$4 = createFileRoute("/admin/ofertas")({ component: lazyRouteComponent($$splitComponentImporter$3, "component") });
var $$splitComponentImporter$2 = () => import("./usuarios-CMnHXsjO.mjs");
var Route$3 = createFileRoute("/admin/usuarios")({ component: lazyRouteComponent($$splitComponentImporter$2, "component") });
var $$splitComponentImporter$1 = () => import("./verificaciones-BmI2vpFh.mjs");
var Route$2 = createFileRoute("/admin/verificaciones")({ component: lazyRouteComponent($$splitComponentImporter$1, "component") });
var $$splitComponentImporter = () => import("./vehiculo._id-Ci9Uvjo9.mjs");
var Route$1 = createFileRoute("/vehiculo/$id")({
	loader: async ({ params }) => {
		const id = Number(params.id);
		if (!Number.isFinite(id)) return null;
		return getVehicle({ data: { id } });
	},
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
var Route = createFileRoute("/api/auth/$")({ server: { handlers: {
	GET: ({ request }) => auth.handler(request),
	POST: ({ request }) => auth.handler(request)
} } });
var IndexRoute = Route$18.update({
	id: "/",
	path: "/",
	getParentRoute: () => Route$19
});
var AdminRoute = Route$17.update({
	id: "/admin",
	path: "/admin",
	getParentRoute: () => Route$19
});
var CatalogoRoute = Route$16.update({
	id: "/catalogo",
	path: "/catalogo",
	getParentRoute: () => Route$19
});
var ContactoRoute = Route$15.update({
	id: "/contacto",
	path: "/contacto",
	getParentRoute: () => Route$19
});
var FavoritosRoute = Route$14.update({
	id: "/favoritos",
	path: "/favoritos",
	getParentRoute: () => Route$19
});
var LoginRoute = Route$13.update({
	id: "/login",
	path: "/login",
	getParentRoute: () => Route$19
});
var MisAnunciosRoute = Route$12.update({
	id: "/mis-anuncios",
	path: "/mis-anuncios",
	getParentRoute: () => Route$19
});
var OfertasRoute = Route$11.update({
	id: "/ofertas",
	path: "/ofertas",
	getParentRoute: () => Route$19
});
var PerfilRoute = Route$10.update({
	id: "/perfil",
	path: "/perfil",
	getParentRoute: () => Route$19
});
var PublicarRoute = Route$9.update({
	id: "/publicar",
	path: "/publicar",
	getParentRoute: () => Route$19
});
var TerminosRoute = Route$8.update({
	id: "/terminos",
	path: "/terminos",
	getParentRoute: () => Route$19
});
var AdminIndexRoute = Route$7.update({
	id: "/",
	path: "/",
	getParentRoute: () => AdminRoute
});
var AdminAnunciosRoute = Route$6.update({
	id: "/anuncios",
	path: "/anuncios",
	getParentRoute: () => AdminRoute
});
var AdminContactosRoute = Route$5.update({
	id: "/contactos",
	path: "/contactos",
	getParentRoute: () => AdminRoute
});
var AdminOfertasRoute = Route$4.update({
	id: "/ofertas",
	path: "/ofertas",
	getParentRoute: () => AdminRoute
});
var AdminUsuariosRoute = Route$3.update({
	id: "/usuarios",
	path: "/usuarios",
	getParentRoute: () => AdminRoute
});
var AdminVerificacionesRoute = Route$2.update({
	id: "/verificaciones",
	path: "/verificaciones",
	getParentRoute: () => AdminRoute
});
var VehiculoIdRoute = Route$1.update({
	id: "/vehiculo/$id",
	path: "/vehiculo/$id",
	getParentRoute: () => Route$19
});
var ApiAuthSplatRoute = Route.update({
	id: "/api/auth/$",
	path: "/api/auth/$",
	getParentRoute: () => Route$19
});
var AdminRouteChildren = {
	AdminAnunciosRoute,
	AdminContactosRoute,
	AdminOfertasRoute,
	AdminUsuariosRoute,
	AdminVerificacionesRoute,
	AdminIndexRoute
};
var rootRouteChildren = {
	IndexRoute,
	AdminRoute: AdminRoute._addFileChildren(AdminRouteChildren),
	CatalogoRoute,
	ContactoRoute,
	FavoritosRoute,
	LoginRoute,
	MisAnunciosRoute,
	OfertasRoute,
	PerfilRoute,
	PublicarRoute,
	TerminosRoute,
	VehiculoIdRoute,
	ApiAuthSplatRoute
};
var routeTree = Route$19._addFileChildren(rootRouteChildren)._addFileTypes();
var router_exports = /* @__PURE__ */ __exportAll({ getRouter: () => getRouter });
function getRouter() {
	return createRouter({
		routeTree,
		defaultErrorComponent: AppErrorComponent
	});
}
//#endregion
export { submitVerification as A, isFavorite as C, listVehicles as D, listMyVehicles as E, updateMyProfile as M, updateVehicleStatus as N, respondOffer as O, getMyProfile as S, listMyOffers as T, adminUpdateUser as _, adminDeleteContact as a, createVehicle as b, adminListOffers as c, adminListVerifications as d, adminReviewVerification as f, adminStats as g, adminSetVehicleStatus as h, Route$18 as i, toggleFavorite as j, submitContact as k, adminListUsers as l, adminSetRole as m, Route$1 as n, adminDeleteUser as o, adminSetAccountStatus as p, Route$16 as r, adminListContacts as s, router_exports as t, adminListVehicles as u, counterOffer as v, listFavorites as w, deleteMyVehicle as x, createOffer as y };
