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
    <p>{{ catProducts }}</p>
  </section>
</template>

<script>
import axios from "axios";

export default {
  name: "CategoriesPage",
  props: ["id"],
  data() {
    return {
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
  methods: {
    async getCategoryProducts(val) {
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

<style scoped>
button {
  margin: 5px;
}
</style>
