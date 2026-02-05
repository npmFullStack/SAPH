/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                primary: "#007FFF",
                secondary: "#122850",
                bgColor: "#FFFFFF"
            },
            fontFamily: {
                logo: ["Aclonica", "sans-serif"],
                sans: ["Montserrat", "sans-serif"]
            }
        }
    },
    plugins: []
};
