<template>
  <div class="cart__pay">
    <p class="card__pay-title">Shopping Cart</p>
    <p class="card__pay-score">
      Products: <span>{{ getCartLength }}</span>
    </p>
    <p class="card__pay-sum" :class="{ 'sum-through': priceDiscount }">
      Total Sum: <span>€{{ getCartSum }}</span>
    </p>
    <p class="card__pay-sum-new" v-if="priceDiscount">
      Total Sum: <span>€{{ priceDiscount }}</span>
    </p>

    <div class="card__pay-codes" v-if="isAppliedPromoCode">
      <p class="card__pay-codes-title">Applied codes</p>
      <div
        class="card__pay-discount rs"
        v-for="item in promoCodes"
        :key="item.promo"
      >
        <template v-if="item.isAdded">
          <p class="card__pay-discount-name">
            {{ item.name }} - {{ item.discount }}%
          </p>
          <button class="btn-discount btn-rs" @click="promoDel(item.promo)">
            Delete
          </button>
        </template>
      </div>
    </div>
    <div class="cart-input">
      <input
        class="card__pay-input"
        type="text"
        v-model="promoValue"
        placeholder="Enter promo code"
      />
      <svg
        @click="clearField()"
        v-if="clearInput"
        xmlns="http://www.w3.org/2000/svg"
        class="trash"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        stroke-width="2"
        stroke="currentColor"
        fill="none"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
        <line x1="4" y1="7" x2="20" y2="7"></line>
        <line x1="10" y1="11" x2="10" y2="17"></line>
        <line x1="14" y1="11" x2="14" y2="17"></line>
        <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12"></path>
        <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3"></path>
      </svg>
    </div>

    <template v-for="promoBox in promoCodes" :key="promoBox.promo">
      <div
        class="discount-option"
        v-if="promoBox.isShow && promoBox.isAdded === false"
      >
        <p class="discount-option-name">
          {{ promoBox.name }} - {{ promoBox.discount }}%
        </p>
        <button class="discount-option-btn" @click="promoAdd(promoBox.promo)">
          Add
        </button>
      </div>
      <div class="discount-option" v-if="promoBox.isAdded">
        <p class="discount-option-name">
          {{ promoBox.name }} - {{ promoBox.discount }}%
        </p>
      </div>
    </template>

    <p class="card__pay-promo">
      Promo for test:
      <template v-for="item in promoCodes"> "{{ item.promo }}"</template>
    </p>
    <button class="card__pay-btn" @click="openCheckout()" v-if="getCartLength">
      BUY NOW
    </button>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
// export interface IPromoCodes{
//   name: string,
//   promo: string,
//   discount: number,
//   isAdded: boolean,
//   isShow: boolean,
// }
export default {
  name: "CartPay",
  data() {
    return {
      isAppliedPromoCode: false,
      promoValue: "",
      priceDiscount: 0,
      clearInput: false,
      promoCodes: [
        {
          name: "Rolling Scopes School",
          promo: "RS",
          discount: 10,
          isAdded: false,
          isShow: false,
        },
        {
          name: "EPAM Systems",
          promo: "EPM",
          discount: 12,
          isAdded: false,
          isShow: false,
        },
        {
          name: "K&K online store",
          promo: "K&K",
          discount: 27,
          isAdded: false,
          isShow: false,
        },
      ],
    };
  },
  mounted() {
    if (localStorage.getItem("discount")) {
      let data = JSON.parse(localStorage.getItem("discount"));
      this.promoCodes.forEach((el) => {
        if (data.find((elem) => elem.promo === el.promo)) {
          el.isAdded = true;
          this.isAppliedPromoCode = true;
          this.calculateDiscount();
        }
      });
    }
  },
  watch: {
    promoValue() {
      if (this.promoValue) {
        this.changePromoValue(this.promoValue);
      } else {
        this.clearInput = false;
      }
    },
    getCartSum() {
      this.calculateDiscount();
    },
  },
  computed: {
    ...mapGetters("Cart", ["getCartArray", "getCartLength", "getCartSum"]),
  },
  methods: {
    saveDiscount() {
      let data = JSON.stringify(this.promoCodes.filter((el) => el.isAdded));
      localStorage.setItem("discount", data);
    },
    openCheckout() {
      this.emitter.emit("openCheckout");
    },
    clearField() {
      this.promoValue = null;
      this.clearInput = false;
      this.promoCodes.forEach((el) => (el.isShow = false));
    },
    changePromoValue(val) {
      this.promoCodes.forEach((el) => {
        if (el.promo === val && el.isShow === false && el.isAdded === false) {
          el.isShow = true;
          this.clearInput = true;
        } else {
          el.isShow = false;
        }
      });
    },
    promoAdd(val) {
      this.promoCodes.find((el) => {
        if (el.promo === val) {
          el.isShow = false;
          el.isAdded = true;
          this.promoValue = null;
          this.isAppliedPromoCode = true;
        }
      });
      this.calculateDiscount();
      this.saveDiscount();
    },
    promoDel(val) {
      this.priceDiscount = this.getCartSum;
      this.promoCodes.find((el) => {
        if (el.promo === val) {
          el.isAdded = false;
          el.isShow = false;
        }
      });
      this.calculateDiscount();
      this.isAppliedPromoCode = !this.promoCodes.every(
        (el) => el.isAdded === false
      );
      if (this.priceDiscount === this.getCartSum) {
        this.priceDiscount = 0;
      }
      this.promoValue = null;
      this.saveDiscount();
    },
    calculateDiscount() {
      let acc = 0;
      this.promoCodes.filter((el) => {
        if (el.isAdded) {
          acc += Math.ceil((this.getCartSum / 100) * el.discount);
        }
      });
      this.priceDiscount = this.getCartSum - acc;
      if (this.priceDiscount === this.getCartSum) {
        this.priceDiscount = 0;
      }

      if (this.getCartLength === 0) {
        this.promoCodes.forEach((el) => {
          el.isShow = false;
          el.isAdded = false;
        });
        this.isAppliedPromoCode = false;
      }
    },
  },
};
</script>

<style lang="scss">
.cart-input {
  position: relative;
  margin: 15px 0;

  .trash {
    position: absolute;
    right: 10px;
    cursor: pointer;
    top: 50%;
    transform: translateY(-50%);
  }
}

.cart__pay {
  background-color: #fff;
  padding: 10px;
  margin-top: 10px;
  border-radius: 10px;
  flex-basis: 31%;
  text-align: center;
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: start;

  .card__pay-title {
    width: 100%;
  }

  .sum-through {
    color: #ccc;

    span {
      color: #ccc;
    }
  }

  .card__pay-input {
    margin: 0;
  }

  .card__pay-codes {
    border: 1px solid #ede7f6;
    border-radius: 10px;
    max-width: unset;
    margin: 0 auto;
    width: 100%;
  }

  .discount-option {
    display: flex;
    justify-content: center;
    align-items: center;
    max-width: unset;
    margin: 5px auto 0;
    width: 100%;

    .discount-option-btn {
      margin-left: 10px;
    }
  }
}
@media (max-width: 768px) {
  .cart__content {
    flex-wrap: wrap !important;
  }
  .cart__product {
    flex-basis: 100%;
    order: 2;
  }
  .cart__pay {
    flex-basis: 100%;
  }
}
@media (max-width: 560px) {
  .cart__product-title {
    flex-wrap: wrap;
    justify-content: space-evenly;
  }
  .cart__item {
    flex-wrap: wrap;
  }
  .cart__item-control {
    width: 100%;
  }
  .cart__item-photo {
    width: 100%;
    height: unset;
  }
}
</style>
