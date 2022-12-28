<template>
  <section class="container">
    <div class="cart">
      <ListOfCategories v-if="!id"></ListOfCategories>
      <SingleCategory v-if="id" :id="id"></SingleCategory>
    </div>
  </section>
</template>

<script lang="ts">
import ListOfCategories from "../components/categories/ListOfCategories.vue";
import SingleCategory from "../components/categories/SingleCategory.vue";
import { defineComponent } from "vue";
export default defineComponent({
  props: ["id"],
  components: {
    ListOfCategories,
    SingleCategory,
  },
});
</script>

<style scoped lang="scss">
.crumbs-address {
  align-items: center;
}
</style>
