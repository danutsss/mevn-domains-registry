import { defineStore } from "pinia";

export const useCartStore = defineStore({
  id: "cart",
  state: () => ({
    cart: JSON.parse(localStorage.getItem("cart")) || [],
  }),
  actions: {
    addToCart(item) {
      if (localStorage.getItem("cart")) {
        const cart = JSON.parse(localStorage.getItem("cart"));
        cart.push({ item, registerPeriod: 1 });
        localStorage.setItem("cart", JSON.stringify(cart));
      } else {
        localStorage.setItem(
          "cart",
          JSON.stringify([{ item, registerPeriod: 1 }]),
        );
      }
    },

    getTotal() {
      let total = 0;
      this.cart.forEach(item => {
        total += 6.99 * item.registerPeriod;
      });
      return total;
    },

    getCart() {
      return this.cart;
    },

    clearCart() {
      this.cart = [];

      // remove cart from local storage
      localStorage.removeItem("cart");

      // refresh page to show empty cart
      window.location.reload();
    },
  },
});
