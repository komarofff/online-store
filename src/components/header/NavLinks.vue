<template>
  <div class="header__logo">
    <router-link :to="{ name: 'home' }" @click="isSubmenuOpen = false"
      ><img src="@/assets/icon/logo.svg" alt="logo"
    /></router-link>
  </div>
  <div class="header__modal">
    <nav class="header__menu">
      <ul class="header__list">
        <li>
          <!--          <a class="header__link" href="/" @click="emitToResetFilters()"-->
          <!--            >Home</a-->
          <!--          >-->
          <router-link
            class="header__link"
            :to="{ name: 'home' }"
            @click="isSubmenuOpen = false"
            >Home</router-link
          >
        </li>
        <li>
          <a class="header__link" href="#" @click.prevent="openCloseSubMenu()"
            >Catalog</a
          >
          <span
            class="header__link-arrow link-arrow"
            :class="{ 'link-arrow-rotate': isSubmenuOpen }"
          ></span>
          <ul
            class="sub-header__list vertical-scroll"
            :class="{ open: isSubmenuOpen }"
            @click="openCloseSubMenu()"
            v-if="getCategories"
          >
            <li>
              <router-link class="sub-header__link" :to="{ name: 'categories' }"
                >All categories</router-link
              >
            </li>
            <li v-for="category in getCategories" :key="category">
              <router-link
                class="sub-header__link"
                :to="`/catalog/${category.name}`"
                >{{ category.name }}</router-link
              >
            </li>
          </ul>
        </li>
        <li>
          <router-link
            class="header__link"
            :to="{ name: 'cart' }"
            @click="isSubmenuOpen = false"
            >Cart</router-link
          >
        </li>

        <SearchBlock></SearchBlock>
      </ul>
    </nav>
  </div>
</template>

<script>
import SearchBlock from "@/components/header/SearchBlock";
import { mapActions, mapGetters } from "vuex";
export default {
  async mounted() {
    await this.getAllCat();
  },
  data() {
    return {
      isSubmenuOpen: false,
    };
  },
  computed: {
    ...mapGetters("Filter", ["getCategories"]),
  },
  methods: {
    ...mapActions("Filter", ["getAllCat"]),
    emitToResetFilters() {
      this.emitter.emit("resetFilters");
    },
    openCloseSubMenu() {
      this.isSubmenuOpen = !this.isSubmenuOpen;
    },
  },
  components: {
    SearchBlock,
  },
};
</script>

<style lang="scss">
//.header__link:hover {
//  .sub-header__list {
//    display: none !important;
//  }
//}
.open {
  display: block !important;
}
.link-arrow-rotate {
  transform: rotate(-180deg);
  transition: all 0.3s ease;
}
</style>
