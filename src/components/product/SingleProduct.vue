<template>
  <img v-if="isLoader" src="@/assets/loader.gif" alt="loader" />

  <section class="container" v-if="getSingleProduct">
    <div class="main__home-content-product">
      <div class="home-menu-crumbs">
        <p class="crumbs-start">{{ getSingleProduct.title }}</p>
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
            :to="{ path: `/catalog/${getSingleProduct.category}` }"
            >{{ getSingleProduct.category }}</router-link
          >
          <img
            class="img-arrow"
            src="@/assets/icon/arrow-link-right.svg"
            alt=""
          />
          <p>{{ getSingleProduct.title }}</p>
        </div>
      </div>

      <div class="product">
        <img v-if="isLoader" src="@/assets/loader.gif" alt="loader" />
        <!--        <p class="product__brand">{{ getSingleProduct.brand }}</p>-->
        <p class="product__link capitalize">
          {{ getSingleProduct.brand }}
        </p>

        <div class="product__content">
          <div class="product__photo-main">
            <div class="product__photo-big">
              <img
                class="fade-innn"
                :src="bigImage"
                :alt="getSingleProduct.title"
              />
            </div>
            <div class="product__photo-small">
              <div
                class="product__photo-small-div"
                :class="{ active: isBigImage(getSingleProduct.thumbnail) }"
              >
                <img
                  @click="changeBigPhoto(getSingleProduct.thumbnail)"
                  :src="getSingleProduct.thumbnail"
                  :alt="getSingleProduct.title"
                />
              </div>
              <div
                class="product__photo-small-div"
                :class="{ active: isBigImage(image) }"
                v-for="image in getSingleProduct.images"
                :key="image"
              >
                <img
                  @click="changeBigPhoto(image)"
                  :src="image"
                  :alt="getSingleProduct.title"
                />
              </div>

              <!--              <div class="product__photo-small-false">+2</div>-->
            </div>
          </div>

          <div class="product__info">
            <p class="product__name">{{ getSingleProduct.title }}</p>
            <p class="product__description">
              {{ getSingleProduct.description }}
            </p>
            <p class="product__brand-name">
              Brand: <span>{{ getSingleProduct.brand }}</span>
            </p>
            <p class="product__category">
              Category: <span>{{ getSingleProduct.category }}</span>
            </p>
            <p class="product__rating">
              Rating:
              <span class="product__rating-score">{{
                getSingleProduct.rating
              }}</span>
            </p>
            <p class="product__stock">
              Stock: <span>{{ getSingleProduct.stock }}</span>
            </p>
            <p class="product__price">€{{ getSingleProduct.price }}</p>

            <div class="product__btn">
              <button
                class="product__button btn-pay"
                v-if="!isActive(getSingleProduct.id)"
                @click="addToCart(getSingleProduct)"
              >
                ADD TO CART
              </button>
              <button
                class="product__button btn-del"
                v-if="isActive(getSingleProduct.id)"
                @click="delCart(getSingleProduct.id)"
              >
                DROP FROM CART
              </button>
              <button
                class="product__button btn-pay"
                @click="openCheckout(getSingleProduct)"
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
  props: ["id"],
  data() {
    return {
      isLoader: false,
      bigImage: null,
    };
  },

  async mounted() {
    this.isLoader = true;
    // console.log("this.id", this.id);
    //await this.getSingleCat(this.cat);
    if (!isNaN(+this.id) && parseInt(this.id) > 0 && parseInt(this.id) < 101) {
      await this.getSingleProd(Number(this.id));
      this.bigImage = this.getSingleProduct.thumbnail;
    } else {
      this.$router.push({ name: "error" });
    }
    if (!this.getSingleProduct) {
      this.$router.push({ name: "error" });
    } else {
      this.isLoader = false;
    }
  },
  watch: {
    // getSingleProduct() {
    //
    //   return this.getSingleProduct;
    // },
  },
  computed: {
    ...mapGetters("Filter", ["getSingleProduct"]),
    ...mapGetters("Cart", ["getCartArray"]),
  },
  methods: {
    ...mapActions("Filter", ["getSingleProd"]),
    ...mapActions("Cart", ["pushToCart", "delFromCart"]),
    changeBigPhoto(src) {
      this.bigImage = src;
    },
    isBigImage(src) {
      return src === this.bigImage;
    },
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

<style lang="scss">
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
  box-shadow: 0 0 10px #cccccc4f;
}
.product__photo-small-div {
  border: 1px solid #ede7f6;
}
@keyframes fade {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
.product__content {
  max-width: unset;
}
.product__photo-big {
  transition: 0.3s ease-in-out;
  border-radius: 10px;
  max-width: 50vw;
  max-height: 30vw;
  overflow: hidden;
}
.product__photo-big {
  img {
    animation: fade 0.3s ease-in-out;
    object-fit: contain;
  }
}
.fade-innn {
  animation: fade 0.3s ease-in-out;
}
.product__photo-small-div.active {
  box-shadow: 0 0 5px rgba(255, 0, 0, 0.99);
}
.product__photo-small {
  display: flex;
  gap: 10px;
  justify-content: center;
}
.product__price {
  font-weight: 700;
  font-size: 30px;
  margin: 15px 0;
}
.product__name {
  margin: 0 auto 30px;
}
.product__info {
  padding: 0 10px;
}
@media (max-width: 992px) {
  .product__photo-small-div {
    width: 40px;
    height: 40px;
  }
  .product__button {
    width: 140px;
    height: 33px;
  }
}
@media (max-width: 768px) {
  .product__content {
    flex-wrap: wrap;
  }
  .product__photo-main {
    // width: 100%;
  }
  .product__photo-big {
    max-width: unset;
    width: 100%;
    max-height: unset;
    // box-shadow: none;
  }
  .product__btn {
    justify-content: center;
  }
  .product__photo-big img {
    object-fit: contain;
  }
}
@media (max-width: 450px) {
  .product__btn {
    justify-content: center;
    flex-direction: column;
    align-items: center;
  }
}
</style>
