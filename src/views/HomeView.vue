<template>
  <div class="home container">
    <FilterView></FilterView>
    <CenterSection></CenterSection>
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
    await this.getAllCat();
    await this.getAllBrands();
  },
  computed: {},
  methods: {
    ...mapActions("Filter", ["getAllProd", "getAllCat", "getAllBrands"]),
  },
  components: { FilterView, CenterSection },
};
</script>
<style scoped lang="scss">
.home {
  display: flex;
}
</style>
