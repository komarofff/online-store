<template>
  <!--  {{ itemsInCart }}-->
  <div class="cart__product">
    <div class="cart__product-title">
      <!--      max-pages {{ maxPage }}-->
      <!--      <ul>-->
      <!--        <li v-for="i in maxPage" :key="i" @click="goToPage(i)">{{ i }}</li>-->
      <!--      </ul>-->
      <p>
        Products In Cart - <span>{{ getCartLength }}</span>
      </p>
      <div class="cart__product-control">
        <span>Items per page: </span>
        <span class="count-item-pages"> {{ itemsPerPage }}</span>
        <span>Page</span>
        <button class="control-arrow arrow-to-left" @click="goToPageLeft()">
          <img src="@/assets/icon/arrow-link-right.svg" alt="" />
        </button>
        <span class="page-counter">{{ page }}</span>
        <button class="control-arrow" @click="goToPageRight()">
          <img src="@/assets/icon/arrow-link-right.svg" alt="" />
        </button>
      </div>
    </div>

    <div class="cart__items">
      <div class="cart__item" v-for="prod in itemsInCart" :key="prod.id">
        <div class="cart__item-number">
          {{ getCartArray.indexOf(prod) + 1 }}
        </div>
        <div class="cart__item-photo">
          <img :src="prod.thumbnail" alt="" />
        </div>
        <div class="cart__item-info">
          <p class="cart-name">
            <span>{{ prod.title }}</span>
          </p>
          <p class="cart-brand">
            Brand: <span>{{ prod.brand }}</span>
          </p>
          <p class="cart-category">
            Category: <span>{{ prod.category }}</span>
          </p>
          <p class="cart-rating">
            Rating: <span>{{ prod.rating }}</span>
          </p>
        </div>
        <div class="cart__item-control">
          <p class="cart-stock">
            Stock: <span>{{ prod.stock }}</span>
          </p>
          <div class="more-less">
            <button
              class="btn-control btn-control-less"
              @click="quantityMinus(prod.id)"
            >
              <img src="@/assets/icon/arrow-link-right.svg" alt="" />
            </button>
            <p>{{ prod.quantity }}</p>
            <button
              class="btn-control btn-control-more"
              @click="quantityPlus(prod.id)"
            >
              <img src="@/assets/icon/arrow-link-right.svg" alt="" />
            </button>
          </div>
          <p class="cart-control-price">€{{ prod.price }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "CartPage",
  data() {
    return {
      itemsInCart: [],
      page: 1,
      maxPage: 1,
      itemsPerPage: 5,
      startQuery: {},
    };
  },
  mounted() {
    this.itemsInCart = this.getCartArray;
    this.maxPage = Math.ceil(this.itemsInCart.length / this.itemsPerPage);
    this.startQuery = this.$route.query.page;
    if (this.startQuery && this.startQuery > 0) {
      console.log("start with query parameters", this.startQuery);
      this.page = Number(this.$route.query.page);
      this.showPaginatedItems(this.startQuery);
    } else {
      this.showPaginatedItems(this.page);
    }
  },
  watch: {
    getCartArray() {
      return this.getCartArray;
    },
  },
  computed: {
    ...mapGetters("Cart", ["getCartArray", "getCartLength"]),
  },
  methods: {
    ...mapActions("Cart", ["plusQuantity", "minusQuantity", "delFromCart"]),
    goToPage(val) {
      let queries = JSON.parse(JSON.stringify(this.$route.query));
      if (val) {
        queries.page = val;
        this.$router.replace({ query: queries });
      } else {
        delete queries.page;
        this.$router.replace({ query: queries });
      }
      this.showPaginatedItems(val);
    },
    goToPageLeft() {
      if (this.page > 1) {
        let newPage = this.page;
        newPage--;
        this.page--;
        this.changeQuery(newPage);
      }
    },
    goToPageRight() {
      if (this.page < this.maxPage) {
        let newPage = this.page;
        newPage++;
        this.page++;
        this.changeQuery(newPage);
      }
    },

    showAllItems() {
      this.itemsInCart = this.getCartArray;
    },
    showPaginatedItems(page) {
      let start = page * this.itemsPerPage - this.itemsPerPage;
      let end = page * this.itemsPerPage;
      //console.log("start: " + start + " end: " + end);
      this.itemsInCart = this.getCartArray.slice(start, end);
    },
    async quantityMinus(id) {
      let idx = this.getCartArray.findIndex((el) => el.id === id);
      if (this.getCartArray[idx].quantity > 1) {
        await this.minusQuantity(id);
      } else {
        await this.delFromCart(id);
        this.itemsInCart = this.getCartArray;
        this.maxPage = Math.ceil(this.itemsInCart.length / this.itemsPerPage);
      }
    },
    async quantityPlus(id) {
      let idx = this.getCartArray.findIndex((el) => el.id === id);
      if (this.getCartArray[idx].quantity < this.getCartArray[idx].stock) {
        await this.plusQuantity(id);
      }
    },
    changeQuery(newPage) {
      let queries = JSON.parse(JSON.stringify(this.$route.query));
      queries.page = newPage;
      this.$router.replace({ query: queries });
      this.showPaginatedItems(newPage);
    },
  },
};
</script>

<style scoped lang="scss">
.page-counter {
  margin: 0 5px;
  font-weight: bold;
}
</style>
