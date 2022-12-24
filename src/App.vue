<template>
  <HeaderView></HeaderView>
  <main class="main">
    <router-view v-if="getAllProducts.length" />
  </main>
  <FooterView></FooterView>
  <CheckoutModalView v-if="isShowCheckoutModal"></CheckoutModalView>
</template>
<script>
import HeaderView from "./components/HeaderView";
import FooterView from "./components/FooterView";
import CheckoutModalView from "./components/modals/CheckoutModalView";
import { mapActions, mapGetters } from "vuex";

export default {
  data() {
    return {
      isShowCheckoutModal: false,
    };
  },
  async created() {
    await this.getAllProd();
    // await this.getFilterParameters({
    //   categories: [],
    //   brands: [],
    //   price: [],
    //   stock: [],
    //   search: "",
    //   sort: "",
    //   big: "",
    // });
    await this.getFromStorage();
    await this.getAllBrands();
    await this.getAllCat();
  },
  async mounted() {
    const menuButton = document.querySelector(".header__burger");
    const menuButton1 = document.querySelector(".header__menu");
    const menuModal = document.querySelector(".header__modal");
    const contentBody = document.querySelector("body");

    menuButton.onclick = function () {
      menuButton.classList.toggle("active");
      menuButton1.classList.toggle("active");
      menuModal.classList.toggle("active");
      contentBody.classList.toggle("lock");
    };
    menuButton1.onclick = function () {
      menuButton.classList.remove("active");
      menuButton1.classList.remove("active");
      menuModal.classList.remove("active");
      contentBody.classList.remove("lock");
    };
    menuModal.onclick = function () {
      menuButton.classList.remove("active");
      menuButton1.classList.remove("active");
      menuModal.classList.remove("active");
      contentBody.classList.remove("lock");
    };
  },
  computed: {
    ...mapGetters("Filter", ["getAllProducts"]),
  },
  methods: {
    ...mapActions("Cart", ["getFromStorage"]),
    ...mapActions("Filter", [
      "getAllProd",
      "getFilterParameters",
      "getAllCat",
      "getAllBrands",
    ]),
  },
  components: {
    HeaderView,
    FooterView,
    CheckoutModalView,
  },
};
</script>
<style lang="scss">
@import "./styles/style";
</style>
