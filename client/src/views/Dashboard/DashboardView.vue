<script setup>
import { onMounted, ref } from "vue";
import {
  TabGroup,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogPanel,
  DialogTitle,
} from "@headlessui/vue";
import apiConnector from "@/services/apiConnector";
import { getUserFromLocalStorage } from "@/services/helpers";
import easyInvoice from "easyinvoice";

const categories = ref({
  Domains: [],
  Invoices: [],
});

const isOpen = ref(false);
const modalTitle = ref("");
const modalBody = ref("");

const editDomain = entity => {
  isOpen.value = true;
  modalTitle.value = "Edit Domain";
  console.log(entity);
};

const renderInvoice = async invoiceNumber => {
  const invoice = categories.value.Invoices.find(
    invoice => invoice.invoiceNumber === invoiceNumber,
  );

  const invoiceItems = invoice.invoiceItems.map(
    ({ label, price, quantity }) => ({
      description: label,
      "tax-rate": 6,
      quantity: quantity,
      price: price,
    }),
  );

  const user = getUserFromLocalStorage();

  const data = {
    // "customize": {
    //     "template": "SGVsbG8gd29ybGQh" // Must be base64 encoded html. This example contains 'Hello World!' in base64
    // },
    images: {
      logo: "https://i.imgur.com/hbY7Avp.png",
    },
    sender: {
      company: "ZERO SAPTE SERVICES S.R.L",
      address: "B-DUL MAMAIA NORD NR. 6, CENTRUL DE AFACERI, SPATIUL 01-05",
      zip: "905700",
      city: "Navodari",
      country: "Romania",
      // "custom1": "custom value 1",
      // "custom2": "custom value 2",
      // "custom3": "custom value 3"
    },
    client: {
      company: user["client"]["last_name"] + " " + user["client"]["first_name"],
      address: user["client"]["address"],
      zip: user["client"]["zip_code"],
      city: user["client"]["city"],
      country: user["client"]["country"],
      custom1: user["client"]["nr_reg_com"],
      custom2: user["client"]["cnp"],
    },
    information: {
      number: invoiceNumber,
      date: invoice.invoiceDate,
      "due-date": invoice.invoiceDueDate,
    },
    "bottom-notice": "Kindly pay your invoice within 15 days. Thank you!",
    products: invoiceItems,
    settings: {
      currency: "EUR", // See documentation 'Locales and Currency' for more info. Leave empty for no currency.
      locale: "ro-RO", // Defaults to en-US, used for number formatting (see docs)
      taxNotation: "TVA", // Defaults to vat
      // "margin-top": 25, // Default to 25
      // "margin-right": 25, // Default to 25
      // "margin-left": 25, // Default to 25
      // "margin-bottom": 25, // Default to 25
      // "format": "Letter", // Defaults to A4,
      // "height": "1000px", // allowed units: mm, cm, in, px
      // "width": "500px", // allowed units: mm, cm, in, px
      // "orientation": "landscape", // portrait or landscape, defaults to portrait
    },
    // Used for translating the headers to your preferred language
    // Defaults to English. Below example is translated to Dutch
    // "translate": {
    //     "invoice": "FACTUUR",
    //     "number": "Nummer",
    //     "date": "Datum",
    //     "due-date": "Verloopdatum",
    //     "subtotal": "Subtotaal",
    //     "products": "Producten",
    //     "quantity": "Aantal",
    //     "price": "Prijs",
    //     "product-total": "Totaal",
    //     "total": "Totaal"
    // },
  };

  easyInvoice.createInvoice(data, result => {
    easyInvoice.download(`invoice_${invoice.invoiceNumber}.pdf`, result.pdf);
  });
};

const openModal = (id, entity) => {
  isOpen.value = true;
  modalTitle.value = entity.domainName;

  let expiresIn =
    (new Date(entity.domainExpireDate).getTime() -
      new Date(entity.domainRegisterDate).getTime()) /
    (24 * 60 * 60 * 1000);

  modalBody.value = `
      <div class="flex flex-col">
        <div class="flex flex-row justify-between">
          <div class="flex flex-col">
            <span class="text-sm font-semibold">Domain Name</span>
            <span class="text-sm font-semibold">Domain Status</span>
            <span class="text-sm font-semibold">Registration Date</span>
            <span class="text-sm font-semibold">Expiration Date</span>
            <span class="text-sm font-semibold">Expire in</span>

          </div>
          <div class="flex flex-col">
            <span class="text-sm font-semibold">${entity.domainName}</span>
            <span class="text-sm font-semibold">${entity.domainStatus}</span>
            <span class="text-sm font-semibold">${new Date(
              entity.domainRegisterDate,
            ).toLocaleDateString()}</span>
            <span class="text-sm font-semibold">${new Date(
              entity.domainExpireDate,
            ).toLocaleDateString()}</span>
            <span class="text-sm font-semibold">${expiresIn}</span>
          </div>
        </div>
      </div>
    `;
};

const closeModal = () => {
  isOpen.value = false;
};

onMounted(() => {
  let options = {
    year: "numeric",
    day: "2-digit",
    month: "2-digit",
  };

  const user = getUserFromLocalStorage();

  apiConnector()
    .get(`/api/domains/${user["client"]["_id"]}/all`)
    .then(response => {
      for (let i = 0; i < response.data.domains.length; i++) {
        const domainPeriod =
          response.data.domains[i].domainPeriod == 1
            ? "1 year"
            : response.data.domains[i].domainPeriod + " years";

        const unformattedRegDate = new Date(
          response.data.domains[i].domainRegisterDate,
        );
        const registerDate = unformattedRegDate.toLocaleDateString(
          "en-US",
          options,
        );

        const unformattedExpDate = new Date(
          response.data.domains[i].domainExpireDate,
        );
        const expireDate = unformattedExpDate.toLocaleDateString(
          "en-US",
          options,
        );

        categories.value.Domains.push({
          domainName: response.data.domains[i].domainName,
          domainPeriod: domainPeriod,
          domainPrice: response.data.domains[i].domainPrice,
          domainStatus: response.data.domains[i].domainStatus,
          domainType: response.data.domains[i].domainType,
          domainRegisterDate: registerDate,
          domainExpireDate: expireDate,
        });
      }
    });

  apiConnector()
    .get(`/api/invoices/${user["client"]["_id"]}/all`)
    .then(response => {
      for (let i = 0; i < response.data.invoices.length; i++) {
        let statusInvoice = "";

        if (response.data.invoices[i].invoiceStatus == 0) {
          statusInvoice = "draft";
        } else if (response.data.invoices[i].invoiceStatus == 1) {
          statusInvoice = "unpaid";
        } else if (response.data.invoices[i].invoiceStatus == 2) {
          statusInvoice = "partially paid";
        } else if (response.data.invoices[i].invoiceStatus == 3) {
          statusInvoice = "paid";
        } else if (response.data.invoices[i].invoiceStatus == 4) {
          statusInvoice = "void";
        } else if (response.data.invoices[i].invoiceStatus == 5) {
          statusInvoice = "processed proforma";
        }

        const today = new Date(response.data.invoices[i].invoiceDate);
        const dateInvoice = today.toLocaleDateString("en-US", options);

        const date = new Date(response.data.invoices[i].invoiceDueDate);
        const dueDateInvoice = date.toLocaleDateString("en-US", options);

        categories.value.Invoices.push({
          invoiceNumber: response.data.invoices[i].invoiceNumber,
          invoiceDate: dateInvoice,
          invoiceDueDate: dueDateInvoice,
          invoiceStatus: statusInvoice,
          invoiceTotal: response.data.invoices[i].invoiceTotal,
          invoiceItems: response.data.invoices[i].invoiceItems,
        });
      }
    });
});
</script>

<template>
  <section class="relative">
    <div class="container flex flex-col items-center mt-14 lg:mt-14">
      <div class="w-full max-w-7xl px-2 py-16 sm:px-0">
        <TabGroup>
          <TabList class="flex space-x-1 rounded-xl bg-blue-grey-900/20 p-1">
            <Tab
              v-for="category in Object.keys(categories)"
              :key="category"
              v-slot="{ selected }"
              as="template"
            >
              <button
                :class="[
                  'w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-black',
                  'ring-white ring-opacity-60 ring-offset-2 ring-offset-primary-400 focus:outline-none focus:ring-2',
                  selected
                    ? 'bg-white shadow'
                    : 'text-black hover:bg-white/[0.12] hover:text-white',
                ]"
              >
                {{ category }}
              </button>
            </Tab>
          </TabList>

          <TabPanels class="mt-2">
            <TabPanel
              v-for="(entities, idx) in Object.values(categories)"
              :key="idx"
              :class="[
                'rounded-xl bg-white p-3',
                'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
              ]"
            >
              <div
                v-if="entities.length === 0"
                class="flex flex-row text-center justify-center items-center"
              >
                No {{ Object.keys(categories)[idx].toLowerCase() }} found.
              </div>
              <ul>
                <li
                  v-for="entity in entities"
                  :key="entity.id"
                  class="relative flex flex-row justify-between rounded-md p-3 hover:bg-gray-100"
                >
                  <h3 class="text-sm font-medium leading-5">
                    <strong>{{
                      entity.domainName
                        ? entity.domainName
                        : `#${entity.invoiceNumber}`
                    }}</strong>
                  </h3>
                  <ul
                    class="mt-1 flex space-x-1 text-xs font-normal leading-4 text-gray-500"
                  >
                    <li>
                      {{ entity.domainPeriod || entity.invoiceDate }}
                    </li>
                    <li>&middot;</li>
                    <li>
                      {{
                        entity.domainRegisterDate
                          ? `${entity.domainRegisterDate} - ${entity.domainExpireDate}`
                          : entity.invoiceDate
                          ? `${entity.invoiceDate} - ${entity.invoiceDueDate}`
                          : ""
                      }}
                    </li>
                    <li>&middot;</li>
                    <li>
                      <strong>Price:</strong>
                      {{ entity.domainPrice || entity.invoiceTotal }}€
                    </li>
                    <li>&middot;</li>
                    <li>
                      <strong>Status:</strong>
                      {{ entity.domainStatus || entity.invoiceStatus }}
                    </li>
                  </ul>

                  <ul>
                    <li
                      v-if="entity.domainName"
                      class="flex flex-row justify-between gap-2"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        fill="currentColor"
                        class="bi bi-pencil-square hover:text-primary-500 ease-in-out duration-200"
                        viewBox="0 0 16 16"
                        role="img"
                        @click="editDomain(entity)"
                      >
                        <title>Edit domain</title>
                        <path
                          d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"
                        />
                        <path
                          fill-rule="evenodd"
                          d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
                        />
                      </svg>
                      <svg
                        role="img"
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        fill="currentColor"
                        class="bi bi-eye-fill hover:text-primary-500 ease-in-out duration-200"
                        viewBox="0 0 16 16"
                        @click="openModal(idx, entity)"
                      >
                        <title>View</title>
                        <path
                          d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z"
                        />
                        <path
                          d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z"
                        />
                      </svg>

                      <svg
                        role="img"
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        fill="currentColor"
                        class="bi bi-arrow-clockwise hover:text-primary-500 ease-in-out duration-200"
                        viewBox="0 0 16 16"
                      >
                        <title>Renew domain</title>
                        <path
                          fill-rule="evenodd"
                          d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2v1z"
                        />
                        <path
                          d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466z"
                        />
                      </svg>
                    </li>

                    <li
                      v-else-if="entity.invoiceNumber"
                      class="flex flex-row justify-between gap-2"
                    >
                      <svg
                        role="img"
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        fill="currentColor"
                        class="bi bi-eye-fill hover:text-primary-500 ease-in-out duration-200"
                        viewBox="0 0 16 16"
                        @click="renderInvoice(entity.invoiceNumber)"
                      >
                        <title>View & Download</title>
                        <path
                          d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z"
                        />
                        <path
                          d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z"
                        />
                      </svg>

                      <svg
                        role="img"
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        fill="currentColor"
                        class="bi bi-credit-card-fill hover:text-secondary-500 ease-in-out duration-200"
                        viewBox="0 0 16 16"
                        @click="payInvoice(entity.invoiceNumber)"
                      >
                        <title>Pay invoice</title>
                        <path
                          d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v1H0V4zm0 3v5a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7H0zm3 2h1a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1v-1a1 1 0 0 1 1-1z"
                        />
                      </svg>
                    </li>
                  </ul>
                </li>
              </ul>
            </TabPanel>
          </TabPanels>
        </TabGroup>

        <TransitionRoot appear :show="isOpen" as="template">
          <Dialog as="div" class="relative z-10" @close="closeModal">
            <TransitionChild
              as="template"
              enter="duration-300 ease-out"
              enter-from="opacity-0"
              enter-to="opacity-100"
              leave="duration-200 ease-in"
              leave-from="opacity-100"
              leave-to="opacity-0"
            >
              <div class="fixed inset-0 bg-black bg-opacity-25" />
            </TransitionChild>

            <div class="fixed inset-0 overflow-y-auto">
              <div
                class="flex min-h-full items-center justify-center p-4 text-center"
              >
                <TransitionChild
                  as="template"
                  enter="duration-300 ease-out"
                  enter-from="opacity-0 scale-95"
                  enter-to="opacity-100 scale-100"
                  leave="duration-200 ease-in"
                  leave-from="opacity-100 scale-100"
                  leave-to="opacity-0 scale-95"
                >
                  <DialogPanel
                    class="w-full max-w-2xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all"
                  >
                    <DialogTitle
                      as="h3"
                      class="text-lg font-medium leading-6 text-gray-900"
                    >
                      {{ modalTitle }}
                    </DialogTitle>

                    <!-- eslint-disable vue/no-v-html -->
                    <div class="mt-2" v-html="modalBody"></div>
                    <!-- eslint-enable -->

                    <div class="mt-4">
                      <button
                        type="button"
                        class="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-primary-500 border border-transparent rounded-md hover:bg-primary-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary-500"
                        @click="closeModal"
                      >
                        Got it, thanks!
                      </button>
                    </div>
                  </DialogPanel>
                </TransitionChild>
              </div>
            </div>
          </Dialog>
        </TransitionRoot>
      </div>
    </div>
  </section>
</template>
