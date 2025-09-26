const config = {
    content: [
        "./src/app/**/*.{js,ts,jsx,tsx}",       // App Router pages and layouts
        "./src/app/components/**/*.{js,ts,jsx,tsx}", // your components
        "./src/**/*.{js,ts,jsx,tsx}",           // fallback for other files
        "./public/**/*.html",
        "./src/**/*"                  // arquivos HTML estáticos
    ],
    theme: {
        extend: {},
    },
  plugins: {
    "@tailwindcss/postcss": {},
  }
}
export default config;