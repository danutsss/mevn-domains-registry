<script>
// import scss file.
import "@/assets/scss/account/register.scss";
import apiConnector from "@/services/apiConnector";

export default {
    name: "RegisterPage",
    data() {
        return {
            first_name: "",
            last_name: "",
            password: "",
            confirm_password: "",
            cnp: "",
            nr_reg_com: "",
            phone: "",
            address: "",
            city: "",
            county: "",
            email: "",
            person_type: "",
            message: "",
            error: "",
            options: [
                { text: "private person", value: "p" },
                { text: "authorized person", value: "ap" },
                { text: "non-commercial organization", value: "nc" },
                { text: "commercial organization", value: "c" },
                { text: "government institute", value: "gi" },
                { text: "public institute", value: "pi" },
                { text: "other", value: "o" },
            ],
        };
    },
    methods: {
        registerClient: function () {
            let dataToSubmit = {
                first_name: this.first_name,
                last_name: this.last_name,
                password: this.password,
                confirm_password: this.confirm_password,
                cnp: this.cnp,
                nr_reg_com: this.nr_reg_com,
                phone: this.phone,
                address: this.address,
                city: this.city,
                county: this.county,
                email: this.email,
                person_type: this.person_type,
            };

            apiConnector()
                .post("/api/client/register", dataToSubmit)
                .then((response) => {
                    // console.log(response);
                    const errors = response.data.err?.errors;

                    if (errors) {
                        if (errors.first_name) {
                            this.error = errors.first_name.message;
                        } else if (errors.last_name) {
                            this.error = errors.last_name.message;
                        } else if (errors.email) {
                            this.error = errors.email.message;
                        } else if (errors.password) {
                            this.error = errors.password.message;
                        } else if (errors.address) {
                            this.error = errors.address.message;
                        } else if (errors.phone) {
                            this.error = errors.phone.message;
                        } else if (errors.city) {
                            this.error = errors.city.message;
                        } else if (errors.county) {
                            this.error = errors.county.message;
                        } else {
                            this.error = "";
                        }
                    } else {
                        this.message = "Registration successful!";
                    }
                });
        },
    },
};
</script>

<template>
    <div class="container col-lg-6 col-lg-offset-1">
        <div class="register__container">
            <div class="register__container-header">
                <div class="register__container-header-title">
                    <h1 class="register__container-title">inregistrare cont</h1>
                </div>
            </div>
            <div class="register__container-body">
                <form @submit.prevent="registerClient">
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
                                    autocomplete="new-password"
                                />
                            </div>
                        </div>
                        <div class="col-lg-6 mb-3">
                            <div class="form-group">
                                <label for="confirm_password" class="form-label"
                                    >confirmare parola</label
                                >
                                <input
                                    id="confirm_password"
                                    v-model="confirm_password"
                                    type="password"
                                    class="form-control"
                                    name="confirm_password"
                                    placeholder="confirmare parola"
                                    autocomplete="new-password"
                                />
                            </div>
                        </div>

                        <hr />

                        <div class="col-lg-6 mb-3">
                            <div class="form-group">
                                <label for="first_name" class="form-label"
                                    >prenume</label
                                >
                                <input
                                    id="first_name"
                                    v-model="first_name"
                                    type="text"
                                    class="form-control"
                                    name="first_name"
                                    placeholder="prenume"
                                    autocomplete="additional-name"
                                />
                            </div>
                        </div>
                        <div class="col-lg-6 mb-3">
                            <div class="form-group">
                                <label for="last_name" class="form-label"
                                    >nume de familie</label
                                >
                                <input
                                    id="last_name"
                                    v-model="last_name"
                                    type="text"
                                    class="form-control"
                                    name="last_name"
                                    placeholder="nume de familie"
                                    autocomplete="additional-name"
                                />
                            </div>
                        </div>
                        <div class="col-lg-6 mb-3">
                            <div class="form-group">
                                <label for="person_type" class="form-label"
                                    >tip persoana</label
                                >
                                <select
                                    id="person_type"
                                    v-model="person_type"
                                    class="form-control has-value"
                                    name="person_type"
                                    placeholder="tip persoana"
                                >
                                    <option disabled value="">
                                        selecteaza tip persoana
                                    </option>

                                    <option
                                        v-for="option in options"
                                        :key="option.value"
                                        :value="option.value"
                                    >
                                        {{ option.text }}
                                    </option>
                                </select>
                            </div>
                        </div>
                        <div class="col-lg-6 mb-3">
                            <div class="form-group">
                                <label for="cnp" class="form-label"
                                    >cod fiscal (pt. companii) sau CNP (pt.
                                    pers. fiz.)</label
                                >
                                <input
                                    id="cnp"
                                    v-model="cnp"
                                    type="text"
                                    class="form-control"
                                    name="cnp"
                                    placeholder="CNP sau cod fiscal"
                                />
                            </div>
                        </div>
                        <div class="col-lg-6 mb-3">
                            <div class="form-group">
                                <label for="nr_reg_com" class="form-label"
                                    >nr. reg. com (pt. companii)</label
                                >
                                <input
                                    id="nr_reg_com"
                                    v-model="nr_reg_com"
                                    type="text"
                                    class="form-control"
                                    name="nr_reg_com"
                                    placeholder="nr. reg. com (pt. companii)"
                                />
                            </div>
                        </div>
                        <div class="col-lg-6 mb-3">
                            <label for="email" class="form-label"> email</label>
                            <input
                                id="email"
                                v-model="email"
                                type="email"
                                class="form-control"
                                name="email"
                                placeholder="email"
                                autocomplete="email"
                            />
                        </div>
                        <div class="col-lg-6 mb-3">
                            <label for="phone" class="form-label"
                                >telefon (format: +40.xxxxxxxxx)</label
                            >
                            <input
                                id="phone"
                                v-model="phone"
                                type="text"
                                class="form-control"
                                name="phone"
                                placeholder="numar de telefon"
                            />
                        </div>
                        <div class="col-lg-6 mb-3">
                            <label for="address" class="form-label"
                                >adresa</label
                            >
                            <input
                                id="address"
                                v-model="address"
                                type="text"
                                class="form-control"
                                name="address"
                                placeholder="adresa"
                            />
                        </div>
                        <div class="col-lg-6 mb-3">
                            <label for="city" class="form-label"
                                >localitate</label
                            >
                            <input
                                id="city"
                                v-model="city"
                                type="text"
                                class="form-control"
                                name="city"
                                placeholder="localitate"
                            />
                        </div>
                        <div class="col-lg-6 mb-3">
                            <label for="county" class="form-label">judet</label>
                            <input
                                id="county"
                                v-model="county"
                                type="text"
                                class="form-control"
                                name="county"
                                placeholder="judet"
                            />
                        </div>
                    </div>
                    <div class="form-group pull-right">
                        <button type="submit" class="btn btn-primary">
                            inregistrare
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>
