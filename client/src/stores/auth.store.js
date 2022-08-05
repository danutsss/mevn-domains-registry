import { defineStore } from "pinia";
import router from "@/router";
import apiConnector from "@/services/apiConnector";

export const useAuthStore = defineStore({
  id: "auth",
  state: () => ({
    // initialize the state from local storage to enable user to stay logged in.
    user: JSON.parse(localStorage.getItem("user")),
    returnUrl: null,
  }),
  actions: {
    async login(email, password) {
      const user = await apiConnector().post("/api/auth/login", {
        email,
        password,
      });

      // update pinia state.
      this.user = user;

      // store user details and jwt in local storage to keep user logged in between page refreshes.
      localStorage.setItem("user", JSON.stringify(user.data));

      // redirect to previous url or default to home page.
      setTimeout(() => {
        this.returnUrl ? router.push(this.returnUrl) : router.push("/");
      }, 2000);
    },

    logout() {
      this.user = null;
      localStorage.removeItem("user");
      router.push("/login");
    },
  },
});
