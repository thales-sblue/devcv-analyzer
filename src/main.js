import { createApp } from 'vue';
import App from './App.vue';
import Home from './views/Home.vue';
import './styles/tailwind.css';

import { createRouter, createWebHistory } from 'vue-router';

const routes = [
    { path: '/', component: Home }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

createApp(App).use(router).mount('#app');
