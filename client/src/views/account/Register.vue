<script>
// import scss file.
import "../../assets/scss/account/register.scss";
import apiConnector from "../../services/apiConnector";

export default {
    name: "registerPage",
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
                    console.log(response);
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
                                    type="password"
                                    class="form-control"
                                    id="password"
                                    name="password"
                                    placeholder="parola"
                                    v-model="password"
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
                                    type="password"
                                    class="form-control"
                                    id="confirm_password"
                                    name="confirm_password"
                                    placeholder="confirmare parola"
                                    v-model="confirm_password"
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
                                    type="text"
                                    class="form-control"
                                    id="first_name"
                                    name="first_name"
                                    placeholder="prenume"
                                    v-model="first_name"
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
                                    type="text"
                                    class="form-control"
                                    id="last_name"
                                    name="last_name"
                                    placeholder="nume de familie"
                                    v-model="last_name"
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
                                    v-model="person_type"
                                    class="form-control has-value"
                                    id="person_type"
                                    name="person_type"
                                    placeholder="tip persoana"
                                >
                                    <option disabled value="">
                                        selecteaza tip persoana
                                    </option>

                                    <option
                                        v-for="option in options"
                                        :value="option.value"
                                        :key="option.value"
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
                                    type="text"
                                    class="form-control"
                                    id="cnp"
                                    name="cnp"
                                    placeholder="CNP sau cod fiscal"
                                    v-model="cnp"
                                />
                            </div>
                        </div>
                        <div class="col-lg-6 mb-3">
                            <div class="form-group">
                                <label for="nr_reg_com" class="form-label"
                                    >nr. reg. com (pt. companii)</label
                                >
                                <input
                                    type="text"
                                    class="form-control"
                                    id="nr_reg_com"
                                    name="nr_reg_com"
                                    placeholder="nr. reg. com (pt. companii)"
                                    v-model="nr_reg_com"
                                />
                            </div>
                        </div>
                        <div class="col-lg-6 mb-3">
                            <label for="email" class="form-label"> email</label>
                            <input
                                type="email"
                                class="form-control"
                                id="email"
                                name="email"
                                placeholder="email"
                                v-model="email"
                                autocomplete="email"
                            />
                        </div>
                        <div class="col-lg-6 mb-3">
                            <label for="phone" class="form-label"
                                >telefon (format: +40.xxxxxxxxx)</label
                            >
                            <input
                                type="text"
                                class="form-control"
                                id="phone"
                                name="phone"
                                placeholder="numar de telefon"
                                v-model="phone"
                            />
                        </div>
                        <div class="col-lg-6 mb-3">
                            <label for="address" class="form-label"
                                >adresa</label
                            >
                            <input
                                type="text"
                                class="form-control"
                                id="address"
                                name="address"
                                placeholder="adresa"
                                v-model="address"
                            />
                        </div>
                        <div class="col-lg-6 mb-3">
                            <label for="city" class="form-label"
                                >localitate</label
                            >
                            <input
                                type="text"
                                class="form-control"
                                id="city"
                                name="city"
                                placeholder="localitate"
                                v-model="city"
                            />
                        </div>
                        <div class="col-lg-6 mb-3">
                            <label for="county" class="form-label">judet</label>
                            <input
                                type="text"
                                class="form-control"
                                id="county"
                                name="county"
                                placeholder="judet"
                                v-model="county"
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
