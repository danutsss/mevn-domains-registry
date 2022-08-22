<script setup>
import { RouterLink, RouterView } from "vue-router";
import FooterComponentVue from "@/components/layout/FooterComponent.vue";
import HeaderComponentVue from "@/components/layout/HeaderComponent.vue";
import { useAuthStore } from "@/stores";
import { cartLength } from "@/services/helpers";

const authStore = useAuthStore();
</script>

<template>
  <HeaderComponentVue>
    <template #domain-dropdown-link>
      <RouterLink to="/" class="navbar-item">Domain Name Search</RouterLink>
      <RouterLink to="/transfer" class="navbar-item" :class="{ disabled: true }"
        >Domain Transfer</RouterLink
      >
    </template>
    <template #contact-us-link>
      <RouterLink to="/contact" class="navbar-item">Contact Us</RouterLink>
    </template>

    <template #cart-icon>
      <RouterLink to="/cart" class="flex">
        <div class="button">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6 text-blue-grey-900"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
          Cart ({{
            cartLength() > 1 ? `${cartLength()} items` : `${cartLength()} item`
          }})
        </div>
      </RouterLink>
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
