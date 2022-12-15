<template>
  <h1>Product page</h1>
  <h1>Товар номер {{ id }}</h1>
  <h3>{{ productData }}</h3>
</template>

<script>
import axios from "axios";
export default {
  name: "ProductPage",
  props: ["id"],
  data() {
    return {
      productData: [],
      url: `https://dummyjson.com/products/${this.id}`,
    };
  },
  beforeMount() {
    axios
      .get(this.url)
      .then((response) => {
        if (!response.data.id) return this.$router.push({ name: "error" });
        this.productData = response.data;
      })
      .catch((e) => {
        this.$router.push({ name: "error" });
      });
  },
  watch: {},
  computed: {},
};
</script>

<style scoped></style>
