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
  async mounted() {
    await this.getAllProd();
    await this.getAllBrands();
    await this.getAllCat();
  },
  watch: {
    $route(to, from) {
      if (
        to.name === from.name &&
        Object.keys(this.$route.query).length === 0
      ) {
        this.emitter.emit("resetFilters");
      }
    },
  },

  computed: {},
  methods: {
    ...mapActions("Filter", ["getAllBrands", "getAllCat", "getAllProd"]),
    emitToResetFilters() {
      this.emitter.emit("resetFilters");
    },
  },
  components: { FilterView, CenterSection },
};
</script>
<style scoped lang="scss">
.home {
  display: flex;
}
</style>
