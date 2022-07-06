<script>
import apiConnector from "@/services/apiConnector";
import "@/assets/scss/account/login.scss";

export default {
    name: "LoginPage",
    data() {
        return {
            email: "",
            password: "",
            error: "",
            message: "",
            loading: false,
        };
    },
    methods: {
        loginClient() {
            this.loading = true;
            apiConnector()
                .post("/api/client/login", {
                    email: this.email,
                    password: this.password,
                })
                .then((response) => {
                    this.loading = false;
                    // console.log(response);
                    if (response.data.loginSuccess && response.status == 200) {
                        this.error = "";
                        this.message =
                            "login successfull, you'll be redirected.";
                        window.localStorage.setItem(
                            "jwtToken",
                            response.data.token
                        );
                        window.localStorage.setItem(
                            "jwtExpiry",
                            response.data.tokenExp
                        );

                        setTimeout(() => {
                            window.location.href = "/store";
                        }, 2000);
                    } else {
                        this.message = "";
                        this.error = response.data.message;
                    }
                })
                .catch((error) => {
                    this.loading = false;
                    this.error = error.response.data.message;
                });
        },
    },
};
</script>
<template>
    <!-- login template -->
    <div class="container col-lg-4">
        <div class="login__container">
            <div class="login__container-header">
                <div class="login__container-header-title">
                    <h1 class="login__container-title">
                        autentificare in cont
                    </h1>
                </div>
            </div>
            <div class="login__container-body">
                <form @submit.prevent="loginClient">
                    <div v-if="error" class="alert alert-danger">
                        {{ error }}
                    </div>
                    <div v-else-if="message" class="alert alert-success">
                        {{ message }}
                    </div>

                    <div class="row">
                        <div class="mb-3">
                            <div class="form-group">
                                <label for="email">adresa de e-mail</label>
                                <input
                                    id="email"
                                    v-model="email"
                                    type="email"
                                    class="form-control"
                                    placeholder="adresa de e-mail"
                                />
                            </div>
                        </div>
                        <div class="mb-3">
                            <div class="form-group">
                                <label for="password">parola</label>
                                <input
                                    id="password"
                                    v-model="password"
                                    type="password"
                                    class="form-control"
                                    placeholder="new-password"
                                />
                            </div>
                        </div>
                    </div>
                    <div class="form-group pull-center">
                        <button type="submit" class="btn btn-primary">
                            autentificare
                        </button>
                    </div>
                    <div class="util__links flex-row">
                        <a href="/store/register">
                            <span class="text-primary"> nu ai cont? </span>
                        </a>
                        <a href="/store/forgot-password">
                            <span class="text-primary"> ai uitat parola? </span>
                        </a>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>
