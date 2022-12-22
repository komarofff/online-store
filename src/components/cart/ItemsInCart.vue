<template>
  max-pages {{ maxPage }}
  <ul>
    <li v-for="i in maxPage" :key="i" @click="goToPage(i)">{{ i }}</li>
  </ul>
  {{ itemsInCart }}
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "CartPage",
  data() {
    return {
      itemsInCart: [],
      page: 1,
      maxPage: 1,
      itemsPerPage: 3,
      startQuery: {},
    };
  },
  mounted() {
    this.itemsInCart = this.getCartArray;
    this.maxPage = Math.ceil(this.itemsInCart.length / this.itemsPerPage);
    this.startQuery = this.$route.query.page;
    if (this.startQuery && this.startQuery > 0) {
      console.log("start with query parameters", this.startQuery);
      this.showPaginatedItems(this.startQuery);
    } else {
      this.showAllItems();
    }
  },
  watch: {},
  computed: {
    ...mapGetters("Cart", ["getCartArray"]),
  },
  methods: {
    goToPage(val) {
      let queries = JSON.parse(JSON.stringify(this.$route.query));
      if (val) {
        queries.page = val;
        this.$router.replace({ query: queries });
      } else {
        delete queries.page;
        this.$router.replace({ query: queries });
      }
      this.showPaginatedItems(val);
    },
    showAllItems() {
      this.itemsInCart = this.getCartArray;
    },
    showPaginatedItems(page) {
      let start = page * this.itemsPerPage - this.itemsPerPage;
      let end = page * this.itemsPerPage;
      console.log("start: " + start + " end: " + end);
      this.itemsInCart = this.getCartArray.slice(start, end);
    },
  },
};
</script>

<style scoped></style>
