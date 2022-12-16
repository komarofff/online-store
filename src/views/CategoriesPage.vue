<template>
  <section class="container">
    <ListOfCategories v-if="!id"></ListOfCategories>
    <SingleCategory v-if="id" :id="id"></SingleCategory>
  </section>
</template>

<script>
import ListOfCategories from "../components/categories/ListOfCategories";
import SingleCategory from "../components/categories/SingleCategory";
export default {
  name: "CategoriesPage",
  props: ["id"],
  components: {
    ListOfCategories,
    SingleCategory,
  },
};
</script>

<style scoped lang="scss">
button {
  margin: 5px;
  cursor: pointer;
}
</style>
