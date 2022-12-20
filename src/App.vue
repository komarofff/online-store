<template>
  <HeaderView></HeaderView>
  <main class="main">
    <router-view />
  </main>
  <FooterView></FooterView>
  <CheckoutModalView v-if="isShowCheckoutModal"></CheckoutModalView>
</template>
<script>
import HeaderView from "./components/HeaderView";
import FooterView from "./components/FooterView";
import CheckoutModalView from "./components/modals/CheckoutModalView";
import { mapActions } from "vuex";

export default {
  data() {
    return {
      isShowCheckoutModal: false,
    };
  },
  async beforeMount() {
    await this.getFromStorage();
  },
  mounted() {
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
  methods: {
    ...mapActions("Cart", ["getFromStorage"]),
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
