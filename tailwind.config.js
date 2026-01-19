/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    50: '#f9fafb',
                    100: '#f3f4f6',
                    200: '#e5e7eb',
                    300: '#d1d5db',
                    400: '#9ca3af',
                    500: '#6b7280',
                    600: '#4b5563',
                    700: '#374151',
                    800: '#1f2937',
                    900: '#111827', // Almost black
                },
                accent: {
                    red: '#C8102E', // Aab style red
                    cream: '#F5F5F0', // Light beige background
                    dark: '#1A1A1A', // Sharp dark text
                },
                cream: '#F5F5F0',
                gold: {
                    500: '#C5A059' // Keep gold for subtle touches
                },
            },
            fontFamily: {
                sans: ['var(--font-vazir)', 'ui-sans-serif', 'system-ui'],
                serif: ['var(--font-lalezar)', 'ui-serif', 'Georgia'],
            },
        },
    },
    plugins: [
        require('@tailwindcss/forms'),
        require('tailwindcss-rtl'),
    ],
};
