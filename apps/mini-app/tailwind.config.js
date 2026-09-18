/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                mobifone: {
                    blue: '#005BAC',      // MobiFone Royal Blue (Chu dao)
                    red: '#ED1C24',       // MobiFone Red Accent (Canh bao, uu dai)
                    sky: '#0EA5E9',       // Data balance, tin tuc
                    canvas: '#F8FAFC',    // Nen tong the
                    surface: '#FFFFFF',   // Nen the Card
                    dark: '#0F172A',      // Chu de tieu de
                    muted: '#64748B',     // Chu phu
                }
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
            }
        },
    },
    plugins: [],
}
