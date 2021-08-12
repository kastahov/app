require('./bootstrap');
import {createApp, h} from 'vue';
import {createInertiaApp} from '@inertiajs/inertia-vue3';
import Notifications from '@kyvg/vue3-notification'
import {InertiaProgress} from '@inertiajs/progress';
import {init as rayInit, store} from "./Ray/server";

const appName = window.document.getElementsByTagName('title')[0]?.innerText || 'Ray server';

rayInit()

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) => require(`./Pages/${name}.vue`),
    setup({el, app, props, plugin}) {
        return createApp({render: () => h(app, props)})
            .use(plugin)
            .use(store)
            .use(Notifications)
            .mixin({methods: {route}})
            .mount(el);
    },
});

InertiaProgress.init({color: '#4B5563'});
