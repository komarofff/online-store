<template>
  <aside class="filter">
    <div>
      <h1>I`m a filter section</h1>
      <p>Found items: {{ dataItems }}</p>
      <!--      {{ getCategories }}-->
      <!--      {{ getBrands }}-->

      <p>
        <button v-if="successCopyLink">Link was copied successfully</button>
        <button v-else @click="copyLink()">Copy link</button>
      </p>
      <p>
        <button @click="clearFilters()">Clear filters</button>
      </p>

      <hr />
      <div>
        <h2>Categories</h2>
        <!--        categories - {{ categories }}-->
        <template v-for="cat in getCategories" :key="cat">
          <p>
            <label
              ><input
                type="checkbox"
                @change="changeCat(cat)"
                :checked="isActiveCat(cat)"
              />{{ cat }}</label
            >
          </p>
        </template>
      </div>
      <hr />
      <div>
        <h2>Brands</h2>
        <template v-for="brand in getBrands" :key="brand">
          <p>
            <label
              ><input
                type="checkbox"
                @change="changeBrand(brand)"
                :checked="isActiveBrand(brand)"
              />{{ brand }}</label
            >
          </p>
        </template>
      </div>
      <hr />
      <div>
        <h2>Price</h2>
        <p>{{ startPrice }}</p>

        <div v-if="isFound">
          min-
          <input type="number" v-model="priceMin" @input="changePriceMin()" />|
          max-
          <input type="number" v-model="priceMax" @input="changePriceMax()" />
        </div>
        <div v-else>No found items</div>
      </div>
      <hr />
      <div>
        <h2>Stock</h2>
        <p>{{ startStock }}</p>
        <div v-if="isFound">
          min-
          <input type="number" v-model="stockMin" @input="changeStockMin()" />|
          max-
          <input type="number" v-model="stockMax" @input="changeStockMax()" />
        </div>
        <div v-else>No found items</div>
      </div>
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

    // await this.getPriceDiff(this.getFilterData);
    // await this.getStockDiff(this.getFilterData);
    // this.startPrice = this.getPrice;
    // this.startStock = this.getStock;
    // this.changeForPriceAndStock();
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
      await this.getQuery({
        categories: [],
        brands: [],
        price: [],
        stock: [],
        search: "",
        sort: "",
      });
      await this.getFilterParameters({
        categories: [],
        brands: [],
        price: [],
        stock: [],
        search: "",
        sort: "",
      });
      await this.changeForPriceAndStock();
    }

    this.emitter.on("changeSearch", (data) => {
      this.pushToRouter("search", data);
    });
    this.emitter.on("changePriceData", () => {
      this.changeForPriceAndStock();
    });
  },
  watch: {
    $route() {
      // console.log("route", this.$route, to, from);
      //this.clearFilters();
    },
    getFilterData() {
      if (this.startPrice.length === 0 && this.startStock.length === 0) {
        this.getPriceDiff(this.getFilterData);
        this.getStockDiff(this.getFilterData);
        this.startPrice = this.getPrice;
        this.startStock = this.getStock;
        this.changeForPriceAndStock();
      }
      this.dataItems = this.getFilterData.length;
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
    isActiveCat(val) {
      //console.log("this.getQueryForFilters", this.getQueryForFilters);
      if (this.getQueryForFilters.categories) {
        return this.getQueryForFilters.categories.find((el) => {
          return el === val;
        });
      }
    },
    isActiveBrand(val) {
      if (this.getQueryForFilters.brands) {
        return this.getQueryForFilters.brands.find((el) => {
          return el === val;
        });
      }
    },

    pushToRouter(key, value) {
      //?category=laptops&brand=apple&price=1249||1749&stock=83||92&search=sbsbdf&big=false
      //sort=discount-ASC sort=discount-DESC
      //sort=price-ASC sort=price-DESC
      //sort=rating-ASC sort=rating-DESC
      //query.categories
      // this.$router.push({
      //   query: {
      //     categories: this.getQueryForFilters.categories.join("||"),
      //     brands: this.getQueryForFilters.brands.join("||"),
      //     price: this.getQueryForFilters.price.join("||"),
      //     stock: this.getQueryForFilters.stock.join("||"),
      //     search: this.getQueryForFilters.search,
      //     sort: this.getQueryForFilters.sort,
      //     big: false,
      //   },
      // });
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

      this.changeQuery();
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
      this.changeQuery();
      this.changeForPriceAndStock();
      this.pushToRouter("brands", this.getQueryForFilters.brands);
    },
    async changePriceMin() {
      this.getQueryForFilters.price = [this.priceMin, this.priceMax];
      this.changeQuery();
      this.pushToRouter("price", this.getQueryForFilters.price);
    },
    async changePriceMax() {
      this.getQueryForFilters.price = [this.priceMin, this.priceMax];
      this.changeQuery();
      this.pushToRouter("price", this.getQueryForFilters.price);
    },
    async changeStockMin() {
      this.getQueryForFilters.stock = [this.stockMin, this.stockMax];
      this.changeQuery();
      this.pushToRouter("stock", this.getQueryForFilters.stock);
    },
    async changeStockMax() {
      this.getQueryForFilters.stock = [this.stockMin, this.stockMax];
      this.changeQuery();
      this.pushToRouter("stock", this.getQueryForFilters.stock);
    },
    async changeSort() {
      //this.getQueryForFilters.sort = sortVariable;
      //this.changeQuery();
      //this.pushToRouter("sort", value);
    },
    async changeSizeOfCards() {
      //this.pushToRouter("big", value);
    },
    async changeForPriceAndStock() {
      await this.getPriceDiff(this.getFilterData);
      await this.getStockDiff(this.getFilterData);
      this.priceMax = this.getPrice[1];
      this.priceMin = this.getPrice[0];
      this.stockMin = this.getStock[0];
      this.stockMax = this.getStock[1];
    },
    async changeQuery() {
      await this.getQuery(this.getQueryForFilters);
      await this.getFilterParameters(this.getQueryForFilters);
      //this.pushToRouter();
    },
  },
};
</script>

<style scoped lang="scss">
.filter {
  align-self: stretch;
  flex-basis: 20%;
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
}

hr {
  margin: 20px 0;
}

aside {
  border: 1px solid red;
}
</style>
