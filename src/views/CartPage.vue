<template>
  <section class="container">
    <h1>This is a cart page</h1>
    <ItemsInCart></ItemsInCart>
  </section>
</template>

<script>
import ItemsInCart from "../components/cart/ItemsInCart";
export default {
  name: "CartPage",
  components: { ItemsInCart },
};
</script>

<style scoped></style>
