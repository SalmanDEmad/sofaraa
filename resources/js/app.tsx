import './bootstrap';
import '../css/app.css';

import { createRoot, hydrateRoot } from 'react-dom/client';
import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';

import GoldenRetriever from '@uppy/golden-retriever';
import Uppy from '@uppy/core';

const uppy = new Uppy();

uppy.use(GoldenRetriever, { serviceWorker: true });

if ('serviceWorker' in navigator) {
    navigator.serviceWorker
        .register('/sw.js') // path to your bundled service worker with GoldenRetriever service worker
        .then((registration) => {
            console.log(
                'ServiceWorker registration successful with scope: ',
                registration.scope,
            );
        })
        .catch((error) => {
            console.log(`Registration failed with ${error}`);
        });
}

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) => resolvePageComponent(`./Pages/${name}.tsx`, import.meta.glob('./Pages/**/*.tsx')),
    setup({ el, App, props }) {
        if (import.meta.env.DEV) {
            createRoot(el).render(<App {...props} />);
            return
        }

        hydrateRoot(el, <App {...props} />);
    },
    progress: {
        color: '#4B5563',
    },
});