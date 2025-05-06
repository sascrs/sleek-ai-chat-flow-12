
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
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			fontFamily: {
				sans: ['Inter', 'system-ui', 'sans-serif'],
				'space-grotesk': ['Space Grotesk', 'system-ui', 'sans-serif'],
			},
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},
				// Premium accent colors
				premium: {
					DEFAULT: 'hsl(var(--premium))',
					foreground: 'hsl(var(--premium-foreground))',
					muted: 'hsl(var(--premium-muted))',
					'muted-foreground': 'hsl(var(--premium-muted-foreground))'
				},
				ai: {
					DEFAULT: 'hsl(var(--ai))',
					foreground: 'hsl(var(--ai-foreground))',
					muted: 'hsl(var(--ai-muted))',
					'muted-foreground': 'hsl(var(--ai-muted-foreground))'
				},
				user: {
					DEFAULT: 'hsl(var(--user))',
					foreground: 'hsl(var(--user-foreground))'
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' }
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' }
				},
				'typing': {
					'0%': { width: '0' },
					'100%': { width: '100%' }
				},
				'blink': {
					'0%, 100%': { opacity: '1' },
					'50%': { opacity: '0' }
				},
				'fade-in': {
					'0%': { opacity: '0', transform: 'translateY(8px)' },
					'100%': { opacity: '1', transform: 'translateY(0)' }
				},
				'gradient-flow': {
					'0%': { backgroundPosition: '0% 50%' },
					'50%': { backgroundPosition: '100% 50%' },
					'100%': { backgroundPosition: '0% 50%' }
				},
				'pulse-soft': {
					'0%, 100%': { opacity: '1' },
					'50%': { opacity: '0.8' }
				},
				'float': {
					'0%, 100%': { transform: 'translateY(0)' },
					'50%': { transform: 'translateY(-5px)' }
				},
				'shimmer': {
					'0%': { backgroundPosition: '-100% 50%' },
					'100%': { backgroundPosition: '200% 50%' }
				},
				'scale-up': {
					'0%': { transform: 'scale(0.97)', opacity: '0' },
					'100%': { transform: 'scale(1)', opacity: '1' }
				},
				'rotate-orbit': {
					'0%': { transform: 'rotate(0deg) translateX(10px) rotate(0deg)' },
					'100%': { transform: 'rotate(360deg) translateX(10px) rotate(-360deg)' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'typing': 'typing 1.5s steps(20, end), blink 0.75s step-end infinite',
				'fade-in': 'fade-in 0.3s ease-out',
				'gradient-flow': 'gradient-flow 3s ease infinite',
				'pulse-soft': 'pulse-soft 1.5s infinite',
				'float': 'float 3s ease-in-out infinite',
				'shimmer': 'shimmer 2.5s infinite',
				'scale-up': 'scale-up 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards',
				'rotate-orbit': 'rotate-orbit 8s linear infinite'
			},
			boxShadow: {
				'premium': '0 4px 14px 0 rgba(101, 119, 255, 0.2)',
				'3d': '0 8px 16px -2px rgba(0, 0, 0, 0.1), 0 4px 8px -2px rgba(0, 0, 0, 0.05)',
				'inner-glow': 'inset 0 0 15px rgba(124, 58, 237, 0.2)',
				'neon': '0 0 5px rgba(124, 58, 237, 0.3), 0 0 20px rgba(124, 58, 237, 0.15)'
			},
			backgroundImage: {
				'premium-gradient': 'linear-gradient(135deg, #9b87f5 0%, #7E69AB 100%)',
				'premium-gradient-hover': 'linear-gradient(135deg, #8c78e6 0%, #6e5a9b 100%)',
				'mesh-gradient': 'radial-gradient(at 50% 50%, rgba(124, 58, 237, 0.08) 0, transparent 50%)',
				'subtle-dots': 'radial-gradient(circle at 25px 25px, rgba(124, 58, 237, 0.15) 2%, transparent 0%)',
				'glow-conic': 'conic-gradient(from 180deg at 50% 50%, rgba(124, 58, 237, 0.1), rgba(59, 130, 246, 0.1), rgba(124, 58, 237, 0.1))'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
