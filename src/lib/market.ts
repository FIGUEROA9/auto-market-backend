import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { getSql } from "@/lib/db";
import { authMiddleware } from "@/lib/auth/middleware";

export type Vehicle = {
  id: number;
  userId: string;
  title: string;
  brand: string;
  model: string;
  year: number;
  mileage: number;
  price: number;
  condition: string;
  fuel: string;
  transmission: string;
  bodyType: string;
  city: string;
  description: string;
  imageUrl: string;
  listingType: string;
  status: string;
  createdAt: string;
  sellerName?: string | null;
  isFavorite?: boolean;
};

export type Offer = {
  id: number;
  vehicleId: number;
  buyerId: string;
  offerType: string;
  amount: number | null;
  swapVehicleId: number | null;
  message: string | null;
  status: string;
  createdAt: string;
  vehicleTitle?: string;
  vehicleImage?: string;
  swapTitle?: string | null;
  buyerName?: string | null;
};

export type Profile = {
  userId: string;
  displayName: string;
  email: string | null;
  phone: string | null;
  city: string | null;
  role: string;
  createdAt: string;
};

export type ContactRow = {
  id: number;
  userId: string | null;
  name: string;
  email: string;
  phone: string;
  subject: string | null;
  message: string;
  createdAt: string;
};

type VehicleRow = {
  id: number;
  user_id: string;
  title: string;
  brand: string;
  model: string;
  year: number;
  mileage: number;
  price: number;
  condition: string;
  fuel: string;
  transmission: string;
  body_type: string;
  city: string;
  description: string;
  image_url: string;
  listing_type: string;
  status: string;
  created_at: string;
  seller_name?: string | null;
};

function mapVehicle(row: VehicleRow, favoriteIds?: Set<number>): Vehicle {
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
    isFavorite: favoriteIds ? favoriteIds.has(row.id) : false,
  };
}

async function ensureProfileRow(userId: string, name?: string, email?: string) {
  const sql = await getSql();
  const existing = await sql<{ user_id: string }>`
    select user_id from profiles where user_id = ${userId}
  `;
  if (existing.length) return;
  let display = name;
  let mail = email ?? null;
  if (!display || !mail) {
    try {
      const { getSessionUser } = await import("@/lib/auth/verify.server");
      const session = await getSessionUser();
      if (session?.id === userId) {
        mail = mail ?? session.email;
        display = display ?? (session.email ? session.email.split("@")[0] : "Usuario");
      }
    } catch {
      /* session lookup is best-effort */
    }
  }
  const admins = await sql<{ c: number }>`
    select count(*)::int as c from profiles
    where role = 'admin' and user_id not like 'seed-%'
  `;
  const role = (admins[0]?.c ?? 0) === 0 ? "admin" : "cliente";
  await sql`
    insert into profiles (user_id, display_name, email, role)
    values (${userId}, ${display || "Usuario"}, ${mail}, ${role})
  `;
}

async function requireAdmin(userId: string) {
  await ensureProfileRow(userId);
  const sql = await getSql();
  const rows = await sql<{ role: string }>`
    select role from profiles where user_id = ${userId}
  `;
  if (rows[0]?.role !== "admin") {
    throw new Error("Forbidden");
  }
}

const vehicleInput = z.object({
  title: z.string().min(3).max(120),
  brand: z.string().min(1).max(40),
  model: z.string().min(1).max(40),
  year: z.number().int().min(1980).max(2030),
  mileage: z.number().int().min(0).max(1_000_000),
  price: z.number().min(0),
  condition: z.enum(["nuevo", "seminuevo", "usado"]),
  fuel: z.enum(["gasolina", "diesel", "hibrido", "electrico"]),
  transmission: z.enum(["manual", "automatica"]),
  bodyType: z.enum(["sedan", "suv", "pickup", "hatchback", "van", "coupe"]),
  city: z.string().min(2).max(60),
  description: z.string().min(10).max(2000),
  imageUrl: z.string().min(1).max(500),
  listingType: z.enum(["venta", "permuta", "ambos"]),
});

const listFilter = z.object({
  q: z.string().optional(),
  brand: z.string().optional(),
  listingType: z.string().optional(),
  bodyType: z.string().optional(),
  city: z.string().optional(),
  fuel: z.string().optional(),
  minPrice: z.number().optional(),
  maxPrice: z.number().optional(),
  yearMin: z.number().optional(),
  yearMax: z.number().optional(),
});

export const listVehicles = createServerFn({ method: "GET" })
  .validator(listFilter)
  .handler(async ({ data }) => {
    const sql = await getSql();
    const where: string[] = ["v.status = 'activo'"];
    const params: unknown[] = [];
    const add = (clause: string, value: unknown) => {
      params.push(value);
      where.push(clause.replaceAll("?", `$${params.length}`));
    };
    const q = data.q?.trim();
    if (q) {
      params.push(`%${q}%`);
      const i = params.length;
      where.push(
        `(v.title ilike $${i} or v.brand ilike $${i} or v.model ilike $${i} or v.city ilike $${i})`,
      );
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
    const rows = await sql.query<VehicleRow>(
      `select v.*, p.display_name as seller_name
       from vehicles v
       left join profiles p on p.user_id = v.user_id
       where ${where.join(" and ")}
       order by v.created_at desc`,
      params,
    );
    return rows.map((r) => mapVehicle(r));
  });

export const getVehicle = createServerFn({ method: "GET" })
  .validator(z.object({ id: z.number() }))
  .handler(async ({ data }) => {
    const sql = await getSql();
    const rows = await sql<VehicleRow>`
      select v.*, p.display_name as seller_name
      from vehicles v
      left join profiles p on p.user_id = v.user_id
      where v.id = ${data.id}
    `;
    return rows[0] ? mapVehicle(rows[0]) : null;
  });

export const featuredVehicles = createServerFn({ method: "GET" }).handler(
  async () => {
    const sql = await getSql();
    const rows = await sql<VehicleRow>`
      select v.*, p.display_name as seller_name
      from vehicles v
      left join profiles p on p.user_id = v.user_id
      where v.status = 'activo'
      order by v.created_at desc
      limit 6
    `;
    return rows.map((r) => mapVehicle(r));
  },
);

export const marketStats = createServerFn({ method: "GET" }).handler(async () => {
  const sql = await getSql();
  const v = await sql<{ c: number }>`select count(*)::int as c from vehicles where status = 'activo'`;
  const sale = await sql<{ c: number }>`select count(*)::int as c from vehicles where status = 'activo' and listing_type in ('venta','ambos')`;
  const swap = await sql<{ c: number }>`select count(*)::int as c from vehicles where status = 'activo' and listing_type in ('permuta','ambos')`;
  const cities = await sql<{ c: number }>`select count(distinct city)::int as c from vehicles where status = 'activo'`;
  return {
    active: v[0]?.c ?? 0,
    sale: sale[0]?.c ?? 0,
    swap: swap[0]?.c ?? 0,
    cities: cities[0]?.c ?? 0,
  };
});

export const getMyProfile = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    await ensureProfileRow(context.userId);
    const sql = await getSql();
    const rows = await sql<{
      user_id: string;
      display_name: string;
      email: string | null;
      phone: string | null;
      city: string | null;
      role: string;
      created_at: string;
    }>`
      select user_id, display_name, email, phone, city, role, created_at
      from profiles where user_id = ${context.userId}
    `;
    const r = rows[0];
    if (!r) return null;
    return {
      userId: r.user_id,
      displayName: r.display_name,
      email: r.email,
      phone: r.phone,
      city: r.city,
      role: r.role,
      createdAt: String(r.created_at),
    } satisfies Profile;
  });

export const updateMyProfile = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator(
    z.object({
      displayName: z.string().min(2).max(80),
      phone: z.string().max(30).optional(),
      city: z.string().max(60).optional(),
      email: z.string().email().optional(),
    }),
  )
  .handler(async ({ context, data }) => {
    await ensureProfileRow(context.userId, data.displayName, data.email);
    const sql = await getSql();
    await sql`
      update profiles
      set display_name = ${data.displayName},
          phone = ${data.phone ?? null},
          city = ${data.city ?? null},
          email = ${data.email ?? null}
      where user_id = ${context.userId}
    `;
    return { ok: true };
  });

export const createVehicle = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator(vehicleInput)
  .handler(async ({ context, data }) => {
    await ensureProfileRow(context.userId);
    const sql = await getSql();
    const rows = await sql<{ id: number }>`
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
    `;
    return { id: rows[0].id };
  });

export const listMyVehicles = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    await ensureProfileRow(context.userId);
    const sql = await getSql();
    const rows = await sql<VehicleRow>`
      select v.*, p.display_name as seller_name
      from vehicles v
      left join profiles p on p.user_id = v.user_id
      where v.user_id = ${context.userId}
      order by v.created_at desc
    `;
    return rows.map((r) => mapVehicle(r));
  });

export const updateVehicleStatus = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator(z.object({ id: z.number(), status: z.enum(["activo", "pausado", "vendido"]) }))
  .handler(async ({ context, data }) => {
    const sql = await getSql();
    await sql`
      update vehicles
      set status = ${data.status}
      where id = ${data.id} and user_id = ${context.userId}
    `;
    return { ok: true };
  });

export const deleteMyVehicle = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator(z.object({ id: z.number() }))
  .handler(async ({ context, data }) => {
    const sql = await getSql();
    await sql`delete from vehicles where id = ${data.id} and user_id = ${context.userId}`;
    return { ok: true };
  });

export const toggleFavorite = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator(z.object({ vehicleId: z.number() }))
  .handler(async ({ context, data }) => {
    await ensureProfileRow(context.userId);
    const sql = await getSql();
    const existing = await sql<{ vehicle_id: number }>`
      select vehicle_id from favorites
      where user_id = ${context.userId} and vehicle_id = ${data.vehicleId}
    `;
    if (existing.length) {
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

export const listFavorites = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    const sql = await getSql();
    const rows = await sql<VehicleRow>`
      select v.*, p.display_name as seller_name
      from favorites f
      join vehicles v on v.id = f.vehicle_id
      left join profiles p on p.user_id = v.user_id
      where f.user_id = ${context.userId}
      order by f.created_at desc
    `;
    return rows.map((r) => mapVehicle(r, new Set(rows.map((x) => x.id))));
  });

export const listFavoriteIds = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    const sql = await getSql();
    const rows = await sql<{ vehicle_id: number }>`
      select vehicle_id from favorites where user_id = ${context.userId}
    `;
    return rows.map((r) => r.vehicle_id);
  });

export const isFavorite = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .validator(z.object({ vehicleId: z.number() }))
  .handler(async ({ context, data }) => {
    const sql = await getSql();
    const rows = await sql<{ c: number }>`
      select count(*)::int as c from favorites
      where user_id = ${context.userId} and vehicle_id = ${data.vehicleId}
    `;
    return { favorite: (rows[0]?.c ?? 0) > 0 };
  });

export const createOffer = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator(
    z.object({
      vehicleId: z.number(),
      offerType: z.enum(["compra", "permuta"]),
      amount: z.number().optional(),
      swapVehicleId: z.number().optional(),
      message: z.string().max(800).optional(),
    }),
  )
  .handler(async ({ context, data }) => {
    await ensureProfileRow(context.userId);
    const sql = await getSql();
    const vehicle = await sql<{ user_id: string; listing_type: string; status: string }>`
      select user_id, listing_type, status from vehicles where id = ${data.vehicleId}
    `;
    if (!vehicle[0] || vehicle[0].status !== "activo") {
      throw new Error("El anuncio no está disponible.");
    }
    if (vehicle[0].user_id === context.userId) {
      throw new Error("No puedes ofertar sobre tu propio anuncio.");
    }
    const listing = vehicle[0].listing_type;
    if (data.offerType === "compra" && listing === "permuta") {
      throw new Error("Este anuncio solo acepta permuta.");
    }
    if (data.offerType === "permuta" && listing === "venta") {
      throw new Error("Este anuncio solo está en venta.");
    }
    if (data.offerType === "permuta") {
      if (!data.swapVehicleId) throw new Error("Elige un vehículo para permutar.");
      const mine = await sql<{ id: number }>`
        select id from vehicles
        where id = ${data.swapVehicleId} and user_id = ${context.userId} and status = 'activo'
      `;
      if (!mine[0]) throw new Error("El vehículo de permuta no es tuyo o no está activo.");
    }
    const rows = await sql<{ id: number }>`
      insert into offers (vehicle_id, buyer_id, offer_type, amount, swap_vehicle_id, message, status)
      values (
        ${data.vehicleId}, ${context.userId}, ${data.offerType},
        ${data.amount ?? null}, ${data.swapVehicleId ?? null}, ${data.message ?? null}, 'pendiente'
      )
      returning id
    `;
    return { id: rows[0].id };
  });

type OfferRow = {
  id: number;
  vehicle_id: number;
  buyer_id: string;
  offer_type: string;
  amount: number | null;
  swap_vehicle_id: number | null;
  message: string | null;
  status: string;
  created_at: string;
  vehicle_title?: string;
  vehicle_image?: string;
  swap_title?: string | null;
  buyer_name?: string | null;
};

function mapOffer(row: OfferRow): Offer {
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
    buyerName: row.buyer_name ?? null,
  };
}

export const listMyOffers = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    await ensureProfileRow(context.userId);
    const sql = await getSql();
    const sent = await sql<OfferRow>`
      select o.*, v.title as vehicle_title, v.image_url as vehicle_image,
             s.title as swap_title, p.display_name as buyer_name
      from offers o
      join vehicles v on v.id = o.vehicle_id
      left join vehicles s on s.id = o.swap_vehicle_id
      left join profiles p on p.user_id = o.buyer_id
      where o.buyer_id = ${context.userId}
      order by o.created_at desc
    `;
    const received = await sql<OfferRow>`
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
      received: received.map(mapOffer),
    };
  });

export const respondOffer = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator(z.object({ id: z.number(), status: z.enum(["aceptada", "rechazada", "cerrada"]) }))
  .handler(async ({ context, data }) => {
    const sql = await getSql();
    const rows = await sql<{ id: number; vehicle_id: number }>`
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

export const submitContact = createServerFn({ method: "POST" })
  .validator(
    z.object({
      name: z.string().min(2).max(80),
      email: z.string().email(),
      phone: z.string().min(6).max(30),
      subject: z.string().max(120).optional(),
      message: z.string().min(8).max(2000),
    }),
  )
  .handler(async ({ data }) => {
    const sql = await getSql();
    await sql`
      insert into contacts (name, email, phone, subject, message)
      values (${data.name}, ${data.email}, ${data.phone}, ${data.subject ?? null}, ${data.message})
    `;
    return { ok: true };
  });

export const adminStats = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    await requireAdmin(context.userId);
    const sql = await getSql();
    const users = await sql<{ c: number }>`select count(*)::int as c from profiles`;
    const vehicles = await sql<{ c: number }>`select count(*)::int as c from vehicles`;
    const pending = await sql<{ c: number }>`select count(*)::int as c from offers where status = 'pendiente'`;
    const contacts = await sql<{ c: number }>`select count(*)::int as c from contacts`;
    const byStatus = await sql<{ status: string; c: number }>`
      select status, count(*)::int as c from vehicles group by status
    `;
    const byType = await sql<{ listing_type: string; c: number }>`
      select listing_type, count(*)::int as c from vehicles group by listing_type
    `;
    const byCity = await sql<{ city: string; c: number }>`
      select city, count(*)::int as c from vehicles where status = 'activo' group by city order by c desc
    `;
    const recentOffers = await sql<OfferRow>`
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
      recentOffers: recentOffers.map(mapOffer),
    };
  });

export const adminListUsers = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    await requireAdmin(context.userId);
    const sql = await getSql();
    const rows = await sql<{
      user_id: string;
      display_name: string;
      email: string | null;
      phone: string | null;
      city: string | null;
      role: string;
      created_at: string;
    }>`
      select user_id, display_name, email, phone, city, role, created_at
      from profiles
      order by created_at desc
    `;
    return rows.map((r) => ({
      userId: r.user_id,
      displayName: r.display_name,
      email: r.email,
      phone: r.phone,
      city: r.city,
      role: r.role,
      createdAt: String(r.created_at),
    })) satisfies Profile[];
  });

export const adminSetRole = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator(z.object({ userId: z.string(), role: z.enum(["admin", "cliente"]) }))
  .handler(async ({ context, data }) => {
    await requireAdmin(context.userId);
    if (data.userId === context.userId && data.role !== "admin") {
      throw new Error("No puedes quitarte el rol de administrador.");
    }
    const sql = await getSql();
    await sql`update profiles set role = ${data.role} where user_id = ${data.userId}`;
    return { ok: true };
  });

export const adminListVehicles = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    await requireAdmin(context.userId);
    const sql = await getSql();
    const rows = await sql<VehicleRow>`
      select v.*, p.display_name as seller_name
      from vehicles v
      left join profiles p on p.user_id = v.user_id
      order by v.created_at desc
    `;
    return rows.map((r) => mapVehicle(r));
  });

export const adminSetVehicleStatus = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator(
    z.object({
      id: z.number(),
      status: z.enum(["activo", "pausado", "vendido", "rechazado"]),
    }),
  )
  .handler(async ({ context, data }) => {
    await requireAdmin(context.userId);
    const sql = await getSql();
    await sql`update vehicles set status = ${data.status} where id = ${data.id}`;
    return { ok: true };
  });

export const adminListOffers = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    await requireAdmin(context.userId);
    const sql = await getSql();
    const rows = await sql<OfferRow>`
      select o.*, v.title as vehicle_title, v.image_url as vehicle_image,
             s.title as swap_title, p.display_name as buyer_name
      from offers o
      join vehicles v on v.id = o.vehicle_id
      left join vehicles s on s.id = o.swap_vehicle_id
      left join profiles p on p.user_id = o.buyer_id
      order by o.created_at desc
    `;
    return rows.map(mapOffer);
  });

export const adminListContacts = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    await requireAdmin(context.userId);
    const sql = await getSql();
    const rows = await sql<{
      id: number;
      user_id: string | null;
      name: string;
      email: string;
      phone: string;
      subject: string | null;
      message: string;
      created_at: string;
    }>`
      select id, user_id, name, email, phone, subject, message, created_at
      from contacts
      order by created_at desc
    `;
    return rows.map(
      (r) =>
        ({
          id: r.id,
          userId: r.user_id,
          name: r.name,
          email: r.email,
          phone: r.phone,
          subject: r.subject,
          message: r.message,
          createdAt: String(r.created_at),
        }) satisfies ContactRow,
    );
  });

export const adminDeleteContact = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator(z.object({ id: z.number() }))
  .handler(async ({ context, data }) => {
    await requireAdmin(context.userId);
    const sql = await getSql();
    await sql`delete from contacts where id = ${data.id}`;
    return { ok: true };
  });
