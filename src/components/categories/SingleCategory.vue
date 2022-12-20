<template>
  <img v-if="isLoader" src="../../assets/loader.gif" alt="loader" />
  <h1>Category {{ id }}</h1>
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
        <p>
          <router-link :to="`/product/${product.id}`">Details</router-link>
        </p>
      </div>
    </template>
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
    };
  },
  async mounted() {
    this.isLoader = true;
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
  },
  computed: {
    ...mapGetters("Categories", ["getSingleCategory"]),
    ...mapGetters("Cart", ["getCartArray"]),
  },
  methods: {
    ...mapActions("Categories", ["getSingleCat"]),
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
    },
    async delCart(val) {
      await this.delFromCart(val);
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
