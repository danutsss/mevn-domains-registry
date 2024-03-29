<script setup>
import apiConnector from "@/services/apiConnector";
import { ref } from "vue";
import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/vue";
import { ChevronUpIcon } from "@heroicons/vue/solid";

const fullname = ref("");
const email = ref("");
const phone = ref("");
const message = ref("");
const success = ref(false);
const successMsg = ref("");

const sendRequest = async () => {
  const response = await apiConnector().post("/api/contact", {
    fullname: fullname.value,
    email: email.value,
    message: message.value,
    phone: phone.value,
  });

  response.status === 200 ? (success.value = true) : (success.value = false);
  successMsg.value = response.data.message;
};
</script>
<template>
  <section
    class="relative py-36 bg-gradient-to-tr from-secondary-300 via-secondary-400 to-secondary-500"
  >
    <div class="container flex flex-col-reverse lg:flex-row items-center">
      <div class="text-white">
        <h1 class="mb-1 text-5xl font-semibold">Contact our team</h1>
        <p class="font-light text-sm">
          We're here to help you with any questions you may have.
        </p>
      </div>
    </div>
  </section>

  <section
    id="faq"
    class="bg-grey py-10 px-10 flex flex-col lg:flex-row items-center"
  >
    <div class="flex flex-col-reverse lg:flex-row justify-center items-center">
      <div class="text-blue-grey-900 mb-10 lg:mb-0">
        <h1 class="text-5xl font-semibold text-center">
          Frequently Asked Questions
        </h1>
      </div>
    </div>
    <div class="w-screen px-4">
      <div class="mx-auto w-full rounded-2xl bg-white p-2">
        <Disclosure v-slot="{ open }" as="div">
          <DisclosureButton
            class="transition flex w-full justify-between rounded-lg bg-secondary-100 px-4 py-2 text-left text-sm font-medium text-blue-grey-900 hover:bg-secondary-200 focus:outline-none focus-visible:ring focus-visible:ring-primary-500 focus-visible:ring-opacity-75"
          >
            <span>What domain extensions are available?</span>
            <ChevronUpIcon
              :class="open ? 'rotate-180 transform' : ''"
              class="h-5 w-5 text-secondary-500"
            />
          </DisclosureButton>
          <DisclosurePanel class="px-4 pt-4 pb-2 text-sm text-gray-500">
            The <strong>only</strong> domain extension we offer is
            <code>.ro</code>. We do not offer any other extensions.
          </DisclosurePanel>
        </Disclosure>
        <Disclosure v-slot="{ open }" as="div" class="mt-2">
          <DisclosureButton
            class="transition flex w-full justify-between rounded-lg bg-secondary-100 px-4 py-2 text-left text-sm font-medium text-blue-grey-900 hover:bg-secondary-200 focus:outline-none focus-visible:ring focus-visible:ring-primary-500 focus-visible:ring-opacity-75"
          >
            <span>What is your refund policy?</span>
            <ChevronUpIcon
              :class="open ? 'rotate-180 transform' : ''"
              class="h-5 w-5 text-secondary-500"
            />
          </DisclosureButton>
          <DisclosurePanel class="px-4 pt-4 pb-2 text-sm text-gray-500">
            If you're unhappy with your purchase for any reason, email us within
            90 days and we'll refund you in full, no questions asked.
          </DisclosurePanel>
        </Disclosure>
        <Disclosure v-slot="{ open }" as="div" class="mt-2">
          <DisclosureButton
            class="transition flex w-full justify-between rounded-lg bg-secondary-100 px-4 py-2 text-left text-sm font-medium text-blue-grey-900 hover:bg-secondary-200 focus:outline-none focus-visible:ring focus-visible:ring-primary-500 focus-visible:ring-opacity-75"
          >
            <span>How long it takes to register a domain?</span>
            <ChevronUpIcon
              :class="open ? 'rotate-180 transform' : ''"
              class="h-5 w-5 text-secondary-500"
            />
          </DisclosureButton>
          <DisclosurePanel class="px-4 pt-4 pb-2 text-sm text-gray-500">
            A domain is registered for <strong>1 year</strong> after the payment
            is received. Then it'll take <strong>1 to 2</strong> business days
            to be fully registered.
          </DisclosurePanel>
        </Disclosure>

        <Disclosure v-slot="{ open }" as="div" class="mt-2">
          <DisclosureButton
            class="transition flex w-full justify-between rounded-lg bg-secondary-100 px-4 py-2 text-left text-sm font-medium text-blue-grey-900 hover:bg-secondary-200 focus:outline-none focus-visible:ring focus-visible:ring-primary-500 focus-visible:ring-opacity-75"
          >
            <span>For what period of time can I register a domain?</span>
            <ChevronUpIcon
              :class="open ? 'rotate-180 transform' : ''"
              class="h-5 w-5 text-secondary-500"
            />
          </DisclosureButton>
          <DisclosurePanel class="px-4 pt-4 pb-2 text-sm text-gray-500">
            The minimum period of registration for a domain is
            <strong>1 year</strong>. However, we recommend our clients to
            activate or extend the web domain for several years in advance.
          </DisclosurePanel>
        </Disclosure>

        <Disclosure v-slot="{ open }" as="div" class="mt-2">
          <DisclosureButton
            class="transition flex w-full justify-between rounded-lg bg-secondary-100 px-4 py-2 text-left text-sm font-medium text-blue-grey-900 hover:bg-secondary-200 focus:outline-none focus-visible:ring focus-visible:ring-primary-500 focus-visible:ring-opacity-75"
          >
            <span>Can I change the domain name after registration?</span>
            <ChevronUpIcon
              :class="open ? 'rotate-180 transform' : ''"
              class="h-5 w-5 text-secondary-500"
            />
          </DisclosureButton>
          <DisclosurePanel class="px-4 pt-4 pb-2 text-sm text-gray-500">
            Once a domain is registered and active, you are it's owner.
            Unfortunately, the name can no longer be changed, but you can
            register a new domain name and the initial one will simply not be
            extended at the expiration date.
          </DisclosurePanel>
        </Disclosure>

        <Disclosure v-slot="{ open }" as="div" class="mt-2">
          <DisclosureButton
            class="transition flex w-full justify-between rounded-lg bg-secondary-100 px-4 py-2 text-left text-sm font-medium text-blue-grey-900 hover:bg-secondary-200 focus:outline-none focus-visible:ring focus-visible:ring-primary-500 focus-visible:ring-opacity-75"
          >
            <span>I found a problem on your website, what should I do?</span>
            <ChevronUpIcon
              :class="open ? 'rotate-180 transform' : ''"
              class="h-5 w-5 text-secondary-500"
            />
          </DisclosureButton>
          <DisclosurePanel class="px-4 pt-4 pb-2 text-sm text-gray-500">
            If you find a problem on our website, please fill the form below
            with the first paragraph of the message as:
            <strong>[BUG]</strong> and we'll get back to you as soon as
            possible. We'll do our best to fix it.
          </DisclosurePanel>
        </Disclosure>
      </div>
    </div>
  </section>

  <section id="contact-form" class="bg-white">
    <div class="flex flex-col-reverse lg:flex-row justify-center items-center">
      <div class="text-blue-grey-900 mb-10 mt-10">
        <h1 class="text-5xl font-semibold text-center mb-2">
          Submit your request
        </h1>
        <p class="text-center font-light text-sm">
          If you have any questions, please feel free to contact us.
        </p>
      </div>
    </div>
    <div class="flex justify-center items-center mb-10 lg:mb-10">
      <div class="md:grid md:grid-cols-2 w-1/3 md:gap-6">
        <div class="mt-5 md:mt-0 md:col-span-2">
          <div
            v-if="success"
            class="bg-teal-100 border-t-4 border-teal-500 rounded-b text-teal-900 px-4 py-3 shadow-md mb-4"
            role="alert"
          >
            <div class="flex">
              <div class="py-1">
                <svg
                  class="fill-current h-6 w-6 text-teal-500 mr-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path
                    d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z"
                  />
                </svg>
              </div>
              <div>
                <p class="font-bold">Informational message</p>
                <p class="text-sm">
                  {{ successMsg }}
                </p>
              </div>
            </div>
          </div>
          <form method="POST" class="bg-grey" @submit.prevent="sendRequest">
            <div class="shadow-md overflow-hidden sm:rounded-md">
              <div class="px-4 py-5 sm:p-6">
                <div class="grid grid-cols-6 gap-6">
                  <div class="col-span-6 sm:col-span-3">
                    <label
                      for="fullname"
                      class="block mb-2 text-sm font-medium text-gray-700"
                      >Full name</label
                    >
                    <input
                      id="fullname"
                      v-model="fullname"
                      required
                      type="text"
                      name="fullname"
                      autocomplete="given-name"
                      class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>

                  <div class="col-span-6 sm:col-span-3">
                    <label
                      for="email-address"
                      class="block mb-2 text-sm font-medium text-gray-700"
                      >E-mail address</label
                    >
                    <input
                      id="email-address"
                      v-model="email"
                      required
                      type="text"
                      name="email-address"
                      autocomplete="email"
                      class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>

                  <div class="col-span-6 lg:col-span-6 sm:col-span-3">
                    <label
                      for="phone-number"
                      class="block mb-2 text-sm font-medium text-gray-700"
                      >Phone number</label
                    >
                    <input
                      id="phone-number"
                      v-model="phone"
                      type="text"
                      name="phone-number"
                      autocomplete="tel"
                      class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>

                  <div class="col-span-6 lg:col-span-6 sm:col-span-3">
                    <label
                      for="message"
                      class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
                      >Your message</label
                    >
                    <textarea
                      id="message"
                      v-model="message"
                      required
                      name="message"
                      class="block resize p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Your message..."
                    ></textarea>
                  </div>
                </div>

                <p class="text-xxs mt-2 text-center">
                  A member from our support team will get back to you as soon as
                  possible.
                </p>
              </div>
              <div class="px-4 py-3 bg-white text-right sm:px-6">
                <button
                  type="submit"
                  class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Send
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>
