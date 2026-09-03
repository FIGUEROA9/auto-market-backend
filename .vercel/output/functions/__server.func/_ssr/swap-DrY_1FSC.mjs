//#region node_modules/.nitro/vite/services/ssr/assets/swap-DrY_1FSC.js
function parseSwapPrefs(raw, swapAny = true) {
	if (raw) try {
		const parsed = JSON.parse(raw);
		if (parsed && typeof parsed === "object") return {
			...parsed,
			any: Boolean(parsed.any)
		};
	} catch {}
	return { any: swapAny };
}
function vehicleMatchesPrefs(vehicle, prefs) {
	if (!prefs || prefs.any) return true;
	if (prefs.brand && vehicle.brand !== prefs.brand) return false;
	if (prefs.model && !vehicle.model.toLowerCase().includes(prefs.model.toLowerCase())) return false;
	if (prefs.yearMin != null && vehicle.year < prefs.yearMin) return false;
	if (prefs.yearMax != null && vehicle.year > prefs.yearMax) return false;
	if (prefs.mileageMax != null && vehicle.mileage > prefs.mileageMax) return false;
	if (prefs.condition && vehicle.condition !== prefs.condition) return false;
	if (prefs.fuel && vehicle.fuel !== prefs.fuel) return false;
	if (prefs.transmission && vehicle.transmission !== prefs.transmission) return false;
	if (prefs.bodyType && vehicle.bodyType !== prefs.bodyType) return false;
	if (prefs.city && vehicle.city !== prefs.city) return false;
	if (prefs.priceMin != null && vehicle.price < prefs.priceMin) return false;
	if (prefs.priceMax != null && vehicle.price > prefs.priceMax) return false;
	return true;
}
//#endregion
export { vehicleMatchesPrefs as n, parseSwapPrefs as t };
