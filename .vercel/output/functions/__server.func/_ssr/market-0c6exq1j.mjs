import { i as TSS_SERVER_FUNCTION, r as createServerFn } from "./ssr.mjs";
import { i as getSql, t as authMiddleware } from "./middleware-D67d4Qk4.mjs";
import { cn as _enum, dn as boolean, gn as object, hn as number, un as array, yn as string } from "../_libs/@better-auth/core+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/market-0c6exq1j.js
var createServerRpc = (serverFnMeta, splitImportFn) => {
	const url = "/_serverFn/" + serverFnMeta.id;
	return Object.assign(splitImportFn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
function asBool(v) {
	return v === true || v === 1 || v === "t" || v === "true" || v === "1";
}
function parseTaxItems(raw) {
	if (!raw) return [];
	try {
		const parsed = JSON.parse(raw);
		if (!Array.isArray(parsed)) return [];
		return parsed.filter((x) => x && typeof x.label === "string");
	} catch {
		return [];
	}
}
function parseSwapPrefs(raw, swapAny) {
	if (swapAny || !raw) return { any: true };
	try {
		return {
			...JSON.parse(raw),
			any: false
		};
	} catch {
		return { any: true };
	}
}
function mapVehicle(row, favoriteIds) {
	const swapAny = row.swap_any == null ? true : asBool(row.swap_any);
	return {
		id: row.id,
		userId: row.user_id,
		title: row.title,
		brand: row.brand,
		model: row.model,
		year: Number(row.year),
		mileage: Number(row.mileage),
		price: Number(row.price),
		condition: row.condition,
		fuel: row.fuel,
		transmission: row.transmission,
		bodyType: row.body_type,
		city: row.city,
		description: row.description,
		imageUrl: row.image_url,
		listingType: row.listing_type,
		status: row.status,
		createdAt: String(row.created_at),
		soatExpiry: row.soat_expiry ? String(row.soat_expiry).slice(0, 10) : null,
		tecnoExpiry: row.tecno_expiry ? String(row.tecno_expiry).slice(0, 10) : null,
		impuestosAlDia: row.impuestos_al_dia == null ? true : asBool(row.impuestos_al_dia),
		impuestosItems: parseTaxItems(row.impuestos_detalle),
		impuestosValor: Number(row.impuestos_valor ?? 0),
		swapAny,
		swapPrefs: parseSwapPrefs(row.swap_prefs, swapAny),
		sellerName: row.seller_name ?? null,
		sellerVerified: asBool(row.seller_verified),
		isFavorite: favoriteIds ? favoriteIds.has(row.id) : false
	};
}
async function ensureProfileRow(userId, name, email) {
	const sql = await getSql();
	if ((await sql`
    select user_id from profiles where user_id = ${userId}
  `).length) return;
	const role = ((await sql`
    select count(*)::int as c from profiles where role = 'admin'
  `)[0]?.c ?? 0) === 0 ? "admin" : "cliente";
	await sql`
    insert into profiles (user_id, display_name, email, role)
    values (${userId}, ${name || "Usuario"}, ${email ?? null}, ${role})
  `;
}
async function requireAdmin(userId) {
	await ensureProfileRow(userId);
	if ((await (await getSql())`
    select role from profiles where user_id = ${userId}
  `)[0]?.role !== "admin") throw new Error("Forbidden");
}
function mapProfile(r, withDocs = false) {
	return {
		userId: r.user_id,
		displayName: r.display_name,
		email: r.email,
		phone: r.phone,
		city: r.city,
		role: r.role,
		createdAt: String(r.created_at),
		verificationStatus: r.verification_status ?? "ninguno",
		verificationNote: r.verification_note ?? null,
		verifiedAt: r.verified_at ? String(r.verified_at) : null,
		idFrontUrl: withDocs ? r.id_front_url ?? null : void 0,
		idBackUrl: withDocs ? r.id_back_url ?? null : void 0
	};
}
var dateStr = string().regex(/^\d{4}-\d{2}-\d{2}$/, "Fecha inválida");
var taxItemSchema = object({
	label: string().min(2).max(80),
	amount: number().min(0)
});
var swapPrefsSchema = object({
	any: boolean(),
	brands: array(string().min(1).max(40)).max(20).optional(),
	lines: array(string().min(1).max(40)).max(20).optional(),
	yearMin: number().int().min(1980).max(2030).optional(),
	yearMax: number().int().min(1980).max(2030).optional(),
	mileageMax: number().int().min(0).max(1e6).optional(),
	priceMin: number().min(0).optional(),
	priceMax: number().min(0).optional(),
	conditions: array(string()).max(8).optional(),
	fuels: array(string()).max(8).optional(),
	transmissions: array(string()).max(8).optional(),
	bodyTypes: array(string()).max(8).optional(),
	cities: array(string()).max(12).optional()
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
	imageUrl: string().min(1).max(500),
	listingType: _enum([
		"venta",
		"permuta",
		"ambos"
	]),
	soatExpiry: dateStr,
	tecnoExpiry: dateStr,
	impuestosAlDia: boolean(),
	impuestosItems: array(taxItemSchema).max(12).optional(),
	swapPrefs: swapPrefsSchema.optional()
});
function cleanSwap(prefs, listingType) {
	if (listingType === "venta") return {
		any: true,
		json: null
	};
	if (!prefs || prefs.any) return {
		any: true,
		json: null
	};
	const cleaned = { any: false };
	if (prefs.brands?.length) cleaned.brands = prefs.brands;
	if (prefs.lines?.length) cleaned.lines = prefs.lines.map((l) => l.trim()).filter(Boolean);
	if (prefs.yearMin) cleaned.yearMin = prefs.yearMin;
	if (prefs.yearMax) cleaned.yearMax = prefs.yearMax;
	if (prefs.mileageMax != null) cleaned.mileageMax = prefs.mileageMax;
	if (prefs.priceMin != null) cleaned.priceMin = prefs.priceMin;
	if (prefs.priceMax != null) cleaned.priceMax = prefs.priceMax;
	if (prefs.conditions?.length) cleaned.conditions = prefs.conditions;
	if (prefs.fuels?.length) cleaned.fuels = prefs.fuels;
	if (prefs.transmissions?.length) cleaned.transmissions = prefs.transmissions;
	if (prefs.bodyTypes?.length) cleaned.bodyTypes = prefs.bodyTypes;
	if (prefs.cities?.length) cleaned.cities = prefs.cities;
	if (!Object.keys(cleaned).some((k) => k !== "any")) return {
		any: true,
		json: null
	};
	return {
		any: false,
		json: JSON.stringify(cleaned)
	};
}
function swapMismatch(vehicle, prefs) {
	if (prefs.any) return null;
	if (prefs.brands?.length && !prefs.brands.includes(vehicle.brand)) return `La marca debe ser ${prefs.brands.join(", ")}.`;
	if (prefs.lines?.length) {
		const line = vehicle.model.trim().toLowerCase();
		if (!prefs.lines.some((l) => line.includes(l.trim().toLowerCase()))) return `La línea debe coincidir con: ${prefs.lines.join(", ")}.`;
	}
	if (prefs.yearMin && vehicle.year < prefs.yearMin) return `El año mínimo aceptado es ${prefs.yearMin}.`;
	if (prefs.yearMax && vehicle.year > prefs.yearMax) return `El año máximo aceptado es ${prefs.yearMax}.`;
	if (prefs.mileageMax != null && vehicle.mileage > prefs.mileageMax) return `El kilometraje máximo aceptado es ${prefs.mileageMax.toLocaleString("es-CO")} km.`;
	if (prefs.priceMin != null && vehicle.price < prefs.priceMin) return "El valor del vehículo está por debajo del mínimo aceptado.";
	if (prefs.priceMax != null && vehicle.price > prefs.priceMax) return "El valor del vehículo supera el máximo aceptado.";
	if (prefs.conditions?.length && !prefs.conditions.includes(vehicle.condition)) return "El estado del vehículo no está dentro de los aceptados.";
	if (prefs.fuels?.length && !prefs.fuels.includes(vehicle.fuel)) return "El combustible no está dentro de los aceptados.";
	if (prefs.transmissions?.length && !prefs.transmissions.includes(vehicle.transmission)) return "La caja no está dentro de las aceptadas.";
	if (prefs.bodyTypes?.length && !prefs.bodyTypes.includes(vehicle.bodyType)) return "El tipo de carrocería no está dentro de los aceptados.";
	if (prefs.cities?.length && !prefs.cities.includes(vehicle.city)) return `Solo se reciben vehículos de: ${prefs.cities.join(", ")}.`;
	return null;
}
var listVehicles_createServerFn_handler = createServerRpc({
	id: "8e8d9e3514494b7d7c824100f6459e0542b8e1954214f2fb4bc645219e083582",
	name: "listVehicles",
	filename: "src/lib/market.ts"
}, (opts) => listVehicles.__executeServer(opts));
var listVehicles = createServerFn({ method: "GET" }).validator(object({
	q: string().optional(),
	brand: string().optional(),
	listingType: string().optional(),
	bodyType: string().optional(),
	city: string().optional()
})).handler(listVehicles_createServerFn_handler, async ({ data }) => {
	let mapped = (await (await getSql())`
      select v.*, p.display_name as seller_name,
             (p.verification_status = 'verificado') as seller_verified
      from vehicles v
      left join profiles p on p.user_id = v.user_id
      where v.status = 'activo'
      order by v.created_at desc
    `).map((r) => mapVehicle(r));
	const q = data.q?.trim().toLowerCase();
	if (q) mapped = mapped.filter((v) => v.title.toLowerCase().includes(q) || v.brand.toLowerCase().includes(q) || v.model.toLowerCase().includes(q) || v.city.toLowerCase().includes(q));
	if (data.brand) mapped = mapped.filter((v) => v.brand === data.brand);
	if (data.listingType) mapped = mapped.filter((v) => v.listingType === data.listingType || v.listingType === "ambos");
	if (data.bodyType) mapped = mapped.filter((v) => v.bodyType === data.bodyType);
	if (data.city) mapped = mapped.filter((v) => v.city === data.city);
	return mapped;
});
var getVehicle_createServerFn_handler = createServerRpc({
	id: "e57651b22d5aae505d1987db30fd14e53d33dcba46e5c94fa6dde1cfd0caeaca",
	name: "getVehicle",
	filename: "src/lib/market.ts"
}, (opts) => getVehicle.__executeServer(opts));
var getVehicle = createServerFn({ method: "GET" }).validator(object({ id: number() })).handler(getVehicle_createServerFn_handler, async ({ data }) => {
	const rows = await (await getSql())`
      select v.*, p.display_name as seller_name,
             (p.verification_status = 'verificado') as seller_verified
      from vehicles v
      left join profiles p on p.user_id = v.user_id
      where v.id = ${data.id} and v.status = 'activo'
    `;
	return rows[0] ? mapVehicle(rows[0]) : null;
});
var getManagedVehicle_createServerFn_handler = createServerRpc({
	id: "eb11e1175958c92786dc470f03da00882525fa9317652a838ec2ce87f9ddb9ac",
	name: "getManagedVehicle",
	filename: "src/lib/market.ts"
}, (opts) => getManagedVehicle.__executeServer(opts));
var getManagedVehicle = createServerFn({ method: "GET" }).middleware([authMiddleware]).validator(object({ id: number() })).handler(getManagedVehicle_createServerFn_handler, async ({ context, data }) => {
	await ensureProfileRow(context.userId);
	const sql = await getSql();
	const isAdmin = (await sql`
      select role from profiles where user_id = ${context.userId}
    `)[0]?.role === "admin";
	const row = (await sql`
      select v.*, p.display_name as seller_name,
             (p.verification_status = 'verificado') as seller_verified
      from vehicles v
      left join profiles p on p.user_id = v.user_id
      where v.id = ${data.id}
    `)[0];
	if (!row) return null;
	if (!isAdmin && row.user_id !== context.userId && row.status !== "activo") return null;
	if (!isAdmin && row.user_id !== context.userId) return mapVehicle(row);
	return mapVehicle(row);
});
var featuredVehicles_createServerFn_handler = createServerRpc({
	id: "3f93c033f08ce25c61eb0c63727d4af8b3029ed4677dcf75b0e4a3975c48ea3d",
	name: "featuredVehicles",
	filename: "src/lib/market.ts"
}, (opts) => featuredVehicles.__executeServer(opts));
var featuredVehicles = createServerFn({ method: "GET" }).handler(featuredVehicles_createServerFn_handler, async () => {
	return (await (await getSql())`
    select v.*, p.display_name as seller_name,
           (p.verification_status = 'verificado') as seller_verified
    from vehicles v
    left join profiles p on p.user_id = v.user_id
    where v.status = 'activo'
    order by v.created_at desc
    limit 6
  `).map((r) => mapVehicle(r));
});
var marketStats_createServerFn_handler = createServerRpc({
	id: "e1a7d1599464aa7cece15ef92763881330d6c1e5282cbf37158b22048434979a",
	name: "marketStats",
	filename: "src/lib/market.ts"
}, (opts) => marketStats.__executeServer(opts));
var marketStats = createServerFn({ method: "GET" }).handler(marketStats_createServerFn_handler, async () => {
	const sql = await getSql();
	const v = await sql`select count(*)::int as c from vehicles where status = 'activo'`;
	const sale = await sql`select count(*)::int as c from vehicles where status = 'activo' and listing_type in ('venta','ambos')`;
	const swap = await sql`select count(*)::int as c from vehicles where status = 'activo' and listing_type in ('permuta','ambos')`;
	const cities = await sql`select count(distinct city)::int as c from vehicles where status = 'activo'`;
	return {
		active: v[0]?.c ?? 0,
		sale: sale[0]?.c ?? 0,
		swap: swap[0]?.c ?? 0,
		cities: cities[0]?.c ?? 0
	};
});
var getMyProfile_createServerFn_handler = createServerRpc({
	id: "3bb987c2dd3c1408c63c66c46d9989de1337f46076d1cd176d97486ddc515e6c",
	name: "getMyProfile",
	filename: "src/lib/market.ts"
}, (opts) => getMyProfile.__executeServer(opts));
var getMyProfile = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(getMyProfile_createServerFn_handler, async ({ context }) => {
	await ensureProfileRow(context.userId);
	const rows = await (await getSql())`
      select user_id, display_name, email, phone, city, role, created_at,
             verification_status, verification_note, verified_at, id_front_url, id_back_url
      from profiles where user_id = ${context.userId}
    `;
	return rows[0] ? mapProfile(rows[0], true) : null;
});
var updateMyProfile_createServerFn_handler = createServerRpc({
	id: "ae2026bd31978517e8a16f26dcfea6d515c96b8e28f24278bf736712190a11dc",
	name: "updateMyProfile",
	filename: "src/lib/market.ts"
}, (opts) => updateMyProfile.__executeServer(opts));
var updateMyProfile = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator(object({
	displayName: string().min(2).max(80),
	phone: string().max(30).optional(),
	city: string().max(60).optional(),
	email: string().email().optional()
})).handler(updateMyProfile_createServerFn_handler, async ({ context, data }) => {
	await ensureProfileRow(context.userId, data.displayName, data.email);
	await (await getSql())`
      update profiles
      set display_name = ${data.displayName},
          phone = ${data.phone ?? null},
          city = ${data.city ?? null},
          email = ${data.email ?? null}
      where user_id = ${context.userId}
    `;
	return { ok: true };
});
var imageDataUrl = string().min(40).max(2e6).refine((s) => s.startsWith("data:image/"), "Imagen inválida");
var submitVerification_createServerFn_handler = createServerRpc({
	id: "1f5ee8ac64dce6ec65dda5869719e02be04f83b54cdca775cb043d29083f1831",
	name: "submitVerification",
	filename: "src/lib/market.ts"
}, (opts) => submitVerification.__executeServer(opts));
var submitVerification = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator(object({
	idFrontUrl: imageDataUrl,
	idBackUrl: imageDataUrl
})).handler(submitVerification_createServerFn_handler, async ({ context, data }) => {
	await ensureProfileRow(context.userId);
	const sql = await getSql();
	if ((await sql`
      select verification_status from profiles where user_id = ${context.userId}
    `)[0]?.verification_status === "verificado") throw new Error("Tu cuenta ya está verificada.");
	await sql`
      update profiles
      set id_front_url = ${data.idFrontUrl},
          id_back_url = ${data.idBackUrl},
          verification_status = 'pendiente',
          verification_note = null
      where user_id = ${context.userId}
    `;
	return { ok: true };
});
var createVehicle_createServerFn_handler = createServerRpc({
	id: "872db24c654235b1ea035d7a6f33f7e3e906376efb819b722eae1066e31bdb88",
	name: "createVehicle",
	filename: "src/lib/market.ts"
}, (opts) => createVehicle.__executeServer(opts));
var createVehicle = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator(vehicleInput).handler(createVehicle_createServerFn_handler, async ({ context, data }) => {
	await ensureProfileRow(context.userId);
	if (!data.impuestosAlDia && (!data.impuestosItems || data.impuestosItems.length === 0)) throw new Error("Indica qué impuestos no están al día y el valor adeudado.");
	const items = data.impuestosAlDia ? [] : data.impuestosItems ?? [];
	const valor = items.reduce((s, i) => s + Number(i.amount || 0), 0);
	const swap = cleanSwap(data.swapPrefs, data.listingType);
	return { id: (await (await getSql())`
      insert into vehicles (
        user_id, title, brand, model, year, mileage, price, condition, fuel,
        transmission, body_type, city, description, image_url, listing_type, status,
        soat_expiry, tecno_expiry, impuestos_al_dia, impuestos_detalle, impuestos_valor,
        swap_any, swap_prefs
      ) values (
        ${context.userId}, ${data.title}, ${data.brand}, ${data.model}, ${data.year},
        ${data.mileage}, ${data.price}, ${data.condition}, ${data.fuel},
        ${data.transmission}, ${data.bodyType}, ${data.city}, ${data.description},
        ${data.imageUrl}, ${data.listingType}, 'pendiente',
        ${data.soatExpiry}, ${data.tecnoExpiry}, ${data.impuestosAlDia},
        ${items.length ? JSON.stringify(items) : null}, ${valor},
        ${swap.any}, ${swap.json}
      )
      returning id
    `)[0].id };
});
var listMyVehicles_createServerFn_handler = createServerRpc({
	id: "500ce052c70b44499ccb055486c0782c46a07032936114e16d5f31473869a147",
	name: "listMyVehicles",
	filename: "src/lib/market.ts"
}, (opts) => listMyVehicles.__executeServer(opts));
var listMyVehicles = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(listMyVehicles_createServerFn_handler, async ({ context }) => {
	await ensureProfileRow(context.userId);
	return (await (await getSql())`
      select v.*, p.display_name as seller_name,
             (p.verification_status = 'verificado') as seller_verified
      from vehicles v
      left join profiles p on p.user_id = v.user_id
      where v.user_id = ${context.userId}
      order by v.created_at desc
    `).map((r) => mapVehicle(r));
});
var updateVehicleStatus_createServerFn_handler = createServerRpc({
	id: "61ba521e47a60af446fff85467351603d65bd1d742826ddcf8f5142e135eed9b",
	name: "updateVehicleStatus",
	filename: "src/lib/market.ts"
}, (opts) => updateVehicleStatus.__executeServer(opts));
var updateVehicleStatus = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator(object({
	id: number(),
	status: _enum([
		"activo",
		"pausado",
		"vendido"
	])
})).handler(updateVehicleStatus_createServerFn_handler, async ({ context, data }) => {
	const sql = await getSql();
	const rows = await sql`
      select status from vehicles where id = ${data.id} and user_id = ${context.userId}
    `;
	if (!rows[0]) throw new Error("Anuncio no encontrado.");
	const current = rows[0].status;
	if (current === "pendiente" || current === "rechazado") throw new Error("Este anuncio todavía no ha sido aprobado.");
	if (data.status === "activo" && current !== "pausado") throw new Error("No puedes publicar el anuncio sin aprobación.");
	await sql`
      update vehicles
      set status = ${data.status}
      where id = ${data.id} and user_id = ${context.userId}
    `;
	return { ok: true };
});
var resubmitVehicle_createServerFn_handler = createServerRpc({
	id: "4633f829ddcdb2226a02e0d789726ff72f861fac22d09144f1a0340e36bfbb84",
	name: "resubmitVehicle",
	filename: "src/lib/market.ts"
}, (opts) => resubmitVehicle.__executeServer(opts));
var resubmitVehicle = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator(object({ id: number() })).handler(resubmitVehicle_createServerFn_handler, async ({ context, data }) => {
	const sql = await getSql();
	const rows = await sql`
      select status from vehicles where id = ${data.id} and user_id = ${context.userId}
    `;
	if (!rows[0]) throw new Error("Anuncio no encontrado.");
	if (rows[0].status !== "rechazado") throw new Error("Solo se puede reenviar un anuncio rechazado.");
	await sql`
      update vehicles set status = 'pendiente'
      where id = ${data.id} and user_id = ${context.userId}
    `;
	return { ok: true };
});
var deleteMyVehicle_createServerFn_handler = createServerRpc({
	id: "5b13f53e1e66ccadb08189572c7ce8bed43db14cd7acf851496721cc0c274318",
	name: "deleteMyVehicle",
	filename: "src/lib/market.ts"
}, (opts) => deleteMyVehicle.__executeServer(opts));
var deleteMyVehicle = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator(object({ id: number() })).handler(deleteMyVehicle_createServerFn_handler, async ({ context, data }) => {
	await (await getSql())`delete from vehicles where id = ${data.id} and user_id = ${context.userId}`;
	return { ok: true };
});
var toggleFavorite_createServerFn_handler = createServerRpc({
	id: "4228a2fbef9856664c6604d378d3fd9130e27659cd9d12504251644309c9e121",
	name: "toggleFavorite",
	filename: "src/lib/market.ts"
}, (opts) => toggleFavorite.__executeServer(opts));
var toggleFavorite = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator(object({ vehicleId: number() })).handler(toggleFavorite_createServerFn_handler, async ({ context, data }) => {
	const sql = await getSql();
	if ((await sql`
      select vehicle_id from favorites
      where user_id = ${context.userId} and vehicle_id = ${data.vehicleId}
    `).length) {
		await sql`
        delete from favorites
        where user_id = ${context.userId} and vehicle_id = ${data.vehicleId}
      `;
		return { favorite: false };
	}
	await sql`
      insert into favorites (user_id, vehicle_id)
      values (${context.userId}, ${data.vehicleId})
    `;
	return { favorite: true };
});
var listFavorites_createServerFn_handler = createServerRpc({
	id: "f78c5a3522e7617e991a488e7d1693410ba3e4bc919087024a5b79a03f5f64a8",
	name: "listFavorites",
	filename: "src/lib/market.ts"
}, (opts) => listFavorites.__executeServer(opts));
var listFavorites = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(listFavorites_createServerFn_handler, async ({ context }) => {
	const rows = await (await getSql())`
      select v.*, p.display_name as seller_name,
             (p.verification_status = 'verificado') as seller_verified
      from favorites f
      join vehicles v on v.id = f.vehicle_id
      left join profiles p on p.user_id = v.user_id
      where f.user_id = ${context.userId} and v.status = 'activo'
      order by f.created_at desc
    `;
	return rows.map((r) => mapVehicle(r, new Set(rows.map((x) => x.id))));
});
var isFavorite_createServerFn_handler = createServerRpc({
	id: "40e30b76c4a08f6e8ac6f3c95267b71558c5e7845ffcd452380c9caf77a133ad",
	name: "isFavorite",
	filename: "src/lib/market.ts"
}, (opts) => isFavorite.__executeServer(opts));
var isFavorite = createServerFn({ method: "GET" }).middleware([authMiddleware]).validator(object({ vehicleId: number() })).handler(isFavorite_createServerFn_handler, async ({ context, data }) => {
	return { favorite: ((await (await getSql())`
      select count(*)::int as c from favorites
      where user_id = ${context.userId} and vehicle_id = ${data.vehicleId}
    `)[0]?.c ?? 0) > 0 };
});
var createOffer_createServerFn_handler = createServerRpc({
	id: "535749e4449666afd747fcbe7d062724e9ac354f40505f97eb1130dc56ce0fe3",
	name: "createOffer",
	filename: "src/lib/market.ts"
}, (opts) => createOffer.__executeServer(opts));
var createOffer = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator(object({
	vehicleId: number(),
	offerType: _enum(["compra", "permuta"]),
	amount: number().optional(),
	swapVehicleId: number().optional(),
	message: string().max(800).optional()
})).handler(createOffer_createServerFn_handler, async ({ context, data }) => {
	await ensureProfileRow(context.userId);
	const sql = await getSql();
	const vehicleRows = await sql`
      select v.*, p.display_name as seller_name,
             (p.verification_status = 'verificado') as seller_verified
      from vehicles v
      left join profiles p on p.user_id = v.user_id
      where v.id = ${data.vehicleId}
    `;
	const target = vehicleRows[0] ? mapVehicle(vehicleRows[0]) : null;
	if (!target || target.status !== "activo") throw new Error("El anuncio no está disponible.");
	if (target.userId === context.userId) throw new Error("No puedes ofertar sobre tu propio anuncio.");
	if (data.offerType === "compra" && target.listingType === "permuta") throw new Error("Este anuncio solo acepta permuta.");
	if (data.offerType === "permuta" && target.listingType === "venta") throw new Error("Este anuncio no acepta permuta.");
	if (data.offerType === "permuta") {
		if (!data.swapVehicleId) throw new Error("Elige un vehículo para permutar.");
		const mine = await sql`
        select v.*, p.display_name as seller_name,
               (p.verification_status = 'verificado') as seller_verified
        from vehicles v
        left join profiles p on p.user_id = v.user_id
        where v.id = ${data.swapVehicleId} and v.user_id = ${context.userId} and v.status = 'activo'
      `;
		if (!mine[0]) throw new Error("El vehículo de permuta no es tuyo o no está activo.");
		const mismatch = swapMismatch(mapVehicle(mine[0]), target.swapPrefs);
		if (mismatch) throw new Error(`Tu vehículo no cumple las condiciones de permuta: ${mismatch}`);
	}
	return { id: (await sql`
      insert into offers (vehicle_id, buyer_id, offer_type, amount, swap_vehicle_id, message, status)
      values (
        ${data.vehicleId}, ${context.userId}, ${data.offerType},
        ${data.amount ?? null}, ${data.swapVehicleId ?? null}, ${data.message ?? null}, 'pendiente'
      )
      returning id
    `)[0].id };
});
function mapOffer(row) {
	return {
		id: row.id,
		vehicleId: row.vehicle_id,
		buyerId: row.buyer_id,
		offerType: row.offer_type,
		amount: row.amount == null ? null : Number(row.amount),
		swapVehicleId: row.swap_vehicle_id,
		message: row.message,
		status: row.status,
		createdAt: String(row.created_at),
		vehicleTitle: row.vehicle_title,
		vehicleImage: row.vehicle_image,
		swapTitle: row.swap_title ?? null,
		buyerName: row.buyer_name ?? null
	};
}
var listMyOffers_createServerFn_handler = createServerRpc({
	id: "880ef5ec41c1db3d3d62edaaf3f2439d6bddb425428d1edc3a858fe8cba13324",
	name: "listMyOffers",
	filename: "src/lib/market.ts"
}, (opts) => listMyOffers.__executeServer(opts));
var listMyOffers = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(listMyOffers_createServerFn_handler, async ({ context }) => {
	await ensureProfileRow(context.userId);
	const sql = await getSql();
	const sent = await sql`
      select o.*, v.title as vehicle_title, v.image_url as vehicle_image,
             s.title as swap_title, p.display_name as buyer_name
      from offers o
      join vehicles v on v.id = o.vehicle_id
      left join vehicles s on s.id = o.swap_vehicle_id
      left join profiles p on p.user_id = o.buyer_id
      where o.buyer_id = ${context.userId}
      order by o.created_at desc
    `;
	const received = await sql`
      select o.*, v.title as vehicle_title, v.image_url as vehicle_image,
             s.title as swap_title, p.display_name as buyer_name
      from offers o
      join vehicles v on v.id = o.vehicle_id
      left join vehicles s on s.id = o.swap_vehicle_id
      left join profiles p on p.user_id = o.buyer_id
      where v.user_id = ${context.userId}
      order by o.created_at desc
    `;
	return {
		sent: sent.map(mapOffer),
		received: received.map(mapOffer)
	};
});
var respondOffer_createServerFn_handler = createServerRpc({
	id: "21f77dd4cce131c34186ce9c4e45018e0243178ca47c730aaaa693a49963264d",
	name: "respondOffer",
	filename: "src/lib/market.ts"
}, (opts) => respondOffer.__executeServer(opts));
var respondOffer = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator(object({
	id: number(),
	status: _enum([
		"aceptada",
		"rechazada",
		"cerrada"
	])
})).handler(respondOffer_createServerFn_handler, async ({ context, data }) => {
	const sql = await getSql();
	const rows = await sql`
      select o.id, o.vehicle_id
      from offers o
      join vehicles v on v.id = o.vehicle_id
      where o.id = ${data.id} and v.user_id = ${context.userId}
    `;
	if (!rows[0]) throw new Error("Oferta no encontrada.");
	await sql`update offers set status = ${data.status} where id = ${data.id}`;
	if (data.status === "aceptada") await sql`update vehicles set status = 'vendido' where id = ${rows[0].vehicle_id} and user_id = ${context.userId}`;
	return { ok: true };
});
var submitContact_createServerFn_handler = createServerRpc({
	id: "80872669a7e86587fa82b542eabcf80dd7e750ba39b4d79b600d5b0b8f2b7504",
	name: "submitContact",
	filename: "src/lib/market.ts"
}, (opts) => submitContact.__executeServer(opts));
var submitContact = createServerFn({ method: "POST" }).validator(object({
	name: string().min(2).max(80),
	email: string().email(),
	phone: string().min(6).max(30),
	subject: string().max(120).optional(),
	message: string().min(8).max(2e3)
})).handler(submitContact_createServerFn_handler, async ({ data }) => {
	await (await getSql())`
      insert into contacts (name, email, phone, subject, message)
      values (${data.name}, ${data.email}, ${data.phone}, ${data.subject ?? null}, ${data.message})
    `;
	return { ok: true };
});
var adminStats_createServerFn_handler = createServerRpc({
	id: "b34b17628a3c8ac02d7d5f81af711f24679e14cbbcaa059e8245837a56896633",
	name: "adminStats",
	filename: "src/lib/market.ts"
}, (opts) => adminStats.__executeServer(opts));
var adminStats = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(adminStats_createServerFn_handler, async ({ context }) => {
	await requireAdmin(context.userId);
	const sql = await getSql();
	const users = await sql`select count(*)::int as c from profiles`;
	const vehicles = await sql`select count(*)::int as c from vehicles`;
	const pending = await sql`select count(*)::int as c from offers where status = 'pendiente'`;
	const pendingListings = await sql`select count(*)::int as c from vehicles where status = 'pendiente'`;
	const pendingVerifications = await sql`select count(*)::int as c from profiles where verification_status = 'pendiente'`;
	const contacts = await sql`select count(*)::int as c from contacts`;
	const byStatus = await sql`
      select status, count(*)::int as c from vehicles group by status
    `;
	const byType = await sql`
      select listing_type, count(*)::int as c from vehicles group by listing_type
    `;
	const recentOffers = await sql`
      select o.*, v.title as vehicle_title, v.image_url as vehicle_image,
             s.title as swap_title, p.display_name as buyer_name
      from offers o
      join vehicles v on v.id = o.vehicle_id
      left join vehicles s on s.id = o.swap_vehicle_id
      left join profiles p on p.user_id = o.buyer_id
      order by o.created_at desc
      limit 8
    `;
	return {
		users: users[0]?.c ?? 0,
		vehicles: vehicles[0]?.c ?? 0,
		pending: pending[0]?.c ?? 0,
		pendingListings: pendingListings[0]?.c ?? 0,
		pendingVerifications: pendingVerifications[0]?.c ?? 0,
		contacts: contacts[0]?.c ?? 0,
		byStatus,
		byType,
		recentOffers: recentOffers.map(mapOffer)
	};
});
var adminListUsers_createServerFn_handler = createServerRpc({
	id: "9c8a94074c5453ba74bbccea89e6f5e1d5057e1f223f8e62446c4dd6acaa0670",
	name: "adminListUsers",
	filename: "src/lib/market.ts"
}, (opts) => adminListUsers.__executeServer(opts));
var adminListUsers = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(adminListUsers_createServerFn_handler, async ({ context }) => {
	await requireAdmin(context.userId);
	return (await (await getSql())`
      select user_id, display_name, email, phone, city, role, created_at,
             verification_status, verification_note, verified_at, id_front_url, id_back_url
      from profiles
      order by
        case verification_status when 'pendiente' then 0 when 'rechazado' then 1 else 2 end,
        created_at desc
    `).map((r) => mapProfile(r, true));
});
var adminSetRole_createServerFn_handler = createServerRpc({
	id: "1d34babc538074bb215ff83d0e260131bcadad30f354ec63b06b87464c270370",
	name: "adminSetRole",
	filename: "src/lib/market.ts"
}, (opts) => adminSetRole.__executeServer(opts));
var adminSetRole = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator(object({
	userId: string(),
	role: _enum(["admin", "cliente"])
})).handler(adminSetRole_createServerFn_handler, async ({ context, data }) => {
	await requireAdmin(context.userId);
	if (data.userId === context.userId && data.role !== "admin") throw new Error("No puedes quitarte el rol de administrador.");
	await (await getSql())`update profiles set role = ${data.role} where user_id = ${data.userId}`;
	return { ok: true };
});
var adminSetVerification_createServerFn_handler = createServerRpc({
	id: "b3f519c10eee813f0e03ad63d37d27dd920541c15e3c3b74d6ec7ff266d25b70",
	name: "adminSetVerification",
	filename: "src/lib/market.ts"
}, (opts) => adminSetVerification.__executeServer(opts));
var adminSetVerification = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator(object({
	userId: string(),
	status: _enum(["verificado", "rechazado"]),
	note: string().max(300).optional()
})).handler(adminSetVerification_createServerFn_handler, async ({ context, data }) => {
	await requireAdmin(context.userId);
	const sql = await getSql();
	if (data.status === "verificado") await sql`
        update profiles
        set verification_status = 'verificado',
            verification_note = ${data.note ?? null},
            verified_at = now()
        where user_id = ${data.userId}
      `;
	else await sql`
        update profiles
        set verification_status = 'rechazado',
            verification_note = ${data.note || "Documento ilegible o no coincide."},
            verified_at = null
        where user_id = ${data.userId}
      `;
	return { ok: true };
});
var adminListVehicles_createServerFn_handler = createServerRpc({
	id: "60756c55fd3cc7cd573e79c47978d562e4d9fb5e3fb9035dffe883813ef25091",
	name: "adminListVehicles",
	filename: "src/lib/market.ts"
}, (opts) => adminListVehicles.__executeServer(opts));
var adminListVehicles = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(adminListVehicles_createServerFn_handler, async ({ context }) => {
	await requireAdmin(context.userId);
	return (await (await getSql())`
      select v.*, p.display_name as seller_name,
             (p.verification_status = 'verificado') as seller_verified
      from vehicles v
      left join profiles p on p.user_id = v.user_id
      order by
        case v.status when 'pendiente' then 0 when 'rechazado' then 1 else 2 end,
        v.created_at desc
    `).map((r) => mapVehicle(r));
});
var adminSetVehicleStatus_createServerFn_handler = createServerRpc({
	id: "83f08895a16fbb4a72b960f20b76a5f59f70f5f9b57d348c1f22ac9888b3e9a5",
	name: "adminSetVehicleStatus",
	filename: "src/lib/market.ts"
}, (opts) => adminSetVehicleStatus.__executeServer(opts));
var adminSetVehicleStatus = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator(object({
	id: number(),
	status: _enum([
		"activo",
		"pausado",
		"vendido",
		"rechazado",
		"pendiente"
	])
})).handler(adminSetVehicleStatus_createServerFn_handler, async ({ context, data }) => {
	await requireAdmin(context.userId);
	await (await getSql())`update vehicles set status = ${data.status} where id = ${data.id}`;
	return { ok: true };
});
var adminListOffers_createServerFn_handler = createServerRpc({
	id: "61a89f085b2a5a595898b3dba1ebc7c02ad22d6512070d27c2b15add31afe025",
	name: "adminListOffers",
	filename: "src/lib/market.ts"
}, (opts) => adminListOffers.__executeServer(opts));
var adminListOffers = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(adminListOffers_createServerFn_handler, async ({ context }) => {
	await requireAdmin(context.userId);
	return (await (await getSql())`
      select o.*, v.title as vehicle_title, v.image_url as vehicle_image,
             s.title as swap_title, p.display_name as buyer_name
      from offers o
      join vehicles v on v.id = o.vehicle_id
      left join vehicles s on s.id = o.swap_vehicle_id
      left join profiles p on p.user_id = o.buyer_id
      order by o.created_at desc
    `).map(mapOffer);
});
var adminListContacts_createServerFn_handler = createServerRpc({
	id: "2696d9b016ee365bd9a90a107e3039f80f894adec4fe5e3abb9b77d5390f00d8",
	name: "adminListContacts",
	filename: "src/lib/market.ts"
}, (opts) => adminListContacts.__executeServer(opts));
var adminListContacts = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(adminListContacts_createServerFn_handler, async ({ context }) => {
	await requireAdmin(context.userId);
	return (await (await getSql())`
      select id, user_id, name, email, phone, subject, message, created_at
      from contacts
      order by created_at desc
    `).map((r) => ({
		id: r.id,
		userId: r.user_id,
		name: r.name,
		email: r.email,
		phone: r.phone,
		subject: r.subject,
		message: r.message,
		createdAt: String(r.created_at)
	}));
});
var adminDeleteContact_createServerFn_handler = createServerRpc({
	id: "054b395ec6887f9228b384f9d69a5016dc163f04e43ff12416b7956511dc8f58",
	name: "adminDeleteContact",
	filename: "src/lib/market.ts"
}, (opts) => adminDeleteContact.__executeServer(opts));
var adminDeleteContact = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator(object({ id: number() })).handler(adminDeleteContact_createServerFn_handler, async ({ context, data }) => {
	await requireAdmin(context.userId);
	await (await getSql())`delete from contacts where id = ${data.id}`;
	return { ok: true };
});
//#endregion
export { adminDeleteContact_createServerFn_handler, adminListContacts_createServerFn_handler, adminListOffers_createServerFn_handler, adminListUsers_createServerFn_handler, adminListVehicles_createServerFn_handler, adminSetRole_createServerFn_handler, adminSetVehicleStatus_createServerFn_handler, adminSetVerification_createServerFn_handler, adminStats_createServerFn_handler, createOffer_createServerFn_handler, createVehicle_createServerFn_handler, deleteMyVehicle_createServerFn_handler, featuredVehicles_createServerFn_handler, getManagedVehicle_createServerFn_handler, getMyProfile_createServerFn_handler, getVehicle_createServerFn_handler, isFavorite_createServerFn_handler, listFavorites_createServerFn_handler, listMyOffers_createServerFn_handler, listMyVehicles_createServerFn_handler, listVehicles_createServerFn_handler, marketStats_createServerFn_handler, respondOffer_createServerFn_handler, resubmitVehicle_createServerFn_handler, submitContact_createServerFn_handler, submitVerification_createServerFn_handler, toggleFavorite_createServerFn_handler, updateMyProfile_createServerFn_handler, updateVehicleStatus_createServerFn_handler };
