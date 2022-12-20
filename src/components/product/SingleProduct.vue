<template>
  <section class="container" v-if="isCatHere">
    <h1>Product page</h1>
    <img v-if="isLoader" src="../../assets/loader.gif" alt="loader" />
    <!--    <h3>{{ productData }}</h3>-->

    <div class="product__card">
      <h1>title- {{ getSingleProduct.title }}</h1>
      <p>id- {{ getSingleProduct.id }}</p>
      <hr />
      <p>title- {{ getSingleProduct.title }}</p>
      <hr />
      <p>description- {{ getSingleProduct.description }}</p>
      <hr />
      <p>price- {{ getSingleProduct.price }}</p>
      <hr />
      <p>rating- {{ getSingleProduct.rating }}</p>
      <hr />
      <p>stock- {{ getSingleProduct.stock }}</p>
      <hr />
      <p>brand- {{ getSingleProduct.brand }}</p>
      <hr />
      <p>category- {{ getSingleProduct.category }}</p>
      <hr />
      <p>
        thumbnail -
        <img
          class="thumbnail"
          :src="getSingleProduct.thumbnail"
          :alt="getSingleProduct.title"
        />
      </p>
      <hr />
      <p>
        Images -
        <template v-for="image in getSingleProduct.images" :key="image">
          <img class="thumbnail" :src="image" :alt="getSingleProduct.title" />
        </template>
      </p>
      <p>
        <button
          v-if="!isActive(getSingleProduct.id)"
          @click="addToCart(getSingleProduct)"
        >
          Add to cart
        </button>

        <button
          class="delete__button"
          v-if="isActive(getSingleProduct.id)"
          @click="delCart(getSingleProduct.id)"
          :ref="`id-${getSingleProduct.id}`"
        >
          Delete from cart
        </button>
      </p>
      <p></p>
    </div>
  </section>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  props: ["cat", "id"],
  data() {
    return {
      isLoader: false,
      isCatHere: false,
    };
  },

  async mounted() {
    this.isLoader = true;
    await this.getSingleCat(this.cat);
    await this.getSingleProd(Number(this.id));
    this.isLoader = false;

    console.log();
    if (
      Number(this.id) === 0 ||
      this.getSingleCategory.products.some(
        (el) => el.id === Number(this.id)
      ) === false
    ) {
      return this.$router.push({ name: "error" });
    }

    this.isCatHere = this.getSingleCategory.products.every((el) => {
      return el.category === this.getSingleProduct.category;
    });
    if (
      this.getSingleProduct.category !== this.cat ||
      this.isCatHere === false
    ) {
      return this.$router.push({ name: "error" });
    }

    //return this.$router.push({ name: "error" });
  },
  watch: {},
  computed: {
    ...mapGetters("Products", ["getSingleProduct", "getProdThroughId"]),
    ...mapGetters("Categories", ["getAllCategories", "getSingleCategory"]),
    ...mapGetters("Cart", ["getCartArray"]),
  },
  methods: {
    ...mapActions("Products", ["getSingleProd"]),
    ...mapActions("Categories", ["getAllCat", "getSingleCat"]),
    ...mapActions("Cart", ["pushToCart", "delFromCart"]),

    isActive(val) {
      // подключаем показ кнопки удалить если товар в сторе в массиве корзины
      //console.log("val", val);
      // let answer = this.getCartArray.find((product) => {
      //  return product.id === val;
      //});
      //console.log("answer", answer);
      //return answer;
      return this.getCartArray.find((product) => {
        return product.id === val;
      });
    },
    async addToCart(val) {
      val.quantity = 1;
      await this.pushToCart(val);
    },
    async delCart(val) {
      await this.delFromCart(val);
    },
  },
};
</script>

<style scoped></style>
