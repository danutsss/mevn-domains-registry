import { defineStore } from "pinia";

export const useCartStore = defineStore({
  id: "cart",
  state: () => ({
    items: [],
    total: 0,
  }),

  actions: {
    addItem(item) {
      this.items.push(item);
      this.total += item.price;

      // push cart into local storage
      localStorage.setItem("cart", JSON.stringify(this.items));
    },

    getCart() {
      return JSON.parse(localStorage.getItem("cart"));
    },

    removeItem(item) {
      this.items.splice(this.items.indexOf(item), 1);
      this.total -= item.price;

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

    updateQuantity(item, quantity) {
      item.quantity = quantity;
      this.total = this.items.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0,
      );
    },
  },

  computed: {
    total() {
      return this.items.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0,
      );
    },

    totalItems() {
      return this.items.reduce((acc, item) => acc + item.quantity, 0);
    },

    totalQuantity() {
      return this.items.reduce((acc, item) => acc + item.quantity, 0);
    },
  },

  destroyed() {
    localStorage.setItem("cart", JSON.stringify(this.items));
  },
});
