import Echo from 'laravel-echo';
import Pusher from 'pusher-js';
window.Pusher = Pusher;

const isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';

window.Echo = new Echo({
    broadcaster: 'reverb',
    key: import.meta.env.VITE_REVERB_APP_KEY,
    wsHost: import.meta.env.VITE_REVERB_HOST || (isLocalhost ? 'localhost' : window.location.hostname),
    wsPort: isLocalhost ? 6001 : 80,
    wssPort: isLocalhost ? 6001 : 443,
    forceTLS: !isLocalhost,
    enabledTransports: ['ws', 'wss'],
});