import '../css/app.css';
import './bootstrap';

import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createRoot } from 'react-dom/client';
import { library } from '@fortawesome/fontawesome-svg-core';
import { 
  faFolder, 
  faArrowRight, 
  faClock, 
  faCommentAlt 
} from '@fortawesome/free-solid-svg-icons';
import { faClock as farClock, faCommentAlt as farCommentAlt } from '@fortawesome/free-regular-svg-icons';
import { Fancybox } from "@fancyapps/ui";
import "@fancyapps/ui/dist/fancybox/fancybox.css";
import 'react-quill/dist/quill.snow.css'
import 'prismjs/themes/prism-okaidia.css'
import './chat';
// Initialisation optionnelle (peut aussi se faire au niveau des composants)
Fancybox.bind("[data-fancybox]", {
  // Options de configuration ici
});
library.add(faFolder, faArrowRight, faClock, farClock, farCommentAlt);
const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) =>
        resolvePageComponent(
            `./Pages/${name}.jsx`,
            import.meta.glob('./Pages/**/*.jsx'),
        ),
    setup({ el, App, props }) {
        const root = createRoot(el);

        root.render(<App {...props} />);
    },
    progress: {
        color: '#4B5563',
    },
});
