<template>
  <section class="container">
    <div class="cart">
      <div class="home-menu-crumbs">
        <h1 class="crumbs-start">Categories</h1>
        <div class="crumbs-address">
          <router-link class="img-address" :to="{ name: 'home' }"
            ><img src="@/assets/icon/address-svg.svg" alt=""
          /></router-link>
          <img
            class="img-arrow"
            src="@/assets/icon/arrow-link-right.svg"
            alt=""
          />
          <p>Categories</p>
        </div>
      </div>
      <ListOfCategories v-if="!id"></ListOfCategories>
      <SingleCategory v-if="id" :id="id"></SingleCategory>
    </div>
  </section>
</template>

<script>
import ListOfCategories from "../components/categories/ListOfCategories";
import SingleCategory from "../components/categories/SingleCategory";
export default {
  props: ["id"],
  components: {
    ListOfCategories,
    SingleCategory,
  },
};
</script>

<style scoped lang="scss">
.crumbs-address {
  align-items: center;
}
</style>
