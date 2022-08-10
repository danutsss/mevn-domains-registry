<script setup>
import { useCartStore } from "@/stores";
import { ref } from "vue";

const quantity = ref(1);

const cartObj = JSON.parse(localStorage.getItem("cart"));
const cartItems = cartObj ? cartObj.items : [];
// const cartTotal = cartObj ? cartObj.total : 0;

const getCartTotal = () => {
  return cartItems.reduce(acc => {
    return acc + 6.99 * quantity.value;
  }, 0);
};

const deleteCart = async () => {
  const cartStore = useCartStore();

  return await cartStore.clearCart();
};

// const increaseQuantity = async id => {
//   console.log(`increaseQuantity: ${id}`);

//   // update total
//   const cartStore = useCartStore();

//   return await cartStore.increaseQuantity(id);
// };
</script>

<template>
  <section class="relative">
    <div
      class="container flex flex-col-reverse lg:flex-row items-center gap-12 mt-14 lg:mt-28"
    >
      <div v-for="(product, index) in cartItems" :key="product.id">
        #{{ index + 1 }} - {{ product }}

        <input
          :id="product.id"
          v-model="quantity"
          type="number"
          min="1"
          max="10"
        />
      </div>
      <div>
        {{ getCartTotal().toFixed(2) }}
      </div>
    </div>
  </section>

  <button @click="deleteCart()">Delete cart</button>
</template>
