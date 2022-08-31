<script setup>
import { getUserFromLocalStorage } from "@/services/helpers";
</script>

<template>
  <section class="relative">
    <div
      class="container flex flex-col-reverse lg:flex-row items-center gap-12 mt-14 lg:mt-28"
    >
      {{ getUserFromLocalStorage() }}
    </div>
  </section>
</template>
