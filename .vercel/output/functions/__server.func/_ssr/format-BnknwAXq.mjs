//#region node_modules/.nitro/vite/services/ssr/assets/format-BnknwAXq.js
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
//#endregion
export { FUEL_LABEL as a, STATUS_LABEL as c, formatKm as d, CONDITION_LABEL as i, TRANS_LABEL as l, BRANDS as n, LISTING_LABEL as o, CITIES as r, OFFER_TYPE_LABEL as s, BODY_LABEL as t, formatCop as u };
