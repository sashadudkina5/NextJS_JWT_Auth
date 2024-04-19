import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'custom-blue': '#0099c8 ',
        'custom-checkbox': '#59c3e1',
        'custom-gray': '#e5e5e5',
        'custom-white': '#ffffff',
      },
      minWidth: {
        'custom': '30%',
      },
    },
  },
  plugins: [],
};
export default config;
