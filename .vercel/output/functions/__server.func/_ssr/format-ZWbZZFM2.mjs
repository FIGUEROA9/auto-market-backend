//#region node_modules/.nitro/vite/services/ssr/assets/format-ZWbZZFM2.js
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
	}
];
//#endregion
export { FUEL_LABEL as a, STATUS_LABEL as c, formatCop as d, formatKm as f, CONDITION_LABEL as i, STOCK_IMAGES as l, BRANDS as n, LISTING_LABEL as o, CITIES as r, OFFER_TYPE_LABEL as s, BODY_LABEL as t, TRANS_LABEL as u };
