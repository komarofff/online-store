<template>
  <div class="center">
    <h1>Products list</h1>
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
      loading: false,
      searchText: null,
      fullData: [],
      data: [],
    };
  },
  async mounted() {
    this.isLoader = true;
    await this.getAllProd();
    this.isLoader = false;

    this.fullData = this.getAllProducts.products;
    this.data = this.fullData;
    //console.log("this.data", this.data);
    this.emitter.on("changeCat", (val) => {
      if (val.length) {
        this.data = this.fullData.filter((el) => {
          for (let i = 0; i < val.length; i++) {
            if (el.category === val[i]) {
              return el;
            }
          }
        });
      } else {
        this.data = this.fullData;
      }
    });
    this.emitter.on("changeBrand", (val) => {
      if (val.length) {
        this.data = this.fullData.filter((el) => {
          for (let i = 0; i < val.length; i++) {
            if (el.brand === val[i]) {
              return el;
            }
          }
        });
      } else {
        this.data = this.fullData;
      }
    });

    this.emitter.on("changePrice", (min, max) => {
      this.data = this.fullData.filter(
        (el) => el.price >= min && el.price <= max
      );
    });
    this.emitter.on("changeStock", (min, max) => {
      this.data = this.fullData.filter(
        (el) => el.stock >= min && el.stock <= max
      );
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
