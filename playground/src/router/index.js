import { createRouter, createMemoryHistory } from 'vue-router';

export default createRouter({
    history: createMemoryHistory(),
    routes: [
        {
            path: '/',
            name: 'root',
            component: () => import('/src/views/root/root.vue'),
        },
    ]
});