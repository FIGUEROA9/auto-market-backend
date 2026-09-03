//#region node_modules/.nitro/vite/services/ssr/assets/images-jYgZVdQh.js
function compressImageFile(file, maxWidth = 1400, quality = .72) {
	return new Promise((resolve, reject) => {
		if (!file.type.startsWith("image/")) {
			reject(/* @__PURE__ */ new Error("El archivo debe ser una imagen."));
			return;
		}
		const img = new Image();
		const url = URL.createObjectURL(file);
		img.onload = () => {
			const scale = Math.min(1, maxWidth / Math.max(img.width, 1));
			const canvas = document.createElement("canvas");
			canvas.width = Math.max(1, Math.round(img.width * scale));
			canvas.height = Math.max(1, Math.round(img.height * scale));
			const ctx = canvas.getContext("2d");
			if (!ctx) {
				URL.revokeObjectURL(url);
				reject(/* @__PURE__ */ new Error("No se pudo procesar la imagen."));
				return;
			}
			ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
			URL.revokeObjectURL(url);
			resolve(canvas.toDataURL("image/jpeg", quality));
		};
		img.onerror = () => {
			URL.revokeObjectURL(url);
			reject(/* @__PURE__ */ new Error("No se pudo leer la imagen."));
		};
		img.src = url;
	});
}
function parseImageList(raw, fallback) {
	if (raw) try {
		const parsed = JSON.parse(raw);
		if (Array.isArray(parsed)) {
			const urls = parsed.filter((x) => typeof x === "string" && x.length > 0).slice(0, 6);
			if (urls.length) return urls;
		}
	} catch {}
	return fallback ? [fallback] : [];
}
//#endregion
export { parseImageList as n, compressImageFile as t };
