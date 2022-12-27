<template>
  <div class="container">
    <div class="main__home">
      <FilterView></FilterView>
      <CenterSection></CenterSection>
    </div>
  </div>
</template>

<script>
import FilterView from "@/components/home/FilterView.vue";
import CenterSection from "@/components/home/CenterSection.vue";

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
.card-brand,
.card-category,
.card-rating,
.card-stock {
  margin: 0;
  font-size: 14px;
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
  right: -29px;
  top: -3px;
  width: 18px;
  padding: 8px 0 8px 0;
  border: 1px solid #2196f3;
  background-color: #e3f2fd;
  border-top-right-radius: 13px;
  border-bottom-right-radius: 13px;
  p {
    margin: 4px 0 0 0;
    writing-mode: vertical-rl;
    font-size: 11px;
  }
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
@media (max-width: 625px) {
  .card-container {
    grid-template-columns: 1fr;
    .card-item {
      max-width: 100%;
    }

    .card-photo {
      width: 100%;
      height: unset;
      overflow: hidden;
    }
  }
  .small-cards {
    grid-template-columns: 1fr !important;

    .card-item {
      max-width: 100%;
    }

    .card-photo {
      width: 100%;
      height: unset;
      overflow: hidden;
    }
    .card-brand,
    .card-category,
    .card-rating,
    .card-stock {
      margin: 0;
      font-size: 14px;
    }
  }
}
</style>
