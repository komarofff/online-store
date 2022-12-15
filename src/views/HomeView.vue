<template>
  <div class="home container">
    <FilterView></FilterView>
    <div>
      <!--      <img alt="Vue logo" src="../assets/logo.png" />-->
      <HelloWorld msg="I`m a text from another component. See props ))" />
      <p>{{ categories }}</p>
      <p>{{ text }}</p>
      <p>{{ getCategories }}</p>
      <p>{{ text5 }}</p>
      <p>
        Select number of products -
        <input
          type="number"
          min="0"
          max="100"
          @change="getData()"
          v-model="limit"
        />
      </p>
      {{ productsList }}
    </div>
  </div>
</template>

<script>
import HelloWorld from "@/components/HelloWorld.vue"; // @ is an alias to /src
import axios from "axios";
import { mapActions, mapGetters, mapState } from "vuex";
import FilterView from "@/components/FilterView";

export default {
  data() {
    return {
      loading: false,
      productsList: [],
      limit: 0,
      url: `https://dummyjson.com/products?limit=`,
    };
  },
  watch: {
    limit() {
      if (this.limit > 100) this.limit = 100;
    },
  },
  async mounted() {
    this.loading = true;
    await this.getCat();
    this.loading = false;
  },
  computed: {
    // mapState mapGetters
    ...mapState("Categories", ["categories", "text"]),
    ...mapGetters("Categories", ["getCategories"]),
    text5() {
      return this.$store.getters["Categories/getCategories"];
    },
  },
  methods: {
    // mutations && actions
    ...mapActions("Categories", ["getCat"]),
    getData() {
      axios.get(this.url + this.limit).then((response) => {
        this.productsList = response.data;
      });
    },
  },
  components: { HelloWorld, FilterView },
};
</script>
<style scoped lang="scss">
.home {
  display: flex;
}
</style>
