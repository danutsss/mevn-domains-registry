<template>
    <div>
        <div class="upper__nav">
            <div class="upper__nav-container container flex-row">
                <div class="upper__nav-left__content flex-row">
                    <div class="upper__nav-left__content-text">
                        suport tehnic 24/7 @ zero sapte services
                    </div>
                </div>
                <div v-if="isLoggedIn()" class="upper__nav-right__content">
                    <div class="upper__nav-left__content-text">
                        <ul class="inline-list">
                            <li class="inline-list__item">cosul meu (0)</li>
                            <li class="inline-list__item">
                                <a href="/store/profile">cont</a>
                            </li>
                            <li class="inline-list__item">
                                <button class="btn btn-primary" @click="logout">
                                    logout
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
                <div v-else class="upper__nav-right__content flex-row">
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
                <a class="navbar-brand" href="/store">zero sapte services</a>
                <button
                    class="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span class="navbar-toggler-icon" />
                </button>
                <div
                    id="navbarSupportedContent"
                    class="collapse navbar-collapse"
                >
                    <ul class="nav navbar-nav w-100 justify-content-end">
                        <li class="nav-item">
                            <a href="/store">inregistrare</a>
                        </li>
                        <li class="nav-item">
                            <a href="/store/transfer">transfer</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    </div>
</template>

<script>
import "@/assets/scss/layouts/header.scss";
import apiConnector, { isLoggedIn } from "@/services/apiConnector";

export default {
    name: "HeaderVue",
    methods: {
        isLoggedIn() {
            return isLoggedIn();
        },
        logout() {
            apiConnector()
                .get("/api/client/logout")
                .then((/*response*/) => {
                    // console.log(response);
                    window.localStorage.removeItem("jwtToken");
                    window.localStorage.removeItem("jwtExpiry");
                    window.location.href = "/store";
                });
        },
    },
};
</script>
