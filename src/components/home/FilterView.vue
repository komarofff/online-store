<template>
  <aside class="filter">
    <div>
      <h1>I`m a filter section</h1>
      <!--      {{ getCategories }}-->
      <!--      {{ getBrands }}-->
      {{ getPrice }}
      {{ getStock }}
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
        min-
        <input type="number" v-model="priceMin" @input="changePriceMin()" />|
        max-
        <input type="number" v-model="priceMax" @input="changePriceMax()" />
      </div>
      <hr />
      <div>
        <h2>Stock</h2>
        min-
        <input type="number" v-model="stockMin" @input="changeStockMin()" />|
        max-
        <input type="number" v-model="stockMax" @input="changeStockMax()" />
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
      url: window.location.href,
      successCopyLink: false,
      big: true,
      priceMax: 0,
      priceMin: 0,
      stockMin: 0,
      stockMax: 0,
    };
  },
  async mounted() {
    this.isLoader = true;
    // делаем запрос без параметров и получаем все продукты
    await this.getAllProd();
    await this.getAllBrands();
    await this.getAllCat();
    // await this.getQuery(this.firstQuery);
    await this.getQuery(this.firstQuery);
    await this.getFilterParameters(this.firstQuery);
    // если надо отправляем указанный параметр в фильтр изначально. например формируем фильтр из адресной строки
    //  и потом вывываем данные из фильтра НО уже с ПАРАМЕТРАМИ
    //await this.getQuery(this.getQueryForFilters);
    //await this.getFilterParameters(this.getQueryForFilters);

    // price and stock
    await this.getPriceDiff(this.getFilterData);
    await this.getStockDiff(this.getFilterData);
    this.priceMax = this.getPrice[1];
    this.priceMin = this.getPrice[0];
    this.stockMin = this.getStock[0];
    this.stockMax = this.getStock[1];
    // search query
    // filter query with parameters
    //?category=laptops&brand=apple&price=1249↕1749&stock=83↕92&search=sbsbdf&big=false
    //sort=discount-ASC sort=discount-DESC
    //sort=price-ASC sort=price-DESC
    //sort=rating-ASC sort=rating-DESC
    // await this.getFilterParameters([
    //   {
    //     categories: ["smartphones", "laptops"],
    //     brands: ["Apple", "Samsung"],
    //     price: [2, 123],
    //     stock: [200, 1976],
    //     search: "",
    //     sort: "price-ASC",
    //   },
    // ]);
  },
  watch: {
    $route() {
      //  console.log("route", this.$route);
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
      "getAllBrands",
      "getAllCat",
      "getAllProd",
      "getQuery",
      "getPriceDiff",
      "getStockDiff",
      "getFilterParameters",
    ]),
    isActiveCat(val) {
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
    pushToRouter() {
      //?category=laptops&brand=apple&price=1249↕1749&stock=83↕92&search=sbsbdf&big=false
      //sort=discount-ASC sort=discount-DESC
      //sort=price-ASC sort=price-DESC
      //sort=rating-ASC sort=rating-DESC
      // this.$router.push({
      //   query: {
      //     category: this.queryCat.join("↕"),
      //     brand: this.queryBrand.join("↕"),
      //     price: this.queryPrice.join("↕"),
      //     stock: this.queryStock.join("↕"),
      //     search: this.search,
      //     big: false,
      //   },
      // });
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
    clearFilters() {
      // clear all filters
      // this.data = this.getAllProducts.products;
      // this.priceMax = Math.max(...this.data.map((item) => item.price));
      // this.priceMin = Math.min(...this.data.map((item) => item.price));
      // this.stockMin = Math.min(...this.data.map((item) => item.stock));
      // this.stockMax = Math.min(...this.data.map((item) => item.stock));
      // this.search = "";
      // this.queryCat = [];
      // this.queryBrand = [];
      // this.queryPrice = [];
      // this.queryStock = [];
      // this.querySearch = this.search;
      // this.emitter.emit("changeCat", this.queryCat);
      // this.emitter.emit("changeBrand", this.queryBrand);
      // this.emitter.emit("changePrice", [this.priceMin, this.priceMax]);
      // this.emitter.emit("changeStock", [this.stockMin, this.stockMax]);
      // this.emitter.emit("changeCat", this.queryCat);
      // this.emitter.emit("changeBrand", this.queryBrand);
      // this.$router.push({
      //   query: {},
      // });
      console.log("clear all filters");
    },
    //
    // changePriceMax() {},
    // changePriceMin() {},
    // changeStockMax() {},
    // changeStockMin() {},
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
      // if (!this.getQueryForFilters.categories.length) {
      //   delete this.getQueryForFilters.categories;
      // }

      await this.getQuery(this.getQueryForFilters);
      await this.getFilterParameters(this.getQueryForFilters);
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
      // if (!this.getQueryForFilters.brands.length) {
      //   delete this.getQueryForFilters.brands;
      // }
      await this.getQuery(this.getQueryForFilters);
      await this.getFilterParameters(this.getQueryForFilters);
    },
    async changePriceMin() {
      await this.getQuery(this.getQueryForFilters);
      await this.getFilterParameters(this.getQueryForFilters);
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
