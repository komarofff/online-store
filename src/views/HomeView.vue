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

export default {
  data() {
    return {
      isLoader: false,
    };
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
    emitToResetFilters() {
      this.emitter.emit("resetFilters");
    },
  },
  components: { FilterView, CenterSection },
};
</script>
<style scoped lang="scss">
::placeholder {
  font-size: 13px;
  color: #bbb;
}
</style>
