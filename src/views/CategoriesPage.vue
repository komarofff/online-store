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
  props: ["id"],
  components: {
    ListOfCategories,
    SingleCategory,
  },
};
</script>

<style scoped lang="scss"></style>
