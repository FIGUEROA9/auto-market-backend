export function formatCop(value: number) {
  return Number(value).toLocaleString("es-CO", {
    style: "currency",
    currency: "COP",
    maximumFractionDigits: 0,
  });
}

export function formatKm(value: number) {
  return `${Number(value).toLocaleString("es-CO")} km`;
}

export const LISTING_LABEL: Record<string, string> = {
  venta: "Venta",
  permuta: "Permuta",
  ambos: "Venta o permuta",
};

export const STATUS_LABEL: Record<string, string> = {
  activo: "Activo",
  pausado: "Pausado",
  vendido: "Vendido",
  rechazado: "Rechazado",
  pendiente: "Pendiente",
  aceptada: "Aceptada",
  cerrada: "Cerrada",
};

export const BODY_LABEL: Record<string, string> = {
  sedan: "Sedán",
  suv: "SUV",
  pickup: "Pickup",
  hatchback: "Hatchback",
  van: "Van",
  coupe: "Coupé",
};

export const FUEL_LABEL: Record<string, string> = {
  gasolina: "Gasolina",
  diesel: "Diésel",
  hibrido: "Híbrido",
  electrico: "Eléctrico",
};

export const TRANS_LABEL: Record<string, string> = {
  manual: "Manual",
  automatica: "Automática",
};

export const CONDITION_LABEL: Record<string, string> = {
  nuevo: "Nuevo",
  seminuevo: "Seminuevo",
  usado: "Usado",
};

export const OFFER_TYPE_LABEL: Record<string, string> = {
  compra: "Compra",
  permuta: "Permuta",
};

export const BRANDS = [
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
  "Otro",
] as const;

export const CITIES = [
  "Bogotá",
  "Medellín",
  "Cali",
  "Barranquilla",
  "Bucaramanga",
  "Cartagena",
  "Pereira",
  "Otra",
] as const;
