<template>
  <div class="container">
    <div class="cart">
      <div class="home-menu-crumbs">
        <h1 class="crumbs-start">Cart page</h1>
        <div class="crumbs-address">
          <router-link class="img-address" :to="{ name: 'home' }"
            ><img src="@/assets/icon/address-svg.svg" alt=""
          /></router-link>
          <img
            class="img-arrow"
            src="@/assets/icon/arrow-link-right.svg"
            alt=""
          />
          <span>Cart page</span>
        </div>
      </div>

      <div class="cart__content" v-if="getCartLength">
        <ItemsInCart></ItemsInCart>
        <CartPay></CartPay>
      </div>
      <h1 class="center" v-else>Cart is empty</h1>
    </div>
  </div>
  <CheckoutModalView v-if="isShowCheckoutModal"></CheckoutModalView>
</template>

<script>
import ItemsInCart from "@/components/cart/ItemsInCart";
import CartPay from "@/components/cart/CartPay";
import CheckoutModalView from "@/components/modals/CheckoutModalView";
import { mapGetters } from "vuex";
export default {
  name: "CartPage",
  data() {
    return {
      isShowCheckoutModal: false,
    };
  },
  mounted() {
    if (this.$route.query.byeNow === "true") {
      this.isShowCheckoutModal = true;
    }
    this.emitter.on("openCheckout", () => {
      this.isShowCheckoutModal = true;
    });
    this.emitter.on("closeModal", () => {
      this.isShowCheckoutModal = false;
      let queries = JSON.parse(JSON.stringify(this.$route.query));
      delete queries.byeNow;
      this.$router.replace({ query: queries });
    });
  },
  computed: {
    ...mapGetters("Cart", ["getCartArray", "getCartLength", "getCartSum"]),
  },
  components: { ItemsInCart, CartPay, CheckoutModalView },
};
</script>

<style scoped lang="scss">
.crumbs-address {
  align-items: center;
}
.center {
  text-align: center;
}
</style>
