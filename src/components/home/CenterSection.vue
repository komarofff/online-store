<template>
  <section class="main__home-content">
    <div class="home-menu-crumbs">
      <h1 class="crumbs-start">Filter page</h1>
      <div class="crumbs-address">
        <a class="img-address" href=""
          ><img src="@/assets/icon/address-svg.svg" alt=""
        /></a>
        <a href="">Category</a>
        <img
          class="img-arrow"
          src="@/assets/icon/arrow-link-right.svg"
          alt=""
        />
        <a href="">Brand</a>
        <img
          class="img-arrow"
          src="@/assets/icon/arrow-link-right.svg"
          alt=""
        />
        <a href="">Product</a>
      </div>
    </div>

    <div class="home-menu">
      <select v-model="sort" @change="changesToSort(sort)">
        <option disabled value="">Sort options:</option>
        <option
          v-for="option in options"
          :value="option.value"
          :key="option.value"
        >
          {{ option.text }}
        </option>
      </select>

      <p class="home-menu-found">
        Found: <span id="found">{{ dataItems }}</span>
      </p>

      <div class="home-menu-search">
        <input type="text" placeholder="Search product" v-model="searchText" />
      </div>

      <div class="home-menu-img">
        <button><img src="@/assets/icon/block-9.svg" alt="" /></button>
        <button><img src="@/assets/icon/block-16.svg" alt="" /></button>
      </div>
    </div>
    <img v-if="isLoader" src="@/assets/loader.gif" alt="loader" />
    <div class="home-cards">
      <div class="card-container">
        <template v-for="product in data" :key="product.id">
          <div class="card-item card-hover">
            <div class="card-photo">
              <router-link
                :to="`/catalog/${product.category}/product/${product.id}`"
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
                  <router-link
                    :to="`/catalog/${product.category}/product/${product.id}`"
                    >More Info</router-link
                  >
                </div>
              </div>
            </div>
          </div>
        </template>
      </div>
    </div>
  </section>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  data() {
    return {
      data: [],
      isLoader: false,
      searchText: null,
      cart: [],
      dataItems: 0,
      sort: "",
      options: [
        { text: "Sort by price ↑", value: "price-ASC" },
        { text: "Sort by price ↓", value: "price-DESC" },
        { text: "Sort by rating ↑", value: "rating-ASC" },
        { text: "Sort by rating ↓", value: "rating-DESC" },
        { text: "Sort by discount ↑", value: "discount-ASC" },
        { text: "Sort by discount ↓", value: "discount-DESC" },
      ],
    };
  },
  async mounted() {
    // all products
    this.isLoader = true;
    this.data = this.getFilterData;
    this.cart = this.getCartArray;
    this.isLoader = false;
    this.emitter.on("clearUrls", () => {
      console.log("clear from center");
      setTimeout(() => {
        this.$router.push({
          query: {},
        });
      }, 50);
    });
    if (this.$route.query.search) {
      this.searchText = this.$route.query.search;
    }
  },
  watch: {
    searchText() {
      //getQueryForFilters параметры фильтра сохраненные в сторе
      this.changesToFilter();
      this.emitter.emit("changePriceData", this.data.length);
    },
    getFilterData() {
      this.data = this.getFilterData;
      this.emitter.on("clearSearch", () => {
        this.searchText = "";
      });
      this.dataItems = this.getFilterData.length;
    },
  },
  computed: {
    ...mapGetters("Filter", ["getFilterData", "getQueryForFilters"]),
    ...mapGetters("Cart", ["getCartArray"]),
  },
  methods: {
    ...mapActions("Filter", ["getQuery", "getFilterParameters"]),
    ...mapActions("Cart", ["pushToCart", "delFromCart"]),
    async changesToFilter() {
      if (this.searchText.length > 0) {
        this.getQueryForFilters.search = this.searchText;
      } else {
        delete this.getQueryForFilters.search;
      }
      // изменения отправляем в стор для других компонентов
      await this.getQuery(this.getQueryForFilters);
      await this.getFilterParameters(this.getQueryForFilters);
      this.data = this.getFilterData;
      this.emitter.emit("changeSearch", this.searchText);
    },
    async changesToSort() {
      console.log("sort was changed");
      if (this.sort.length > 0) {
        this.getQueryForFilters.sort = this.sort;
      } else {
        delete this.getQueryForFilters.sort;
      }

      // await this.getQuery(this.getQueryForFilters);
      await this.getFilterParameters(this.getQueryForFilters);
      this.data = this.getFilterData;
      this.emitter.emit("changeSort", this.sort);
    },
    async addToCart(val) {
      val.quantity = 1;
      await this.pushToCart(val);
    },
    async delCart(val) {
      await this.delFromCart(val);
    },
    isActiveButton(val) {
      return this.getCartArray.find((product) => {
        return product.id === val;
      });
    },
  },
  components: {},
};
</script>

<style scoped lang="scss">
.center-section {
  flex-basis: 80%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-evenly;
}
.product__card {
  max-width: 200px;
  border: 1px solid red;
  margin: 10px;
}
.thumbnail {
  max-width: 200px;
}
</style>
