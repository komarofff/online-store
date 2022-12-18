<template>
  <div class="center">
    <h1>Products list</h1>
    <img v-if="isLoader" src="../../assets/loader.gif" alt="loader" />
    <input type="text" v-model="searchText" />
    <div class="center-section">
      {{ data }}
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  data() {
    return {
      isLoader: false,
      searchText: null,
      fullData: [],
      data: [],
      isHaveChangesForCategories: false,
      dataForCategoriesFilter: null,
      isHaveChangesForBrands: false,
      dataForBrandsFilter: null,
      isHaveChangesForPrice: false,
      dataForPriceFilter: [],
      isHaveChangesStock: false,
      dataForStockFilter: [],
    };
  },
  async mounted() {
    this.isLoader = true;
    await this.getAllProd();
    this.isLoader = false;

    this.fullData = this.getAllProducts.products;
    this.data = this.fullData;
    this.dataForPriceFilter[0] = this.getMinPrice(this.data);
    this.dataForPriceFilter[1] = this.getMaxPrice(this.data);
    this.dataForStockFilter[0] = this.getMinStock(this.data);
    this.dataForStockFilter[1] = this.getMaxStock(this.data);

    this.emitter.on("changeCat", (val) => {
      console.log("change category");
      if (val.length) {
        this.isHaveChangesForCategories = true;
        this.dataForCategoriesFilter = val;
        this.getFiltersData();
      } else {
        this.isHaveChangesForCategories = false;
        this.getFiltersData();
        //this.data = this.fullData;
      }
    });
    this.emitter.on("changeBrand", (val) => {
      console.log("change brand");
      if (val.length) {
        this.isHaveChangesForBrands = true;
        this.dataForBrandsFilter = val;
        this.getFiltersData();
      } else {
        this.isHaveChangesForBrands = false;
        //this.data = this.fullData;
        this.getFiltersData();
      }
    });

    this.emitter.on("changePrice", (min, max) => {
      console.log("changePrice");
      if (
        min !== this.dataForPriceFilter[0][0] ||
        max !== this.dataForPriceFilter[0][1]
      ) {
        this.isHaveChangesForPrice = true;
        this.dataForPriceFilter[0] = min;
        this.dataForPriceFilter[1] = max;
        this.getFiltersData();
      } else {
        this.isHaveChangesForPrice = false;
        this.getFiltersData();
      }
      // this.data = this.fullData.filter(
      //   (el) => el.price >= min && el.price <= max
      // );
    });
    this.emitter.on("changeStock", (min, max) => {
      console.log("changeStock");
      if (
        min !== this.dataForStockFilter[0][0] ||
        max !== this.dataForStockFilter[0][1]
      ) {
        this.isHaveChangesStock = true;
        this.dataForStockFilter[0] = min;
        this.dataForStockFilter[1] = max;
        this.getFiltersData();
      } else {
        this.isHaveChangesStock = false;
        this.getFiltersData();
      }
      // this.data = this.fullData.filter(
      //   (el) => el.stock >= min && el.stock <= max
      // );
    });
  },
  watch: {
    searchText() {
      this.emitSearch();
    },
  },
  computed: {
    ...mapGetters("Products", ["getAllProducts"]),
  },
  methods: {
    ...mapActions("Products", ["getAllProd"]),
    emitSearch() {
      this.emitter.emit("searchText", this.searchText);
    },
    startEmitPriceStock(arr) {
      let maxPrice = this.getMaxPrice(arr);
      let minPrice = this.getMinPrice(arr);
      let maxStock = this.getMaxStock(arr);
      let minStock = this.getMinStock(arr);
      this.dataForPriceFilter[0] = minPrice;
      this.dataForPriceFilter[1] = maxPrice;
      this.dataForStockFilter[0] = minStock;
      this.dataForStockFilter[1] = maxStock;
      this.emitter.emit("newMinMaxPrice", [minPrice, maxPrice]);
      this.emitter.emit("newMinMaxStock", [minStock, maxStock]);
    },
    getMaxPrice(data) {
      if (data.length) {
        return Math.max(...data.map((item) => item.price));
      } else {
        return 0;
      }
    },
    getMinPrice(data) {
      if (data.length) {
        return Math.min(...data.map((item) => item.price));
      } else {
        return 0;
      }
    },
    getMaxStock(data) {
      if (data.length) {
        return Math.max(...data.map((item) => item.stock));
      } else {
        return 0;
      }
    },
    getMinStock(data) {
      if (data.length) {
        return Math.min(...data.map((item) => item.stock));
      } else {
        return 0;
      }
    },
    getFiltersData() {
      //здесь объединяем все фильтры в зависимости от того что какой фильтр включён
      if (!this.isHaveChangesForBrands && !this.isHaveChangesForCategories) {
        console.log("1-", this.dataForPriceFilter[0]);
        console.log("2-", this.dataForStockFilter[0]);
        // this.data = this.fullData.filter(
        //   (el) =>
        //     el.price >= this.dataForPriceFilter[0][0] &&
        //     el.price <= this.dataForPriceFilter[0][1]
        // );
        this.data = this.fullData;
      }
      if (!this.isHaveChangesForBrands && this.isHaveChangesForCategories) {
        this.data = this.fullData.filter((el) => {
          for (let i = 0; i < this.dataForCategoriesFilter.length; i++) {
            if (
              el.category.toUpperCase() ===
              this.dataForCategoriesFilter[i].toUpperCase()
            ) {
              return el;
            }
          }
        });
        this.startEmitPriceStock(this.data);
      }
      if (this.isHaveChangesForBrands && !this.isHaveChangesForCategories) {
        this.data = this.fullData.filter((el) => {
          for (let i = 0; i < this.dataForBrandsFilter.length; i++) {
            if (
              el.brand.toUpperCase() ===
              this.dataForBrandsFilter[i].toUpperCase()
            ) {
              return el;
            }
          }
        });
        this.startEmitPriceStock(this.data);
      }

      if (this.isHaveChangesForBrands && this.isHaveChangesForCategories) {
        this.data = this.fullData.filter((el) => {
          for (let i = 0; i < this.dataForCategoriesFilter.length; i++) {
            for (let q = 0; q < this.dataForBrandsFilter.length; q++) {
              if (
                el.category.toUpperCase() ===
                  this.dataForCategoriesFilter[i].toUpperCase() &&
                el.brand.toUpperCase() ===
                  this.dataForBrandsFilter[q].toUpperCase()
              ) {
                return el;
              }
            }
          }
        });
        this.startEmitPriceStock(this.data);
      }
    },
  },
  components: {},
};
</script>

<style scoped lang="scss">
.center-section {
  flex-basis: 80%;
  display: flex;
  flex-direction: column;
}
</style>
