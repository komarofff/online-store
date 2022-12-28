<template>
  <HeaderView></HeaderView>
  <main class="main">
    <div class="container" v-if="isLoader">
      <img src="@/assets/loader.gif" alt="loader" />
    </div>
    <router-view v-if="getAllProducts.length" />
  </main>
  <FooterView></FooterView>
</template>
<script lang="ts">
import HeaderView from "./components/HeaderView.vue";
import FooterView from "./components/FooterView.vue";
import { mapActions, mapGetters } from "vuex";
import { defineComponent } from "vue";
export default defineComponent({
  async created() {
    this.isLoader = true;
    await this.getAllProd();
    await this.getFromStorage();
    await this.getAllBrands();
    await this.getAllCat();
    this.isLoader = false;
  },
  async mounted() {
    const menuButton: HTMLElement | null = document.querySelector(
      ".header__burger"
    ) as HTMLElement;
    const menuButton1: HTMLElement | null = document.querySelector(
      ".header__menu"
    ) as HTMLElement;
    const menuModal: HTMLElement | null = document.querySelector(
      ".header__modal"
    ) as HTMLElement;
    const contentBody: HTMLElement | null = document.querySelector(
      "body"
    ) as HTMLElement;
    const linksList: HTMLElement | null = document.querySelector(
      ".header__list"
    ) as HTMLElement;

    menuButton.onclick = function () {
      menuButton.classList.toggle("active");
      menuButton1.classList.toggle("active");
      menuModal.classList.toggle("active");
      contentBody.classList.toggle("lock");
    };
    linksList.onclick = function (el: Event) {
      let target: HTMLElement = el.target as HTMLElement;
      if (target.classList.contains("mobile__link")) {
        menuButton.classList.toggle("active");
        menuButton1.classList.toggle("active");
        menuModal.classList.toggle("active");
        contentBody.classList.toggle("lock");
      }
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
      isLoader: false,
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
});
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
