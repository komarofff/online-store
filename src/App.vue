<template>
  <HeaderView></HeaderView>
  <main class="main">
    <router-view v-if="getAllProducts.length" />
  </main>
  <FooterView></FooterView>
</template>
<script>
import HeaderView from "./components/HeaderView.vue";
import FooterView from "./components/FooterView.vue";
import { mapActions, mapGetters } from "vuex";

export default {
  async created() {
    await this.getAllProd();
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
    // menuButton1.onclick = function () {
    //   menuButton.classList.remove("active");
    //   menuButton1.classList.remove("active");
    //   menuModal.classList.remove("active");
    //   contentBody.classList.remove("lock");
    // };
  },
  data() {
    return {
      images: [],
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
  },
};
</script>
<style lang="scss">
@import "./styles/style";
::placeholder {
  color: #ccc;
  font-size: 14px;
}
.crumbs-address a {
  font-size: 14px;
}

@media (max-width: 768px) {
  .home-menu-crumbs {
    align-items: center;
    flex-direction: column;
  }
  .header__menu {
    right: -115%;
  }
  .header__search {
    min-width: 100%;
    .search-box {
      position: absolute;
      min-width: 100%;
      height: 70vh;
      p {
        font-size: 14px;
      }
    }
  }
  .header__menu {
    width: 75vw !important;
  }
}
@media (max-width: 560px) {
  .header__menu {
    width: 100% !important;
  }
}
</style>
