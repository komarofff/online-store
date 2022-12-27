<template>
  <div class="header__base"></div>
  <header class="header">
    <div class="container">
      <div class="header__body">
        <NavLinks></NavLinks>
        <CartPlaceView></CartPlaceView>

        <div class="header__burger">
          <span></span>
        </div>
      </div>
    </div>
  </header>
</template>

<script lang="ts">
import CartPlaceView from "@/components/cart/CartPlaceView.vue";
import NavLinks from "@/components/header/NavLinks.vue";

export default {
  name: "HeaderView",
  components: {
    CartPlaceView,
    NavLinks,
  },
};
</script>

<style scoped lang="scss"></style>
