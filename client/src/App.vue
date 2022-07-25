<script setup>
import { RouterLink, RouterView } from "vue-router";
import FooterComponentVue from "@/components/layout/FooterComponent.vue";
import HeaderComponentVue from "@/components/layout/HeaderComponent.vue";
</script>

<template>
  <HeaderComponentVue>
    <template #link>
      <RouterLink to="/" class="navbar-item">inregistreaza</RouterLink>
      <RouterLink to="/transfer" class="navbar-item">transfer</RouterLink>
    </template>
    <template #dropdown-link>
      <RouterLink to="/about" class="navbar-item">despre</RouterLink>
      <RouterLink to="/contact" class="navbar-item">contact</RouterLink>
      <hr class="navbar-divider" />
      <RouterLink to="/report" class="navbar-item"
        >raporteaza o problema</RouterLink
      >
    </template>
    <template #buttons-link>
      <RouterLink to="/register" class="button is-primary">
        <strong>inregistreaza</strong>
      </RouterLink>
      <RouterLink to="/login" class="button is-light">logare</RouterLink>
    </template>
  </HeaderComponentVue>
  <RouterView />
  <FooterComponentVue />
</template>
