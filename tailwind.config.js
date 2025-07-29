/** @type {import("tailwindcss").Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Cores principais Sicoob
        "sicoob-turquesa": "#00AE9D",
        "sicoob-verde-escuro": "#003641",
        "sicoob-branco": "#FFFFFF",
        
        // Cores de apoio Sicoob
        "sicoob-verde-claro": "#C9D200",
        "sicoob-verde-medio": "#7DB61C",
        "sicoob-roxo": "#49479D",
        
        // Cores complementares para UI
        "sicoob-cinza-claro": "#F5F5F5",
        "sicoob-cinza-medio": "#E5E5E5",
        "sicoob-cinza-escuro": "#404040",
        
        // Variações para estados (hover, focus, etc.)
        "sicoob-turquesa-light": "#33C4B5",
        "sicoob-turquesa-dark": "#008A7A",
        "sicoob-verde-escuro-light": "#1A4A55",
        "sicoob-verde-medio-light": "#9BC93A",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};


