<script setup>
import { RouterLink, RouterView } from "vue-router";
import FooterComponentVue from "@/components/layout/FooterComponent.vue";
import HeaderComponentVue from "@/components/layout/HeaderComponent.vue";
import { loadFull } from "tsparticles";

const particlesInit = async engine => {
  await loadFull(engine);
};

const particlesLoaded = async container => {
  console.log("Particles container loaded", container);
};
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
    <template #buttons-link>
      <RouterLink to="/register" class="button bg-primary-500">
        <strong class="text-white font-semibold">Register</strong>
      </RouterLink>
      <RouterLink to="/login" class="button is-light font-medium"
        >Log in</RouterLink
      >
    </template>
  </HeaderComponentVue>
  <Particles
    id="tsparticles"
    :particles-init="particlesInit"
    :particles-loaded="particlesLoaded"
    url="./src/assets/particles.json"
  />
  <RouterView />
  <FooterComponentVue />
</template>
