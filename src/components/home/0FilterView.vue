<template>
  <aside class="main__home-filter">
    <div class="filter-button">
      <button class="filter-btn-resset" @click="clearFilters()">
        Reset Filters
      </button>

      <button class="filter-btn-copy" v-if="successCopyLink">
        Link was copied
      </button>
      <button class="filter-btn-copy" v-else @click="copyLink()">
        Copy Link
      </button>
    </div>
    <h3>Categories</h3>
    <ul class="checkbox-categories vertical-scroll">
      <template v-for="cat in getCategories" :key="cat">
        <li class="checkbox-flex">
          <div>
            <input
              type="checkbox"
              :id="cat"
              @change="changeCat(cat)"
              :checked="isActiveCat(cat)"
            />
            <label
              :for="cat"
              :class="{ 'gray-border': !showAllInFilter('category', cat) }"
              >{{ cat }}</label
            >
          </div>
          <div
            class="checkbox-count"
            :class="{ 'gray-color': !showAllInFilter('category', cat) }"
          >
            ({{ showAllInFilter("category", cat) }} /
            {{ showAllInItem("category", cat) }})
          </div>
        </li>
      </template>
    </ul>

    <h3>Brands</h3>
    <ul class="checkbox-categories vertical-scroll">
      <template v-for="brand in getBrands" :key="brand">
        <li class="checkbox-flex">
          <div>
            <input
              type="checkbox"
              :id="brand"
              @change="changeBrand(brand)"
              :checked="isActiveBrand(brand)"
            />
            <label
              :for="brand"
              :class="{ 'gray-border': !showAllInFilter('brand', brand) }"
              >{{ brand }}</label
            >
          </div>
          <div
            class="checkbox-count"
            :class="{ 'gray-color': !showAllInFilter('brand', brand) }"
          >
            ({{ showAllInFilter("brand", brand) }} /
            {{ showAllInItem("brand", brand) }})
          </div>
        </li>
      </template>
    </ul>

    <h3>Price</h3>
    <div class="range price">
      <p class="range-price-to">€{{ priceMin }}</p>
      <p class="range-price-from">€{{ priceMax }}</p>
    </div>
    <div class="multi-range border-bottom">
      <input
        type="range"
        :min="startPrice[0]"
        :max="startPrice[1]"
        v-model="priceMin"
        @input="changePriceRange()"
      />
      <input
        id="555"
        type="range"
        :min="startPrice[0]"
        :max="startPrice[1]"
        v-model="priceMax"
        @input="changePriceRange()"
      />
    </div>

    <h3>Stock</h3>
    <div class="range stock">
      <p class="range-stock-to">{{ stockMin }}</p>
      <p class="range-stock-from">{{ stockMax }}</p>
    </div>
    <div class="multi-range">
      <input
        type="range"
        :min="startStock[0]"
        :max="startStock[1]"
        v-model="stockMin"
        @input="changeStockRange()"
      />
      <input
        type="range"
        :min="startStock[0]"
        :max="startStock[1]"
        v-model="stockMax"
        @input="changeStockRange()"
      />
    </div>
  </aside>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "FilterView",
  //props: ["products"],
  data() {
    return {
      firstQuery: {
        categories: [],
        brands: [],
        price: [],
        stock: [],
        search: "",
        sort: "",
        big: "",
      },
      startPrice: [],
      startStock: [],
      startQuery: {
        categories: [],
        brands: [],
        price: [],
        stock: [],
        search: "",
        sort: "",
        big: "",
      },
      startQueryData: null,
      url: window.location.href,
      successCopyLink: false,
      big: true,
      priceMax: 0,
      priceMin: 0,
      stockMin: 0,
      stockMax: 0,
      dataItems: 0,
      isFound: true,
    };
  },
  async mounted() {
    this.isLoader = true;
    await this.getAllProd();

    ////////////////////////////
    // price and stock
    this.changeForPriceAndStock();
    //  делаем startQuery в зависимости от адресной строки
    this.startQueryData = Object.entries(this.$route.query);
    if (this.startQueryData.length > 0) {
      console.log("start with query parameters");
      this.startQueryData.forEach((el) => {
        if (el[1] && !el[1].includes("||")) {
          this.startQuery[el[0]] = el[1];
          if (!this.getQueryForFilters[el[0]]) {
            this.getQueryForFilters[el[0]] = [el[1]];
          } else {
            if (!this.getQueryForFilters[el[0]].includes(el[1])) {
              this.getQueryForFilters[el[0]].push(el[1]);
            } else if (typeof this.getQueryForFilters[el[0]] !== "string") {
              this.getQueryForFilters[el[0]].splice(
                this.getQueryForFilters[el[0]].indexOf(el[1]),
                1
              );
            } else {
              this.getQueryForFilters[el[0]] = "";
            }
          }
        } else if (el[1] && el[1].includes("||")) {
          this.startQuery[el[0]] = el[1].split("||");
          if (!this.getQueryForFilters[el[0]]) {
            this.getQueryForFilters[el[0]] = [el[1].split("||")];
          } else {
            if (!this.getQueryForFilters[el[0]].includes(el[1].split("||"))) {
              this.getQueryForFilters[el[0]].push(el[1].split("||"));
            } else {
              this.getQueryForFilters[el[0]].splice(
                this.getQueryForFilters[el[0]].indexOf(el[1].split("||")),
                1
              );
            }
          }
        }
      });
      await this.getQuery(this.startQuery);
      await this.getFilterParameters(this.startQuery);

      // price and stock
      this.changeForPriceAndStock();
    } else {
      await this.getQuery(this.firstQuery);
      await this.getFilterParameters(this.firstQuery);

      await this.changeForPriceAndStock();
    }

    this.emitter.on("changeSearch", (data) => {
      this.pushToRouter("search", data);
    });
    this.emitter.on("changePriceData", () => {
      this.changeForPriceAndStock();
    });
    this.emitter.on("resetFilters", () => {
      this.clearFilters();
    });
    this.emitter.on("changeSort", (val) => {
      this.changeSort(val);
    });
    this.emitter.on("changeCards", (val) => {
      this.changeSizeOfCards(val);
    });
  },
  watch: {
    priceMin() {
      if (this.priceMin >= this.priceMax) {
        while (this.priceMin > this.priceMax) {
          this.priceMin--;
        }
      }
    },
    priceMax() {
      if (this.priceMax <= this.priceMin) {
        while (this.priceMax < this.priceMin) {
          this.priceMax++;
        }
      }
    },
    stockMin() {
      if (this.stockMin >= this.stockMax) {
        while (this.stockMin > this.stockMax) {
          this.stockMin--;
        }
      }
    },
    stockMax() {
      if (this.stockMax <= this.stockMin) {
        while (this.stockMax < this.stockMin) {
          this.stockMax++;
        }
      }
    },
    $route() {
      //console.log("route", this.$route);
      //this.clearFilters();
      // this.emitter.on("changeSort", (val) => {
      //   this.changeSort(val);
      // });
    },
    getFilterData() {
      if (this.startPrice.length === 0 && this.startStock.length === 0) {
        this.getPriceDiff(this.getAllProducts);
        this.getStockDiff(this.getAllProducts);
        this.startPrice = this.getPrice;
        this.startStock = this.getStock;
        this.changeForPriceAndStock();
      }
      this.dataItems = this.getFilterData.length;
    },
    getAllProducts() {
      return this.getAllProducts;
    },
    dataItems() {
      if (this.dataItems === 0) {
        this.isFound = false;
      } else {
        this.isFound = true;
      }
    },
  },
  computed: {
    ...mapGetters("Filter", [
      "getAllProducts",
      "getCategories",
      "getBrands",
      "getPrice",
      "getStock",
      "getFilterData",
      "getQueryForFilters",
    ]),
  },
  methods: {
    ...mapActions("Filter", [
      "getAllProd",
      "getQuery",
      "getPriceDiff",
      "getStockDiff",
      "getFilterParameters",
    ]),
    showAllInItem(item, val) {
      return this.getAllProducts.filter((el) => el[item] === val).length;
    },
    showAllInFilter(item, val) {
      return this.getFilterData.filter((el) => el[item] === val).length;
    },
    isActiveCat(val) {
      //console.log("this.getQueryForFilters", this.getQueryForFilters);
      if (this.getQueryForFilters.categories) {
        if (typeof this.getQueryForFilters.categories === "string") {
          return this.getQueryForFilters.categories === val;
        } else {
          return this.getQueryForFilters.categories.find((el) => {
            return el === val;
          });
        }
      }
    },
    isActiveBrand(val) {
      if (this.getQueryForFilters.brands) {
        if (typeof this.getQueryForFilters.brands === "string") {
          return this.getQueryForFilters.brands === val;
        } else {
          return this.getQueryForFilters.brands.find((el) => {
            return el === val;
          });
        }
      }
    },

    pushToRouter(key, value) {
      let queries = JSON.parse(JSON.stringify(this.$route.query));
      if (value.length) {
        if (value && typeof value === "string") {
          queries[key] = value;
          this.$router.replace({ query: queries });
        } else if (value.length !== 0 && typeof value !== "string") {
          queries[key] = value.join("||");
          this.$router.replace({ query: queries });
        }
      } else {
        delete queries[key];
        this.$router.replace({ query: queries });
      }
    },
    copyLink() {
      navigator.clipboard.writeText(window.location.href).then(() => {
        //success
        this.successCopyLink = true;
        setTimeout(() => {
          this.successCopyLink = false;
        }, 2000);
      });
    },
    async clearFilters() {
      //clear all filters
      await this.getQuery({
        categories: [],
        brands: [],
        price: [],
        stock: [],
        search: "",
        sort: "",
      });
      await this.getFilterParameters(this.getQueryForFilters);

      this.changeForPriceAndStock();
      this.emitter.emit("clearSearch");
      console.log("clear all filters");
      this.$router.push({
        query: {},
      });
      this.emitter.emit("clearUrls");

      this.$router.push(this.$route.path);
    },
    async changeCat(val) {
      if (!this.getQueryForFilters.categories) {
        this.getQueryForFilters.categories = [val];
      } else {
        if (!this.getQueryForFilters.categories.includes(val)) {
          this.getQueryForFilters.categories.push(val);
        } else {
          this.getQueryForFilters.categories.splice(
            this.getQueryForFilters.categories.indexOf(val),
            1
          );
        }
      }

      await this.changeQuery();
      this.changeForPriceAndStock();
      this.pushToRouter("categories", this.getQueryForFilters.categories);
    },
    async changeBrand(val) {
      if (!this.getQueryForFilters.brands) {
        this.getQueryForFilters.brands = [val];
      } else {
        if (!this.getQueryForFilters.brands.includes(val)) {
          this.getQueryForFilters.brands.push(val);
        } else {
          this.getQueryForFilters.brands.splice(
            this.getQueryForFilters.brands.indexOf(val),
            1
          );
        }
      }
      await this.changeQuery();
      this.changeForPriceAndStock();
      this.pushToRouter("brands", this.getQueryForFilters.brands);
    },
    async changePriceRange() {
      this.getQueryForFilters.price = [this.priceMin, this.priceMax];
      await this.changeQuery();
      this.changeForStock();
      this.pushToRouter("price", this.getQueryForFilters.price);
    },
    async changeStockRange() {
      this.getQueryForFilters.stock = [this.stockMin, this.stockMax];
      await this.changeQuery();
      this.changeForPrice();
      this.pushToRouter("stock", this.getQueryForFilters.stock);
    },
    async changeSort(sortVariable) {
      this.getQueryForFilters.sort = sortVariable;
      //await this.changeQuery();
      this.pushToRouter("sort", sortVariable);
    },
    async changeSizeOfCards(big) {
      let bigData;
      big ? (bigData = "true") : (bigData = "false");
      this.getQueryForFilters.big = bigData;
      this.pushToRouter("big", bigData);
    },
    async changeForPriceAndStock() {
      await this.getPriceDiff(this.getFilterData);
      await this.getStockDiff(this.getFilterData);
      this.priceMax = this.getPrice[1];
      this.priceMin = this.getPrice[0];
      this.stockMin = this.getStock[0];
      this.stockMax = this.getStock[1];
    },
    async changeForStock() {
      await this.getStockDiff(this.getFilterData);
      this.stockMin = this.getStock[0];
      this.stockMax = this.getStock[1];
    },
    async changeForPrice() {
      await this.getPriceDiff(this.getFilterData);
      this.priceMax = this.getPrice[1];
      this.priceMin = this.getPrice[0];
    },
    async changeQuery() {
      await this.getQuery(this.getQueryForFilters);
      await this.getFilterParameters(this.getQueryForFilters);

      //this.pushToRouter();
    },
  },
};
</script>

<style scoped lang="scss"></style>
