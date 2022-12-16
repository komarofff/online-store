<template>
  <section class="container">
    <!--    <template v-if="id === false">-->

    <!--    </template>-->
    cart - {{ cart }}
    <h1 v-if="id">Category {{ id }}</h1>
    <div v-else>
      <h1>Categories list</h1>
      <template v-for="category in catData" :key="category">
        <a :href="`/categories/${category}`">
          <button>
            {{ category.toUpperCase() }}
          </button>
        </a>
      </template>
    </div>
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
            <button v-if="!isActive(product.id)" @click="addToCart(product)">
              Add to cart
            </button>

            <button
              class="delete__button"
              v-if="isActive(product.id)"
              @click="delCart(product.id)"
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
import { mapActions, mapGetters, mapState } from "vuex";

export default {
  name: "CategoriesPage",
  props: ["id"],
  data() {
    return {
      cart: [],
      isLoader: false,
      catProducts: [],
      catData: [],
    };
  },
  async mounted() {
    this.isLoader = true;
    await this.getAllCat();
    //this.catData = this.getAllCategories; // getAllCategories from mapGetters
    this.catData = this.categories; // categories from mapState
    if (this.id) {
      await this.getSingleCat(this.id);
      //this.catProducts = this.$store.getters["Categories/getSingleCategory"];
      this.catProducts = this.getSingleCategory; // getSingleCategory from mapGetters
      if (this.catProducts.products.length === 0) {
        this.catProducts = [];
        return this.$router.push({ name: "error" });
      }
    } else {
      this.catProducts = [];
    }
    this.isLoader = false;
    this.cart = this.getCartArray;
  },
  watch: {
    $route() {
      if (!this.id) {
        this.catProducts = [];
      }
    },
  },
  computed: {
    ...mapState("Categories", ["categories"]),
    ...mapGetters("Categories", ["getAllCategories", "getSingleCategory"]),
    ...mapGetters("Cart", ["getCartArray"]),
  },
  methods: {
    ...mapActions("Categories", ["getAllCat", "getSingleCat"]),
    ...mapActions("Cart", ["pushToCart", "delFromCart"]),
    isActive(val) {
      // подключаем показ кнопки удалить если товар в сторе в массиве корзины
      //console.log("val", val);
      // let answer = this.getCartArray.find((product) => {
      //  return product.id === val;
      //});
      //console.log("answer", answer);
      //return answer;
      return this.getCartArray.find((product) => {
        return product.id === val;
      });
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
  cursor: pointer;
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
