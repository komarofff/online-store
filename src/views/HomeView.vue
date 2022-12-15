<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld msg="I`m a text from another component. See props ))" />
    <p v-for="index in 10" :key="index">
      <button @click="addToCart(index)">Add to cart</button>
      ||
      <button @click="delFromCart(index)">Delete from cart</button>
    </p>
    <p>
      <CartPlaceView></CartPlaceView>
    </p>
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
    <!--    <button @click="getData()">Press me to get data</button>-->
  </div>
  {{ productsList }}
</template>

<script>
import HelloWorld from "@/components/HelloWorld.vue"; // @ is an alias to /src
import axios from "axios";
import { mapActions, mapGetters, mapState } from "vuex";
import CartPlaceView from "@/components/CartPlaceView";

export default {
  data() {
    return {
      loading: false,
      productsList: [],
      limit: 0,
      url: `https://dummyjson.com/products?limit=`,
    };
  },
  beforeMount() {
    // axios.get(this.url).then((response) => {
    //   this.productsList = response.data;
    // });
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
    addToCart(val) {
      this.emitter.emit("addToCart", val);
    },
    delFromCart(val) {
      this.emitter.emit("delFromCart", val);
    },
  },
  components: { HelloWorld, CartPlaceView },
};
</script>
