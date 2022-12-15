<template>
  <section class="container">
    <template v-for="category in catData" :key="category">
      <a :href="`/categories/${category}`">
        <button>
          {{ category.toUpperCase() }}
        </button>
      </a>
    </template>
    <h1 v-if="id">Category {{ id }}</h1>
    <h1 v-else>Categories list</h1>
    <hr />
    <img v-if="isLoader" src="../assets/loader.gif" alt="loader" />
    <div class="product__list">
      <template v-for="product in catProducts.products" :key="product.id">
        <div class="product__card">
          <p>id- {{ product.id }}</p>
          <hr />
          <p>title- {{ product.title }}</p>
          <hr />
          <p>description- {{ product.description }}</p>
          <hr />
          <p>price- {{ product.price }}</p>
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
            Images -
            <template v-for="image in product.images" :key="image">
              <img class="thumbnail" :src="image" :alt="product.title" />
            </template>
          </p>
          <hr />
          <p>
            <button @click="addToCart(product.id)">Add to cart</button>

            <button
              class="delete__button"
              v-if="isActive(product.id)"
              @click="delFromCart(product.id)"
              :ref="`id-${product.id}`"
            >
              Delete from cart
            </button>
          </p>
          <p><a :href="`/product/${product.id}`"> Details </a></p>
        </div>
      </template>
    </div>
    <!--    {{ catProducts }}-->
  </section>
</template>

<script>
import axios from "axios";

export default {
  name: "CategoriesPage",
  props: ["id"],
  data() {
    return {
      cart: [{ id: 74 }],
      isLoader: false,
      catData: [],
      catProducts: [],
      url: "https://dummyjson.com/products/categories",
      catUrl: "https://dummyjson.com/products/category/",
    };
  },
  async mounted() {
    this.isLoader = true;
    await this.getSingleCategory();
    this.isLoader = false;
  },
  watch: {
    id() {
      if (!this.id) {
        this.catProducts = [];
      }
    },
  },
  computed: {
    // carts() {},
    // mapGetters cart - получаю всё время данные из стора
  },
  methods: {
    isActive(val) {
      // подключаем показ кнопки удалить если товар в сторе в массиве корзины
      //console.log("val", val);
      let answer = this.cart.find((product) => {
        return product.id === val;
      });
      //console.log("answer", answer);
      return answer;
    },
    async getCategoryProducts(val) {
      this.catProducts = [];
      this.isLoader = true;
      await axios.get(this.catUrl + val).then((response) => {
        this.catProducts = response.data;
      });
      this.isLoader = false;
    },
    async getSingleCategory() {
      if (this.id) {
        this.isLoader = true;
        await axios
          .get(this.catUrl + this.id)
          .then((response) => {
            if (response.data.products.length > 0) {
              this.catProducts = response.data;
            } else {
              this.catProducts = [];
              return this.$router.push({ name: "error" });
            }
          })
          .catch(() => {
            this.catProducts = [];
            return this.$router.push({ name: "error" });
          });
        this.isLoader = false;
      }
    },
    addToCart(val) {
      this.emitter.emit("addToCart", val);
    },
    delFromCart(val) {
      this.emitter.emit("delFromCart", val);
    },
  },
  async beforeMount() {
    this.catProducts = [];
    this.isLoader = true;
    await axios.get(this.url).then((response) => {
      this.catData = response.data;
    });
    this.isLoader = false;
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

button {
  margin: 5px;
}

.delete__button {
  &.active {
    display: block;
  }
}

.thumbnail {
  max-width: 100px;
  margin: 10px;
}
</style>
