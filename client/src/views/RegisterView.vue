<script setup>
import axios from "axios";
import { LockClosedIcon } from "@heroicons/vue/solid";
import { onMounted, ref } from "vue";
import apiConnector, { ucrmApiRequest } from "@/services/apiConnector";
import config from "@/config/dev";

const first_name = ref();
const last_name = ref();
const person_type = ref();
const cnp = ref();
const email = ref();
const password = ref();
const confirm_password = ref();
const nr_reg_com = ref();
const phone_number = ref();
const address = ref();
const city = ref();
const county = ref();
const zip_code = ref();
const errorMsg = ref();
const passStrengthMsg = ref();
const successMsg = ref();

onMounted(() => {
  first_name.value = "";
  last_name.value = "";
  person_type.value = "NOT_SELECTED";
  cnp.value = "";
  email.value = "";
  password.value = "";
  confirm_password.value = "";
  nr_reg_com.value = "";
  phone_number.value = "";
  address.value = "";
  city.value = "";
  county.value = "";
  zip_code.value = "";
  errorMsg.value = "";
  passStrengthMsg.value = "";
  successMsg.value = "";
});

const emptyFields = () => {
  if (
    first_name.value == "" ||
    last_name.value == "" ||
    person_type.value == "NOT_SELECTED" ||
    cnp.value == "" ||
    email.value == "" ||
    password.value == "" ||
    confirm_password.value == "" ||
    nr_reg_com.value == "" ||
    phone_number.value == "" ||
    address.value == "" ||
    city.value == "" ||
    county.value == "" ||
    zip_code.value == ""
  ) {
    return true;
  } else {
    return false;
  }
};

const passwordMatch = () => {
  if (password.value == confirm_password.value) {
    return true;
  } else {
    return false;
  }
};

const isEmail = () => {
  const emailRegex = /^\w+([\\.-]?\w+)*@\w+([\\.-]?\w+)*(\.\w{2,3})+$/;
  if (emailRegex.test(email.value)) {
    return true;
  } else {
    return false;
  }
};

const phoneNoFormat = () => {
  const numberRegex = /\+\d{2}\.\d{9}/;
  if (numberRegex.test(phone_number.value)) {
    return true;
  } else {
    return false;
  }
};

const checkPassword = () => {
  // Regular expressions (password checks).
  let passwordRegex = new Array();
  passwordRegex.push("[A-Z]"); // for uppercase alphabet.
  passwordRegex.push("[a-z]"); // for lowercase alphabet.
  passwordRegex.push("[0-9]"); // for numbers.
  passwordRegex.push("[$@$!%*#?&]"); // for special characters.

  let checksPassed = 0;
  // Validation for each regular expression.
  for (let i = 0; i < passwordRegex.length; i++) {
    if (new RegExp(passwordRegex[i]).test(password.value)) {
      checksPassed++;
    }
  }

  // Validation for the length of the password.
  if (checksPassed > 2 && password.value.length > 8) {
    checksPassed++;
  }

  // Display the status (for the moment, in the console).
  switch (checksPassed) {
    case 0:
      passStrengthMsg.value = "";
      break;
    case 1:
      passStrengthMsg.value = "Password is weak.";
      break;
    case 2:
      passStrengthMsg.value = "Password is good.";
      break;
    case 3:
      break;
    case 4:
      passStrengthMsg.value = "Password is strong.";
      break;
    case 5:
      passStrengthMsg.value = "Password is very strong.";
      break;
  }

  // Check if the password contains 3 repetitions of the same character.
  if (password.value.match(/(.)\1{2,}/)) {
    alert("Password should not have 3 repetitive characters.");
    return;
  }
};

const registerUser = async () => {
  if (emptyFields()) return (errorMsg.value = "Please fill all fields!");
  if (!passwordMatch()) return (errorMsg.value = "Passwords do not match!");
  if (!isEmail()) return (errorMsg.value = "Invalid email!");
  if (!phoneNoFormat())
    return (errorMsg.value =
      "Invalid phone number (mandatory format: +40.xxxxxxxxx!");

  let userUcrmCustomID = `07NAV${Math.floor(Math.random() * 1000000)}`;

  return await apiConnector()
    .post("api/auth/register", {
      first_name: first_name.value,
      last_name: last_name.value,
      person_type: person_type.value,
      cnp: cnp.value,
      email: email.value,
      password: password.value,
      confirm_password: confirm_password.value,
      nr_reg_com: nr_reg_com.value,
      phone: phone_number.value,
      address: address.value,
      city: city.value,
      county: county.value,
      zip_code: zip_code.value,
      userUcrmCustomID: userUcrmCustomID,
    })
    .then(response => {
      errorMsg.value = "";
      successMsg.value = response.data.message;

      // if account is created, redirect to login page
      if (successMsg.value) {
        const body = {
          userIdent: userUcrmCustomID,
          previousIsp: "",
          isLead: false,
          clientType: 1,
          companyName: "",
          companyRegistrationNumber: nr_reg_com.value ? nr_reg_com.value : "",
          companyTaxId: "",
          companyWebsite: "",
          companyContactFirstName: "",
          companyContactLastName: "",
          firstName: first_name.value,
          lastName: last_name.value,
          street1: address.value,
          street2: "",
          city: city.value,
          countryId: 205,
          zipCode: zip_code.value,
          fullAddress: address.value,
          invoiceStreet1: address.value,
          invoiceCity: city.value,
          invoiceCountryId: 205,
          invoiceZipCode: zip_code.value,
          invoiceAddressSameAsContact: false,
          sendInvoiceByPost: false,
          invoiceMaturityDays: 14,
          stopServiceDue: false,
          stopServiceDueDays: 0,
          organizationId: 1,
          username: email.value,
          avatarColor: "#FFC107",
          addressGpsLat: 45.9852129,
          addressGpsLon: 24.6859225,
          generateProformaInvoices: false,
          contacts: [
            {
              email: email.value,
              phone: phone_number.value,
              name: `${last_name.value} ${first_name.value}`,
              isBilling: false,
              isContact: false,
              types: [
                {
                  name: "General contact",
                },
              ],
            },
          ],
          attributes: [],
          password: password.value,
          addressData: {},
        };

        ucrmApiRequest(
          "POST",
          config.ucrmApiUrl + "/clients",
          JSON.stringify(body),
        ).then(response => {
          console.log(response);
          console.log("[ucrm]: client created.");

          let ucrmClientID = response.data.id;

          apiConnector()
            .patch(`api/user/${email.value}`, {
              ucrmClientID: `${ucrmClientID}`,
            })
            .then(response => console.log(response));
        });

        axios
          .post("http://localhost/rotld/createUser.php", {
            first_name: first_name.value,
            last_name: last_name.value,
            person_type: person_type.value,
            cnp: cnp.value,
            email: email.value,
            nr_reg_com: nr_reg_com.value,
            phone: phone_number.value,
            address: address.value,
            city: city.value,
            county: county.value,
            zip_code: zip_code.value,
          })
          .then(response => {
            console.log(response.data);
          })
          .catch(error => {
            console.log(error);
          });
      }

      console.log(response);
    })
    .catch(error => console.log(error));
};
</script>

<template>
  <div
    class="relative min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 mt-4"
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
        <h2 class="text-center text-3xl font-extrabold text-blue-grey-900">
          Create a new account
        </h2>
        <p class="text-center text-sm text-gray-600">
          Or
          <a href="/login">
            <span
              class="font-medium text-secondary-500 hover:text-secondary-400"
              >login to existing account</span
            >
          </a>
        </p>
      </div>

      <div
        v-if="errorMsg"
        class="bg-red-vivid-100 border-t-4 border-red-vivid-500 rounded-b text-red-vivid-900 px-4 py-3 shadow-md"
        role="alert"
      >
        <div class="flex">
          <div class="py-1">
            <svg
              class="fill-current h-6 w-6 text-red-vivid-500 mr-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path
                d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z"
              />
            </svg>
          </div>
          <div>
            <p class="font-bold">Error! Something went wrong.</p>
            <p class="text-sm">
              {{ errorMsg }}
            </p>
          </div>
        </div>
      </div>

      <div
        v-if="successMsg"
        class="bg-teal-100 border-t-4 border-teal-500 rounded-b text-teal-900 px-4 py-3 shadow-md"
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

      <form
        class="mt-8 space-y-6"
        method="POST"
        @submit.prevent="registerUser()"
      >
        <input type="hidden" name="remember" value="true" />
        <div class="flex flex-row rounded-md gap-2">
          <div class="w-1/2">
            <label for="first_name" class="sr-only">First name</label>
            <input
              id="first_name"
              v-model="first_name"
              name="first_name"
              type="text"
              autocomplete="additional-name"
              class="shadow-sm appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="First name"
            />
          </div>
          <div class="w-1/2">
            <label for="last_name" class="sr-only">Last name</label>
            <input
              id="last_name"
              v-model="last_name"
              name="last_name"
              type="text"
              autocomplete="family-name"
              class="shadow-sm appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Last name"
            />
          </div>
        </div>

        <div class="rounded-md shadow-sm -space-y-px">
          <div class="w-full">
            <label for="person_type" class="sr-only">Person type</label>
            <select
              id="person_type"
              v-model="person_type"
              name="person_type"
              placeholder="Person type"
              class="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
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
              @keyup="checkPassword()"
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
              type="password"
              autocomplete="confirm_password"
              class="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Confirm password"
            />
          </div>
        </div>

        <div
          v-if="passStrengthMsg"
          id="alert-border-1"
          class="flex p-4 mb-4 bg-blue-100 border-t-4 border-blue-500 dark:bg-blue-200"
          role="alert"
        >
          <svg
            class="flex-shrink-0 w-5 h-5 text-blue-700"
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

          <div class="ml-3 text-sm font-medium text-blue-700">
            Informational message:
            <strong class="text-blue-700">{{ passStrengthMsg }}</strong>
          </div>
          <button
            type="button"
            class="ml-auto -mx-1.5 -my-1.5 bg-blue-100 dark:bg-blue-200 text-blue-500 rounded-lg focus:ring-2 focus:ring-blue-400 p-1.5 hover:bg-blue-200 dark:hover:bg-blue-300 inline-flex h-8 w-8"
            data-dismiss-target="#alert-border-1"
            aria-label="Close"
            @click="passStrengthMsg = ''"
          >
            <span class="sr-only">Dismiss</span>
            <svg
              aria-hidden="true"
              class="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </button>
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
            />
          </div>
        </div>

        <div class="flex flex-row rounded-md gap-2">
          <div class="w-1/2">
            <label for="address" class="sr-only">Address</label>
            <input
              id="address"
              v-model="address"
              name="address"
              type="text"
              class="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Address"
            />
          </div>
          <div class="w-1/2">
            <label for="zip_code" class="sr-only">Zip code</label>
            <input
              id="zip_code"
              v-model="zip_code"
              name="zip_code"
              type="text"
              class="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Zip code"
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
