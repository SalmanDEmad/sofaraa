import { AxiosStatic } from 'axios'; // <-- fix this
import { route as ziggyRoute } from 'ziggy-js';

declare global {
    interface Window {
        axios: AxiosStatic; // <-- fix this
    }

    var route: typeof ziggyRoute;
}