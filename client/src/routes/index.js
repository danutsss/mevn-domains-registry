import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Register from "../views/account/Register.vue";

const routes = [
    {
        path: "/",
        name: "home",
        component: Home,
        meta: {
            authRequired: false,
            title: "Prima pagina @ 07INTERNET",
        },
    },
    {
        path: "/store/register",
        name: "register",
        component: Register,
        meta: {
            authRequired: false,
            title: "Inregistrare cont nou @ 07INTERNET",
        },
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
