<template>
  <h1></h1>
  <!--  <div class="center-section">-->
  <!--    &lt;!&ndash;      <img alt="Vue logo" src="../assets/logo.png" />&ndash;&gt;-->
  <!--    <h1>Here is a list of products according of filter rules</h1>-->
  <!--    <p>-->
  <!--      Select number of products - -->
  <!--      <input-->
  <!--        type="number"-->
  <!--        min="0"-->
  <!--        max="100"-->
  <!--        @change="getData()"-->
  <!--        v-model="limit"-->
  <!--      />-->
  <!--    </p>-->
  <!--    {{ productsList }}-->
  <!--  </div>-->
</template>

<script>
import axios from "axios";
import { mapActions, mapGetters, mapState } from "vuex";
export default {
  data() {
    return {
      loading: false,
      productsList: [],
      limit: 0,
      url: `https://dummyjson.com/products?limit=`,
    };
  },
  // watch: {
  //   limit() {
  //     if (this.limit > 100) this.limit = 100;
  //   },
  // },
  // async mounted() {
  //   this.loading = true;
  //   await this.getAllCat();
  //   this.loading = false;
  // },
  // computed: {
  //   // mapState mapGetters
  //   ...mapState("Categories", ["categories", "text"]),
  //   ...mapGetters("Categories", ["getAllCategories"]),
  //   text5() {
  //     return this.$store.getters["Categories/getAllCategories"];
  //   },
  // },
  // methods: {
  //   // mutations && actions
  //   ...mapActions("Categories", ["getAllCat"]),
  //   getData() {
  //     axios.get(this.url + this.limit).then((response) => {
  //       this.productsList = response.data;
  //     });
  //   },
  // },
  // components: {},
};
</script>

<style scoped lang="scss">
.center-section {
  flex-basis: 80%;
}
</style>
