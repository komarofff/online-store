<template>
  {{ itemsInCart }}
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "CartPage",
  data() {
    return {
      itemsInCart: [],
    };
  },
  mounted() {
    this.itemsInCart = this.getCartArray;
  },
  computed: {
    ...mapGetters("Cart", ["getCartArray"]),
  },
};
</script>

<style scoped></style>
