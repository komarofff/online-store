<template>
  <div class="header__search">
    <input
      type="text"
      v-model="search"
      placeholder="Quick search"
      @blur="clearSearch()"
    />
    <span class="amount" v-if="isSearchOpen">({{ data.length }})</span>
    <div class="search-box vertical-scroll" v-if="isSearchOpen">
      <a
        :href="`/product-details/${prod.id}`"
        v-for="prod in data"
        :key="prod.id"
        class="search-box__product"
      >
        <img
          class="search-box__image"
          :src="prod.thumbnail"
          :alt="prod.title"
        />
        <p>{{ prod.title }}</p>
        <p>
          <strong>&nbsp; €{{ prod.price }}</strong>
        </p>
      </a>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "SearchBlock",
  data() {
    return {
      search: "",
      data: [],
      isSearchOpen: false,
    };
  },
  watch: {
    async search() {
      if (this.search) {
        await this.getSearchParameters(this.search);
        this.data = this.getSearchData;
        this.isSearchOpen = this.data;
      } else {
        this.isSearchOpen = false;
      }
    },
  },
  computed: {
    ...mapGetters("Filter", ["getSearchData"]),
  },
  methods: {
    ...mapActions("Filter", ["getSearchParameters"]),
    clearSearch() {
      setTimeout(() => {
        this.search = "";
        this.data = [];
        this.isSearchOpen = false;
      }, 500);
    },
  },
};
</script>

<style lang="scss">
.header__search {
  position: relative;
  .amount {
    position: absolute;
    right: 5px;
    top: 50%;
    transform: translateY(-50%);
    color: #adabab;
  }
  .search-box {
    position: absolute;
    width: 100%;
    height: 30vh;
    overflow-y: auto;
    overflow-x: hidden;
    background: #fff;
    box-shadow: 0 0 10px #ccc;
    padding: 10px 0;
    top: 100%;
    & a {
      color: #000;
      text-decoration: none;
    }
    &__product {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 5px;
      border-bottom: 1px solid #ccc;
      text-align: center;
      &:hover {
        background: #eee;
      }
    }
    &__image {
      max-width: 50px;
      margin-right: 10px;
    }
  }
}
</style>
