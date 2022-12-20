<template>
  <!--  <nav>-->
  <!--    <router-link :to="{ name: 'home' }">Home</router-link> |-->
  <!--    <router-link :to="{ name: 'categories' }">Catalog</router-link> |-->
  <!--    <router-link :to="{ name: 'cart' }">Cart</router-link> |-->
  <!--    <router-link :to="{ name: 'checkout' }">Checkout</router-link> |-->
  <!--    <router-link :to="{ name: 'error' }"> 404 </router-link> |-->
  <!--  </nav>-->
  <div class="header__modal">
    <nav class="header__menu">
      <ul class="header__list">
        <li>
          <router-link class="header__link" :to="{ name: 'home' }"
            >Home</router-link
          >
        </li>
        <li>
          <router-link class="header__link" :to="{ name: 'categories' }"
            >Catalog</router-link
          >
          <span class="header__link-arrow link-arrow"></span>
          <ul class="sub-header__list">
            <template v-for="category in getAllCategories" :key="category">
              <li>
                <router-link
                  class="sub-header__link"
                  :to="`/catalog/${category}`"
                  >{{ category }}</router-link
                >
              </li>
            </template>
          </ul>
        </li>
        <li>
          <router-link class="header__link" :to="{ name: 'cart' }"
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
  computed: {
    ...mapGetters("Categories", ["getAllCategories"]),
  },
  methods: {
    ...mapActions("Categories", ["getAllCat"]),
  },
  components: {
    SearchBlock,
  },
};
</script>

<style scoped lang="scss"></style>
