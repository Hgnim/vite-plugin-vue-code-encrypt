import { createRouter, createMemoryHistory } from 'vue-router';

export default createRouter({
    history: createMemoryHistory(),
    routes: [
        {
            path: '/',
            name: 'root',
            component: () => import('/src/views/viewLoader.vue'),
        },
    ]
});