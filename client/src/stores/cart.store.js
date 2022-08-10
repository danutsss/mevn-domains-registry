import { defineStore } from "pinia";

export const useCartStore = defineStore({
  id: "cart",
  state: () => ({
    items: [],
    total: 0,
  }),

  actions: {
    addItem(item) {
      // push cart into local storage
      if (localStorage.getItem("cart")) {
        const cart = JSON.parse(localStorage.getItem("cart"));
        cart.items.push(item);
        cart.total += 6.99;
        localStorage.setItem(
          "cart",
          JSON.stringify({ items: cart.items, total: cart.total }),
        );
      } else {
        localStorage.setItem(
          "cart",
          JSON.stringify({ items: [item], total: 6.99 }),
        );
      }
    },

    removeItem(item) {
      this.items.splice(this.items.indexOf(item), 1);
      this.total -= 6.99;

      // remove item from local storage
      localStorage.setItem("cart", JSON.stringify(this.items));
    },

    clearCart() {
      this.items = [];
      this.total = 0;

      // remove cart from local storage
      localStorage.removeItem("cart");

      // refresh page to show empty cart
      window.location.reload();
    },

    increaseQuantity() {
      this.total += 6.99;

      // update total in localstorage
    },
  },

  destroyed() {
    localStorage.setItem("cart", JSON.stringify(this.items));
  },
});
