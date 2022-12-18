<template>
  <aside class="filter">
    <div>
      <h1>I`m a filter section</h1>
      search text - {{ search }}

      <hr />
      queryCat- {{ queryCat }}
      <div>
        <h2>Categories</h2>
        <!--        categories - {{ categories }}-->
        <template v-for="cat in categories" :key="cat">
          <p>
            <label
              ><input type="checkbox" @change="changeCat(cat)" />{{
                cat
              }}</label
            >
          </p>
        </template>
      </div>
      <hr />
      <div>
        <h2>Brands</h2>
        <!--        {{ brands }}-->
        queryBrand - {{ queryBrand }}
        <template v-for="brand in brands" :key="brand">
          <p>
            <label
              ><input type="checkbox" @change="changeBrand(brand)" />{{
                brand
              }}</label
            >
          </p>
        </template>
      </div>
      <hr />
      <div>
        <h2>Price</h2>
        min- {{ priceMin }} | max- {{ priceMax }}
      </div>
      <hr />
      <div>
        <h2>Stock</h2>
        min- {{ stockMin }} | max- {{ stockMax }}
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
      priceMax: 0,
      priceMin: 0,
      stockMin: 0,
      stockMax: 0,
    };
  },
  async mounted() {
    await this.getAllCat();
    await this.getAllProd();
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
    this.emitter.on("searchText", (val) => {
      this.search = val;
    });
    if (this.query) {
      this.queryCat = this.$route.query.category.join("|");
      this.queryBrand = this.$route.query.brand.join("|");
    }
  },
  watch: {},
  computed: {
    ...mapGetters("Categories", ["getAllCategories"]),
    ...mapGetters("Products", ["getAllProducts"]),
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
    changeCat(val) {
      if (!this.queryCat.includes(val)) {
        this.queryCat.push(val);
      } else {
        this.queryCat.splice(this.queryCat.indexOf(val), 1);
      }
      this.emitter.emit("changeCat", this.queryCat);
    },
    changeBrand(val) {
      if (!this.queryBrand.includes(val)) {
        this.queryBrand.push(val);
      } else {
        this.queryBrand.splice(this.queryBrand.indexOf(val), 1);
      }
      this.emitter.emit("changeBrand", this.queryBrand);
    },
    priceT(min, max) {
      this.emitter.emit("changePrice", [min, max]);
    },
    stockT(min, max) {
      this.emitter.emit("changeStock", [min, max]);
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
