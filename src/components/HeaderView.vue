<template>
  <div class="header__base"></div>
  <header class="header">
    <div class="container">
      <div class="header__body">
        <LogoSection></LogoSection>
        <NavLinks></NavLinks>
        <CartPlaceView></CartPlaceView>

        <div class="header__burger">
          <span></span>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import CartPlaceView from "@/components/cart/CartPlaceView";
import NavLinks from "@/components/header/NavLinks";
import LogoSection from "@/components/header/LogoSection";

export default {
  name: "HeaderView",
  components: {
    CartPlaceView,
    NavLinks,
    LogoSection,
  },
};
</script>

<style scoped lang="scss"></style>
