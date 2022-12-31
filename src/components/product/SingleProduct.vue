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
            >{{ getSingleProduct.category }}
          </router-link>
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
                  v-lazy="image"
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
              <strong>Brand: </strong>
              <span class="uppercase">{{ getSingleProduct.brand }}</span>
            </p>
            <p class="product__category">
              <strong>Category: </strong>
              <span class="uppercase">{{ getSingleProduct.category }}</span>
            </p>
            <p class="product__rating">
              <strong>Rating: </strong>
              <span class="product__rating-score">{{
                getSingleProduct.rating
              }}</span>
            </p>
            <p class="product__stock">
              <strong>Stock: </strong> <span>{{ getSingleProduct.stock }}</span>
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

      <div class="swiper__box" v-if="viewedProducts.length > 0">
        <div class="swiper__box-title">
          Viewed Products
          <!--          <div class="myPrev"></div>-->
          <!--          <div class="myNext"></div>-->
          <button class="control-arrow arrow-to-left myPrev">
            <img src="@/assets/icon/arrow-link-right.svg" alt="" />
          </button>
          <button class="control-arrow myNext">
            <img src="@/assets/icon/arrow-link-right.svg" alt="" />
          </button>
        </div>
        <swiper
          :slidesPerView="1"
          :spaceBetween="10"
          :freeMode="true"
          :navigation="{ enabled: true, prevEl: '.myPrev', nextEl: '.myNext' }"
          :modules="modules"
          :breakpoints="{
            '540': {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            '768': {
              slidesPerView: 3,
              spaceBetween: 10,
            },
            '1024': {
              slidesPerView: 3,
              spaceBetween: 50,
            },
            '1280': {
              slidesPerView: 5,
              spaceBetween: 20,
            },
          }"
          class="mySwiper"
        >
          <swiper-slide v-for="product in viewedProducts" :key="product.id">
            <div class="card-item card-hover">
              <div class="card-photo">
                <router-link :to="`/product-details/${product.id}`"
                  ><img
                    class="card-img"
                    :src="product.thumbnail"
                    :alt="product.title"
                /></router-link>
              </div>
              <div class="card-info">
                <p class="card-name">
                  <span>{{ product.title }}</span>
                </p>
                <p class="card-brand">
                  Brand: <span>{{ product.brand }}</span>
                </p>
                <p class="card-category">
                  Category: <span>{{ product.category }}</span>
                </p>
                <p class="card-rating">
                  Rating: <span>{{ product.rating }}</span>
                </p>
                <p class="card-stock">
                  Stock: <span>{{ product.stock }}</span>
                </p>

                <div class="price-container">
                  <div class="price-price">
                    <span class="card-price">€{{ product.price }}</span>
                    <span class="card-discount"
                      >-{{ product.discountPercentage }}%</span
                    >
                  </div>
                </div>
                <div class="card-btn-container">
                  <div class="card-link-more">
                    <router-link :to="`/product-details/${product.id}`"
                      >More Info
                    </router-link>
                  </div>
                </div>
              </div>
            </div>
          </swiper-slide>
        </swiper>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from "swiper/vue";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/free-mode";

// import required modules
import { FreeMode, Navigation } from "swiper";

import { mapActions, mapGetters } from "vuex";
import { ProdArr } from "@/store/modules/Filter";
import { CartArr } from "@/store/modules/Cart";
import { defineComponent } from "vue";

export interface IStorageViewed {
  id: number;
}

export default defineComponent({
  props: ["id"],
  data() {
    return {
      isLoader: false as boolean,
      bigImage: "" as string,
      viewedProducts: [] as string[],
    };
  },

  async mounted() {
    window.scrollTo(0, 0);
    this.isLoader = true;
    // console.log("this.id", this.id);
    //await this.getSingleCat(this.cat);
    if (!isNaN(+this.id) && parseInt(this.id) > 0 && parseInt(this.id) < 101) {
      await this.getSingleProd(Number(this.id));
      this.bigImage = this.getSingleProduct.thumbnail;
    } else {
      this.$router.push({ name: "error", params: { pathMatch: this.id } });
    }
    if (!this.getSingleProduct) {
      this.$router.push({ name: "error", params: { pathMatch: this.id } });
    } else {
      this.isLoader = false;
    }
    this.pushToViewed();
  },
  watch: {
    async id() {
      await this.getSingleProd(Number(this.id));
      this.bigImage = this.getSingleProduct.thumbnail;
      window.scrollTo(0, 0);
      this.pushToViewed();
    },
  },
  computed: {
    ...mapGetters("Filter", ["getSingleProduct", "getAllProducts"]),
    ...mapGetters("Cart", ["getCartArray"]),
  },
  methods: {
    ...mapActions("Filter", ["getSingleProd"]),
    ...mapActions("Cart", ["pushToCart", "delFromCart"]),
    pushToViewed() {
      if (
        localStorage.getItem("viewed") &&
        JSON.parse(localStorage.getItem("viewed") || "").length
      ) {
        let fromStorage = JSON.parse(localStorage.getItem("viewed") || "");
        this.viewedProducts = this.getAllProducts.filter((el: ProdArr) => {
          if (fromStorage.find((elem: IStorageViewed) => elem.id === el.id)) {
            return el;
          }
        });
        if (
          !fromStorage.find(
            (el: IStorageViewed) => el.id === this.getSingleProduct.id
          )
        ) {
          if (fromStorage.length >= 10) {
            fromStorage.push({ id: this.getSingleProduct.id });
            fromStorage.shift();
          } else {
            fromStorage.push({ id: this.getSingleProduct.id });
          }

          localStorage.setItem("viewed", JSON.stringify(fromStorage));
        }
      } else {
        let fromStorage = [] as IStorageViewed[];
        fromStorage.unshift({ id: this.getSingleProduct.id });
        localStorage.setItem("viewed", JSON.stringify(fromStorage));
      }
    },
    changeBigPhoto(src: string) {
      this.bigImage = src;
    },
    isBigImage(src: string) {
      return src === this.bigImage;
    },
    isActive(val: number) {
      return this.getCartArray.find((product: ProdArr) => {
        return product.id === val;
      });
    },
    async addToCart(val: CartArr) {
      val.quantity = 1;
      await this.pushToCart(val);
    },
    async delCart(val: number) {
      await this.delFromCart(val);
    },
    async openCheckout(val: CartArr) {
      val.quantity = 1;
      await this.pushToCart(val);
      this.$router.push({ name: "cart", query: { byeNow: "true" } });
    },
  },
  components: {
    Swiper,
    SwiperSlide,
  },
  setup() {
    return {
      modules: [FreeMode, Navigation],
    };
  },
});
</script>

<style lang="scss">
.swiper__box {
  padding: 10px 5px;
  margin: 15px 0;
  background: #fff;
  border-radius: 15px;
  .price-container {
    justify-content: center;
  }
  .card-info {
    align-self: stretch;
    min-height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    flex-grow: 1;
  }
}

.swiper__box-title {
  background: #fff;
  padding: 5px 80px 2px;
  font-size: 18px;
  font-weight: bold;
  display: flex;
  justify-content: end;
  align-items: center;
  position: relative;
  border-bottom: 1px solid #ede7f6;
  margin-bottom: 10px;
}

.swiper {
  width: 100%;
  height: 100%;
}

.swiper-slide {
  text-align: center;
  font-size: 18px;
  background: #fff;
  border-radius: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  height: unset !important;
  min-height: 100% !important;

  .card-item {
    max-width: unset;
    width: 250px;
    min-height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
}

.swiper-slide img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.myPrev,
.myNext {
  position: absolute;
  top: 0;
  //width: 20px;
  //height: 20px;
  z-index: 10;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  //border: 1px solid #2196f3;
  transition: 0.3s linear;
  &:hover {
    background-color: rgba(33, 150, 243, 0.5);
  }
}

.myPrev {
  right: 45px;
  //background-image: url(~@/assets/icon/arrow-link-right.svg);
  //background-repeat: no-repeat;
  //transform: rotate(180deg);
  //background-position: center;
  z-index: 10;
}

.myNext {
  right: 11px;
  //background-image: url(~@/assets/icon/arrow-link-right.svg);
  //background-repeat: no-repeat;
  //background-position: center;
  z-index: 10;
}
.swiper-button-disabled {
  background-color: rgba(204, 204, 204, 0.3);
  z-index: 9;
  &:hover {
    background-color: rgba(204, 204, 204, 0.3);
  }
}
</style>
