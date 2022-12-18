<template>
  <div class="center">
    <h1>Products list</h1>
    <input type="text" v-model="searchText" />
    <div class="center-section">
      {{ products }}
    </div>
  </div>
</template>

<script>
export default {
  props: ["products"],
  data() {
    return {
      loading: false,
      data: [],
      searchText: null,
    };
  },
  mounted() {
    this.emitter.on("categories", (val) => {
      this.data = this.products.filter((el) => el.category === val);
    });
    this.emitter.on("brand", (val) => {
      this.data = this.products.filter((el) => el.brand === val);
    });
    this.emitter.on("price", (min, max) => {
      this.data = this.products.filter(
        (el) => el.price >= min && el.price <= max
      );
    });
    this.emitter.on("stock", (min, max) => {
      this.data = this.products.filter(
        (el) => el.stock >= min && el.stock <= max
      );
    });
  },
  watch: {
    searchText() {
      this.emitSearch();
    },
  },
  computed: {},
  methods: {
    emitSearch() {
      this.emitter.emit("searchText", this.searchText);
    },
  },
  components: {},
};
</script>

<style scoped lang="scss">
.center-section {
  flex-basis: 80%;
  display: flex;
  flex-direction: column;
}
</style>
