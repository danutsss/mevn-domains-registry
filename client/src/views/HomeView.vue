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
  <section class="hero is-medium">
    <div class="hero-body">
      <Particles
        id="tsparticles"
        :particles-init="particlesInit"
        :particles-loaded="particlesLoaded"
        url="./src/assets/particles.json"
      />
      <div class="main container">
        <div class="left__container">
          <h1 class="title bold">cauta domeniu</h1>
          <h2 class="subtitle">
            introduceti domeniul dorit si verificati-i disponibilitatea.
          </h2>
          <form action="" method="get">
            <div class="field has-addons">
              <div class="control">
                <input
                  class="input"
                  type="text"
                  placeholder="ex.: bunicutzii.ro"
                />
              </div>
              <div class="control">
                <a class="button is-primary">verifica</a>
              </div>
            </div>
          </form>
          <h2 class="small mt-2">
            in momentul de fata se pot inregistra numai domenii cu extensie .ro
          </h2>
        </div>
        <div class="right__container">
          <img
            src="../assets/img/svgs/domain_names.svg"
            alt="domain names"
            width="675"
          />
        </div>
      </div>
    </div>
  </section>
</template>
