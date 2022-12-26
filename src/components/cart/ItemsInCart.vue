<template>
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
        <span class="small">Items per page: </span>
        <input
          type="number"
          min="1"
          class="count-item-pages small"
          v-model="itemsPerPage"
        />
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
        <router-link
          :to="`/product-details/${prod.id}`"
          class="cart__item-photo"
        >
          <img :src="prod.thumbnail" alt="" />
        </router-link>
        <router-link
          class="cart__item-info"
          :to="`/product-details/${prod.id}`"
        >
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
        </router-link>
        <div class="cart__item-control">
          <p class="cart-stock">
            Stock: <span>{{ prod.stock }}</span>
          </p>
          <div class="more-less">
            <button
              class="btn-control btn-control-less"
              @click="quantityMinus(prod.id)"
            >
              -
              <!--              <img src="@/assets/icon/arrow-link-right.svg" alt="" />-->
            </button>
            <p>{{ prod.quantity }}</p>
            <button
              class="btn-control btn-control-more"
              @click="quantityPlus(prod.id)"
            >
              +
              <!--              <img src="@/assets/icon/arrow-link-right.svg" alt="" />-->
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
      currentPage: 1,
    };
  },
  mounted() {
    this.startQuery = this.$route.query.page;
    if (this.$route.query.limit && +this.$route.query.limit > 0) {
      this.itemsPerPage = this.$route.query.limit;
    } else {
      this.itemsPerPage = 5;
    }
    this.startCart(this.startQuery);
  },
  watch: {
    getCartArray() {
      this.startQuery = this.$route.query.page;
      this.itemsInCart = this.getCartArray;
      this.startCart(this.startQuery);
    },
    page() {
      if (this.page === 0) {
        this.page = 1;
      }
      this.currentPage = this.page;
    },
    itemsPerPage() {
      if (this.itemsPerPage) {
        let queries = JSON.parse(JSON.stringify(this.$route.query));
        queries.limit = this.itemsPerPage;
        queries.page = this.page;
        this.$router.replace({ query: queries });
        //console.log(queries);
        this.changeLimit();
      }
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
        if (
          this.itemsInCart.length % this.itemsPerPage === 0 &&
          this.page !== this.maxPage
        ) {
          if (this.page > 1) this.page--;
          this.changeQuery(this.page);
        }
        this.showPaginatedItems(this.page);
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
    startCart(pageNumber) {
      pageNumber = Number(pageNumber);
      this.itemsInCart = this.getCartArray;
      this.maxPage = Math.ceil(this.itemsInCart.length / this.itemsPerPage);
      if (pageNumber && pageNumber > 0 && pageNumber <= this.maxPage) {
        this.page = Number(this.$route.query.page);
        this.showPaginatedItems(pageNumber);
        let queries = JSON.parse(JSON.stringify(this.$route.query));
        queries.page = pageNumber;
        this.$router.replace({ query: queries });
      } else if (pageNumber > this.maxPage) {
        this.showPaginatedItems(1);
        let queries = JSON.parse(JSON.stringify(this.$route.query));
        queries.page = 1;
        this.$router.replace({ query: queries });
      } else {
        this.showPaginatedItems(this.page);
      }
    },
    changeLimit() {
      this.itemsInCart = this.getCartArray;
      this.maxPage = Math.ceil(this.itemsInCart.length / this.itemsPerPage);
      if (this.maxPage < this.page) {
        this.page = this.maxPage;
      }
      let queries = JSON.parse(JSON.stringify(this.$route.query));
      queries.limit = this.itemsPerPage;
      queries.page = this.page;
      this.$router.replace({ query: queries });
      this.showPaginatedItems(this.page);
    },
  },
};
</script>

<style scoped lang="scss">
.small {
  font-size: 12px;
  font-weight: bold;
}
.page-counter {
  margin: 0 5px;
  font-weight: bold;
}
.cart__items {
  display: flex;
  flex-direction: column;
  gap: 5px;
}
.cart__item-info {
  text-decoration: none;
}
.count-item-pages {
  font-size: 16px;
  outline: none;
  border: 1px solid #ccc;
  border-radius: 3px;
  max-width: 70px;
  text-align: center;
}
</style>
