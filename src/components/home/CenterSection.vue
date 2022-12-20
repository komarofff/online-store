<template>
  <div class="center">
    <h1>Products list</h1>
    <img v-if="isLoader" src="../../assets/loader.gif" alt="loader" />
    <input type="text" v-model="searchText" />
    {{ getQueryForFilters }}
    <div class="center-section">
      <!--      {{ getFilterData }}-->

      <template v-for="product in data" :key="product.id">
        <div class="product__card">
          <p>id- {{ product.id }}</p>
          <hr />
          <p>title- {{ product.title }}</p>
          <hr />
          <p>description- {{ product.description }}</p>
          <hr />
          <p>price- {{ product.price }}</p>
          <hr />
          <p>discountPercentage- {{ product.discountPercentage }}</p>
          <hr />
          <p>rating- {{ product.rating }}</p>
          <hr />
          <p>stock- {{ product.stock }}</p>
          <hr />
          <p>brand- {{ product.brand }}</p>
          <hr />
          <p>category- {{ product.category }}</p>
          <hr />
          <p>
            thumbnail -
            <img
              class="thumbnail"
              :src="product.thumbnail"
              :alt="product.title"
            />
          </p>
          <hr />
          <p>
            <button
              v-if="!isActiveButton(product.id)"
              @click="addToCart(product)"
            >
              Add to cart
            </button>

            <button
              class="delete__button"
              v-if="isActiveButton(product.id)"
              @click="delCart(product.id)"
              :ref="`id-${product.id}`"
            >
              Delete from cart
            </button>
          </p>
          <p>
            <router-link :to="`/product/${product.id}`">Details</router-link>
          </p>
        </div>
      </template>
    </div>
  </div>
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
      firstQuery: {
        categories: [],
        brands: [],
        price: [],
        stock: [],
        search: "",
        sort: "",
      },
    };
  },
  async mounted() {
    // all products
    this.isLoader = true;
    // делаем запрос без параметров и получаем все продукты
    await this.getAllProd();
    await this.getQuery(this.firstQuery);
    await this.getFilterParameters(this.firstQuery);
    // если надо отправляем указанный параметр в фильтр изначально. например формируем фильтр из адресной строки
    //  и потом вывываем данные из фильтра НО уже с ПАРАМЕТРАМИ
    //await this.getQuery(this.getQueryForFilters);
    //await this.getFilterParameters();
    this.data = this.getFilterData;
    this.cart = this.getCartArray;
    this.isLoader = false;
  },
  watch: {
    searchText() {
      //getQueryForFilters параметры фильтра сохраненные в сторе
      this.changesToFilter();
    },
    getFilterData() {
      this.data = this.getFilterData;
    },
  },
  computed: {
    ...mapGetters("Filter", ["getFilterData", "getQueryForFilters"]),
    ...mapGetters("Cart", ["getCartArray"]),
  },
  methods: {
    ...mapActions("Filter", ["getAllProd", "getQuery", "getFilterParameters"]),
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
    },
    async addToCart(val) {
      val.quantity = 1;
      await this.pushToCart(val);
      this.cart = this.getCartArray;
      this.emitter.emit("addToCart");
    },
    async delCart(val) {
      await this.delFromCart(val);
      this.cart = this.getCartArray;
      this.emitter.emit("delFromCart");
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
