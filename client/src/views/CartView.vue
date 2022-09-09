<script setup>
import { useCartStore } from "@/stores";
import { useAuthStore } from "@/stores";
import { ref } from "vue";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  TransitionChild,
  TransitionRoot,
} from "@headlessui/vue";
import { CheckCircleIcon } from "@heroicons/vue/outline";
import { getUserFromLocalStorage } from "@/services/helpers";
import apiConnector, { ucrmApiRequest } from "@/services/apiConnector";
import config from "@/config/dev";
import axios from "axios";

const open = ref(false);
const authStore = useAuthStore();
const infoMsg = ref("");

const cartObj = JSON.parse(localStorage.getItem("cart"));
const cartItems = cartObj ?? [];

const deleteCart = async () => {
  const cartStore = useCartStore();

  if (cartStore.cart.length === 0) {
    infoMsg.value = "Your cart is already empty!";
    return;
  }

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

const getRegisterPeriod = item => {
  return cartItems[item].registerPeriod;
};

const getTotal = () => {
  const cartStore = useCartStore();

  return cartStore.getTotal();
};

const getDomainPrice = item => {
  return 6.99 * cartItems[item].registerPeriod;
};

const createInvoice = async () => {
  let invoiceBody = {};
  let invoiceItems = [];

  for (let i = 0; i < cartItems.length; i++) {
    invoiceItems.push({
      label: `${cartItems[i].item} - inregistrare domeniu`,
      quantity: getRegisterPeriod(i),
      price: 6.99,
      unit: "",
    });
  }

  console.log(invoiceItems);

  invoiceBody = {
    number: `${Math.floor(Math.random() * 1000000)}`,
    items: invoiceItems,
    maturityDays: 14,
    notes: "Cantitatea se refera la perioada de inregistrare.",
    discount: 0,
    discountLabel: "",
    adminNotes: "",
    invoiceTemplateId: 1,
    proformaInvoiceTemplateId: 1,
    organizationName: "07INTERNET",
    organizationRegistrationNumber: "RN123456",
    organizationTaxId: "TI123456",
    organizationStreet1: "2580 Orchard Parkway",
    organizationStreet2: "Suite G",
    organizationCity: "San Jose",
    organizationCountryId: 205,
    organizationZipCode: "905700",
    organizationBankAccountName: "Primary",
    organizationBankAccountField1: "12345",
    organizationBankAccountField2: "6789",
    clientFirstName: `${getUserFromLocalStorage()["client"]["first_name"]}`,
    clientLastName: `${getUserFromLocalStorage()["client"]["last_name"]}`,
    clientCompanyName: "",
    clientCompanyRegistrationNumber: `${
      getUserFromLocalStorage()["client"]["nr_reg_com"]
    }`,
    clientCompanyTaxId: `${getUserFromLocalStorage()["client"]["cnp"]}`,
    clientStreet1: `${getUserFromLocalStorage()["client"]["address"]}`,
    clientStreet2: "",
    clientCity: `${getUserFromLocalStorage()["client"]["city"]}`,
    clientCountryId: 205,
    clientZipCode: `${getUserFromLocalStorage()["client"]["zip_code"]}`,
    proforma: false,
    attributes: [],
    applyCredit: false,
    draft: false,
  };

  return await ucrmApiRequest(
    "POST",
    `${config.ucrmApiUrl}/clients/${
      getUserFromLocalStorage()["client"]["ucrmClientID"]
    }/invoices`,
    invoiceBody,
  )
    .then(responseInvoice => {
      if (responseInvoice.status === 201) {
        apiConnector().post("api/invoices/create", {
          invoiceNumber: responseInvoice.data.number,
          clientId: getUserFromLocalStorage()["client"]["_id"],
          invoiceClientId: getUserFromLocalStorage()["client"]["ucrmClientID"],
          invoiceDate: responseInvoice.data.createdDate,
          invoiceDueDate: responseInvoice.data.dueDate,
          invoiceEmailSentDate: responseInvoice.data.emailSentDate,
          invoiceStatus: responseInvoice.data.status,
          invoiceTotal: responseInvoice.data.total,
          invoiceItems: invoiceItems,
        });

        for (let i = 0; i < invoiceItems.length; i++) {
          axios
            .post("http://localhost/rotld/createUser.php", {
              first_name: getUserFromLocalStorage()["client"]["first_name"],
              last_name: getUserFromLocalStorage()["client"]["last_name"],
              person_type: getUserFromLocalStorage()["client"]["person_type"],
              cnp: getUserFromLocalStorage()["client"]["cnp"],
              email: getUserFromLocalStorage()["client"]["email"],
              nr_reg_com: getUserFromLocalStorage()["client"]["nr_reg_com"],
              phone: getUserFromLocalStorage()["client"]["phone"],
              address: getUserFromLocalStorage()["client"]["address"],
              city: getUserFromLocalStorage()["client"]["city"],
              county: getUserFromLocalStorage()["client"]["county"],
              zip_code: getUserFromLocalStorage()["client"]["zip_code"],
            })
            .then(responseRegistrant => {
              axios
                .post("http://localhost/rotld/registerDomain.php", {
                  domain: cartItems[i].item,
                  domain_period: getRegisterPeriod(i),
                  c_registrant: responseRegistrant.data,
                })
                .then(() => {
                  const date = new Date().toLocaleString("ro-RO", {
                    timeZone: "Europe/Bucharest",
                  });
                  const expireDate = new Date(
                    new Date().setFullYear(
                      new Date().getFullYear() + getRegisterPeriod(i),
                    ),
                  ).toLocaleString("ro-RO", { timeZone: "Europe/Bucharest" });

                  return apiConnector()
                    .post("api/domains/create", {
                      clientId: getUserFromLocalStorage()["client"]["_id"],
                      domainName: cartItems[i].item,
                      domainPeriod: getRegisterPeriod(i),
                      domainRegistrant: responseRegistrant.data,
                      domainRegisterDate: date,
                      domainExpireDate: expireDate,
                      domainPrice: getDomainPrice(i),
                      domainStatus: "reserved",
                      domainInvoiceId: responseInvoice.data.number,
                    })
                    .then(response => console.log(response))
                    .catch(error => console.log(error));
                })
                .catch(error => console.log(error));
            })
            .catch(error => {
              console.log(error);
            });
        }

        ucrmApiRequest(
          "PATCH",
          `${config.ucrmApiUrl}/invoices/${responseInvoice.data.id}/send`,
        )
          .then(response => console.log(response))
          .catch(error => console.log(error));
      }
    })
    .catch(error => console.log(error));
};
</script>

<template>
  <section class="relative">
    <div class="container flex flex-col items-center mt-14 lg:mt-14">
      <div class="py-12">
        <div
          class="bg-white md:flex shadow-lg rounded-lg max-w-md mx-auto md:max-w-5xl"
        >
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
                      <span class="text-xs font-light text-gray-900"
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
                      <button
                        aria-label="Remove item"
                        @click="removeItem(index)"
                      >
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
                    <span class="text-sm font-medium text-blue-grey-600 mr-1"
                      >Subtotal:</span
                    >
                    <span class="text-lg font-bold text-blue-grey-800">
                      {{ getTotal().toFixed(2) }}€</span
                    >
                  </div>
                </div>
              </div>

              <button
                type="button"
                aria-label="Checkout"
                class="btn text-center flex justify-center items-center h-12 w-full bg-primary-500 rounded focus:outline-none text-white hover:bg-primary-600 mb-3"
                :disabled="cartItems.length === 0"
                @click="
                  if (authStore.user) {
                    open = true;
                    createInvoice();
                  } else {
                    infoMsg = 'You need to be logged in to checkout';
                    open = false;
                  }
                "
              >
                Checkout
              </button>
              <button
                aria-label="Empty cart"
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
  </section>

  <TransitionRoot as="template" :show="open">
    <Dialog as="div" class="relative z-10" @close="open = false">
      <TransitionChild
        as="template"
        enter="ease-out duration-300"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="ease-in duration-200"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div
          class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
        />
      </TransitionChild>

      <div class="fixed z-10 inset-0 overflow-y-auto">
        <div
          class="flex items-end sm:items-center justify-center min-h-full p-4 text-center sm:p-0"
        >
          <TransitionChild
            as="template"
            enter="ease-out duration-300"
            enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enter-to="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leave-from="opacity-100 translate-y-0 sm:scale-100"
            leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <DialogPanel
              class="relative bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-lg sm:w-full"
            >
              <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div class="sm:flex sm:items-start">
                  <div
                    class="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-secondary-100 sm:mx-0 sm:h-10 sm:w-10"
                  >
                    <CheckCircleIcon
                      class="h-6 w-6 text-secondary-600"
                      aria-hidden="true"
                    />
                  </div>
                  <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <DialogTitle
                      as="h3"
                      class="text-lg leading-6 font-medium text-gray-900"
                    >
                      Your domain has been reserved!
                    </DialogTitle>
                    <div class="mt-2">
                      <p class="text-sm text-gray-500">
                        An e-mail with the invoice has been sent to your e-mail:
                        <strong>{{
                          getUserFromLocalStorage()["client"]["email"]
                        }}</strong>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div
                class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse"
              >
                <button
                  type="button"
                  class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-secondary-600 text-base font-medium text-white hover:bg-secondary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:secondary-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                  @click="
                    open = false;
                    deleteCart();
                  "
                >
                  Proceed
                </button>
                <button
                  ref="cancelButtonRef"
                  type="button"
                  class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  @click="
                    open = false;
                    deleteCart();
                  "
                >
                  Close
                </button>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>
