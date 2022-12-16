<template>
  <div>
    <h1>Categories list</h1>
    <img v-if="isLoader" src="../../assets/loader.gif" alt="loader" />
    <template v-for="category in catData" :key="category">
      <a :href="`/categories/${category}`">
        <button>
          {{ category.toUpperCase() }}
        </button>
      </a>
    </template>
  </div>
</template>
<script>
import { mapActions, mapGetters, mapState } from "vuex";

export default {
  data() {
    return {
      isLoader: false,
      catData: [],
    };
  },
  async mounted() {
    this.isLoader = true;
    await this.getAllCat();
    //this.catData = this.getAllCategories; // getAllCategories from mapGetters
    this.catData = this.categories; // categories from mapState
    this.isLoader = false;
    this.cart = this.getCartArray;
  },
  watch: {},
  computed: {
    ...mapState("Categories", ["categories"]),
    ...mapGetters("Categories", ["getAllCategories"]),
  },
  methods: {
    ...mapActions("Categories", ["getAllCat"]),
  },
};
</script>

<style scoped></style>
