import { i as TSS_SERVER_FUNCTION, r as createServerFn } from "./ssr.mjs";
import { i as getSql, t as authMiddleware } from "./middleware-CWNnPn8G.mjs";
import { cn as _enum, dn as boolean, gn as object, hn as number, un as array, yn as string } from "../_libs/@better-auth/core+[...].mjs";
import { n as parseImageList } from "./images-jYgZVdQh.mjs";
import { n as vehicleMatchesPrefs, t as parseSwapPrefs } from "./swap-DrY_1FSC.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/market-DKTHHgCi.js
var createServerRpc = (serverFnMeta, splitImportFn) => {
	const url = "/_serverFn/" + serverFnMeta.id;
	return Object.assign(splitImportFn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
function asBool(v, fallback = false) {
	if (v == null) return fallback;
	return Boolean(v);
}
function mapVehicle(row, favoriteIds) {
	const images = parseImageList(row.images, row.image_url);
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
		imageUrl: images[0] ?? row.image_url,
		images,
		listingType: row.listing_type,
		status: row.status,
		createdAt: String(row.created_at),
		sellerName: row.seller_name ?? null,
		sellerVerified: asBool(row.seller_verified),
		sellerPhone: row.seller_phone ?? null,
		sellerWhatsapp: row.seller_whatsapp ?? row.seller_phone ?? null,
		sellerEmail: row.seller_email ?? null,
		isFavorite: favoriteIds ? favoriteIds.has(row.id) : false,
		soatExpires: row.soat_expires ?? null,
		tecnoExpires: row.tecno_expires ?? null,
		taxesCurrent: asBool(row.taxes_current, true),
		taxesDetail: row.taxes_detail ?? null,
		taxesAmount: Number(row.taxes_amount ?? 0),
		finesCurrent: asBool(row.fines_current, true),
		finesDetail: row.fines_detail ?? null,
		finesAmount: Number(row.fines_amount ?? 0),
		swapAny: asBool(row.swap_any, true),
		swapPrefs: parseSwapPrefs(row.swap_prefs, asBool(row.swap_any, true))
	};
}
function mapProfile(r) {
	return {
		userId: r.user_id,
		displayName: r.display_name,
		firstName: r.first_name,
		lastName: r.last_name,
		email: r.email,
		phone: r.phone,
		whatsapp: r.whatsapp,
		city: r.city,
		address: r.address,
		documentType: r.document_type,
		documentNumber: r.document_number,
		role: r.role,
		verificationStatus: r.verification_status,
		accountStatus: r.account_status,
		idFrontUrl: r.id_front_url,
		idBackUrl: r.id_back_url,
		verificationNote: r.verification_note,
		createdAt: String(r.created_at),
		verifiedAt: r.verified_at ? String(r.verified_at) : null
	};
}
var PROFILE_COLS = `
  user_id, display_name, first_name, last_name, email, phone, whatsapp, city, address,
  document_type, document_number, role, verification_status, account_status,
  id_front_url, id_back_url, verification_note, created_at, verified_at
`;
async function ensureProfileRow(userId, name, email) {
	const sql = await getSql();
	if ((await sql`
    select user_id from profiles where user_id = ${userId}
  `).length) return;
	let display = name;
	let mail = email ?? null;
	if (!display || !mail) try {
		const { getSessionUser } = await import("./verify.server-DG4BGU-U.mjs");
		const session = await getSessionUser();
		if (session?.id === userId) {
			mail = mail ?? session.email;
			display = display ?? (session.email ? session.email.split("@")[0] : "Usuario");
		}
	} catch {}
	const role = ((await sql`
    select count(*)::int as c from profiles
    where role = 'admin' and user_id not like 'seed-%' and user_id not like 'catalog-%'
  `)[0]?.c ?? 0) === 0 ? "admin" : "cliente";
	await sql`
    insert into profiles (user_id, display_name, email, role, verification_status, account_status, verified_at)
    values (
      ${userId}, ${display || "Usuario"}, ${mail}, ${role}, ${role === "admin" ? "verificado" : "sin_verificar"}, 'activo',
      ${role === "admin" ? (/* @__PURE__ */ new Date()).toISOString() : null}
    )
  `;
}
async function loadProfile(userId) {
	const result = await (await getSql()).query(`select ${PROFILE_COLS} from profiles where user_id = $1`, [userId]);
	return result[0] ? mapProfile(result[0]) : null;
}
async function requireAdmin(userId) {
	await ensureProfileRow(userId);
	const rows = await (await getSql())`
    select role, account_status from profiles where user_id = ${userId}
  `;
	if (rows[0]?.role !== "admin") throw new Error("Forbidden");
	if (rows[0]?.account_status === "deshabilitado") throw new Error("Tu cuenta está deshabilitada.");
}
async function requireActiveAccount(userId) {
	await ensureProfileRow(userId);
	if ((await (await getSql())`
    select account_status from profiles where user_id = ${userId}
  `)[0]?.account_status === "deshabilitado") throw new Error("Tu cuenta está deshabilitada. Escribe a soporte desde Contacto.");
}
async function isAdminUser(userId) {
	return (await (await getSql())`select role from profiles where user_id = ${userId}`)[0]?.role === "admin";
}
async function currentSessionId() {
	try {
		const { getSessionUser } = await import("./verify.server-DG4BGU-U.mjs");
		return (await getSessionUser())?.id ?? null;
	} catch {
		return null;
	}
}
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
var VEHICLE_SELECT = `
  v.*, p.display_name as seller_name,
  (p.verification_status = 'verificado') as seller_verified,
  p.phone as seller_phone, coalesce(p.whatsapp, p.phone) as seller_whatsapp,
  p.email as seller_email
`;
var listVehicles_createServerFn_handler = createServerRpc({
	id: "8e8d9e3514494b7d7c824100f6459e0542b8e1954214f2fb4bc645219e083582",
	name: "listVehicles",
	filename: "src/lib/market.ts"
}, (opts) => listVehicles.__executeServer(opts));
var listVehicles = createServerFn({ method: "GET" }).validator(listFilter).handler(listVehicles_createServerFn_handler, async ({ data }) => {
	const sql = await getSql();
	const where = ["v.status = 'activo'"];
	const params = [];
	const add = (clause, value) => {
		params.push(value);
		where.push(clause.replaceAll("?", `$${params.length}`));
	};
	const q = data.q?.trim();
	if (q) {
		params.push(`%${q}%`);
		const i = params.length;
		where.push(`(v.title ilike $${i} or v.brand ilike $${i} or v.model ilike $${i} or v.city ilike $${i})`);
	}
	if (data.brand) add("v.brand = ?", data.brand);
	if (data.bodyType) add("v.body_type = ?", data.bodyType);
	if (data.city) add("v.city = ?", data.city);
	if (data.fuel) add("v.fuel = ?", data.fuel);
	if (data.minPrice != null) add("v.price >= ?", data.minPrice);
	if (data.maxPrice != null) add("v.price <= ?", data.maxPrice);
	if (data.yearMin != null) add("v.year >= ?", data.yearMin);
	if (data.yearMax != null) add("v.year <= ?", data.yearMax);
	if (data.listingType) {
		params.push(data.listingType);
		const i = params.length;
		where.push(`(v.listing_type = $${i} or v.listing_type = 'ambos')`);
	}
	if (data.verifiedOnly) where.push(`p.verification_status = 'verificado'`);
	return (await sql.query(`select ${VEHICLE_SELECT}
       from vehicles v
       left join profiles p on p.user_id = v.user_id
       where ${where.join(" and ")}
       order by v.created_at desc`, params)).map((r) => mapVehicle(r));
});
var getVehicle_createServerFn_handler = createServerRpc({
	id: "e57651b22d5aae505d1987db30fd14e53d33dcba46e5c94fa6dde1cfd0caeaca",
	name: "getVehicle",
	filename: "src/lib/market.ts"
}, (opts) => getVehicle.__executeServer(opts));
var getVehicle = createServerFn({ method: "GET" }).validator(object({ id: number() })).handler(getVehicle_createServerFn_handler, async ({ data }) => {
	const row = (await (await getSql()).query(`select ${VEHICLE_SELECT}
       from vehicles v
       left join profiles p on p.user_id = v.user_id
       where v.id = $1`, [data.id]))[0];
	if (!row) return null;
	if (row.status !== "activo") {
		const uid = await currentSessionId();
		const admin = uid ? await isAdminUser(uid) : false;
		if (!uid || uid !== row.user_id && !admin) return null;
	}
	return mapVehicle(row);
});
var featuredVehicles_createServerFn_handler = createServerRpc({
	id: "3f93c033f08ce25c61eb0c63727d4af8b3029ed4677dcf75b0e4a3975c48ea3d",
	name: "featuredVehicles",
	filename: "src/lib/market.ts"
}, (opts) => featuredVehicles.__executeServer(opts));
var featuredVehicles = createServerFn({ method: "GET" }).handler(featuredVehicles_createServerFn_handler, async () => {
	return (await (await getSql()).query(`select ${VEHICLE_SELECT}
     from vehicles v
     left join profiles p on p.user_id = v.user_id
     where v.status = 'activo'
     order by v.created_at desc
     limit 6`, [])).map((r) => mapVehicle(r));
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
	const verified = await sql`select count(*)::int as c from profiles where verification_status = 'verificado'`;
	return {
		active: v[0]?.c ?? 0,
		sale: sale[0]?.c ?? 0,
		swap: swap[0]?.c ?? 0,
		cities: cities[0]?.c ?? 0,
		verified: verified[0]?.c ?? 0
	};
});
var getMyProfile_createServerFn_handler = createServerRpc({
	id: "3bb987c2dd3c1408c63c66c46d9989de1337f46076d1cd176d97486ddc515e6c",
	name: "getMyProfile",
	filename: "src/lib/market.ts"
}, (opts) => getMyProfile.__executeServer(opts));
var getMyProfile = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(getMyProfile_createServerFn_handler, async ({ context }) => {
	await ensureProfileRow(context.userId);
	return loadProfile(context.userId);
});
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
var updateMyProfile_createServerFn_handler = createServerRpc({
	id: "ae2026bd31978517e8a16f26dcfea6d515c96b8e28f24278bf736712190a11dc",
	name: "updateMyProfile",
	filename: "src/lib/market.ts"
}, (opts) => updateMyProfile.__executeServer(opts));
var updateMyProfile = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator(profileFields).handler(updateMyProfile_createServerFn_handler, async ({ context, data }) => {
	await requireActiveAccount(context.userId);
	const displayName = `${data.firstName} ${data.lastName}`.trim();
	await (await getSql())`
      update profiles
      set display_name = ${displayName},
          first_name = ${data.firstName},
          last_name = ${data.lastName},
          phone = ${data.phone},
          whatsapp = ${data.whatsapp || data.phone},
          city = ${data.city},
          address = ${data.address ?? null},
          email = ${data.email ?? null},
          document_type = ${data.documentType ?? null},
          document_number = ${data.documentNumber ?? null}
      where user_id = ${context.userId}
    `;
	return { ok: true };
});
var submitVerification_createServerFn_handler = createServerRpc({
	id: "1f5ee8ac64dce6ec65dda5869719e02be04f83b54cdca775cb043d29083f1831",
	name: "submitVerification",
	filename: "src/lib/market.ts"
}, (opts) => submitVerification.__executeServer(opts));
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
})).handler(submitVerification_createServerFn_handler, async ({ context, data }) => {
	await requireActiveAccount(context.userId);
	const sql = await getSql();
	if ((await sql`
      select verification_status from profiles where user_id = ${context.userId}
    `)[0]?.verification_status === "verificado") throw new Error("Tu cuenta ya está verificada.");
	await sql`
      update profiles
      set id_front_url = ${data.idFrontUrl},
          id_back_url = ${data.idBackUrl},
          document_type = ${data.documentType},
          document_number = ${data.documentNumber},
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
	await requireActiveAccount(context.userId);
	const sql = await getSql();
	const profile = await sql`
      select role, verification_status from profiles where user_id = ${context.userId}
    `;
	const status = profile[0]?.role === "admin" || profile[0]?.verification_status === "verificado" ? "activo" : "pendiente_revision";
	const images = data.images.slice(0, 6);
	const prefs = data.listingType === "venta" ? { any: true } : data.swapPrefs ?? { any: true };
	return {
		id: (await sql`
      insert into vehicles (
        user_id, title, brand, model, year, mileage, price, condition, fuel,
        transmission, body_type, city, description, image_url, images, listing_type, status,
        soat_expires, tecno_expires, taxes_current, taxes_detail, taxes_amount,
        fines_current, fines_detail, fines_amount, swap_any, swap_prefs
      ) values (
        ${context.userId}, ${data.title}, ${data.brand}, ${data.model}, ${data.year},
        ${data.mileage}, ${data.price}, ${data.condition}, ${data.fuel},
        ${data.transmission}, ${data.bodyType}, ${data.city}, ${data.description},
        ${images[0]}, ${JSON.stringify(images)}, ${data.listingType}, ${status},
        ${data.soatExpires || null}, ${data.tecnoExpires || null},
        ${data.taxesCurrent}, ${data.taxesCurrent ? null : data.taxesDetail ?? null},
        ${data.taxesCurrent ? 0 : data.taxesAmount ?? 0},
        ${data.finesCurrent}, ${data.finesCurrent ? null : data.finesDetail ?? null},
        ${data.finesCurrent ? 0 : data.finesAmount ?? 0},
        ${Boolean(prefs.any)}, ${JSON.stringify(prefs)}
      )
      returning id
    `)[0].id,
		status
	};
});
var listMyVehicles_createServerFn_handler = createServerRpc({
	id: "500ce052c70b44499ccb055486c0782c46a07032936114e16d5f31473869a147",
	name: "listMyVehicles",
	filename: "src/lib/market.ts"
}, (opts) => listMyVehicles.__executeServer(opts));
var listMyVehicles = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(listMyVehicles_createServerFn_handler, async ({ context }) => {
	await ensureProfileRow(context.userId);
	return (await (await getSql()).query(`select ${VEHICLE_SELECT}
       from vehicles v
       left join profiles p on p.user_id = v.user_id
       where v.user_id = $1
       order by v.created_at desc`, [context.userId])).map((r) => mapVehicle(r));
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
	await requireActiveAccount(context.userId);
	const sql = await getSql();
	const current = await sql`
      select status from vehicles where id = ${data.id} and user_id = ${context.userId}
    `;
	if (!current[0]) throw new Error("Anuncio no encontrado.");
	if (current[0].status === "pendiente_revision" || current[0].status === "rechazado") throw new Error("Este anuncio sigue en revisión del administrador.");
	await sql`
      update vehicles
      set status = ${data.status}
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
	await requireActiveAccount(context.userId);
	await (await getSql())`delete from vehicles where id = ${data.id} and user_id = ${context.userId}`;
	return { ok: true };
});
var toggleFavorite_createServerFn_handler = createServerRpc({
	id: "4228a2fbef9856664c6604d378d3fd9130e27659cd9d12504251644309c9e121",
	name: "toggleFavorite",
	filename: "src/lib/market.ts"
}, (opts) => toggleFavorite.__executeServer(opts));
var toggleFavorite = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator(object({ vehicleId: number() })).handler(toggleFavorite_createServerFn_handler, async ({ context, data }) => {
	await requireActiveAccount(context.userId);
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
	const rows = await (await getSql()).query(`select ${VEHICLE_SELECT}
       from favorites f
       join vehicles v on v.id = f.vehicle_id
       left join profiles p on p.user_id = v.user_id
       where f.user_id = $1
       order by f.created_at desc`, [context.userId]);
	return rows.map((r) => mapVehicle(r, new Set(rows.map((x) => x.id))));
});
var listFavoriteIds_createServerFn_handler = createServerRpc({
	id: "b2fd9960ad1891cfaee06bd81973ee40f5733d7626bb419abc855235098d0cb4",
	name: "listFavoriteIds",
	filename: "src/lib/market.ts"
}, (opts) => listFavoriteIds.__executeServer(opts));
var listFavoriteIds = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(listFavoriteIds_createServerFn_handler, async ({ context }) => {
	return (await (await getSql())`
      select vehicle_id from favorites where user_id = ${context.userId}
    `).map((r) => r.vehicle_id);
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
	await requireActiveAccount(context.userId);
	const sql = await getSql();
	const vehicle = await sql`
      select user_id, listing_type, status, swap_any, swap_prefs
      from vehicles where id = ${data.vehicleId}
    `;
	if (!vehicle[0] || vehicle[0].status !== "activo") throw new Error("El anuncio no está disponible.");
	if (vehicle[0].user_id === context.userId) throw new Error("No puedes ofertar sobre tu propio anuncio.");
	const listing = vehicle[0].listing_type;
	if (data.offerType === "compra" && listing === "permuta") throw new Error("Este anuncio solo acepta permuta.");
	if (data.offerType === "permuta" && listing === "venta") throw new Error("Este anuncio solo está en venta.");
	if (data.offerType === "permuta") {
		if (!data.swapVehicleId) throw new Error("Elige un vehículo para permutar.");
		if (!(await sql.query(`select ${VEHICLE_SELECT}
         from vehicles v
         left join profiles p on p.user_id = v.user_id
         where v.id = $1 and v.user_id = $2 and v.status = 'activo'`, [data.swapVehicleId, context.userId]))[0]) throw new Error("El vehículo de permuta no es tuyo o no está activo.");
	}
	const rows = await sql`
      insert into offers (vehicle_id, buyer_id, offer_type, amount, swap_vehicle_id, message, status, last_actor_id)
      values (
        ${data.vehicleId}, ${context.userId}, ${data.offerType},
        ${data.amount ?? null}, ${data.swapVehicleId ?? null}, ${data.message ?? null},
        'pendiente', ${context.userId}
      )
      returning id
    `;
	await sql`
      insert into offer_events (offer_id, actor_id, action, amount, swap_vehicle_id, message)
      values (
        ${rows[0].id}, ${context.userId}, 'oferta',
        ${data.amount ?? null}, ${data.swapVehicleId ?? null}, ${data.message ?? null}
      )
    `;
	return { id: rows[0].id };
});
function mapOffer(row) {
	let matchesPrefs = null;
	if (row.offer_type === "permuta" && row.swap_vehicle_id && row.swap_brand) matchesPrefs = vehicleMatchesPrefs({
		brand: row.swap_brand,
		model: row.swap_model ?? "",
		year: Number(row.swap_year ?? 0),
		mileage: Number(row.swap_mileage ?? 0),
		condition: row.swap_condition ?? "",
		fuel: row.swap_fuel ?? "",
		transmission: row.swap_transmission ?? "",
		bodyType: row.swap_body ?? "",
		city: row.swap_city ?? "",
		price: Number(row.swap_price ?? 0)
	}, parseSwapPrefs(row.swap_prefs, asBool(row.swap_any, true)));
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
		lastActorId: row.last_actor_id ?? null,
		counterCount: Number(row.counter_count ?? 0),
		vehicleTitle: row.vehicle_title,
		vehicleImage: row.vehicle_image,
		vehicleOwnerId: row.vehicle_owner_id,
		swapTitle: row.swap_title ?? null,
		buyerName: row.buyer_name ?? null,
		matchesPrefs
	};
}
var OFFER_SELECT = `
  o.*, v.title as vehicle_title, v.image_url as vehicle_image, v.user_id as vehicle_owner_id,
  v.swap_any, v.swap_prefs, s.title as swap_title, p.display_name as buyer_name,
  s.brand as swap_brand, s.model as swap_model, s.year as swap_year, s.mileage as swap_mileage,
  s.condition as swap_condition, s.fuel as swap_fuel, s.transmission as swap_transmission,
  s.body_type as swap_body, s.city as swap_city, s.price as swap_price
`;
async function loadEvents(offerIds) {
	if (!offerIds.length) return /* @__PURE__ */ new Map();
	const sql = await getSql();
	const placeholders = offerIds.map((_, i) => `$${i + 1}`).join(", ");
	const rows = await sql.query(`select e.*, p.display_name as actor_name
     from offer_events e
     left join profiles p on p.user_id = e.actor_id
     where e.offer_id in (${placeholders})
     order by e.created_at asc`, offerIds);
	const map = /* @__PURE__ */ new Map();
	for (const r of rows) {
		const list = map.get(r.offer_id) ?? [];
		list.push({
			id: r.id,
			offerId: r.offer_id,
			actorId: r.actor_id,
			actorName: r.actor_name,
			action: r.action,
			amount: r.amount == null ? null : Number(r.amount),
			swapVehicleId: r.swap_vehicle_id,
			message: r.message,
			createdAt: String(r.created_at)
		});
		map.set(r.offer_id, list);
	}
	return map;
}
var listMyOffers_createServerFn_handler = createServerRpc({
	id: "880ef5ec41c1db3d3d62edaaf3f2439d6bddb425428d1edc3a858fe8cba13324",
	name: "listMyOffers",
	filename: "src/lib/market.ts"
}, (opts) => listMyOffers.__executeServer(opts));
var listMyOffers = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(listMyOffers_createServerFn_handler, async ({ context }) => {
	await ensureProfileRow(context.userId);
	const sql = await getSql();
	const sent = await sql.query(`select ${OFFER_SELECT}
       from offers o
       join vehicles v on v.id = o.vehicle_id
       left join vehicles s on s.id = o.swap_vehicle_id
       left join profiles p on p.user_id = o.buyer_id
       where o.buyer_id = $1
       order by o.created_at desc`, [context.userId]);
	const received = await sql.query(`select ${OFFER_SELECT}
       from offers o
       join vehicles v on v.id = o.vehicle_id
       left join vehicles s on s.id = o.swap_vehicle_id
       left join profiles p on p.user_id = o.buyer_id
       where v.user_id = $1
       order by o.created_at desc`, [context.userId]);
	const events = await loadEvents([...sent, ...received].map((o) => o.id));
	const withEvents = (rows) => rows.map((r) => {
		const o = mapOffer(r);
		o.events = events.get(r.id) ?? [];
		return o;
	});
	return {
		sent: withEvents(sent),
		received: withEvents(received)
	};
});
var respondOffer_createServerFn_handler = createServerRpc({
	id: "21f77dd4cce131c34186ce9c4e45018e0243178ca47c730aaaa693a49963264d",
	name: "respondOffer",
	filename: "src/lib/market.ts"
}, (opts) => respondOffer.__executeServer(opts));
var respondOffer = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator(object({
	id: number(),
	status: _enum(["aceptada", "rechazada"])
})).handler(respondOffer_createServerFn_handler, async ({ context, data }) => {
	await requireActiveAccount(context.userId);
	const sql = await getSql();
	const offer = (await sql`
      select o.id, o.vehicle_id, o.buyer_id, o.last_actor_id, o.status, v.user_id as owner_id
      from offers o
      join vehicles v on v.id = o.vehicle_id
      where o.id = ${data.id}
    `)[0];
	if (!offer) throw new Error("Oferta no encontrada.");
	if (!["pendiente", "contraoferta"].includes(offer.status)) throw new Error("Esta oferta ya no está abierta.");
	const isOwner = offer.owner_id === context.userId;
	const isBuyer = offer.buyer_id === context.userId;
	if (!isOwner && !isBuyer) throw new Error("No puedes responder esta oferta.");
	if (offer.last_actor_id === context.userId) throw new Error("Espera la respuesta de la otra parte.");
	await sql`update offers set status = ${data.status} where id = ${data.id}`;
	await sql`
      insert into offer_events (offer_id, actor_id, action)
      values (${data.id}, ${context.userId}, ${data.status})
    `;
	if (data.status === "aceptada") {
		await sql`update vehicles set status = 'vendido' where id = ${offer.vehicle_id} and user_id = ${offer.owner_id}`;
		await sql`
        update offers set status = 'cerrada'
        where vehicle_id = ${offer.vehicle_id} and id <> ${data.id} and status in ('pendiente','contraoferta')
      `;
	}
	return { ok: true };
});
var counterOffer_createServerFn_handler = createServerRpc({
	id: "c84a24fce94ecf0f0081d36afd968cd4f88655729890c8ee68e6ff03c69db863",
	name: "counterOffer",
	filename: "src/lib/market.ts"
}, (opts) => counterOffer.__executeServer(opts));
var counterOffer = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator(object({
	id: number(),
	amount: number().optional(),
	swapVehicleId: number().optional(),
	message: string().min(2).max(800)
})).handler(counterOffer_createServerFn_handler, async ({ context, data }) => {
	await requireActiveAccount(context.userId);
	const sql = await getSql();
	const offer = (await sql`
      select o.id, o.vehicle_id, o.buyer_id, o.last_actor_id, o.status, v.user_id as owner_id,
             o.offer_type, o.counter_count
      from offers o
      join vehicles v on v.id = o.vehicle_id
      where o.id = ${data.id}
    `)[0];
	if (!offer) throw new Error("Oferta no encontrada.");
	if (!["pendiente", "contraoferta"].includes(offer.status)) throw new Error("Esta oferta ya no está abierta.");
	const isOwner = offer.owner_id === context.userId;
	const isBuyer = offer.buyer_id === context.userId;
	if (!isOwner && !isBuyer) throw new Error("No puedes contraofertar aquí.");
	if (offer.last_actor_id === context.userId) throw new Error("Espera la respuesta de la otra parte antes de contraofertar.");
	if (offer.offer_type === "compra" && data.amount == null) throw new Error("Indica el nuevo monto de la contraoferta.");
	if (offer.offer_type === "permuta" && isBuyer && data.swapVehicleId) {
		if (!(await sql`
        select id from vehicles
        where id = ${data.swapVehicleId} and user_id = ${context.userId} and status = 'activo'
      `)[0]) throw new Error("El vehículo de permuta no es tuyo o no está activo.");
	}
	await sql`
      update offers
      set amount = ${data.amount ?? null},
          swap_vehicle_id = ${data.swapVehicleId ?? null},
          message = ${data.message},
          status = 'contraoferta',
          last_actor_id = ${context.userId},
          counter_count = ${Number(offer.counter_count) + 1}
      where id = ${data.id}
    `;
	await sql`
      insert into offer_events (offer_id, actor_id, action, amount, swap_vehicle_id, message)
      values (
        ${data.id}, ${context.userId}, 'contraoferta',
        ${data.amount ?? null}, ${data.swapVehicleId ?? null}, ${data.message}
      )
    `;
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
	const pending = await sql`select count(*)::int as c from offers where status in ('pendiente','contraoferta')`;
	const contacts = await sql`select count(*)::int as c from contacts`;
	const pendingListings = await sql`select count(*)::int as c from vehicles where status = 'pendiente_revision'`;
	const pendingVerifications = await sql`select count(*)::int as c from profiles where verification_status = 'pendiente'`;
	const byStatus = await sql`
      select status, count(*)::int as c from vehicles group by status
    `;
	const byType = await sql`
      select listing_type, count(*)::int as c from vehicles group by listing_type
    `;
	const byCity = await sql`
      select city, count(*)::int as c from vehicles where status = 'activo' group by city order by c desc
    `;
	const recentOffers = await sql.query(`select ${OFFER_SELECT}
       from offers o
       join vehicles v on v.id = o.vehicle_id
       left join vehicles s on s.id = o.swap_vehicle_id
       left join profiles p on p.user_id = o.buyer_id
       order by o.created_at desc
       limit 8`, []);
	return {
		users: users[0]?.c ?? 0,
		vehicles: vehicles[0]?.c ?? 0,
		pending: pending[0]?.c ?? 0,
		contacts: contacts[0]?.c ?? 0,
		pendingListings: pendingListings[0]?.c ?? 0,
		pendingVerifications: pendingVerifications[0]?.c ?? 0,
		byStatus,
		byType,
		byCity,
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
	return (await (await getSql()).query(`select ${PROFILE_COLS} from profiles order by created_at desc`, [])).map(mapProfile);
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
var adminUpdateUser_createServerFn_handler = createServerRpc({
	id: "ff501bd9fa2f5abd645bab13a129d495f9935da190496173650e4068bca3cac8",
	name: "adminUpdateUser",
	filename: "src/lib/market.ts"
}, (opts) => adminUpdateUser.__executeServer(opts));
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
})).handler(adminUpdateUser_createServerFn_handler, async ({ context, data }) => {
	await requireAdmin(context.userId);
	if (data.userId === context.userId && data.role !== "admin") throw new Error("No puedes quitarte el rol de administrador.");
	const displayName = `${data.firstName} ${data.lastName}`.trim();
	const sql = await getSql();
	await sql`
      update profiles
      set display_name = ${displayName},
          first_name = ${data.firstName},
          last_name = ${data.lastName},
          phone = ${data.phone ?? null},
          whatsapp = ${data.whatsapp || data.phone || null},
          city = ${data.city ?? null},
          address = ${data.address ?? null},
          email = ${data.email ?? null},
          document_type = ${data.documentType ?? null},
          document_number = ${data.documentNumber ?? null},
          role = ${data.role}
      where user_id = ${data.userId}
    `;
	if (data.email) await sql`update "user" set email = ${data.email}, name = ${displayName} where id = ${data.userId}`;
	return { ok: true };
});
var adminSetAccountStatus_createServerFn_handler = createServerRpc({
	id: "fad41571d8c41943631218494d104bf06fdf605679d3b692156d33a477175d72",
	name: "adminSetAccountStatus",
	filename: "src/lib/market.ts"
}, (opts) => adminSetAccountStatus.__executeServer(opts));
var adminSetAccountStatus = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator(object({
	userId: string(),
	status: _enum(["activo", "deshabilitado"])
})).handler(adminSetAccountStatus_createServerFn_handler, async ({ context, data }) => {
	await requireAdmin(context.userId);
	if (data.userId === context.userId) throw new Error("No puedes deshabilitar tu propia cuenta.");
	await (await getSql())`update profiles set account_status = ${data.status} where user_id = ${data.userId}`;
	return { ok: true };
});
var adminDeleteUser_createServerFn_handler = createServerRpc({
	id: "659492080f2fc86aeeb077c7ec5be7fafc4d8de15b5e5349cb91c04e3ca5c3cd",
	name: "adminDeleteUser",
	filename: "src/lib/market.ts"
}, (opts) => adminDeleteUser.__executeServer(opts));
var adminDeleteUser = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator(object({ userId: string() })).handler(adminDeleteUser_createServerFn_handler, async ({ context, data }) => {
	await requireAdmin(context.userId);
	if (data.userId === context.userId) throw new Error("No puedes eliminar tu propia cuenta.");
	const sql = await getSql();
	if ((await sql`select role from profiles where user_id = ${data.userId}`)[0]?.role === "admin") {
		if (((await sql`
        select count(*)::int as c from profiles where role = 'admin' and account_status = 'activo'
      `)[0]?.c ?? 0) <= 1) throw new Error("No puedes eliminar al último administrador.");
	}
	await sql`delete from favorites where user_id = ${data.userId}`;
	await sql`delete from offers where buyer_id = ${data.userId}`;
	await sql`delete from vehicles where user_id = ${data.userId}`;
	await sql`delete from profiles where user_id = ${data.userId}`;
	await sql`delete from "session" where "userId" = ${data.userId}`;
	await sql`delete from "account" where "userId" = ${data.userId}`;
	await sql`delete from "user" where id = ${data.userId}`;
	return { ok: true };
});
var adminListVerifications_createServerFn_handler = createServerRpc({
	id: "53cfbee33d0f68dee4d22c875ff55d107ef98d918382ebf169b00a5d2764db15",
	name: "adminListVerifications",
	filename: "src/lib/market.ts"
}, (opts) => adminListVerifications.__executeServer(opts));
var adminListVerifications = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(adminListVerifications_createServerFn_handler, async ({ context }) => {
	await requireAdmin(context.userId);
	return (await (await getSql()).query(`select ${PROFILE_COLS}
       from profiles
       where verification_status in ('pendiente','verificado','rechazado')
         and (id_front_url is not null or verification_status <> 'sin_verificar')
       order by
         case verification_status when 'pendiente' then 0 when 'rechazado' then 1 else 2 end,
         created_at desc`, [])).map(mapProfile);
});
var adminReviewVerification_createServerFn_handler = createServerRpc({
	id: "cefeb6f8bb01c4043d3524e737f9f3f420e544d09c8e239f8fdf577e60fb6afc",
	name: "adminReviewVerification",
	filename: "src/lib/market.ts"
}, (opts) => adminReviewVerification.__executeServer(opts));
var adminReviewVerification = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator(object({
	userId: string(),
	status: _enum(["verificado", "rechazado"]),
	note: string().max(400).optional()
})).handler(adminReviewVerification_createServerFn_handler, async ({ context, data }) => {
	await requireAdmin(context.userId);
	const sql = await getSql();
	await sql`
      update profiles
      set verification_status = ${data.status},
          verification_note = ${data.note ?? null},
          verified_at = ${data.status === "verificado" ? (/* @__PURE__ */ new Date()).toISOString() : null}
      where user_id = ${data.userId}
    `;
	if (data.status === "verificado") await sql`
        update vehicles
        set status = 'activo'
        where user_id = ${data.userId} and status = 'pendiente_revision'
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
	return (await (await getSql()).query(`select ${VEHICLE_SELECT}
       from vehicles v
       left join profiles p on p.user_id = v.user_id
       order by
         case v.status when 'pendiente_revision' then 0 else 1 end,
         v.created_at desc`, [])).map((r) => mapVehicle(r));
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
		"pendiente_revision"
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
	return (await (await getSql()).query(`select ${OFFER_SELECT}
       from offers o
       join vehicles v on v.id = o.vehicle_id
       left join vehicles s on s.id = o.swap_vehicle_id
       left join profiles p on p.user_id = o.buyer_id
       order by o.created_at desc`, [])).map(mapOffer);
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
export { adminDeleteContact_createServerFn_handler, adminDeleteUser_createServerFn_handler, adminListContacts_createServerFn_handler, adminListOffers_createServerFn_handler, adminListUsers_createServerFn_handler, adminListVehicles_createServerFn_handler, adminListVerifications_createServerFn_handler, adminReviewVerification_createServerFn_handler, adminSetAccountStatus_createServerFn_handler, adminSetRole_createServerFn_handler, adminSetVehicleStatus_createServerFn_handler, adminStats_createServerFn_handler, adminUpdateUser_createServerFn_handler, counterOffer_createServerFn_handler, createOffer_createServerFn_handler, createVehicle_createServerFn_handler, deleteMyVehicle_createServerFn_handler, featuredVehicles_createServerFn_handler, getMyProfile_createServerFn_handler, getVehicle_createServerFn_handler, isFavorite_createServerFn_handler, listFavoriteIds_createServerFn_handler, listFavorites_createServerFn_handler, listMyOffers_createServerFn_handler, listMyVehicles_createServerFn_handler, listVehicles_createServerFn_handler, marketStats_createServerFn_handler, respondOffer_createServerFn_handler, submitContact_createServerFn_handler, submitVerification_createServerFn_handler, toggleFavorite_createServerFn_handler, updateMyProfile_createServerFn_handler, updateVehicleStatus_createServerFn_handler };
