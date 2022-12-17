<template>
  <SingleProduct :id="id"></SingleProduct>
</template>

<script>
import SingleProduct from "../components/product/SingleProduct";

export default {
  name: "ProductPage",
  props: ["id"],
  components: { SingleProduct },
};
</script>

<style scoped></style>
