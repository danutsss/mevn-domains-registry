<template>
    <div class="py-5 d-flex justify-content-center align-items-center">
        <!-- Auth-page content start -->
        <div class="overflow-hidden">
            <!-- start container -->
            <div class="container">
                <!-- start row -->
                <div class="row justify-content-center">
                    <div class="col-xl-7 col-lg-8">
                        <div class="text-center">
                            <img
                                src="@/assets/img/error400-cover.png"
                                alt="error img"
                                class="img-fluid"
                            />
                            <div class="mt-3">
                                <h3 class="text-uppercase">
                                    pagina nu a fost gasita! 😭
                                </h3>
                                <p class="text-muted mb-4">
                                    pagina pe care o cauti nu este valabila!
                                </p>
                                <a href="/store" class="btn btn-info"
                                    >inapoi la pagina principala</a
                                >
                            </div>
                        </div>
                    </div>
                    <!-- end row -->
                </div>
                <!-- end container -->
            </div>
            <!-- Auth-page content end -->
        </div>
        <!-- Auth-page wrapper end -->
    </div>
</template>

<script>
export default {
    name: "NotFound",
};
</script>
