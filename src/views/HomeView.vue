<template>
  <div class="container">
    <div class="main__home">
      <FilterView></FilterView>
      <CenterSection></CenterSection>
    </div>
  </div>
</template>

<script>
import FilterView from "@/components/home/FilterView";
import CenterSection from "@/components/home/CenterSection";
import { mapActions } from "vuex";

export default {
  data() {
    return {
      isLoader: false,
    };
  },
  async beforeMount() {
    await this.getAllProd();
    await this.getAllBrands();
    await this.getAllCat();
  },
  computed: {},
  methods: {
    ...mapActions("Filter", [
      "getAllBrands",
      "getAllCat",
      "getAllProd",
      "getQuery",
      "getFilterParameters",
    ]),
  },
  components: { FilterView, CenterSection },
};
</script>
<style scoped lang="scss">
.home {
  display: flex;
}
</style>
