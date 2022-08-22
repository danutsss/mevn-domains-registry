<script setup>
document.addEventListener("DOMContentLoaded", () => {
  // Get all "navbar-burger" elements
  const $navbarBurgers = Array.prototype.slice.call(
    document.querySelectorAll(".navbar-burger"),
    0,
  );

  // Add a click event on each of them
  $navbarBurgers.forEach(el => {
    el.addEventListener("click", () => {
      // Get the target from the "data-target" attribute
      const target = el.dataset.target;
      const $target = document.getElementById(target);

      // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
      el.classList.toggle("is-active");
      $target.classList.toggle("is-active");
    });
  });
});
</script>

<template>
  <header>
    <nav
      class="fixed top-0 left-0 right-0 navbar is-transparent border-solid border-b-1 border-border_grey"
      role="navigation"
      aria-label="main navigation"
    >
      <div class="navbar-brand">
        <div
          class="flex items-center justify-center md:justify-start gap-12 ml-4 mr-4"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="{2}"
            width="24"
            height="24"
            class="text-secondary-500"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
            />
          </svg>
          <a href="/"
            ><span class="text-blue-grey-900" style="margin-left: -40px"
              >ZERO SAPTE SERVICES</span
            ></a
          >
        </div>

        <a
          role="button"
          class="navbar-burger"
          aria-label="menu"
          aria-expanded="false"
          data-target="navbarBasicExample"
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>
      <div id="navbarBasicExample" class="navbar-menu">
        <div class="navbar-start">
          <div class="navbar-item has-dropdown is-hoverable">
            <a class="navbar-link" href="#domains-dropdown">Domains</a>

            <div class="navbar-dropdown is-boxed">
              <slot name="domain-dropdown-link"></slot>
            </div>
          </div>

          <div class="navbar-item has-dropdown is-hoverable">
            <div class="navbar-item is-boxed">
              <slot name="contact-us-link"></slot>
            </div>
          </div>
        </div>

        <div
          class="navbar-end flex items-center justify-center md:justify-center"
        >
          <slot class="mr-4" name="cart-icon"></slot>
          <div class="navbar-item">
            <div class="buttons">
              <slot name="buttons-link"></slot>
            </div>
          </div>
        </div>
      </div>
    </nav>
  </header>
</template>
