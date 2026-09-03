//#region node_modules/.nitro/vite/services/ssr/assets/format-C8tXPYk_.js
function formatCop(value) {
	return Number(value).toLocaleString("es-CO", {
		style: "currency",
		currency: "COP",
		maximumFractionDigits: 0
	});
}
function formatKm(value) {
	return `${Number(value).toLocaleString("es-CO")} km`;
}
function formatDate(value) {
	if (!value) return "Sin registrar";
	const d = /* @__PURE__ */ new Date(`${value}T00:00:00`);
	if (Number.isNaN(d.getTime())) return value;
	return d.toLocaleDateString("es-CO", {
		day: "2-digit",
		month: "short",
		year: "numeric"
	});
}
function isExpired(value) {
	if (!value) return false;
	return value < (/* @__PURE__ */ new Date()).toISOString().slice(0, 10);
}
function isExpiringSoon(value, days = 30) {
	if (!value || isExpired(value)) return false;
	const limit = /* @__PURE__ */ new Date();
	limit.setDate(limit.getDate() + days);
	return value <= limit.toISOString().slice(0, 10);
}
function digitsPhone(phone) {
	const d = phone.replace(/\D/g, "");
	if (!d) return "";
	return d.startsWith("57") ? d : `57${d}`;
}
function whatsappHref(phone, message) {
	const n = digitsPhone(phone);
	if (!n) return "";
	return `https://wa.me/${n}?text=${encodeURIComponent(message)}`;
}
function mailtoHref(email, subject, body) {
	return `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
var LISTING_LABEL = {
	venta: "Venta",
	permuta: "Permuta",
	ambos: "Venta o permuta"
};
var STATUS_LABEL = {
	activo: "Activo",
	pausado: "Pausado",
	vendido: "Vendido",
	rechazado: "Rechazado",
	pendiente: "Pendiente",
	pendiente_revision: "En revisión",
	aceptada: "Aceptada",
	cerrada: "Cerrada",
	contraoferta: "Contraoferta",
	sin_verificar: "Sin verificar",
	verificado: "Verificado",
	deshabilitado: "Deshabilitado"
};
var BODY_LABEL = {
	sedan: "Sedán",
	suv: "SUV",
	pickup: "Pickup",
	hatchback: "Hatchback",
	van: "Van",
	coupe: "Coupé"
};
var FUEL_LABEL = {
	gasolina: "Gasolina",
	diesel: "Diésel",
	hibrido: "Híbrido",
	electrico: "Eléctrico"
};
var TRANS_LABEL = {
	manual: "Manual",
	automatica: "Automática"
};
var CONDITION_LABEL = {
	nuevo: "Nuevo",
	seminuevo: "Seminuevo",
	usado: "Usado"
};
var OFFER_TYPE_LABEL = {
	compra: "Compra",
	permuta: "Permuta"
};
var DOC_TYPES = [
	{
		value: "CC",
		label: "Cédula de ciudadanía"
	},
	{
		value: "CE",
		label: "Cédula de extranjería"
	},
	{
		value: "NIT",
		label: "NIT"
	},
	{
		value: "PA",
		label: "Pasaporte"
	}
];
var BRANDS = [
	"Toyota",
	"Mazda",
	"Chevrolet",
	"Renault",
	"Kia",
	"Nissan",
	"Ford",
	"Volkswagen",
	"Hyundai",
	"BMW",
	"Mercedes-Benz",
	"Otro"
];
var CITIES = [
	"Bogotá",
	"Medellín",
	"Cali",
	"Barranquilla",
	"Bucaramanga",
	"Cartagena",
	"Pereira",
	"Manizales",
	"Santa Marta",
	"Villavicencio",
	"Ibagué",
	"Otra"
];
var STOCK_IMAGES = [
	{
		src: "/vehicles/corolla.jpg",
		label: "Sedán plata"
	},
	{
		src: "/vehicles/cx30.jpg",
		label: "SUV rojo"
	},
	{
		src: "/vehicles/cx5.jpg",
		label: "SUV oscuro"
	},
	{
		src: "/vehicles/onix.jpg",
		label: "Hatch blanco"
	},
	{
		src: "/vehicles/duster.jpg",
		label: "SUV gris"
	},
	{
		src: "/vehicles/sportage.jpg",
		label: "SUV negro"
	},
	{
		src: "/vehicles/frontier.jpg",
		label: "Pickup gris"
	},
	{
		src: "/vehicles/ranger.jpg",
		label: "Pickup naranja"
	},
	{
		src: "/vehicles/jetta.jpg",
		label: "Sedán azul"
	},
	{
		src: "/vehicles/tucson.jpg",
		label: "SUV perla"
	},
	{
		src: "/vehicles/hilux.jpg",
		label: "Pickup blanca"
	},
	{
		src: "/vehicles/tiguan.jpg",
		label: "SUV familiar"
	},
	{
		src: "/vehicles/mazda3.jpg",
		label: "Hatch rojo"
	}
];
//#endregion
export { mailtoHref as _, DOC_TYPES as a, OFFER_TYPE_LABEL as c, TRANS_LABEL as d, formatCop as f, isExpiringSoon as g, isExpired as h, CONDITION_LABEL as i, STATUS_LABEL as l, formatKm as m, BRANDS as n, FUEL_LABEL as o, formatDate as p, CITIES as r, LISTING_LABEL as s, BODY_LABEL as t, STOCK_IMAGES as u, whatsappHref as v };
