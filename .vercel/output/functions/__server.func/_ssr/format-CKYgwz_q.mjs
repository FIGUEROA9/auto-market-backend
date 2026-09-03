//#region node_modules/.nitro/vite/services/ssr/assets/format-CKYgwz_q.js
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
function formatDate(iso) {
	if (!iso) return "—";
	const [y, m, d] = String(iso).slice(0, 10).split("-");
	if (!y || !m || !d) return String(iso);
	return `${d}/${m}/${y}`;
}
function isDateExpired(iso) {
	if (!iso) return false;
	return String(iso).slice(0, 10) < (/* @__PURE__ */ new Date()).toISOString().slice(0, 10);
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
	aceptada: "Aceptada",
	cerrada: "Cerrada"
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
var VERIFICATION_LABEL = {
	ninguno: "Sin verificar",
	pendiente: "En revisión",
	verificado: "Verificado",
	rechazado: "Rechazado"
};
var TAX_OPTIONS = [
	"Impuesto vehicular 2023",
	"Impuesto vehicular 2024",
	"Impuesto vehicular 2025",
	"Impuesto vehicular 2026",
	"Comparendos / fotomultas",
	"Otros"
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
	"Otra"
];
var BODY_OPTIONS = [
	["sedan", "Sedán"],
	["suv", "SUV"],
	["pickup", "Pickup"],
	["hatchback", "Hatchback"],
	["van", "Van"],
	["coupe", "Coupé"]
];
var FUEL_OPTIONS = [
	["gasolina", "Gasolina"],
	["diesel", "Diésel"],
	["hibrido", "Híbrido"],
	["electrico", "Eléctrico"]
];
//#endregion
export { isDateExpired as _, CONDITION_LABEL as a, LISTING_LABEL as c, TAX_OPTIONS as d, TRANS_LABEL as f, formatKm as g, formatDate as h, CITIES as i, OFFER_TYPE_LABEL as l, formatCop as m, BODY_OPTIONS as n, FUEL_LABEL as o, VERIFICATION_LABEL as p, BRANDS as r, FUEL_OPTIONS as s, BODY_LABEL as t, STATUS_LABEL as u };
