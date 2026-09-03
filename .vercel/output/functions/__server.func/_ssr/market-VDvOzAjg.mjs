import { i as TSS_SERVER_FUNCTION, r as createServerFn } from "./ssr.mjs";
import { i as getSql, t as authMiddleware } from "./middleware-lB0aHkBr.mjs";
import { cn as _enum, gn as object, hn as number, yn as string } from "../_libs/@better-auth/core+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/market-VDvOzAjg.js
var createServerRpc = (serverFnMeta, splitImportFn) => {
	const url = "/_serverFn/" + serverFnMeta.id;
	return Object.assign(splitImportFn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
function mapVehicle(row, favoriteIds) {
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
		sellerName: row.seller_name ?? null,
		isFavorite: favoriteIds ? favoriteIds.has(row.id) : false
	};
}
async function ensureProfileRow(userId, name, email) {
	const sql = await getSql();
	if ((await sql`
    select user_id from profiles where user_id = ${userId}
  `).length) return;
	let display = name;
	let mail = email ?? null;
	if (!display || !mail) try {
		const { getSessionUser } = await import("./verify.server-asXJKn21.mjs");
		const session = await getSessionUser();
		if (session?.id === userId) {
			mail = mail ?? session.email;
			display = display ?? (session.email ? session.email.split("@")[0] : "Usuario");
		}
	} catch {}
	const role = ((await sql`
    select count(*)::int as c from profiles
    where role = 'admin' and user_id not like 'seed-%'
  `)[0]?.c ?? 0) === 0 ? "admin" : "cliente";
	await sql`
    insert into profiles (user_id, display_name, email, role)
    values (${userId}, ${display || "Usuario"}, ${mail}, ${role})
  `;
}
async function requireAdmin(userId) {
	await ensureProfileRow(userId);
	if ((await (await getSql())`
    select role from profiles where user_id = ${userId}
  `)[0]?.role !== "admin") throw new Error("Forbidden");
}
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
	])
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
	yearMax: number().optional()
});
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
	return (await sql.query(`select v.*, p.display_name as seller_name
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
	const rows = await (await getSql())`
      select v.*, p.display_name as seller_name
      from vehicles v
      left join profiles p on p.user_id = v.user_id
      where v.id = ${data.id}
    `;
	return rows[0] ? mapVehicle(rows[0]) : null;
});
var featuredVehicles_createServerFn_handler = createServerRpc({
	id: "3f93c033f08ce25c61eb0c63727d4af8b3029ed4677dcf75b0e4a3975c48ea3d",
	name: "featuredVehicles",
	filename: "src/lib/market.ts"
}, (opts) => featuredVehicles.__executeServer(opts));
var featuredVehicles = createServerFn({ method: "GET" }).handler(featuredVehicles_createServerFn_handler, async () => {
	return (await (await getSql())`
      select v.*, p.display_name as seller_name
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
	const r = (await (await getSql())`
      select user_id, display_name, email, phone, city, role, created_at
      from profiles where user_id = ${context.userId}
    `)[0];
	if (!r) return null;
	return {
		userId: r.user_id,
		displayName: r.display_name,
		email: r.email,
		phone: r.phone,
		city: r.city,
		role: r.role,
		createdAt: String(r.created_at)
	};
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
var createVehicle_createServerFn_handler = createServerRpc({
	id: "872db24c654235b1ea035d7a6f33f7e3e906376efb819b722eae1066e31bdb88",
	name: "createVehicle",
	filename: "src/lib/market.ts"
}, (opts) => createVehicle.__executeServer(opts));
var createVehicle = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator(vehicleInput).handler(createVehicle_createServerFn_handler, async ({ context, data }) => {
	await ensureProfileRow(context.userId);
	return { id: (await (await getSql())`
      insert into vehicles (
        user_id, title, brand, model, year, mileage, price, condition, fuel,
        transmission, body_type, city, description, image_url, listing_type, status
      ) values (
        ${context.userId}, ${data.title}, ${data.brand}, ${data.model}, ${data.year},
        ${data.mileage}, ${data.price}, ${data.condition}, ${data.fuel},
        ${data.transmission}, ${data.bodyType}, ${data.city}, ${data.description},
        ${data.imageUrl}, ${data.listingType}, 'activo'
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
      select v.*, p.display_name as seller_name
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
	await (await getSql())`
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
	await (await getSql())`delete from vehicles where id = ${data.id} and user_id = ${context.userId}`;
	return { ok: true };
});
var toggleFavorite_createServerFn_handler = createServerRpc({
	id: "4228a2fbef9856664c6604d378d3fd9130e27659cd9d12504251644309c9e121",
	name: "toggleFavorite",
	filename: "src/lib/market.ts"
}, (opts) => toggleFavorite.__executeServer(opts));
var toggleFavorite = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator(object({ vehicleId: number() })).handler(toggleFavorite_createServerFn_handler, async ({ context, data }) => {
	await ensureProfileRow(context.userId);
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
      select v.*, p.display_name as seller_name
      from favorites f
      join vehicles v on v.id = f.vehicle_id
      left join profiles p on p.user_id = v.user_id
      where f.user_id = ${context.userId}
      order by f.created_at desc
    `;
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
	await ensureProfileRow(context.userId);
	const sql = await getSql();
	const vehicle = await sql`
      select user_id, listing_type, status from vehicles where id = ${data.vehicleId}
    `;
	if (!vehicle[0] || vehicle[0].status !== "activo") throw new Error("El anuncio no está disponible.");
	if (vehicle[0].user_id === context.userId) throw new Error("No puedes ofertar sobre tu propio anuncio.");
	const listing = vehicle[0].listing_type;
	if (data.offerType === "compra" && listing === "permuta") throw new Error("Este anuncio solo acepta permuta.");
	if (data.offerType === "permuta" && listing === "venta") throw new Error("Este anuncio solo está en venta.");
	if (data.offerType === "permuta") {
		if (!data.swapVehicleId) throw new Error("Elige un vehículo para permutar.");
		if (!(await sql`
        select id from vehicles
        where id = ${data.swapVehicleId} and user_id = ${context.userId} and status = 'activo'
      `)[0]) throw new Error("El vehículo de permuta no es tuyo o no está activo.");
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
      where o.id = ${data.id} and v.user_id = ${context.userId} and o.status = 'pendiente'
    `;
	if (!rows[0]) throw new Error("Oferta no encontrada.");
	await sql`update offers set status = ${data.status} where id = ${data.id} and status = 'pendiente'`;
	if (data.status === "aceptada") {
		await sql`update vehicles set status = 'vendido' where id = ${rows[0].vehicle_id} and user_id = ${context.userId}`;
		await sql`
        update offers set status = 'cerrada'
        where vehicle_id = ${rows[0].vehicle_id} and id <> ${data.id} and status = 'pendiente'
      `;
	}
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
	const contacts = await sql`select count(*)::int as c from contacts`;
	const byStatus = await sql`
      select status, count(*)::int as c from vehicles group by status
    `;
	const byType = await sql`
      select listing_type, count(*)::int as c from vehicles group by listing_type
    `;
	const byCity = await sql`
      select city, count(*)::int as c from vehicles where status = 'activo' group by city order by c desc
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
		contacts: contacts[0]?.c ?? 0,
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
	return (await (await getSql())`
      select user_id, display_name, email, phone, city, role, created_at
      from profiles
      order by created_at desc
    `).map((r) => ({
		userId: r.user_id,
		displayName: r.display_name,
		email: r.email,
		phone: r.phone,
		city: r.city,
		role: r.role,
		createdAt: String(r.created_at)
	}));
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
var adminListVehicles_createServerFn_handler = createServerRpc({
	id: "60756c55fd3cc7cd573e79c47978d562e4d9fb5e3fb9035dffe883813ef25091",
	name: "adminListVehicles",
	filename: "src/lib/market.ts"
}, (opts) => adminListVehicles.__executeServer(opts));
var adminListVehicles = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(adminListVehicles_createServerFn_handler, async ({ context }) => {
	await requireAdmin(context.userId);
	return (await (await getSql())`
      select v.*, p.display_name as seller_name
      from vehicles v
      left join profiles p on p.user_id = v.user_id
      order by v.created_at desc
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
		"rechazado"
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
export { adminDeleteContact_createServerFn_handler, adminListContacts_createServerFn_handler, adminListOffers_createServerFn_handler, adminListUsers_createServerFn_handler, adminListVehicles_createServerFn_handler, adminSetRole_createServerFn_handler, adminSetVehicleStatus_createServerFn_handler, adminStats_createServerFn_handler, createOffer_createServerFn_handler, createVehicle_createServerFn_handler, deleteMyVehicle_createServerFn_handler, featuredVehicles_createServerFn_handler, getMyProfile_createServerFn_handler, getVehicle_createServerFn_handler, isFavorite_createServerFn_handler, listFavoriteIds_createServerFn_handler, listFavorites_createServerFn_handler, listMyOffers_createServerFn_handler, listMyVehicles_createServerFn_handler, listVehicles_createServerFn_handler, marketStats_createServerFn_handler, respondOffer_createServerFn_handler, submitContact_createServerFn_handler, toggleFavorite_createServerFn_handler, updateMyProfile_createServerFn_handler, updateVehicleStatus_createServerFn_handler };
