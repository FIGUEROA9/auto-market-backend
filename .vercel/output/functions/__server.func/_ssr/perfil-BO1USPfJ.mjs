import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { C as require_jsx_runtime, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as Badge } from "./badge-BozmMpG6.mjs";
import { a as DOC_TYPES, l as STATUS_LABEL, r as CITIES } from "./format-C8tXPYk_.mjs";
import { t as authClient } from "./client-B40BzJxt.mjs";
import { a as useCurrentUserState, t as RedirectToSignIn } from "./gates-7MpIqa07.mjs";
import { t as Button } from "./button-CsbLcD7M.mjs";
import { t as VerifiedBadge } from "./verified-badge-CzmIBawr.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { A as submitVerification, M as updateMyProfile, S as getMyProfile } from "./router-C_w5OZSs.mjs";
import { n as Input, r as Select, t as Field } from "./input-Do1Wrx3v.mjs";
import { t as SiteShell } from "./site-shell-BDUmb5FA.mjs";
import { t as compressImageFile } from "./images-jYgZVdQh.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/perfil-BO1USPfJ.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Perfil() {
	const { user, isPending } = useCurrentUserState();
	const [profile, setProfile] = (0, import_react.useState)(null);
	const [busy, setBusy] = (0, import_react.useState)(false);
	const [pwdBusy, setPwdBusy] = (0, import_react.useState)(false);
	const [front, setFront] = (0, import_react.useState)("");
	const [back, setBack] = (0, import_react.useState)("");
	const [verBusy, setVerBusy] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		if (isPending || !user) return;
		getMyProfile().then((p) => {
			setProfile(p);
			setFront(p?.idFrontUrl ?? "");
			setBack(p?.idBackUrl ?? "");
		}).catch(() => setProfile(null));
	}, [user, isPending]);
	if (isPending) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "mx-auto max-w-lg px-4 py-20",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-40 animate-pulse rounded-xl bg-surface" })
	}) });
	if (!user) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RedirectToSignIn, {});
	async function onSubmit(e) {
		e.preventDefault();
		const fd = new FormData(e.currentTarget);
		setBusy(true);
		try {
			await updateMyProfile({ data: {
				firstName: String(fd.get("firstName")),
				lastName: String(fd.get("lastName")),
				phone: String(fd.get("phone")),
				whatsapp: String(fd.get("whatsapp") || "") || void 0,
				city: String(fd.get("city")),
				address: String(fd.get("address") || "") || void 0,
				email: String(fd.get("email") || "") || void 0,
				documentType: String(fd.get("documentType") || "CC") || void 0,
				documentNumber: String(fd.get("documentNumber") || "") || void 0
			} });
			toast.success("Perfil actualizado.");
			setProfile(await getMyProfile());
		} catch (err) {
			toast.error(err instanceof Error ? err.message : "No se pudo guardar.");
		} finally {
			setBusy(false);
		}
	}
	async function onPassword(e) {
		e.preventDefault();
		const fd = new FormData(e.currentTarget);
		const currentPassword = String(fd.get("currentPassword"));
		const newPassword = String(fd.get("newPassword"));
		if (newPassword !== String(fd.get("confirmPassword"))) {
			toast.error("La confirmación no coincide.");
			return;
		}
		setPwdBusy(true);
		try {
			const res = await authClient.changePassword({
				currentPassword,
				newPassword
			});
			if (res.error) throw new Error(res.error.message || "No se pudo cambiar la contraseña.");
			toast.success("Contraseña actualizada.");
			e.currentTarget.reset();
		} catch (err) {
			toast.error(err instanceof Error ? err.message : "No se pudo cambiar la contraseña.");
		} finally {
			setPwdBusy(false);
		}
	}
	async function pickSide(side, file) {
		if (!file) return;
		try {
			const url = await compressImageFile(file, 1200, .7);
			if (side === "front") setFront(url);
			else setBack(url);
		} catch (err) {
			toast.error(err instanceof Error ? err.message : "No se pudo leer la foto.");
		}
	}
	async function sendVerification(e) {
		e.preventDefault();
		const fd = new FormData(e.currentTarget);
		if (!front || !back) {
			toast.error("Sube el frente y el reverso de tu cédula.");
			return;
		}
		setVerBusy(true);
		try {
			await submitVerification({ data: {
				idFrontUrl: front,
				idBackUrl: back,
				documentType: String(fd.get("documentType") || "CC"),
				documentNumber: String(fd.get("documentNumber"))
			} });
			toast.success("Solicitud enviada. Un administrador la revisará.");
			setProfile(await getMyProfile());
		} catch (err) {
			toast.error(err instanceof Error ? err.message : "No se pudo enviar.");
		} finally {
			setVerBusy(false);
		}
	}
	const disabled = profile?.accountStatus === "deshabilitado";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "mx-auto max-w-lg px-4 py-10",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs font-semibold uppercase tracking-[0.18em] text-subtle",
				children: "Cuenta"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-2 flex flex-wrap items-center gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "font-display text-4xl font-semibold",
					children: "Perfil"
				}), profile?.verificationStatus === "verificado" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(VerifiedBadge, {})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-sm text-muted",
				children: profile?.role === "admin" ? "Eres administrador de AutoMarket." : "Completa tus datos. La verificación te da un sello visible en anuncios y perfil."
			}),
			disabled && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4 rounded-md bg-danger/15 px-3 py-3 text-sm text-danger",
				children: "Esta cuenta está deshabilitada. No puedes publicar ni ofertar."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 flex flex-wrap gap-3 text-sm",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/mis-anuncios",
						className: "text-accent",
						children: "Mis anuncios"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/ofertas",
						className: "text-accent",
						children: "Ofertas"
					}),
					profile?.role === "admin" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/admin",
						className: "text-accent",
						children: "Panel admin"
					})
				]
			}),
			profile && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					onSubmit,
					className: "mt-8 grid gap-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-4 sm:grid-cols-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "Nombres",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									name: "firstName",
									defaultValue: profile.firstName ?? profile.displayName.split(" ")[0] ?? "",
									required: true,
									minLength: 2
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "Apellidos",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									name: "lastName",
									defaultValue: profile.lastName ?? profile.displayName.split(" ").slice(1).join(" "),
									required: true,
									minLength: 2
								})
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Correo",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								name: "email",
								type: "email",
								defaultValue: profile.email ?? ""
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-4 sm:grid-cols-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "Teléfono",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									name: "phone",
									defaultValue: profile.phone ?? "",
									required: true,
									minLength: 7
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "WhatsApp",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									name: "whatsapp",
									defaultValue: profile.whatsapp ?? profile.phone ?? ""
								})
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Ciudad",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select, {
								name: "city",
								defaultValue: profile.city ?? "Bogotá",
								children: CITIES.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: c }, c))
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Dirección",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								name: "address",
								defaultValue: profile.address ?? ""
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-4 sm:grid-cols-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "Tipo de documento",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select, {
									name: "documentType",
									defaultValue: profile.documentType ?? "CC",
									children: DOC_TYPES.map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: d.value,
										children: d.label
									}, d.value))
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "Número de documento",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									name: "documentNumber",
									defaultValue: profile.documentNumber ?? ""
								})
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "submit",
							disabled: busy || disabled,
							children: busy ? "Guardando…" : "Guardar datos"
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "mt-12",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-display text-2xl font-semibold",
							children: "Contraseña"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-sm text-muted",
							children: "Solo tú puedes cambiarla. El administrador no la ve ni la edita."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
							onSubmit: onPassword,
							className: "mt-4 grid gap-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
									label: "Contraseña actual",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										name: "currentPassword",
										type: "password",
										required: true,
										minLength: 8,
										autoComplete: "current-password"
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
									label: "Nueva contraseña",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										name: "newPassword",
										type: "password",
										required: true,
										minLength: 8,
										autoComplete: "new-password"
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
									label: "Confirmar nueva",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										name: "confirmPassword",
										type: "password",
										required: true,
										minLength: 8,
										autoComplete: "new-password"
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									type: "submit",
									variant: "secondary",
									disabled: pwdBusy || disabled,
									children: pwdBusy ? "Actualizando…" : "Cambiar contraseña"
								})
							]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "mt-12",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-wrap items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "font-display text-2xl font-semibold",
								children: "Verificación"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
								tone: profile.verificationStatus === "verificado" ? "success" : profile.verificationStatus === "pendiente" ? "warn" : profile.verificationStatus === "rechazado" ? "danger" : "neutral",
								children: STATUS_LABEL[profile.verificationStatus] ?? profile.verificationStatus
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-sm leading-relaxed text-muted",
							children: "Sube el frente y el reverso de tu cédula. Un administrador revisa las fotos y, si aprueba, tus próximos anuncios salen publicados de inmediato."
						}),
						profile.verificationNote && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-3 rounded-md bg-elevated px-3 py-2 text-sm text-muted",
							children: ["Nota del administrador: ", profile.verificationNote]
						}),
						profile.verificationStatus !== "verificado" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
							onSubmit: sendVerification,
							className: "mt-4 grid gap-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "hidden",
									name: "documentType",
									defaultValue: profile.documentType ?? "CC"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "hidden",
									name: "documentNumber",
									defaultValue: profile.documentNumber ?? ""
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
												className: "text-xs text-muted",
												onChange: (e) => void pickSide("front", e.target.files?.[0])
											}),
											front && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
												src: front,
												alt: "Frente",
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
												className: "text-xs text-muted",
												onChange: (e) => void pickSide("back", e.target.files?.[0])
											}),
											back && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
												src: back,
												alt: "Reverso",
												className: "h-28 w-full rounded-md object-cover"
											})
										]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									type: "submit",
									variant: "secondary",
									disabled: verBusy || disabled,
									children: verBusy ? "Enviando…" : "Enviar a revisión"
								})
							]
						})
					]
				})
			] })
		]
	}) });
}
//#endregion
export { Perfil as component };
