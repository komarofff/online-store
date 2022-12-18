<template>
  <aside class="filter">
    <div>
      <h1>I`m a filter section</h1>
      <!--      {{ getCategories }}-->
      <!--      {{ getBrands }}-->
      {{ getPrice }}
      {{ getStock }}
      {{ getSearchText }}
      <p>
        <button v-if="successCopyLink">Link was copied successfully</button>
        <button v-else @click="copyLink()">Copy link</button>
      </p>
      <p>
        <button @click="clearFilters()">Clear filters</button>
      </p>
      search text - {{ search }}

      <hr />
      queryCat- {{ queryCat }}
      <div>
        <h2>Categories</h2>
        <!--        categories - {{ categories }}-->
        <template v-for="cat in categories" :key="cat">
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
        <!--        {{ brands }}-->
        queryBrand - {{ queryBrand }}
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
      data: [],
      search: "",
      queryCat: [],
      queryBrand: [],
      queryPrice: [],
      queryStock: [],
      querySearch: this.search,
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
    await this.getAllCat();
    await this.getAllProd();
    await this.getPriceDiff(this.getAllProducts.products);
    await this.getStockDiff(this.getAllProducts.products);
    //?category=laptops&brand=apple&price=1249↕1749&stock=83↕92&search=sbsbdf&big=false
    //sort=discount-ASC sort=discount-DESC
    //sort=price-ASC sort=price-DESC
    //sort=rating-ASC sort=rating-DESC
    await this.getFilterParameters([
      {
        categories: ["smartphones", "laptops"],
        brands: ["Apple", "Samsung"],
        price: [2, 123],
        stock: [200, 1976],
        search: "",
        sort: "price-ASC",
      },
    ]);
    this.data = this.getAllProducts.products;
    this.priceMax = Math.max(...this.data.map((item) => item.price));
    this.priceMin = Math.min(...this.data.map((item) => item.price));
    this.stockMin = Math.min(...this.data.map((item) => item.stock));
    this.stockMax = Math.min(...this.data.map((item) => item.stock));

    this.emitter.on("newMinMaxPrice", (val) => {
      this.priceMin = val[0];
      this.priceMax = val[1];
    });
    this.emitter.on("newMinMaxStock", (val) => {
      this.stockMin = val[0];
      this.stockMax = val[1];
    });
    this.emitter.on("searchText", async (val) => {
      await this.getQueryText(val);
      this.search = val;
    });
    if (this.$route.query) {
      this.queryCat = this.$route.query.category
        ? this.$route.query.category.split("↕")
        : [];
      this.queryBrand = this.$route.query.brand
        ? this.$route.query.brand.split("↕")
        : [];
      this.queryPrice = this.$route.query.price
        ? this.$route.query.price.split("↕")
        : [];
      this.queryStock = this.$route.query.stock
        ? this.$route.query.stock.split("↕")
        : [];
    }
  },
  watch: {
    $route() {
      //  console.log("route", this.$route);
    },
    url() {
      return window.location.href;
    },
    search() {
      this.pushToRouter();
    },
  },
  computed: {
    ...mapGetters("Categories", ["getAllCategories"]),
    ...mapGetters("Products", ["getAllProducts"]),
    ...mapGetters("Filter", [
      "getProducts",
      "getCategories",
      "getBrands",
      "getPrice",
      "getStock",
      "getSearchText",
    ]),
    categories() {
      if (this.data) {
        return this.getAllCategories;
      } else {
        return "";
      }
    },
    brands() {
      if (this.data) {
        let brand = [];
        this.data.forEach((el) => {
          if (!brand.includes(el.brand)) {
            brand.push(el.brand);
          }
        });
        return brand;
      } else {
        return "";
      }
    },
  },
  methods: {
    ...mapActions("Categories", ["getAllCat"]),
    ...mapActions("Products", ["getAllProd"]),
    ...mapActions("Filter", [
      "getPriceDiff",
      "getStockDiff",
      "getFilterParameters",
      "getQueryText",
    ]),
    isActiveCat(val) {
      if (this.queryCat) {
        return this.queryCat.find((el) => {
          return el === val;
        });
      }
    },
    isActiveBrand(val) {
      if (this.queryBrand) {
        return this.queryBrand.find((el) => {
          return el === val;
        });
      }
    },
    pushToRouter() {
      //?category=laptops&brand=apple&price=1249↕1749&stock=83↕92&search=sbsbdf&big=false
      //sort=discount-ASC sort=discount-DESC
      //sort=price-ASC sort=price-DESC
      //sort=rating-ASC sort=rating-DESC
      this.$router.push({
        query: {
          category: this.queryCat.join("↕"),
          brand: this.queryBrand.join("↕"),
          price: this.queryPrice.join("↕"),
          stock: this.queryStock.join("↕"),
          search: this.search,
          big: false,
        },
      });
    },
    copyLink() {
      //copy router
      //console.log(linkToBuffer.href)
      //add link to buffer
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
      this.data = this.getAllProducts.products;
      this.priceMax = Math.max(...this.data.map((item) => item.price));
      this.priceMin = Math.min(...this.data.map((item) => item.price));
      this.stockMin = Math.min(...this.data.map((item) => item.stock));
      this.stockMax = Math.min(...this.data.map((item) => item.stock));
      this.search = "";
      this.queryCat = [];
      this.queryBrand = [];
      this.queryPrice = [];
      this.queryStock = [];
      this.querySearch = this.search;
      this.emitter.emit("changeCat", this.queryCat);
      this.emitter.emit("changeBrand", this.queryBrand);
      this.emitter.emit("changePrice", [this.priceMin, this.priceMax]);
      this.emitter.emit("changeStock", [this.stockMin, this.stockMax]);
      this.emitter.emit("changeCat", this.queryCat);
      this.emitter.emit("changeBrand", this.queryBrand);
      this.$router.push({
        query: {},
      });
      console.log("clear all filters");
    },
    changeCards() {
      //big false or true change size of cards
      this.pushToRouter();
    },
    sortPriceAsc() {
      // code
      this.pushToRouter();
    },
    sortPriceDESC() {
      // code
      this.pushToRouter();
    },
    sortRatingAsc() {
      // code
      this.pushToRouter();
    },
    sortRatingDESC() {
      // code
      this.pushToRouter();
    },
    sortDiscountAsc() {
      // code
      this.pushToRouter();
    },
    sortDiscountDESC() {
      // code
      this.pushToRouter();
    },
    changePriceMax() {
      this.queryPrice = [this.priceMin, this.priceMax];
      this.emitter.emit("changePrice", [this.priceMin, this.priceMax]);
      this.pushToRouter();
    },
    changePriceMin() {
      this.queryPrice = [this.priceMin, this.priceMax];
      this.emitter.emit("changePrice", [this.priceMin, this.priceMax]);
      this.pushToRouter();
    },
    changeStockMax() {
      this.queryStock = [this.stockMin, this.stockMax];
      this.emitter.emit("changeStock", [this.stockMin, this.stockMax]);
      this.pushToRouter();
    },
    changeStockMin() {
      this.queryStock = [this.stockMin, this.stockMax];
      this.emitter.emit("changeStock", [this.stockMin, this.stockMax]);
      this.pushToRouter();
    },
    changeCat(val) {
      if (!this.queryCat.includes(val)) {
        this.queryCat.push(val);
      } else {
        this.queryCat.splice(this.queryCat.indexOf(val), 1);
      }

      this.emitter.emit("changeCat", this.queryCat);
      this.pushToRouter();
    },
    changeBrand(val) {
      if (!this.queryBrand.includes(val)) {
        this.queryBrand.push(val);
      } else {
        this.queryBrand.splice(this.queryBrand.indexOf(val), 1);
      }
      this.emitter.emit("changeBrand", this.queryBrand);
      this.pushToRouter();
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
