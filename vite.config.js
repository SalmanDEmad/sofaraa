import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [
        laravel({
            input: 'resources/js/app.tsx',
            ssr: 'resources/js/ssr.tsx',
            refresh: true,
        }),
        react(),
    ],
    // Add this to override Vite's default favicon
    server: {
        fs: {
            allow: ['..']
        }
    },
    // This helps with public assets
    publicDir: 'public',
});