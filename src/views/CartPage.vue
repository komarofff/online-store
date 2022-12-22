<template>
  <div class="container">
    <div class="cart">
      <div class="home-menu-crumbs">
        <h1 class="crumbs-start">Cart page</h1>
        <div class="crumbs-address">
          <a class="img-address" href="/"
            ><img src="@/assets/icon/address-svg.svg" alt=""
          /></a>
          <img
            class="img-arrow"
            src="@/assets/icon/arrow-link-right.svg"
            alt=""
          />
          <span>Cart page</span>
        </div>
      </div>

      <div class="cart__content">
        <ItemsInCart></ItemsInCart>
        <div class="cart__pay">
          <p class="card__pay-title">Shopping Cart</p>
          <p class="card__pay-score">
            Items: <span>{{ getCartLength }}</span>
          </p>
          <p class="card__pay-sum">
            Total Sum: <span>€{{ getCartSum }}</span>
          </p>
          <input
            class="card__pay-input"
            type="text"
            placeholder="Enter promo code"
          />
          <p class="card__pay-promo">Promo for test: 'RS', 'EPM'</p>
          <button class="card__pay-btn">BUY NOW</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ItemsInCart from "../components/cart/ItemsInCart";
import { mapGetters } from "vuex";
export default {
  name: "CartPage",
  computed: {
    ...mapGetters("Cart", ["getCartArray", "getCartLength", "getCartSum"]),
  },
  components: { ItemsInCart },
};
</script>

<style scoped lang="scss">
.crumbs-address {
  align-items: center;
}
</style>
