import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { C as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as Badge } from "./badge-BozmMpG6.mjs";
import { a as DOC_TYPES, l as STATUS_LABEL, r as CITIES } from "./format-C8tXPYk_.mjs";
import { t as Button } from "./button-CsbLcD7M.mjs";
import { t as VerifiedBadge } from "./verified-badge-CzmIBawr.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { _ as adminUpdateUser, l as adminListUsers, m as adminSetRole, o as adminDeleteUser, p as adminSetAccountStatus } from "./router-C_w5OZSs.mjs";
import { n as Input, r as Select, t as Field } from "./input-Do1Wrx3v.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/usuarios-CMnHXsjO.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Usuarios() {
	const [rows, setRows] = (0, import_react.useState)([]);
	const [editing, setEditing] = (0, import_react.useState)(null);
	async function reload() {
		setRows(await adminListUsers());
	}
	(0, import_react.useEffect)(() => {
		reload().catch(() => setRows([]));
	}, []);
	async function setRole(userId, role) {
		try {
			await adminSetRole({ data: {
				userId,
				role
			} });
			await reload();
		} catch (err) {
			toast.error(err instanceof Error ? err.message : "No se pudo cambiar el rol.");
		}
	}
	async function toggleStatus(u) {
		try {
			const next = u.accountStatus === "activo" ? "deshabilitado" : "activo";
			await adminSetAccountStatus({ data: {
				userId: u.userId,
				status: next
			} });
			toast.success(next === "activo" ? "Usuario habilitado." : "Usuario deshabilitado.");
			await reload();
		} catch (err) {
			toast.error(err instanceof Error ? err.message : "No se pudo actualizar.");
		}
	}
	async function remove(u) {
		if (!window.confirm(`¿Eliminar a ${u.displayName}? Se borran sus anuncios y ofertas.`)) return;
		try {
			await adminDeleteUser({ data: { userId: u.userId } });
			toast.success("Usuario eliminado.");
			await reload();
		} catch (err) {
			toast.error(err instanceof Error ? err.message : "No se pudo eliminar.");
		}
	}
	async function save(e, userId) {
		e.preventDefault();
		const fd = new FormData(e.currentTarget);
		try {
			await adminUpdateUser({ data: {
				userId,
				firstName: String(fd.get("firstName")),
				lastName: String(fd.get("lastName")),
				phone: String(fd.get("phone") || "") || void 0,
				whatsapp: String(fd.get("whatsapp") || "") || void 0,
				city: String(fd.get("city") || "") || void 0,
				address: String(fd.get("address") || "") || void 0,
				email: String(fd.get("email") || "") || void 0,
				documentType: String(fd.get("documentType") || "") || void 0,
				documentNumber: String(fd.get("documentNumber") || "") || void 0,
				role: String(fd.get("role"))
			} });
			toast.success("Datos actualizados. La contraseña no se modifica desde aquí.");
			setEditing(null);
			await reload();
		} catch (err) {
			toast.error(err instanceof Error ? err.message : "No se pudo guardar.");
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "font-display text-3xl font-semibold",
			children: "Usuarios"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "mt-1 text-sm text-muted",
			children: [rows.length, " perfiles. Puedes editar datos, deshabilitar o eliminar. La contraseña solo la cambia el titular."]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-6 grid gap-3",
			children: rows.map((u) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
				className: "rounded-xl bg-surface p-4 shadow-[var(--shadow-border)]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap items-center gap-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-medium",
								children: u.displayName
							}),
							u.verificationStatus === "verificado" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(VerifiedBadge, {}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
								tone: u.role === "admin" ? "accent" : "neutral",
								children: u.role
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
								tone: u.accountStatus === "deshabilitado" ? "danger" : "success",
								children: STATUS_LABEL[u.accountStatus] ?? u.accountStatus
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-1 text-sm text-muted",
						children: [
							u.email ?? "Sin correo",
							" · ",
							u.city ?? "Sin ciudad",
							" · ",
							u.phone ?? "Sin teléfono"
						]
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap gap-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								size: "sm",
								variant: "secondary",
								onClick: () => setEditing(editing === u.userId ? null : u.userId),
								children: editing === u.userId ? "Cerrar" : "Editar"
							}),
							u.role === "admin" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								size: "sm",
								variant: "ghost",
								onClick: () => void setRole(u.userId, "cliente"),
								children: "Quitar admin"
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								size: "sm",
								variant: "secondary",
								onClick: () => void setRole(u.userId, "admin"),
								children: "Hacer admin"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								size: "sm",
								variant: "outline",
								onClick: () => void toggleStatus(u),
								children: u.accountStatus === "deshabilitado" ? "Habilitar" : "Deshabilitar"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								size: "sm",
								variant: "danger",
								onClick: () => void remove(u),
								children: "Eliminar"
							})
						]
					})]
				}), editing === u.userId && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					onSubmit: (e) => void save(e, u.userId),
					className: "mt-4 grid gap-3 border-t border-border pt-4 sm:grid-cols-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Nombres",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								name: "firstName",
								defaultValue: u.firstName ?? u.displayName.split(" ")[0],
								required: true
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Apellidos",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								name: "lastName",
								defaultValue: u.lastName ?? u.displayName.split(" ").slice(1).join(" "),
								required: true
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Correo",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								name: "email",
								type: "email",
								defaultValue: u.email ?? ""
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Teléfono",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								name: "phone",
								defaultValue: u.phone ?? ""
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "WhatsApp",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								name: "whatsapp",
								defaultValue: u.whatsapp ?? ""
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Ciudad",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select, {
								name: "city",
								defaultValue: u.city ?? "Bogotá",
								children: CITIES.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: c }, c))
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Dirección",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								name: "address",
								defaultValue: u.address ?? ""
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Rol",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
								name: "role",
								defaultValue: u.role,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "cliente",
									children: "cliente"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "admin",
									children: "admin"
								})]
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Documento",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select, {
								name: "documentType",
								defaultValue: u.documentType ?? "CC",
								children: DOC_TYPES.map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: d.value,
									children: d.label
								}, d.value))
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Número",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								name: "documentNumber",
								defaultValue: u.documentNumber ?? ""
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "sm:col-span-2",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								type: "submit",
								size: "sm",
								children: "Guardar cambios"
							})
						})
					]
				})]
			}, u.userId))
		})
	] });
}
//#endregion
export { Usuarios as component };
