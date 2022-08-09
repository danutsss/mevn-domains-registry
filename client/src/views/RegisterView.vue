<script setup>
import { LockClosedIcon } from "@heroicons/vue/solid";
import { onMounted, ref } from "vue";

const firstName = ref();
const lastName = ref();
const personType = ref();

onMounted(() => {
  personType.value = "NOT_SELECTED";
});
</script>

<template>
  <div
    class="relative min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 mt-10"
  >
    <div class="max-w-md w-full space-y-8">
      <div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="{3}"
          width="36"
          height="36"
          class="mx-auto h-12 w-auto text-secondary-500"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
          />
        </svg>
        <h2 class="mt-3 text-center text-3xl font-extrabold text-blue-grey-900">
          Create a new account
        </h2>
        <p class="mt-2 text-center text-sm text-gray-600">
          Or
          <a href="/login">
            <span
              class="font-medium text-secondary-500 hover:text-secondary-400"
              >login to existing account</span
            >
          </a>
        </p>
      </div>

      <form class="mt-8 space-y-6" method="POST" @submit.prevent="loginUser()">
        <input type="hidden" name="remember" value="true" />
        <div class="flex flex-row rounded-md gap-2">
          <div class="w-1/2">
            <label for="first_name" class="sr-only">First name</label>
            <input
              id="first_name"
              v-model="firstName"
              name="first_name"
              type="text"
              autocomplete="additional-name"
              class="shadow-sm appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="First name"
              required
            />
          </div>
          <div class="w-1/2">
            <label for="last_name" class="sr-only">Last name</label>
            <input
              id="last_name"
              v-model="lastName"
              name="last_name"
              type="text"
              autocomplete="family-name"
              class="shadow-sm appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Last name"
              required
            />
          </div>
        </div>

        <div class="rounded-md shadow-sm -space-y-px">
          <div class="w-full">
            <label for="person_type" class="sr-only">Person type</label>
            <select
              id="person_type"
              v-model="personType"
              name="person_type"
              placeholder="Person type"
              class="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              required
            >
              <option selected disabled value="NOT_SELECTED">
                Select person type
              </option>
              <option value="p">Private person</option>
              <option value="ap">Authorized person</option>
              <option value="nc">Non-commercial organization</option>
              <option value="c">Commercial organization</option>
              <option value="gi">Government institute</option>
              <option value="pi">Public institute</option>
              <option value="o">Other</option>
            </select>
          </div>
        </div>

        <div class="rounded-md shadow-sm -space-y-px">
          <div class="w-full">
            <label for="cnp" class="sr-only"
              >Fiscal code (for companies) or identification number (for
              individuals)</label
            >

            <input
              id="cnp"
              v-model="cnp"
              name="cnp"
              type="text"
              placeholder="Fiscal code (companies) or CNP (for individual)"
              class="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              required
            />
          </div>
        </div>

        <div class="rounded-md shadow-sm -space-y-px">
          <div class="w-full">
            <label for="nr_reg_com" class="sr-only"
              >Nr. Reg. Com (companies)</label
            >
            <input
              id="nr_reg_com"
              v-model="nr_reg_com"
              class="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              name="nr_reg_com"
              placeholder="Nr. Reg. Com. (companies)"
              type="text"
            />
          </div>
        </div>

        <div class="rounded-md shadow-sm -space-y-px">
          <div class="w-full">
            <label for="email-address" class="sr-only">Email address</label>
            <input
              id="email-address"
              v-model="email"
              name="email"
              type="email"
              autocomplete="email"
              class="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Email address"
              required
            />
          </div>
        </div>

        <div class="flex flex-row rounded-md gap-2">
          <div class="w-1/2">
            <label for="password" class="sr-only">Password</label>
            <input
              id="password"
              v-model="password"
              name="password"
              type="password"
              autocomplete="password"
              class="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Password"
              required
            />
          </div>

          <div class="w-1/2">
            <label for="confirm_password" class="sr-only"
              >Confirm password</label
            >
            <input
              id="confirm_password"
              v-model="confirm_password"
              name="confirm_password"
              type="confirm_password"
              autocomplete="confirm_password"
              class="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Confirm password"
              required
            />
          </div>
        </div>

        <div class="rounded-md shadow-sm -space-y-px">
          <div class="w-full">
            <label for="phone_number" class="sr-only">Phone number</label>
            <input
              id="phone_number"
              v-model="phone_number"
              name="phone_number"
              type="text"
              class="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Phone number (mandatory format: +40.xxxxxxxxx)"
              required
            />
          </div>
        </div>

        <div class="rounded-md shadow-sm -space-y-px">
          <div class="w-full">
            <label for="address" class="sr-only">Address</label>
            <input
              id="address"
              v-model="address"
              name="address"
              type="text"
              class="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Address"
              required
            />
          </div>
        </div>

        <div class="flex flex-row rounded-md gap-2">
          <div class="w-1/2">
            <label for="city" class="sr-only">City</label>
            <input
              id="city"
              v-model="city"
              name="city"
              type="city"
              autocomplete="city"
              class="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="City"
              required
            />
          </div>

          <div class="w-1/2">
            <label for="county" class="sr-only">County</label>
            <input
              id="county"
              v-model="county"
              name="county"
              type="county"
              autocomplete="county"
              class="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="County"
              required
            />
          </div>
        </div>

        <div>
          <p class="text-xs text-center text-gray-500">
            By registering on our website, you agree to our Terms.
          </p>
        </div>

        <div>
          <button
            type="submit"
            class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <span class="absolute left-0 inset-y-0 flex items-center pl-3">
              <LockClosedIcon
                class="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                aria-hidden="true"
              />
            </span>
            Sign up
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
