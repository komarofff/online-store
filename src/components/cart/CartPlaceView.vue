<template>
  <div class="header__cart">
    <span class="header__cart-count-sum" v-if="getCartSum"
      ><strong> €{{ getCartSum }}</strong></span
    >
    <div class="header__cart-count-item">
      <p>{{ getCartLength }}</p>
    </div>
    <router-link :to="{ name: 'cart' }">
      <svg
        class="header__cart-svg"
        width="512"
        height="512"
        viewBox="0 0 512 512"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M170 422C153.458 422 140 435.458 140 452C140 468.542 153.458 482 170 482C186.542 482 200 468.542 200 452C200 435.458 186.542 422 170 422Z"
        />
        <path
          d="M396 422C379.458 422 366 435.458 366 452C366 468.542 379.458 482 396 482C412.542 482 426 468.542 426 452C426 435.458 412.542 422 396 422Z"
        />
        <path
          d="M140 332V362H414.147L512 117.895V90H110V30H0V60H80V347C80 388.355 113.645 422 155 422H170H396H456V392H155C130.187 392 110 371.813 110 347V120H478.835L393.852 332H140Z"
        />
      </svg>
    </router-link>
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

<style scoped>
.header__cart-svg {
  width: 73px;
  height: 55px;
}
</style>
