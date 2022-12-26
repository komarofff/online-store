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
<style lang="scss">
::placeholder {
  font-size: 13px;
  color: #bbb;
}
.main__home-filter {
  background: #fff;
  transition: 0.5s linear;
  z-index: 15;
}
.relative {
  position: relative;
}
.filter {
  display: none !important;
  position: absolute !important;
  right: -35px;
}
.home-menu {
  gap: 10px;
}
@media (max-width: 890px) {
  .home-menu-img {
    display: none;
  }
}
@media (max-width: 890px) {
  .home-menu {
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 10px;
  }
  .home-menu-search {
    order: -1;
  }
}
@media (max-width: 768px) {
  .filter {
    display: block !important;
  }
  .main__home-filter {
    transition: 0.3s ease-in-out;
    position: absolute;
    transform: translateX(-101.5%);
    min-width: 75vw;
  }
  .filter-hide {
    transform: translateX(-101.5%);
  }
  .filter-show {
    transform: translateX(0%);
  }
}
</style>
