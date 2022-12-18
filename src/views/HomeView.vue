<template>
  <img v-if="isLoader" src="../assets/loader.gif" alt="loader" />
  <div class="home container">
    <FilterView :products="getAllProducts.products"></FilterView>
    <CenterSection></CenterSection>
  </div>
</template>

<script>
import FilterView from "@/components/home/FilterView";
import CenterSection from "@/components/home/CenterSection";
import { mapActions, mapGetters } from "vuex";

export default {
  data() {
    return {
      isLoader: false,
    };
  },
  async mounted() {
    this.isLoader = true;
    await this.getAllProd();
    this.isLoader = false;
  },
  computed: {
    ...mapGetters("Products", ["getAllProducts"]),
  },
  methods: {
    ...mapActions("Products", ["getAllProd"]),
  },
  components: { FilterView, CenterSection },
};
</script>
<style scoped lang="scss">
.home {
  display: flex;
}
</style>
