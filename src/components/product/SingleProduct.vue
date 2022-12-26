<template>
  <img v-if="isLoader" src="@/assets/loader.gif" alt="loader" />
  <section class="container" v-if="isCatHere">
    <div class="main__home-content-product">
      <div class="home-menu-crumbs">
        <p class="crumbs-start">{{ getSingleProductNew[0].title }}</p>
        <div class="crumbs-address">
          <router-link class="img-address" :to="{ name: 'home' }"
            ><img src="@/assets/icon/address-svg.svg" alt=""
          /></router-link>
          <img
            class="img-arrow"
            src="@/assets/icon/arrow-link-right.svg"
            alt=""
          />
          <router-link :to="{ name: 'categories' }">Catalog</router-link>
          <img
            class="img-arrow"
            src="@/assets/icon/arrow-link-right.svg"
            alt=""
          />
          <router-link
            class="capitalize"
            :to="{ path: `/catalog/${getSingleProductNew[0].category}` }"
            >{{ getSingleProductNew[0].category }}</router-link
          >
          <img
            class="img-arrow"
            src="@/assets/icon/arrow-link-right.svg"
            alt=""
          />
          <p>{{ getSingleProductNew[0].title }}</p>
        </div>
      </div>

      <div class="product">
        <img v-if="isLoader" src="@/assets/loader.gif" alt="loader" />
        <!--        <p class="product__brand">{{ getSingleProductNew[0].brand }}</p>-->
        <p class="product__link capitalize">
          {{ getSingleProductNew[0].brand }}
        </p>

        <div class="product__content">
          <div class="product__photo-main">
            <div class="product__photo-big">
              <img
                :src="getSingleProductNew[0].thumbnail"
                :alt="getSingleProductNew[0].title"
              />
            </div>
            <div class="product__photo-small">
              <div
                class="product__photo-small-div"
                v-for="image in getSingleProductNew[0].images"
                :key="image"
              >
                <img :src="image" :alt="getSingleProductNew[0].title" />
              </div>

              <div class="product__photo-small-false">+2</div>
            </div>
          </div>

          <div class="product__info">
            <p class="product__name">{{ getSingleProductNew[0].title }}</p>
            <p class="product__description">
              {{ getSingleProductNew[0].description }}
            </p>
            <p class="product__brand-name">
              Brand: <span>{{ getSingleProductNew[0].brand }}</span>
            </p>
            <p class="product__category">
              Category: <span>{{ getSingleProductNew[0].category }}</span>
            </p>
            <p class="product__rating">
              Rating:
              <span class="product__rating-score">{{
                getSingleProductNew[0].rating
              }}</span>
            </p>
            <p class="product__stock">
              Stock: <span>{{ getSingleProductNew[0].stock }}</span>
            </p>
            <p class="product__price">€{{ getSingleProductNew[0].price }}</p>

            <div class="product__btn">
              <button
                class="product__button btn-pay"
                v-if="!isActive(getSingleProductNew[0].id)"
                @click="addToCart(getSingleProductNew[0])"
              >
                ADD TO CART
              </button>
              <button
                class="product__button btn-del"
                v-if="isActive(getSingleProductNew[0].id)"
                @click="delCart(getSingleProductNew[0].id)"
              >
                DROP FROM CART
              </button>
              <button
                class="product__button btn-pay"
                @click="openCheckout(getSingleProductNew[0])"
              >
                BUY NOW
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  props: ["cat", "id"],
  data() {
    return {
      isLoader: false,
      isCatHere: false,
    };
  },

  async mounted() {
    this.isLoader = true;
    await this.getSingleCat(this.cat);
    if (this.id && typeof this.id === "string") {
      await this.getSingleProdNew(this.id.replace(/_/g, " "));
    } else {
      this.$router.push({ name: "error" });
    }
    if (!this.getSingleProductNew[0]) {
      this.$router.push({ name: "error" });
    } else {
      this.isLoader = false;

      this.isCatHere = this.getSingleCategory.every((el) => {
        return el.category === this.getSingleProductNew[0].category;
      });
      if (
        this.getSingleProductNew[0].category !== this.cat ||
        this.isCatHere === false
      ) {
        this.$router.push({ name: "error" });
      }
    }
  },
  watch: {},
  computed: {
    ...mapGetters("Filter", ["getSingleCategory", "getSingleProductNew"]),
    ...mapGetters("Cart", ["getCartArray"]),
  },
  methods: {
    ...mapActions("Filter", ["getSingleCat", "getSingleProdNew"]),
    ...mapActions("Cart", ["pushToCart", "delFromCart"]),

    isActive(val) {
      return this.getCartArray.find((product) => {
        return product.id === val;
      });
    },
    async addToCart(val) {
      val.quantity = 1;
      await this.pushToCart(val);
    },
    async delCart(val) {
      await this.delFromCart(val);
    },
    async openCheckout(val) {
      val.quantity = 1;
      await this.pushToCart(val);
      this.$router.push({ name: "cart", query: { byeNow: "true" } });
    },
  },
};
</script>

<style scoped lang="scss">
.home-menu-crumbs {
  align-items: center;
}
.crumbs-address {
  display: flex;
  justify-content: flex-end;
  gap: 15px;
  align-items: center;
}
.capitalize {
  text-transform: lowercase;
}
.capitalize:first-letter {
  text-transform: uppercase;
}
.product__photo-big {
  filter: drop-shadow(0 0 10px #ccc);
}
.product__photo-small-div {
  border: 1px solid #ede7f6;
}
</style>
