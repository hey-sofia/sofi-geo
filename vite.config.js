import biomePlugin from "vite-plugin-biome";

export default {
	plugins: [
		biomePlugin({
			mode: "check",
			applyFixes: true,
		}),
	],
};
