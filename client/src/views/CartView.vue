<script setup>
import { useCartStore } from "@/stores";
import { useAuthStore } from "@/stores";
import { ref } from "vue";

const infoMsg = ref("");

const cartObj = JSON.parse(localStorage.getItem("cart"));
const cartItems = cartObj ?? [];

const deleteCart = async () => {
  const cartStore = useCartStore();

  return await cartStore.clearCart();
};

const removeItem = async item => {
  cartItems.splice(cartItems.indexOf(cartItems[item]), 1);
  localStorage.setItem("cart", JSON.stringify(cartItems));
  window.location.reload();
};

const increasePeriod = item => {
  if (cartItems[item].registerPeriod == 10) {
    alert("You can't increase the period anymore");
  } else {
    cartItems[item].registerPeriod++;
    localStorage.setItem("cart", JSON.stringify(cartItems));
    window.location.reload();
  }
};

const decreasePeriod = item => {
  if (cartItems[item].registerPeriod == 1) {
    alert("You can't decrease the period anymore");
  } else {
    cartItems[item].registerPeriod--;
    localStorage.setItem("cart", JSON.stringify(cartItems));
    window.location.reload();
  }
};

const getTotal = () => {
  const cartStore = useCartStore();

  return cartStore.getTotal();
};

const getDomainPrice = item => {
  return 6.99 * cartItems[item].registerPeriod;
};

const goCheckout = () => {
  const authStore = useAuthStore();

  if (authStore.user) {
    window.location.href = "/checkout";
  } else {
    infoMsg.value = "You need to be logged in to checkout.";
  }
};
</script>

<template>
  <section class="relative">
    <div class="container flex flex-col items-center mt-14 lg:mt-14">
      <div class="py-12">
        <div
          class="max-w-md mx-auto bg-gray-100 shadow-lg rounded-lg md:max-w-5xl"
        >
          <div class="md:flex">
            <div class="w-full p-4 px-5 py-5">
              <div class="md:grid md:grid-cols-2 gap-2">
                <div class="col-span-2 p-5">
                  <h1 class="text-xl font-medium">Shopping Cart</h1>

                  <div
                    v-for="(item, index) in cartItems"
                    :key="item.id"
                    class="flex justify-between items-center mt-6 pt-6"
                  >
                    <div class="flex items-center">
                      <div class="flex flex-col ml-3">
                        <span class="md:text-md font-medium">{{
                          item.item
                        }}</span>
                        <span class="text-xs font-light text-gray-400"
                          >#{{ index + 1 }} - inregistrare domeniu
                        </span>
                      </div>
                    </div>

                    <div class="flex justify-center items-center">
                      <div class="pr-8 flex gap-x-2">
                        <button
                          class="font-semibold"
                          @click="decreasePeriod(index)"
                        >
                          -
                        </button>
                        {{
                          item.registerPeriod == 1
                            ? `${item.registerPeriod} year`
                            : `${item.registerPeriod} years`
                        }}
                        <button
                          class="font-semibold"
                          @click="increasePeriod(index)"
                        >
                          +
                        </button>
                      </div>

                      <div class="pr-8">
                        <span class="text-xs font-medium"
                          >{{ getDomainPrice(index).toFixed(2) }}€</span
                        >
                      </div>
                      <div>
                        <button @click="removeItem(index)">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            class="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            stroke-width="2"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              d="M6 18L18 6M6 6l12 12"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>

                  <div
                    v-if="cartItems.length === 0"
                    class="flex items-center justify-center mt-6"
                  >
                    Your cart is empty.
                  </div>

                  <div class="flex justify-end items-center mt-6 pt-6 border-t">
                    <div class="flex justify-center items-center">
                      <span class="text-sm font-medium text-gray-400 mr-1"
                        >Subtotal:</span
                      >
                      <span class="text-lg font-bold text-gray-800">
                        {{ getTotal().toFixed(2) }}€</span
                      >
                    </div>
                  </div>
                </div>

                <a
                  type="button"
                  class="btn text-center flex justify-center items-center h-12 w-full bg-blue-500 rounded focus:outline-none text-white hover:bg-blue-600 mb-3"
                  @click="goCheckout()"
                >
                  Checkout
                </a>
                <button
                  class="btn h-12 w-full bg-red-vivid-500 rounded focus:outline-none text-white hover:bg-red-vivid-600"
                  @click="deleteCart()"
                >
                  Empty cart
                </button>
              </div>
              <div
                v-if="infoMsg"
                id="alert-border-1"
                class="flex p-4 mt-4 bg-blue-100 border-t-4 border-blue-500 dark:bg-blue-200"
                role="alert"
              >
                <svg
                  class="flex-shrink-0 w-5 h-5 text-blue-700"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                    clip-rule="evenodd"
                  ></path>
                </svg>

                <div class="ml-3 text-sm font-medium text-blue-700">
                  <strong class="text-blue-700">{{ infoMsg }}</strong>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
