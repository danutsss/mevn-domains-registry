<script setup>
import { RouterLink, RouterView } from "vue-router";
import FooterComponentVue from "@/components/layout/FooterComponent.vue";
import HeaderComponentVue from "@/components/layout/HeaderComponent.vue";
import { useAuthStore } from "@/stores";

const authStore = useAuthStore();
</script>

<template>
  <HeaderComponentVue>
    <template #domain-dropdown-link>
      <RouterLink to="/" class="navbar-item">Domain Name Search</RouterLink>
      <RouterLink to="/transfer" class="navbar-item"
        >Domain Transfer</RouterLink
      >
    </template>
    <template #more-dropdown-link>
      <RouterLink to="/about" class="navbar-item">About</RouterLink>
      <RouterLink to="/contact" class="navbar-item">Contact Us</RouterLink>
      <hr class="navbar-divider" />
      <RouterLink to="/report" class="navbar-item">Report a problem</RouterLink>
    </template>
    <template v-if="!authStore.user" #buttons-link>
      <RouterLink
        to="/register"
        class="button bg-primary-500 text-white font-semibold"
        >Register
      </RouterLink>
      <RouterLink to="/login" class="button is-light font-medium"
        >Login</RouterLink
      >
    </template>
    <template v-else #buttons-link>
      <RouterLink
        to="/dashboard"
        class="button bg-primary-500 text-white font-semibold"
      >
        Dashboard
      </RouterLink>

      <button class="button is-light font-semibold" @click="authStore.logout()">
        Logout
      </button>
    </template>
  </HeaderComponentVue>
  <RouterView />
  <FooterComponentVue />
</template>
