<template>
  <section class="container">
    <h1>Product page</h1>
    <img v-if="isLoader" src="../assets/loader.gif" alt="loader" />
    <!--    <h3>{{ productData }}</h3>-->
    <div class="product__card">
      <h1>title- {{ productData.title }}</h1>
      <p>id- {{ productData.id }}</p>
      <hr />
      <p>title- {{ productData.title }}</p>
      <hr />
      <p>description- {{ productData.description }}</p>
      <hr />
      <p>price- {{ productData.price }}</p>
      <hr />
      <p>rating- {{ productData.rating }}</p>
      <hr />
      <p>stock- {{ productData.stock }}</p>
      <hr />
      <p>brand- {{ productData.brand }}</p>
      <hr />
      <p>category- {{ productData.category }}</p>
      <hr />
      <p>
        thumbnail -
        <img
          class="thumbnail"
          :src="productData.thumbnail"
          :alt="productData.title"
        />
      </p>
      <hr />
      <p>
        Images -
        <template v-for="image in productData.images" :key="image">
          <img class="thumbnail" :src="image" :alt="productData.title" />
        </template>
      </p>
      <hr />
      <p></p>
      <p><a :href="`/product/${productData.id}`"> Details </a></p>
    </div>
  </section>
</template>

<script>
import axios from "axios";

export default {
  name: "ProductPage",
  props: ["id"],
  data() {
    return {
      isLoader: false,
      productData: [],
      url: `https://dummyjson.com/products/${this.id}`,
    };
  },
  async beforeMount() {
    this.isLoader = true;
    await axios
      .get(this.url)
      .then((response) => {
        if (!response.data.id) return this.$router.push({ name: "error" });
        this.productData = response.data;
      })
      .catch(() => {
        this.$router.push({ name: "error" });
      });
    this.isLoader = false;
  },
  watch: {},
  computed: {},
};
</script>

<style scoped></style>
