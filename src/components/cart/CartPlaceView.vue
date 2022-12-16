<template>
  <strong>Items in card - {{ cartAmount }}</strong>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "CartPlaceView",
  data() {
    return {
      cartAmount: 0,
      idInCart: [],
    };
  },

  computed: {
    ...mapGetters("Cart", ["getCartLength"]),
  },
  mounted() {
    this.cartAmount = this.getCartLength;
    this.emitter.on("addToCart", () => {
      this.cartAmount = this.getCartLength;
    });
    this.emitter.on("delFromCart", () => {
      this.cartAmount = this.getCartLength;
    });
  },
};
</script>

<style scoped></style>
