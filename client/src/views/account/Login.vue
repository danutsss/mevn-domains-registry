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
                    console.log(response);
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
    <div class="container col-lg-6 col-lg-offset-1">
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
                        <div class="col-lg-6 mb-3">
                            <input
                                hidden
                                name="username"
                                autocomplete="off"
                                readonly="readonly"
                            />
                            <div class="form-group">
                                <label for="email" class="form-label"
                                    >adresa de e-mail</label
                                >
                                <input
                                    id="email"
                                    v-model="email"
                                    type="email"
                                    class="form-control"
                                    name="email"
                                    placeholder="adresa de e-mail"
                                    autocomplete="email"
                                />
                            </div>

                            <div class="form-group">
                                <label for="password" class="form-label"
                                    >parola</label
                                >
                                <input
                                    id="password"
                                    v-model="password"
                                    type="password"
                                    class="form-control"
                                    name="password"
                                    placeholder="parola"
                                    autocomplete="current-password"
                                />
                            </div>
                        </div>
                    </div>
                    <div class="form-group pull-right">
                        <button type="submit" class="btn btn-primary">
                            autentificare
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>
