import nextCoreWebVitals from "eslint-config-next/core-web-vitals";
import nextTypescript from "eslint-config-next/typescript";

const eslintConfig = [
	{
		ignores: [
			".next/**",
			".next-node/**",
			".vinext/**",
			".wrangler/**",
			"node_modules/**",
			"drizzle/**",
			"dist/**",
			"data/**",
			"deploy/**/node_modules/**",
			"cloudflare-env.d.ts",
			"next-env.d.ts",
		],
	},
	...nextCoreWebVitals,
	...nextTypescript,
	{
		rules: {
			"react-hooks/set-state-in-effect": "off",
			"react-hooks/refs": "off",
			"react-hooks/purity": "off",
			"react-hooks/immutability": "off",
			"react-hooks/preserve-manual-memoization": "off",
			"@typescript-eslint/no-explicit-any": "off",
		},
	},
];

export default eslintConfig;
