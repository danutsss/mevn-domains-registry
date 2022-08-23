<script setup>
import axios from "axios";
import { ref, onMounted } from "vue";
import { useCartStore } from "@/stores";

const domain = ref();
const message = ref();

onMounted(() => {
  domain.value = "";
  message.value = "";
});

const alreadyInCart = domain => {
  const cartStore = useCartStore();
  return cartStore.getCart().some(item => item.item === domain);
};

const addIntoCart = async () => {
  const cartStore = useCartStore();

  if (alreadyInCart(domain.value)) {
    message.value = "";
    message.value = "Domain is already in cart.";
    return;
  }

  return await cartStore.addToCart(domain.value);
};

const checkDomain = async () => {
  try {
    const domainRegex = /^[-a-z0-9]+\.ro$/;
    if (!domain.value) {
      message.value = "Please enter a domain!";
    } else if (!domainRegex.test(domain.value)) {
      message.value = "You can check only `.ro` domains.";
      return;
    } else {
      await axios
        .post("http://localhost/rotld/checkDomainAvailability.php", {
          domain: domain.value,
        })
        .then(response => {
          console.log(response);
          response.data == "Available"
            ? (message.value = "Domain is available for registration.")
            : (message.value = "Domain is already registered.");
        });
    }
  } catch (e) {
    console.log(e);
  }
};
</script>
<template>
  <section class="relative">
    <div
      class="container flex flex-col-reverse lg:flex-row items-center gap-12 mt-14 lg:mt-28"
    >
      <!-- content start -->
      <div class="flex flex-1 flex-col items-center lg:items-start">
        <h2
          class="text-primary-500 font-semibold text-3xl md:text-4 lg:text-5xl text-center lg:text-left mb-6"
        >
          Your .ro domain at just
          <span class="text-blue-grey-900">6.99€</span> per year!
        </h2>
        <p class="text-blue-grey-900 text-lg text-center lg:text-left mb-6">
          We've made it so easy to purchase a custom domain address that we're
          guaranteeing your satisfaction! Registering your .ro is often the
          first step toward turning your website into your online home. And now
          you can do it for an unbeatable price.
        </p>
        <div class="flex justify-center flex-wrap gap-6">
          <form method="POST" @submit.prevent="checkDomain()">
            <div class="field has-addons">
              <div class="control">
                <input
                  v-model="domain"
                  class="input mb-4"
                  type="text"
                  placeholder="ex.: bunicutzii.ro"
                />
              </div>
              <div class="control">
                <button
                  type="submit"
                  class="button bg-primary-300 text-white font-semibold"
                >
                  Search
                </button>
              </div>
            </div>
          </form>
        </div>
        <div
          v-if="message"
          class="flex p-4 text-sm items-center text-blue-700 bg-blue-100 rounded-lg dark:bg-blue-200 dark:text-blue-800"
          role="alert"
        >
          <svg
            aria-hidden="true"
            class="inline flex-shrink-0 mr-3 w-5 h-5"
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
          {{ message }}
          <button
            v-if="message.includes('registration')"
            class="button btn-teal text-white ml-2"
            @click="addIntoCart()"
          >
            Add to cart
          </button>
        </div>
      </div>
      <!-- content end -->

      <!-- image start -->
      <div class="flex justify-center flex-1 mb-10 md:mb-16 lg:mb-0 z-10">
        <img
          class="w-5/6 h-5/6 sm:w-3/4 sm:h-3/4 md:w-full md:h-full"
          src="/src/assets/img/svgs/domain_search.svg"
          alt="Domain search"
        />
      </div>
      <!-- image end -->
    </div>

    <!-- rounded rectangle start -->
    <div
      class="hidden md:block overflow-hidden bg-secondary-100 rounded-l-full absolute h-80 w-2/4 top-32 right-0 lg: -bottom-28 lg:-right-36"
    ></div>
    <!-- rounded rectangle end -->
  </section>

  <!-- features start -->
  <section id="features" class="bg-grey py-40 mt-20 lg:mt-60">
    <!-- heading start -->
    <div class="sm:w-3/4 lg:w-5/12 mx-auto px-2">
      <h1 class="text-3xl text-center text-blue-grey-900">Features</h1>
      <p class="text-center text-blue-grey-700 mt-4">
        Our aim is to make it quick and easy for you to register your favourite
        .ro domain.
      </p>
    </div>
    <!-- heading end -->

    <!-- feature #1 start -->
    <div class="relative mt-20 lg:mt-24">
      <div
        class="container flex flex-col lg:flex-row items-center justify-center gap-x-24"
      >
        <!-- image start -->
        <div class="flex flex-1 justify-center z-10 mb-10 lg:mb-0">
          <img
            class="w-5/6 h-5/6 sm:w-3/4 sm:h-3/4 md:w-full md:h-full"
            src="/src/assets/img/svgs/user_flow.svg"
            alt="User flow"
          />
        </div>
        <!-- image end -->

        <!-- content start -->
        <div class="flex flex-1 flex-col items-center lg:items-start">
          <h1 class="text-3xl text-blue-grey-900">User-friendly interface</h1>
          <p
            class="text-blue-grey-700 my-4 text-center lg:text-left sm:w-3/4 lg:w-full"
          >
            Our team puts a lot of effort and work in order to ensure that our
            user interface is easy-to-use.
          </p>
        </div>
        <!-- content end -->
      </div>

      <!-- rounded rectangle start-->
      <div
        class="hidden lg:block overflow-hidden bg-secondary-100 rounded-r-full absolute h-80 w-2/4 -bottom-24 -left-36"
      ></div>
      <!-- rounder rectangle end -->
    </div>
    <!-- feature #1 end -->

    <!-- feature #2 start -->
    <div class="relative mt-20 lg:mt-52">
      <div
        class="container flex flex-col lg:flex-row-reverse items-center justify-center gap-x-24"
      >
        <!-- image start -->
        <div class="flex flex-1 justify-center z-10 mb-10 lg:mb-0">
          <img
            class="w-5/6 h-5/6 sm:w-3/4 sm:h-3/4 md:w-full md:h-full"
            src="/src/assets/img/svgs/affordable.svg"
            alt="Affordable price"
          />
        </div>
        <!-- image end -->

        <!-- content start -->
        <div class="flex flex-1 flex-col items-center lg:items-start">
          <h1 class="text-3xl text-blue-grey-900">Affordable</h1>
          <p
            class="text-blue-grey-700 my-4 text-center lg:text-left sm:w-3/4 lg:w-full"
          >
            With us you get detailed information about your domains and the
            price for registering is only 6.99€ per year.
          </p>
        </div>
        <!-- content end -->
      </div>

      <!-- rounded rectangle start -->
      <div
        class="hidden lg:block overflow-hidden bg-secondary-100 rounded-l-full absolute h-80 w-2/4 -bottom-24 -right-36"
      ></div>
      <!-- rounded rectangle end -->
    </div>
    <!-- feature #2 end -->

    <!-- feature #3 start -->
    <div class="relative mt-20 lg:mt-52">
      <div
        class="container flex flex-col lg:flex-row items-center justify-center gap-x-24"
      >
        <!-- image start -->
        <div class="flex flex-1 justify-center z-10 mb-10 lg:mb-0">
          <img
            class="w-5/6 h-5/6 sm:w-3/4 sm:h-3/4 md:w-full md:h-full"
            src="/src/assets/img/svgs/reliable.svg"
            alt="Reliable service"
          />
        </div>
        <!-- image end -->

        <!-- content start -->
        <div class="flex flex-1 flex-col items-center lg:items-start">
          <h1 class="text-3xl text-blue-grey-900">Reliable service</h1>
          <p
            class="text-blue-grey-700 my-4 text-center lg:text-left sm:w-3/4 lg:w-full"
          >
            Everything you need is just one click away. Standard registration,
            reservation, transfer, and more: choose the right one for you.
          </p>
        </div>
        <!-- content end -->
      </div>

      <!-- rounded rectangle start -->
      <div
        class="hidden lg:block overflow-hidden bg-secondary-100 rounded-r-full absolute h-80 w-2/4 -bottom-24 -left-36"
      ></div>
      <!-- rounded rectangle end -->
    </div>

    <!-- feature #4 start -->
    <div class="relative mt-20 lg:mt-52">
      <div
        class="container flex flex-col lg:flex-row-reverse items-center justify-center gap-x-24"
      >
        <!-- image start -->
        <div class="flex flex-1 justify-center z-10 mb-10 lg:mb-0">
          <img
            class="w-5/6 h-5/6 sm:w-3/4 sm:h-3/4 md:w-full md:h-full"
            src="/src/assets/img/svgs/security.svg"
            alt="Secured service"
          />
        </div>
        <!-- image end -->

        <!-- content start -->
        <div class="flex flex-1 flex-col items-center lg:items-start">
          <h1 class="text-3xl text-blue-grey-900">Secured</h1>
          <p
            class="text-blue-grey-700 my-4 text-center lg:text-left sm:w-3/4 lg:w-full"
          >
            Security on any level: we offer 12 months unconditional and
            hassle-free coverage - this means a hassle-free purchase and
            friendly customer experience.
          </p>
        </div>
        <!-- content end -->
      </div>

      <!-- rounded rectangle start -->
      <div
        class="hidden lg:block overflow-hidden bg-secondary-100 rounded-l-full absolute h-80 w-2/4 -bottom-24 -right-36"
      ></div>
      <!-- rounded rectangle end -->
    </div>
    <!-- feature #4 end -->
  </section>
</template>
