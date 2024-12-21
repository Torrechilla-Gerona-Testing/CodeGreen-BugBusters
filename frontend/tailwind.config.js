/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        xs: "430px",
        sm: "650px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1536px",
      },
      fontSize: {
        "2xs": ["0.5rem", "0.8rem"],
        xxs: ["0.5rem", "0.75rem"],
        xxxs: ["0.4rem", "0.65rem"],
      },
      colors: {
        textgreen: "#86C232",
        buttongreen: "#61892F",
        inputfield: "#6B6E70",
        hoverbutton: "#222629",
        secondgrey: "#474B4F",
        colorhover: "#33471a",
      },
      backgroundImage: {
        "login-bg": "url('/assets/login.jpg')",
        "signup-bg": "url('/assets/signup.png')",
        "homepage-bg": "url('/assets/homepage.jpg')",
        "about-bg": "url('/assets/about.png')",
        "adminlanding-bg": "url('/assets/adminlanding.png')",
        "policies-bg": "url('/assets/bg-lib.jpg')",
      },
      fontFamily: {
        syke: ["Syke", "sans-serif"],
        "syke-light": ["Syke-Light", "sans-serif"],
        "syke-bold": ["Syke-Bold", "sans-serif"],
        "syke-medium": ["Syke-Medium", "sans-serif"],
        "syke-thin": ["Syke-Thin", "sans-serif"],
        "syke-black": ["Syke-Black", "sans-serif"],
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0", right: "-400px" },
          "100%": { opacity: "100", right: "1rem" },
        },
        fadeOut: {
          "0%": { opacity: "100", right: "1rem" },
          "100%": { opacity: "0", right: "-400px" },
        },
        fadeInZoom: {
          "0%": {
            opacity: "0",
            transform: "scale(0.95)",
          },
          "100%": {
            opacity: "1",
            transform: "scale(1)",
          },
        },
        blink: {
          "50%": { borderColor: "transparent" },
        },
      },
      animation: {
        fadeIn: "fadeIn 0.5s ease-in",
        fadeOut: "fadeOut 0.5s ease-out",
        fadeInZoom: "fadeInZoom 0.8s ease-out",
        typewriter:
          "typewriter 4s steps(40, end) 1s 1 normal both, blink 0.75s step-end infinite",
      },
    },
  },
  plugins: [],
};
