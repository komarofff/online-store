<template>
  <section class="error">
    <div class="container">
      <div class="error__content">
        <div class="error__photo">
          <img src="@/assets/img/pixar.jpg" alt="404" />
        </div>

        <div class="error__text">
          <p class="error__text-404">404</p>
          <p class="error__text-page">Page not found</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "ErrorPage",
};
</script>

<style lang="scss">
.error__content {
  padding-bottom: 10px;
}
</style>
