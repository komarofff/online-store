<template>
  <section class="container">
    <h1>Categories</h1>
    <template v-for="category in catData" :key="category">
      <button @click="getCategoryProducts(category)">
        {{ category.toUpperCase() }}
      </button>
    </template>
    <hr />
    <p>{{ catProducts }}</p>
  </section>
</template>

<script>
import axios from "axios";

export default {
  name: "CategoriesPage",
  data() {
    return {
      catData: [],
      catProducts: [],
      url: "https://dummyjson.com/products/categories",
      catUrl: "https://dummyjson.com/products/category/",
    };
  },
  methods: {
    getCategoryProducts(val) {
      axios.get(this.catUrl + val).then((response) => {
        this.catProducts = response.data;
      });
    },
  },
  beforeMount() {
    axios.get(this.url).then((response) => {
      this.catData = response.data;
    });
  },
};
</script>

<style scoped>
button {
  margin: 5px;
}
</style>
