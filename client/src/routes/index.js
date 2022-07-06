import { createRouter, createWebHistory } from "vue-router";
import Home from "@/views/Home.vue";
import Register from "@/views/account/Register.vue";
import Login from "@/views/account/Login.vue";
import { isLoggedIn } from "@/services/apiConnector";

const routes = [
    {
        path: "/store",
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
    {
        path: "/store/login",
        name: "login",
        component: Login,
        meta: {
            authRequired: false,
            title: "Autentificare @ 07INTERNET",
        },
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach(async (to, from, next) => {
    if (to.meta.authRequired) {
        if (await isLoggedIn()) {
            next();
        } else {
            next({ name: "login" });
        }
    } else {
        next();
    }

    if (
        isLoggedIn() &&
        to.path === "/store/login" &&
        to.path === "/store/register"
    ) {
        return router.push("/store");
    }
});

export default router;
