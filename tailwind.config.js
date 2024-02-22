/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          background: "#D6FAE6",
          light: "rgba(131, 229, 191, 1)",
          DEFAULT: "#38A993",
          dark: "rgba(34, 120, 121, 1)",
        },
        success: {
          background: "#E3FAD9",
          light: "#96e28c",
          DEFAULT: "#3FA244",
          dark: "#247535",
        },
        info: {
          light: "#6de1f0",
          DEFAULT: "#299FD1",
        },
        warning: {
          lightest: "#FEF1CB",
          light: "#fac664",
          DEFAULT: "#ef8801",
          dark: "#AC5200",
        },
        error: {
          background: "#FADED1",
          light: "#ec8574",
          DEFAULT: "#c81a23",
        },
        neutral: {
          link: "#485466",
          background: "#F2F4F7",
          light: "#d0d5dd",
          gray: "#808991",
          DEFAULT: "#677084",
        },
        disabled: {
          DEFAULT: "rgba(208, 213, 221, 1)",
        },
        base: {
          white: "#fff",
          black: "#111",
        },
      },
      fontFamily: {
        "plus-jakarta-sans": ["Plus Jakarta Sans", "sans-serif"],
      },
      fontSize: {
        xs: "12px",
        sm: "14px",
        base: "16px",
        lg: "18px",
        xl: "20px",
        "2xl": "24px",
        "3xl": "30px",
        "4xl": "36px",
        "5xl": "48px",
        "6xl": "64px",
      },
      heading: {
        1: "40px",
        2: "32px",
        3: "30px",
        4: "24px",
        5: "20px",
        6: "16px",
      },
      body: {
        small: "14px",
        regular: "16px",
        large: "18px",
      },
    },
  },
  variants: {},
  plugins: [],
};
