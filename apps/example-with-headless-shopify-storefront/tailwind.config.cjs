/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			backgroundImage: {
				'icon-cart-fill': `url("data:image/svg+xml;charset=utf-8,%3Csvg viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M4.083 5a6.002 6.002 0 0111.834 0H20v14.986L0 20V5h4.083zM14 5c0-1.001-1.06-3.274-4-3.274S6 4.006 6 5c0 0 8 .012 8 0z' fill='%23000'/%3E%3C/svg%3E")`,
				'icon-cart-outline': `url("data:image/svg+xml;charset=utf-8,%3Csvg viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M18 17.987V7H2v11l16-.013zM4.077 5A5.996 5.996 0 0110 0c2.973 0 5.562 2.162 6.038 5H20v14.986L0 20V5h4.077zm9.902-.005C13.531 3.275 11.86 2 10 2 8.153 2 6.604 3.294 6.144 4.995c.92 0 7.654.03 7.835 0z' fill='%23FFF'/%3E%3C/svg%3E")`
			}
		},
	},
	plugins: [],
}
