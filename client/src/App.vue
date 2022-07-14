<template>
    <div>
        <Header />
        <router-view />
    </div>
</template>

<script>
// import header and footer.
import Header from "@/components/layouts/Header.vue";

export default {
    name: "App",
    components: {
        Header,
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
    position: relative;
    min-height: 100%;
    min-height: 100vh;
}
</style>
