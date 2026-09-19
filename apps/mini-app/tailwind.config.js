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
                    canvas: '#FAF8FF',    // Nen tong the theo Stitch
                    surface: '#FFFFFF',   // Nen the Card
                    dark: '#131B2E',      // Chu tieu de Stitch on-surface
                    muted: '#64748B',     // Chu phu
                    lightBlue: '#E2E7FF', // Surface container high Stitch
                    softBlue: '#F2F3FF',  // Surface container low Stitch
                },
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
            }
        },
    },
    plugins: [],
}
