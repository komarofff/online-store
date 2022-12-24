<template>
  <section class="container" v-if="isCatHere">
    <h1>Product page</h1>
    <img v-if="isLoader" src="../../assets/loader.gif" alt="loader" />
    <!--    <h3>{{ productData }}</h3>-->

    <div class="product__card">
      <h1>title- {{ getSingleProduct[0].title }}</h1>
      <p>id- {{ getSingleProduct[0].id }}</p>
      <hr />
      <p>title- {{ getSingleProduct[0].title }}</p>
      <hr />
      <p>description- {{ getSingleProduct[0].description }}</p>
      <hr />
      <p>price- {{ getSingleProduct[0].price }}</p>
      <hr />
      <p>rating- {{ getSingleProduct[0].rating }}</p>
      <hr />
      <p>stock- {{ getSingleProduct[0].stock }}</p>
      <hr />
      <p>brand- {{ getSingleProduct[0].brand }}</p>
      <hr />
      <p>category- {{ getSingleProduct[0].category }}</p>
      <hr />
      <p>
        thumbnail -
        <img
          class="thumbnail"
          :src="getSingleProduct[0].thumbnail"
          :alt="getSingleProduct[0].title"
        />
      </p>
      <hr />
      <p>
        Images -
        <template v-for="image in getSingleProduct[0].images" :key="image">
          <img
            class="thumbnail"
            :src="image"
            :alt="getSingleProduct[0].title"
          />
        </template>
      </p>
      <p>
        <button
          v-if="!isActive(getSingleProduct[0].id)"
          @click="addToCart(getSingleProduct[0])"
        >
          Add to cart
        </button>

        <button
          class="delete__button"
          v-if="isActive(getSingleProduct[0].id)"
          @click="delCart(getSingleProduct[0].id)"
          :ref="`id-${getSingleProduct[0].id}`"
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
    console.log(!isNaN(+this.id), parseInt(this.id));
    if (!isNaN(+this.id) && parseInt(this.id) > 0 && parseInt(this.id) < 100) {
      await this.getSingleProd(Number(this.id));
    } else {
      console.log("error-1");
      this.$router.push({ name: "error" });
    }

    this.isLoader = false;

    // if (
    //   this.id === 0 ||
    //   this.getSingleCategory.products.some((el) => el.id === this.id) === false
    // ) {
    //   console.log("false id");
    //   this.$router.push({ name: "error" });
    // }

    this.isCatHere = this.getSingleCategory.every((el) => {
      return el.category === this.getSingleProduct[0].category;
    });
    if (
      this.getSingleProduct[0].category !== this.cat ||
      this.isCatHere === false
    ) {
      // this.$router.push({ name: "error" });
    }

    //return this.$router.push({ name: "error" });
  },
  watch: {},
  computed: {
    ...mapGetters("Filter", ["getSingleCategory", "getSingleProduct"]),
    ...mapGetters("Cart", ["getCartArray"]),
  },
  methods: {
    ...mapActions("Filter", ["getSingleCat", "getSingleProd"]),
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
