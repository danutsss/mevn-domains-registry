<script setup>
import { getUserFromLocalStorage } from "@/services/helpers";

const user = getUserFromLocalStorage().client;

const personType = () => {
  switch (user.person_type) {
    case "p":
      return "Private person";
    case "ap":
      return "Authorized person";
    case "nc":
      return "Non-commercial org.";
    case "c":
      return "Commercial org.";
    case "gi":
      return "Governmental institution";
    case "pi":
      return "Public institution";
    case "o":
      return "Other";
  }
};
</script>
<template>
  <section class="relative mt-28 mb-28">
    <div
      class="container pt-3 pb-5 flex flex-col lg:flex-row justify-start items-center"
    >
      <span class="text-5xl font-bold mr-3"
        >{{ user.last_name }} {{ user.first_name }}</span
      ><span
        class="border-secondary-500 border-2 text-secondary-500 font-bold p-3 rounded w-[150px]"
        >{{ personType() }}</span
      >
    </div>
    <div class="container flex flex-col lg:grid lg:grid-cols-3 gap-4">
      <div id="profile__container">
        <div class="bg-white p-5 shadow-lg rounded-3xl">
          <div id="profile__image">
            <img
              src="/src/assets/img/profile_picture.webp"
              class="rounded-full bg-primary-200 h-[120px] w-[120px] mx-auto"
            />
          </div>

          <div id="profile__information" class="flex flex-row justify-center">
            <span class="text-gray-500 text-2xl font-bold mt-3 mb-3">
              {{ user.email }}</span
            >
          </div>
        </div>
      </div>
      <div class="col-span-2">
        <div id="profile__information">
          <div class="bg-white p-20 shadow-lg rounded-3xl"></div>
        </div>
      </div>
    </div>
  </section>
</template>
