<script setup>
import { onMounted } from "vue";

onMounted(() => {
  console.log("transfer mounted.");
});
</script>
<template>
  <section class="section is-large">
    <h1 class="title">Large section - transfer</h1>
    <h2 class="subtitle">
      A simple container to divide your page into <strong>sections</strong>,
      like the one you're currently reading.
    </h2>
  </section>
</template>
