<script>
import "@/assets/scss/home.scss";

export default {
    name: "HomePage",
    data() {
        return {
            error: "",
            domain: "",
        };
    },
    methods: {
        checkDomain() {
            if (!this.domain) {
                this.error = "va rugam sa introduceti un domeniu";
                return;
            } else {
                this.error = "";
            }
        },
    },
};
</script>

<template>
    <section class="header__section ptb-100">
        <div class="container">
            <div class="row flex-row header__container">
                <div class="col-lg-6 col-12">
                    <div>
                        <h1>cauta domeniu</h1>
                        <p>
                            introduceti un nume de domeniu pentru a verifica
                            disponibilitatea acestuia; daca este liber pentru
                            inregistrare puteti continua comanda sau puteti
                            verifica un alt domeniu.
                        </p>

                        <form
                            id="domain_form"
                            method="POST"
                            @submit.prevent="checkDomain"
                        >
                            <div class="input-group">
                                <input
                                    v-model="domain"
                                    type="text"
                                    class="form-control"
                                    placeholder="introduceti un domeniu cu extensie .ro"
                                />
                                <div class="input-group-append">
                                    <button class="btn search-btn btn-primary">
                                        <i class="fas fa-search"></i>
                                        Cauta
                                    </button>
                                </div>
                            </div>
                        </form>

                        <div class="mt-3">
                            <small
                                >momentan, pot fi achizitionate doar domenii cu
                                extensia .ro.</small
                            >

                            <div v-if="error" class="alert alert-danger">
                                {{ error }}
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-lg-5 col-12">
                    <div class="header__image">
                        <img
                            src="@/assets/img/data-center.svg"
                            alt="domain-hosting"
                        />
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
