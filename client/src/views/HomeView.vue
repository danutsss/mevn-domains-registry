<script setup>
import { onMounted } from "vue";
import { loadFull } from "tsparticles";

const particlesInit = async engine => {
  await loadFull(engine);
};

const particlesLoaded = async container => {
  console.log("Particles container loaded", container);
};

onMounted(() => {
  console.log("homeview mounted.");
});
</script>
<template>
  <section class="particles">
    <Particles
      id="tsparticles"
      :particles-init="particlesInit"
      :particles-loaded="particlesLoaded"
      url="./src/assets/particles.json"
    />
  </section>
</template>
