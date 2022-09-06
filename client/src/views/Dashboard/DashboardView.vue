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

const categories = ref({
  Domains: [],
  Invoices: [],
});

const isOpen = ref(false);
const modalTitle = ref("");
const modalBody = ref();

const openModal = (id, entity) => {
  isOpen.value = true;
  let invoicePeriod =
    (new Date(entity.invoiceDueDate).getTime() -
      new Date(entity.invoiceDate).getTime()) /
    (24 * 60 * 60 * 1000);

  let expiresIn =
    (new Date(entity.domainExpireDate).getTime() -
      new Date(entity.domainRegisterDate).getTime()) /
    (24 * 60 * 60 * 1000);

  modalTitle.value = entity.domainName ?? `#${entity.invoiceNumber}`;

  if (modalTitle.value === `#${entity.invoiceNumber}`) {
    modalBody.value = `
      <div class="flex flex-col">
        <div class="flex flex-row justify-between">
          <div class="flex flex-col">
            <span class="text-sm font-semibold">Invoice Number</span>
            <span class="text-sm font-semibold">Invoice Date</span>
            <span class="text-sm font-semibold">Invoice Due Date</span>
            <span class="text-sm font-semibold">Invoice Period</span>
            <span class="text-sm font-semibold">Invoice Amount</span>
            <span class="text-sm font-semibold">Invoice Status</span>
          </div>
          <div class="flex flex-col">
            <span class="text-sm font-semibold">#${entity.invoiceNumber}</span>
            <span class="text-sm font-semibold">${new Date(
              entity.invoiceDate,
            ).toLocaleDateString()}</span>
            <span class="text-sm font-semibold">${new Date(
              entity.invoiceDueDate,
            ).toLocaleDateString()}</span>
            <span class="text-sm font-semibold">${invoicePeriod} days</span>
            <span class="text-sm font-semibold">${entity.invoiceTotal}€</span>
            <span class="text-sm font-semibold">${entity.invoiceStatus}</span>
          </div>
        </div>
      </div>
    `;
  } else if (modalTitle.value === entity.domainName) {
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
  }
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
              <ul>
                <li
                  v-for="entity in entities"
                  :key="entity.id"
                  class="relative rounded-md p-3 hover:bg-gray-100"
                  @click="openModal(idx, entity)"
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
                    <div class="mt-2" v-html="modalBody"></div>
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
