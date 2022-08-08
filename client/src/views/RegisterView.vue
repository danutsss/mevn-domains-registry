<script setup>
import { LockClosedIcon } from "@heroicons/vue/solid";
import { ref } from "vue";

const firstName = ref();
const lastName = ref();
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
            <label for="lastName" class="sr-only">Last name</label>
            <input
              id="lastName"
              v-model="lastName"
              name="lastName"
              type="text"
              autocomplete="family-name"
              class="shadow-sm appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Last name"
              required
            />
          </div>
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
