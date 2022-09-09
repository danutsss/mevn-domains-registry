import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "@/stores/auth.store";

export const authGuard = (to, from, next) => {
  const loggedIn = useAuthStore().user;

  if (!loggedIn) return next("/login");

  next();
};

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("@/views/HomeView.vue"),
    },
    {
      path: "/transfer",
      name: "transfer",
      component: () => import("@/views/TransferView.vue"),
    },
    {
      path: "/contact",
      name: "contact",
      component: () => import("@/views/ContactView.vue"),
    },
    {
      path: "/login",
      name: "login",
      component: () => import("@/views/LoginView.vue"),
    },
    {
      path: "/register",
      name: "register",
      component: () => import("@/views/RegisterView.vue"),
    },
    {
      path: "/dashboard",
      name: "dashboard",
      component: () => import("@/views/Dashboard/DashboardView.vue"),
      beforeEnter: authGuard,
    },
    {
      path: "/cart",
      name: "shopping-cart",
      component: () => import("@/views/CartView.vue"),
    },
    {
      path: "/dashboard/profile",
      name: "profile",
      component: () => import("@/views/Dashboard/Account/ProfileView.vue"),
      beforeEnter: authGuard,
    },
  ],
});

export default router;
