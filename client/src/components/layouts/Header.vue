<template>
    <div class="upper__nav">
        <div class="upper__nav-container container flex-row">
            <div class="upper__nav-left__content">
                <div class="upper__nav-left__content-text">
                    suport tehnic 24/7 @ zero sapte services
                </div>
            </div>
            <div class="upper__nav-right__content">
                <div class="upper__nav-left__content-text">
                    <ul class="inline-list">
                        <li class="inline-list__item">cosul meu (0)</li>
                        <li class="inline-list__item">
                            <a href="/store/login">autentificare</a>
                        </li>
                        <li class="inline-list__item">
                            <a href="/store/register">cont nou</a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
    <nav class="navbar navbar-expand-lg bg-light">
        <div class="container">
            <a class="navbar-brand" href="/">zero sapte services</a>
            <button
                class="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
            >
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="nav navbar-nav w-100 justify-content-end">
                    <li class="nav-item">inregistrare</li>
                    <li class="nav-item">transfer</li>
                    <li class="nav-item">panou client</li>
                </ul>
            </div>
        </div>
    </nav>
</template>

<script>
import "../../assets/scss/layouts/header.scss";

export default {
    name: "HeaderVue",
};
</script>
