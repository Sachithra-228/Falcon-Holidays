/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                navy: {
                    DEFAULT: "#0a1628",
                    50: "#e8edf5",
                    100: "#c5d0e5",
                    200: "#9fb2d4",
                    300: "#7894c3",
                    400: "#5a7bb6",
                    500: "#3b62a9",
                    600: "#2d4f8e",
                    700: "#1e3a72",
                    800: "#112558",
                    900: "#0a1628",
                },
                gold: {
                    DEFAULT: "#c9a84c",
                    50: "#fdf8ec",
                    100: "#f8edca",
                    200: "#f2dea0",
                    300: "#eacf75",
                    400: "#e2c054",
                    500: "#c9a84c",
                    600: "#a8883a",
                    700: "#87692b",
                    800: "#664f1e",
                    900: "#453512",
                },
            },
            fontFamily: {
                sans: ["Inter", "system-ui", "sans-serif"],
            },
            backgroundImage: {
                "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
            },
            animation: {
                "fade-in": "fadeIn 0.6s ease-out",
                "slide-up": "slideUp 0.6s ease-out",
                "float": "float 3s ease-in-out infinite",
            },
            keyframes: {
                fadeIn: {
                    "0%": { opacity: "0" },
                    "100%": { opacity: "1" },
                },
                slideUp: {
                    "0%": { opacity: "0", transform: "translateY(20px)" },
                    "100%": { opacity: "1", transform: "translateY(0)" },
                },
                float: {
                    "0%, 100%": { transform: "translateY(0)" },
                    "50%": { transform: "translateY(-10px)" },
                },
            },
        },
    },
    plugins: [],
};
