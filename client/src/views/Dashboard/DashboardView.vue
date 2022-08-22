<script setup>
import apiConnector from "@/services/apiConnector";
import { getUserFromLocalStorage, updateInvoices } from "@/services/helpers";
import { onMounted, ref } from "vue";

const domains = ref("");

onMounted(() => {
  apiConnector()
    .get(`/api/domains/${getUserFromLocalStorage()["client"]["_id"]}/all`)
    .then(res => {
      for (let i = 0; i < res.data.domains.length; i++) {
        setInterval(() => {
          updateInvoices(res.data.domains[i].domainInvoiceId);
        }, 100);
      }
      apiConnector()
        .get(`/api/invoices/${getUserFromLocalStorage()["client"]["_id"]}/all`)
        .then(res => {
          console.log(res);
          for (let i = 0; i < res.data.invoices.length; i++) {
            domains.value = res.data.invoices[i].invoiceStatus;
          }
        });
    });
});
</script>

<template>
  <section class="relative">
    <div
      class="container flex flex-col-reverse lg:flex-row items-center gap-12 mt-14 lg:mt-28"
    >
      {{ domains }}
    </div>
  </section>
</template>
