import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { C as require_jsx_runtime, x as useNavigate, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as cn } from "./utils-C_uf36nf.mjs";
import { n as BRANDS, r as CITIES, u as STOCK_IMAGES } from "./format-C8tXPYk_.mjs";
import { a as useCurrentUserState, t as RedirectToSignIn } from "./gates-7MpIqa07.mjs";
import { t as Button } from "./button-CsbLcD7M.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { S as getMyProfile, b as createVehicle } from "./router-C_w5OZSs.mjs";
import { i as Textarea, n as Input, r as Select, t as Field } from "./input-Do1Wrx3v.mjs";
import { t as SiteShell } from "./site-shell-BDUmb5FA.mjs";
import { t as compressImageFile } from "./images-jYgZVdQh.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/publicar-1RG0Ir9X.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Publicar() {
	const { user, isPending } = useCurrentUserState();
	const navigate = useNavigate();
	const [busy, setBusy] = (0, import_react.useState)(false);
	const [images, setImages] = (0, import_react.useState)([STOCK_IMAGES[0].src]);
	const [listingType, setListingType] = (0, import_react.useState)("venta");
	const [taxesCurrent, setTaxesCurrent] = (0, import_react.useState)(true);
	const [finesCurrent, setFinesCurrent] = (0, import_react.useState)(true);
	const [swapAny, setSwapAny] = (0, import_react.useState)(true);
	const [verified, setVerified] = (0, import_react.useState)(null);
	const [disabled, setDisabled] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		if (isPending || !user) return;
		getMyProfile().then((p) => {
			setVerified(p?.verificationStatus === "verificado" || p?.role === "admin");
			setDisabled(p?.accountStatus === "deshabilitado");
		}).catch(() => setVerified(false));
	}, [user, isPending]);
	if (isPending) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "mx-auto max-w-2xl px-4 py-20",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-40 animate-pulse rounded-xl bg-surface" })
	}) });
	if (!user) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RedirectToSignIn, {});
	function toggleStock(src) {
		setImages((curr) => {
			if (curr.includes(src)) return curr.filter((x) => x !== src);
			if (curr.length >= 6) {
				toast.error("Máximo 6 fotos.");
				return curr;
			}
			return [...curr, src];
		});
	}
	async function addFiles(files) {
		if (!files) return;
		try {
			const next = [...images];
			for (const file of Array.from(files)) {
				if (next.length >= 6) break;
				next.push(await compressImageFile(file));
			}
			if (images.length + files.length > 6) toast.error("Se tomaron solo las primeras hasta 6.");
			setImages(next.slice(0, 6));
		} catch (err) {
			toast.error(err instanceof Error ? err.message : "No se pudieron cargar las fotos.");
		}
	}
	async function onSubmit(e) {
		e.preventDefault();
		if (!images.length) {
			toast.error("Agrega al menos una foto.");
			return;
		}
		const fd = new FormData(e.currentTarget);
		setBusy(true);
		try {
			const swapPrefs = swapAny ? { any: true } : {
				any: false,
				brand: String(fd.get("swapBrand") || "") || void 0,
				model: String(fd.get("swapModel") || "") || void 0,
				yearMin: fd.get("swapYearMin") ? Number(fd.get("swapYearMin")) : void 0,
				yearMax: fd.get("swapYearMax") ? Number(fd.get("swapYearMax")) : void 0,
				mileageMax: fd.get("swapMileageMax") ? Number(fd.get("swapMileageMax")) : void 0,
				condition: String(fd.get("swapCondition") || "") || void 0,
				fuel: String(fd.get("swapFuel") || "") || void 0,
				transmission: String(fd.get("swapTransmission") || "") || void 0,
				bodyType: String(fd.get("swapBodyType") || "") || void 0,
				city: String(fd.get("swapCity") || "") || void 0,
				priceMin: fd.get("swapPriceMin") ? Number(fd.get("swapPriceMin")) : void 0,
				priceMax: fd.get("swapPriceMax") ? Number(fd.get("swapPriceMax")) : void 0
			};
			const res = await createVehicle({ data: {
				title: String(fd.get("title")),
				brand: String(fd.get("brand")),
				model: String(fd.get("model")),
				year: Number(fd.get("year")),
				mileage: Number(fd.get("mileage")),
				price: Number(fd.get("price")),
				condition: String(fd.get("condition")),
				fuel: String(fd.get("fuel")),
				transmission: String(fd.get("transmission")),
				bodyType: String(fd.get("bodyType")),
				city: String(fd.get("city")),
				description: String(fd.get("description")),
				images,
				listingType,
				soatExpires: String(fd.get("soatExpires") || "") || void 0,
				tecnoExpires: String(fd.get("tecnoExpires") || "") || void 0,
				taxesCurrent,
				taxesDetail: String(fd.get("taxesDetail") || "") || void 0,
				taxesAmount: fd.get("taxesAmount") ? Number(fd.get("taxesAmount")) : void 0,
				finesCurrent,
				finesDetail: String(fd.get("finesDetail") || "") || void 0,
				finesAmount: fd.get("finesAmount") ? Number(fd.get("finesAmount")) : void 0,
				swapPrefs: listingType === "venta" ? { any: true } : swapPrefs
			} });
			toast.success(res.status === "activo" ? "Anuncio publicado." : "Anuncio enviado a revisión. Será público cuando un administrador lo apruebe.");
			navigate({
				to: "/vehiculo/$id",
				params: { id: String(res.id) }
			});
		} catch (err) {
			toast.error(err instanceof Error ? err.message : "No se pudo publicar.");
		} finally {
			setBusy(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "mx-auto max-w-2xl px-4 py-10",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs font-semibold uppercase tracking-[0.18em] text-subtle",
				children: "Vender o permutar"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-2 font-display text-4xl font-semibold",
				children: "Publicar anuncio"
			}),
			disabled ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4 rounded-md bg-danger/15 px-3 py-3 text-sm text-danger",
				children: "Tu cuenta está deshabilitada."
			}) : verified === false ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-4 rounded-md bg-elevated px-3 py-3 text-sm text-muted",
				children: [
					"Todavía no estás verificado: el anuncio queda en revisión hasta que un administrador lo apruebe.",
					" ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/perfil",
						className: "text-accent",
						children: "Verifica tu cédula"
					}),
					" ",
					"para publicar de inmediato."
				]
			}) : verified ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4 text-sm text-muted",
				children: "Cuenta verificada: el anuncio sale público apenas lo publiques."
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				onSubmit,
				className: "mt-8 grid gap-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Título",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							name: "title",
							required: true,
							minLength: 3,
							placeholder: "Mazda CX-5 Grand Touring 2020"
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-4 sm:grid-cols-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Marca",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select, {
								name: "brand",
								required: true,
								defaultValue: "Toyota",
								children: BRANDS.map((b) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: b }, b))
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Línea de vehículo",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								name: "model",
								required: true,
								placeholder: "Corolla, CX-5, Onix Turbo…"
							})
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-4 sm:grid-cols-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "Año",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									name: "year",
									type: "number",
									required: true,
									min: 1980,
									max: 2030,
									defaultValue: 2020
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "Kilometraje",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									name: "mileage",
									type: "number",
									required: true,
									min: 0,
									defaultValue: 4e4
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "Precio COP",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									name: "price",
									type: "number",
									required: true,
									min: 0,
									defaultValue: 5e7
								})
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-4 sm:grid-cols-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Estado",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
								name: "condition",
								defaultValue: "usado",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "usado",
										children: "Usado"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "seminuevo",
										children: "Seminuevo"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "nuevo",
										children: "Nuevo"
									})
								]
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Operación",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
								name: "listingType",
								value: listingType,
								onChange: (e) => setListingType(e.target.value),
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "venta",
										children: "Venta"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "permuta",
										children: "Permuta"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "ambos",
										children: "Venta o permuta"
									})
								]
							})
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-4 sm:grid-cols-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "Combustible",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
									name: "fuel",
									defaultValue: "gasolina",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "gasolina",
											children: "Gasolina"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "diesel",
											children: "Diésel"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "hibrido",
											children: "Híbrido"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "electrico",
											children: "Eléctrico"
										})
									]
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "Caja",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
									name: "transmission",
									defaultValue: "automatica",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "automatica",
										children: "Automática"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "manual",
										children: "Manual"
									})]
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "Carrocería",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
									name: "bodyType",
									defaultValue: "sedan",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "sedan",
											children: "Sedán"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "suv",
											children: "SUV"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "pickup",
											children: "Pickup"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "hatchback",
											children: "Hatchback"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "van",
											children: "Van"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "coupe",
											children: "Coupé"
										})
									]
								})
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Ciudad",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select, {
							name: "city",
							defaultValue: "Bogotá",
							children: CITIES.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: c }, c))
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Descripción",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
							name: "description",
							required: true,
							minLength: 10,
							placeholder: "Estado, extras, historia del vehículo…"
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mb-2 text-sm font-medium text-muted",
							children: "Galería (máximo 6)"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mb-3 text-xs text-subtle",
							children: "Elige fotos de referencia o sube las tuyas. Se deslizan solas en el anuncio."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "grid grid-cols-3 gap-2 sm:grid-cols-5",
							children: STOCK_IMAGES.map((img) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => toggleStock(img.src),
								className: cn("overflow-hidden rounded-md", images.includes(img.src) ? "ring-2 ring-accent" : "ring-1 ring-border"),
								"aria-label": img.label,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: img.src,
									alt: "",
									className: "aspect-square object-cover"
								})
							}, img.src))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "file",
							accept: "image/*",
							multiple: true,
							className: "mt-3 text-xs text-muted",
							onChange: (e) => void addFiles(e.target.files)
						}),
						images.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-3 flex flex-wrap gap-2",
							children: images.map((src) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => setImages((c) => c.filter((x) => x !== src)),
								className: "relative overflow-hidden rounded-md ring-1 ring-border",
								"aria-label": "Quitar foto",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src,
									alt: "",
									className: "size-16 object-cover"
								})
							}, src))
						})
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-xl bg-surface p-4 shadow-[var(--shadow-border)]",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "font-display text-lg font-semibold",
								children: "Papeles"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-3 grid gap-3 sm:grid-cols-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
									label: "Vencimiento SOAT",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										name: "soatExpires",
										type: "date"
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
									label: "Vencimiento tecnomecánica",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										name: "tecnoExpires",
										type: "date"
									})
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "mt-4 flex items-center gap-2 text-sm",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "checkbox",
									checked: taxesCurrent,
									onChange: (e) => setTaxesCurrent(e.target.checked)
								}), "Impuestos al día"]
							}),
							!taxesCurrent && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-3 grid gap-3 sm:grid-cols-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
									label: "Cuáles impuestos no están al día",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										name: "taxesDetail",
										placeholder: "Rodamiento 2026, valorización…"
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
									label: "Valor a deber (COP)",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										name: "taxesAmount",
										type: "number",
										min: 0,
										defaultValue: 0
									})
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "mt-4 flex items-center gap-2 text-sm",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "checkbox",
									checked: finesCurrent,
									onChange: (e) => setFinesCurrent(e.target.checked)
								}), "Sin comparendos pendientes"]
							}),
							!finesCurrent && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-3 grid gap-3 sm:grid-cols-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
									label: "Cuáles comparendos",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										name: "finesDetail",
										placeholder: "Foto-multa, exceso de velocidad…"
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
									label: "Valor a deber (COP)",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										name: "finesAmount",
										type: "number",
										min: 0,
										defaultValue: 0
									})
								})]
							})
						]
					}),
					listingType !== "venta" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-xl bg-surface p-4 shadow-[var(--shadow-border)]",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "font-display text-lg font-semibold",
								children: "Qué recibes en permuta"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "mt-3 flex items-center gap-2 text-sm",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "checkbox",
									checked: swapAny,
									onChange: (e) => setSwapAny(e.target.checked)
								}), "Recibo cualquier tipo de vehículo"]
							}),
							!swapAny && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-4 grid gap-3 sm:grid-cols-2",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
										label: "Marca",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
											name: "swapBrand",
											defaultValue: "",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: "",
												children: "Cualquiera"
											}), BRANDS.map((b) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: b }, b))]
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
										label: "Línea de vehículo",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
											name: "swapModel",
											placeholder: "Opcional"
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
										label: "Año mínimo",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
											name: "swapYearMin",
											type: "number",
											min: 1980,
											max: 2030
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
										label: "Año máximo",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
											name: "swapYearMax",
											type: "number",
											min: 1980,
											max: 2030
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
										label: "Kilometraje máximo",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
											name: "swapMileageMax",
											type: "number",
											min: 0
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
										label: "Estado",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
											name: "swapCondition",
											defaultValue: "",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
													value: "",
													children: "Cualquiera"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
													value: "nuevo",
													children: "Nuevo"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
													value: "seminuevo",
													children: "Seminuevo"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
													value: "usado",
													children: "Usado"
												})
											]
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
										label: "Combustible",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
											name: "swapFuel",
											defaultValue: "",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
													value: "",
													children: "Cualquiera"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
													value: "gasolina",
													children: "Gasolina"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
													value: "diesel",
													children: "Diésel"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
													value: "hibrido",
													children: "Híbrido"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
													value: "electrico",
													children: "Eléctrico"
												})
											]
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
										label: "Caja",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
											name: "swapTransmission",
											defaultValue: "",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
													value: "",
													children: "Cualquiera"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
													value: "automatica",
													children: "Automática"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
													value: "manual",
													children: "Manual"
												})
											]
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
										label: "Carrocería",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
											name: "swapBodyType",
											defaultValue: "",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
													value: "",
													children: "Cualquiera"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
													value: "sedan",
													children: "Sedán"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
													value: "suv",
													children: "SUV"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
													value: "pickup",
													children: "Pickup"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
													value: "hatchback",
													children: "Hatchback"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
													value: "van",
													children: "Van"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
													value: "coupe",
													children: "Coupé"
												})
											]
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
										label: "Ciudad",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
											name: "swapCity",
											defaultValue: "",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: "",
												children: "Cualquiera"
											}), CITIES.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: c }, c))]
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
										label: "Precio mínimo COP",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
											name: "swapPriceMin",
											type: "number",
											min: 0
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
										label: "Precio máximo COP",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
											name: "swapPriceMax",
											type: "number",
											min: 0
										})
									})
								]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "submit",
						disabled: busy || disabled,
						children: busy ? "Publicando…" : "Publicar"
					})
				]
			})
		]
	}) });
}
//#endregion
export { Publicar as component };
