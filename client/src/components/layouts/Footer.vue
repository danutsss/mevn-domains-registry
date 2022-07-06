<template>
    <footer
        class="d-flex flex-wrap justify-content-between align-items-center py-3 mb-3 mt-4 border-top"
    >
        <div class="col-md-4 d-flex align-items-center">
            <a
                href="/store"
                class="mb-3 me-2 mb-md-0 text-muted text-decoration-none lh-1"
            >
                <svg class="bi" width="30" height="24">
                    <use xlink:href="#bootstrap" />
                </svg>
            </a>
            <span class="mb-3 mb-md-0 text-muted"
                >© 2022 zero sapte services, inc.</span
            >
        </div>
    </footer>
</template>

<script>
import "@/assets/scss/layouts/footer.scss";
export default {
    name: "FooterVue",
};
</script>
