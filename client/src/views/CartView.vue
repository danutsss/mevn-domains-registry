<script setup>
import { useCartStore } from "@/stores";
import { ref } from "vue";
import helpers from "@/services/helpers";

const cardName = ref();
const expireMonth = ref("MM");
const expireYear = ref("YY");
const cardNumber = ref("");

const cartObj = JSON.parse(localStorage.getItem("cart"));
const cartItems = cartObj ?? [];

const deleteCart = async () => {
  const cartStore = useCartStore();

  return await cartStore.clearCart();
};

const checkCardNumber = () => {
  if (cardNumber.value.length >= 19) return true;

  return false;
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
</script>

<template>
  <section class="relative">
    <div class="container flex flex-col-reverse items-center mt-14 lg:mt-14">
      <div class="py-12">
        <div
          class="max-w-md mx-auto bg-gray-100 shadow-lg rounded-lg md:max-w-5xl"
        >
          <div class="md:flex">
            <div class="w-full p-4 px-5 py-5">
              <div class="md:grid md:grid-cols-3 gap-2">
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
                          >#{{ index + 1 }} - inregistrare domeniu .ro</span
                        >
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
                <div class="p-5 bg-gray-800 rounded overflow-visible">
                  <span class="text-xl font-medium text-gray-100 block pb-3"
                    >Card Details</span
                  >

                  <span class="text-xs text-gray-400">Card Type</span>

                  <div
                    class="overflow-visible flex justify-between items-center mt-2"
                  >
                    <div
                      class="rounded w-52 h-28 bg-gray-500 py-2 px-4 relative right-10"
                    >
                      <span
                        class="italic text-lg font-medium text-gray-200 underline"
                        >VISA</span
                      >

                      <div class="flex justify-between items-center pt-4">
                        <span class="text-xs text-gray-200 font-medium">
                          {{ helpers.addPadding(cardNumber, 4) }}</span
                        >
                      </div>

                      <div class="flex justify-between items-center mt-3">
                        <span class="text-xs text-gray-200">{{
                          cardName
                        }}</span>
                        <span class="text-xs text-gray-200">{{
                          expireMonth + "/" + expireYear
                        }}</span>
                      </div>
                    </div>

                    <div class="flex justify-center items-center flex-col">
                      <img
                        src="https://img.icons8.com/color/96/000000/mastercard-logo.png"
                        width="40"
                        class="relative right-5"
                      />
                      <span
                        class="text-xs font-medium text-gray-200 bottom-2 relative right-5"
                        >mastercard.</span
                      >
                    </div>
                  </div>

                  <form>
                    <div class="flex justify-center flex-col pt-3">
                      <label class="text-xs text-gray-400">Name on Card</label>
                      <input
                        v-model="cardName"
                        type="text"
                        class="focus:outline-none w-full h-6 bg-gray-800 text-white placeholder-gray-300 text-sm border-b border-gray-600 py-4"
                        placeholder="John Doe"
                      />
                    </div>

                    <div class="flex justify-center flex-col pt-3">
                      <label class="text-xs text-gray-400">Card Number</label>
                      <input
                        v-model="cardNumber"
                        type="text"
                        class="focus:outline-none w-full h-6 bg-gray-800 text-white placeholder-gray-300 text-sm border-b border-gray-600 py-4"
                        placeholder="**** **** **** ****"
                        :disabled="checkCardNumber()"
                        @keyup="checkCardNumber()"
                      />
                    </div>

                    <div class="grid grid-cols-3 gap-2 pt-2 mb-3">
                      <div class="col-span-2">
                        <label class="text-xs text-gray-400"
                          >Expiration Date</label
                        >
                        <div class="grid grid-cols-2 gap-2">
                          <input
                            v-model="expireMonth"
                            type="text"
                            class="focus:outline-none w-full h-6 bg-gray-800 text-white placeholder-gray-300 text-sm border-b border-gray-600 py-4"
                            placeholder="mm"
                          />
                          <input
                            v-model="expireYear"
                            type="text"
                            class="focus:outline-none w-full h-6 bg-gray-800 text-white placeholder-gray-300 text-sm border-b border-gray-600 py-4"
                            placeholder="yyyy"
                          />
                        </div>
                      </div>

                      <div class="">
                        <label class="text-xs text-gray-400">CVV</label>
                        <input
                          type="text"
                          class="focus:outline-none w-full h-6 bg-gray-800 text-white placeholder-gray-300 text-sm border-b border-gray-600 py-4"
                          placeholder="XXX"
                        />
                      </div>
                    </div>

                    <a
                      type="button"
                      class="btn text-center flex justify-center items-center h-12 w-full bg-blue-500 rounded focus:outline-none text-white hover:bg-blue-600 mb-3"
                      href="/check"
                    >
                      Checkout
                    </a>
                  </form>
                  <button
                    class="btn h-12 w-full bg-red-vivid-500 rounded focus:outline-none text-white hover:bg-red-vivid-600"
                    @click="deleteCart()"
                  >
                    Empty cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
