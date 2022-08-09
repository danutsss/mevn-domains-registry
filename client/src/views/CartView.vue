<script setup>
import { useCartStore } from "@/stores";

const getCart = () => {
  const cartStore = useCartStore();

  return cartStore.getCart();
};

const deleteCart = async () => {
  const cartStore = useCartStore();

  return await cartStore.clearCart();
};
</script>

<template>
  <section class="relative">
    <div
      class="container flex flex-col-reverse lg:flex-row items-center gap-12 mt-14 lg:mt-28"
    >
      {{ getCart() }}
    </div>
  </section>

  <button @click="deleteCart()">Delete cart</button>
</template>
