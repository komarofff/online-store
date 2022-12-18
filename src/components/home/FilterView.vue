<template>
  <aside class="filter">
    <div>
      <h1>I`m a filter section</h1>
      search text - {{ search }}
      <hr />
      <div>
        <h2>Categories</h2>
        categories - {{ categories }}
      </div>
      <hr />
      <div>
        <h2>Brands</h2>
        {{ brands }}
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
  props: ["products"],
  data() {
    return {
      data: this.products,
      search: "",
    };
  },
  async beforeMount() {
    await this.getAllCat();
  },
  mounted() {
    this.emitter.on("searchText", (val) => {
      this.search = val;
    });
  },
  watch: {
    // data() {
    //   return this.products.length;
    // },
  },
  computed: {
    ...mapGetters("Categories", ["getAllCategories"]),
    // data() {
    //   return this.products;
    // },
    categories() {
      if (this.products) {
        return this.getAllCategories;
      } else {
        return "";
      }
    },
    brands() {
      if (this.products) {
        let brand = [];
        this.products.forEach((el) => {
          if (!brand.includes(el.brand)) {
            brand.push(el.brand);
          }
        });
        return brand;
      } else {
        return "";
      }
    },
    priceMax() {
      if (this.products) {
        return Math.max(...this.products.map((item) => item.price));
      } else {
        return 0;
      }
    },
    priceMin() {
      if (this.products) {
        return Math.min(...this.products.map((item) => item.price));
      } else {
        return 0;
      }
    },
    stockMax() {
      if (this.products) {
        return Math.max(...this.products.map((item) => item.stock));
      } else {
        return 0;
      }
    },
    stockMin() {
      if (this.products) {
        return Math.min(...this.products.map((item) => item.stock));
      } else {
        return 0;
      }
    },
  },
  methods: {
    ...mapActions("Categories", ["getAllCat"]),
    categoriesT(val) {
      this.emitter.emit("categories", val);
    },
    brandT(val) {
      this.emitter.emit("brand", val);
    },
    priceT(min, max) {
      this.emitter.emit("price", [min, max]);
    },
    stockT(min, max) {
      this.emitter.emit("stock", [min, max]);
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
