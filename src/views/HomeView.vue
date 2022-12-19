<template>
  <div class="home container">
    <FilterView></FilterView>
    <CenterSection></CenterSection>
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
  computed: {},
  methods: {},
  components: { FilterView, CenterSection },
};
</script>
<style scoped lang="scss">
.home {
  display: flex;
}
</style>
