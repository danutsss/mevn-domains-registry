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
  <section class="relative mt-14 lg:mt-28">
    <div class="container pt-3 pb-5 d-flex justify-start align-items-center">
      <span class="display-4 fw-bold me-3"
        >{{ user.last_name }} {{ user.first_name }}</span
      ><span
        class="border-success border-2 text-success fw-bold px-3 py-2 rounded"
        >{{ personType() }}</span
      >
    </div>
    <div class="container grid grid-cols-3 gap-4">
      <div id="profile__container">
        <div class="bg-white p-5 shadow-lg rounded-3xl">
          <div id="profile__image">
            <img
              src="/src/assets/img/profile_picture.webp"
              class="rounded-full bg-primary-200 h-[120px] w-[120px] mx-auto"
            />
          </div>
          <div id="profile__name" class="mt-4">
            <h1 class="text-2xl text-center mb-2 font-semibold text-gray-700">
              {{ user.first_name }}
            </h1>
            <h2 class="text-xl font-semibold text-gray-500">
              {{ user.email }}
            </h2>
          </div>
        </div>
      </div>
      <div class="col-span-2">
        <div id="profile__information">
          <div
            class="bg-primary-500 p-20 border-1 border-black shadow-lg rounded-lg"
          ></div>
        </div>
      </div>
    </div>
  </section>
</template>
