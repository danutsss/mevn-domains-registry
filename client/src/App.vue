<template>
    <div>
        <Header />
        <router-view />
        <Footer />
    </div>
</template>

<script>
// import header and footer.
import Header from "@/components/layouts/Header.vue";
import Footer from "@/components/layouts/Footer.vue";

export default {
    name: "App",
    components: {
        Header,
        Footer,
    },
};
</script>

<style>
body {
    font-family: "Sora", sans-serif !important;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-size: 16px;
    background-color: #f4f4f4 !important;
}
</style>
