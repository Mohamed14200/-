/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: ['class'],
	content: [
		'./pages/**/*.{ts,tsx}',
		'./components/**/*.{ts,tsx}',
		'./app/**/*.{ts,tsx}',
		'./src/**/*.{ts,tsx}',
	],
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px',
			},
		},
		extend: {
			fontFamily: {
				'arabic': ['Cairo', 'Tajawal', 'sans-serif'],
				'display': ['Cairo', 'sans-serif'],
				'body': ['Tajawal', 'sans-serif'],
			},
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: '#0056b3',
					light: '#4A90E2',
					dark: '#003d82',
					foreground: '#ffffff',
				},
				secondary: {
					DEFAULT: '#007bff',
					light: '#66b3ff',
					dark: '#0056b3',
					foreground: '#ffffff',
				},
				accent: {
					DEFAULT: '#ffc107',
					light: '#ffeb3b',
					dark: '#ff9800',
					foreground: '#000000',
				},
				success: {
					DEFAULT: '#28a745',
					light: '#5cb85c',
					dark: '#1e7e34',
					foreground: '#ffffff',
				},
				danger: {
					DEFAULT: '#dc3545',
					light: '#f86c6b',
					dark: '#c82333',
					foreground: '#ffffff',
				},
				warning: {
					DEFAULT: '#ffc107',
					light: '#ffeb3b',
					dark: '#ff9800',
					foreground: '#000000',
				},
				info: {
					DEFAULT: '#17a2b8',
					light: '#5bc0de',
					dark: '#138496',
					foreground: '#ffffff',
				},
				light: {
					DEFAULT: '#f8f9fa',
					foreground: '#495057',
				},
				dark: {
					DEFAULT: '#343a40',
					foreground: '#ffffff',
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))',
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))',
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))',
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))',
				},
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)',
			},
			keyframes: {
				'accordion-down': {
					from: { height: 0 },
					to: { height: 'var(--radix-accordion-content-height)' },
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: 0 },
				},
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
			},
		},
	},
	plugins: [require('tailwindcss-animate')],
}