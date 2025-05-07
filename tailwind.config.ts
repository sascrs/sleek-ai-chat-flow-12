import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", ...fontFamily.sans],
        "space-grotesk": ["Space Grotesk", ...fontFamily.sans],
      },
      boxShadow: {
        soft: "0 2px 10px rgba(0, 0, 0, 0.08)",
        glass: "0 8px 32px rgba(0, 0, 0, 0.05)",
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
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
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))"
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 0.2rem)",
        sm: "calc(var(--radius) - 0.4rem)",
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
        "float": {
          "0%, 100%": {
            transform: "translateY(0)",
          },
          "50%": {
            transform: "translateY(-5px)",
          },
        },
        "float-slow": {
          "0%, 100%": {
            transform: "translateY(0)",
          },
          "50%": {
            transform: "translateY(-8px)",
          },
        },
        "pulse-soft": {
          "0%, 100%": {
            opacity: "1",
          },
          "50%": {
            opacity: "0.7",
          },
        },
        "blob": {
          "0%": {
            transform: "translate(0px, 0px) scale(1)",
          },
          "33%": {
            transform: "translate(30px, -50px) scale(1.1)",
          },
          "66%": {
            transform: "translate(-20px, 20px) scale(0.9)",
          },
          "100%": {
            transform: "translate(0px, 0px) scale(1)",
          },
        },
        "rotate-orbit": {
          "0%": {
            transform: "rotate(0deg) translateX(10px) rotate(0deg)",
          },
          "100%": {
            transform: "rotate(360deg) translateX(10px) rotate(-360deg)",
          },
        },
        "rotate-orbit-reverse": {
          "0%": {
            transform: "rotate(0deg) translateX(8px) rotate(0deg)",
          },
          "100%": {
            transform: "rotate(-360deg) translateX(8px) rotate(360deg)",
          },
        },
        "ping-slow": {
          "0%": {
            transform: "scale(1)",
            opacity: "0.8",
          },
          "50%": {
            transform: "scale(1.3)",
            opacity: "0.4",
          },
          "100%": {
            transform: "scale(1)",
            opacity: "0.8",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "float": "float 3s ease-in-out infinite",
        "float-slow": "float-slow 5s ease-in-out infinite",
        "pulse-soft": "pulse-soft 2s ease-in-out infinite",
        "blob": "blob 7s infinite",
        "fade-in": "fade-in 0.4s ease-out",
        "scale-up": "scale-up 0.3s ease-out",
        "rotate-orbit": "rotate-orbit 5s linear infinite",
        "rotate-orbit-reverse": "rotate-orbit-reverse 4s linear infinite",
        "ping-slow": "ping-slow 2s cubic-bezier(0, 0, 0.2, 1) infinite",
      },
    },
  },
  plugins: [],
} satisfies Config;
