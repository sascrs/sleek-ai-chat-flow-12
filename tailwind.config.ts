
import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        "space-grotesk": ["Space Grotesk", "sans-serif"],
        display: ["Space Grotesk", "sans-serif"],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          border: "hsl(var(--sidebar-border))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
        },
        premium: "hsl(var(--premium))",
        "premium-foreground": "hsl(var(--premium-foreground))",
        "premium-muted": "hsl(var(--premium-muted))",
        "premium-muted-foreground": "hsl(var(--premium-muted-foreground))",
        ai: "hsl(var(--ai))",
        "ai-foreground": "hsl(var(--ai-foreground))",
        "ai-muted": "hsl(var(--ai-muted))",
        "ai-muted-foreground": "hsl(var(--ai-muted-foreground))",
        user: "hsl(var(--user))",
        "user-foreground": "hsl(var(--user-foreground))",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
        pulse: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.5" },
        },
        "pulse-soft": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.7" },
        },
        shine: {
          "0%": { backgroundPosition: "-100% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-100% 0" },
          "100%": { backgroundPosition: "100% 0" },
        },
        "fade-in": {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "scale-up": {
          "0%": { transform: "scale(0.95)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        "rotate-orbit": {
          "0%": { transform: "rotate(0deg) translateX(10px) rotate(0deg)" },
          "100%": { transform: "rotate(360deg) translateX(10px) rotate(-360deg)" },
        },
        blob: {
          "0%, 100%": { borderRadius: "60% 40% 30% 70% / 60% 30% 70% 40%" },
          "50%": { borderRadius: "30% 60% 70% 40% / 50% 60% 30% 60%" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        float: "float 5s ease-in-out infinite",
        "float-slow": "float 8s ease-in-out infinite",
        "pulse-soft": "pulse-soft 3s ease-in-out infinite",
        "pulse-slow": "pulse 4s ease-in-out infinite",
        shine: "shine 3s linear infinite",
        shimmer: "shimmer 2s linear infinite",
        "fade-in": "fade-in 0.3s ease-out forwards",
        "scale-up": "scale-up 0.3s ease-out forwards",
        "rotate-orbit": "rotate-orbit 8s linear infinite",
        blob: "blob 12s ease-in-out infinite",
      },
      boxShadow: {
        premium: "0 4px 20px rgba(159, 122, 234, 0.25)",
        soft: "0 4px 14px rgba(0, 0, 0, 0.05)",
        glass: "0 8px 32px rgba(0, 0, 0, 0.12)",
        "inner-glow": "inset 0 0 15px rgba(124, 58, 237, 0.15)",
        neon: "0 0 15px rgba(124, 58, 237, 0.3)",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "premium-gradient": "linear-gradient(135deg, #9b87f5 0%, #7E69AB 100%)",
        "premium-gradient-hover": "linear-gradient(135deg, #8c78e6 0%, #6e5a9b 100%)",
        "glass-gradient": "linear-gradient(to right bottom, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.01))",
      },
      letterSpacing: {
        "tight": "-0.025em",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
