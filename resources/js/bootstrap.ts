import axios from 'axios';
import Echo from 'laravel-echo';
import Pusher from 'pusher-js'; // Required for Reverb

// Axios setup
window.axios = axios;
window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

declare global {
  interface Window {
    axios: typeof axios;
    Echo: Echo<any>;
    Pusher: typeof Pusher;
  }
}

// Register Pusher globally (needed by Laravel Echo)
window.Pusher = Pusher;

window.Echo = new Echo({
  broadcaster: 'reverb',
  key: import.meta.env.VITE_REVERB_APP_KEY,
  wsHost: import.meta.env.VITE_REVERB_HOST ?? window.location.hostname,
  wsPort: Number(import.meta.env.VITE_REVERB_PORT ?? 6001),
  wssPort: Number(import.meta.env.VITE_REVERB_PORT ?? 6001),
  forceTLS: (import.meta.env.VITE_REVERB_SCHEME ?? 'ws') === 'wss',
  enabledTransports: ['ws', 'wss'],
});
