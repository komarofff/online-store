<template>
  <header class="header">
    <div class="container header__nav">
      <NavLinks></NavLinks>
      <CartPlaceView></CartPlaceView>
    </div>
  </header>
</template>

<script>
import CartPlaceView from "@/components/cart/CartPlaceView";
import NavLinks from "@/components/header/NavLinks";

export default {
  name: "HeaderView",
  components: {
    CartPlaceView,
    NavLinks,
  },
};
</script>

<style scoped lang="scss">
.header {
  background-color: rgba(0, 0, 0, 0.1);
  padding-top: 10px;
  padding-bottom: 10px;
}

.header__nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
