<template>
  <img v-if="isLoader" src="@/assets/loader.gif" alt="loader" />
  <section class="container" v-if="isCatHere">
    <div class="main__home-content-product">
      <div class="home-menu-crumbs">
        <p class="crumbs-start">{{ getSingleProduct[0].title }}</p>
        <div class="crumbs-address">
          <a class="img-address" href=""
            ><img src="@/assets/icon/address-svg.svg" alt=""
          /></a>
          <a href="">Catalog</a>
          <img
            class="img-arrow"
            src="@/assets/icon/arrow-link-right.svg"
            alt=""
          />
          <a href="">{{ getSingleProduct[0].category }}</a>
          <img
            class="img-arrow"
            src="@/assets/icon/arrow-link-right.svg"
            alt=""
          />
          <a href="">{{ getSingleProduct[0].title }}</a>
        </div>
      </div>

      <div class="product">
        <img v-if="isLoader" src="@/assets/loader.gif" alt="loader" />
        <p class="product__brand">{{ getSingleProduct[0].brand }}</p>
        <p class="product__link">
          Shop <img src="@/assets/icon/arrow-link-right.svg" alt="" />
        </p>

        <div class="product__content">
          <div class="product__photo-main">
            <div class="product__photo-big">
              <img
                :src="getSingleProduct[0].thumbnail"
                :alt="getSingleProduct[0].title"
              />
            </div>
            <div class="product__photo-small">
              <div
                class="product__photo-small-div"
                v-for="image in getSingleProduct[0].images"
                :key="image"
              >
                <img :src="image" :alt="getSingleProduct[0].title" />
              </div>

              <div class="product__photo-small-false">+2</div>
            </div>
          </div>

          <div class="product__info">
            <p class="product__name">{{ getSingleProduct[0].title }}</p>
            <p class="product__description">
              {{ getSingleProduct[0].description }}
            </p>
            <p class="product__brand-name">
              Brand: <span>{{ getSingleProduct[0].brand }}</span>
            </p>
            <p class="product__category">
              Category: <span>{{ getSingleProduct[0].category }}</span>
            </p>
            <p class="product__rating">
              Rating:
              <span class="product__rating-score">{{
                getSingleProduct[0].rating
              }}</span>
            </p>
            <p class="product__stock">
              Stock: <span>{{ getSingleProduct[0].stock }}</span>
            </p>
            <p class="product__price">€{{ getSingleProduct[0].price }}</p>

            <div class="product__btn">
              <button
                class="product__button btn-pay"
                v-if="!isActive(getSingleProduct[0].id)"
                @click="addToCart(getSingleProduct[0])"
              >
                ADD TO CART
              </button>
              <button
                class="product__button btn-del"
                v-if="isActive(getSingleProduct[0].id)"
                @click="delCart(getSingleProduct[0].id)"
              >
                DROP FROM CART
              </button>
              <button
                class="product__button btn-pay"
                @click="openCheckout(getSingleProduct[0])"
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
    console.log(!isNaN(+this.id), parseInt(this.id));
    if (!isNaN(+this.id) && parseInt(this.id) > 0 && parseInt(this.id) < 100) {
      await this.getSingleProd(Number(this.id));
    } else {
      console.log("error-1");
      this.$router.push({ name: "error" });
    }

    this.isLoader = false;

    // if (
    //   this.id === 0 ||
    //   this.getSingleCategory.products.some((el) => el.id === this.id) === false
    // ) {
    //   console.log("false id");
    //   this.$router.push({ name: "error" });
    // }

    this.isCatHere = this.getSingleCategory.every((el) => {
      return el.category === this.getSingleProduct[0].category;
    });
    if (
      this.getSingleProduct[0].category !== this.cat ||
      this.isCatHere === false
    ) {
      // this.$router.push({ name: "error" });
    }

    //return this.$router.push({ name: "error" });
  },
  watch: {},
  computed: {
    ...mapGetters("Filter", ["getSingleCategory", "getSingleProduct"]),
    ...mapGetters("Cart", ["getCartArray"]),
  },
  methods: {
    ...mapActions("Filter", ["getSingleCat", "getSingleProd"]),
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

<style scoped></style>
