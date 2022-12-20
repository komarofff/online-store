<template>
  <div>
    <strong>Total: ${{ getCartSum }} </strong> |
    <strong> Items in cart - {{ getCartLength }}</strong>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "CartPlaceView",
  data() {
    return {};
  },

  computed: {
    ...mapGetters("Cart", ["getCartLength", "getCartSum"]),
  },
};
</script>

<style scoped></style>
