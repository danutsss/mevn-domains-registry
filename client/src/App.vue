<script setup>
import { RouterLink, RouterView } from "vue-router";
import FooterComponentVue from "@/components/layout/FooterComponent.vue";
import HeaderComponentVue from "@/components/layout/HeaderComponent.vue";
import { useAuthStore } from "@/stores";
import { cartLength } from "@/services/helpers";
import { Menu, MenuButton, MenuItems, MenuItem } from "@headlessui/vue";
import { ChevronDownIcon } from "@heroicons/vue/solid";
import { getUserFromLocalStorage } from "@/services/helpers";

const user = getUserFromLocalStorage();
const authStore = useAuthStore();
</script>

<template>
  <HeaderComponentVue>
    <template #domain-dropdown-link>
      <RouterLink to="/" class="navbar-item">Domain Name Search</RouterLink>
      <RouterLink to="/transfer" class="navbar-item" :class="{ disabled: true }"
        >Domain Transfer</RouterLink
      >
    </template>
    <template #contact-us-link>
      <RouterLink to="/contact" class="navbar-item">Contact Us</RouterLink>
    </template>

    <template #cart-icon>
      <RouterLink to="/cart" class="flex">
        <div class="button">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6 text-blue-grey-900"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
          Cart ({{
            cartLength() > 1 ? `${cartLength()} items` : `${cartLength()} item`
          }})
        </div>
      </RouterLink>
    </template>

    <template v-if="!authStore.user" #buttons-link>
      <RouterLink
        to="/register"
        class="button bg-primary-500 text-white font-semibold"
        >Register
      </RouterLink>
      <RouterLink to="/login" class="button is-light font-medium"
        >Login</RouterLink
      >
    </template>

    <template v-else #buttons-link>
      <Menu as="div" class="relative inline-block text-left">
        <div>
          <MenuButton
            class="button inline-flex justify-center w-full font-medium leading-5 text-blue-grey-700 transition duration-150 ease-in-out bg-white border border-blue-grey-300 rounded-md hover:text-blue-grey-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-blue-grey-50 active:text-blue-grey-800"
          >
            Options
            <ChevronDownIcon
              class="ml-2 -mr-1 h-5 w-5 text-blue-grey-700 hover:text-blue-grey-500"
              aria-hidden="true"
            />
          </MenuButton>
        </div>

        <transition
          enter-active-class="transition duration-100 ease-out"
          enter-from-class="transform scale-95 opacity-0"
          enter-to-class="transform scale-100 opacity-100"
          leave-active-class="transition duration-75 ease-in"
          leave-from-class="transform scale-100 opacity-100"
          leave-to-class="transform scale-95 opacity-0"
        >
          <MenuItems
            class="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
          >
            <div className="px-4 py-3">
              <p className="text-sm leading-5">Signed in as</p>
              <p
                className="text-sm font-medium leading-5 text-blue-grey-900 truncate"
              >
                {{ user["client"]["email"] }}
              </p>
            </div>
            <div class="px-1 py-1">
              <MenuItem v-slot="{ active }">
                <RouterLink
                  to="/dashboard"
                  :class="[
                    active ? 'bg-primary-500 text-white' : 'text-blue-grey-900',
                    'group flex w-full items-center rounded-md px-2 py-2 text-sm',
                  ]"
                  >Dashboard</RouterLink
                >
              </MenuItem>
              <MenuItem v-slot="{ active }">
                <RouterLink
                  to="/dashboard/profile"
                  :class="[
                    active ? 'bg-primary-500 text-white' : 'text-blue-grey-900',
                    'group flex w-full items-center rounded-md px-2 py-2 text-sm',
                  ]"
                >
                  Account settings
                </RouterLink>
              </MenuItem>
            </div>

            <div class="px-1 py-1">
              <MenuItem v-slot="{ active }">
                <button
                  :class="[
                    active ? 'bg-primary-500 text-white' : 'text-blue-grey-900',
                    'group flex w-full items-center rounded-md px-2 py-2 text-sm',
                  ]"
                  @click="authStore.logout()"
                >
                  Logout
                </button>
              </MenuItem>
            </div>
          </MenuItems>
        </transition>
      </Menu>
    </template>
  </HeaderComponentVue>
  <RouterView />
  <FooterComponentVue />
</template>
