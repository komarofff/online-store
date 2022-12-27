<template>
  <img v-if="isLoader" src="@/assets/loader.gif" alt="loader" />
  <!--  <BreadCrumbs></BreadCrumbs>-->
  <div class="home-menu-crumbs">
    <p class="crumbs-start">{{ pageName.toUpperCase() }}</p>
    <div class="crumbs-address">
      <router-link class="img-address" :to="{ name: 'home' }"
        ><img src="@/assets/icon/address-svg.svg" alt=""
      /></router-link>
      <img class="img-arrow" src="@/assets/icon/arrow-link-right.svg" alt="" />
      <router-link :to="{ name: 'categories' }">Catalog</router-link>
      <img class="img-arrow" src="@/assets/icon/arrow-link-right.svg" alt="" />
      <p>{{ pageName.toUpperCase() }}</p>
    </div>
  </div>
  <div class="home-cards">
    <div class="card-container">
      <template v-for="product in catProducts" :key="product.id">
        <div
          class="card-item card-hover"
          :class="{ 'card-checked': isActiveButton(product.id) }"
        >
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
              <div class="btn-card">
                <button
                  title="Delete from cart"
                  class="btn-less"
                  v-if="isActiveButton(product.id)"
                  @click="delCart(product.id)"
                >
                  <img src="@/assets/icon/cart-btn.svg" alt="" />
                </button>
                <button
                  title="Add to cart"
                  class="btn-more"
                  v-if="!isActiveButton(product.id)"
                  @click="addToCart(product)"
                >
                  <img src="@/assets/icon/cart-btn.svg" alt="" />
                </button>
              </div>
            </div>
            <div class="card-btn-container">
              <div class="card-link-more">
                <router-link :to="`/product-details/${product.id}`"
                  >More Info</router-link
                >
              </div>
            </div>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  props: ["id"],
  data() {
    return {
      isLoader: false,
      catProducts: [],
      pageName: this.id,
      links: {
        pageName: this.$route.params.id
          ? this.$route.params.id
          : this.$route.name,
        currentLink: {
          routeName: this.$route.name,
          link: this.$route.params.id
            ? this.$route.params.id
            : this.$route.path.replace(/\//g, ""),
        },
        previousLinks: [
          {
            routeName: "categories",
            linkName: "Catalog",
          },
        ],
      },
    };
  },
  async mounted() {
    this.isLoader = true;
    if (this.id) {
      await this.getSingleCat(this.id);
      //this.catProducts = this.$store.getters["Categories/getSingleCategory"];
      this.catProducts = this.getSingleCategory; // getSingleCategory from mapGetters
      this.pageName = this.id;
      //console.log("pageName: " + this.pageName);
      if (this.catProducts.length === 0) {
        this.catProducts = [];
        this.$router.push({ name: "error" });
      }
    } else {
      this.catProducts = [];
    }
    this.isLoader = false;
  },
  watch: {
    id() {
      // console.log("id changed", this.id);
      this.newData(this.id);
      this.pageName = this.id;
    },
  },
  computed: {
    ...mapGetters("Filter", ["getSingleCategory", "getAllProducts"]),
    ...mapGetters("Cart", ["getCartArray"]),
  },
  methods: {
    ...mapActions("Filter", ["getSingleCat"]),
    ...mapActions("Cart", ["pushToCart", "delFromCart"]),
    isActive(val) {
      return this.getCartArray.find((product) => {
        return product.id === val;
      });
    },
    isActiveButton(val) {
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
    async newData(idd) {
      this.isLoader = true;
      await this.getSingleCat(idd);
      this.catProducts = this.getSingleCategory;
      this.isLoader = false;
    },
  },
};
</script>

<style scoped lang="scss">
.product__list {
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 300px));
  grid-gap: 20px;
}

.product__card {
  padding: 5px;
  margin: 5px;
  border: 1px solid red;
}

.thumbnail {
  max-width: 100px;
  margin: 10px;
}
</style>
