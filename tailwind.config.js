/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        claude: {
          bg: "#1a1a2e",
          sidebar: "#16213e",
          input: "#0f3460",
          accent: "#e94560",
          text: "#e0e0e0",
        }
      }
    }
  },
  plugins: []
}
