import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { C as require_jsx_runtime, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as Badge } from "./badge-DxsH4oBu.mjs";
import { i as CITIES, p as VERIFICATION_LABEL } from "./format-CKYgwz_q.mjs";
import { a as useCurrentUserState, t as RedirectToSignIn } from "./gates-DiqTagne.mjs";
import { t as Button } from "./button-CuuAiOA2.mjs";
import { t as VerifiedBadge } from "./verified-badge-DMvU5z-z.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { O as submitVerification, j as updateMyProfile, y as getMyProfile } from "./router-Ih3cAWOQ.mjs";
import { t as SiteShell } from "./site-shell-XNI7BQoO.mjs";
import { a as Select, i as Input, r as Field } from "./input-DDfGu04B.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/perfil-DsJKqoyz.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function readImageFile(file, maxW = 1400, quality = .72) {
	return new Promise((resolve, reject) => {
		if (!file.type.startsWith("image/")) {
			reject(/* @__PURE__ */ new Error("El archivo debe ser una imagen."));
			return;
		}
		if (file.size > 8e6) {
			reject(/* @__PURE__ */ new Error("La imagen supera 8 MB."));
			return;
		}
		const img = new Image();
		const url = URL.createObjectURL(file);
		img.onload = () => {
			const scale = Math.min(1, maxW / Math.max(img.width, 1));
			const w = Math.max(1, Math.round(img.width * scale));
			const h = Math.max(1, Math.round(img.height * scale));
			const canvas = document.createElement("canvas");
			canvas.width = w;
			canvas.height = h;
			const ctx = canvas.getContext("2d");
			if (!ctx) {
				URL.revokeObjectURL(url);
				reject(/* @__PURE__ */ new Error("No se pudo procesar la imagen."));
				return;
			}
			ctx.drawImage(img, 0, 0, w, h);
			URL.revokeObjectURL(url);
			resolve(canvas.toDataURL("image/jpeg", quality));
		};
		img.onerror = () => {
			URL.revokeObjectURL(url);
			reject(/* @__PURE__ */ new Error("No se pudo leer la imagen."));
		};
		img.src = url;
	});
}
function toneFor(status) {
	if (status === "verificado") return "success";
	if (status === "rechazado") return "danger";
	if (status === "pendiente") return "warn";
	return "neutral";
}
function Perfil() {
	const { user, isPending } = useCurrentUserState();
	const [profile, setProfile] = (0, import_react.useState)(null);
	const [busy, setBusy] = (0, import_react.useState)(false);
	const [front, setFront] = (0, import_react.useState)(null);
	const [back, setBack] = (0, import_react.useState)(null);
	const [verifying, setVerifying] = (0, import_react.useState)(false);
	function load() {
		getMyProfile().then(setProfile).catch(() => setProfile(null));
	}
	(0, import_react.useEffect)(() => {
		if (!user) return;
		load();
	}, [user]);
	if (isPending) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "mx-auto max-w-lg px-4 py-16",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-40 animate-pulse rounded-xl bg-surface" })
	}) });
	if (!user) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RedirectToSignIn, {});
	async function onSubmit(e) {
		e.preventDefault();
		const fd = new FormData(e.currentTarget);
		setBusy(true);
		try {
			await updateMyProfile({ data: {
				displayName: String(fd.get("displayName")),
				phone: String(fd.get("phone") || "") || void 0,
				city: String(fd.get("city") || "") || void 0,
				email: String(fd.get("email") || user?.primaryEmail || "") || void 0
			} });
			toast.success("Perfil actualizado.");
			load();
		} catch (err) {
			toast.error(err instanceof Error ? err.message : "No se pudo guardar.");
		} finally {
			setBusy(false);
		}
	}
	async function onPick(side, file) {
		if (!file) return;
		try {
			const data = await readImageFile(file);
			if (side === "front") setFront(data);
			else setBack(data);
		} catch (err) {
			toast.error(err instanceof Error ? err.message : "Imagen inválida.");
		}
	}
	async function onVerify() {
		if (!front || !back) {
			toast.error("Sube el frente y el reverso de la cédula.");
			return;
		}
		setVerifying(true);
		try {
			await submitVerification({ data: {
				idFrontUrl: front,
				idBackUrl: back
			} });
			toast.success("Documentos enviados. Un administrador los revisará.");
			setFront(null);
			setBack(null);
			load();
		} catch (err) {
			toast.error(err instanceof Error ? err.message : "No se pudo enviar.");
		} finally {
			setVerifying(false);
		}
	}
	const status = profile?.verificationStatus ?? "ninguno";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "mx-auto max-w-lg px-4 py-10",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs font-semibold uppercase tracking-[0.18em] text-subtle",
				children: "Cuenta"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-2 font-display text-4xl font-semibold",
				children: "Perfil"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 flex flex-wrap items-center gap-3 text-sm",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/mis-anuncios",
						className: "text-muted hover:text-fg",
						children: "Mis anuncios"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/ofertas",
						className: "text-muted hover:text-fg",
						children: "Ofertas"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/favoritos",
						className: "text-muted hover:text-fg",
						children: "Favoritos"
					})
				]
			}),
			profile && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 flex flex-wrap items-center gap-2",
				children: [status === "verificado" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(VerifiedBadge, {}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
					tone: toneFor(status),
					children: VERIFICATION_LABEL[status]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-xs uppercase tracking-wider text-subtle",
					children: profile.role === "admin" ? "Administrador" : "Cliente"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-8 rounded-xl border border-border bg-surface p-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-lg font-semibold",
						children: "Verificación de identidad"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm text-muted",
						children: "Sube el frente y el reverso de tu cédula. Un administrador confirma y tu perfil y anuncios quedan marcados como verificados."
					}),
					status === "verificado" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 text-sm text-success",
						children: "Tu cuenta ya está verificada."
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-4 grid gap-4",
						children: [
							status === "pendiente" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm text-warn",
								children: "Documentos en revisión."
							}),
							status === "rechazado" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-sm text-danger",
								children: [
									"Rechazado",
									profile?.verificationNote ? `: ${profile.verificationNote}` : ".",
									" Puedes volver a enviar fotos nítidas."
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid gap-3 sm:grid-cols-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
									className: "grid gap-2 text-sm",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-medium text-muted",
											children: "Frente de la cédula"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											type: "file",
											accept: "image/*",
											className: "text-xs text-muted file:mr-2 file:rounded-md file:border file:border-border file:bg-elevated file:px-3 file:py-2 file:text-fg",
											onChange: (e) => onPick("front", e.target.files?.[0])
										}),
										(front || profile?.idFrontUrl) && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
											src: front || profile?.idFrontUrl || "",
											alt: "Frente cédula",
											className: "h-28 w-full rounded-md object-cover"
										})
									]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
									className: "grid gap-2 text-sm",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-medium text-muted",
											children: "Reverso de la cédula"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											type: "file",
											accept: "image/*",
											className: "text-xs text-muted file:mr-2 file:rounded-md file:border file:border-border file:bg-elevated file:px-3 file:py-2 file:text-fg",
											onChange: (e) => onPick("back", e.target.files?.[0])
										}),
										(back || profile?.idBackUrl) && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
											src: back || profile?.idBackUrl || "",
											alt: "Reverso cédula",
											className: "h-28 w-full rounded-md object-cover"
										})
									]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								type: "button",
								variant: "secondary",
								disabled: verifying,
								onClick: onVerify,
								children: verifying ? "Enviando…" : "Enviar documentos"
							})
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				onSubmit,
				className: "mt-8 grid gap-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Nombre",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							name: "displayName",
							required: true,
							defaultValue: profile?.displayName || user.displayName || ""
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Correo",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							name: "email",
							type: "email",
							defaultValue: profile?.email || user.primaryEmail || ""
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Teléfono",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							name: "phone",
							defaultValue: profile?.phone || ""
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Ciudad",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select, {
							name: "city",
							defaultValue: profile?.city || "Bogotá",
							children: CITIES.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: c }, c))
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "submit",
						disabled: busy,
						children: busy ? "Guardando…" : "Guardar"
					})
				]
			})
		]
	}) });
}
//#endregion
export { Perfil as component };
