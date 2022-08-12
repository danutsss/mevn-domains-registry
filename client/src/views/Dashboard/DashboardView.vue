<script setup>
const getUserFromLocalStorage = () => {
  const user = localStorage.getItem("user");
  const parsedUser = JSON.parse(user);
  return parsedUser;
};
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
